"use client"

import { useState } from 'react'
import { ArrowLeft, Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export default function TextJournalPage() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  const handleSave = () => {
    console.log({ title, content })
    window.location.href = '/journal'
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Minimal Header */}
      <div className="flex items-center justify-between p-4 border-b border-border/10">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => window.location.href = '/journal'}
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
        <Button onClick={handleSave} size="sm" className="gap-2">
          <Save className="w-4 h-4" />
          Save
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 max-w-4xl mx-auto w-full">
        <div className="space-y-6">
          <Input
            placeholder="Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-3xl font-light border-0 focus:ring-0 placeholder:text-muted-foreground/40"
          />
          
          <Textarea
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[500px] border-0 focus:ring-0 resize-none text-lg leading-relaxed placeholder:text-muted-foreground/40"
          />
        </div>
      </div>
    </div>
  )
}