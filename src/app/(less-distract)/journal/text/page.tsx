"use client"

import { useState, useRef, useEffect, useCallback } from 'react'
import { ArrowLeft, Save, Calendar, BookOpen, Clock, Focus, Menu, X, Minimize2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
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
  const [isFocusMode, setIsFocusMode] = useState(false)
  const [showMenuBar, setShowMenuBar] = useState(true)
  const titleRef = useRef<HTMLInputElement>(null)

  // Focus title on mount
  useEffect(() => {
    titleRef.current?.focus()
  }, [])

  const handleSave = useCallback(async () => {
    if (!title.trim()) {
      alert("Please enter a title for your journal entry")
      return
    }

    setIsSaving(true)
    try {
      // Get content from Plate editor (you'll need to implement this)
      const editorContent = ""; // TODO: Get from Plate editor
      const plainTextContent = title; // TODO: Extract plain text from editor

      const response = await fetch('/api/journal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title.trim(),
          content: editorContent,
          plainTextContent: plainTextContent,
          type: 'text',
          entryDate: new Date().toISOString(),
          generateAI: true
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to save journal entry')
      }

      const result = await response.json()
      console.log('Journal entry saved:', result)
      setLastSaved(new Date())

      // Optionally redirect to journal list
      // window.location.href = '/journal'
    } catch (error) {
      console.error('Save failed:', error)
      alert('Failed to save journal entry. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }, [title])

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Escape key to exit focus mode
      if (e.key === 'Escape' && isFocusMode) {
        setIsFocusMode(false)
      }
      // Ctrl/Cmd + S to save
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault()
        handleSave()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isFocusMode, handleSave])

  // Auto-save functionality
  useEffect(() => {
    const autoSave = setTimeout(() => {
      if (title) {
        handleSave()
      }
    }, 5000) // Auto-save every 5 seconds

    return () => clearTimeout(autoSave)
  }, [title, handleSave])

  const backgroundClass = ""
  // || isFocusMode 
  //   ? 'bg-background' 
  //   : 'bg-gradient-to-br from-muted/30 via-background to-accent/10'

  return (
    <div className={`min-h-screen text-foreground transition-all duration-300 ${backgroundClass}`}>
      {/* Header - Hidden in focus mode unless showMenuBar is true */}
      {(!isFocusMode || showMenuBar) && (
        <div className="sticky top-0 z-10   ">
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

                {/* Focus Mode Toggle */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsFocusMode(!isFocusMode)}
                  className="gap-2"
                >
                  {isFocusMode ? (
                    <>
                      <Minimize2 className="w-4 h-4" />
                      Exit Focus
                    </>
                  ) : (
                    <>
                      <Focus className="w-4 h-4" />
                      Focus Mode
                    </>
                  )}
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
      )}

      {/* Focus Mode Menu Bar Toggle */}
      {isFocusMode && !showMenuBar && (
        <div className="fixed top-4 right-4 z-20">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowMenuBar(true)}
            className="  backdrop-blur-sm shadow-lg"
          >
            <Menu className="w-4 h-4" />
          </Button>
        </div>
      )}

      {/* Focus Mode Menu Bar Close */}
      {isFocusMode && showMenuBar && (
        <div className="fixed top-4 right-4 z-20">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowMenuBar(false)}
            className="  backdrop-blur-sm shadow-lg"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}

      {/* Main Content */}
      <div className={`mx-auto px-4 transition-all duration-300 ${isFocusMode
          ? 'max-w-4xl py-4'
          : 'max-w-5xl py-8'
        }`}>
        <div className="space-y-6">
          {/* Title */}
          <div>
            <input
              ref={titleRef}
              type="text"
              placeholder="Give your entry a title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full font-bold bg-transparent border-none outline-none placeholder-gray-400 dark:placeholder-gray-600 focus:placeholder-gray-300 dark:focus:placeholder-gray-400 text-gray-900 dark:text-white transition-all duration-300 ${isFocusMode ? 'text-3xl' : 'text-4xl'
                }`}
            />
          </div>

          {/* Rich Text Editor */}
          <div className={`transition-all duration-300 ${isFocusMode
              ? 'rounded-none shadow-none min-h-[calc(100vh-200px)]'
              : ' min-h-[600px]'
            }`}>
            <PlateEditor />
          </div>
        </div>
      </div>

      {/* Focus Mode Keyboard Shortcuts Hint */}
      {isFocusMode && (
        <div className="fixed bottom-4 left-4 z-20">
          <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-lg rounded-lg p-3 text-xs text-muted-foreground">
            <div className="space-y-1">
              <div><kbd className="px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-xs">Ctrl+S</kbd> Save</div>
              <div><kbd className="px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-xs">Esc</kbd> Exit Focus</div>
            </div>
          </div>
        </div>
      )}

      <Toaster />
    </div>
  )
}
