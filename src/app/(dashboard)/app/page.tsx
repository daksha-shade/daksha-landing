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
import { Card } from '@/components/ui/Card'
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
    <div className="w-full max-w-6xl mx-auto px-4 py-6 space-y-6">
      {/* Simple Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">
            Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 17 ? 'afternoon' : 'evening'}, {displayName}
          </h1>
          <p className="text-muted-foreground text-sm">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <Button 
          onClick={() => setShowVoiceInput(true)}
          className="gap-2"
        >
          <Mic className="w-4 h-4" />
          Talk to Daksha
        </Button>
      </div>

      {/* Daily Inspiration - Simplified */}
      <DailyInspiration />

      {/* Main Content - 2 Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Today's Tasks */}
          <TodayPlanner 
            tasks={mockTodayTasks}
            onTaskToggle={(taskId) => {
              console.log('Toggle task:', taskId)
            }}
          />
          
          {/* Goals Progress - Compact */}
          <GoalsProgress />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Memories Vault - Simplified */}
          <MemoriesVault memories={mockMemories.slice(0, 4)} />
          
          {/* Quick Thoughts */}
          <ThoughtsApp />
        </div>
      </div>

      {/* Quick Actions - Simplified */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {quickActions.map((action, index) => (
          <Link key={index} href={action.href}>
            <Card className="p-4 hover:shadow-md transition-all cursor-pointer group">
              <div className="text-center space-y-3">
                <div className="mx-auto w-12 h-12 rounded-full bg-accent/50 flex items-center justify-center group-hover:bg-accent transition-colors">
                  <action.icon className={`w-6 h-6 ${action.color}`} />
                </div>
                <div>
                  <p className="font-medium text-sm">{action.label}</p>
                  <p className="text-xs text-muted-foreground">{action.description}</p>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {/* Full Screen Voice Input */}
      <FullScreenVoiceInput 
        isOpen={showVoiceInput}
        onClose={() => setShowVoiceInput(false)}
      />
    </div>
  )
}