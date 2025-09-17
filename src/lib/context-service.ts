import "server-only";
import { db } from "@/db/client";
import { contextFiles } from "@/db/schema";
import { embedText } from "@/lib/embeddings";
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

  // Generate embedding for the content
  const embedding = await embedText(content);

  // Insert context file row with embedding
  await db.insert(contextFiles).values({
    id,
    userId,
    title,
    content,
    embedding: embedding, // Store as number array directly
    sourceUrl,
  });

  return { id, title, content };
}

export async function searchUserContext(userId: string, query: string, limit = 5) {
  // Generate embedding for the search query
  const queryEmbedding = await embedText(query);
  
  // Use pgvector's cosine similarity for search
  const results = await db.execute(sql`
    SELECT 
      id,
      title,
      content,
      source_url,
      created_at,
      updated_at,
      1 - (embedding <=> ${sql.raw(`'[${queryEmbedding.join(',')}]'`)}::vector) as similarity
    FROM context_files 
    WHERE user_id = ${userId}
      AND embedding IS NOT NULL
    ORDER BY embedding <=> ${sql.raw(`'[${queryEmbedding.join(',')}]'`)}::vector
    LIMIT ${limit}
  `);

  // Transform results to match expected format
  return results.map((row: any) => ({
    id: row.id,
    score: row.similarity,
    payload: {
      userId,
      contextFileId: row.id,
      title: row.title,
      chunkText: row.content,
      sourceUrl: row.source_url,
    }
  }));
}
