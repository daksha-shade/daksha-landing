import { config } from 'dotenv';
import postgres from 'postgres';

config({ path: '.env.local' });

async function resetDatabase() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error('DATABASE_URL is not set');
  }

  const client = postgres(connectionString);

  try {
    console.log('Connecting to the database to drop all tables...');
    await client`
      DO $$
      DECLARE
        r RECORD;
      BEGIN
        FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') LOOP
          EXECUTE 'DROP TABLE IF EXISTS ' || quote_ident(r.tablename) || ' CASCADE';
        END LOOP;
      END $$;
    `;
    console.log('All tables dropped successfully.');
  } catch (error) {
    console.error('Failed to drop tables:', error);
    throw error;
  } finally {
    await client.end();
  }
}

if (require.main === module) {
  resetDatabase().catch((error) => {
    console.error('Error resetting database:', error);
    process.exit(1);
  });
}

export { resetDatabase };