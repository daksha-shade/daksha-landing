"use client"

import { useState } from 'react'
import { useUser } from '@stackframe/stack'
import { 
  Brain, 
  Edit3,
  Send,
  Square
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import FullScreenVoiceInput from './FullScreenVoiceInput'

export default function DashboardMainSimple() {
  const user = useUser()
  const [dakshaInput, setDakshaInput] = useState("")
  const [showVoiceInput, setShowVoiceInput] = useState(false)

  // Show loading state while user data is being fetched
  if (user === null) {
    return (
      <div className="notion-page py-12 space-y-8">
        <div className="space-y-2">
          <div className="h-8 bg-muted animate-pulse rounded-md w-48"></div>
        </div>
        <div className="space-y-4">
          <div className="h-6 bg-muted animate-pulse rounded-md w-32"></div>
          <div className="space-y-3 pl-6">
            <div className="h-4 bg-muted animate-pulse rounded-md w-64"></div>
            <div className="h-4 bg-muted animate-pulse rounded-md w-48"></div>
          </div>
        </div>
      </div>
    )
  }

  // Redirect to sign in if user is not authenticated
  if (user === undefined) {
    return (
      <div className="notion-page py-12 space-y-8">
        <div className="space-y-4 text-center">
          <h1 className="notion-title font-serif text-foreground">
            Welcome to Daksha
          </h1>
          <p className="text-muted-foreground">
            Please sign in to access your dashboard.
          </p>
          <Button 
            onClick={() => window.location.href = '/sign-in'}
            className="mt-4"
          >
            Sign In
          </Button>
        </div>
      </div>
    )
  }

  const displayName = user.displayName || user.primaryEmail?.split('@')[0] || 'there'

  return (
    <div className="notion-page py-12 space-y-8">
      {/* Greeting */}
      <div className="space-y-2">
        <h1 className="notion-title font-serif text-foreground">
          Hello, {displayName}
        </h1>
      </div>

      {/* Today's Plan */}
      <div className="space-y-4">
        <h2 className="text-lg font-medium flex items-center gap-2">
          Today's Plan
        </h2>
        <div className="space-y-3 pl-6">
          <div className="flex items-center gap-3">
            <Square className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">Add your intention for today</span>
          </div>
          <div className="flex items-center gap-3">
            <Square className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">Reflect on yesterday</span>
          </div>
          <Button variant="notion" className="gap-2 h-9">
            <Edit3 className="w-4 h-4" />
            Write Journal Entry
          </Button>
        </div>
      </div>

      {/* Recent Memory */}
      <div className="space-y-4">
        <h2 className="text-lg font-medium flex items-center gap-2">
          <Brain className="w-5 h-5" />
          Recent Memory
        </h2>
        <div className="pl-6">
          <p className="text-muted-foreground italic">
            "You felt productive after sketching Daksha idea."
          </p>
        </div>
      </div>

      {/* Ask Daksha */}
      <div className="space-y-4">
        <h2 className="text-lg font-medium flex items-center gap-2">
          Ask Daksha anything...
        </h2>
        <div className="pl-6">
          <div className="flex gap-2 max-w-md">
            <Input
              placeholder="What's on your mind?"
              value={dakshaInput}
              onChange={(e) => setDakshaInput(e.target.value)}
              className="flex-1 border-border/50 focus:border-border"
              onFocus={() => setShowVoiceInput(true)}
            />
            <Button 
              size="icon" 
              variant="notion"
              onClick={() => setShowVoiceInput(true)}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <Button 
            variant="notion" 
            className="mt-3 gap-2"
            onClick={() => setShowVoiceInput(true)}
          >
            <Brain className="w-4 h-4" />
            Talk to Daksha
          </Button>
        </div>
      </div>

      {/* Quick Shortcuts */}
      <div className="border-t border-border/30 pt-6">
        <div className="flex items-center gap-6 text-sm">
          <Button variant="notion" size="sm" className="gap-2">
            Journal
          </Button>
          <Button variant="notion" size="sm" className="gap-2">
            Mind
          </Button>
          <Button variant="notion" size="sm" className="gap-2">
            Goals
          </Button>
          <Button variant="notion" size="sm" className="gap-2">
            Chat
          </Button>
        </div>
      </div>

      {/* Full Screen Voice Input */}
      <FullScreenVoiceInput 
        isOpen={showVoiceInput}
        onClose={() => setShowVoiceInput(false)}
      />
    </div>
  )
}