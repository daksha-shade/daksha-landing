import { openai } from '@ai-sdk/openai';
import { streamText, tool } from 'ai';
import { z } from 'zod';
import { Memory } from 'mem0ai/oss';
import { MilvusLangchainWrapper } from '@/lib/mem0-milvus-wrapper';
import { stackServerApp } from '@/stack';

export const runtime = 'edge';

// Initialize Mem0 client with Milvus - only on server side
let memory: Memory | null = null;

if (typeof window === 'undefined') {
  try {
    memory = new Memory({
      vectorStore: {
        provider: "langchain",
        config: {
          client: new MilvusLangchainWrapper("memories", 1536),
          dimension: 1536,
        },
      },
      embedder: {
        provider: "openai",
        config: {
          apiKey: process.env.OPENAI_API_KEY || '',
          model: "text-embedding-3-small",
        },
      },
      llm: {
        provider: "openai",
        config: {
          apiKey: process.env.OPENAI_API_KEY || '',
          model: "gpt-4o-mini",
        },
      },
    });
  } catch (error) {
    console.warn('Failed to initialize memory:', error);
  }
}

export async function POST(req: Request) {
  try {
    const user = await stackServerApp.getUser({ or: "return-null" });
    const body = await req.json() as { messages: any[] };
    const { messages } = body;
    const userId = user?.id || 'anonymous';

    const result = await streamText({
      model: openai('gpt-4o-mini'), // Using gpt-4o-mini instead of gpt-4 for cost efficiency
      messages,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error('Error in chat API:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}