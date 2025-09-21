import { NextRequest, NextResponse } from "next/server";
import { stackServerApp } from "@/stack";
import { db } from "@/db/client";
import { journalEntries } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { generateAISummaryAndSentiment } from "@/lib/journal-ai-analysis";

export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const user = await stackServerApp.getUser({ or: "return-null" });
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;
        const body = await req.json();
        const { content, mood, emotionalTags } = body;

        if (!content || typeof content !== 'string') {
            return NextResponse.json(
                { error: "Content is required for analysis" },
                { status: 400 }
            );
        }

        // Check if entry exists and belongs to user
        const existingEntry = await db
            .select()
            .from(journalEntries)
            .where(
                and(
                    eq(journalEntries.id, id),
                    eq(journalEntries.userId, user.id)
                )
            )
            .limit(1);

        if (existingEntry.length === 0) {
            return NextResponse.json({ error: "Journal entry not found" }, { status: 404 });
        }

        // Generate AI analysis
        const analysis = await generateAISummaryAndSentiment(content, {
            mood,
            emotionalTags,
            type: existingEntry[0].type
        });

        // Update the entry with AI analysis
        await db
            .update(journalEntries)
            .set({
                aiSummary: analysis.summary,
                aiInsights: analysis.insights,
                aiSentiment: analysis.sentiment,
                updatedAt: new Date(),
            })
            .where(eq(journalEntries.id, id));

        return NextResponse.json({
            message: "AI analysis completed successfully",
            analysis
        });
    } catch (error) {
        console.error("Journal analysis error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}