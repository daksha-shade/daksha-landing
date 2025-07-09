// Dashboard data types and mock data

export interface Memory {
  id: string
  type: 'photo' | 'video' | 'note' | 'journal'
  title: string
  content?: string
  url?: string
  thumbnail?: string
  timestamp: Date
  tags: string[]
  location?: string
  people?: string[]
  aiDescription?: string
}

export interface PlannerTask {
  id: string
  title: string
  description?: string
  type: 'meeting' | 'task' | 'reminder' | 'event'
  startTime: Date
  endTime?: Date
  completed: boolean
  priority: 'low' | 'medium' | 'high'
  category: string
}

export interface Goal {
  id: string
  title: string
  description: string
  progress: number
  dueDate: string
  status: 'not-started' | 'in-progress' | 'completed' | 'paused'
  category: 'personal' | 'work' | 'health' | 'learning'
  importance: 'low' | 'medium' | 'high' | 'critical'
}

export interface Thought {
  id: string
  content: string
  category: 'idea' | 'reflection' | 'inspiration' | 'random'
  timestamp: Date
  tags: string[]
  mood?: string
}

export interface DailyInspiration {
  thoughtOfTheDay: string
  quoteOfTheDay: {
    text: string
    author: string
  }
  suggestionOfTheDay: {
    text: string
    action: string
    category: 'creative' | 'productive' | 'wellness' | 'learning'
  }
}

// Mock data
export const mockMemories: Memory[] = [
  {
    id: '1',
    type: 'photo',
    title: 'Team Meeting Success',
    thumbnail: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=300&q=80',
    timestamp: new Date('2024-01-15T14:30:00'),
    tags: ['work', 'team', 'success'],
    location: 'Office',
    people: ['John', 'Sarah', 'Mike'],
    aiDescription: 'A productive team meeting where we discussed the Q1 roadmap'
  },
  {
    id: '2',
    type: 'video',
    title: 'Morning Walk Inspiration',
    thumbnail: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=300&q=80',
    timestamp: new Date('2024-01-15T08:00:00'),
    tags: ['nature', 'inspiration', 'morning'],
    location: 'Central Park',
    aiDescription: 'Beautiful sunrise during morning walk, feeling inspired'
  },
  {
    id: '3',
    type: 'journal',
    title: 'Breakthrough Moment',
    content: 'Had an amazing insight about the user experience flow...',
    timestamp: new Date('2024-01-14T20:15:00'),
    tags: ['insight', 'ux', 'breakthrough'],
    aiDescription: 'Key realization about simplifying the user interface'
  },
  {
    id: '4',
    type: 'photo',
    title: 'Sunset Reflection',
    thumbnail: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=300&q=80',
    timestamp: new Date('2024-01-14T18:45:00'),
    tags: ['sunset', 'reflection', 'peace'],
    location: 'Beach',
    aiDescription: 'Peaceful moment watching the sunset, feeling grateful'
  },
  {
    id: '5',
    type: 'note',
    title: 'Project Ideas',
    content: 'New feature concepts for Daksha: voice commands, smart notifications...',
    timestamp: new Date('2024-01-13T16:20:00'),
    tags: ['ideas', 'features', 'innovation'],
    aiDescription: 'Creative brainstorming session with innovative ideas'
  }
]

export const mockTodayTasks: PlannerTask[] = [
  {
    id: '1',
    title: 'Team Standup',
    description: 'Daily sync with the development team',
    type: 'meeting',
    startTime: new Date('2024-01-15T09:00:00'),
    endTime: new Date('2024-01-15T09:30:00'),
    completed: true,
    priority: 'medium',
    category: 'work'
  },
  {
    id: '2',
    title: 'Review YC Application',
    description: 'Final review before submission',
    type: 'task',
    startTime: new Date('2024-01-15T14:00:00'),
    endTime: new Date('2024-01-15T16:00:00'),
    completed: false,
    priority: 'high',
    category: 'work'
  },
  {
    id: '3',
    title: 'Meditation Session',
    description: '20-minute mindfulness practice',
    type: 'reminder',
    startTime: new Date('2024-01-15T18:00:00'),
    completed: false,
    priority: 'medium',
    category: 'wellness'
  },
  {
    id: '4',
    title: 'Journal Entry',
    description: 'Reflect on today\'s progress',
    type: 'reminder',
    startTime: new Date('2024-01-15T21:00:00'),
    completed: false,
    priority: 'low',
    category: 'personal'
  }
]

