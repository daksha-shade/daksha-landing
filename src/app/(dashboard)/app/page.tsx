"use client"

import { useUser } from '@stackframe/stack'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { useState } from 'react'
import { BookOpen, Target, MessageCircle, Mic, Calendar, Heart, Lightbulb, Sparkles, TrendingUp, FileText, Brain, Smile, Clock, BarChart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import FullScreenVoiceInput from '@/components/dashboard/FullScreenVoiceInput'
import MemoriesVault from '@/components/dashboard/MemoriesVault'
import TodayPlanner from '@/components/dashboard/TodayPlanner'
import GoalsProgress from '@/components/dashboard/GoalsProgress'
import ThoughtsApp from '@/components/dashboard/ThoughtsApp'
import DailyInspiration from '@/components/dashboard/DailyInspiration'
import JournalPrompts from '@/components/dashboard/JournalPrompts'
import MoodSelector from '@/components/dashboard/MoodSelector'
import ProductivityTracker from '@/components/dashboard/ProductivityTracker'
import ReflectionInsights from '@/components/dashboard/ReflectionInsights'
import MoodTracker from '@/components/dashboard/MoodTracker'
import HabitTracker from '@/components/dashboard/HabitTracker'
import RecentActivities from '@/components/dashboard/RecentActivities'
import FocusTracker from '@/components/dashboard/FocusTracker'
import { useDashboardAnalytics, useDashboardSummary } from '@/hooks/useDashboard'

export default function MainDashboardPage() {
  const user = useUser()
  const [showVoiceInput, setShowVoiceInput] = useState(false)
  
  // Fetch dashboard data
  const { data: analyticsData, isLoading: analyticsLoading } = useDashboardAnalytics('week')
  const { summary, isLoading: summaryLoading } = useDashboardSummary()

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
    { icon: Target, label: 'Goals', href: '/goals', color: 'text-green-500', description: 'Track progress' },
    { icon: MessageCircle, label: 'Chat', href: '/chat', color: 'text-orange-500', description: 'Talk to Daksha' },
    { icon: Calendar, label: 'Schedule', href: '/calendar', color: 'text-purple-500', description: 'Plan your day' },
    { icon: Heart, label: 'Memories', href: '/memories', color: 'text-red-500', description: 'View memories' },
    { icon: Lightbulb, label: 'Ideas', href: '/ideas', color: 'text-yellow-500', description: 'Capture thoughts' },
    { icon: FileText, label: 'Notes', href: '/notes', color: 'text-indigo-500', description: 'Organize ideas' },
    { icon: Brain, label: 'Insights', href: '/insights', color: 'text-teal-500', description: 'AI analysis' }
  ]

  // Loading state for dashboard data
 if (analyticsLoading || summaryLoading) {
    return (
      <div className="container mx-auto px-4 py-6 space-y-6 min-h-screen">
        {/* Header Skeleton */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-48" />
          </div>
          <Skeleton className="h-11 w-48" />
        </div>

        {/* Stats Summary Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Daily Inspiration Skeleton */}
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-6 w-full" />
              <div className="flex justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-24 rounded-full" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions Skeleton */}
        <div className="space-y-4">
          <Skeleton className="h-6 w-32" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="text-center space-y-3">
                    <Skeleton className="h-12 w-12 rounded-lg mx-auto" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-16 mx-auto" />
                      <Skeleton className="h-3 w-20 mx-auto" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Main Content Skeleton */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Today's Planner</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center space-x-3">
                      <Skeleton className="h-5 w-5 rounded-full" />
                      <Skeleton className="h-4 flex-1" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Goals Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-8" />
                      </div>
                      <Skeleton className="h-2 w-full rounded-full" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Memories Vault</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center space-x-3">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="flex-1 space-y-1">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-3 w-1/2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Thoughts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[1, 2].map((i) => (
                    <div key={i} className="space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-3 w-3/4" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-6 space-y-6 min-h-screen">
      {/* Improved Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="notion-title font-serif text-2xl md:text-3xl">
            Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 17 ? 'afternoon' : 'evening'}, {displayName}
          </h1>
          <p className="text-muted-foreground">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <Button
          onClick={() => setShowVoiceInput(true)}
          className="gap-2 h-11 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
          size="default"
        >
          <Mic className="w-5 h-5" />
          Talk to Daksha
        </Button>
      </div>

      {/* Dashboard Stats Summary */}
      {summary && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-500">{summary.totalJournalEntries}</div>
              <div className="text-sm text-muted-foreground">Journal Entries</div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-orange-500">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-orange-500">{summary.currentStreak}</div>
              <div className="text-sm text-muted-foreground">Day Streak</div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-green-500">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-500">{summary.activeGoals}</div>
              <div className="text-sm text-muted-foreground">Active Goals</div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-purple-500">
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground truncate">{summary.recentActivity || 'No recent activity'}</div>
              <div className="text-xs text-muted-foreground">Recent Activity</div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Daily Inspiration */}
      <DailyInspiration />

      {/* Quick Actions - Improved Layout */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium">Quick Actions</h2>
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            View All
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Link key={index} href={action.href}>
              <Card className="hover:shadow-md transition-all cursor-pointer group h-full border-border/30 hover:border-primary/30">
                <CardContent className="p-6">
                  <div className="text-center space-y-3">
                    <div className="mx-auto w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                      <action.icon className={`w-6 h-6 ${action.color}`} />
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium text-sm">{action.label}</p>
                      <p className="text-xs text-muted-foreground leading-tight">{action.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Additional Widgets Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Mood Selector */}
        <MoodSelector />
        
        {/* Journal Prompts */}
        <JournalPrompts />
      </div>

      {/* Main Content - Improved 2 Column Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Today's Tasks */}
          <div className="h-fit">
            <TodayPlanner />
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
            <MemoriesVault />
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