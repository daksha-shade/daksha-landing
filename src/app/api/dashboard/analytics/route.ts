import { NextRequest, NextResponse } from "next/server";
import { stackServerApp } from "@/stack";
import { db } from "@/db/client";
import { journalEntries, journalStreaks, journalAnalytics, contextFiles } from "@/db/schema";
import { eq, desc, and, gte, lte, sql, count } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    const user = await stackServerApp.getUser({ or: "return-null" });
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const period = searchParams.get("period") || "week"; // week, month, year
    const timezone = searchParams.get("timezone") || "UTC";

    // Calculate date ranges
    const now = new Date();
    let startDate: Date;
    
    switch (period) {
      case "week":
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case "month":
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case "year":
        startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
        break;
      default:
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    }

    // Get journal statistics
    const journalStats = await getJournalStats(user.id, startDate, now);
    
    // Get streak information
    const streakInfo = await getStreakInfo(user.id);
    
    // Get mood trends
    const moodTrends = await getMoodTrends(user.id, startDate, now);
    
    // Get goals progress
    const goalsProgress = await getGoalsProgress(user.id);
    
    // Get recent activities
    const recentActivities = await getRecentActivities(user.id);
    
    // Get productivity metrics
    const productivityMetrics = await getProductivityMetrics(user.id, startDate, now);

    return NextResponse.json({
      period,
      dateRange: {
        start: startDate.toISOString(),
        end: now.toISOString()
      },
      journalStats,
      streakInfo,
      moodTrends,
      goalsProgress,
      recentActivities,
      productivityMetrics
    });

  } catch (error) {
    console.error("Dashboard analytics error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

async function getJournalStats(userId: string, startDate: Date, endDate: Date) {
  // Format dates as strings for SQL queries
  const startDateStr = startDate.toISOString().split('T')[0];
  const endDateStr = endDate.toISOString().split('T')[0];

  // Total entries in period
  const totalEntriesResult = await db
    .select({ count: count() })
    .from(journalEntries)
    .where(
      and(
        eq(journalEntries.userId, userId),
        gte(journalEntries.entryDate, sql`${startDateStr}::date`),
        lte(journalEntries.entryDate, sql`${endDateStr}::date`)
      )
    );

  // Total words written
  const wordCountResult = await db.execute(sql`
    SELECT COALESCE(SUM(
      CASE
        WHEN plain_text_content IS NOT NULL
        THEN array_length(string_to_array(trim(plain_text_content), ' '), 1)
        ELSE 0
      END
    ), 0) as total_words
    FROM journal_entries
    WHERE user_id = ${userId}
      AND entry_date >= ${startDateStr}::date
      AND entry_date <= ${endDateStr}::date
  `);

  // Entries by type
  const entriesByTypeResult = await db.execute(sql`
    SELECT type, COUNT(*) as count
    FROM journal_entries
    WHERE user_id = ${userId}
      AND entry_date >= ${startDateStr}::date
      AND entry_date <= ${endDateStr}::date
    GROUP BY type
  `);

  // Daily entry counts for chart
  const dailyEntriesResult = await db.execute(sql`
    SELECT
      DATE(entry_date) as date,
      COUNT(*) as count
    FROM journal_entries
    WHERE user_id = ${userId}
      AND entry_date >= ${startDateStr}::date
      AND entry_date <= ${endDateStr}::date
    GROUP BY DATE(entry_date)
    ORDER BY date
  `);

  return {
    totalEntries: totalEntriesResult[0]?.count || 0,
    totalWords: wordCountResult[0]?.total_words || 0,
    entriesByType: entriesByTypeResult.map((row: any) => ({
      type: row.type,
      count: parseInt(row.count)
    })),
    dailyEntries: dailyEntriesResult.map((row: any) => ({
      date: row.date,
      count: parseInt(row.count)
    }))
  };
}

async function getStreakInfo(userId: string) {
  const streakResult = await db
    .select()
    .from(journalStreaks)
    .where(eq(journalStreaks.userId, userId))
    .limit(1);

  if (streakResult.length === 0) {
    return {
      currentStreak: 0,
      longestStreak: 0,
      totalEntries: 0,
      lastEntryDate: null
    };
  }

  const streak = streakResult[0];
  return {
    currentStreak: streak.currentStreak || 0,
    longestStreak: streak.longestStreak || 0,
    totalEntries: streak.totalEntries || 0,
    lastEntryDate: streak.lastEntryDate
  };
}

async function getMoodTrends(userId: string, startDate: Date, endDate: Date) {
  // Format dates as strings for SQL queries
 const startDateStr = startDate.toISOString().split('T')[0];
  const endDateStr = endDate.toISOString().split('T')[0];
  
  const moodTrendsResult = await db.execute(sql`
    SELECT
      DATE(entry_date) as date,
      AVG(mood_intensity) as avg_mood,
      COUNT(*) as entry_count,
      array_agg(DISTINCT mood) FILTER (WHERE mood IS NOT NULL) as moods
    FROM journal_entries
    WHERE user_id = ${userId}
      AND entry_date >= '${startDateStr}'
      AND entry_date <= '${endDateStr}'
      AND mood_intensity IS NOT NULL
    GROUP BY DATE(entry_date)
    ORDER BY date
  `);

 // Most common emotions
  const emotionsResult = await db.execute(sql`
    SELECT
      emotion,
      COUNT(*) as frequency
    FROM journal_entries,
    LATERAL jsonb_array_elements_text(emotional_tags) as emotion
    WHERE user_id = ${userId}
      AND entry_date >= '${startDateStr}'
      AND entry_date <= '${endDateStr}'
      AND emotional_tags IS NOT NULL
    GROUP BY emotion
    ORDER BY frequency DESC
    LIMIT 10
  `);

  return {
    dailyMoods: moodTrendsResult.map((row: any) => ({
      date: row.date,
      averageMood: parseFloat(row.avg_mood) || 0,
      entryCount: parseInt(row.entry_count),
      moods: row.moods || []
    })),
    topEmotions: emotionsResult.map((row: any) => ({
      emotion: row.emotion,
      frequency: parseInt(row.frequency)
    }))
  };
}

async function getGoalsProgress(userId: string) {
  // Mock implementation - replace with actual goals logic
  return {
    completedGoals: 0,
    totalGoals: 0,
    completionRate: 0,
    recentAchievements: []
  };
}

async function getRecentActivities(userId: string) {
  const activities = await db.select({
    id: journalEntries.id,
    title: journalEntries.title,
    createdAt: journalEntries.createdAt,
    type: journalEntries.type
  })
  .from(journalEntries)
  .where(eq(journalEntries.userId, userId))
  .orderBy(desc(journalEntries.createdAt))
  .limit(10);

  return activities.map(activity => ({
    id: activity.id,
    description: `Created journal entry: ${activity.title}`,
    timestamp: activity.createdAt,
    type: activity.type
  }));
}

async function getProductivityMetrics(userId: string, startDate: Date, endDate: Date) {
  // Mock implementation - replace with actual productivity logic
  return {
    dailyAverage: 0,
    weeklyTrend: "up", // up, down, stable
    peakHours: [],
    focusTime: 0
  };
}