export const mockGoals: Goal[] = [
  {
    id: '1',
    title: 'Launch Daksha MVP',
    description: 'Complete and launch the minimum viable product',
    progress: 75,
    dueDate: 'Dec 15, 2024',
    status: 'in-progress',
    category: 'work',
    importance: 'critical'
  },
  {
    id: '2',
    title: 'YC Application',
    description: 'Submit Y Combinator application',
    progress: 90,
    dueDate: 'Dec 10, 2024',
    status: 'in-progress',
    category: 'work',
    importance: 'critical'
  },
  {
    id: '3',
    title: 'Daily Journaling Habit',
    description: 'Maintain consistent daily journaling',
    progress: 60,
    dueDate: 'Ongoing',
    status: 'in-progress',
    category: 'personal',
    importance: 'high'
  },
  {
    id: '4',
    title: 'Learn TypeScript Advanced',
    description: 'Master advanced TypeScript patterns',
    progress: 30,
    dueDate: 'Jan 31, 2025',
    status: 'in-progress',
    category: 'learning',
    importance: 'medium'
  }
]

export const mockThoughts: Thought[] = [
  {
    id: '1',
    content: 'What if we could predict user emotions from their writing patterns?',
    category: 'idea',
    timestamp: new Date('2024-01-15T10:30:00'),
    tags: ['ai', 'emotions', 'innovation'],
    mood: 'curious'
  },
  {
    id: '2',
    content: 'The simplest solutions are often the most elegant',
    category: 'reflection',
    timestamp: new Date('2024-01-14T15:45:00'),
    tags: ['simplicity', 'design', 'philosophy']
  },
  {
    id: '3',
    content: 'Voice interfaces could revolutionize how we interact with our thoughts',
    category: 'inspiration',
    timestamp: new Date('2024-01-13T12:20:00'),
    tags: ['voice', 'ui', 'future'],
    mood: 'excited'
  }
]

export const getTodayInspiration = (): DailyInspiration => {
  const inspirations = [
    {
      thoughtOfTheDay: "Every small step forward is progress worth celebrating.",
      quoteOfTheDay: {
        text: "The only way to do great work is to love what you do.",
        author: "Steve Jobs"
      },
      suggestionOfTheDay: {
        text: "Write a poem about your current project and share it",
        action: "Create and share poetry",
        category: 'creative' as const
      }
    },
    {
      thoughtOfTheDay: "Your thoughts today shape your reality tomorrow.",
      quoteOfTheDay: {
        text: "Innovation distinguishes between a leader and a follower.",
        author: "Steve Jobs"
      },
      suggestionOfTheDay: {
        text: "Take a 10-minute walk and voice-record your observations",
        action: "Mindful observation walk",
        category: 'wellness' as const
      }
    },
    {
      thoughtOfTheDay: "Creativity flows when you give yourself permission to explore.",
      quoteOfTheDay: {
        text: "The best time to plant a tree was 20 years ago. The second best time is now.",
        author: "Chinese Proverb"
      },
      suggestionOfTheDay: {
        text: "Learn one new thing about your favorite topic today",
        action: "Explore and learn",
        category: 'learning' as const
      }
    }
  ]
  
  // Return different inspiration based on day
  const dayIndex = new Date().getDate() % inspirations.length
  return inspirations[dayIndex]
}

export const getCompletedTasksCount = (tasks: PlannerTask[]): number => {
  return tasks.filter(task => task.completed).length
}

export const getHighPriorityGoals = (goals: Goal[]): Goal[] => {
  return goals
    .filter(goal => goal.importance === 'critical' || goal.importance === 'high')
    .sort((a, b) => {
      const importanceOrder = { critical: 4, high: 3, medium: 2, low: 1 }
      return importanceOrder[b.importance] - importanceOrder[a.importance]
    })
}

export const getRecentMemories = (memories: Memory[], count: number = 6): Memory[] => {
  return memories
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
    .slice(0, count)
}