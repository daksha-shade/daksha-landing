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

  const askAI = async () => {
    if (!aiQuestion.trim()) return
    
    setIsProcessingAI(true)
    try {
      const response = await fetch('/api/daksha/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `Journal writing help: ${aiQuestion}`,
          conversationHistory: []
        })
      })
      
      const data = await response.json()
      setAiResponse(data.response)
    } catch (error) {
      console.error('AI request failed:', error)
      setAiResponse("Sorry, I'm having trouble connecting right now.")
    } finally {
      setIsProcessingAI(false)
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
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Editor Section */}
          <div className="lg:col-span-3 space-y-6">
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

          {/* AI Assistant Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Sparkles className="w-5 h-5 text-purple-500" />
                  Writing Assistant
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Ask Daksha for help:</label>
                  <textarea
                    placeholder="e.g., Help me reflect on my day, suggest journal prompts, or improve my writing..."
                    value={aiQuestion}
                    onChange={(e) => setAiQuestion(e.target.value)}
                    className="w-full h-20 p-3 text-sm border rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <Button 
                    onClick={askAI}
                    disabled={!aiQuestion.trim() || isProcessingAI}
                    className="w-full gap-2"
                    size="sm"
                  >
                    {isProcessingAI ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Thinking...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Ask Daksha
                      </>
                    )}
                  </Button>
                </div>

                {aiResponse && (
                  <div className="p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200 dark:border-purple-800">
                    <div className="flex items-center gap-2 mb-2">
                      <MessageCircle className="w-4 h-4 text-purple-600" />
                      <span className="text-sm font-medium text-purple-800 dark:text-purple-200">Daksha's Response</span>
                    </div>
                    <p className="text-sm text-purple-700 dark:text-purple-300">{aiResponse}</p>
                  </div>
                )}

                {/* Quick Prompts */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Quick Prompts:</label>
                  <div className="space-y-1">
                    {[
                      "What am I grateful for today?",
                      "What challenged me today?",
                      "What did I learn?",
                      "How am I feeling right now?",
                      "What are my goals for tomorrow?"
                    ].map((prompt, index) => (
                      <button
                        key={index}
                        onClick={() => setAiQuestion(prompt)}
                        className="w-full text-left text-xs p-2 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded border transition-colors"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Writing Tips */}
                <div className="pt-4 border-t space-y-2">
                  <div className="text-sm font-medium">Writing Tips</div>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <div>• Use <strong>**bold**</strong> for emphasis</div>
                    <div>• Use <em>*italic*</em> for thoughts</div>
                    <div>• Use <code>`code`</code> for quotes</div>
                    <div>• Use # for headings</div>
                    <div>• Use > for blockquotes</div>
                    <div>• Use - for bullet lists</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Toaster />
    </div>
  )
}