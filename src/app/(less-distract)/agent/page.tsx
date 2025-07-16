"use client"

import { useState, useRef, useEffect } from 'react'
import { 
  MoreVertical,
  Sparkles,
  Brain,
  Target,
  Calendar,
  Heart,
  Lightbulb,
  PenTool,
  Search,
  Zap,
  Database,
  Network,
  TrendingUp,
  Eye,
  EyeOff
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import ChatSidebar from '@/components/chat/ChatSidebar'
import ChatMessage from '@/components/chat/ChatMessage'
import ChatInput from '@/components/chat/ChatInput'
import ProcessingIndicator from '@/components/chat/ProcessingIndicator'
import { Message, AgentCapability, ProcessingStep, QuickPrompt } from '@/types/chat'

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

const quickPrompts: QuickPrompt[] = [
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
      content: `Hello! I'm **Daksha**, your advanced AI companion. I have access to your journal entries, goals, memories, and preferences. 

I can help you with:
- **Deep analysis** of your patterns and behaviors
- **Creative tasks** and content generation  
- **Research** and knowledge synthesis
- **Personal insights** and recommendations

What would you like to explore today?`,
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      type: 'text',
      metadata: {
        confidence: 100,
        processingTime: 0.1,
        sources: ['System initialization', 'User context loaded']
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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const simulateProcessing = async (_userMessage: string) => {
    const steps: ProcessingStep[] = [
      { 
        id: 'understanding', 
        name: 'Understanding context', 
        status: 'pending', 
        progress: 0,
        details: 'Parsing your message and intent'
      },
      { 
        id: 'analyzing', 
        name: 'Analyzing journal data', 
        status: 'pending', 
        progress: 0,
        details: 'Searching through your personal data'
      },
      { 
        id: 'connecting', 
        name: 'Connecting memories', 
        status: 'pending', 
        progress: 0,
        details: 'Finding relevant patterns and connections'
      },
      { 
        id: 'generating', 
        name: 'Generating insights', 
        status: 'pending', 
        progress: 0,
        details: 'Creating personalized recommendations'
      },
      { 
        id: 'crafting', 
        name: 'Crafting response', 
        status: 'pending', 
        progress: 0,
        details: 'Formatting the final response'
      }
    ]
    
    setProcessingSteps(steps)
    
    for (let i = 0; i < steps.length; i++) {
      // Start step
      await new Promise(resolve => setTimeout(resolve, 300))
      setProcessingSteps(prev => prev.map((step, index) => {
        if (index === i) {
          return { ...step, status: 'running', progress: 0 }
        }
        return step
      }))
      
      // Progress step
      for (let progress = 20; progress <= 100; progress += 20) {
        await new Promise(resolve => setTimeout(resolve, 200))
        setProcessingSteps(prev => prev.map((step, index) => {
          if (index === i) {
            return { ...step, progress }
          }
          return step
        }))
      }
      
      // Complete step
      setProcessingSteps(prev => prev.map((step, index) => {
        if (index === i) {
          return { ...step, status: 'completed', progress: 100 }
        }
        return step
      }))
    }
  }

  const generateAIResponse = (_userInput: string): Message => {
    const responses = [
      {
        content: `Based on your recent journal entries, I notice you've been focused on **${_userInput.toLowerCase()}**. Here are some insights I've gathered from analyzing your patterns over the past week:

## Key Observations
- Your **productivity peaks** around 10 AM based on your activity logs
- You've mentioned feeling more **creative after your morning walks**
- Your goal progress shows **73% completion** on your main objectives

## Personalized Recommendations
1. **Schedule important tasks** during your peak hours (9-11 AM)
2. **Continue your morning routine** - it's clearly benefiting your mindset
3. **Break down remaining goals** into smaller, actionable steps

## Memory Connections
I found similar themes in your entries from last month when you achieved significant progress. The pattern suggests you work best with **structured morning routines** and **clear daily intentions**.

> *"The best time to plant a tree was 20 years ago. The second best time is now."* - This resonates with your current growth mindset.

Would you like me to dive deeper into any of these insights or help you create an action plan?`,
        thinking: "I'm analyzing the user's request in the context of their recent journal entries and goals. I notice patterns in their productivity and can provide personalized insights based on their data. Let me structure this response to be helpful and actionable.",
        sources: ['Journal entries (last 7 days)', 'Goal tracking data', 'Memory vault', 'Custom context', 'Activity patterns']
      },
      {
        content: `I've analyzed your request through the lens of your **personal context** and recent activities. Here's what I found:

## Context Analysis
Your custom context indicates you're a **20-year-old software engineer** passionate about AI and product development. This aligns perfectly with your recent journal themes about building meaningful projects.

## Relevant Insights
- Your **WriteFlow usage** shows you're most creative when writing about technical topics
- Your **goal tracking** indicates strong progress on learning objectives  
- Recent **memories** suggest you're energized by collaborative projects

## Tailored Suggestions
Given your background and current focus, I recommend exploring the **intersection of your technical skills** with your journaling practice. Perhaps consider building a personal project that combines both interests?

### Next Steps
1. **Document your current project ideas** in your journal
2. **Set specific learning goals** for the next month
3. **Connect with others** in your field who share similar interests

## Code Example
\`\`\`python
# Personal growth tracking system
class PersonalGrowth:
    def __init__(self, goals, skills):
        self.goals = goals
        self.skills = skills
    
    def track_progress(self):
        return "Continuous improvement in progress..."
\`\`\`

How does this resonate with your current thinking?`,
        thinking: "The user seems to be asking for personalized advice. Based on their context as a software engineer, I should provide technical and career-focused insights while connecting to their personal development goals.",
        sources: ['Custom context file', 'Recent WriteFlow usage', 'Goal progress data', 'Technical interests', 'Career development patterns']
      }
    ]

    const selectedResponse = responses[Math.floor(Math.random() * responses.length)]
    
    return {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: selectedResponse.content,
      timestamp: new Date(),
      type: 'analysis',
      metadata: {
        thinking: selectedResponse.thinking,
        sources: selectedResponse.sources,
        confidence: Math.floor(Math.random() * 15) + 85, // 85-100%
        processingTime: Math.random() * 2 + 1.5, // 1.5-3.5 seconds
        tokens: Math.floor(Math.random() * 100) + 150 // 150-250 tokens
      }
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
    await simulateProcessing(inputMessage)

    // Generate AI response
    const aiResponse = generateAIResponse(inputMessage)
    setMessages(prev => [...prev, aiResponse])
    
    setIsProcessing(false)
    setProcessingSteps([])
  }

  const handleQuickPrompt = (prompt: string) => {
    setInputMessage(prompt)
  }

  const toggleCapability = (capabilityId: string) => {
    setSelectedCapabilities(prev => 
      prev.includes(capabilityId) 
        ? prev.filter(id => id !== capabilityId)
        : [...prev, capabilityId]
    )
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <ChatSidebar
        capabilities={agentCapabilities}
        selectedCapabilities={selectedCapabilities}
        onToggleCapability={toggleCapability}
        quickPrompts={quickPrompts}
        onQuickPrompt={handleQuickPrompt}
        showThinking={showThinking}
        onToggleThinking={() => setShowThinking(!showThinking)}
      />

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
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message}
                showThinking={showThinking}
                onCopy={() => console.log('Copied message')}
                onStar={() => console.log('Starred message')}
                onRegenerate={() => console.log('Regenerate message')}
              />
            ))}
            
            {/* Processing Indicator */}
            {isProcessing && (
              <ProcessingIndicator 
                steps={processingSteps}
                currentStep={processingSteps.find(s => s.status === 'running')?.name}
              />
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <ChatInput
          value={inputMessage}
          onChange={setInputMessage}
          onSend={handleSendMessage}
          isProcessing={isProcessing}
          selectedCapabilities={selectedCapabilities}
          onAttachment={(file) => console.log('File attached:', file.name)}
          onVoiceInput={() => console.log('Voice input activated')}
        />
      </div>
    </div>
  )
}