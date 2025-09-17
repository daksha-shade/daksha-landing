import { openai } from "@ai-sdk/openai";
import { convertToModelMessages, streamText } from "ai";
import { stackServerApp } from "@/stack";
import { searchUserContext } from "@/lib/context-service";
import { selectAgent, getAgentConfig } from "@/agents/config";
import { agentTools } from "@/agents/tools";

export const maxDuration = 30;

export async function POST(req: Request) {
  const body = await req.json() as {
    messages: any[];
    system?: string;
  };
  const { messages, system } = body;

  // Get the last user message to determine which agent to use
  const modelMessages = convertToModelMessages(messages);
  const lastUserMsg = [...modelMessages].reverse().find((m) => m.role === "user");
  const lastUserContent = typeof lastUserMsg?.content === "string" ? lastUserMsg.content : "";
  
  // Select appropriate agent based on user message
  const selectedAgent = selectAgent(lastUserContent);
  const agentConfig = getAgentConfig(selectedAgent);

  // Enrich with priority context from user's saved context files (Qdrant)
  let prioritySystem = "";
  try {
    const user = await stackServerApp.getUser({ or: "return-null" });
    if (user) {
      const query = lastUserContent;
      if (query && query.trim()) {
        const hits = await searchUserContext(user.id, query, 5);
        if (hits.length) {
          const ctxText = hits
            .map((h) => {
              const p = h.payload as any;
              const title = p?.title ? ` (${p.title})` : "";
              return `- ${p?.chunkText ?? ""}`.trim() + title;
            })
            .join("\n");
          prioritySystem = `You have access to the user's priority context. Use it above all else when answering, and prefer it over external or general knowledge.\n\nPriority Context:\n${ctxText}\n\n`; 
        }
      }
    }
  } catch (err) {
    console.warn("Context retrieval failed", err);
  }

  // Combine agent system prompt with context and any additional system message
  const combinedSystem = `${prioritySystem}${agentConfig.systemPrompt}

MANDATORY TEXT GENERATION PROTOCOL:
You MUST ALWAYS generate a text response to every user message. This is non-negotiable.

If you need information, gather it using tools, then IMMEDIATELY provide a helpful text response.

CRITICAL RULES:
1. NEVER end your response without generating text for the user
2. If you use tools, the tool results must be followed by conversational text
3. Always acknowledge the user's question with a natural response
4. Be helpful, informative, and engaging in your text responses

For birthday questions specifically:
- Use search_context tool to find birthday information
- Then respond naturally like: "Your birthday is [DATE]! That's [context about timing]. Hope you have a wonderful celebration!"

Remember: Tool execution + Text response = Complete interaction

${system ?? ""}`.trim();

  // Check if this looks like a query that would need tools
  const needsTools = lastUserContent.toLowerCase().includes('birthday') || 
                    lastUserContent.toLowerCase().includes('when') ||
                    lastUserContent.toLowerCase().includes('what') ||
                    lastUserContent.toLowerCase().includes('my');

  // If this looks like a tool-heavy query, add explicit instruction
  const finalMessages = needsTools ? [
    ...modelMessages,
    {
      role: "system" as const,
      content: "Remember: After using any tools to gather information, you MUST provide a conversational text response to the user. Do not end your response after tool execution."
    }
  ] : modelMessages;

  let result = streamText({
    model: openai("gpt-4o"),
    messages: finalMessages,
    system: combinedSystem,
    temperature: agentConfig.temperature,
    tools: {
      // Only use backend tools to avoid frontend tool UI
      ...agentTools,
    },
    // Force the model to generate text after tool calls
    toolChoice: "auto",
    async onFinish(result) {
      // Log tool usage for debugging
      if (result.toolCalls && result.toolCalls.length > 0) {
        console.log("Tools called:", result.toolCalls.map(tc => tc.toolName));
        console.log("Response text length:", result.text?.length || 0);
        console.log("Steps count:", result.steps?.length || 0);
        console.log("Response text:", result.text);
        
        // If no text was generated after tool calls, this is the issue
        if (!result.text || result.text.length === 0) {
          console.error("⚠️  Model stopped after tool execution without generating text!");
        }
      }
    },
  });

  // If this is a tool-heavy request and we expect the model might stop after tool execution,
  // we can add additional logic here in the future

  return result.toUIMessageStreamResponse();
}
