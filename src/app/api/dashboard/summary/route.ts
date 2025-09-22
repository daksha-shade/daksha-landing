import { NextRequest, NextResponse } from "next/server";
import { stackServerApp } from "@/stack";
import { db } from "@/db/client";
import { journalEntries, journalStreaks, contextFiles } from "@/db/schema";
import { eq, desc, and, sql, count } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    const user = await stackServerApp.getUser({ or: "return-null" });
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get total journal entries
    const totalEntriesResult = await db
      .select({ count: count() })
      .from(journalEntries)
      .where(eq(journalEntries.userId, user.id));

    // Get current streak
    const streakResult = await db
      .select({
        currentStreak: journalStreaks.currentStreak,
        lastEntryDate: journalStreaks.lastEntryDate
      })
      .from(journalStreaks)
      .where(eq(journalStreaks.userId, user.id))
      .limit(1);

    // Get active goals count
    const activeGoalsResult = await db
      .select({ count: count() })
      .from(contextFiles)
      .where(
        and(
          eq(contextFiles.userId, user.id),
          sql`title LIKE '[Goal]%'`,
          sql`content LIKE '%Status: Active%'`
        )
      );

    // Get most recent activity
    const recentActivityResult = await db
      .select({
        title: journalEntries.title,
        type: journalEntries.type,
        createdAt: journalEntries.createdAt
      })
      .from(journalEntries)
      .where(eq(journalEntries.userId, user.id))
      .orderBy(desc(journalEntries.createdAt))
      .limit(1);

    const totalJournalEntries = totalEntriesResult[0]?.count || 0;
    const currentStreak = streakResult[0]?.currentStreak || 0;
    const activeGoals = activeGoalsResult[0]?.count || 0;
    
    let recentActivity = "No recent activity";
    if (recentActivityResult.length > 0) {
      const activity = recentActivityResult[0];
      const timeAgo = getTimeAgo(new Date(activity.createdAt));
      recentActivity = `${activity.type} entry "${activity.title}" ${timeAgo}`;
    }

    return NextResponse.json({
      totalJournalEntries,
      currentStreak,
      activeGoals,
      recentActivity
    });

  } catch (error) {
    console.error("Dashboard summary error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

function getTimeAgo(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return "just now";
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  } else {
    return date.toLocaleDateString();
  }
}
