// Example prompts extracted from use cases for the chat interface
export const chatSuggestions = [
  {
    title: "Start journaling",
    label: "about today's highlights",
    action: "Help me start journaling about today's highlights and what I learned",
    category: "journaling"
  },
  {
    title: "Check the weather",
    label: "in my location",
    action: "What's the weather like in San Francisco today?",
    category: "tools"
  },
  {
    title: "Get current time",
    label: "in different timezones",
    action: "What time is it right now in New York?",
    category: "tools"
  },
  {
    title: "Search knowledge",
    label: "from my data",
    action: "Search for information about machine learning in my knowledge base",
    category: "tools"
  },
  {
    title: "Calculate expenses",
    label: "and budgeting",
    action: "Calculate 2500 * 12 / 100 for my monthly budget",
    category: "tools"
  },
  {
    title: "Analyze my patterns",
    label: "from recent entries",
    action: "Analyze my mood and productivity patterns from my recent journal entries",
    category: "analysis"
  },
  {
    title: "Set personal goals",
    label: "and track progress",
    action: "Help me set meaningful personal goals and create a tracking system",
    category: "productivity"
  },
  {
    title: "Find inspiration",
    label: "for creative projects",
    action: "Help me find inspiration and overcome creative blocks based on my past successes",
    category: "creativity"
  },
  {
    title: "Plan my day",
    label: "with energy optimization",
    action: "When do I work best? Help me plan my day based on my energy patterns",
    category: "productivity"
  },
  {
    title: "Mood check-in",
    label: "and wellness tracking",
    action: "Let's do a mood check-in and track my wellness patterns this week",
    category: "wellness"
  },
  {
    title: "Creative breakthrough",
    label: "using past insights",
    action: "I'm stuck on a creative project. What inspired me in similar situations before?",
    category: "creativity"
  },
  {
    title: "Reflect on growth",
    label: "and learning progress",
    action: "What have I learned recently? Show me my growth and learning patterns",
    category: "self-development"
  }
];

export const getChatSuggestionsByCategory = (category?: string) => {
  if (!category) return chatSuggestions.slice(0, 4); // Default first 4
  return chatSuggestions.filter(suggestion => suggestion.category === category);
};

export const getRandomSuggestions = (count: number = 4) => {
  const shuffled = [...chatSuggestions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};