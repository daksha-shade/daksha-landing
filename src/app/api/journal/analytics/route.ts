import { NextRequest, NextResponse } from "next/server";
import { stackServerApp } from "@/stack";
import { db } from "@/db/client";
import { journalEntries, journalStreaks, journalAnalytics } from "@/db/schema";
import { eq, and, gte, lte, sql, desc } from "drizzle-orm";

export async function GET(req: NextRequest) {
    try {
        const user = await stackServerApp.getUser({ or: "return-null" });
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const period = searchParams.get("period") || "week"; // week, month, year
        const startDate = searchParams.get("startDate");
        const endDate = searchParams.get("endDate");

        // Calculate date range
        const now = new Date();
        let fromDate: Date;
        let toDate = new Date(now);

        if (startDate && endDate) {
            fromDate = new Date(startDate);
            toDate = new Date(endDate);
        } else {
            switch (period) {
                case "week":
                    fromDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                    break;
                case "month":
                    fromDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
                    break;
                case "year":
                    fromDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
                    break;
                default:
                    fromDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            }
        }

        // Get streak information
        const streakData = await db
            .select()
            .from(journalStreaks)
            .where(eq(journalStreaks.userId, user.id))
            .limit(1);

        const streak = streakData[0] || {
            currentStreak: 0,
            longestStreak: 0,
            totalEntries: 0,
        };

        // Get daily analytics for the period
        const dailyAnalytics = await db
            .select()
            .from(journalAnalytics)
            .where(
                and(
                    eq(journalAnalytics.userId, user.id),
                    gte(journalAnalytics.date, fromDate),
                    lte(journalAnalytics.date, toDate)
                )
            )
            .orderBy(desc(journalAnalytics.date));

        // Get entry statistics
        const entryStats = await db
            .select({
                type: journalEntries.type,
                count: sql<number>`count(*)`,
                avgMood: sql<number>`avg(${journalEntries.moodIntensity})`,
            })
            .from(journalEntries)
            .where(
                and(
                    eq(journalEntries.userId, user.id),
                    gte(journalEntries.entryDate, fromDate),
                    lte(journalEntries.entryDate, toDate)
                )
            )
            .groupBy(journalEntries.type);

        // Get mood distribution
        const moodStats = await db
            .select({
                mood: journalEntries.mood,
                count: sql<number>`count(*)`,
                avgIntensity: sql<number>`avg(${journalEntries.moodIntensity})`,
            })
            .from(journalEntries)
            .where(
                and(
                    eq(journalEntries.userId, user.id),
                    gte(journalEntries.entryDate, fromDate),
                    lte(journalEntries.entryDate, toDate)
                )
            )
            .groupBy(journalEntries.mood);

        // Get most used tags
        const tagStats = await db
            .select({
                tags: journalEntries.tags,
            })
            .from(journalEntries)
            .where(
                and(
                    eq(journalEntries.userId, user.id),
                    gte(journalEntries.entryDate, fromDate),
                    lte(journalEntries.entryDate, toDate)
                )
            );

        // Process tags to get frequency
        const tagFrequency: Record<string, number> = {};
        tagStats.forEach(entry => {
            if (entry.tags && Array.isArray(entry.tags)) {
                entry.tags.forEach(tag => {
                    tagFrequency[tag] = (tagFrequency[tag] || 0) + 1;
                });
            }
        });

        const topTags = Object.entries(tagFrequency)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 10)
            .map(([tag, count]) => ({ tag, count }));

        // Calculate writing consistency (entries per day)
        const totalDays = Math.ceil((toDate.getTime() - fromDate.getTime()) / (1000 * 60 * 60 * 24));
        const totalEntries = entryStats.reduce((sum, stat) => sum + stat.count, 0);
        const averageEntriesPerDay = totalEntries / totalDays;

        // Get word count statistics
        const wordCountStats = await db
            .select({
                totalWords: sql<number>`sum(${journalAnalytics.wordCount})`,
                avgWordsPerEntry: sql<number>`avg(${journalAnalytics.wordCount})`,
            })
            .from(journalAnalytics)
            .where(
                and(
                    eq(journalAnalytics.userId, user.id),
                    gte(journalAnalytics.date, fromDate),
                    lte(journalAnalytics.date, toDate)
                )
            );

        const wordStats = wordCountStats[0] || { totalWords: 0, avgWordsPerEntry: 0 };

        return NextResponse.json({
            period,
            dateRange: {
                from: fromDate.toISOString(),
                to: toDate.toISOString(),
            },
            streak: {
                current: streak.currentStreak,
                longest: streak.longestStreak,
                total: streak.totalEntries,
            },
            entries: {
                total: totalEntries,
                byType: entryStats,
                averagePerDay: Math.round(averageEntriesPerDay * 100) / 100,
            },
            mood: {
                distribution: moodStats.filter(m => m.mood),
                averageIntensity: moodStats.reduce((sum, m) => sum + (m.avgIntensity || 0), 0) / moodStats.length || 0,
            },
            tags: {
                top: topTags,
                total: Object.keys(tagFrequency).length,
            },
            writing: {
                totalWords: wordStats.totalWords || 0,
                averageWordsPerEntry: Math.round((wordStats.avgWordsPerEntry || 0) * 100) / 100,
            },
            dailyAnalytics: dailyAnalytics.map(day => ({
                date: day.date,
                entries: day.entryCount,
                words: day.wordCount,
                averageMood: day.averageMood,
                emotions: day.dominantEmotions,
                tags: day.topTags,
            })),
        });
    } catch (error) {
        console.error("Journal analytics error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}