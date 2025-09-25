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
    const newTokens = await driveService.refreshAccessToken(tokenRecord.refreshToken);
    
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

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ fileId: string }> }
) {
  try {
    const user = await stackServerApp.getUser({ or: "return-null" });
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { fileId } = await params;
    const { searchParams } = new URL(req.url);
    const download = searchParams.get("download") === "true";
    const export_type = searchParams.get("export");

    const driveService = new GoogleDriveService();
    const tokenRecord = await getUserTokens(user.id);
    await ensureValidToken(driveService, tokenRecord);

    if (download || export_type) {
      // Download or export file content
      let content: Buffer;
      let filename: string;
      let mimeType: string;

      if (export_type) {
        // Export Google Workspace files
        const exportMimeTypes: { [key: string]: string } = {
          'pdf': 'application/pdf',
          'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
          'txt': 'text/plain',
          'html': 'text/html'
        };

        mimeType = exportMimeTypes[export_type] || 'application/pdf';
        content = await driveService.exportFile(fileId, mimeType);
        
        const file = await driveService.getFile(fileId);
        filename = `${file.name}.${export_type}`;
      } else {
        // Download regular files
        content = await driveService.downloadFile(fileId);
        const file = await driveService.getFile(fileId);
        filename = file.name;
        mimeType = file.mimeType;
      }

      return new NextResponse(content, {
        headers: {
          'Content-Type': mimeType,
          'Content-Disposition': `attachment; filename="${filename}"`,
        }
      });
    } else {
      // Get file metadata
      const file = await driveService.getFile(fileId);
      return NextResponse.json({ file });
    }
  } catch (error: any) {
    console.error("Google Drive file get error:", error);
    
    if (error.message === "Google Drive not connected") {
      return NextResponse.json({ 
        error: "Google Drive not connected",
        connected: false 
      }, { status: 401 });
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ fileId: string }> }
) {
  try {
    const user = await stackServerApp.getUser({ or: "return-null" });
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { fileId } = await params;
    const body = await req.json() as {
      name?: string;
      content?: string;
      mimeType?: string;
    };

    const driveService = new GoogleDriveService();
    const tokenRecord = await getUserTokens(user.id);
    await ensureValidToken(driveService, tokenRecord);

    const file = await driveService.updateFile(fileId, {
      name: body.name,
      content: body.content,
      mimeType: body.mimeType
    });

    // Update cached file
    await db
      .update(googleDriveFiles)
      .set({
        name: file.name,
        modifiedTime: file.modifiedTime ? new Date(file.modifiedTime) : null,
        lastSynced: new Date(),
        updatedAt: new Date(),
      })
      .where(and(
        eq(googleDriveFiles.id, fileId),
        eq(googleDriveFiles.userId, user.id)
      ));

    return NextResponse.json({ file });
  } catch (error: any) {
    console.error("Google Drive file update error:", error);
    
    if (error.message === "Google Drive not connected") {
      return NextResponse.json({ 
        error: "Google Drive not connected",
        connected: false 
      }, { status: 401 });
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ fileId: string }> }
) {
  try {
    const user = await stackServerApp.getUser({ or: "return-null" });
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { fileId } = await params;

    const driveService = new GoogleDriveService();
    const tokenRecord = await getUserTokens(user.id);
    await ensureValidToken(driveService, tokenRecord);

    await driveService.deleteFile(fileId);

    // Remove from cache
    await db
      .delete(googleDriveFiles)
      .where(and(
        eq(googleDriveFiles.id, fileId),
        eq(googleDriveFiles.userId, user.id)
      ));

    return NextResponse.json({ message: "File deleted successfully" });
  } catch (error: any) {
    console.error("Google Drive file delete error:", error);
    
    if (error.message === "Google Drive not connected") {
      return NextResponse.json({ 
        error: "Google Drive not connected",
        connected: false 
      }, { status: 401 });
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}