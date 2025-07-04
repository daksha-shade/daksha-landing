"use client"

import React, { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
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
  { icon: BookOpen, label: 'Journal', href: '/journal' },
  { icon: Brain, label: 'Mind', href: '/mind' },
  { icon: Target, label: 'Goals', href: '/goals' },
  { icon: MessageCircle, label: 'Chat', href: '/chat' },
  { icon: Archive, label: 'Archive', href: '/archive' },
]

export default function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  // Update CSS variable for main content margin
  React.useEffect(() => {
    document.documentElement.style.setProperty('--sidebar-width', collapsed ? '64px' : '256px')
  }, [collapsed])

  return (
    <aside className={cn(
      "border-r border-border/20 bg-[#fafafa] dark:bg-[#1a1a1a] transition-all duration-300 flex flex-col fixed left-0 top-16 h-[calc(100vh-4rem)] z-40",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Navigation */}
      <div className="p-4 space-y-2">
        {navigationItems.map((item, index) => {
          const isActive = pathname === item.href
          return (
            <Link key={index} href={item.href}>
              <Button
                variant={isActive ? "secondary" : "notion"}
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
            </Link>
          )
        })}
        
        {!collapsed && (
          <Button variant="notion" className="w-full justify-start gap-3 h-10 text-muted-foreground text-sm mt-4">
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