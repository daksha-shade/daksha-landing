import { setupChatCollections } from './milvus-chat-setup';
import { config } from 'dotenv';

// Load environment variables
config({ path: '.env.local' });
config({ path: '.env' });

async function run() {
  console.log('Setting up Milvus chat collections...');
  await setupChatCollections();
  console.log('Done!');
  process.exit(0);
}

run().catch((error) => {
  console.error('Error setting up Milvus chat collections:', error);
  process.exit(1);
});