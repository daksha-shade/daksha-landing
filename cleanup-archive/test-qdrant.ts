import { config } from 'dotenv';
import { join } from 'path';
import { readFileSync } from 'fs';
import { QdrantClient } from "@qdrant/js-client-rest";

// Load environment variables from .env.local specifically
config({ path: join(process.cwd(), '.env.local'), override: true });

async function testQdrant() {
  const QDRANT_URL = process.env.QDRANT_URL;
  const QDRANT_API_KEY = process.env.QDRANT_API_KEY;
  
  console.log('🔍 Testing Qdrant connection...');
  console.log('📍 URL:', QDRANT_URL);
  console.log('🔑 API Key:', QDRANT_API_KEY ? `${QDRANT_API_KEY.substring(0, 20)}...` : 'NOT SET');
  
  // Let's also check what's in the actual .env.local file
  const envContent = readFileSync('.env.local', 'utf8');
  const qdrantUrlMatch = envContent.match(/QDRANT_URL=(.+)/);
  const qdrantKeyMatch = envContent.match(/QDRANT_API_KEY=(.+)/);
  
  console.log('📄 File content - URL:', qdrantUrlMatch?.[1]);
  console.log('📄 File content - API Key:', qdrantKeyMatch?.[1]?.substring(0, 20) + '...');
  
  if (!QDRANT_URL || !QDRANT_API_KEY) {
    console.error('❌ QDRANT_URL or QDRANT_API_KEY not set');
    process.exit(1);
  }

  try {
    const client = new QdrantClient({ url: QDRANT_URL, apiKey: QDRANT_API_KEY });
    
    // Test connection
    const collections = await client.getCollections();
    console.log('✅ Qdrant connection successful!');
    console.log('📊 Collections:', collections.collections?.map(c => c.name) || []);
    
    // Test if our collection exists
    const contextExists = collections.collections?.some(c => c.name === 'daksha_context');
    console.log('🗂️  daksha_context collection exists:', contextExists);
    
    if (!contextExists) {
      console.log('🔨 Creating daksha_context collection...');
      await client.createCollection('daksha_context', {
        vectors: { size: 1536, distance: "Cosine" },
      });
      console.log('✅ Collection created successfully!');
    }
    
  } catch (error) {
    console.error('❌ Qdrant connection failed:');
    console.error(error);
    process.exit(1);
  }
}

if (require.main === module) {
  testQdrant();
}

export { testQdrant };