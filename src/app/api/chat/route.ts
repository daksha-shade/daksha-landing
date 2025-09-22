import { streamText, convertToModelMessages } from 'ai';
import { openai } from '@ai-sdk/openai';
import { stackServerApp } from "@/stack";
import { searchUserContext } from "@/lib/context-service";
import { searchUserJournals } from "@/lib/journal-search";
import { selectAgent, getAgentConfig } from "@/agents/config";
import { agentTools } from "@/agents/tools";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages, contextSearch = true } = body as {
      messages: any[];
      contextSearch?: boolean;
    };

    // Get user from Stack Auth
    const user = await stackServerApp.getUser();
    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Convert UI messages to model format
    const modelMessages = convertToModelMessages(messages);

    // Use GPT-4o only with the provided API key
    const selectedModel = openai('gpt-4o');

    // Get agent configuration
    const lastUserMsg = [...modelMessages].reverse().find((m) => m.role === "user");
    const lastUserContent = typeof lastUserMsg?.content === "string" ? lastUserMsg.content : "";
    const agent = selectAgent(lastUserContent);
    const agentConfig = getAgentConfig(agent);

    // Search context if enabled
    let contextResults: any[] = [];
    let journalResults: any[] = [];
    if (contextSearch && lastUserContent) {
      try {
        contextResults = await searchUserContext(user.id, lastUserContent);
      } catch (error) {
        console.error('Context search error:', error);
      }
      try {
        journalResults = await searchUserJournals(user.id, lastUserContent);
      } catch (error) {
        console.error('Journal search error:', error);
      }
    }

    // Prepare system message with context
    let systemMessage = agentConfig.systemPrompt;
    if (contextResults.length > 0 || journalResults.length > 0) {
      const ctxLines = contextResults
        .slice(0, 5)
        .map((r: any) => `- [Context] ${r.payload?.title ?? 'Untitled'}: ${r.payload?.chunkText?.slice(0,160) ?? ''} (id:${r.id})`)
        .join('\n');
      const jrnlLines = journalResults
        .slice(0, 5)
        .map((r: any) => `- [Journal ${r.entryDate ? new Date(r.entryDate).toLocaleDateString() : ''}] ${r.title ?? 'Untitled'}: ${r.snippet}`)
        .join('\n');
      const header = '\n\nRelevant knowledge (use for grounding, cite briefly in answers):\n';
      systemMessage += header + [ctxLines, jrnlLines].filter(Boolean).join('\n');
    }

    // Ensure the model continues after tool calls and produces a final answer
    const result = await streamText({
      model: selectedModel,
      system: systemMessage + "\n\nWhen you use tools, always produce a concise final answer for the user based on tool results.",
      messages: modelMessages,
      tools: agentTools,
      toolChoice: 'auto',
      maxSteps: 5,
    });

    // Return streaming response
    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error('Chat API error:', error);
    return Response.json(
      { error: 'Failed to process chat request' }, 
      { status: 500 }
    );
  }
}
