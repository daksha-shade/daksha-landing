import { config } from 'dotenv';
import postgres from 'postgres';

// Load environment variables from .env.local
config({ path: '.env.local' });

async function addEmbeddingColumn() {
  const connectionString = process.env.DATABASE_URL;
  
  if (!connectionString) {
    throw new Error('DATABASE_URL is not set');
  }

  const sql = postgres(connectionString, { max: 1 });

  try {
    console.log('Enabling pgvector extension...');
    await sql`CREATE EXTENSION IF NOT EXISTS vector`;
    
    console.log('Adding embedding column...');
    await sql`ALTER TABLE context_files ADD COLUMN IF NOT EXISTS embedding vector(1536)`;
    
    console.log('✅ Successfully added embedding column!');
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await sql.end();
  }
}

addEmbeddingColumn();