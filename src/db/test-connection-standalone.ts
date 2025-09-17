import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { sql } from 'drizzle-orm';
import { config } from 'dotenv';
import { join } from 'path';

// Load environment variables from .env.local
config({ path: join(process.cwd(), '.env.local') });

async function testConnection() {
  const connectionString = process.env.DATABASE_URL;
  
  if (!connectionString) {
    console.error('❌ DATABASE_URL environment variable is not set');
    console.log('\n💡 Please set your DATABASE_URL in .env.local file');
    console.log('Example: DATABASE_URL="postgresql://postgres:password@localhost:5432/database"');
    process.exit(1);
  }

  // URL encoding validation
  try {
    const m = connectionString.match(/^postgres(?:ql)?:\/\/[^:]+:([^@]+)@/i);
    if (m) {
      const pwd = m[1];
      const hasUnsafe = /[@#]/.test(pwd) && !/%40|%23/i.test(pwd);
      if (hasUnsafe) {
        console.log('⚠️  Password contains unencoded special characters');
        console.log('💡 URL-encode special characters in your password:');
        console.log('   @ should be %40');
        console.log('   # should be %23');
        const suggested = connectionString.replace(
          /^(postgres(?:ql)?:\/\/[^:]+:)([^@]+)(@.*)$/i,
          (_, p1, p2, p3) => `${p1}${encodeURIComponent(p2)}${p3}`,
        );
        console.log(`   Suggested: ${suggested}`);
        process.exit(1);
      }
    }
  } catch {
    // Continue with connection test
  }

  let client;
  
  try {
    console.log('🔍 Testing database connection...');
    console.log(`📍 Connecting to: ${connectionString.replace(/:([^@]+)@/, ':***@')}`);
    
    // Create connection
    client = postgres(connectionString, { max: 1 });
    const db = drizzle(client);
    
    // Simple query to test connection
    const result = await db.execute(sql`SELECT 1 as test, NOW() as timestamp`);
    console.log('✅ Database connection successful!');
    console.log('📊 Test result:', result[0]);
    
    // Test if we can create a simple table
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS connection_test (
        id SERIAL PRIMARY KEY,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);
    console.log('✅ Can create tables successfully!');
    
    // Test insert
    await db.execute(sql`
      INSERT INTO connection_test DEFAULT VALUES
    `);
    console.log('✅ Can insert data successfully!');
    
    // Clean up test table
    await db.execute(sql`DROP TABLE IF EXISTS connection_test`);
    console.log('✅ Connection test completed successfully!');
    
    console.log('\n🎉 Database is ready for use!');
    console.log('💡 You can now run: npm run db:sync');
    
  } catch (error) {
    console.error('❌ Database connection failed:');
    console.error(error);
    
    if (error instanceof Error) {
      if (error.message.includes('EHOSTUNREACH')) {
        console.log('\n💡 EHOSTUNREACH error suggests:');
        console.log('1. Check if the database host is reachable');
        console.log('2. Verify your DATABASE_URL is correct');
        console.log('3. Check if special characters in password are URL-encoded');
        console.log('4. Ensure your database server is running');
      }
      
      if (error.message.includes('authentication failed')) {
        console.log('\n💡 Authentication error suggests:');
        console.log('1. Check your username and password');
        console.log('2. Verify the database name exists');
        console.log('3. Check user permissions');
      }
      
      if (error.message.includes('timeout')) {
        console.log('\n💡 Timeout error suggests:');
        console.log('1. Check network connectivity');
        console.log('2. Verify the host and port');
        console.log('3. Check firewall settings');
      }
    }
    
    process.exit(1);
  } finally {
    if (client) {
      await client.end();
    }
  }
}

if (require.main === module) {
  testConnection();
}

export { testConnection };