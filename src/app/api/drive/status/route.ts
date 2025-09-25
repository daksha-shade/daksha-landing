import { NextRequest, NextResponse } from "next/server";
import { stackServerApp } from "@/stack";
import { db } from "@/db/client";
import { googleDriveTokens } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const user = await stackServerApp.getUser({ or: "return-null" });
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const tokenRecord = await db
      .select({
        email: googleDriveTokens.email,
        name: googleDriveTokens.name,
        picture: googleDriveTokens.picture,
        createdAt: googleDriveTokens.createdAt
      })
      .from(googleDriveTokens)
      .where(eq(googleDriveTokens.userId, user.id))
      .limit(1);

    if (tokenRecord.length === 0) {
      return NextResponse.json({ 
        connected: false 
      });
    }

    return NextResponse.json({
      connected: true,
      account: tokenRecord[0]
    });
  } catch (error) {
    console.error("Google Drive status error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    const user = await stackServerApp.getUser({ or: "return-null" });
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Delete user's Google Drive tokens and cached files
    await db.delete(googleDriveTokens).where(eq(googleDriveTokens.userId, user.id));

    return NextResponse.json({ message: "Google Drive disconnected successfully" });
  } catch (error) {
    console.error("Google Drive disconnect error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}