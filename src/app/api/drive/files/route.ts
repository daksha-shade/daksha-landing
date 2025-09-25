import { NextRequest, NextResponse } from "next/server";
import { stackServerApp } from "@/stack";
import { GoogleDriveService } from "@/lib/google-drive";
import { db } from "@/db/client";
import { googleDriveTokens, googleDriveFiles } from "@/db/schema";
import { eq, and } from "drizzle-orm";

// Helper function to get user's Google Drive tokens
async function getUserTokens(userId: string) {
  const tokenRecord = await db
    .select()
    .from(googleDriveTokens)
    .where(eq(googleDriveTokens.userId, userId))
    .limit(1);

  if (tokenRecord.length === 0) {
    throw new Error("Google Drive not connected");
  }

  return tokenRecord[0];
}

// Helper function to refresh token if needed
async function ensureValidToken(driveService: GoogleDriveService, tokenRecord: any) {
  const now = new Date();
  const expiresAt = new Date(tokenRecord.expiresAt);

  if (now >= expiresAt) {
    // Token expired, refresh it
    const newTokens = await driveService.refreshAccessToken(tokenRecord.refreshToken);
    
    // Update token in database
    await db
      .update(googleDriveTokens)
      .set({
        accessToken: newTokens.access_token,
        expiresAt: new Date(newTokens.expiry_date),
        updatedAt: new Date(),
      })
      .where(eq(googleDriveTokens.userId, tokenRecord.userId));

    driveService.setCredentials(newTokens);
  } else {
    driveService.setCredentials({
      access_token: tokenRecord.accessToken,
      refresh_token: tokenRecord.refreshToken,
      token_type: tokenRecord.tokenType,
      expiry_date: expiresAt.getTime(),
      scope: tokenRecord.scope
    });
  }
}

export async function GET(req: NextRequest) {
  try {
    const user = await stackServerApp.getUser({ or: "return-null" });
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const folderId = searchParams.get("folderId") || undefined;
    const pageToken = searchParams.get("pageToken") || undefined;
    const search = searchParams.get("search") || undefined;
    const pageSize = parseInt(searchParams.get("pageSize") || "50");

    const driveService = new GoogleDriveService();
    const tokenRecord = await getUserTokens(user.id);
    await ensureValidToken(driveService, tokenRecord);

    let result;
    if (search) {
      result = await driveService.searchFiles(search, { pageSize, pageToken });
    } else {
      result = await driveService.listFiles({ folderId, pageSize, pageToken });
    }

    // Cache files in database for better performance
    if (result.files.length > 0) {
      const filesToCache = result.files.map(file => ({
        id: file.id,
        userId: user.id,
        name: file.name,
        mimeType: file.mimeType,
        size: file.size || null,
        parents: file.parents || [],
        webViewLink: file.webViewLink || null,
        webContentLink: file.webContentLink || null,
        thumbnailLink: file.thumbnailLink || null,
        iconLink: file.iconLink || null,
        shared: file.shared || false,
        modifiedTime: file.modifiedTime ? new Date(file.modifiedTime) : null,
        createdTime: file.createdTime ? new Date(file.createdTime) : null,
        lastSynced: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      }));

      // Upsert files (insert or update)
      for (const file of filesToCache) {
        await db
          .insert(googleDriveFiles)
          .values(file)
          .onConflictDoUpdate({
            target: googleDriveFiles.id,
            set: {
              name: file.name,
              mimeType: file.mimeType,
              size: file.size,
              parents: file.parents,
              webViewLink: file.webViewLink,
              webContentLink: file.webContentLink,
              thumbnailLink: file.thumbnailLink,
              iconLink: file.iconLink,
              shared: file.shared,
              modifiedTime: file.modifiedTime,
              lastSynced: file.lastSynced,
              updatedAt: file.updatedAt,
            }
          });
      }
    }

    return NextResponse.json({
      files: result.files,
      nextPageToken: result.nextPageToken,
      connected: true
    });
  } catch (error: any) {
    console.error("Google Drive files error:", error);
    
    if (error.message === "Google Drive not connected") {
      return NextResponse.json({ 
        error: "Google Drive not connected",
        connected: false 
      }, { status: 401 });
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await stackServerApp.getUser({ or: "return-null" });
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json() as {
      name: string;
      content: string;
      mimeType: string;
      folderId?: string;
    };

    const driveService = new GoogleDriveService();
    const tokenRecord = await getUserTokens(user.id);
    await ensureValidToken(driveService, tokenRecord);

    const file = await driveService.createFile({
      name: body.name,
      content: body.content,
      mimeType: body.mimeType,
      parents: body.folderId ? [body.folderId] : undefined
    });

    // Cache the new file
    await db.insert(googleDriveFiles).values({
      id: file.id,
      userId: user.id,
      name: file.name,
      mimeType: file.mimeType,
      size: file.size || null,
      parents: file.parents || [],
      webViewLink: file.webViewLink || null,
      webContentLink: file.webContentLink || null,
      thumbnailLink: file.thumbnailLink || null,
      iconLink: file.iconLink || null,
      shared: file.shared || false,
      modifiedTime: file.modifiedTime ? new Date(file.modifiedTime) : null,
      createdTime: file.createdTime ? new Date(file.createdTime) : null,
      lastSynced: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json({ file }, { status: 201 });
  } catch (error: any) {
    console.error("Google Drive create file error:", error);
    
    if (error.message === "Google Drive not connected") {
      return NextResponse.json({ 
        error: "Google Drive not connected",
        connected: false 
      }, { status: 401 });
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}