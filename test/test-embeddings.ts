import "dotenv/config";
import { createContextFileForUser } from "../src/lib/context-service";
import { QdrantClient } from "@qdrant/js-client-rest";

async function testEmbeddings() {
  console.log("🧪 Testing embedding generation and storage...");
  
  // Create a test user ID (we'll use a dummy one for testing)
  const testUserId = "test-user-12345";
  
  try {
    // Test 1: Create context file and generate embeddings
    console.log("\n📝 Creating test context file...");
    const result = await createContextFileForUser({
      userId: testUserId,
      title: "Test Context for Embeddings Verification",
      content: "This is a comprehensive test to verify that our embedding system works correctly. The system should take this content, generate embeddings using OpenAI's text-embedding-3-small model, and store them in Qdrant for semantic search capabilities. This test verifies the complete pipeline from content creation to vector storage.",
      sourceUrl: undefined
    });
    
    console.log("✅ Context file created:", {
      id: result.id,
      title: result.title,
      hasContent: !!result.content
    });
    
    // Test 2: Verify the embedding was stored in Qdrant
    console.log("\n🔍 Checking Qdrant for stored embeddings...");
    const qdrant = new QdrantClient({
      url: process.env.QDRANT_URL!,
      apiKey: process.env.QDRANT_API_KEY!,
    });
    
    // Search for our test content
    const searchResults = await qdrant.search("daksha_context", {
      vector: await generateTestEmbedding("test context embeddings verification"),
      limit: 5,
      score_threshold: 0.1 // Low threshold to catch our test
    });
    
    console.log("🎯 Found", searchResults.length, "results in Qdrant");
    
    // Check if our test file is in the results
    const ourResult = searchResults.find(r => 
      r.payload?.contextFileId === result.id || 
      (r.payload?.content as string)?.includes("embeddings verification")
    );
    
    if (ourResult) {
      console.log("✅ Our test context was found in Qdrant!");
      console.log("📊 Score:", ourResult.score);
      console.log("📄 Payload keys:", Object.keys(ourResult.payload || {}));
    } else {
      console.log("❌ Our test context was NOT found in Qdrant");
      console.log("📋 Available results:", searchResults.map(r => ({
        score: r.score,
        payloadKeys: Object.keys(r.payload || {}),
        contextFileId: r.payload?.contextFileId
      })));
    }
    
    // Test 3: Test collection info
    console.log("\n📊 Checking collection info...");
    const collectionInfo = await qdrant.getCollection("daksha_context");
    console.log("📈 Collection points count:", collectionInfo.points_count);
    console.log("📏 Vector size:", collectionInfo.config?.params?.vectors);
    
  } catch (error) {
    console.error("❌ Test failed:", error);
  }
}

async function generateTestEmbedding(text: string): Promise<number[]> {
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

  const data = await response.json() as { data: Array<{ embedding: number[] }> };
  return data.data[0].embedding;
}

testEmbeddings().catch(console.error);