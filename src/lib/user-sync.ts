import "server-only";
import { db } from "@/db/client";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { ensureDbSchema } from "@/db/sync";

export interface StackUser {
  id: string;
  email?: string;
  displayName?: string;
  profileImageUrl?: string;
  primaryEmail?: string;
  primaryEmailVerified?: boolean;
  clientMetadata?: Record<string, any>;
  serverMetadata?: Record<string, any>;
  oauthProviders?: Record<string, any>;
}

export async function syncUserToDatabase(stackUser: StackUser) {
  try {
    // Ensure database schema exists
    await ensureDbSchema();

    // Check if user already exists
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.id, stackUser.id))
      .limit(1);

    const userData = {
      id: stackUser.id,
      email: stackUser.email || null,
      displayName: stackUser.displayName || null,
      profileImageUrl: stackUser.profileImageUrl || null,
      primaryEmail: stackUser.primaryEmail || null,
      primaryEmailVerified: stackUser.primaryEmailVerified ? "true" : "false",
      clientMetadata: stackUser.clientMetadata || null,
      serverMetadata: stackUser.serverMetadata || null,
      oauthProviders: stackUser.oauthProviders || null,
      updatedAt: new Date(),
      lastSeenAt: new Date(),
    };

    if (existingUser.length === 0) {
      // Create new user
      await db.insert(users).values({
        ...userData,
        createdAt: new Date(),
      });
      console.log(`Created new user: ${stackUser.id}`);
    } else {
      // Update existing user
      await db
        .update(users)
        .set(userData)
        .where(eq(users.id, stackUser.id));
      console.log(`Updated existing user: ${stackUser.id}`);
    }

    return { success: true };
  } catch (error) {
    console.error("Error syncing user to database:", error);
    return { success: false, error };
  }
}

export async function getUserFromDatabase(userId: string) {
  try {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    return user[0] || null;
  } catch (error) {
    console.error("Error fetching user from database:", error);
    return null;
  }
}