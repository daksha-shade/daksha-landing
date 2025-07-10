"use client"

import { useState, useRef, useEffect } from 'react'
import { ArrowLeft, Save, Calendar, MessageCircle, Send, Sparkles, BookOpen, Clock } from 'lucide-react'
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
  const [aiQuestion, setAiQuestion] = useState("")
  const [aiResponse, setAiResponse] = useState("")
  const [isProcessingAI, setIsProcessingAI] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const titleRef = useRef<HTMLInputElement>(null)

  // Focus title on mount
  useEffect(() => {
    titleRef.current?.focus()
  }, [])

  // Update word count
  useEffect(() => {
    const words = content.trim().split(/\s+/).filter(word => word.length > 0)
    setWordCount(words.length)
  }, [content])

  const handleContentChange = (e: React.FormEvent<HTMLDivElement>) => {
    const text = e.currentTarget.textContent || ""
    setContent(text)
    setShowPlaceholder(text.length === 0)
    setIsTyping(true)
    
    // Stop typing indicator after 1 second
    setTimeout(() => setIsTyping(false), 1000)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Handle shortcuts
    if (e.metaKey || e.ctrlKey) {
      switch (e.key) {
        case 's':
          e.preventDefault()
          handleSave()
          break
        case 'b':
          e.preventDefault()
          document.execCommand('bold')
          break
        case 'i':
          e.preventDefault()
          document.execCommand('italic')
          break
      }
    }

    // Handle special formatting
    if (e.key === 'Enter') {
      const selection = window.getSelection()
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0)
        const line = range.startContainer.textContent || ""
        
        // Auto-format lists
        if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
          e.preventDefault()
          document.execCommand('insertHTML', false, '<br>- ')
        }
        // Auto-format numbered lists
        else if (/^\d+\.\s/.test(line.trim())) {
          e.preventDefault()
          const num = parseInt(line.trim().match(/^(\d+)/)?.[1] || '1') + 1
          document.execCommand('insertHTML', false, `<br>${num}. `)
        }
      }
    }
  }

  const insertBlock = (type: string) => {
    const editor = contentRef.current
    if (!editor) return

    editor.focus()

    switch (type) {
      case 'heading':
        document.execCommand('insertHTML', false, '<h2 style="font-size: 1.5rem; font-weight: 600; margin: 1rem 0 0.5rem 0;">Heading</h2>')
        break
      case 'bullet':
        document.execCommand('insertHTML', false, '<br>- ')
        break
      case 'number':
        document.execCommand('insertHTML', false, '<br>1. ')
        break
      case 'quote':
        document.execCommand('insertHTML', false, '<blockquote style="border-left: 3px solid #e5e7eb; padding-left: 1rem; margin: 1rem 0; font-style: italic; color: #6b7280;">Quote</blockquote>')
        break
    }
  }

  const handleSave = () => {
    console.log({ title, content, wordCount })
    window.location.href = '/journal'
  }

  const handleAIQuestion = async () => {
    if (!aiQuestion.trim()) return
    
    setIsProcessingAI(true)
    // Simulate AI processing
    setTimeout(() => {
      setAiResponse(`Based on your text entry about "${title}", here's my analysis: ${aiQuestion} - This is a simulated AI response. In a real implementation, this would analyze your text content and provide contextual insights and suggestions.`)
      setIsProcessingAI(false)
    }, 2000)
  }

  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  return (
    <div className="min-h-screen bg-background dark:bg-gray-950 flex flex-col">
      {/* Minimal Header */}
      <div className="flex items-center justify-between p-4 border-b border-border/10 bg-background/80 dark:bg-gray-950/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => window.location.href = '/journal'}
            className="gap-2 hover:bg-muted/50"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <div className="h-4 w-px bg-border/30" />
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-3 h-3" />
            {getCurrentDate()}
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
              Typing...
            </div>
          )}
          <span className="text-xs text-muted-foreground">
            {wordCount} {wordCount === 1 ? 'word' : 'words'}
          </span>
          <Button 
            onClick={handleSave} 
            size="sm" 
            className="gap-2"
            disabled={!title.trim() && !content.trim()}
          >
            <Save className="w-4 h-4" />
            Save
          </Button>
        </div>
      </div>

      {/* Floating Toolbar */}
      <div className="fixed left-1/2 -translate-x-1/2 top-20 z-20 bg-background/90 dark:bg-gray-900/90 backdrop-blur-sm border border-border/20 rounded-lg shadow-lg p-2 opacity-0 hover:opacity-100 transition-opacity duration-200">
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => insertBlock('heading')}
            className="h-8 w-8 p-0"
            title="Heading"
          >
            <Hash className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => document.execCommand('bold')}
            className="h-8 w-8 p-0"
            title="Bold (Cmd+B)"
          >
            <Bold className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => document.execCommand('italic')}
            className="h-8 w-8 p-0"
            title="Italic (Cmd+I)"
          >
            <Italic className="w-4 h-4" />
          </Button>
          <div className="w-px h-4 bg-border/30 mx-1" />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => insertBlock('bullet')}
            className="h-8 w-8 p-0"
            title="Bullet List"
          >
            <List className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => insertBlock('quote')}
            className="h-8 w-8 p-0"
            title="Quote"
          >
            <Quote className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Main Editor */}
      <div className="flex-1 max-w-4xl mx-auto w-full px-6 py-8">
        <div className="space-y-4">
          {/* Title */}
          <div className="relative">
            <input
              ref={titleRef}
              type="text"
              placeholder="Untitled"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-4xl font-bold bg-transparent border-0 outline-none placeholder:text-muted-foreground/40 text-foreground resize-none leading-tight"
              style={{ fontFamily: 'inherit' }}
            />
          </div>

          {/* Content Editor */}
          <div className="relative min-h-[600px]">
            <div
              ref={contentRef}
              contentEditable
              onInput={handleContentChange}
              onKeyDown={handleKeyDown}
              className="w-full min-h-[600px] text-lg leading-relaxed bg-transparent border-0 outline-none text-foreground"
              style={{ 
                fontFamily: 'inherit',
                lineHeight: '1.7'
              }}
              suppressContentEditableWarning={true}
            />
            
            {/* Placeholder */}
            {showPlaceholder && (
              <div 
                className="absolute top-0 left-0 text-lg text-muted-foreground/40 pointer-events-none leading-relaxed"
                style={{ lineHeight: '1.7' }}
              >
                Start writing your thoughts...
                <div className="text-sm mt-4 space-y-1">
                  <div>- Type "/" for commands</div>
                  <div>- Type "- " for bullet points</div>
                  <div>- Type "1. " for numbered lists</div>
                  <div>- Use Cmd+B for bold, Cmd+I for italic</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div className="border-t border-border/10 bg-muted/20 dark:bg-gray-900/20 px-6 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <span>Press Cmd+S to save</span>
            <span>-</span>
            <span>Last saved: Never</span>
          </div>
          <div className="flex items-center gap-4">
            <span>{content.length} characters</span>
            <span>-</span>
            <span>{wordCount} words</span>
          </div>

          {/* AI Chat Section */}
          {content.trim().length > 10 && (
            <div className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5" />
                    Ask AI about your text
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Ask something about your journal entry..."
                      value={aiQuestion}
                      onChange={(e) => setAiQuestion(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAIQuestion()}
                    />
                    <Button 
                      onClick={handleAIQuestion}
                      disabled={isProcessingAI || !aiQuestion.trim()}
                      size="sm"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  {aiResponse && (
                    <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                      <p className="text-sm leading-relaxed">{aiResponse}</p>
                    </div>
                  )}
                  
                  {isProcessingAI && (
                    <div className="p-4 bg-muted/20 rounded-lg">
                      <p className="text-sm text-muted-foreground">AI is analyzing your text...</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}