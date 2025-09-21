import { NextRequest, NextResponse } from "next/server";
import { stackServerApp } from "@/stack";
import { db } from "@/db/client";
import { journalEntries, journalStreaks, journalAnalytics } from "@/db/schema";
import { eq, desc, and, gte, lte, sql } from "drizzle-orm";
import { embedText } from "@/lib/embeddings";
import { generateAIInsights } from "@/lib/journal-ai";

export async function GET(req: NextRequest) {
  try {
    const user = await stackServerApp.getUser({ or: "return-null" });
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");
    const mood = searchParams.get("mood");
    const limit = parseInt(searchParams.get("limit") || "20");
    const offset = parseInt(searchParams.get("offset") || "0");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    // Build query conditions
    const conditions = [eq(journalEntries.userId, user.id)];

    if (type && type !== "all") {
      conditions.push(eq(journalEntries.type, type));
    }

    if (mood) {
      conditions.push(eq(journalEntries.mood, mood));
    }

    if (startDate) {
      conditions.push(gte(journalEntries.entryDate, new Date(startDate)));
    }

    if (endDate) {
      conditions.push(lte(journalEntries.entryDate, new Date(endDate)));
    }

    // Fetch entries
    const entries = await db
      .select({
        id: journalEntries.id,
        title: journalEntries.title,
        content: journalEntries.content,
        plainTextContent: journalEntries.plainTextContent,
        type: journalEntries.type,
        mood: journalEntries.mood,
        moodIntensity: journalEntries.moodIntensity,
        emotionalTags: journalEntries.emotionalTags,
        tags: journalEntries.tags,
        location: journalEntries.location,
        weather: journalEntries.weather,
        audioUrl: journalEntries.audioUrl,
        videoUrl: journalEntries.videoUrl,
        imageUrls: journalEntries.imageUrls,
        duration: journalEntries.duration,
        transcript: journalEntries.transcript,
        aiSummary: journalEntries.aiSummary,
        aiInsights: journalEntries.aiInsights,
        entryDate: journalEntries.entryDate,
        createdAt: journalEntries.createdAt,
        updatedAt: journalEntries.updatedAt,
      })
      .from(journalEntries)
      .where(and(...conditions))
      .orderBy(desc(journalEntries.entryDate))
      .limit(limit)
      .offset(offset);

    // Get total count for pagination
    const totalResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(journalEntries)
      .where(and(...conditions));

    const total = totalResult[0]?.count || 0;

    return NextResponse.json({
      entries,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total
      }
    });
  } catch (error) {
    console.error("Journal GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await stackServerApp.getUser({ or: "return-null" });
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      title,
      content, // This will be JSON from Tiptap
      plainTextContent,
      type = "text",
      mood,
      moodIntensity,
      emotionalTags,
      tags,
      location,
      weather,
      audioUrl,
      videoUrl,
      imageUrls,
      attachmentUrls,
      duration,
      transcript,
      entryDate,
      generateAI = true
    } = body;

    if (!title || (!content && !audioUrl && !videoUrl)) {
      return NextResponse.json(
        { error: "Title and content (or media) are required" },
        { status: 400 }
      );
    }

    const id = crypto.randomUUID();
    const now = new Date();
    const journalDate = entryDate ? new Date(entryDate) : now;

    // Generate embedding for semantic search
    const textForEmbedding = plainTextContent || content || transcript || title;
    const embedding = await embedText(textForEmbedding);

    // Generate AI analysis if requested
    let aiSummary, aiInsights, aiQuestions, aiSentiment;
    if (generateAI && textForEmbedding) {
      try {
        const { generateAISummaryAndSentiment } = await import("@/lib/journal-ai-analysis");
        const aiAnalysis = await generateAISummaryAndSentiment(textForEmbedding, {
          mood,
          emotionalTags,
          type
        });
        aiSummary = aiAnalysis.summary;
        aiInsights = aiAnalysis.insights;
        aiSentiment = aiAnalysis.sentiment;
        // Generate some reflection questions based on insights
        aiQuestions = aiAnalysis.insights.map(insight =>
          `How does this insight about "${insight.toLowerCase()}" relate to your current goals?`
        );
      } catch (error) {
        console.error("AI analysis failed:", error);
        // Continue without AI analysis
      }
    }

    // Ensure content is stored as JSON string if it's an object
    const contentToStore = typeof content === 'object' ? JSON.stringify(content) : content;

    // Insert journal entry
    await db.insert(journalEntries).values({
      id,
      userId: user.id,
      title,
      content: contentToStore,
      plainTextContent,
      type,
      mood,
      moodIntensity,
      emotionalTags,
      tags,
      location,
      weather,
      audioUrl,
      videoUrl,
      imageUrls,
      attachmentUrls,
      duration,
      transcript,
      aiSummary,
      aiInsights,
      aiQuestions,
      aiSentiment,
      embedding,
      entryDate: journalDate,
      createdAt: now,
      updatedAt: now,
    });

    // Update streak information
    await updateJournalStreak(user.id, journalDate);

    // Update daily analytics
    await updateDailyAnalytics(user.id, journalDate, {
      mood: moodIntensity,
      emotions: emotionalTags,
      tags,
      wordCount: plainTextContent?.split(' ').length || 0
    });

    return NextResponse.json({
      id,
      message: "Journal entry created successfully",
      aiSummary,
      aiInsights,
      aiQuestions,
      aiSentiment
    });
  } catch (error) {
    console.error("Journal POST error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// Helper function to update journal streak
async function updateJournalStreak(userId: string, entryDate: Date) {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const entryDay = new Date(entryDate);
    entryDay.setHours(0, 0, 0, 0);

    // Get current streak data
    const streakData = await db
      .select()
      .from(journalStreaks)
      .where(eq(journalStreaks.userId, userId))
      .limit(1);

    if (streakData.length === 0) {
      // Create new streak record
      await db.insert(journalStreaks).values({
        id: crypto.randomUUID(),
        userId,
        currentStreak: 1,
        longestStreak: 1,
        totalEntries: 1,
        lastEntryDate: entryDate,
        streakStartDate: entryDate,
        updatedAt: new Date(),
      });
    } else {
      const streak = streakData[0];
      const lastEntryDay = new Date(streak.lastEntryDate || 0);
      lastEntryDay.setHours(0, 0, 0, 0);

      const daysDiff = Math.floor((entryDay.getTime() - lastEntryDay.getTime()) / (1000 * 60 * 60 * 24));

      let newCurrentStreak = streak.currentStreak;
      let newStreakStartDate = streak.streakStartDate;

      if (daysDiff === 1) {
        // Consecutive day
        newCurrentStreak += 1;
      } else if (daysDiff > 1) {
        // Streak broken, start new
        newCurrentStreak = 1;
        newStreakStartDate = entryDate;
      }
      // If daysDiff === 0, it's the same day, don't change streak

      const newLongestStreak = Math.max(streak.longestStreak, newCurrentStreak);

      await db
        .update(journalStreaks)
        .set({
          currentStreak: newCurrentStreak,
          longestStreak: newLongestStreak,
          totalEntries: streak.totalEntries + 1,
          lastEntryDate: entryDate,
          streakStartDate: newStreakStartDate,
          updatedAt: new Date(),
        })
        .where(eq(journalStreaks.userId, userId));
    }
  } catch (error) {
    console.error("Error updating journal streak:", error);
  }
}

// Helper function to update daily analytics
async function updateDailyAnalytics(
  userId: string,
  entryDate: Date,
  data: { mood?: number; emotions?: string[]; tags?: string[]; wordCount: number }
) {
  try {
    const analyticsDate = new Date(entryDate);
    analyticsDate.setHours(0, 0, 0, 0);

    // Check if analytics record exists for this date
    const existing = await db
      .select()
      .from(journalAnalytics)
      .where(
        and(
          eq(journalAnalytics.userId, userId),
          eq(journalAnalytics.date, analyticsDate)
        )
      )
      .limit(1);

    if (existing.length === 0) {
      // Create new analytics record
      await db.insert(journalAnalytics).values({
        id: crypto.randomUUID(),
        userId,
        date: analyticsDate,
        entryCount: 1,
        wordCount: data.wordCount,
        averageMood: data.mood || null,
        dominantEmotions: data.emotions || [],
        topTags: data.tags || [],
        createdAt: new Date(),
      });
    } else {
      // Update existing record
      const current = existing[0];
      const newEntryCount = current.entryCount + 1;
      const newWordCount = current.wordCount + data.wordCount;

      let newAverageMood = current.averageMood;
      if (data.mood && current.averageMood) {
        newAverageMood = (current.averageMood * current.entryCount + data.mood) / newEntryCount;
      } else if (data.mood) {
        newAverageMood = data.mood;
      }

      // Merge emotions and tags (simple approach)
      const newEmotions = [...(current.dominantEmotions || []), ...(data.emotions || [])];
      const newTags = [...(current.topTags || []), ...(data.tags || [])];

      await db
        .update(journalAnalytics)
        .set({
          entryCount: newEntryCount,
          wordCount: newWordCount,
          averageMood: newAverageMood,
          dominantEmotions: newEmotions,
          topTags: newTags,
        })
        .where(eq(journalAnalytics.id, current.id));
    }
  } catch (error) {
    console.error("Error updating daily analytics:", error);
  }
}