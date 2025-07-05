"use client"

import { useEffect, useState, useCallback } from 'react'
import { Room } from 'livekit-client'
import { DakshaAIAgent, AIAgentCapabilities } from '@/lib/ai-agent'

interface LiveKitAIAgentProps {
  room: Room | null
  isActive: boolean
  onMessage: (message: unknown) => void
  userProfile?: unknown
}

export function LiveKitAIAgent({ room, isActive, onMessage, userProfile }: LiveKitAIAgentProps) {
  const [agent, setAgent] = useState<DakshaAIAgent | null>(null)
  const [, setIsInitialized] = useState(false)

  const initializeAgent = useCallback(async () => {
    try {
      const capabilities: AIAgentCapabilities = {
        emotionalAnalysis: true,
        journalingInsights: true,
        memoryRecall: true,
        goalTracking: true,
        moodDetection: true,
        conversationSummarization: true,
        realTimeTranscription: true,
        voiceSynthesis: true
      }

      const newAgent = new DakshaAIAgent(capabilities)
      await newAgent.initialize(room!, userProfile)
      
      setAgent(newAgent)
      setIsInitialized(true)

      // Send initial message
      onMessage({
        id: Date.now().toString(),
        content: "Daksha AI Agent is now active and ready to assist you with emotional insights and journaling support.",
        timestamp: new Date(),
        type: 'agent',
        emotion: 'ready',
        confidence: 1.0
      })
    } catch (error) {
      console.error('Failed to initialize AI agent:', error)
      onMessage({
        id: Date.now().toString(),
        content: "Sorry, I encountered an issue while starting up. Please try again.",
        timestamp: new Date(),
        type: 'agent',
        emotion: 'apologetic',
        confidence: 0.8
      })
    }
  }, [room, userProfile, onMessage])

  useEffect(() => {
    if (isActive && room && !agent) {
      initializeAgent()
    } else if (!isActive && agent) {
      // Cleanup agent
      setAgent(null)
      setIsInitialized(false)
    }
  }, [isActive, room, agent, initializeAgent])

  // This component doesn't render anything visible
  // It's a service component that manages the AI agent
  return null
}

export default LiveKitAIAgent