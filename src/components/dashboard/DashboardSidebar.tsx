"use client"

import { useState } from 'react'
import { 
  BookOpen, 
  Brain, 
  Target, 
  MessageCircle, 
  Archive, 
  Plus,
  ChevronLeft
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navigationItems = [
  { icon: BookOpen, label: 'Journal', active: true },
  { icon: Brain, label: 'Mind' },
  { icon: Target, label: 'Goals' },
  { icon: MessageCircle, label: 'Chat' },
  { icon: Archive, label: 'Archive' },
]

export default function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside className={cn(
      "border-r border-border/30 bg-background/50 transition-all duration-300 flex flex-col",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Navigation */}
      <div className="p-4 space-y-2">
        {navigationItems.map((item, index) => (
          <Button
            key={index}
            variant={item.active ? "secondary" : "ghost"}
            className={cn(
              "w-full justify-start gap-3 h-10 font-medium transition-all text-sm",
              collapsed && "justify-center px-2"
            )}
          >
            <item.icon className="w-4 h-4 flex-shrink-0" />
            {!collapsed && (
              <span className="flex-1 text-left">{item.label}</span>
            )}
          </Button>
        ))}
        
        {!collapsed && (
          <Button variant="ghost" className="w-full justify-start gap-3 h-10 text-muted-foreground text-sm mt-4">
            <Plus className="w-4 h-4" />
            <span>New</span>
          </Button>
        )}
      </div>

      {/* Collapse Toggle */}
      <div className="mt-auto p-4 border-t border-border/30">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="w-full justify-center"
        >
          <ChevronLeft className={cn("w-4 h-4 transition-transform", collapsed && "rotate-180")} />
        </Button>
      </div>
    </aside>
  )
}