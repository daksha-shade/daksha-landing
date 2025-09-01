"use client"

import { Search, Settings,   Command } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import ThemeToggle from '@/components/ui/ThemeToggle'
import { useState } from 'react'
import { UserButton } from '@stackframe/stack'

export default function DashboardHeader() {
  const [searchFocused, setSearchFocused] = useState(false)

  return (
    <header className="h-16 border-b border-border/20 bg-white/80 dark:bg-[#1f1f1f]/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-[#1f1f1f]/60 fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between h-full px-4 md:px-6">
        {/* Logo - Hidden on mobile to make space for menu button */}
        <div className="flex items-center gap-3 ml-12 md:ml-0">
          <div className="w-8 h-8 bg-foreground rounded-lg flex items-center justify-center">
            <span className="text-background font-bold text-lg font-serif">D</span>
          </div>
          <span className="font-serif font-semibold text-lg hidden sm:block">Daksha</span>
        </div>


        {/* Actions - Responsive */}
        <div className="flex items-center gap-1 md:gap-2">
          <ThemeToggle />
          <Button variant="ghost" size="icon" className="hover:bg-accent hidden sm:flex">
            <Settings className="w-4 h-4" />
          </Button>
          <Button variant="ghost"
          asChild
          size="icon" className="hover:bg-accent">
            <UserButton
              showUserInfo={false}
            />
          </Button>
        </div>
      </div>
    </header>
  )
}