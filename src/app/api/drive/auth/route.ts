import { NextRequest, NextResponse } from "next/server";
import { stackServerApp } from "@/stack";
import { GoogleDriveService } from "@/lib/google-drive";

export async function GET() {
  try {
    const user = await stackServerApp.getUser({ or: "return-null" });
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const driveService = new GoogleDriveService();
    const authUrl = driveService.getAuthUrl();

    return NextResponse.json({ authUrl });
  } catch (error) {
    console.error("Google Drive auth error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}