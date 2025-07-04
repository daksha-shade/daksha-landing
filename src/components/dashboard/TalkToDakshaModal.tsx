"use client"

import { useState } from 'react'
import { X, Brain, Send, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AIVoiceInput } from '@/components/ui/ai-voice-input'

interface TalkToDakshaModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function TalkToDakshaModal({ isOpen, onClose }: TalkToDakshaModalProps) {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([
    {
      type: 'assistant',
      content: "Hello! I'm Daksha, your AI companion. I'm here to help you reflect, explore your thoughts, and gain insights from your journaling. What would you like to talk about today?",
      timestamp: "Just now"
    }
  ])

  const handleSend = () => {
    if (!message.trim()) return
    
    setMessages(prev => [...prev, {
      type: 'user',
      content: message,
      timestamp: "Just now"
    }])
    setMessage("")
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        type: 'assistant',
        content: "That's a fascinating perspective! Let me help you explore that thought further. Based on your recent journal entries, I can see some patterns emerging...",
        timestamp: "Just now"
      }])
    }, 1000)
  }

  const handleVoiceStart = () => {
    console.log('Voice recording started')
  }

  const handleVoiceStop = (duration: number) => {
    console.log('Voice recording stopped, duration:', duration)
    // Here you would process the voice input
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[80vh] mx-auto p-4">
        <div className="bg-white dark:bg-[#1f1f1f] border border-border/20 rounded-xl shadow-2xl overflow-hidden h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-serif font-semibold">Talk to Daksha</h2>
                <p className="text-sm text-muted-foreground">Your AI companion is listening</p>
              </div>
            </div>
            <Button variant="notion" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Voice Input Section */}
          <div className="p-6 border-b border-border/20 bg-[#fafafa] dark:bg-[#1a1a1a]">
            <AIVoiceInput 
              onStart={handleVoiceStart}
              onStop={handleVoiceStop}
              className="py-2"
            />
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] ${
                  msg.type === 'user' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-[#f5f5f5] dark:bg-[#2a2a2a] text-foreground'
                } rounded-xl p-4`}>
                  {msg.type === 'assistant' && (
                    <div className="flex items-center gap-2 mb-2">
                      <Brain className="w-4 h-4 text-blue-500" />
                      <span className="text-sm font-medium text-blue-500">Daksha</span>
                    </div>
                  )}
                  <p className="text-sm leading-relaxed">{msg.content}</p>
                  <div className="text-xs opacity-70 mt-2">{msg.timestamp}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Text Input */}
          <div className="border-t border-border/20 p-6">
            <div className="flex gap-3">
              <Input
                placeholder="Type your message to Daksha..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1 border-border/30"
              />
              <Button onClick={handleSend} variant="notion" className="gap-2">
                <Send className="w-4 h-4" />
                Send
              </Button>
            </div>
            
            {/* Quick Prompts */}
            <div className="mt-4">
              <div className="flex flex-wrap gap-2">
                {[
                  "Summarize my week",
                  "What patterns do you see?",
                  "Help me reflect on my goals",
                  "What insights can you share?"
                ].map((prompt, index) => (
                  <Button
                    key={index}
                    variant="notion"
                    size="sm"
                    className="text-xs"
                    onClick={() => setMessage(prompt)}
                  >
                    <Sparkles className="w-3 h-3 mr-1" />
                    {prompt}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}