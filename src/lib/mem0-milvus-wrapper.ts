import { milvusClient } from "@/db/milvus";

class MilvusLangchainWrapper {
  private collectionName: string;
  private dimension: number;
  private storeUserId: string = "anonymous";

  constructor(collectionName: string, dimension: number) {
    this.collectionName = collectionName;
    this.dimension = dimension;
  }

  async addVectors(vectors: number[][], documents: any[], options?: { ids?: string[] }) {
    // Only execute on server side
    if (typeof window !== 'undefined' || !milvusClient) {
      console.warn('Milvus client not available on client side');
      return;
    }
    
    const ids = options?.ids || documents.map(() => Math.random().toString(36).substr(2, 9));
    const payloads = documents.map(doc => doc.metadata || {});

    await milvusClient.insert({
      collection_name: this.collectionName,
      fields_data: [
        {
          name: "id",
          type: 21, // VarChar
          values: ids,
        },
        {
          name: "embedding",
          type: 101, // FloatVector
          values: vectors,
        },
        {
          name: "payload",
          type: 21, // VarChar
          values: payloads.map(p => JSON.stringify(p)),
        },
      ],
    });
  }

  async similaritySearchVectorWithScore(query: number[], k: number, filter?: any) {
    // Only execute on server side
    if (typeof window !== 'undefined' || !milvusClient) {
      console.warn('Milvus client not available on client side');
      return [];
    }
    
    const results = await milvusClient.search({
      collection_name: this.collectionName,
      vector: query,
      params: {
        nprobe: 10,
      },
      limit: k,
      output_fields: ["id", "payload"],
    });

    if (!results || !results.results) {
      return [];
    }

    return results.results.map((hit: any) => {
      const payload = JSON.parse(hit.payload || "{}");
      return [
        {
          pageContent: "",
          metadata: { ...payload, _mem0_id: hit.id },
        },
        hit.score,
      ];
    });
  }

  async delete(params: { ids?: string[], filter?: any }) {
    // Only execute on server side
    if (typeof window !== 'undefined' || !milvusClient) {
      console.warn('Milvus client not available on client side');
      return;
    }
    
    if (params.ids && params.ids.length > 0) {
      const expr = `id in [${params.ids.map(id => `"${id}"`).join(",")}]`;
      await milvusClient.delete({
        collection_name: this.collectionName,
        filter: expr,
      });
    } else if (params.filter && params.filter._mem0_id) {
      const expr = `id == "${params.filter._mem0_id}"`;
      await milvusClient.delete({
        collection_name: this.collectionName,
        filter: expr,
      });
    }
  }

  async getUserId() {
    return this.storeUserId;
  }

  async setUserId(userId: string) {
    this.storeUserId = userId;
  }

  async initialize() {
    // Ensure collection exists, but assume it's created
    return Promise.resolve();
  }
}

export { MilvusLangchainWrapper };