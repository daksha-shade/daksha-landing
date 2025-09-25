import { NextRequest, NextResponse } from "next/server";
import { stackServerApp } from "@/stack";
import { db } from "@/db/client";
import { notes } from "@/db/schema";
import { eq, desc, and, or, ilike } from "drizzle-orm";
import { nanoid } from "nanoid";

export async function GET(req: NextRequest) {
  try {
    const user = await stackServerApp.getUser({ or: "return-null" });
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search");
    const category = searchParams.get("category");
    const limit = parseInt(searchParams.get("limit") || "50");
    const offset = parseInt(searchParams.get("offset") || "0");

    // Apply filters and build query
    const conditions = [eq(notes.userId, user.id)];
    
    if (search) {
      conditions.push(
        or(
          ilike(notes.title, `%${search}%`),
          ilike(notes.content, `%${search}%`)
        )!
      );
    }

    if (category && category !== "All") {
      conditions.push(eq(notes.category, category));
    }

    const result = await db
      .select()
      .from(notes)
      .where(and(...conditions))
      .orderBy(desc(notes.updatedAt))
      .limit(limit)
      .offset(offset);

    return NextResponse.json({ notes: result });
  } catch (error) {
    console.error("Notes API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await stackServerApp.getUser({ or: "return-null" });
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json() as {
      title: string;
      content: string;
      category?: string;
      tags?: string[];
      aiGenerated?: boolean;
    };
    const { title, content, category = "Personal", tags = [], aiGenerated = false } = body;

    if (!title || !content) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 });
    }

    const noteId = nanoid();
    const newNote = {
      id: noteId,
      userId: user.id,
      title,
      content,
      category,
      tags,
      isFavorite: false,
      aiGenerated,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await db.insert(notes).values(newNote);

    return NextResponse.json({ note: newNote }, { status: 201 });
  } catch (error) {
    console.error("Notes creation error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}