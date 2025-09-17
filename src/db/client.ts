import "server-only";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

// Guard: if password contains special chars not URL-encoded (e.g. @ or #),
// postgres-js/URL parsing will fail. Provide a clearer error.
try {
  // simple heuristic: extract password segment between first ':' after scheme and the last '@' before host
  const m = connectionString.match(/^postgres(?:ql)?:\/\/[^:]+:([^@]+)@/i);
  if (m) {
    const pwd = m[1];
    const hasUnsafe = /[@#]/.test(pwd) && !/%40|%23/i.test(pwd);
    if (hasUnsafe) {
      const suggested = connectionString.replace(
        /^(postgres(?:ql)?:\/\/[^:]+:)([^@]+)(@.*)$/i,
        (_, p1, p2, p3) => `${p1}${encodeURIComponent(p2)}${p3}`,
      );
      throw new Error(
        `DATABASE_URL password contains unencoded special characters. Please URL-encode the password.\n` +
        `Example: ${suggested}`,
      );
    }
  }
} catch (e) {
  // Re-throw with guidance
  throw e;
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
    // Suppress schema notices that clutter console logs
    onnotice: () => {}
  });

export const db = globalForDb.__db__ ?? drizzle(sql, { schema });

globalForDb.__sql__ = sql;
globalForDb.__db__ = db;
