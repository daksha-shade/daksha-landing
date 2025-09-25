import { milvusClient } from "./milvus";
import { EMBEDDING_DIMS } from "@/lib/embeddings";

async function setupMilvus() {
  // Only execute on server side
  if (typeof window !== 'undefined' || !milvusClient) {
    console.warn('Milvus client not available on client side');
    return;
  }
  
  const collections = await milvusClient.showCollections();
  const collectionNames = collections.data.map((c: any) => c.name);

  if (!collectionNames.includes("context_files")) {
    await milvusClient.createCollection({
      collection_name: "context_files",
      fields: [
        {
          name: "id",
          data_type: 21, // VarChar
          is_primary_key: true,
          max_length: 36,
        },
        {
          name: "embedding",
          data_type: 101, // FloatVector
          dim: EMBEDDING_DIMS,
        },
      ],
    });
    console.log("Collection 'context_files' created.");
  }

  if (!collectionNames.includes("journal_entries")) {
    await milvusClient.createCollection({
      collection_name: "journal_entries",
      fields: [
        {
          name: "id",
          data_type: 21, // VarChar
          is_primary_key: true,
          max_length: 36,
        },
        {
          name: "embedding",
          data_type: 101, // FloatVector
          dim: EMBEDDING_DIMS,
        },
      ],
    });
    console.log("Collection 'journal_entries' created.");
  }

  if (!collectionNames.includes("memories")) {
    await milvusClient.createCollection({
      collection_name: "memories",
      fields: [
        {
          name: "id",
          data_type: 21, // VarChar
          is_primary_key: true,
          max_length: 36,
        },
        {
          name: "embedding",
          data_type: 101, // FloatVector
          dim: EMBEDDING_DIMS,
        },
        {
          name: "payload",
          data_type: 21, // VarChar
          max_length: 10000,
        },
      ],
    });
    console.log("Collection 'memories' created.");
  }
}

if (require.main === module) {
  setupMilvus().catch((error) => {
    console.error('Error setting up Milvus:', error);
    process.exit(1);
  });
}

export { setupMilvus };