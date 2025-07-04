"use client"

import { useState } from 'react'
import { MessageCircle, Send, Brain, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function ChatPage() {
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
        content: "That's an interesting perspective! Let me help you explore that thought further. Based on your recent journal entries, I can see some patterns emerging...",
        timestamp: "Just now"
      }])
    }, 1000)
  }

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <MessageCircle className="w-6 h-6 text-green-500" />
          <h1 className="text-2xl font-serif font-semibold">Chat with Daksha</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="notion" size="sm" className="gap-2">
            <Sparkles className="w-4 h-4" />
            Insights
          </Button>
        </div>
      </div>

      {/* Chat Container */}
      <div className="bg-background border border-border/30 rounded-lg overflow-hidden">
        {/* Messages */}
        <div className="h-[500px] overflow-y-auto p-6 space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] ${
                msg.type === 'user' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted'
              } rounded-lg p-4`}>
                {msg.type === 'assistant' && (
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-primary">Daksha</span>
                  </div>
                )}
                <p className="text-sm leading-relaxed">{msg.content}</p>
                <div className="text-xs opacity-70 mt-2">{msg.timestamp}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="border-t border-border/30 p-4">
          <div className="flex gap-2">
            <Input
              placeholder="Ask Daksha anything..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 border-border/30"
            />
            <Button onClick={handleSend} variant="notion" size="sm" className="gap-2">
              <Send className="w-4 h-4" />
              Send
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Prompts */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-muted-foreground">Quick Prompts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {[
            "Summarize my week",
            "What patterns do you see in my mood?",
            "Help me reflect on my goals",
            "What insights can you share?"
          ].map((prompt, index) => (
            <Button
              key={index}
              variant="notion"
              size="sm"
              className="justify-start text-left h-auto p-3"
              onClick={() => setMessage(prompt)}
            >
              {prompt}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}