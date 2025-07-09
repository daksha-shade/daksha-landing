"use client"

import { useState, useEffect } from 'react'
import { Quote, Lightbulb, Sparkles, RefreshCw, Heart, Brain } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface DailyContent {
  quote: {
    text: string
    author: string
    category: string
  }
  thought: {
    text: string
    category: string
  }
  suggestion: {
    text: string
    action: string
    category: string
    icon: string
  }
}

const dailyContent: DailyContent[] = [
  {
    quote: {
      text: "The only way to do great work is to love what you do.",
      author: "Steve Jobs",
      category: "motivation"
    },
    thought: {
      text: "Every small step forward is progress. Celebrate the journey, not just the destination.",
      category: "mindfulness"
    },
    suggestion: {
      text: "Write a poem about your current feelings and publish it on Vani",
      action: "Create & Share",
      category: "creativity",
      icon: "✍️"
    }
  },
  {
    quote: {
      text: "Be yourself; everyone else is already taken.",
      author: "Oscar Wilde",
      category: "authenticity"
    },
    thought: {
      text: "Your unique perspective is your superpower. Don't try to fit into someone else's mold.",
      category: "self-acceptance"
    },
    suggestion: {
      text: "Take a 10-minute walk without your phone and observe your surroundings",
      action: "Mindful Walk",
      category: "mindfulness",
      icon: "🚶"
    }
  },
  {
    quote: {
      text: "The future belongs to those who believe in the beauty of their dreams.",
      author: "Eleanor Roosevelt",
      category: "dreams"
    },
    thought: {
      text: "Dreams without action remain wishes. What's one small step you can take today?",
      category: "action"
    },
    suggestion: {
      text: "Record a voice note about your biggest dream and why it matters to you",
      action: "Dream Recording",
      category: "reflection",
      icon: "🎤"
    }
  },
  {
    quote: {
      text: "In the middle of difficulty lies opportunity.",
      author: "Albert Einstein",
      category: "resilience"
    },
    thought: {
      text: "Challenges are not roadblocks; they're stepping stones to growth and wisdom.",
      category: "growth"
    },
    suggestion: {
      text: "Write down three things you're grateful for and share one with someone you care about",
      action: "Gratitude Practice",
      category: "gratitude",
      icon: "🙏"
    }
  },
  {
    quote: {
      text: "The best time to plant a tree was 20 years ago. The second best time is now.",
      author: "Chinese Proverb",
      category: "action"
    },
    thought: {
      text: "Perfectionism is the enemy of progress. Start where you are, with what you have.",
      category: "progress"
    },
    suggestion: {
      text: "Learn something new for 15 minutes today - a language, skill, or hobby",
      action: "Learn & Grow",
      category: "learning",
      icon: "📚"
    }
  }
]

interface DailyInspirationProps {
  className?: string
}

export default function DailyInspiration({ className }: DailyInspirationProps) {
  const [currentContent, setCurrentContent] = useState<DailyContent>(dailyContent[0])
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    // Get today's content based on date
    const today = new Date()
    const dayIndex = today.getDate() % dailyContent.length
    setCurrentContent(dailyContent[dayIndex])
  }, [])

  const refreshContent = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * dailyContent.length)
      setCurrentContent(dailyContent[randomIndex])
      setIsRefreshing(false)
    }, 500)
  }

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      motivation: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
      authenticity: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
      dreams: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300',
      resilience: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
      action: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
      mindfulness: 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300',
      creativity: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
      reflection: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300',
      gratitude: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300',
      learning: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
    }
    return colors[category] || 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300'
  }

  return (
    <Card className={cn("", className)}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-yellow-500" />
            Daily Inspiration
          </h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={refreshContent}
            disabled={isRefreshing}
            className="h-8 w-8 p-0"
          >
            <RefreshCw className={cn("w-3 h-3", isRefreshing && "animate-spin")} />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Quote */}
          <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
            <div className="flex items-center gap-1 mb-2">
              <Quote className="w-3 h-3 text-blue-500" />
              <span className="text-xs font-medium">Quote</span>
            </div>
            <blockquote className="text-xs italic mb-1">
              "{currentContent.quote.text}"
            </blockquote>
            <cite className="text-xs text-muted-foreground">— {currentContent.quote.author}</cite>
          </div>

          {/* Thought */}
          <div className="p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
            <div className="flex items-center gap-1 mb-2">
              <Brain className="w-3 h-3 text-purple-500" />
              <span className="text-xs font-medium">Thought</span>
            </div>
            <p className="text-xs">{currentContent.thought.text}</p>
          </div>

          {/* Suggestion */}
          <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
            <div className="flex items-center gap-1 mb-2">
              <Lightbulb className="w-3 h-3 text-green-500" />
              <span className="text-xs font-medium">Suggestion</span>
            </div>
            <p className="text-xs mb-2">{currentContent.suggestion.text}</p>
            <Button size="sm" variant="outline" className="h-6 text-xs">
              {currentContent.suggestion.action}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}