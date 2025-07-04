"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { NotionCard, NotionCardContent, NotionCardHeader, NotionCardTitle } from '@/components/ui/notion-card'

const moods = [
  { emoji: '😊', label: 'Happy', color: 'text-yellow-500' },
  { emoji: '😌', label: 'Calm', color: 'text-blue-500' },
  { emoji: '🤔', label: 'Thoughtful', color: 'text-purple-500' },
  { emoji: '😴', label: 'Tired', color: 'text-gray-500' },
  { emoji: '😤', label: 'Frustrated', color: 'text-red-500' },
  { emoji: '🚀', label: 'Energized', color: 'text-green-500' },
  { emoji: '😰', label: 'Anxious', color: 'text-orange-500' },
  { emoji: '🎯', label: 'Focused', color: 'text-indigo-500' },
]

export default function MoodSelector() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null)

  return (
    <NotionCard className="mb-6">
      <NotionCardHeader>
        <NotionCardTitle className="text-lg">How are you feeling today?</NotionCardTitle>
      </NotionCardHeader>
      <NotionCardContent>
        <div className="grid grid-cols-4 gap-3">
          {moods.map((mood, index) => (
            <Button
              key={index}
              variant={selectedMood === mood.label ? "default" : "outline"}
              className="h-16 flex-col gap-1 transition-all hover:scale-105"
              onClick={() => setSelectedMood(mood.label)}
            >
              <span className="text-2xl">{mood.emoji}</span>
              <span className="text-xs">{mood.label}</span>
            </Button>
          ))}
        </div>
        {selectedMood && (
          <div className="mt-4 p-3 bg-muted/30 rounded-lg">
            <p className="text-sm text-muted-foreground">
              Thanks for sharing! I'll keep this in mind for today's suggestions and reflections.
            </p>
          </div>
        )}
      </NotionCardContent>
    </NotionCard>
  )
}