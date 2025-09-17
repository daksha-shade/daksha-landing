import { tool } from "ai";
import { z } from "zod";

// Agent tool definitions using AI SDK v5.0 syntax
export const agentTools = {
  search_web: tool({
    description: "Search the internet for real-time information and current events",
    inputSchema: z.object({
      query: z.string().describe("The search query"),
      maxResults: z.number().default(5).describe("Maximum number of results to return"),
    }),
    execute: async ({ query, maxResults }) => {
      return await searchWeb({ query, maxResults });
    },
  }),

  search_context: tool({
    description: "Search through the user's personal knowledge base and context files",
    inputSchema: z.object({
      query: z.string().describe("The search query for user's context"),
      maxResults: z.number().default(3).describe("Maximum number of results to return"),
    }),
    execute: async ({ query, maxResults }) => {
      return await searchContext({ query, maxResults });
    },
  }),

  save_memory: tool({
    description: "Save important information to the user's memory for future reference",
    inputSchema: z.object({
      title: z.string().describe("A descriptive title for the memory"),
      content: z.string().describe("The content to save"),
      tags: z.array(z.string()).nullable().describe("Optional tags for categorization"),
    }),
    execute: async ({ title, content, tags }) => {
      return await saveMemory({ title, content, tags });
    },
  }),

  create_journal_entry: tool({
    description: "Create a new journal entry for reflection and personal growth",
    inputSchema: z.object({
      content: z.string().describe("The journal entry content"),
      title: z.string().nullable().describe("Optional title for the entry"),
      mood: z.string().nullable().describe("Optional mood indicator"),
      tags: z.array(z.string()).nullable().describe("Optional tags for categorization"),
    }),
    execute: async ({ content, title, mood, tags }) => {
      return await createJournalEntry({ content, title, mood, tags });
    },
  }),

  create_goal: tool({
    description: "Create a new goal or objective for the user",
    inputSchema: z.object({
      title: z.string().describe("The goal title"),
      description: z.string().nullable().describe("Detailed description of the goal"),
      targetDate: z.string().nullable().describe("Target completion date (ISO format)"),
      priority: z.enum(["low", "medium", "high"]).default("medium").describe("Goal priority level"),
    }),
    execute: async ({ title, description, targetDate, priority }) => {
      return await createGoal({ title, description, targetDate, priority });
    },
  }),

  track_mood: tool({
    description: "Track the user's current mood and emotional state",
    inputSchema: z.object({
      mood: z.string().describe("The current mood or emotional state"),
      intensity: z.number().min(1).max(10).describe("Mood intensity from 1-10"),
      notes: z.string().nullable().describe("Optional notes about the mood"),
    }),
    execute: async ({ mood, intensity, notes }) => {
      return await trackMood({ mood, intensity, notes });
    },
  }),

  get_library_docs: tool({
    description: "Get up-to-date documentation and code examples for any library using Context7",
    inputSchema: z.object({
      libraryName: z.string().describe("Name of the library to get documentation for (e.g., 'react', 'next.js', 'prisma')"),
      topic: z.string().nullable().describe("Specific topic to focus on (e.g., 'hooks', 'routing', 'authentication')"),
    }),
    execute: async ({ libraryName, topic }) => {
      return await getLibraryDocs({ libraryName, topic });
    },
  }),
};

// Tool implementation functions
async function searchWeb({ query, maxResults = 5 }: { query: string; maxResults?: number }) {
  try {
    const response = await fetch("/api/web-search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, maxResults }),
    });

    if (!response.ok) {
      throw new Error("Failed to search web");
    }

    const data = await response.json() as { results?: any[]; query: string; totalResults: number };
    return {
      results: data.results || [],
      query,
      totalResults: data.totalResults || 0,
    };
  } catch {
    return {
      error: "Failed to search web",
      query,
      results: [],
      totalResults: 0,
    };
  }
}

async function searchContext({ query, maxResults = 3 }: { query: string; maxResults?: number }) {
  try {
    // Import the search function directly to avoid authentication issues
    const { searchUserContext } = await import("@/lib/context-service");
    const { stackServerApp } = await import("@/stack");
    
    // Get the current user
    const user = await stackServerApp.getUser({ or: "return-null" });
    if (!user) {
      return {
        error: "User not authenticated",
        query,
        results: [],
        totalResults: 0,
      };
    }

    // Search the user's context directly
    const results = await searchUserContext(user.id, query, maxResults);
    
    return {
      results: results.map(result => ({
        id: result.id,
        score: result.score,
        title: result.payload?.title || "Untitled",
        content: result.payload?.chunkText || "",
        sourceUrl: result.payload?.sourceUrl,
      })),
      query,
      totalResults: results.length,
    };
  } catch (error) {
    console.error("Context search error:", error);
    return {
      error: "Failed to search context",
      query,
      results: [],
      totalResults: 0,
    };
  }
}

