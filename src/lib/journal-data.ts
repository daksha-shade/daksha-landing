export type JournalEntry = {
  id: string
  type: 'text' | 'audio' | 'video' | 'mixed'
  title: string
  yooptaContent?: any
  plainTextContent?: string
  content?: string
  audioUrl?: string
  videoUrl?: string
  attachments?: Array<{ type: 'video' | 'audio' | 'image', name: string, url: string }>
  timestamp: Date
  mood?: string
  tags?: string[]
  duration?: number // for audio/video in seconds
}

// Mock journal entries with different types
export const mockJournalEntries: JournalEntry[] = [
  {
    id: '1',
    type: 'text',
    title: 'Morning Reflections',
    content: `Feeling energized about the Daksha project. Had some great insights during my walk about the user experience flow.

The key insight was about how users interact with the journaling interface. I think we need to make it more intuitive and less overwhelming. The current design has too many options visible at once.

Some specific ideas:
- Simplify the main interface to focus on the core action (writing/recording)
- Move advanced features to a secondary menu
- Add better visual hierarchy to guide users through the flow
- Consider adding onboarding for new users

I'm excited to implement these changes and see how they impact user engagement. The goal is to make journaling feel effortless and natural, not like a chore.

Also thinking about the AI integration - how can we make Daksha's responses feel more personal and contextual? Maybe we need to analyze the emotional tone of entries better and respond accordingly.`,
    timestamp: new Date('2024-01-15T08:30:00'),
    mood: 'energetic',
    tags: ['morning', 'insights', 'daksha', 'ux', 'ai']
  },
  {
    id: '2',
    type: 'audio',
    title: 'Voice Note - Project Ideas',
    content: 'Recorded some thoughts about the new features we could implement. Discussing the roadmap for Q1 and potential user feedback integration.',
    audioUrl: '/mock-audio.mp3',
    timestamp: new Date('2024-01-14T14:20:00'),
    mood: 'focused',
    tags: ['ideas', 'voice-note', 'roadmap'],
    duration: 180
  },
  {
    id: '3',
    type: 'video',
    title: 'Daily Standup Reflection',
    content: 'Quick video recap of today\'s standup and my thoughts on the sprint progress. Discussing blockers and next steps.',
    videoUrl: '/mock-video.mp4',
    timestamp: new Date('2024-01-14T09:15:00'),
    mood: 'thoughtful',
    tags: ['standup', 'sprint', 'team'],
    duration: 120
  },
  {
    id: '4',
    type: 'text',
    title: 'Weekend Planning',
    content: 'Thinking about what I want to accomplish this weekend. Need to balance work and personal time...',
    timestamp: new Date('2024-01-13T18:45:00'),
    mood: 'contemplative',
    tags: ['weekend', 'planning']
  },
  {
    id: '5',
    type: 'mixed',
    title: 'Learning Session Notes',
    content: `Watched a great tutorial on React patterns today. Here are my key takeaways:

## Server Components vs Client Components
- Server components run on the server and can directly access databases
- Client components run in the browser and handle interactivity
- The boundary between them is important for performance

## New Patterns I Learned
1. **Composition over Configuration**: Instead of passing lots of props, compose components together
2. **Data Fetching at the Component Level**: Each component can fetch its own data
3. **Streaming and Suspense**: Better loading states and progressive rendering

I recorded a quick video explaining these concepts to myself, and took some screenshots of the code examples.

This is going to be really useful for the Daksha project, especially as we scale up the complexity of the UI.`,
    timestamp: new Date('2024-01-13T16:30:00'),
    mood: 'excited',
    tags: ['learning', 'react', 'patterns', 'development'],
    attachments: [
      { type: 'video', name: 'react-patterns-explanation.mp4', url: '#' },
      { type: 'image', name: 'code-example-1.png', url: '#' },
      { type: 'image', name: 'code-example-2.png', url: '#' }
    ]
  },
  {
    id: '6',
    type: 'text',
    title: 'Late Night Thoughts',
    content: 'Can\'t sleep, so writing down some random thoughts about life and work balance...',
    timestamp: new Date('2024-01-12T23:30:00'),
    mood: 'contemplative',
    tags: ['late-night', 'thoughts']
  },
  {
    id: '7',
    type: 'audio',
    title: 'Morning Meditation Reflection',
    content: 'Recorded my thoughts after a 20-minute meditation session...',
    timestamp: new Date('2024-01-12T07:00:00'),
    mood: 'energetic',
    tags: ['meditation', 'morning'],
    duration: 300
  },
  {
    id: '8',
    type: 'video',
    title: 'Cooking Experiment',
    content: 'Tried a new recipe today and documented the process...',
    timestamp: new Date('2024-01-11T19:30:00'),
    mood: 'excited',
    tags: ['cooking', 'experiment'],
    duration: 240
  },
  {
    id: '9',
    type: 'text',
    title: 'Book Review - Atomic Habits',
    content: 'Just finished reading Atomic Habits. Some key takeaways and how I plan to apply them...',
    timestamp: new Date('2024-01-11T15:20:00'),
    mood: 'thoughtful',
    tags: ['books', 'habits', 'review']
  },
  {
    id: '10',
    type: 'audio',
    title: 'Walk and Talk',
    content: 'Recorded my thoughts during a walk in the park...',
    timestamp: new Date('2024-01-10T17:45:00'),
    mood: 'energetic',
    tags: ['walk', 'nature'],
    duration: 420
  },
  {
    id: '11',
    type: 'text',
    title: 'Goal Setting for Q1',
    content: 'Setting my goals for the first quarter. Want to be more intentional about my growth...',
    timestamp: new Date('2024-01-10T10:00:00'),
    mood: 'focused',
    tags: ['goals', 'planning', 'q1']
  },
  {
    id: '12',
    type: 'video',
    title: 'Team Retrospective Thoughts',
    content: 'Sharing my thoughts on our team retrospective and areas for improvement...',
    timestamp: new Date('2024-01-09T16:30:00'),
    mood: 'thoughtful',
    tags: ['team', 'retrospective'],
    duration: 180
  }
]

export const getJournalEntryById = (id: string): JournalEntry | undefined => {
  return mockJournalEntries.find(entry => entry.id === id)
}

export const getMoodColor = (mood?: string) => {
  switch (mood) {
    case 'energetic': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
    case 'focused': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
    case 'excited': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300'
    case 'thoughtful': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300'
    case 'contemplative': return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300'
    default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300'
  }
}

export const formatDuration = (seconds: number) => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

export const formatDate = (date: Date) => {
  const now = new Date()
  const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)

  if (diffInHours < 24) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  } else if (diffInHours < 48) {
    return 'Yesterday'
  } else {
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' })
  }
}

export const formatFullDate = (date: Date) => {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
