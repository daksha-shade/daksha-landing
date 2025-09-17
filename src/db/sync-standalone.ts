import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { sql } from 'drizzle-orm';
import { config } from 'dotenv';
import { join } from 'path';

// Load environment variables from .env.local
config({ path: join(process.cwd(), '.env.local') });

async function syncDatabase() {
  const connectionString = process.env.DATABASE_URL;
  
  if (!connectionString) {
    console.error('❌ DATABASE_URL environment variable is not set');
    process.exit(1);
  }

  let client;
  
  try {
    console.log('🔍 Connecting to database...');
    
    // Create connection
    client = postgres(connectionString, { max: 1 });
    const db = drizzle(client);
    
    console.log('📋 Creating database schema...');
    
    // Enhanced users table with StackAuth profile data
    await db.execute(sql`
      create table if not exists users (
        id text primary key,
        email text,
        display_name text,
        profile_image_url text,
        primary_email text,
        primary_email_verified text,
        client_metadata jsonb,
        server_metadata jsonb,
        oauth_providers jsonb,
        created_at timestamptz not null default now(),
        updated_at timestamptz not null default now(),
        last_seen_at timestamptz
      )
    `);
    console.log('✅ Users table created/verified');

    // Context files table
    await db.execute(sql`
      create table if not exists context_files (
        id text primary key,
        user_id text not null,
        title text not null,
        content text not null,
        source_url text,
        created_at timestamptz not null default now(),
        updated_at timestamptz not null default now(),
        foreign key (user_id) references users(id) on delete cascade
      )
    `);
    console.log('✅ Context files table created/verified');

    // Context embeddings table
    await db.execute(sql`
      create table if not exists context_embeddings (
        id text primary key,
        context_file_id text not null,
        user_id text not null,
        chunk_text text not null,
        model text not null,
        dims integer not null,
        metadata jsonb,
        created_at timestamptz not null default now(),
        foreign key (context_file_id) references context_files(id) on delete cascade,
        foreign key (user_id) references users(id) on delete cascade
      )
    `);
    console.log('✅ Context embeddings table created/verified');

    // Create indexes for better performance
    await db.execute(sql`
      create index if not exists idx_context_files_user_id on context_files(user_id)
    `);
    await db.execute(sql`
      create index if not exists idx_context_embeddings_user_id on context_embeddings(user_id)
    `);
    await db.execute(sql`
      create index if not exists idx_context_embeddings_context_file_id on context_embeddings(context_file_id)
    `);
    console.log('✅ Database indexes created/verified');

    console.log('\n🎉 Database schema sync completed successfully!');
    console.log('💡 Your context system is ready to use!');
    
  } catch (error) {
    console.error('❌ Database sync failed:');
    console.error(error);
    process.exit(1);
  } finally {
    if (client) {
      await client.end();
    }
  }
}

if (require.main === module) {
  syncDatabase();
}

export { syncDatabase };