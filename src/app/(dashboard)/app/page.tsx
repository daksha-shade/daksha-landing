"use client"

import { useUser } from '@stackframe/stack'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { useState } from 'react'
import { 
  BookOpen, 
  Brain, 
  Bot,
  Target, 
  MessageCircle, 
  Grid3X3,
  Archive,
  TrendingUp,
  Activity,
  Plus,
  ArrowRight,
  Zap,
  Heart,
  CheckCircle2,
  Edit3,
  Mic
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/badge'
import FullScreenVoiceInput from '@/components/dashboard/FullScreenVoiceInput'

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
  const currentTime = new Date().toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  })
  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long',
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })

  const quickActions = [
    { icon: BookOpen, label: 'Journal', href: '/journal', color: 'text-blue-500', description: 'Write your thoughts' },
    { icon: Brain, label: 'Mind', href: '/mind', color: 'text-purple-500', description: 'Organize memories' },
    { icon: Bot, label: 'Talk with Daksha', href: '/livekit', color: 'text-blue-500', description: 'Voice conversation with your AI companion' },
    { icon: Target, label: 'Goals', href: '/goals', color: 'text-green-500', description: 'Track progress' },
    { icon: MessageCircle, label: 'Chat', href: '/chat', color: 'text-orange-500', description: 'Talk to Daksha' },
    { icon: Grid3X3, label: 'Apps', href: '/apps', color: 'text-indigo-500', description: 'Connected services' },
    { icon: Archive, label: 'Archive', href: '/archive', color: 'text-gray-500', description: 'Past entries' },
  ]

  const recentActivity = [
    { type: 'journal', content: 'Reflected on morning routine', time: '2 hours ago', icon: BookOpen },
    { type: 'goal', content: 'Updated fitness goal progress', time: '5 hours ago', icon: Target },
    { type: 'chat', content: 'Asked Daksha about productivity tips', time: '1 day ago', icon: MessageCircle },
  ]

  const todayStats = [
    { label: 'Journal Entries', value: '2', icon: BookOpen, change: '+1' },
    { label: 'Goals Completed', value: '3/5', icon: Target, change: '+2' },
    { label: 'Chat Sessions', value: '4', icon: MessageCircle, change: '+1' },
    { label: 'Apps Connected', value: '8', icon: Grid3X3, change: '0' },
  ]

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-8 space-y-8">
      {/* Header Section */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="notion-title font-serif text-foreground">
              Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 17 ? 'afternoon' : 'evening'}, {displayName}
            </h1>
            <p className="text-muted-foreground mt-1">
              {currentDate} - {currentTime}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              onClick={() => setShowVoiceInput(true)}
              className="gap-2"
            >
              <Mic className="w-4 h-4" />
              Talk to Daksha
            </Button>
          </div>
        </div>
      </div>

      {/* Today's Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {todayStats.map((stat, index) => (
          <Card key={index} className="p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <stat.icon className="w-5 h-5 text-muted-foreground" />
                {stat.change !== '0' && (
                  <Badge variant="secondary" className="text-xs">
                    {stat.change}
                  </Badge>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Quick Actions</h2>
          <Button variant="ghost" size="sm" className="gap-2">
            <Plus className="w-4 h-4" />
            Customize
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
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
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Focus */}
        <Card className="p-6 lg:col-span-2">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                Today's Focus
              </h3>
              <Button variant="ghost" size="sm" className="gap-2">
                <Edit3 className="w-4 h-4" />
                Edit
              </Button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-accent/30">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span className="flex-1">Complete morning journal entry</span>
                <Badge variant="secondary">Done</Badge>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg border border-dashed border-border">
                <div className="w-5 h-5 rounded-full border-2 border-muted-foreground" />
                <span className="flex-1 text-muted-foreground">Review weekly goals progress</span>
                <Button size="sm" variant="outline">
                  Start
                </Button>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg border border-dashed border-border">
                <div className="w-5 h-5 rounded-full border-2 border-muted-foreground" />
                <span className="flex-1 text-muted-foreground">Plan tomorrow's priorities</span>
                <Button size="sm" variant="outline">
                  Start
                </Button>
              </div>
            </div>
            <Button className="w-full gap-2">
              <Plus className="w-4 h-4" />
              Add Focus Item
            </Button>
          </div>
        </Card>

        {/* Recent Activity */}
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-500" />
                Recent Activity
              </h3>
              <Button variant="ghost" size="sm" className="gap-2">
                View All
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent/30 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-accent/50 flex items-center justify-center flex-shrink-0">
                    <activity.icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{activity.content}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Insights */}
      <Card className="p-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-500" />
            Quick Insights
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 rounded-lg bg-green-50 dark:bg-green-950/20">
              <Heart className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <p className="font-medium text-green-700 dark:text-green-300">Mood Trend</p>
              <p className="text-sm text-green-600 dark:text-green-400">Improving this week</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20">
              <Target className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <p className="font-medium text-blue-700 dark:text-blue-300">Goal Progress</p>
              <p className="text-sm text-blue-600 dark:text-blue-400">60% completed</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-purple-50 dark:bg-purple-950/20">
              <Brain className="w-8 h-8 text-purple-500 mx-auto mb-2" />
              <p className="font-medium text-purple-700 dark:text-purple-300">Memory Palace</p>
              <p className="text-sm text-purple-600 dark:text-purple-400">24 new memories</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Full Screen Voice Input */}
      <FullScreenVoiceInput 
        isOpen={showVoiceInput}
        onClose={() => setShowVoiceInput(false)}
      />
    </div>
  )
}