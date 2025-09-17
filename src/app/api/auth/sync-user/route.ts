import { NextResponse } from "next/server";
import { stackServerApp } from "@/stack";
import { syncUserToDatabase } from "@/lib/user-sync";

export async function POST() {
  try {
    // Get the current user from StackAuth
    const user = await stackServerApp.getUser();
    
    if (!user) {
      return NextResponse.json({ error: "No authenticated user found" }, { status: 401 });
    }

    // Prepare user data for sync
    const stackUser = {
      id: user.id,
      email: user.primaryEmail || undefined,
      displayName: user.displayName || undefined,
      profileImageUrl: user.profileImageUrl || undefined,
      primaryEmail: user.primaryEmail || undefined,
      primaryEmailVerified: user.primaryEmailVerified || false,
      clientMetadata: user.clientMetadata || {},
      serverMetadata: user.serverMetadata || {},
      // For OAuth providers, we'll handle this differently based on available data
      oauthProviders: {},
    };

    // Sync user to database
    const result = await syncUserToDatabase(stackUser);

    if (result.success) {
      return NextResponse.json({ 
        success: true, 
        message: "User synced successfully",
        userId: user.id 
      });
    } else {
      return NextResponse.json({ 
        error: "Failed to sync user", 
        details: result.error 
      }, { status: 500 });
    }
  } catch (error) {
    console.error("Error in user sync API:", error);
    return NextResponse.json({ 
      error: "Internal server error", 
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}