import { NextRequest, NextResponse } from "next/server";
import { stackServerApp } from "@/stack";
import { db } from "@/db/client";
import { contextFiles, contextEmbeddings } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { getQdrant, CONTEXT_COLLECTION } from "@/lib/qdrant";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await stackServerApp.getUser({ or: "return-null" });
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const fileId = params.id;
    const userId = user.id;

    // Verify the file belongs to the user
    const file = await db
      .select()
      .from(contextFiles)
      .where(and(eq(contextFiles.id, fileId), eq(contextFiles.userId, userId)))
      .limit(1);

    if (file.length === 0) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    // Get all embedding IDs for this context file
    const embeddings = await db
      .select({ id: contextEmbeddings.id })
      .from(contextEmbeddings)
      .where(eq(contextEmbeddings.contextFileId, fileId));

    // Delete from Qdrant vector database
    if (embeddings.length > 0) {
      try {
        const qdrant = getQdrant();
        const pointIds = embeddings.map(e => e.id);
        await qdrant.delete(CONTEXT_COLLECTION, {
          wait: true,
          points: pointIds,
        });
      } catch (error) {
        console.error("Error deleting from Qdrant:", error);
        // Continue with database deletion even if Qdrant fails
      }
    }

    // Delete embeddings from PostgreSQL
    await db
      .delete(contextEmbeddings)
      .where(eq(contextEmbeddings.contextFileId, fileId));

    // Delete the context file
    await db
      .delete(contextFiles)
      .where(and(eq(contextFiles.id, fileId), eq(contextFiles.userId, userId)));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting context file:", error);
    return NextResponse.json(
      { error: "Failed to delete context file" },
      { status: 500 }
    );
  }
}