"use client"

import { useState, useRef, useEffect } from 'react'
import { ArrowLeft, Save, Calendar, BookOpen, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/badge'
import { PlateEditor } from '@/components/editor/plate-editor'
import { Toaster } from 'sonner'
import Link from 'next/link'

export default function JournalTextEditor() {
  const [title, setTitle] = useState("")
  const [wordCount, setWordCount] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const titleRef = useRef<HTMLInputElement>(null)

  // Focus title on mount
  useEffect(() => {
    titleRef.current?.focus()
  }, [])

  // Auto-save functionality
  useEffect(() => {
    const autoSave = setTimeout(() => {
      if (title) {
        handleSave()
      }
    }, 5000) // Auto-save every 5 seconds

    return () => clearTimeout(autoSave)
  }, [title])

  const handleSave = async () => {
    setIsSaving(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Saving:', { title })
      setLastSaved(new Date())
      // Here you would typically save to your backend
    } catch (error) {
      console.error('Save failed:', error)
    } finally {
      setIsSaving(false)
    }
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/journal">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Journal
                </Button>
              </Link>
              
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="gap-1">
                  <BookOpen className="w-3 h-3" />
                  Rich Text Entry
                </Badge>
                
                <div className="text-sm text-muted-foreground">
                  {isTyping ? (
                    <span className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      Typing...
                    </span>
                  ) : (
                    `${wordCount} words`
                  )}
                </div>
                
                {lastSaved && (
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Saved {lastSaved.toLocaleTimeString()}
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="gap-2">
                <Calendar className="w-4 h-4" />
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'short', 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </Button>
              
              <Button 
                onClick={handleSave} 
                disabled={isSaving}
                className="gap-2"
              >
                <Save className="w-4 h-4" />
                {isSaving ? 'Saving...' : 'Save Entry'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Title */}
          <div>
            <input
              ref={titleRef}
              type="text"
              placeholder="Give your entry a title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-4xl font-bold bg-transparent border-none outline-none placeholder-gray-400 dark:placeholder-gray-600 focus:placeholder-gray-300"
            />
          </div>

          {/* Rich Text Editor */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border min-h-[600px]">
            <PlateEditor />
          </div>
        </div>
      </div>

      <Toaster />
    </div>
  )
}