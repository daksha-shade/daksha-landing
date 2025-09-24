import { milvusClient } from "./milvus";
import { EMBEDDING_DIMS } from "@/lib/embeddings";

async function setupMilvus() {
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
}

if (require.main === module) {
  setupMilvus().catch((error) => {
    console.error('Error setting up Milvus:', error);
    process.exit(1);
  });
}

export { setupMilvus };