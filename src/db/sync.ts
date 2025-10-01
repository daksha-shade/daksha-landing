import "server-only";

export async function ensureDbSchema() {
  // Schema is now managed by Drizzle migrations
  // This function is kept for backward compatibility but no longer creates tables
  console.log('Schema management is now handled by Drizzle migrations');
  return;
}
