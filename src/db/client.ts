import "server-only";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

// Use a singleton pattern for the server runtime
const globalForDb = globalThis as unknown as {
  __db__?: ReturnType<typeof drizzle>;
  __sql__?: ReturnType<typeof postgres>;
};

export const sql =
  globalForDb.__sql__ ??
  postgres(connectionString, {
    // Supabase requires SSL
    ssl: "require",
    max: 1,
  });

export const db = globalForDb.__db__ ?? drizzle(sql, { schema });

globalForDb.__sql__ = sql;
globalForDb.__db__ = db;

