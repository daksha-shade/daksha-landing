"use client"

import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Mic, Paperclip, ArrowLeft, Zap, Activity, Clock, CheckCircle, AlertCircle, Loader } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

type ProcessStep = {
  id: string
  name: string
  status: 'pending' | 'running' | 'completed' | 'error'
  timestamp: Date
  details?: string
}

type QuickPrompt = {
  id: string
  title: string
  prompt: string
  category: 'reflection' | 'analysis' | 'planning' | 'creative'
}

export default function ChatPage() {
  const [messages, setMessages] = useState([
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
      content: "I understand that feeling overwhelmed is a common experience for entrepreneurs. Let's break this down together. What specific aspects of your startup journey are contributing most to this feeling? Is it the uncertainty, the workload, or perhaps the pressure to succeed?",
      timestamp: new Date(Date.now() - 1000 * 60 * 2)
    },
    {
      id: 4,
      sender: 'user',
      content: "It's mainly the uncertainty. I'm not sure if I'm making the right decisions, and every choice feels like it could make or break everything.",
      timestamp: new Date(Date.now() - 1000 * 60 * 1)
    },
    {
      id: 5,
      sender: 'bot',
      content: "That's a fascinating perspective! Let me help you explore that thought further. Based on your recent journal entries, I can see some patterns emerging...",
      timestamp: new Date()
    }
  ])
  const [newMessage, setNewMessage] = useState("")
  const [currentProcesses, setCurrentProcesses] = useState<ProcessStep[]>([])
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

  const simulateProcess = (userMessage: string) => {
    const processes: ProcessStep[] = [
      { id: '1', name: 'Processing user input', status: 'running', timestamp: new Date(), details: 'Analyzing message content and intent' },
      { id: '2', name: 'Accessing journal entries', status: 'pending', timestamp: new Date(), details: 'Retrieving relevant past entries' },
      { id: '3', name: 'Analyzing patterns', status: 'pending', timestamp: new Date(), details: 'Identifying emotional and behavioral patterns' },
      { id: '4', name: 'Generating insights', status: 'pending', timestamp: new Date(), details: 'Creating personalized response' },
      { id: '5', name: 'Finalizing response', status: 'pending', timestamp: new Date(), details: 'Optimizing for clarity and helpfulness' }
    ]

    setCurrentProcesses(processes)

    // Simulate process completion
    processes.forEach((process, index) => {
      setTimeout(() => {
        setCurrentProcesses(prev => prev.map(p =>
          p.id === process.id ? { ...p, status: 'completed' } : p
        ))

        if (index < processes.length - 1) {
          setTimeout(() => {
            setCurrentProcesses(prev => prev.map(p =>
              p.id === processes[index + 1].id ? { ...p, status: 'running' } : p
            ))
          }, 200)
        }
      }, (index + 1) * 1000)
    })

    // Clear processes after completion
    setTimeout(() => {
      setCurrentProcesses([])
    }, (processes.length + 2) * 1000)
  }

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const userMessage = {
        id: messages.length + 1,
        sender: 'user' as const,
        content: newMessage,
        timestamp: new Date()
      }
      setMessages([...messages, userMessage])
      simulateProcess(newMessage)
      setNewMessage("")

      // Simulate bot response
      setTimeout(() => {
        const botMessage = {
          id: messages.length + 2,
          sender: 'bot' as const,
          content: "I understand what you're going through. Let me help you explore this further...",
          timestamp: new Date()
        }
        setMessages(prev => [...prev, botMessage])
      }, 5000)
    }
  }

  const handleQuickPrompt = (prompt: QuickPrompt) => {
    const userMessage = {
      id: messages.length + 1,
      sender: 'user' as const,
      content: prompt.prompt,
      timestamp: new Date()
    }
    setMessages([...messages, userMessage])
    simulateProcess(prompt.prompt)

    setTimeout(() => {
      const botMessage = {
        id: messages.length + 2,
        sender: 'bot' as const,
        content: `Great question! Let me analyze your ${prompt.category} patterns and provide insights...`,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botMessage])
    }, 5000)
  }

  const getProcessIcon = (status: ProcessStep['status']) => {
    switch (status) {
      case 'running': return <Loader className="w-3 h-3 animate-spin text-blue-500" />
      case 'completed': return <CheckCircle className="w-3 h-3 text-green-500" />
      case 'error': return <AlertCircle className="w-3 h-3 text-red-500" />
      default: return <Clock className="w-3 h-3 text-gray-400" />
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
    <div className="fixed inset-0 bg-background flex flex-row-reverse">
      {/* Technical Sidebar */}
      <div className="w-80 border-r border-border/20 bg-muted/10 dark:bg-gray-950/50 flex flex-col">
        {/* Sidebar Header */}
        <div className="p-4 border-b border-border/20">
          <div className="flex items-center gap-2 mb-3">
            <Link
              href="/apps"
              className="flex items-center gap-2 px-2 py-1 rounded-md text-sm font-medium text-muted-foreground hover:text-primary hover:bg-accent transition-colors group"
            >
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-accent group-hover:bg-primary/10 transition-colors">
                <ArrowLeft className="w-4 h-4 text-primary" />
              </span>
              <span className="hidden sm:inline">Back</span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" />
            <h2 className="font-semibold">AI Agent Console</h2>
          </div>
        </div>

        {/* Quick Prompts Section */}
        <div className="p-4 border-b border-border/20">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4 text-yellow-500" />
            <h3 className="font-medium text-sm">Quick Prompts</h3>
          </div>
          <div className="space-y-2">
            {quickPrompts.map((prompt) => (
              <button
                key={prompt.id}
                onClick={() => handleQuickPrompt(prompt)}
                className="w-full text-left p-2 rounded-lg bg-background/50 hover:bg-background border border-border/30 hover:border-border/50 transition-all group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium">{prompt.title}</span>
                  <Badge variant="secondary" className={`text-xs ${getCategoryColor(prompt.category)}`}>
                    {prompt.category}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2 group-hover:text-foreground transition-colors">
                  {prompt.prompt}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Process Timeline */}
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="flex items-center gap-2 mb-3">
            <Activity className="w-4 h-4 text-blue-500" />
            <h3 className="font-medium text-sm">Process Timeline</h3>
          </div>

          {currentProcesses.length > 0 ? (
            <div className="space-y-3">
              {currentProcesses.map((process, index) => (
                <div key={process.id} className="relative">
                  {index < currentProcesses.length - 1 && (
                    <div className="absolute left-2 top-6 w-px h-8 bg-border/30" />
                  )}
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      {getProcessIcon(process.status)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium">{process.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {process.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                        </span>
                      </div>
                      {process.details && (
                        <p className="text-xs text-muted-foreground">{process.details}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Activity className="w-8 h-8 text-muted-foreground/50 mx-auto mb-2" />
              <p className="text-xs text-muted-foreground">No active processes</p>
              <p className="text-xs text-muted-foreground/70">Send a message to see AI processing</p>
            </div>
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b border-border/20 bg-background/80 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarFallback className="bg-primary text-primary-foreground">
                <Bot className="w-5 h-5" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-semibold">Daksha AI Agent</h1>
              <p className="text-sm text-muted-foreground">Your personal AI companion</p>
            </div>
          </div>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.sender === 'bot' && (
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <Bot className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={`max-w-[70%] rounded-lg p-3 ${message.sender === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                  }`}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
                <p className="text-xs opacity-70 mt-2">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              {message.sender === 'user' && (
                <Avatar className="w-8 h-8">
                  <AvatarFallback>
                    <User className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-border/20 p-4 bg-background/80 backdrop-blur-sm">
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="flex-shrink-0">
              <Paperclip className="w-4 h-4" />
            </Button>
            <Input
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1"
            />
            <Button variant="ghost" size="icon" className="flex-shrink-0">
              <Mic className="w-4 h-4" />
            </Button>
            <Button onClick={handleSendMessage} size="icon" className="flex-shrink-0">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}