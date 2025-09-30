import { milvusClient } from './milvus';

// Setup Milvus collections for chat embeddings
export async function setupChatCollections() {
  if (!milvusClient) {
    console.log('Milvus client not available');
    return;
  }

  try {
    // Create collection for thread embeddings
    const threadCollectionExists = await milvusClient.hasCollection({
      collection_name: 'chat_threads',
    });

    if (!threadCollectionExists.value) {
      await milvusClient.createCollection({
        collection_name: 'chat_threads',
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
            name: 'embedding',
            data_type: 'FloatVector',
            dim: 1536, // For text-embedding-3-small
          },
        ],
      });

      // Create index for vector search
      await milvusClient.createIndex({
        collection_name: 'chat_threads',
        field_name: 'embedding',
        index_name: 'embedding_index',
        index_type: 'AUTOINDEX',
        metric_type: 'COSINE',
      });

      // Load collection
      await milvusClient.loadCollection({
        collection_name: 'chat_threads',
      });

      console.log('Created chat_threads collection');
    }

    // Create collection for message embeddings
    const messageCollectionExists = await milvusClient.hasCollection({
      collection_name: 'chat_messages',
    });

    if (!messageCollectionExists.value) {
      await milvusClient.createCollection({
        collection_name: 'chat_messages',
        fields: [
          {
            name: 'id',
            data_type: 'VarChar',
            max_length: 36,
            is_primary_key: true,
          },
          {
            name: 'thread_id',
            data_type: 'VarChar',
            max_length: 36,
          },
          {
            name: 'user_id',
            data_type: 'VarChar',
            max_length: 36,
          },
          {
            name: 'content',
            data_type: 'VarChar',
            max_length: 10000,
          },
          {
            name: 'role',
            data_type: 'VarChar',
            max_length: 20,
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
        collection_name: 'chat_messages',
        field_name: 'embedding',
        index_name: 'embedding_index',
        index_type: 'AUTOINDEX',
        metric_type: 'COSINE',
      });

      // Load collection
      await milvusClient.loadCollection({
        collection_name: 'chat_messages',
      });

      console.log('Created chat_messages collection');
    }

    console.log('Chat collections setup completed');
  } catch (error) {
    console.error('Error setting up chat collections:', error);
  }
}