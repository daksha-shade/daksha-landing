import { NextRequest, NextResponse } from "next/server";
import { stackServerApp } from "@/stack";
import { db } from "@/db/client";
import { contextFiles } from "@/db/schema";
import { eq } from "drizzle-orm";
import { embedText } from "@/lib/embeddings";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await stackServerApp.getUser({ or: "return-null" });
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;

    const contextFile = await db
      .select({
        id: contextFiles.id,
        title: contextFiles.title,
        content: contextFiles.content,
        sourceUrl: contextFiles.sourceUrl,
        userId: contextFiles.userId,
        createdAt: contextFiles.createdAt,
        updatedAt: contextFiles.updatedAt,
      })
      .from(contextFiles)
      .where(eq(contextFiles.id, id))
      .limit(1);

    if (contextFile.length === 0) {
      return NextResponse.json({ error: "Context file not found" }, { status: 404 });
    }

    const file = contextFile[0];
    
    // Check if user owns this context file
    if (file.userId !== user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json(file);
  } catch (error) {
    console.error("Error fetching context file:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await stackServerApp.getUser({ or: "return-null" });
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const body = await req.json() as { title: string; content: string };
    const { title, content } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    // Check if context file exists and belongs to user
    const existingFile = await db
      .select()
      .from(contextFiles)
      .where(eq(contextFiles.id, id))
      .limit(1);

    if (existingFile.length === 0) {
      return NextResponse.json({ error: "Context file not found" }, { status: 404 });
    }

    if (existingFile[0].userId !== user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Generate new embedding for updated content
    const embedding = await embedText(content);

    // Update the context file
    const updatedFile = await db
      .update(contextFiles)
      .set({
        title,
        content,
        embedding,
        updatedAt: new Date(),
      })
      .where(eq(contextFiles.id, id))
      .returning();

    return NextResponse.json(updatedFile[0]);
  } catch (error) {
    console.error("Error updating context file:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await stackServerApp.getUser({ or: "return-null" });
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;

    // Check if context file exists and belongs to user
    const existingFile = await db
      .select()
      .from(contextFiles)
      .where(eq(contextFiles.id, id))
      .limit(1);

    if (existingFile.length === 0) {
      return NextResponse.json({ error: "Context file not found" }, { status: 404 });
    }

    if (existingFile[0].userId !== user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Delete the context file
    await db.delete(contextFiles).where(eq(contextFiles.id, id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting context file:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}