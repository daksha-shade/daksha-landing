"use client"

import { useState, useEffect } from 'react'
import { X, Brain } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AIVoiceInput } from '@/components/ui/ai-voice-input'

interface FullScreenVoiceInputProps {
  isOpen: boolean
  onClose: () => void
  onStartRecording?: () => void
  onStopRecording?: () => void
  isRecording?: boolean
}

export default function FullScreenVoiceInput({ 
  isOpen, 
  onClose, 
  onStartRecording, 
  onStopRecording, 
  isRecording = false 
}: FullScreenVoiceInputProps) {
  const [isListening, setIsListening] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  const handleVoiceStart = () => {
    setIsListening(true)
    onStartRecording?.()
    console.log('Voice recording started')
  }

  const handleVoiceStop = (duration: number) => {
    setIsListening(false)
    onStopRecording?.()
    console.log('Voice recording stopped, duration:', duration)
    // Here you would process the voice input and potentially close the modal
    // setTimeout(() => onClose(), 1000) // Auto-close after processing
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] bg-white dark:bg-[#1f1f1f] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Brain className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-serif font-semibold">Talk to Daksha</h1>
            <p className="text-sm text-muted-foreground">
              {isRecording || isListening ? 'Listening...' : 'Click the microphone to start speaking'}
            </p>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose} className="rounded-full">
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Main Voice Input Area */}
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center space-y-8 max-w-2xl mx-auto px-6">
          {/* Large Voice Input */}
          <AIVoiceInput 
            onStart={handleVoiceStart}
            onStop={handleVoiceStop}
            visualizerBars={64}
            className="py-8"
          />
          
          {/* Instructions */}
          <div className="space-y-4">
            <h2 className="text-2xl font-serif font-semibold text-foreground">
              What's on your mind?
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Share your thoughts, ask questions, or reflect on your day. 
              Daksha is here to listen and help you explore your ideas.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto">
            {[
              "How was my day?",
              "Help me reflect",
              "What patterns do you see?",
              "Summarize my thoughts"
            ].map((prompt, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="text-sm py-3 px-4 rounded-lg border-border/30 hover:border-border/50"
              >
                {prompt}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-border/10 text-center">
        <p className="text-xs text-muted-foreground">
          Press <kbd className="px-2 py-1 bg-muted rounded text-xs">Esc</kbd> to close
        </p>
      </div>
    </div>
  )
}