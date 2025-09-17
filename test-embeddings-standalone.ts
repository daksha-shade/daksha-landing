import "dotenv/config";
import { QdrantClient } from "@qdrant/js-client-rest";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./src/db/schema";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

const sql = postgres(connectionString, {
  ssl: "require",
  max: 1,
  onnotice: () => {} // Suppress notices
});

const db = drizzle(sql, { schema });

async function testEmbeddingsStandalone() {
  console.log("🧪 Testing embedding system...");
  
  try {
    // Test 1: Check Qdrant collection
    console.log("\n🔍 Checking Qdrant collection...");
    const qdrant = new QdrantClient({
      url: process.env.QDRANT_URL!,
      apiKey: process.env.QDRANT_API_KEY!,
    });
    
    const collectionInfo = await qdrant.getCollection("daksha_context");
    console.log("📈 Collection points count:", collectionInfo.points_count);
    console.log("📏 Vector config:", collectionInfo.config?.params?.vectors);
    
    // Test 2: Check database for context files
    console.log("\n📋 Checking database for context files...");
    const contextFiles = await db.select().from(schema.contextFiles).limit(5);
    console.log("📄 Found", contextFiles.length, "context files in database");
    
    if (contextFiles.length > 0) {
      console.log("📝 Sample file:", {
        id: contextFiles[0].id,
        title: contextFiles[0].title,
        updatedAt: contextFiles[0].updatedAt
      });
    }
    
    // Test 3: Test semantic search with a simple query
    if (collectionInfo.points_count && collectionInfo.points_count > 0) {
      console.log("\n🔍 Testing semantic search...");
      
      // Generate test embedding
      const testEmbedding = await generateEmbedding("software development programming");
      
      const searchResults = await qdrant.search("daksha_context", {
        vector: testEmbedding,
        limit: 3,
        score_threshold: 0.1
      });
      
      console.log("🎯 Search results:", searchResults.length);
      searchResults.forEach((result, i) => {
        console.log(`  ${i + 1}. Score: ${result.score?.toFixed(3)} | Context ID: ${result.payload?.contextFileId}`);
      });
    } else {
      console.log("⚠️  No embeddings found in Qdrant - create some context files first");
    }
    
  } catch (error) {
    console.error("❌ Test failed:", error);
  } finally {
    await sql.end();
  }
}

async function generateEmbedding(text: string): Promise<number[]> {
  const response = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      input: text,
      model: "text-embedding-3-small",
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.statusText}`);
  }

  const data = await response.json() as { data: { embedding: number[] }[] };
  return data.data[0].embedding;
}

testEmbeddingsStandalone().catch(console.error);