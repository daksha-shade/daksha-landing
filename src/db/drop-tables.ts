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

  console.log("All tables dropped");
  await sql.end();
}

dropTables().catch(console.error);