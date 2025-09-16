import "server-only";
import { QdrantClient } from "@qdrant/js-client-rest";

const QDRANT_URL = process.env.QDRANT_URL;
const QDRANT_API_KEY = process.env.QDRANT_API_KEY;

export const CONTEXT_COLLECTION = "daksha_context";

if (!QDRANT_URL || !QDRANT_API_KEY) {
  console.warn("Qdrant env not fully set; vector features will be disabled.");
}

export function getQdrant() {
  if (!QDRANT_URL || !QDRANT_API_KEY) {
    throw new Error("QDRANT_URL or QDRANT_API_KEY not set");
  }
  return new QdrantClient({ url: QDRANT_URL, apiKey: QDRANT_API_KEY });
}

export async function ensureCollection(dimensions: number) {
  const client = getQdrant();
  const collections = await client.getCollections();
  const exists = collections.collections?.some((c) => c.name === CONTEXT_COLLECTION);
  if (!exists) {
    await client.createCollection(CONTEXT_COLLECTION, {
      vectors: { size: dimensions, distance: "Cosine" },
    });
  }
}

