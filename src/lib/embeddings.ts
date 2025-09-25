import OpenAI from "openai";
import { milvusClient } from "@/db/milvus";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const EMBEDDING_MODEL = "text-embedding-3-small"; // 1536 dims
export const EMBEDDING_DIMS = 1536;

export async function embedText(text: string) {
  const res = await openai.embeddings.create({ model: EMBEDDING_MODEL, input: text });
  const [embedding] = res.data;
  return embedding?.embedding as number[];
}

export async function storeEmbeddingsInMilvus(embeddings: number[][], ids: string[], collectionName: string) {
  // Only execute on server side
  if (typeof window !== 'undefined' || !milvusClient) {
    console.warn('Milvus client not available on client side');
    return;
  }
  
  await milvusClient.insert({
    collection_name: collectionName,
    fields_data: [
      {
        name: "id",
        type: 21, // VarChar
        values: ids,
      },
      {
        name: "embedding",
        type: 101, // FloatVector
        values: embeddings,
      },
    ],
  });
}

// Simple chunker: split by paragraphs and cap length
export function chunkText(text: string, maxChars = 1200): string[] {
  const paras = text
    .replace(/\r\n/g, "\n")
    .split(/\n\s*\n/)
    .map((s) => s.trim())
    .filter(Boolean);

  const chunks: string[] = [];
  let buf = "";
  for (const p of paras) {
    if ((buf + "\n\n" + p).length > maxChars) {
      if (buf) chunks.push(buf.trim());
      if (p.length > maxChars) {
        // hard split long paragraph
        for (let i = 0; i < p.length; i += maxChars) {
          chunks.push(p.slice(i, i + maxChars));
        }
        buf = "";
      } else {
        buf = p;
      }
    } else {
      buf = buf ? `${buf}\n\n${p}` : p;
    }
  }
  if (buf) chunks.push(buf.trim());
  return chunks;
}