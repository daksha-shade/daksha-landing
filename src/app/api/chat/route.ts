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
      tools: {
        web_search: tool({
          description: 'Search the web for information',
          parameters: z.object({
            query: z.string().describe('The search query'),
          }),
        }),
        search_memory: tool({
          description: 'Search through user memories and past conversations',
          parameters: z.object({
            query: z.string().describe('The search query for memories'),
          }),
        }),
        add_memory: tool({
          description: 'Store important information in user memory',
          parameters: z.object({
            content: z.string().describe('The information to remember'),
          }),
        }),
      },
      async onToolCall({ toolCallId, toolName, args }) {
        if (toolName === 'web_search') {
          const response = await fetch(`https://api.search.brave.com/res/v1/web/search?q=${encodeURIComponent(args.query)}`, {
            headers: {
              'X-Subscription-Token': process.env.BRAVE_API_KEY || '',
            },
          });
          const data = await response.json();
          return JSON.stringify(data);
        }
        
        if (toolName === 'search_memory' && memory) {
          try {
            const result = await memory.search(args.query, { userId: userId || 'default' });
            if (result && result.results) {
              return result.results.map((mem: any) => mem.memory).join('\n');
            }
            return 'No relevant memories found.';
          } catch (error) {
            console.error('Memory search error:', error);
            return 'Error searching memories.';
          }
        }
        
        if (toolName === 'add_memory' && memory) {
          try {
            await memory.add([{ role: 'user', content: args.content }], { userId: userId || 'default' });
            return 'Information stored in memory.';
          } catch (error) {
            console.error('Memory add error:', error);
            return 'Error storing information.';
          }
        }
        
        return 'Unknown tool';
      },
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error('Error in chat API:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}