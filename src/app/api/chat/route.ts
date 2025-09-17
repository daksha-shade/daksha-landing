import { openai } from "@ai-sdk/openai";
import { frontendTools } from "@assistant-ui/react-ai-sdk";
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
    tools?: any;
  };
  const { messages, system, tools } = body;

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

CRITICAL TOOL RESPONSE PROTOCOL:
- When you call any tool, you MUST continue with a conversational response
- NEVER end your response after calling a tool
- Always explain what the tool found in natural language
- Use the tool results to provide helpful insights to the user
- Make your response conversational and engaging

Example correct behavior:
1. User asks "When is my birthday?"
2. You call search_context tool
3. Tool returns data
4. You MUST continue: "I found your birthday information! According to your personal details, your birthday is September 4, 2004. That's coming up soon - hope you have a wonderful celebration!"

IMPORTANT: After using any tool, you MUST provide a conversational response explaining what you found or what action you took. Never execute a tool and remain silent.

${system ?? ""}`.trim();

  const result = streamText({
    model: openai("gpt-4o"),
    messages: modelMessages,
    system: combinedSystem,
    temperature: agentConfig.temperature,
    tools: {
      ...frontendTools(tools),
      ...agentTools,
    },
    toolChoice: "auto",
    async onFinish(result) {
      // Log tool usage for debugging
      if (result.toolCalls && result.toolCalls.length > 0) {
        console.log("Tools called:", result.toolCalls.map(tc => tc.toolName));
        console.log("Response text length:", result.text?.length || 0);
        console.log("Steps count:", result.steps?.length || 0);
        console.log("Full result:", JSON.stringify(result, null, 2));
      }
    },
  });

  return result.toUIMessageStreamResponse();
}
