import { streamText, UIMessage, convertToModelMessages } from 'ai';
import { openai } from "@ai-sdk/openai";
import { stackServerApp } from "@/stack";
import { searchUserContext } from "@/lib/context-service";
import { selectAgent, getAgentConfig } from "@/agents/config";
import { agentTools } from "@/agents/tools";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const {
    messages,
    model,
    webSearch,
    contextSearch,
  }: {
    messages: UIMessage[];
    model: string;
    webSearch: boolean;
    contextSearch: boolean;
  } = await req.json();

  // Get the last user message to determine which agent to use
  const modelMessages = convertToModelMessages(messages);
  const lastUserMsg = [...modelMessages].reverse().find((m) => m.role === "user");
  const lastUserContent = typeof lastUserMsg?.content === "string" ? lastUserMsg.content : "";
  
  // Select appropriate agent based on user message
  const selectedAgent = selectAgent(lastUserContent);
  const agentConfig = getAgentConfig(selectedAgent);

  // Enrich with priority context from user's saved context files (Qdrant) if enabled
  let prioritySystem = "";
  if (contextSearch) {
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
  }

  // Create system prompt that encourages natural conversation
  const combinedSystem = `${prioritySystem}${agentConfig.systemPrompt}

CONVERSATION PROTOCOL:
- Be helpful, natural, and conversational
- Use tools silently when needed to gather information
- Provide complete, informative responses
- If you use tools, incorporate the results naturally into your response
- Never mention tool usage explicitly
`;

  // Choose the appropriate model - use web search model if enabled
  const selectedModel = webSearch ? 'perplexity/sonar' : (model || 'openai/gpt-4o');

  const result = streamText({
    model: openai(selectedModel.replace('openai/', '')), // Remove provider prefix for openai
    messages: modelMessages,
    system: combinedSystem,
    temperature: agentConfig.temperature,
    tools: webSearch ? {} : agentTools, // Only use our tools when not doing web search
    toolChoice: "auto",
    async onFinish(result) {
      // Log for debugging
      console.log("Model:", selectedModel);
      console.log("Web Search:", webSearch);
      console.log("Context Search:", contextSearch);
      if (result.toolCalls && result.toolCalls.length > 0) {
        console.log("Tools called:", result.toolCalls.map(tc => tc.toolName));
      }
      console.log("Response text length:", result.text?.length || 0);
    },
  });

  // Return streaming response with sources and reasoning support
  return result.toUIMessageStreamResponse({
    sendSources: webSearch, // Only send sources when web searching
    sendReasoning: true, // Always send reasoning for transparency
  });
}