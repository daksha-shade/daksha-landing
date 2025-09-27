import "server-only";
import { db } from "@/db/client";
import { embedText } from "@/lib/embeddings";
import { milvusClient } from "@/db/milvus";
import { journalEntries } from "@/db/schema";
import { eq, inArray } from "drizzle-orm";

export type JournalSearchResult = {
  id: string;
  title: string | null;
  snippet: string;
  similarity: number;
  entryDate: Date | null;
};

export async function searchUserJournals(userId: string, query: string, limit = 5): Promise<JournalSearchResult[]> {
  const queryEmbedding = await embedText(query);

  if (!milvusClient) {
    throw new Error("Milvus client is not available");
  }

  const searchResults = await milvusClient.search({
    collection_name: "journal_entries",
    vector: queryEmbedding,
    limit,
  });

  const ids = searchResults.results.map((r: any) => r.id);

  if (ids.length === 0) {
    return [];
  }

  const rows = await db.select().from(journalEntries).where(inArray(journalEntries.id, ids));

  return rows.map((r) => {
    const milvusResult = searchResults.results.find((sr: any) => sr.id === r.id);
    return {
      id: r.id,
      title: r.title,
      entryDate: r.entryDate,
      similarity: milvusResult?.score || 0,
      snippet: (r.plainTextContent || "").slice(0, 280),
    };
  });
}