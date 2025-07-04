"use client"

import { useState, useEffect } from 'react'
import { 
  Command, 
  Search, 
  Brain, 
  BookOpen, 
  Target, 
  Calendar, 
  Settings, 
  Plus,
  Lightbulb,
  Map,
  Clock,
  Paperclip,
  Wrench,
  FileText,
  Bot
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

const quickActions = [
  { icon: BookOpen, label: 'Journal', description: 'Write your thoughts', shortcut: 'J' },
  { icon: Brain, label: 'Mind', description: 'Search memories', shortcut: 'M' },
  { icon: Target, label: 'Goals', description: 'Track progress', shortcut: 'G' },
  { icon: Bot, label: 'Chat', description: 'Talk to Daksha', shortcut: 'C' },
]

export default function DashboardCommandBar() {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen(true)
      }
      if (e.key === 'Escape') {
        setIsOpen(false)
        setSearch('')
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  if (!isOpen) {
    return (
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-background/95 backdrop-blur border border-border/50 rounded-full shadow-lg px-6 py-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(true)}
            className="gap-3 text-muted-foreground hover:text-foreground"
          >
            <Brain className="w-4 h-4" />
            <span className="text-sm">Talk to Daksha...</span>
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted/50 px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
              ⌘K
            </kbd>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="fixed top-1/4 left-1/2 transform -translate-x-1/2 w-full max-w-2xl mx-auto p-4">
        <div className="bg-background border border-border rounded-lg shadow-2xl overflow-hidden">
          {/* Search Input */}
          <div className="flex items-center border-b border-border px-4">
            <Search className="w-4 h-4 text-muted-foreground mr-3" />
            <Input
              placeholder="Type a command or search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border-0 focus:ring-0 text-base h-12"
              autoFocus
            />
          </div>

          {/* Quick Actions */}
          <div className="p-2">
            <div className="text-xs font-medium text-muted-foreground px-2 py-1 mb-1">
              Quick Actions
            </div>
            <div className="space-y-1">
              {quickActions.map((action, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent cursor-pointer transition-colors"
                >
                  <action.icon className="w-4 h-4 text-muted-foreground" />
                  <div className="flex-1">
                    <div className="font-medium text-sm">{action.label}</div>
                    <div className="text-xs text-muted-foreground">{action.description}</div>
                  </div>
                  <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                    {action.shortcut}
                  </kbd>
                </div>
              ))}
            </div>
          </div>

          {/* Recent */}
          {search === '' && (
            <div className="p-2 border-t border-border">
              <div className="text-xs font-medium text-muted-foreground px-2 py-1 mb-1">
                Recent
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent cursor-pointer">
                  <BookOpen className="w-4 h-4 text-blue-500" />
                  <div className="flex-1">
                    <div className="font-medium text-sm">Yesterday's Journal</div>
                    <div className="text-xs text-muted-foreground">Opened 2 hours ago</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent cursor-pointer">
                  <Target className="w-4 h-4 text-green-500" />
                  <div className="flex-1">
                    <div className="font-medium text-sm">YC Application Goal</div>
                    <div className="text-xs text-muted-foreground">Updated yesterday</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent cursor-pointer">
                  <Brain className="w-4 h-4 text-purple-500" />
                  <div className="flex-1">
                    <div className="font-medium text-sm">Product Vision Mind Map</div>
                    <div className="text-xs text-muted-foreground">Viewed 3 days ago</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="px-4 py-2 border-t border-border bg-muted/30">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-4">
                <span>↑↓ to navigate</span>
                <span>↵ to select</span>
                <span>esc to close</span>
              </div>
              <div className="flex items-center gap-1">
                <span>Powered by</span>
                <Brain className="w-3 h-3" />
                <span>Daksha</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}