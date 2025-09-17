import { AgentRole, SYSTEM_PROMPTS } from "./types";

export { AgentRole } from "./types";

// Agent configuration
export interface AgentConfig {
  role: AgentRole;
  name: string;
  description: string;
  systemPrompt: string;
  capabilities: string[];
  tools?: string[];
  temperature?: number;
  maxTokens?: number;
}

// Default agent configurations
export const AGENT_CONFIGS: Record<AgentRole, AgentConfig> = {
  core: {
    role: "core",
    name: "Daksha",
    description: "Your empathetic AI life companion and second brain",
    systemPrompt: SYSTEM_PROMPTS.core,
    capabilities: [
      "General conversation",
      "Life guidance", 
      "Emotional support",
      "Memory integration",
      "Cross-domain assistance"
    ],
    tools: ["search_context", "search_web", "remember_conversation"],
    temperature: 0.7,
    maxTokens: 1000
  },
  
  journal: {
    role: "journal",
    name: "Journal Assistant",
    description: "Specialized in self-reflection and journaling guidance",
    systemPrompt: SYSTEM_PROMPTS.journal,
    capabilities: [
      "Journaling prompts",
      "Emotional processing",
      "Pattern recognition",
      "Self-reflection guidance"
    ],
    tools: ["search_context", "save_journal_entry"],
    temperature: 0.6,
    maxTokens: 800
  },

  productivity: {
    role: "productivity", 
    name: "Productivity Coach",
    description: "Helps with time management, goals, and productivity systems",
    systemPrompt: SYSTEM_PROMPTS.productivity,
    capabilities: [
      "Goal setting",
      "Time management",
      "Habit formation", 
      "Task prioritization",
      "Schedule optimization"
    ],
    tools: ["search_context", "create_goal", "schedule_task"],
    temperature: 0.5,
    maxTokens: 800
  },

  intelligence: {
    role: "intelligence",
    name: "Intelligence Analyst", 
    description: "Analyzes patterns and provides data-driven insights",
    systemPrompt: SYSTEM_PROMPTS.intelligence,
    capabilities: [
      "Pattern analysis",
      "Data insights",
      "Trend identification",
      "Progress tracking",
      "Correlation finding"
    ],
    tools: ["search_context", "analyze_patterns", "generate_insights"],
    temperature: 0.3,
    maxTokens: 1200
  },

  writing: {
    role: "writing",
    name: "WriteFlow",
    description: "Specialized writing assistant for all content types", 
    systemPrompt: SYSTEM_PROMPTS.writing,
    capabilities: [
      "Content creation",
      "Writing improvement",
      "Style adaptation",
      "Creative assistance",
      "Editorial feedback"
    ],
    tools: ["search_context", "search_web", "style_analysis"],
    temperature: 0.8,
    maxTokens: 1500
  },

  wellness: {
    role: "wellness",
    name: "Wellness Guide",
    description: "Focused on mental health and well-being support",
    systemPrompt: SYSTEM_PROMPTS.wellness,
    capabilities: [
      "Mood tracking",
      "Wellness guidance",
      "Stress management",
      "Habit coaching",
      "Energy optimization"
    ],
    tools: ["search_context", "track_mood", "wellness_tips"],
    temperature: 0.6,
    maxTokens: 800
  },

  search: {
    role: "search",
    name: "Research Assistant",
    description: "Helps find information and research topics",
    systemPrompt: SYSTEM_PROMPTS.search,
    capabilities: [
      "Web search",
      "Information synthesis",
      "Fact checking",
      "Research guidance",
      "Source evaluation"
    ],
    tools: ["search_web", "search_context", "fact_check"],
    temperature: 0.4,
    maxTokens: 1000
  },

  memory: {
    role: "memory", 
    name: "Memory Keeper",
    description: "Manages your personal knowledge base and memories",
    systemPrompt: SYSTEM_PROMPTS.memory,
    capabilities: [
      "Information storage",
      "Context retrieval", 
      "Memory organization",
      "Knowledge connections",
      "Insight preservation"
    ],
    tools: ["search_context", "save_memory", "organize_knowledge"],
    temperature: 0.3,
    maxTokens: 800
  }
};

// Agent selection logic
export function selectAgent(userMessage: string): AgentRole {
  const message = userMessage.toLowerCase();
  
  // Journal-related keywords
  if (message.includes("journal") || message.includes("reflect") || message.includes("feeling") || 
      message.includes("emotion") || message.includes("diary") || message.includes("think about")) {
    return "journal";
  }
  
  // Productivity keywords
  if (message.includes("schedule") || message.includes("goal") || message.includes("task") ||
      message.includes("productive") || message.includes("time") || message.includes("deadline") ||
      message.includes("habit") || message.includes("plan")) {
    return "productivity";
  }
  
  // Writing keywords
  if (message.includes("write") || message.includes("draft") || message.includes("edit") ||
      message.includes("content") || message.includes("article") || message.includes("blog") ||
      message.includes("story") || message.includes("improve my writing")) {
    return "writing";
  }
  
  // Wellness keywords
  if (message.includes("mood") || message.includes("stress") || message.includes("anxiety") ||
      message.includes("wellness") || message.includes("mental health") || message.includes("sleep") ||
      message.includes("energy") || message.includes("tired")) {
    return "wellness";
  }
  
  // Search keywords  
  if (message.includes("search") || message.includes("find out") || message.includes("research") ||
      message.includes("look up") || message.includes("what is") || message.includes("tell me about") ||
      message.includes("latest") || message.includes("news")) {
    return "search";
  }
  
  // Intelligence/analysis keywords
  if (message.includes("analyze") || message.includes("pattern") || message.includes("insight") ||
      message.includes("trend") || message.includes("data") || message.includes("progress") ||
      message.includes("correlation") || message.includes("summary")) {
    return "intelligence";
  }
  
  // Memory keywords
  if (message.includes("remember") || message.includes("recall") || message.includes("memory") ||
      message.includes("previous") || message.includes("context") || message.includes("knowledge") ||
      message.includes("save") || message.includes("store")) {
    return "memory";
  }
  
  // Default to core agent
  return "core";
}

// Get agent configuration
export function getAgentConfig(role: AgentRole): AgentConfig {
  return AGENT_CONFIGS[role];
}