async function saveMemory({ title, content, tags }: { title: string; content: string; tags?: string[] | null }) {
  try {
    // Import context service to save directly
    const { createContextFileForUser } = await import("@/lib/context-service");
    const { stackServerApp } = await import("@/stack");
    
    // Get the current user
    const user = await stackServerApp.getUser({ or: "return-null" });
    if (!user) {
      return {
        error: "User not authenticated",
        title,
      };
    }

    // Save the memory directly using the context service
    const memoryContent = `${content}\n\nTags: ${tags?.join(", ") || "none"}`;
    const result = await createContextFileForUser({
      userId: user.id,
      title: `[Memory] ${title}`,
      content: memoryContent,
    });

    return {
      success: true,
      title,
      id: result.id,
      message: "Memory saved successfully",
    };
  } catch (error) {
    console.error("Save memory error:", error);
    return {
      error: "Failed to save memory",
      title,
    };
  }
}

async function createJournalEntry({ 
  content, 
  title, 
  mood, 
  tags 
}: { 
  content: string; 
  title?: string | null; 
  mood?: string | null; 
  tags?: string[] | null; 
}) {
  try {
    // Use context service to create journal entry
    const { createContextFileForUser } = await import("@/lib/context-service");
    const { stackServerApp } = await import("@/stack");
    
    // Get the current user
    const user = await stackServerApp.getUser({ or: "return-null" });
    if (!user) {
      return {
        error: "User not authenticated",
        content: content.substring(0, 100) + "...",
      };
    }

    // Create journal entry as a context file
    const journalTitle = title || `Journal Entry - ${new Date().toLocaleDateString()}`;
    const journalContent = `${content}\n\n---\nMood: ${mood || "Not specified"}\nTags: ${tags?.join(", ") || "none"}\nDate: ${new Date().toISOString()}`;
    
    const result = await createContextFileForUser({
      userId: user.id,
      title: `[Journal] ${journalTitle}`,
      content: journalContent,
    });

    return {
      success: true,
      id: result.id,
      title: journalTitle,
      message: "Journal entry created successfully",
    };
  } catch (error) {
    console.error("Create journal entry error:", error);
    return {
      error: "Failed to create journal entry",
      content: content.substring(0, 100) + "...",
    };
  }
}

async function createGoal({ 
  title, 
  description, 
  targetDate, 
  priority 
}: { 
  title: string; 
  description?: string | null; 
  targetDate?: string | null; 
  priority: string; 
}) {
  try {
    const response = await fetch("/api/goals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, targetDate, priority }),
    });

    if (!response.ok) {
      throw new Error("Failed to create goal");
    }

    const data = await response.json() as { id: string; title: string };
    return {
      success: true,
      id: data.id,
      title: data.title,
      priority,
      message: "Goal created successfully",
    };
  } catch {
    return {
      error: "Failed to create goal",
      title,
    };
  }
}

async function trackMood({ 
  mood, 
  intensity, 
  notes 
}: { 
  mood: string; 
  intensity: number; 
  notes?: string | null; 
}) {
  try {
    const journalContent = `Mood: ${mood} (${intensity}/10)${notes ? `\n\nNotes: ${notes}` : ""}`;
    
    const response = await fetch("/api/journal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        content: journalContent,
        title: `Mood Check - ${new Date().toLocaleDateString()}`,
        mood,
        tags: ["mood", "tracking"],
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to track mood");
    }

    const data = await response.json() as { id: string };
    return {
      success: true,
      mood,
      intensity,
      id: data.id,
      message: "Mood tracked successfully",
    };
  } catch {
    return {
      error: "Failed to track mood",
      mood,
      intensity,
    };
  }
}

async function getLibraryDocs({ 
  libraryName, 
  topic 
}: { 
  libraryName: string; 
  topic?: string | null; 
}) {
  try {
    // First resolve the library ID
    const resolveResponse = await fetch("/api/context7/resolve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ libraryName }),
    });

    if (!resolveResponse.ok) {
      throw new Error("Failed to resolve library");
    }

    const resolveData = await resolveResponse.json() as { libraryId: string };
    
    // Then get the documentation
    const docsResponse = await fetch("/api/context7/docs", {
      method: "POST", 
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        libraryId: resolveData.libraryId,
        topic,
        tokens: 2000,
      }),
    });

    if (!docsResponse.ok) {
      throw new Error("Failed to get documentation");
    }

    const docsData = await docsResponse.json() as { documentation: string };
    return {
      success: true,
      libraryName,
      topic,
      documentation: docsData.documentation,
      message: `Retrieved documentation for ${libraryName}`,
    };
  } catch {
    return {
      error: "Failed to get library documentation",
      libraryName,
      topic,
    };
  }
}