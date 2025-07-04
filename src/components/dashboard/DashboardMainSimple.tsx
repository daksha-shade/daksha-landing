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

  // This component should only render when user is authenticated
  // Authentication check is handled at the page level
  if (!user) {
    return null
  }

  const displayName = user.displayName || user.primaryEmail?.split('@')[0] || 'there'

  return (
    <div className="notion-page py-6 md:py-12 space-y-6 md:space-y-8 max-w-4xl mx-auto">
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
        <div className="space-y-3 pl-3 md:pl-6">
          <div className="flex items-center gap-3">
            <Square className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            <span className="text-muted-foreground text-sm md:text-base">Add your intention for today</span>
          </div>
          <div className="flex items-center gap-3">
            <Square className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            <span className="text-muted-foreground text-sm md:text-base">Reflect on yesterday</span>
          </div>
          <Button variant="notion" className="gap-2 h-9 text-sm">
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
        <div className="pl-3 md:pl-6">
          <div className="flex gap-2 w-full max-w-md">
            <Input
              placeholder="What's on your mind?"
              value={dakshaInput}
              onChange={(e) => setDakshaInput(e.target.value)}
              className="flex-1 border-border/50 focus:border-border text-sm"
              onFocus={() => setShowVoiceInput(true)}
            />
            <Button 
              size="icon" 
              variant="notion"
              onClick={() => setShowVoiceInput(true)}
              className="flex-shrink-0"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <Button 
            variant="notion" 
            className="mt-3 gap-2 text-sm"
            onClick={() => setShowVoiceInput(true)}
          >
            <Brain className="w-4 h-4" />
            Talk to Daksha
          </Button>
        </div>
      </div>

      {/* Quick Shortcuts */}
      <div className="border-t border-border/30 pt-6">
        <div className="grid grid-cols-2 md:flex md:items-center gap-3 md:gap-6 text-sm">
          <Button variant="notion" size="sm" className="gap-2 justify-center">
            Journal
          </Button>
          <Button variant="notion" size="sm" className="gap-2 justify-center">
            Mind
          </Button>
          <Button variant="notion" size="sm" className="gap-2 justify-center">
            Goals
          </Button>
          <Button variant="notion" size="sm" className="gap-2 justify-center">
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