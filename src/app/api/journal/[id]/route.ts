import { NextRequest, NextResponse } from "next/server";
import { stackServerApp } from "@/stack";
import { db } from "@/db/client";
import { journalEntries } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { embedText } from "@/lib/embeddings";
import { generateAIInsights } from "@/lib/journal-ai";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const user = await stackServerApp.getUser({ or: "return-null" });
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;

        const entry = await db
            .select()
            .from(journalEntries)
            .where(
                and(
                    eq(journalEntries.id, id),
                    eq(journalEntries.userId, user.id)
                )
            )
            .limit(1);

        if (entry.length === 0) {
            return NextResponse.json({ error: "Journal entry not found" }, { status: 404 });
        }

        return NextResponse.json({ entry: entry[0] });
    } catch (error) {
        console.error("Journal GET error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const user = await stackServerApp.getUser({ or: "return-null" });
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;
        const body = (await req.json()) as any;
        const {
            title,
            yooptaContent,
            plainTextContent,
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
            regenerateAI = false
        } = body;

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

        const updateData: any = {
            updatedAt: new Date(),
        };

        // Update fields if provided
        if (title !== undefined) updateData.title = title;
        if (yooptaContent !== undefined) {
            // Store Yoopta Editor JSON content directly
            updateData.yooptaContent = typeof yooptaContent === 'object' ? yooptaContent : null;
        }
        if (plainTextContent !== undefined) updateData.plainTextContent = plainTextContent;
        if (mood !== undefined) updateData.mood = mood;
        if (moodIntensity !== undefined) updateData.moodIntensity = moodIntensity;
        if (emotionalTags !== undefined) updateData.emotionalTags = emotionalTags;
        if (tags !== undefined) updateData.tags = tags;
        if (location !== undefined) updateData.location = location;
        if (weather !== undefined) updateData.weather = weather;
        if (audioUrl !== undefined) updateData.audioUrl = audioUrl;
        if (videoUrl !== undefined) updateData.videoUrl = videoUrl;
        if (imageUrls !== undefined) updateData.imageUrls = imageUrls;
        if (attachmentUrls !== undefined) updateData.attachmentUrls = attachmentUrls;
        if (duration !== undefined) updateData.duration = duration;
        if (transcript !== undefined) updateData.transcript = transcript;
        if (entryDate !== undefined) updateData.entryDate = new Date(entryDate);

        // Regenerate embedding if content changed
        if (yooptaContent !== undefined || plainTextContent !== undefined || transcript !== undefined) {
            const textForEmbedding = plainTextContent || transcript || title || existingEntry[0].title;
            updateData.embedding = await embedText(textForEmbedding);
        }

        // Regenerate AI insights if requested
        if (regenerateAI) {
            const textForAI = plainTextContent || transcript || existingEntry[0].plainTextContent;
            if (textForAI) {
                try {
                    const aiAnalysis = await generateAIInsights(textForAI, {
                        mood: mood || existingEntry[0].mood,
                        emotionalTags: emotionalTags || existingEntry[0].emotionalTags,
                        type: existingEntry[0].type
                    });
                    updateData.aiSummary = aiAnalysis.summary;
                    updateData.aiInsights = aiAnalysis.insights;
                    updateData.aiQuestions = aiAnalysis.questions;
                } catch (error) {
                    console.error("AI analysis failed:", error);
                }
            }
        }

        // Update the entry
        await db
            .update(journalEntries)
            .set(updateData)
            .where(eq(journalEntries.id, id));

        return NextResponse.json({
            message: "Journal entry updated successfully",
            aiSummary: updateData.aiSummary,
            aiInsights: updateData.aiInsights,
            aiQuestions: updateData.aiQuestions
        });
    } catch (error) {
        console.error("Journal PUT error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const user = await stackServerApp.getUser({ or: "return-null" });
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;

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

        // Delete the entry
        await db
            .delete(journalEntries)
            .where(eq(journalEntries.id, id));

        return NextResponse.json({ message: "Journal entry deleted successfully" });
    } catch (error) {
        console.error("Journal DELETE error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
