import "dotenv/config";
import postgres from "postgres";
import { config } from 'dotenv';

// Load environment variables from .env.local
config({ path: '.env.local' });

async function testPgVectorDirectly() {
  console.log("🧪 Testing pgvector directly with PostgreSQL...");
  
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error('DATABASE_URL is not set');
  }

  const sql = postgres(connectionString, { max: 1, onnotice: () => {} });

  try {
    // Test 1: Check if vector extension is enabled
    console.log("\n🔍 Checking pgvector extension...");
    const extensions = await sql`SELECT * FROM pg_extension WHERE extname = 'vector'`;
    console.log("✅ pgvector extension:", extensions.length > 0 ? "ENABLED" : "NOT FOUND");

    // Test 2: Check if context_files table has embedding column
    console.log("\n📋 Checking table structure...");
    const columns = await sql`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'context_files' AND column_name = 'embedding'
    `;
    console.log("✅ Embedding column:", columns.length > 0 ? "EXISTS" : "NOT FOUND");

    // Test 3: Generate a test embedding and insert
    console.log("\n📝 Testing embedding storage...");
    
    // Generate a simple test embedding (normally would use OpenAI)
    const testEmbedding = Array.from({ length: 1536 }, () => Math.random() - 0.5);
    const testId = `test-${Date.now()}`;
    
    await sql`
      INSERT INTO context_files (id, user_id, title, content, embedding)
      VALUES (${testId}, 'test-user', 'Test Context', 'This is a test context for pgvector', ${JSON.stringify(testEmbedding)})
    `;
    
    console.log("✅ Successfully inserted context with embedding");

    // Test 4: Test vector similarity search
    console.log("\n🔍 Testing vector similarity search...");
    const queryEmbedding = Array.from({ length: 1536 }, () => Math.random() - 0.5);
    
    const results = await sql`
      SELECT 
        id, title, content,
        1 - (embedding <=> ${JSON.stringify(queryEmbedding)}) as similarity
      FROM context_files 
      WHERE embedding IS NOT NULL
      ORDER BY embedding <=> ${JSON.stringify(queryEmbedding)}
      LIMIT 3
    `;
    
    console.log("✅ Search results:");
    results.forEach((row, i) => {
      console.log(`  ${i + 1}. ${row.title} | Similarity: ${(row.similarity * 100).toFixed(1)}%`);
    });

    // Clean up
    console.log("\n🧹 Cleaning up test data...");
    await sql`DELETE FROM context_files WHERE id = ${testId}`;
    
    console.log("\n✅ pgvector integration test completed successfully!");

  } catch (error) {
    console.error("❌ Test failed:", error);
  } finally {
    await sql.end();
  }
}

testPgVectorDirectly().catch(console.error);