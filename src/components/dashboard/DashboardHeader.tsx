"use client"

import { Search, Settings, User, Command } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import ThemeToggle from '@/components/ui/ThemeToggle'
import { useState } from 'react'

export default function DashboardHeader() {
  const [searchFocused, setSearchFocused] = useState(false)

  return (
    <header className="h-16 border-b border-border/20 bg-white/80 dark:bg-[#1f1f1f]/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-[#1f1f1f]/60 sticky top-0 z-50">
      <div className="flex items-center justify-between h-full px-4 md:px-6">
        {/* Logo - Hidden on mobile to make space for menu button */}
        <div className="flex items-center gap-3 ml-12 md:ml-0">
          <div className="w-8 h-8 bg-foreground rounded-lg flex items-center justify-center">
            <span className="text-background font-bold text-lg font-serif">D</span>
          </div>
          <span className="font-serif font-semibold text-lg hidden sm:block">Daksha</span>
        </div>

        {/* Search Bar - Responsive */}
        <div className="flex-1 max-w-md mx-4 md:mx-8 relative">
          <div className={`relative transition-all duration-200 ${searchFocused ? 'scale-105' : ''}`}>
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search or ask Daksha..."
              className="pl-10 pr-12 bg-muted/30 border-border/50 focus:bg-background transition-colors text-sm"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1 hidden sm:flex">
              <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                <Command className="w-3 h-3" />K
              </kbd>
            </div>
          </div>
        </div>

        {/* Actions - Responsive */}
        <div className="flex items-center gap-1 md:gap-2">
          <ThemeToggle />
          <Button variant="ghost" size="icon" className="hover:bg-accent hidden sm:flex">
            <Settings className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="hover:bg-accent">
            <User className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}