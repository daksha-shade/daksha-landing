import { openai } from '@ai-sdk/openai';
import { streamText, tool } from 'ai';

export const runtime = 'edge';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: openai('gpt-4'),
    messages,
    tools: {
      web_search: tool({
        description: 'Search the web for information',
        parameters: {
          type: 'object',
          properties: {
            query: {
              type: 'string',
              description: 'The search query',
            },
          },
          required: ['query'],
        },
        execute: async ({ query }) => {
          const response = await fetch(`https://api.search.brave.com/res/v1/web/search?q=${encodeURIComponent(query)}`, {
            headers: {
              'X-Subscription-Token': process.env.BRAVE_API_KEY || '',
            },
          });
          const data = await response.json();
          return JSON.stringify(data);
        },
      }),
    },
  });

  return result.toDataStreamResponse();
}