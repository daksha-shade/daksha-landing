import "server-only";
import { db } from "@/db/client";
import { contextEmbeddings, contextFiles } from "@/db/schema";
import { CONTEXT_COLLECTION, ensureCollection, getQdrant } from "@/lib/qdrant";
import { EMBEDDING_DIMS, EMBEDDING_MODEL, chunkText, embedText } from "@/lib/embeddings";
import { sql } from "drizzle-orm";
import { ensureDbSchema } from "@/db/sync";

export type CreateContextInput = {
  userId: string;
  title: string;
  content: string; // plain text
  sourceUrl?: string;
};

export async function createContextFileForUser(input: CreateContextInput) {
  const { userId, title, content, sourceUrl } = input;
  if (!userId) throw new Error("userId is required");
  if (!title?.trim()) throw new Error("title is required");
  if (!content?.trim()) throw new Error("content is required");

  const id = crypto.randomUUID();

  // Ensure schema exists (idempotent)
  await ensureDbSchema();

  // Insert context file row
  await db.insert(contextFiles).values({
    id,
    userId,
    title,
    content,
    sourceUrl,
  });

  // Prepare vector store
  await ensureCollection(EMBEDDING_DIMS);
  const qdrant = getQdrant();

  const chunks = chunkText(content);
  const points: { id: string; vector: number[]; payload: Record<string, any> }[] = [];

  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    const vector = await embedText(chunk);
    const pointId = crypto.randomUUID();
    points.push({
      id: pointId,
      vector,
      payload: {
        userId,
        contextFileId: id,
        title,
        position: i,
        sourceUrl: sourceUrl ?? null,
        chunkText: chunk,
      },
    });

    // Record in Postgres
    await db.insert(contextEmbeddings).values({
      id: pointId,
      contextFileId: id,
      userId,
      chunkText: chunk,
      model: EMBEDDING_MODEL,
      dims: vector.length,
      metadata: { position: i },
    });
  }

  // Upsert to Qdrant
  if (points.length) {
    await qdrant.upsert(CONTEXT_COLLECTION, {
      wait: true,
      points,
    });
  }

  return { id };
}

export async function searchUserContext(userId: string, query: string, limit = 5) {
  const qdrant = getQdrant();
  const vector = await embedText(query);
  const res = await qdrant.search(CONTEXT_COLLECTION, {
    vector,
    limit,
    filter: {
      must: [
        {
          key: "userId",
          match: { value: userId },
        },
      ],
    },
    with_payload: true,
    score_threshold: 0.2,
  });

  const matches = res as unknown as Array<
    { id: string | number; payload: any; score: number }
  >;

  return matches;
}
