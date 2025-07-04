"use client"

import { useState } from 'react'
import { Brain, Search, Filter, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function MindPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const memories = [
    {
      content: "You felt productive after sketching Daksha idea",
      date: "2 hours ago",
      type: "insight",
      tags: ["productivity", "daksha"]
    },
    {
      content: "Excited about the potential of AI-powered journaling",
      date: "Yesterday",
      type: "emotion",
      tags: ["excitement", "ai", "journaling"]
    },
    {
      content: "Realized the importance of simplicity in UX design",
      date: "3 days ago",
      type: "learning",
      tags: ["ux", "design", "simplicity"]
    }
  ]

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Brain className="w-6 h-6 text-purple-500" />
          <h1 className="text-2xl font-serif font-semibold">Mind</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="notion" size="sm" className="gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
          <Button variant="notion" size="sm" className="gap-2">
            <Calendar className="w-4 h-4" />
            Timeline
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search your memories and insights..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 border-border/30"
        />
      </div>

      {/* Quick Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Most Frequent Theme</h3>
          <p className="text-sm text-blue-700 dark:text-blue-300">Product Development</p>
        </div>
        <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
          <h3 className="font-medium text-green-900 dark:text-green-100 mb-2">Mood Pattern</h3>
          <p className="text-sm text-green-700 dark:text-green-300">Productive Mornings</p>
        </div>
        <div className="p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200 dark:border-purple-800">
          <h3 className="font-medium text-purple-900 dark:text-purple-100 mb-2">Growth Area</h3>
          <p className="text-sm text-purple-700 dark:text-purple-300">UX Simplicity</p>
        </div>
      </div>

      {/* Memory Stream */}
      <div className="space-y-4">
        <h2 className="text-lg font-medium">Memory Stream</h2>
        <div className="space-y-3">
          {memories.map((memory, index) => (
            <div key={index} className="p-4 bg-background border border-border/30 rounded-lg hover:border-border/50 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <p className="text-foreground italic">"{memory.content}"</p>
                <span className="text-sm text-muted-foreground whitespace-nowrap ml-4">{memory.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  memory.type === 'insight' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' :
                  memory.type === 'emotion' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' :
                  'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300'
                }`}>
                  {memory.type}
                </span>
                {memory.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="text-xs px-2 py-1 bg-muted rounded-full text-muted-foreground">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}