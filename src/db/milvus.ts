import { MilvusClient } from "@zilliz/milvus2-sdk-node";
import { config } from 'dotenv';

config({ path: '.env.local' });

const milvusClient = new MilvusClient({
  address: process.env.MILVUS_ENDPOINT!,
  token: process.env.MILVUS_TOKEN!,
});

export { milvusClient };