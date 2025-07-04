"use client"

import { Lightbulb, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { NotionCard, NotionCardContent, NotionCardHeader, NotionCardTitle } from '@/components/ui/notion-card'

const prompts = [
  "What's one thing you're grateful for today?",
  "What challenge are you facing, and how might you approach it differently?",
  "Describe a moment today when you felt most like yourself.",
  "What's something you learned about yourself this week?",
  "If you could give your past self one piece of advice, what would it be?",
  "What's energizing you right now in your work or personal life?",
  "What patterns do you notice in your thoughts lately?",
  "How has your perspective on something important changed recently?",
]

export default function JournalPrompts() {
  const getRandomPrompt = () => {
    return prompts[Math.floor(Math.random() * prompts.length)]
  }

  const currentPrompt = getRandomPrompt()

  return (
    <NotionCard className="border-amber-200 dark:border-amber-800 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20">
      <NotionCardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-amber-500" />
            <NotionCardTitle>Journal Prompt</NotionCardTitle>
          </div>
          <Button variant="ghost" size="sm" className="gap-1">
            <RefreshCw className="w-3 h-3" />
            New
          </Button>
        </div>
      </NotionCardHeader>
      <NotionCardContent>
        <p className="text-foreground font-medium italic">
          "{currentPrompt}"
        </p>
        <Button variant="outline" size="sm" className="mt-3">
          Start Writing
        </Button>
      </NotionCardContent>
    </NotionCard>
  )
}