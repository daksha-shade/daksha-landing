"use client"

import { useState } from 'react'
import { 
  ArrowLeft, 
  Settings, 
  Bot, 
  Activity, 
  Database,
  Eye,
  EyeOff
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Switch } from '@/components/ui/switch'
import Link from 'next/link'
import { AgentCapability } from '@/types/chat'

interface ChatSidebarProps {
  capabilities: AgentCapability[]
  selectedCapabilities: string[]
  onToggleCapability: (capabilityId: string) => void
  quickPrompts: Array<{
    id: string
    title: string
    prompt: string
    icon: any
  }>
  onQuickPrompt: (prompt: string) => void
  showThinking: boolean
  onToggleThinking: () => void
}

export default function ChatSidebar({
  capabilities,
  selectedCapabilities,
  onToggleCapability,
  quickPrompts,
  onQuickPrompt,
  showThinking,
  onToggleThinking
}: ChatSidebarProps) {
  return (
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

      {/* Controls */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium">Controls</span>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {showThinking ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
              <span className="text-xs">Show AI Thinking</span>
            </div>
            <Switch
              checked={showThinking}
              onCheckedChange={onToggleThinking}
              className="scale-75"
            />
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
          {capabilities.slice(0, 4).map((capability) => (
            <div key={capability.id} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <capability.icon className="w-3 h-3 text-muted-foreground" />
                <span className="text-xs">{capability.name}</span>
              </div>
              <Switch
                checked={selectedCapabilities.includes(capability.id)}
                onCheckedChange={() => onToggleCapability(capability.id)}
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
              onClick={() => onQuickPrompt(prompt.prompt)}
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
  )
}