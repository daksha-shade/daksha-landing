import "server-only";
import { db } from "@/db/client";
import { sql } from "drizzle-orm";

export async function ensureDbSchema() {
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

  await db.execute(sql`
    create table if not exists context_files (
      id text primary key,
      user_id text not null,
      title text not null,
      content text not null,
      source_url text,
      created_at timestamptz not null default now(),
      updated_at timestamptz not null default now()
    )
  `);

  await db.execute(sql`create index if not exists idx_context_files_user on context_files(user_id)`);

  await db.execute(sql`
    create table if not exists context_embeddings (
      id text primary key,
      context_file_id text not null,
      user_id text not null,
      chunk_text text not null,
      model text not null,
      dims integer not null,
      metadata jsonb,
      created_at timestamptz not null default now()
    )
  `);

  await db.execute(sql`create index if not exists idx_context_embeddings_user on context_embeddings(user_id)`);
}
