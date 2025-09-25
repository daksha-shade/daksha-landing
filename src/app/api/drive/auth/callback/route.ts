import { NextRequest, NextResponse } from "next/server";
import { stackServerApp } from "@/stack";
import { GoogleDriveService } from "@/lib/google-drive";
import { db } from "@/db/client";
import { googleDriveTokens } from "@/db/schema";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";

export async function GET(req: NextRequest) {
  try {
    const user = await stackServerApp.getUser({ or: "return-null" });
    if (!user) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/apps/drive?error=unauthorized`);
    }

    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");
    const error = searchParams.get("error");

    if (error) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/apps/drive?error=${error}`);
    }

    if (!code) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/apps/drive?error=missing_code`);
    }

    const driveService = new GoogleDriveService();
    
    // Exchange code for tokens
    const tokens = await driveService.getTokens(code);
    
    // Set credentials to get user profile
    driveService.setCredentials(tokens);
    const userProfile = await driveService.getUserProfile();

    // Calculate expiration date
    const expiresAt = new Date(tokens.expiry_date);

    // Check if user already has Google Drive connected
    const existingToken = await db
      .select()
      .from(googleDriveTokens)
      .where(eq(googleDriveTokens.userId, user.id))
      .limit(1);

    if (existingToken.length > 0) {
      // Update existing token
      await db
        .update(googleDriveTokens)
        .set({
          accessToken: tokens.access_token,
          refreshToken: tokens.refresh_token || existingToken[0].refreshToken,
          tokenType: tokens.token_type,
          expiresAt,
          scope: tokens.scope,
          googleAccountId: userProfile.id,
          email: userProfile.email,
          name: userProfile.name,
          picture: userProfile.picture,
          updatedAt: new Date(),
        })
        .where(eq(googleDriveTokens.userId, user.id));
    } else {
      // Create new token record
      await db.insert(googleDriveTokens).values({
        id: nanoid(),
        userId: user.id,
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token!,
        tokenType: tokens.token_type,
        expiresAt,
        scope: tokens.scope,
        googleAccountId: userProfile.id,
        email: userProfile.email,
        name: userProfile.name,
        picture: userProfile.picture,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/apps/drive?success=connected`);
  } catch (error) {
    console.error("Google Drive callback error:", error);
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/apps/drive?error=callback_failed`);
  }
}