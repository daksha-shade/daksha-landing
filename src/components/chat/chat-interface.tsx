"use client";

import { Thread } from '@/components/assistant-ui/thread';
import { AssistantRuntimeProvider, useLocalRuntime } from '@assistant-ui/react';
import { useParams } from 'next/navigation';
import { createThreadHistoryAdapter } from '@/adapters/thread-history-adapter';

// Weather Tool
const weatherTool = {
  description: "Get current weather information for a location",
  parameters: {
    type: "object",
    properties: {
      location: {
        type: "string",
        description: "The city and state, e.g. San Francisco, CA"
      },
      unit: {
        type: "string",
        enum: ["celsius", "fahrenheit"],
        description: "Temperature unit",
        default: "celsius"
      }
    },
    required: ["location"]
  },
  execute: async ({ location, unit = "celsius" }: { location: string; unit?: "celsius" | "fahrenheit" }) => {
    // Mock weather response
    const baseTemp = Math.floor(Math.random() * 30) + 10;
    const temperature = unit === "fahrenheit" ? Math.floor(baseTemp * 9/5 + 32) : baseTemp;
    const conditions = ["sunny", "cloudy", "rainy", "snowy"][Math.floor(Math.random() * 4)];
    
    return {
      location,
      temperature,
      unit,
      conditions,
      description: `${conditions.charAt(0).toUpperCase() + conditions.slice(1)} weather in ${location}`
    };
  }
};

// Time Tool  
const timeTool = {
  description: "Get current time and date",
  parameters: {
    type: "object",
    properties: {
      timezone: {
        type: "string",
        description: "Timezone (optional), e.g. UTC, America/New_York"
      }
    }
  },
  execute: async ({ timezone }: { timezone?: string }) => {
    const now = new Date();
    const tz = timezone || 'UTC';
    const options: Intl.DateTimeFormatOptions = {
      timeZone: tz,
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    };
    
    return {
      time: now.toLocaleString('en-US', options),
      timezone: tz,
      timestamp: now.toISOString()
    };
  }
};

// Search Tool
const searchTool = {
  description: "Search for information on a given topic",
  parameters: {
    type: "object",
    properties: {
      query: {
        type: "string",
        description: "The search query"
      },
      limit: {
        type: "number",
        description: "Maximum number of results",
        default: 3
      }
    },
    required: ["query"]
  },
  execute: async ({ query, limit = 3 }: { query: string; limit?: number }) => {
    // Mock search response
    const mockResults = [
      { id: 1, content: `Information about ${query} - Result 1`, relevance: 0.95 },
      { id: 2, content: `Latest news on ${query} - Result 2`, relevance: 0.87 },
      { id: 3, content: `Research findings about ${query} - Result 3`, relevance: 0.82 },
      { id: 4, content: `Deep dive into ${query} - Result 4`, relevance: 0.75 },
      { id: 5, content: `Analysis of ${query} - Result 5`, relevance: 0.68 }
    ];
    
    return {
      query,
      results: mockResults.slice(0, limit),
      searchTime: new Date().toISOString()
    };
  }
};

// Calculator Tool
const calculatorTool = {
  description: "Perform basic mathematical calculations",
  parameters: {
    type: "object",
    properties: {
      expression: {
        type: "string",
        description: "Mathematical expression to evaluate (e.g., '2 + 2', '10 * 5')"
      }
    },
    required: ["expression"]
  },
  execute: async ({ expression }: { expression: string }) => {
    try {
      // Basic safe evaluation - only allow numbers and basic operators
      const sanitized = expression.replace(/[^0-9+\-*/().\s]/g, '');
      const result = Function(`"use strict"; return (${sanitized})`)();
      
      return {
        expression,
        result: typeof result === 'number' ? result : null,
        formatted: typeof result === 'number' ? result.toString() : 'Error',
        error: typeof result !== 'number' ? "Invalid result" : undefined
      };
    } catch {
      return {
        expression,
        result: null,
        formatted: 'Error',
        error: "Invalid mathematical expression"
      };
    }
  }
};

// Mock ChatModelAdapter that responds to tool requests
const createMockChatModelAdapter = () => ({
  async *run({ messages }) {
    const lastMessage = messages[messages.length - 1];
    
    if (lastMessage?.role === 'user') {
      // Simple response logic
      let response = "I understand your message. ";
      
      const content = lastMessage.content[0];
      if (content?.type === 'text') {
        const text = content.text.toLowerCase();
        
        if (text.includes('weather')) {
          response += "Would you like me to check the weather for a specific location?";
        } else if (text.includes('time')) {
          response += "I can get the current time for you. Which timezone would you like?";
        } else if (text.includes('search')) {
          response += "I can search for information. What would you like me to search for?";
        } else if (text.includes('calculate') || text.includes('math')) {
          response += "I can help with calculations. What would you like me to compute?";
        } else {
          response += "How can I help you today? I can check weather, get time, search for information, or perform calculations.";
        }
      }
      
      yield {
        type: "text-delta" as const,
        textDelta: response
      };
    }
  }
});

export default function ChatInterface() {
  const params = useParams();
  const threadId = params?.threadId as string;

  const runtime = useLocalRuntime(
    createMockChatModelAdapter(),
    {
      tools: {
        getWeather: weatherTool,
        getCurrentTime: timeTool,
        searchKnowledge: searchTool,
        calculator: calculatorTool,
      },
      historyAdapter: threadId ? createThreadHistoryAdapter(threadId) : undefined,
    }
  );

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <div className="flex flex-col h-full">
        <Thread />
      </div>
    </AssistantRuntimeProvider>
  );
}