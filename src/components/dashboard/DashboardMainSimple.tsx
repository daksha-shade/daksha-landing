"use client"

import { useState } from 'react'
import { 
  Brain, 
  Edit3,
  Send,
  CheckSquare,
  Square
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export default function DashboardMainSimple() {
  const [journalEntry, setJournalEntry] = useState("")
  const [dakshaInput, setDakshaInput] = useState("")

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      {/* Greeting */}
      <div className="space-y-2">
        <h1 className="text-2xl font-serif text-foreground">
          Hello, Shaswat
        </h1>
      </div>

      {/* Today's Plan */}
      <div className="space-y-4">
        <h2 className="text-lg font-medium flex items-center gap-2">
          Today's Plan
        </h2>
        <div className="space-y-3 pl-6">
          <div className="flex items-center gap-3">
            <Square className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">Add your intention for today</span>
          </div>
          <div className="flex items-center gap-3">
            <Square className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">Reflect on yesterday</span>
          </div>
          <Button variant="outline" className="gap-2 h-9">
            <Edit3 className="w-4 h-4" />
            Write Journal Entry
          </Button>
        </div>
      </div>

      {/* Recent Memory */}
      <div className="space-y-4">
        <h2 className="text-lg font-medium flex items-center gap-2">
          <Brain className="w-5 h-5" />
          Recent Memory
        </h2>
        <div className="pl-6">
          <p className="text-muted-foreground italic">
            "You felt productive after sketching Daksha idea."
          </p>
        </div>
      </div>

      {/* Ask Daksha */}
      <div className="space-y-4">
        <h2 className="text-lg font-medium flex items-center gap-2">
          Ask Daksha anything...
        </h2>
        <div className="pl-6">
          <div className="flex gap-2 max-w-md">
            <Input
              placeholder="What's on your mind?"
              value={dakshaInput}
              onChange={(e) => setDakshaInput(e.target.value)}
              className="flex-1 border-border/50 focus:border-border"
            />
            <Button size="icon" variant="outline">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Shortcuts */}
      <div className="border-t border-border/30 pt-6">
        <div className="flex items-center gap-6 text-sm">
          <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
            Journal
          </Button>
          <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
            Mind
          </Button>
          <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
            Goals
          </Button>
          <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
            Chat
          </Button>
        </div>
      </div>
    </div>
  )
}