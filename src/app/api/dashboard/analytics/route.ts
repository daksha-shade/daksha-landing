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
  // Total entries in period
  const totalEntriesResult = await db
    .select({ count: count() })
    .from(journalEntries)
    .where(
      and(
        eq(journalEntries.userId, userId),
        gte(journalEntries.entryDate, startDate),
        lte(journalEntries.entryDate, endDate)
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
      AND entry_date >= ${startDate} 
      AND entry_date <= ${endDate}
  `);

  // Entries by type
  const entriesByTypeResult = await db.execute(sql`
    SELECT type, COUNT(*) as count
    FROM journal_entries 
    WHERE user_id = ${userId} 
      AND entry_date >= ${startDate} 
      AND entry_date <= ${endDate}
    GROUP BY type
  `);

  // Daily entry counts for chart
  const dailyEntriesResult = await db.execute(sql`
    SELECT 
      DATE(entry_date) as date,
      COUNT(*) as count
    FROM journal_entries 
    WHERE user_id = ${userId} 
      AND entry_date >= ${startDate} 
      AND entry_date <= ${endDate}
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
  const moodTrendsResult = await db.execute(sql`
    SELECT 
      DATE(entry_date) as date,
      AVG(mood_intensity) as avg_mood,
      COUNT(*) as entry_count,
      array_agg(DISTINCT mood) FILTER (WHERE mood IS NOT NULL) as moods
    FROM journal_entries 
    WHERE user_id = ${userId} 
      AND entry_date >= ${startDate} 
      AND entry_date <= ${endDate}
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
      AND entry_date >= ${startDate} 
      AND entry_date <= ${endDate}
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
  // Get goals from context files
  const goalsResult = await db
    .select()
    .from(contextFiles)
    .where(
      and(
        eq(contextFiles.userId, userId),
        sql`title LIKE '[Goal]%'`
      )
    )
    .orderBy(desc(contextFiles.createdAt))
    .limit(10);

  const goals = goalsResult.map(goal => {
    // Parse goal content to extract status and progress
    const content = goal.content;
    const statusMatch = content.match(/Status:\s*(\w+)/);
    const priorityMatch = content.match(/Priority:\s*(\w+)/);
    const targetDateMatch = content.match(/Target Date:\s*([^\n]+)/);
    
    return {
      id: goal.id,
      title: goal.title.replace('[Goal] ', ''),
      status: statusMatch?.[1] || 'Active',
      priority: priorityMatch?.[1] || 'medium',
      targetDate: targetDateMatch?.[1] || null,
      createdAt: goal.createdAt,
      updatedAt: goal.updatedAt
    };
  });

  const totalGoals = goals.length;
  const activeGoals = goals.filter(g => g.status === 'Active').length;
  const completedGoals = goals.filter(g => g.status === 'Completed').length;

  return {
    totalGoals,
    activeGoals,
    completedGoals,
    goals: goals.slice(0, 5) // Return top 5 for dashboard
  };
}

async function getRecentActivities(userId: string) {
  // Get recent journal entries
  const recentJournalResult = await db
    .select({
      id: journalEntries.id,
      title: journalEntries.title,
      type: journalEntries.type,
      createdAt: journalEntries.createdAt,
      mood: journalEntries.mood
    })
    .from(journalEntries)
    .where(eq(journalEntries.userId, userId))
    .orderBy(desc(journalEntries.createdAt))
    .limit(5);

  // Get recent goals
  const recentGoalsResult = await db
    .select({
      id: contextFiles.id,
      title: contextFiles.title,
      createdAt: contextFiles.createdAt
    })
    .from(contextFiles)
    .where(
      and(
        eq(contextFiles.userId, userId),
        sql`title LIKE '[Goal]%'`
      )
    )
    .orderBy(desc(contextFiles.createdAt))
    .limit(3);

  const activities = [
    ...recentJournalResult.map(entry => ({
      id: entry.id,
      type: 'journal',
      title: entry.title,
      subtitle: `${entry.type} entry${entry.mood ? ` • ${entry.mood}` : ''}`,
      timestamp: entry.createdAt,
      href: `/journal/${entry.id}`
    })),
    ...recentGoalsResult.map(goal => ({
      id: goal.id,
      type: 'goal',
      title: goal.title.replace('[Goal] ', ''),
      subtitle: 'Goal created',
      timestamp: goal.createdAt,
      href: `/goals`
    }))
  ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, 8);

  return activities;
}

async function getProductivityMetrics(userId: string, startDate: Date, endDate: Date) {
  // Calculate writing consistency (days with entries vs total days)
  const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  
  const activeDaysResult = await db.execute(sql`
    SELECT COUNT(DISTINCT DATE(entry_date)) as active_days
    FROM journal_entries 
    WHERE user_id = ${userId} 
      AND entry_date >= ${startDate} 
      AND entry_date <= ${endDate}
  `);

  const activeDays = parseInt(activeDaysResult[0]?.active_days) || 0;
  const consistency = totalDays > 0 ? (activeDays / totalDays) * 100 : 0;

  // Average words per entry
  const avgWordsResult = await db.execute(sql`
    SELECT AVG(
      CASE 
        WHEN plain_text_content IS NOT NULL 
        THEN array_length(string_to_array(trim(plain_text_content), ' '), 1)
        ELSE 0 
      END
    ) as avg_words
    FROM journal_entries 
    WHERE user_id = ${userId} 
      AND entry_date >= ${startDate} 
      AND entry_date <= ${endDate}
      AND plain_text_content IS NOT NULL
      AND trim(plain_text_content) != ''
  `);

  return {
    consistency: Math.round(consistency),
    activeDays,
    totalDays,
    averageWordsPerEntry: Math.round(parseFloat(avgWordsResult[0]?.avg_words) || 0)
  };
}
