"use client"

import { useState, useEffect } from 'react'
import { Brain } from 'lucide-react'
import { Button } from '@/components/ui/button'
import FullScreenVoiceInput from './FullScreenVoiceInput'

export default function DashboardCommandBar() {
  const [isVoiceOpen, setIsVoiceOpen] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsVoiceOpen(true)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <>
      <div className="fixed bottom-8 right-1/8 transform -translate-x-1/8 z-50">
        <div className="bg-white/95 dark:bg-[#1f1f1f]/95 backdrop-blur border border-border/20 rounded-full shadow-lg px-6 py-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsVoiceOpen(true)}
            className="gap-3 text-muted-foreground hover:text-foreground"
          >
            <Brain className="w-4 h-4" />
            <span className="text-sm">Talk to Daksha...</span>
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted/50 px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
              ⌘ K
            </kbd>
          </Button>
        </div>
      </div>

      <FullScreenVoiceInput 
        isOpen={isVoiceOpen}
        onClose={() => setIsVoiceOpen(false)}
      />
    </>
  )
}