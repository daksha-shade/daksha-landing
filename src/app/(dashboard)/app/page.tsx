"use client"

import { useUser } from '@stackframe/stack'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { useState } from 'react'
import {
  BookOpen,
  Brain,
  Target,
  MessageCircle,
  Grid3X3,
  Archive,
  Mic
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import FullScreenVoiceInput from '@/components/dashboard/FullScreenVoiceInput'
import MemoriesVault from '@/components/dashboard/MemoriesVault'
import TodayPlanner from '@/components/dashboard/TodayPlanner'
import GoalsProgress from '@/components/dashboard/GoalsProgress'
import ThoughtsApp from '@/components/dashboard/ThoughtsApp'
import DailyInspiration from '@/components/dashboard/DailyInspiration'
import { mockMemories, mockTodayTasks } from '@/lib/dashboard-data'

export default function MainDashboardPage() {
  const user = useUser()
  const [showVoiceInput, setShowVoiceInput] = useState(false)

  // Show loading state while checking authentication
  if (user === null) {
    redirect('/handler/sign-in');
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  // Redirect to sign in if user is not authenticated
  if (user === undefined) {
    window.location.href = '/handler/sign-in'
    return null
  }

  const displayName = user.displayName || user.primaryEmail?.split('@')[0] || 'there'

  const quickActions = [
    { icon: BookOpen, label: 'Journal', href: '/journal', color: 'text-blue-500', description: 'Write your thoughts' },
    { icon: Brain, label: 'Mind', href: '/mind', color: 'text-purple-500', description: 'Organize memories' },
    { icon: Target, label: 'Goals', href: '/goals', color: 'text-green-500', description: 'Track progress' },
    { icon: MessageCircle, label: 'Chat', href: '/chat', color: 'text-orange-500', description: 'Talk to Daksha' },
    { icon: Grid3X3, label: 'Apps', href: '/apps', color: 'text-indigo-500', description: 'Connected services' },
    { icon: Archive, label: 'Archive', href: '/archive', color: 'text-gray-500', description: 'Past entries' },
  ]

  return (
    <div className=" py-8 space-y-8 min-h-screen  ">
      {/* Improved Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="notion-title font-serif">
            Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 17 ? 'afternoon' : 'evening'}, {displayName}
          </h1>
          <p className="text-muted-foreground">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <Button
          onClick={() => setShowVoiceInput(true)}
          className="gap-2 h-11"
          size="default"
        >
          <Mic className="w-5 h-5" />
          Talk to Daksha
        </Button>
      </div>

      {/* Daily Inspiration */}
      <DailyInspiration />

      {/* Quick Actions - Improved Layout */}
      <div className="space-y-4">
        <h2 className="text-lg font-medium">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {quickActions.map((action, index) => (
            <Link key={index} href={action.href}>
              <div className="bg-background border border-border/30 rounded-lg p-6 hover:shadow-sm hover:border-border/50 transition-all cursor-pointer group h-full">
                <div className="text-center space-y-3">
                  <div className="mx-auto w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <action.icon className={`w-6 h-6 ${action.color}`} />
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium text-sm">{action.label}</p>
                    <p className="text-xs text-muted-foreground leading-tight">{action.description}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Main Content - Improved 2 Column Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Today's Tasks */}
          <div className="h-fit">
            <TodayPlanner
              tasks={mockTodayTasks}
              onTaskToggle={(taskId) => {
                console.log('Toggle task:', taskId)
              }}
            />
          </div>

          {/* Goals Progress */}
          <div className="h-fit">
            <GoalsProgress />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Memories Vault */}
          <div className="h-fit">
            <MemoriesVault memories={mockMemories.slice(0, 4)} />
          </div>

          {/* Quick Thoughts */}
          <div className="h-fit">
            <ThoughtsApp />
          </div>
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