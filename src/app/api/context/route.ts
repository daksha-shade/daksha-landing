import { NextRequest, NextResponse } from "next/server";
import { stackServerApp } from "@/stack";
import { db } from "@/db/client";
import { contextFiles } from "@/db/schema";
import { createContextFileForUser } from "@/lib/context-service";
import { eq, desc } from "drizzle-orm";

export async function GET() {
  const user = await stackServerApp.getUser({ or: "return-null" });
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const userId = user.id;

  // Exclude embedding column to prevent timeout with large vector data
  const rows = await db
    .select({
      id: contextFiles.id,
      title: contextFiles.title,
      content: contextFiles.content,
      sourceUrl: contextFiles.sourceUrl,
      createdAt: contextFiles.createdAt,
      updatedAt: contextFiles.updatedAt,
    })
    .from(contextFiles)
    .where(eq(contextFiles.userId, userId))
    .orderBy(desc(contextFiles.updatedAt));

  return NextResponse.json({ items: rows });
}

export async function POST(req: NextRequest) {
  try {
    const user = await stackServerApp.getUser({ or: "return-null" });
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const userId = user.id;

    const body = await req.json() as { title?: string; content?: string; sourceUrl?: string };
    const { title, content, sourceUrl } = body;
    if (!title || !content) {
      return NextResponse.json({ error: "title and content are required" }, { status: 400 });
    }

    const created = await createContextFileForUser({ userId, title, content, sourceUrl });
    return NextResponse.json({ id: created.id });
  } catch (e: any) {
    console.error("/api/context error", e);
    return NextResponse.json({ error: e?.message ?? "Internal Error" }, { status: 500 });
  }
}
