"use client"

import { useState } from 'react'
import { Edit3, Save, Calendar, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export default function JournalPage() {
  const [entry, setEntry] = useState("")
  const [title, setTitle] = useState("")

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Edit3 className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-serif font-semibold">Journal</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="notion" size="sm" className="gap-2">
            <Search className="w-4 h-4" />
            Search
          </Button>
          <Button variant="notion" size="sm" className="gap-2">
            <Calendar className="w-4 h-4" />
            Today
          </Button>
        </div>
      </div>

      {/* New Entry */}
      <div className="bg-background border border-border/30 rounded-lg p-6 space-y-4">
        <Input
          placeholder="Entry title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-lg font-medium border-0 focus:ring-0 px-0"
        />
        <Textarea
          placeholder="What's on your mind today?"
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          className="min-h-[300px] border-0 focus:ring-0 resize-none text-base leading-relaxed px-0"
        />
        <div className="flex items-center justify-between pt-4 border-t border-border/30">
          <div className="text-sm text-muted-foreground">
            {entry.length} characters
          </div>
          <Button variant="notion" size="sm" className="gap-2">
            <Save className="w-4 h-4" />
            Save Entry
          </Button>
        </div>
      </div>

      {/* Recent Entries */}
      <div className="space-y-4">
        <h2 className="text-lg font-medium">Recent Entries</h2>
        <div className="space-y-3">
          {[
            { title: "Morning Reflections", date: "Today", preview: "Feeling energized about the Daksha project..." },
            { title: "YC Application Progress", date: "Yesterday", preview: "Made significant progress on the application..." },
            { title: "Weekend Planning", date: "2 days ago", preview: "Thinking about how to structure my weekend..." }
          ].map((entry, index) => (
            <div key={index} className="p-4 bg-muted/20 rounded-lg hover:bg-muted/30 cursor-pointer transition-colors">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-medium">{entry.title}</h3>
                <span className="text-sm text-muted-foreground">{entry.date}</span>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">{entry.preview}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}