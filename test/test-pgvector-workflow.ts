import "dotenv/config";
import { createContextFileForUser, searchUserContext } from "../src/lib/context-service";

async function testPgVectorWorkflow() {
  console.log("🧪 Testing complete pgvector workflow...");
  
  const testUserId = "test-user-pgvector-123";
  
  try {
    // Test 1: Create a context file with embedding
    console.log("\n📝 Creating test context file...");
    const result = await createContextFileForUser({
      userId: testUserId,
      title: "Machine Learning Fundamentals",
      content: "Machine learning is a subset of artificial intelligence that focuses on algorithms and statistical models that enable computer systems to perform tasks without explicit instructions. It includes supervised learning, unsupervised learning, and reinforcement learning. Key concepts include neural networks, deep learning, feature engineering, and model evaluation metrics like accuracy, precision, and recall."
    });
    
    console.log("✅ Context file created:", {
      id: result.id,
      title: result.title
    });
    
    // Test 2: Search for related content
    console.log("\n🔍 Testing semantic search...");
    const searchResults = await searchUserContext(testUserId, "artificial intelligence and neural networks", 3);
    
    console.log("🎯 Search results:");
    searchResults.forEach((result, i) => {
      console.log(`  ${i + 1}. Score: ${(result.score * 100).toFixed(1)}% | Title: ${result.payload.title}`);
    });
    
    if (searchResults.length > 0 && searchResults[0].payload.title === "Machine Learning Fundamentals") {
      console.log("✅ Semantic search working! Found our test context.");
    } else {
      console.log("❌ Search didn't find our test context");
    }
    
    // Test 3: Different search query
    console.log("\n🔍 Testing different search query...");
    const searchResults2 = await searchUserContext(testUserId, "model evaluation and accuracy metrics", 3);
    
    console.log("🎯 Second search results:");
    searchResults2.forEach((result, i) => {
      console.log(`  ${i + 1}. Score: ${(result.score * 100).toFixed(1)}% | Title: ${result.payload.title}`);
    });
    
    console.log("\n✅ Complete pgvector workflow test completed successfully!");
    
  } catch (error) {
    console.error("❌ Test failed:", error);
  }
}

testPgVectorWorkflow().catch(console.error);