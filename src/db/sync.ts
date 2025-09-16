import "server-only";
import { db, sql as drizzlesql } from "@/db/client";

export async function ensureDbSchema() {
  // users table (minimal)
  await db.execute(drizzlesql.raw(`
    create table if not exists users (
      id text primary key
    );
  `));

  await db.execute(drizzlesql.raw(`
    create table if not exists context_files (
      id text primary key,
      user_id text not null,
      title text not null,
      content text not null,
      source_url text,
      created_at timestamptz not null default now(),
      updated_at timestamptz not null default now()
    );
  `));

  await db.execute(drizzlesql.raw(`
    create index if not exists idx_context_files_user on context_files(user_id);
  `));

  await db.execute(drizzlesql.raw(`
    create table if not exists context_embeddings (
      id text primary key,
      context_file_id text not null,
      user_id text not null,
      chunk_text text not null,
      model text not null,
      dims integer not null,
      metadata jsonb,
      created_at timestamptz not null default now()
    );
  `));

  await db.execute(drizzlesql.raw(`
    create index if not exists idx_context_embeddings_user on context_embeddings(user_id);
  `));
}
