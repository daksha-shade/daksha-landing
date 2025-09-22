import "server-only";
import { db } from "@/db/client";
import { embedText } from "@/lib/embeddings";
import { sql } from "drizzle-orm";

export type JournalSearchResult = {
  id: string;
  title: string | null;
  snippet: string;
  similarity: number;
  entryDate: Date | null;
};

export async function searchUserJournals(userId: string, query: string, limit = 5): Promise<JournalSearchResult[]> {
  const queryEmbedding = await embedText(query);
  const vectorSql = sql.raw(`'[${queryEmbedding.join(',')}]'`);

  const rows = await db.execute(sql`
    SELECT id, title, plain_text_content, entry_date,
           1 - (embedding <=> ${vectorSql}::vector) AS similarity
    FROM journal_entries
    WHERE user_id = ${userId} AND embedding IS NOT NULL
    ORDER BY embedding <=> ${vectorSql}::vector
    LIMIT ${limit}
  `);

  return rows.map((r: any) => ({
    id: r.id,
    title: r.title,
    entryDate: r.entry_date,
    similarity: r.similarity,
    snippet: (r.plain_text_content || "").slice(0, 280),
  }));
}

