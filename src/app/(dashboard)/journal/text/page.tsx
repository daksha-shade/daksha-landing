"use client"

import { useState } from 'react'
import { ArrowLeft, Save, Smile, Tag, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

export default function TextJournalPage() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [mood, setMood] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")

  const moods = [
    { emoji: "😊", label: "Happy", value: "happy" },
    { emoji: "😔", label: "Sad", value: "sad" },
    { emoji: "😤", label: "Frustrated", value: "frustrated" },
    { emoji: "😌", label: "Peaceful", value: "peaceful" },
    { emoji: "🤔", label: "Thoughtful", value: "thoughtful" },
    { emoji: "😴", label: "Tired", value: "tired" },
    { emoji: "🎉", label: "Excited", value: "excited" },
    { emoji: "😰", label: "Anxious", value: "anxious" },
  ]

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  const handleSave = () => {
    // Save logic would go here
    console.log({ title, content, mood, tags })
    // Redirect back to journal
    window.location.href = '/journal'
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-background/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/journal">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </Button>
              </Link>
              <div className="h-4 w-px bg-border" />
              <h1 className="font-medium">Text Journal</h1>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {content.length} characters
              </span>
              <Button onClick={handleSave} className="gap-2">
                <Save className="w-4 h-4" />
                Save Entry
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="space-y-8">
          {/* Title */}
          <div>
            <Input
              placeholder="Give your entry a title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-2xl font-medium border-0 focus:ring-0 px-0 placeholder:text-muted-foreground/60"
            />
          </div>

          {/* Content */}
          <div>
            <Textarea
              placeholder="What's on your mind today? Let your thoughts flow..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[400px] border-0 focus:ring-0 resize-none text-base leading-relaxed px-0 placeholder:text-muted-foreground/60"
            />
          </div>

          {/* Mood Selection */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Smile className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">How are you feeling?</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {moods.map((moodOption) => (
                <Button
                  key={moodOption.value}
                  variant={mood === moodOption.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setMood(mood === moodOption.value ? "" : moodOption.value)}
                  className="gap-2"
                >
                  <span>{moodOption.emoji}</span>
                  {moodOption.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">Add tags</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="gap-1">
                  #{tag}
                  <button
                    onClick={() => removeTag(tag)}
                    className="ml-1 hover:text-destructive"
                  >
                    ×
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Add a tag..."
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTag()}
                className="max-w-xs"
              />
              <Button variant="outline" size="sm" onClick={addTag}>
                Add
              </Button>
            </div>
          </div>

          {/* Date */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>{new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
          </div>
        </div>
      </div>
    </div>
  )
}