import "server-only";
import { db } from "@/db/client";
import { contextFiles, journalEntries } from "@/db/schema";
import { embedText, storeEmbeddingsInMilvus } from "@/lib/embeddings";
import { ensureDbSchema } from "@/db/sync";
import { milvusClient } from "@/db/milvus";
import { inArray } from "drizzle-orm";

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

  // Insert context file row
  await db.insert(contextFiles).values({
    id,
    userId,
    title,
    content,
    sourceUrl,
    embeddingId: null, // Will be set later when we store in Milvus
  });

  // Store embedding in Milvus
  await storeEmbeddingsInMilvus([embedding], [id], "context_files");

  return { id, title, content };
}

export async function searchUserContext(userId: string, query: string, limit = 5) {
  // Generate embedding for the search query
  const queryEmbedding = await embedText(query);

  // Search in Milvus
  const contextFilesResults = await milvusClient.search({
    collection_name: "context_files",
    vector: queryEmbedding,
    limit,
  });

  const journalEntriesResults = await milvusClient.search({
    collection_name: "journal_entries",
    vector: queryEmbedding,
    limit,
  });

  const contextFilesIds = contextFilesResults.results.map((r: any) => r.id);
  const journalEntriesIds = journalEntriesResults.results.map((r: any) => r.id);

  const contextFilesRows = contextFilesIds.length > 0 ? await db.select().from(contextFiles).where(inArray(contextFiles.id, contextFilesIds)) : [];
  const journalEntriesRows = journalEntriesIds.length > 0 ? await db.select().from(journalEntries).where(inArray(journalEntries.id, journalEntriesIds)) : [];

  const contextFilesTransformed = contextFilesRows.map((r) => {
    const milvusResult = contextFilesResults.results.find((sr: any) => sr.id === r.id);
    return {
      id: r.id,
      score: milvusResult.score,
      payload: {
        userId,
        contextFileId: r.id,
        title: r.title,
        chunkText: r.content,
        sourceUrl: r.sourceUrl,
        sourceType: "context_file",
      }
    };
  });

  const journalEntriesTransformed = journalEntriesRows.map((r) => {
    const milvusResult = journalEntriesResults.results.find((sr: any) => sr.id === r.id);
    return {
      id: r.id,
      score: milvusResult.score,
      payload: {
        userId,
        contextFileId: r.id,
        title: r.title,
        chunkText: r.plainTextContent,
        sourceUrl: null,
        sourceType: "journal_entry",
      }
    };
  });

  const allResults = [...contextFilesTransformed, ...journalEntriesTransformed];
  allResults.sort((a, b) => b.score - a.score);

  return allResults.slice(0, limit);
}