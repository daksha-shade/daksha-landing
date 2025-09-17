import { NextRequest, NextResponse } from "next/server";
import { stackServerApp } from "@/stack";
import { db } from "@/db/client";
import { contextFiles } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { nanoid } from "nanoid";

export async function POST(req: NextRequest) {
  try {
    const user = await stackServerApp.getUser({ or: "return-null" });
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json() as {
      content: string;
      title?: string;
      mood?: string;
      tags?: string[];
    };
    const { content, title, mood, tags } = body;
    
    if (!content || typeof content !== 'string') {
      return NextResponse.json(
        { error: "Content is required" },
        { status: 400 }
      );
    }

    // Create a journal entry as a context file with special metadata
    const journalId = nanoid();
    const journalTitle = title || `Journal Entry - ${new Date().toLocaleDateString()}`;
    
    // Add metadata to identify this as a journal entry
    const journalContent = `
JOURNAL ENTRY: ${journalTitle}
Date: ${new Date().toISOString()}
${mood ? `Mood: ${mood}` : ''}
${tags ? `Tags: ${tags.join(', ')}` : ''}

${content}
    `.trim();

    const [journalEntry] = await db.insert(contextFiles).values({
      id: journalId,
      userId: user.id,
      title: `[Journal] ${journalTitle}`,
      content: journalContent,
    }).returning();

    return NextResponse.json({
      id: journalEntry.id,
      title: journalEntry.title,
      content: journalEntry.content,
      createdAt: journalEntry.createdAt,
    });

  } catch (error) {
    console.error("Journal API error:", error);
    return NextResponse.json(
      { error: "Failed to save journal entry" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const user = await stackServerApp.getUser({ or: "return-null" });
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get recent journal entries
    const journals = await db
      .select()
      .from(contextFiles)
      .where(eq(contextFiles.userId, user.id))
      .orderBy(desc(contextFiles.createdAt))
      .limit(10);

    // Filter for journal entries (those with [Journal] prefix)
    const journalEntries = journals
      .filter(entry => entry.title.startsWith('[Journal]'))
      .map(entry => ({
        id: entry.id,
        title: entry.title.replace('[Journal] ', ''),
        content: entry.content,
        createdAt: entry.createdAt,
      }));

    return NextResponse.json({ journals: journalEntries });

  } catch (error) {
    console.error("Journal API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch journal entries" },
      { status: 500 }
    );
  }
}