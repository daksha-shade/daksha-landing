import { NextRequest, NextResponse } from "next/server";
import { stackServerApp } from "@/stack";
import { db } from "@/db/client";
import { notes } from "@/db/schema";
import { eq, and } from "drizzle-orm";

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

    const result = await db
      .select()
      .from(notes)
      .where(and(eq(notes.id, id), eq(notes.userId, user.id)))
      .limit(1);

    if (result.length === 0) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }

    return NextResponse.json({ note: result[0] });
  } catch (error) {
    console.error("Note fetch error:", error);
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
    const body = await req.json() as {
      title?: string;
      content?: string;
      category?: string;
      tags?: string[];
      isFavorite?: boolean;
    };

    // Verify note exists and belongs to user
    const existingNote = await db
      .select()
      .from(notes)
      .where(and(eq(notes.id, id), eq(notes.userId, user.id)))
      .limit(1);

    if (existingNote.length === 0) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }

    // Update note
    const updatedNote = await db
      .update(notes)
      .set({
        ...body,
        updatedAt: new Date(),
      })
      .where(and(eq(notes.id, id), eq(notes.userId, user.id)))
      .returning();

    return NextResponse.json({ note: updatedNote[0] });
  } catch (error) {
    console.error("Note update error:", error);
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

    // Verify note exists and belongs to user
    const existingNote = await db
      .select()
      .from(notes)
      .where(and(eq(notes.id, id), eq(notes.userId, user.id)))
      .limit(1);

    if (existingNote.length === 0) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }

    // Delete note
    await db
      .delete(notes)
      .where(and(eq(notes.id, id), eq(notes.userId, user.id)));

    return NextResponse.json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("Note deletion error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}