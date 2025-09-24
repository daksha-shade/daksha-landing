import postgres from "postgres";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

const sql = postgres(connectionString, {
  ssl: "require",
  max: 3,
  idle_timeout: 20,
  connect_timeout: 10,
  onnotice: () => {}
});

async function dropTables() {
  // Drop all existing tables
  await sql`DROP TABLE IF EXISTS messages`;
  await sql`DROP TABLE IF EXISTS threads`;
  await sql`DROP TABLE IF EXISTS users`;
  await sql`DROP TABLE IF EXISTS context_files`;
  await sql`DROP TABLE IF EXISTS journal_entries`;
  await sql`DROP TABLE IF EXISTS journal_templates`;
  await sql`DROP TABLE IF EXISTS journal_streaks`;
  await sql`DROP TABLE IF EXISTS journal_analytics`;
  await sql`DROP TABLE IF EXISTS __drizzle_migrations`;

  // Create new tables for assistant-ui
  await sql`CREATE TABLE threads (
    id text PRIMARY KEY NOT NULL,
    user_id text NOT NULL,
    title text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
  )`;

  await sql`CREATE TABLE messages (
    id text PRIMARY KEY NOT NULL,
    thread_id text NOT NULL,
    role text NOT NULL,
    content jsonb NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
  )`;

  await sql`ALTER TABLE messages ADD CONSTRAINT messages_thread_id_threads_id_fk FOREIGN KEY (thread_id) REFERENCES threads(id)`;

  console.log("All tables dropped and new schema created");
  await sql.end();
}

dropTables().catch(console.error);