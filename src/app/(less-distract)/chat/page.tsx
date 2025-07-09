"use client"

import { useState, useRef, useEffect } from 'react'
import { 
  Send, 
  Bot, 
  User, 
  Mic, 
  Paperclip, 
  ArrowLeft, 
  Zap, 
  Brain,
  Activity, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Loader,
  Settings,
  MoreVertical,
  Copy,
  RefreshCw,
  Star,
  Eye,
  EyeOff,
  Cpu,
  Database,
  TrendingUp,
  Sparkles,
  Target,
  PenTool,
  Search,
  Heart,
  Lightbulb,
  Network,
  Calendar
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import Link from 'next/link'

interface Message {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
  type?: 'text' | 'code' | 'analysis' | 'suggestion' | 'task'
  metadata?: {
    thinking?: string
    sources?: string[]
    confidence?: number
    processingTime?: number
    tokens?: number
  }
  attachments?: Array<{
    type: 'image' | 'file' | 'audio' | 'video'
    name: string
    url: string
    size?: number
  }>
}

interface AgentCapability {
  id: string
  name: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  enabled: boolean
  category: 'analysis' | 'creation' | 'automation' | 'research' | 'personal'
}

interface ProcessingStep {
  id: string
  name: string
  status: 'pending' | 'running' | 'completed' | 'error'
  progress: number
  details?: string
}

const agentCapabilities: AgentCapability[] = [
  {
    id: 'deep-analysis',
    name: 'Deep Analysis',
    description: 'Analyze patterns in your journal entries and provide insights',
    icon: Brain,
    enabled: true,
    category: 'analysis'
  },
  {
    id: 'goal-tracking',
    name: 'Goal Tracking',
    description: 'Monitor progress and suggest optimizations',
    icon: Target,
    enabled: true,
    category: 'personal'
  },
  {
    id: 'content-creation',
    name: 'Content Creation',
    description: 'Generate articles, emails, and creative content',
    icon: PenTool,
    enabled: true,
    category: 'creation'
  },
  {
    id: 'research-assistant',
    name: 'Research Assistant',
    description: 'Find information and synthesize knowledge',
    icon: Search,
    enabled: true,
    category: 'research'
  },
  {
    id: 'task-automation',
    name: 'Task Automation',
    description: 'Automate repetitive tasks and workflows',
    icon: Zap,
    enabled: false,
    category: 'automation'
  },
  {
    id: 'mood-analysis',
    name: 'Mood Analysis',
    description: 'Track emotional patterns and well-being',
    icon: Heart,
    enabled: true,
    category: 'analysis'
  },
  {
    id: 'memory-palace',
    name: 'Memory Palace',
    description: 'Organize and connect your memories intelligently',
    icon: Database,
    enabled: true,
    category: 'personal'
  },
  {
    id: 'creative-brainstorm',
    name: 'Creative Brainstorming',
    description: 'Generate ideas and creative solutions',
    icon: Lightbulb,
    enabled: true,
    category: 'creation'
  }
]

const quickPrompts = [
  {
    id: '1',
    title: 'Analyze my week',
    prompt: 'Analyze my journal entries from this week and provide insights about my mood, productivity, and patterns.',
    category: 'analysis',
    icon: TrendingUp
  },
  {
    id: '2',
    title: 'Goal progress review',
    prompt: 'Review my current goals and analyze my progress. What should I focus on next?',
    category: 'planning',
    icon: Target
  },
  {
    id: '3',
    title: 'Creative writing prompt',
    prompt: 'Give me a creative writing prompt based on my recent experiences and interests.',
    category: 'creative',
    icon: PenTool
  },
  {
    id: '4',
    title: 'Mood insights',
    prompt: 'What patterns do you notice in my emotional state lately? Any recommendations?',
    category: 'reflection',
    icon: Heart
  },
  {
    id: '5',
    title: 'Memory connections',
    prompt: 'Help me find interesting connections between my recent memories and past experiences.',
    category: 'analysis',
    icon: Network
  },
  {
    id: '6',
    title: 'Tomorrow planning',
    prompt: 'Based on my goals and recent activities, help me plan an optimal tomorrow.',
    category: 'planning',
    icon: Calendar
  }
]

export default function AdvancedChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm Daksha, your advanced AI companion. I have access to your journal entries, goals, memories, and preferences. I can help you with deep analysis, creative tasks, research, and personal insights. What would you like to explore today?",
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      type: 'text',
      metadata: {
        confidence: 100,
        processingTime: 0.1
      }
    }
  ])
  
  const [inputMessage, setInputMessage] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [processingSteps, setProcessingSteps] = useState<ProcessingStep[]>([])
  const [showThinking, setShowThinking] = useState(true)
  const [selectedCapabilities, setSelectedCapabilities] = useState<string[]>(
    agentCapabilities.filter(cap => cap.enabled).map(cap => cap.id)
  )
  
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const simulateProcessing = async () => {
    const steps: ProcessingStep[] = [
      { id: '1', name: 'Understanding context', status: 'pending', progress: 0 },
      { id: '2', name: 'Analyzing journal data', status: 'pending', progress: 0 },
      { id: '3', name: 'Connecting memories', status: 'pending', progress: 0 },
      { id: '4', name: 'Generating insights', status: 'pending', progress: 0 },
      { id: '5', name: 'Crafting response', status: 'pending', progress: 0 }
    ]
    
    setProcessingSteps(steps)
    
    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800))
      
      setProcessingSteps(prev => prev.map((step, index) => {
        if (index === i) {
          return { ...step, status: 'running', progress: 50 }
        }
        return step
      }))
      
      await new Promise(resolve => setTimeout(resolve, 600))
      
      setProcessingSteps(prev => prev.map((step, index) => {
        if (index === i) {
          return { ...step, status: 'completed', progress: 100 }
        }
        return step
      }))
    }
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date(),
      type: 'text'
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsProcessing(true)

    // Simulate processing
    await simulateProcessing()

    // Generate AI response
    const aiResponse: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: generateAIResponse(inputMessage),
      timestamp: new Date(),
      type: 'analysis',
      metadata: {
        thinking: "I'm analyzing your request in the context of your recent journal entries and goals. Let me provide a comprehensive response based on your personal data.",
        sources: ['Journal entries (last 7 days)', 'Goal tracking data', 'Memory vault', 'Custom context'],
        confidence: 92,
        processingTime: 2.3,
        tokens: 156
      }
    }

    setMessages(prev => [...prev, aiResponse])
    setIsProcessing(false)
    setProcessingSteps([])
  }

  const generateAIResponse = (userInput: string): string => {
    // This would be replaced with actual AI integration
    const responses = [
      `Based on your recent journal entries, I notice you've been focused on ${userInput.toLowerCase()}. Here are some insights I've gathered from analyzing your patterns over the past week:

**Key Observations:**
• Your productivity peaks around 10 AM based on your activity logs
• You've mentioned feeling more creative after your morning walks
• Your goal progress shows 73% completion on your main objectives

**Personalized Recommendations:**
1. Schedule important tasks during your peak hours (9-11 AM)
2. Continue your morning routine - it's clearly benefiting your mindset
3. Consider breaking down your remaining goals into smaller, actionable steps

**Memory Connections:**
I found similar themes in your entries from last month when you achieved significant progress. The pattern suggests you work best with structured morning routines and clear daily intentions.

Would you like me to dive deeper into any of these insights or help you create an action plan?`,

      `I've analyzed your request through the lens of your personal context and recent activities. Here's what I found:

**Context Analysis:**
Your custom context indicates you're a 20-year-old software engineer passionate about AI and product development. This aligns perfectly with your recent journal themes about building meaningful projects.

**Relevant Insights:**
• Your WriteFlow usage shows you're most creative when writing about technical topics
• Your goal tracking indicates strong progress on learning objectives
• Recent memories suggest you're energized by collaborative projects

**Tailored Suggestions:**
Given your background and current focus, I recommend exploring the intersection of your technical skills with your journaling practice. Perhaps consider building a personal project that combines both interests?

**Next Steps:**
1. Document your current project ideas in your journal
2. Set specific learning goals for the next month
3. Connect with others in your field who share similar interests

How does this resonate with your current thinking?`
    ]

    return responses[Math.floor(Math.random() * responses.length)]
  }

  const handleQuickPrompt = (prompt: string) => {
    setInputMessage(prompt)
    inputRef.current?.focus()
  }

  const toggleCapability = (capabilityId: string) => {
    setSelectedCapabilities(prev => 
      prev.includes(capabilityId) 
        ? prev.filter(id => id !== capabilityId)
        : [...prev, capabilityId]
    )
  }

  const renderMessage = (message: Message) => {
    const isUser = message.role === 'user'
    
    return (
      <div key={message.id} className={cn("flex gap-3 mb-6", isUser ? "justify-end" : "justify-start")}>
        {!isUser && (
          <Avatar className="w-8 h-8 mt-1">
            <AvatarImage src="/daksha-avatar.png" />
            <AvatarFallback className="bg-primary text-primary-foreground">
              <Bot className="w-4 h-4" />
            </AvatarFallback>
          </Avatar>
        )}
        
        <div className={cn("max-w-[80%] space-y-2", isUser ? "items-end" : "items-start")}>
          <div className={cn(
            "rounded-2xl px-4 py-3 text-sm",
            isUser 
              ? "bg-primary text-primary-foreground ml-auto" 
              : "bg-muted"
          )}>
            <div className="whitespace-pre-wrap">{message.content}</div>
            
            {message.attachments && message.attachments.length > 0 && (
              <div className="mt-2 space-y-1">
                {message.attachments.map((attachment, index) => (
                  <div key={index} className="flex items-center gap-2 text-xs opacity-80">
                    <Paperclip className="w-3 h-3" />
                    <span>{attachment.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>{message.timestamp.toLocaleTimeString()}</span>
            
            {message.metadata && !isUser && (
              <>
                <Separator orientation="vertical" className="h-3" />
                <div className="flex items-center gap-1">
                  <Cpu className="w-3 h-3" />
                  <span>{message.metadata.processingTime}s</span>
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  <span>{message.metadata.confidence}%</span>
                </div>
                {showThinking && message.metadata.thinking && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-5 px-1 text-xs"
                    onClick={() => {/* Show thinking process */}}
                  >
                    <Eye className="w-3 h-3 mr-1" />
                    Thinking
                  </Button>
                )}
              </>
            )}
            
            {!isUser && (
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="sm" className="h-5 w-5 p-0">
                  <Copy className="w-3 h-3" />
                </Button>
                <Button variant="ghost" size="sm" className="h-5 w-5 p-0">
                  <Star className="w-3 h-3" />
                </Button>
                <Button variant="ghost" size="sm" className="h-5 w-5 p-0">
                  <RefreshCw className="w-3 h-3" />
                </Button>
              </div>
            )}
          </div>
          
          {message.metadata?.sources && showThinking && (
            <div className="text-xs text-muted-foreground bg-muted/50 rounded-lg p-2 mt-2">
              <div className="font-medium mb-1">Sources:</div>
              <ul className="space-y-0.5">
                {message.metadata.sources.map((source, index) => (
                  <li key={index} className="flex items-center gap-1">
                    <Database className="w-3 h-3" />
                    {source}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        {isUser && (
          <Avatar className="w-8 h-8 mt-1">
            <AvatarFallback className="bg-secondary">
              <User className="w-4 h-4" />
            </AvatarFallback>
          </Avatar>
        )}
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-80 border-r border-border flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <Link href="/app">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
            </Link>
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-semibold">Daksha AI</h2>
              <p className="text-xs text-muted-foreground">Advanced AI Agent</p>
            </div>
          </div>
        </div>

        {/* Agent Status */}
        <div className="p-4 border-b border-border">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Agent Status</span>
              <Badge variant="secondary" className="gap-1">
                <Activity className="w-3 h-3" />
                Active
              </Badge>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span>Context Loaded</span>
                <span className="text-green-600">100%</span>
              </div>
              <Progress value={100} className="h-1" />
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="text-center p-2 bg-muted rounded">
                <div className="font-medium">2.1k</div>
                <div className="text-muted-foreground">Memories</div>
              </div>
              <div className="text-center p-2 bg-muted rounded">
                <div className="font-medium">847</div>
                <div className="text-muted-foreground">Entries</div>
              </div>
            </div>
          </div>
        </div>

        {/* Agent Capabilities */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium">Capabilities</span>
            <Button variant="ghost" size="sm" className="h-6 text-xs">
              Configure
            </Button>
          </div>
          
          <div className="space-y-2">
            {agentCapabilities.slice(0, 4).map((capability) => (
              <div key={capability.id} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <capability.icon className="w-3 h-3 text-muted-foreground" />
                  <span className="text-xs">{capability.name}</span>
                </div>
                <Switch
                  checked={selectedCapabilities.includes(capability.id)}
                  onCheckedChange={() => toggleCapability(capability.id)}
                  className="scale-75"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Quick Prompts */}
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="mb-3">
            <span className="text-sm font-medium">Quick Prompts</span>
          </div>
          
          <div className="space-y-2">
            {quickPrompts.map((prompt) => (
              <button
                key={prompt.id}
                onClick={() => handleQuickPrompt(prompt.prompt)}
                className="w-full text-left p-3 rounded-lg border border-border hover:bg-muted transition-colors"
              >
                <div className="flex items-start gap-2">
                  <prompt.icon className="w-4 h-4 text-muted-foreground mt-0.5" />
                  <div>
                    <div className="font-medium text-sm">{prompt.title}</div>
                    <div className="text-xs text-muted-foreground line-clamp-2">
                      {prompt.prompt}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <h1 className="font-semibold">Advanced AI Chat</h1>
              </div>
              <Badge variant="outline" className="gap-1">
                <Brain className="w-3 h-3" />
                Context-Aware
              </Badge>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowThinking(!showThinking)}
                className="gap-2"
              >
                {showThinking ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {showThinking ? 'Hide' : 'Show'} Thinking
              </Button>
              <Button variant="ghost" size="sm">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="max-w-4xl mx-auto">
            {messages.map(renderMessage)}
            
            {/* Processing Indicator */}
            {isProcessing && (
              <div className="flex gap-3 mb-6">
                <Avatar className="w-8 h-8 mt-1">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <Bot className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
                
                <div className="max-w-[80%]">
                  <div className="bg-muted rounded-2xl px-4 py-3">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Loader className="w-4 h-4 animate-spin" />
                        Processing your request...
                      </div>
                      
                      <div className="space-y-2">
                        {processingSteps.map((step) => (
                          <div key={step.id} className="flex items-center gap-2 text-xs">
                            <div className="w-4 h-4 flex items-center justify-center">
                              {step.status === 'completed' && <CheckCircle className="w-3 h-3 text-green-500" />}
                              {step.status === 'running' && <Loader className="w-3 h-3 animate-spin text-blue-500" />}
                              {step.status === 'pending' && <Clock className="w-3 h-3 text-muted-foreground" />}
                              {step.status === 'error' && <AlertCircle className="w-3 h-3 text-red-500" />}
                            </div>
                            <span className={cn(
                              step.status === 'completed' && 'text-green-600',
                              step.status === 'running' && 'text-blue-600',
                              step.status === 'pending' && 'text-muted-foreground'
                            )}>
                              {step.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-border">
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <Textarea
                ref={inputRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask me anything about your journal, goals, memories, or get help with analysis and insights..."
                className="min-h-[60px] max-h-[200px] resize-none pr-20 py-4"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleSendMessage()
                  }
                }}
              />
              
              <div className="absolute bottom-3 right-3 flex items-center gap-2">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Paperclip className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Mic className="w-4 h-4" />
                </Button>
                <Button 
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isProcessing}
                  size="sm"
                  className="h-8 w-8 p-0"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-4">
                <span>Press Enter to send, Shift+Enter for new line</span>
                <div className="flex items-center gap-1">
                  <Database className="w-3 h-3" />
                  <span>Context: {selectedCapabilities.length} capabilities active</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  GPT-4 Turbo
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Context-Aware
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}