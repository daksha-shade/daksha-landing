import { setupChatCollections } from './milvus-chat-setup';
import { milvusClient } from './milvus';
import { config } from 'dotenv';

// Load environment variables
config({ path: '.env.local' });
config({ path: '.env' });

async function setupAllCollections() {
  console.log('Setting up all Milvus collections...');
  
  // Setup existing collections (from the original setup)
  if (milvusClient) {
    try {
      // Create collection for context files
      const contextCollectionExists = await milvusClient.hasCollection({
        collection_name: 'context_files',
      });

      if (!contextCollectionExists.value) {
        await milvusClient.createCollection({
          collection_name: 'context_files',
          fields: [
            {
              name: 'id',
              data_type: 'VarChar',
              max_length: 36,
              is_primary_key: true,
            },
            {
              name: 'user_id',
              data_type: 'VarChar',
              max_length: 36,
            },
            {
              name: 'title',
              data_type: 'VarChar',
              max_length: 500,
            },
            {
              name: 'content',
              data_type: 'VarChar',
              max_length: 10000,
            },
            {
              name: 'embedding',
              data_type: 'FloatVector',
              dim: 1536, // For text-embedding-3-small
            },
          ],
        });

        // Create index for vector search
        await milvusClient.createIndex({
          collection_name: 'context_files',
          field_name: 'embedding',
          index_name: 'embedding_index',
          index_type: 'AUTOINDEX',
          metric_type: 'COSINE',
        });

        // Load collection
        await milvusClient.loadCollection({
          collection_name: 'context_files',
        });

        console.log('Created context_files collection');
      }

      // Create collection for journal entries
      const journalCollectionExists = await milvusClient.hasCollection({
        collection_name: 'journal_entries',
      });

      if (!journalCollectionExists.value) {
        await milvusClient.createCollection({
          collection_name: 'journal_entries',
          fields: [
            {
              name: 'id',
              data_type: 'VarChar',
              max_length: 36,
              is_primary_key: true,
            },
            {
              name: 'user_id',
              data_type: 'VarChar',
              max_length: 36,
            },
            {
              name: 'title',
              data_type: 'VarChar',
              max_length: 500,
            },
            {
              name: 'content',
              data_type: 'VarChar',
              max_length: 10000,
            },
            {
              name: 'embedding',
              data_type: 'FloatVector',
              dim: 1536, // For text-embedding-3-small
            },
          ],
        });

        // Create index for vector search
        await milvusClient.createIndex({
          collection_name: 'journal_entries',
          field_name: 'embedding',
          index_name: 'embedding_index',
          index_type: 'AUTOINDEX',
          metric_type: 'COSINE',
        });

        // Load collection
        await milvusClient.loadCollection({
          collection_name: 'journal_entries',
        });

        console.log('Created journal_entries collection');
      }

      // Create collection for notes
      const notesCollectionExists = await milvusClient.hasCollection({
        collection_name: 'notes',
      });

      if (!notesCollectionExists.value) {
        await milvusClient.createCollection({
          collection_name: 'notes',
          fields: [
            {
              name: 'id',
              data_type: 'VarChar',
              max_length: 36,
              is_primary_key: true,
            },
            {
              name: 'user_id',
              data_type: 'VarChar',
              max_length: 36,
            },
            {
              name: 'title',
              data_type: 'VarChar',
              max_length: 500,
            },
            {
              name: 'content',
              data_type: 'VarChar',
              max_length: 10000,
            },
            {
              name: 'embedding',
              data_type: 'FloatVector',
              dim: 1536, // For text-embedding-3-small
            },
          ],
        });

        // Create index for vector search
        await milvusClient.createIndex({
          collection_name: 'notes',
          field_name: 'embedding',
          index_name: 'embedding_index',
          index_type: 'AUTOINDEX',
          metric_type: 'COSINE',
        });

        // Load collection
        await milvusClient.loadCollection({
          collection_name: 'notes',
        });

        console.log('Created notes collection');
      }

      // Create collection for google drive files
      const driveCollectionExists = await milvusClient.hasCollection({
        collection_name: 'google_drive_files',
      });

      if (!driveCollectionExists.value) {
        await milvusClient.createCollection({
          collection_name: 'google_drive_files',
          fields: [
            {
              name: 'id',
              data_type: 'VarChar',
              max_length: 36,
              is_primary_key: true,
            },
            {
              name: 'user_id',
              data_type: 'VarChar',
              max_length: 36,
            },
            {
              name: 'name',
              data_type: 'VarChar',
              max_length: 500,
            },
            {
              name: 'content',
              data_type: 'VarChar',
              max_length: 10000,
            },
            {
              name: 'embedding',
              data_type: 'FloatVector',
              dim: 1536, // For text-embedding-3-small
            },
          ],
        });

        // Create index for vector search
        await milvusClient.createIndex({
          collection_name: 'google_drive_files',
          field_name: 'embedding',
          index_name: 'embedding_index',
          index_type: 'AUTOINDEX',
          metric_type: 'COSINE',
        });

        // Load collection
        await milvusClient.loadCollection({
          collection_name: 'google_drive_files',
        });

        console.log('Created google_drive_files collection');
      }

      console.log('Existing collections setup completed');
    } catch (error) {
      console.error('Error setting up existing collections:', error);
    }
  }

  // Setup chat collections
  await setupChatCollections();
  
  console.log('All Milvus collections setup completed');
}

setupAllCollections().catch((error) => {
  console.error('Error setting up Milvus collections:', error);
  process.exit(1);
});