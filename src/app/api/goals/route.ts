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
      title: string;
      description?: string;
      targetDate?: string;
      priority?: string;
    };
    const { title, description, targetDate, priority = 'medium' } = body;
    
    if (!title || typeof title !== 'string') {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }

    // Create a goal as a context file with special metadata
    const goalId = nanoid();
    
    const goalContent = `
GOAL: ${title}
Status: Active
Priority: ${priority}
${targetDate ? `Target Date: ${targetDate}` : ''}
Created: ${new Date().toISOString()}

Description:
${description || 'No description provided'}

Progress:
- Goal created
    `.trim();

    const [goal] = await db.insert(contextFiles).values({
      id: goalId,
      userId: user.id,
      title: `[Goal] ${title}`,
      content: goalContent,
    }).returning();

    return NextResponse.json({
      id: goal.id,
      title: goal.title,
      content: goal.content,
      createdAt: goal.createdAt,
    });

  } catch (error) {
    console.error("Goals API error:", error);
    return NextResponse.json(
      { error: "Failed to create goal" },
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

    // Get recent goals
    const contexts = await db
      .select()
      .from(contextFiles)
      .where(eq(contextFiles.userId, user.id))
      .orderBy(desc(contextFiles.createdAt))
      .limit(20);

    // Filter for goals (those with [Goal] prefix)
    const goals = contexts
      .filter(entry => entry.title.startsWith('[Goal]'))
      .map(entry => ({
        id: entry.id,
        title: entry.title.replace('[Goal] ', ''),
        content: entry.content,
        createdAt: entry.createdAt,
      }));

    return NextResponse.json({ goals });

  } catch (error) {
    console.error("Goals API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch goals" },
      { status: 500 }
    );
  }
}