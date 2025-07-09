export interface Message {
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

export interface AgentCapability {
  id: string
  name: string
  description: string
  icon: any
  enabled: boolean
  category: 'analysis' | 'creation' | 'automation' | 'research' | 'personal'
}

export interface ProcessingStep {
  id: string
  name: string
  status: 'pending' | 'running' | 'completed' | 'error'
  progress: number
  details?: string
  icon?: any
}

export interface QuickPrompt {
  id: string
  title: string
  prompt: string
  category: 'analysis' | 'planning' | 'creative' | 'reflection'
  icon: any
}