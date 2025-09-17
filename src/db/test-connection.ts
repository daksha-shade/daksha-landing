import { db } from './client';
import { sql } from 'drizzle-orm';

async function testConnection() {
  try {
    console.log('Testing database connection...');
    
    // Simple query to test connection
    const result = await db.execute(sql`SELECT 1 as test`);
    console.log('✅ Database connection successful!');
    console.log('Test result:', result);
    
    // Test if we can create a simple table
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS connection_test (
        id SERIAL PRIMARY KEY,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);
    console.log('✅ Can create tables successfully!');
    
    // Clean up test table
    await db.execute(sql`DROP TABLE IF EXISTS connection_test`);
    console.log('✅ Connection test completed successfully!');
    
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
      
      if (error.message.includes('password contains unencoded special characters')) {
        console.log('\n💡 Password encoding issue:');
        console.log('URL-encode special characters in your password:');
        console.log('@ should be %40');
        console.log('# should be %23');
      }
    }
    
    process.exit(1);
  }
}

if (require.main === module) {
  testConnection();
}

export { testConnection };