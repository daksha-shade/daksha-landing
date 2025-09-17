import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import * as schema from './schema';

// Load environment variables from .env.local
config({ path: '.env.local' });

async function runMigration() {
  const connectionString = process.env.DATABASE_URL;
  
  if (!connectionString) {
    throw new Error('DATABASE_URL is not set');
  }

  // Create connection for migration
  const migrationClient = postgres(connectionString, { max: 1 });
  const db = drizzle(migrationClient, { schema });

  console.log('Running database migration...');
  
  try {
    // This will create tables if they don't exist
    await migrate(db, { migrationsFolder: './drizzle' });
    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
    throw error;
  } finally {
    await migrationClient.end();
  }
}

if (require.main === module) {
  runMigration().catch((error) => {
    console.error('Migration error:', error);
    process.exit(1);
  });
}

export { runMigration };