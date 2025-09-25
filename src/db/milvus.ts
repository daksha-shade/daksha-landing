import { MilvusClient } from "@zilliz/milvus2-sdk-node";
import { config } from 'dotenv';

// Only initialize Milvus client on the server side
let milvusClient: MilvusClient | null = null;

if (typeof window === 'undefined') {
  config({ path: '.env.local' });
  
  milvusClient = new MilvusClient({
    address: process.env.MILVUS_ENDPOINT!,
    token: process.env.MILVUS_TOKEN!,
  });
}

export { milvusClient };

export function getMilvusClient(): MilvusClient | null {
  if (typeof window !== 'undefined') {
    console.warn('Milvus client is not available on the client side');
    return null;
  }
  return milvusClient;
}