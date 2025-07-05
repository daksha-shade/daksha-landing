"use client"

import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, ArrowLeft, MessageCircle, Zap, Plus, Edit3, Activity, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

type Message = {
  id: number
  sender: 'user' | 'bot'
  content: string
  timestamp: Date
}

type QuickPrompt = {
  id: string
  title: string
  prompt: string
  category: 'reflection' | 'analysis' | 'planning' | 'creative'
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'bot',
      content: "Hello! I'm Daksha, your AI companion. I'm here to help you reflect, explore your thoughts, and gain insights from your journaling. What would you like to talk about today?",
      timestamp: new Date(Date.now() - 1000 * 60 * 5)
    },
    {
      id: 2,
      sender: 'user',
      content: "I've been feeling overwhelmed with my startup journey lately. Can you help me process these feelings?",
      timestamp: new Date(Date.now() - 1000 * 60 * 3)
    },
    {
      id: 3,
      sender: 'bot',
      content: "I understand that feeling overwhelmed is a common experience for entrepreneurs. Let's break this down together. What specific aspects of your startup journey are contributing most to this feeling?",
      timestamp: new Date(Date.now() - 1000 * 60 * 2)
    }
  ])
  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const quickPrompts: QuickPrompt[] = [
    { id: '1', title: 'Daily Reflection', prompt: 'Help me reflect on my day and identify key insights', category: 'reflection' },
    { id: '2', title: 'Goal Analysis', prompt: 'Analyze my progress towards my current goals', category: 'analysis' },
    { id: '3', title: 'Decision Making', prompt: 'Help me think through this important decision', category: 'planning' },
    { id: '4', title: 'Mood Patterns', prompt: 'What patterns do you see in my recent mood entries?', category: 'analysis' },
    { id: '5', title: 'Creative Brainstorm', prompt: 'Let\'s brainstorm creative solutions to my current challenge', category: 'creative' },
    { id: '6', title: 'Weekly Planning', prompt: 'Help me plan and prioritize my upcoming week', category: 'planning' },
  ]

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      const userMessage: Message = {
        id: messages.length + 1,
        sender: 'user',
        content: newMessage,
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, userMessage])
      setNewMessage("")
      setIsTyping(true)

      // Simulate bot response
      setTimeout(() => {
        const botMessage: Message = {
          id: messages.length + 2,
          sender: 'bot',
          content: "I understand what you're going through. Let me help you explore this further and provide some insights based on your thoughts.",
          timestamp: new Date()
        }
        setMessages(prev => [...prev, botMessage])
        setIsTyping(false)
      }, 2000)
    }
  }

  const handleQuickPrompt = (prompt: QuickPrompt) => {
    const userMessage: Message = {
      id: messages.length + 1,
      sender: 'user',
      content: prompt.prompt,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMessage])
    setIsTyping(true)

    setTimeout(() => {
      const botMessage: Message = {
        id: messages.length + 2,
        sender: 'bot',
        content: `Great question! Let me analyze your ${prompt.category} patterns and provide insights...`,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 2000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const getCategoryColor = (category: QuickPrompt['category']) => {
    switch (category) {
      case 'reflection': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
      case 'analysis': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300'
      case 'planning': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
      case 'creative': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300'
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300'
    }
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-8 space-y-8">
      {/* Header Section - Notion Style */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/apps"
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-primary hover:bg-accent transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-accent/50 flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="notion-title font-serif text-foreground text-3xl">
                  Chat with Daksha
                </h1>
                <p className="text-muted-foreground mt-1">
                  Your AI companion for reflection and insights
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="gap-2">
              <Activity className="w-3 h-3" />
              Online
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Quick Prompts Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="animate-in slide-in-from-left-4 fade-in duration-500 delay-150">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                Quick Prompts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt.id}
                  onClick={() => handleQuickPrompt(prompt)}
                  className="w-full text-left p-3 rounded-lg bg-accent/30 hover:bg-accent/50 border border-dashed border-border hover:border-solid transition-all group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{prompt.title}</span>
                    <Badge variant="secondary" className={`text-xs ${getCategoryColor(prompt.category)}`}>
                      {prompt.category}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2 group-hover:text-foreground transition-colors">
                    {prompt.prompt}
                  </p>
                </button>
              ))}
              <Button className="w-full gap-2" variant="outline">
                <Plus className="w-4 h-4" />
                Add Custom Prompt
              </Button>
            </CardContent>
          </Card>
 
        </div>

        {/* Main Chat Area */}
        <div className="lg:col-span-3">
          <Card className="h-[700px] flex flex-col animate-in slide-in-from-bottom-4 fade-in duration-500">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Bot className="w-5 h-5 text-primary" />
                  Conversation
                </CardTitle>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Edit3 className="w-4 h-4" />
                  Clear Chat
                </Button>
              </div>
            </CardHeader>
            
            {/* Messages Area */}
            <CardContent className="flex-1 overflow-y-auto space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.sender === 'bot' && (
                    <Avatar className="w-10 h-10 flex-shrink-0">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        <Bot className="w-5 h-5" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  
                  <div
                    className={`max-w-[80%] rounded-lg p-4 ${
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-accent/50'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    <p className="text-xs opacity-70 mt-2">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>

                  {message.sender === 'user' && (
                    <Avatar className="w-10 h-10 flex-shrink-0">
                      <AvatarFallback>
                        <User className="w-5 h-5" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex gap-4 justify-start">
                  <Avatar className="w-10 h-10 flex-shrink-0">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      <Bot className="w-5 h-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-accent/50 rounded-lg p-4">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </CardContent>

            {/* Input Area */}
            <div className="border-t border-border/20 p-6">
              <div className="flex gap-3">
                <Input
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                  disabled={isTyping}
                />
                <Button 
                  onClick={handleSendMessage} 
                  disabled={!newMessage.trim() || isTyping}
                  className="px-6"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}