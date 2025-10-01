import { openai } from '@ai-sdk/openai';
import { streamText, convertToModelMessages, stepCountIs } from 'ai';
import { z } from 'zod';
import { stackServerApp } from '@/stack';

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const _user = await stackServerApp.getUser({ or: "return-null" }); // TODO: Use when Mem0 is re-enabled
    const body = await req.json() as { messages: any[] };
    const { messages } = body;
    // const userId = user?.id || 'anonymous'; // TODO: Use when Mem0 is re-enabled

    const result = await streamText({
      model: openai('gpt-4o-mini'), // Using gpt-4o-mini instead of gpt-4 for cost efficiency
      messages: convertToModelMessages(messages),
      stopWhen: stepCountIs(5), // Allow multi-step tool calls
      tools: {
        getWeather: {
          description: 'Get the current weather in a given location',
          inputSchema: z.object({
            location: z.string().describe('The city and state, e.g. San Francisco, CA'),
            unit: z.enum(['celsius', 'fahrenheit']).default('celsius'),
          }),
          execute: async ({ location, unit }: { location: string; unit: 'celsius' | 'fahrenheit' }) => {
            // Mock weather data - replace with actual API call
            const temperature = Math.round(Math.random() * 30 + 10);
            const conditions = ['sunny', 'cloudy', 'rainy', 'partly cloudy'][Math.floor(Math.random() * 4)];
            
            return {
              location,
              temperature,
              unit,
              conditions,
              description: `It is currently ${temperature}°${unit === 'celsius' ? 'C' : 'F'} and ${conditions} in ${location}.`
            };
          },
        },
        
        getCurrentTime: {
          description: 'Get the current time',
          inputSchema: z.object({
            timezone: z.string().optional().describe('The timezone to get the time for, e.g. America/New_York'),
          }),
          execute: async ({ timezone }: { timezone?: string }) => {
            const now = new Date();
            const timeString = timezone 
              ? now.toLocaleString('en-US', { timeZone: timezone })
              : now.toLocaleString();
            
            return {
              time: timeString,
              timezone: timezone || 'local',
              timestamp: now.toISOString()
            };
          },
        },
        
        searchKnowledge: {
          description: 'Search the knowledge base for information',
          inputSchema: z.object({
            query: z.string().describe('The search query'),
            limit: z.number().optional().default(5).describe('Maximum number of results to return'),
          }),
          execute: async ({ query, limit: _limit }: { query: string; limit?: number }) => {
            // Mock knowledge search - Mem0 disabled in edge runtime
            try {
              // TODO: Re-enable when moving to serverless runtime or finding edge-compatible alternative
              // if (memory && userId !== 'anonymous') {
              //   const memories = await memory.search(query, {
              //     userId,
              //     limit: limit || 5,
              //   });
              //   
              //   return {
              //     query,
              //     results: Array.isArray(memories) ? memories.map((memory: any, index: number) => ({
              //       id: index + 1,
              //       content: memory.content || memory.text || 'No content available',
              //       relevance: memory.score || 0.8
              //     })) : [],
              //     found: Array.isArray(memories) ? memories.length : 0
              //   };
              // }
              
              // Fallback mock data
              return {
                query,
                results: [
                  { id: 1, content: `Mock result for: ${query}`, relevance: 0.9 },
                  { id: 2, content: `Related information about: ${query}`, relevance: 0.7 },
                  { id: 3, content: `Additional context for: ${query}`, relevance: 0.6 }
                ],
                found: 3
              };
            } catch (error) {
              console.error('Knowledge search error:', error);
              return {
                query,
                results: [],
                found: 0,
                error: 'Search temporarily unavailable'
              };
            }
          },
        },
        
        calculator: {
          description: 'Perform mathematical calculations',
          inputSchema: z.object({
            expression: z.string().describe('Mathematical expression to evaluate, e.g. "2 + 2" or "sqrt(16)"'),
          }),
          execute: async ({ expression }: { expression: string }) => {
            try {
              // Simple safe math evaluation - in production, use a proper math parser
              const sanitized = expression.replace(/[^0-9+\-*/().\s]/g, '');
              const result = Function('"use strict"; return (' + sanitized + ')')();
              
              return {
                expression,
                result,
                formatted: `${expression} = ${result}`
              };
            } catch (error) {
              console.error('Calculation error:', error);
              return {
                expression,
                result: null,
                error: 'Invalid mathematical expression',
                formatted: `Error: Cannot evaluate "${expression}"`
              };
            }
          },
        },
      },
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error('Error in chat API:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}