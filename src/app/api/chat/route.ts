import { openai } from "@ai-sdk/openai";
import { frontendTools } from "@assistant-ui/react-ai-sdk";
import { convertToModelMessages, streamText } from "ai";
import { stackServerApp } from "@/stack";
import { searchUserContext } from "@/lib/context-service";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, system, tools } = await req.json();

  // Enrich with priority context from user's saved context files (Qdrant)
  let prioritySystem = "";
  try {
    const user = await stackServerApp.getUser({ or: "return-null" });
    if (user) {
      const modelMessages = convertToModelMessages(messages);
      const lastUserMsg = [...modelMessages].reverse().find((m) => m.role === "user");
      const query = typeof lastUserMsg?.content === "string" ? lastUserMsg.content : undefined;
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

  const result = streamText({
    model: openai("gpt-4o"),
    messages: convertToModelMessages(messages),
    system: `${prioritySystem}${system ?? ""}`.trim(),
    tools: {
      ...frontendTools(tools),
      // add backend tools here
    },
  });

  return result.toUIMessageStreamResponse();
}
