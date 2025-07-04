"use client"

import { useState } from 'react'
import { 
  Brain, 
  Sparkles, 
  Calendar, 
  Clock, 
  TrendingUp, 
  Heart,
  Zap,
  MessageCircle,
  Edit3,
  Mic,
  Send
} from 'lucide-react'
import { NotionCard, NotionCardContent, NotionCardHeader, NotionCardTitle, NotionCardDescription } from '@/components/ui/notion-card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'

export default function DashboardMain() {
  const [journalEntry, setJournalEntry] = useState("")
  const [dakshaInput, setDakshaInput] = useState("")

  const todayDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      {/* Greeting Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-serif font-bold text-foreground">
              Good morning, Shaswat ✨
            </h1>
            <p className="text-muted-foreground font-inter mt-1">{todayDate}</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="gap-1">
              <Heart className="w-3 h-3 text-red-500" />
              Focused
            </Badge>
            <Badge variant="outline" className="gap-1">
              <Zap className="w-3 h-3 text-yellow-500" />
              7-day streak
            </Badge>
          </div>
        </div>

        {/* Daksha's Insight */}
        <NotionCard className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
          <NotionCardContent className="flex items-start gap-4">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
              <Brain className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground mb-2">
                I see you're working on Daksha and prepping for YC. Your energy feels focused today.
              </p>
              <p className="text-sm text-muted-foreground">
                Want to start with a quick reflection on yesterday's progress, or shall we dive into today's priorities?
              </p>
            </div>
          </NotionCardContent>
        </NotionCard>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Journal & Memory */}
        <div className="lg:col-span-2 space-y-6">
          {/* Today's Journal */}
          <NotionCard>
            <NotionCardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Edit3 className="w-4 h-4 text-primary" />
                  <NotionCardTitle>Today's Journal</NotionCardTitle>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Mic className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Sparkles className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <NotionCardDescription>
                What's on your mind today? Let your thoughts flow...
              </NotionCardDescription>
            </NotionCardHeader>
            <NotionCardContent>
              <Textarea
                placeholder="Start writing... (or press / for AI suggestions)"
                value={journalEntry}
                onChange={(e) => setJournalEntry(e.target.value)}
                className="min-h-[200px] resize-none border-0 focus:ring-0 text-base leading-relaxed"
              />
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>Auto-saved 2 min ago</span>
                  <span>•</span>
                  <span>{journalEntry.length} characters</span>
                </div>
                <Button size="sm" className="gap-2">
                  <Send className="w-3 h-3" />
                  Save Entry
                </Button>
              </div>
            </NotionCardContent>
          </NotionCard>

          {/* Memory Highlights */}
          <NotionCard>
            <NotionCardHeader>
              <div className="flex items-center gap-2">
                <Brain className="w-4 h-4 text-purple-500" />
                <NotionCardTitle>Memory Highlights</NotionCardTitle>
              </div>
              <NotionCardDescription>
                Insights and patterns from your recent entries
              </NotionCardDescription>
            </NotionCardHeader>
            <NotionCardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-medium mb-2">This Week's Theme</h4>
                  <p className="text-sm text-muted-foreground">
                    "Building and creating" - You've mentioned product development 12 times
                  </p>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-medium mb-2">Mood Pattern</h4>
                  <p className="text-sm text-muted-foreground">
                    Most productive in mornings, reflective in evenings
                  </p>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-medium mb-2">Goal Progress</h4>
                  <p className="text-sm text-muted-foreground">
                    YC application: 90% complete, on track for deadline
                  </p>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-medium mb-2">Inspiration Quote</h4>
                  <p className="text-sm text-muted-foreground italic">
                    "The best way to predict the future is to create it"
                  </p>
                </div>
              </div>
            </NotionCardContent>
          </NotionCard>
        </div>

        {/* Right Column - Quick Actions & Stats */}
        <div className="space-y-6">
          {/* Talk to Daksha */}
          <NotionCard>
            <NotionCardHeader>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-green-500" />
                <NotionCardTitle>Talk to Daksha</NotionCardTitle>
              </div>
            </NotionCardHeader>
            <NotionCardContent className="space-y-4">
              <div className="space-y-3">
                <div className="p-3 bg-muted/30 rounded-lg">
                  <p className="text-sm">💡 "Summarize my week"</p>
                </div>
                <div className="p-3 bg-muted/30 rounded-lg">
                  <p className="text-sm">🎯 "Break down my YC prep"</p>
                </div>
                <div className="p-3 bg-muted/30 rounded-lg">
                  <p className="text-sm">🧠 "What patterns do you see?"</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Ask anything..."
                  value={dakshaInput}
                  onChange={(e) => setDakshaInput(e.target.value)}
                  className="flex-1"
                />
                <Button size="icon">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </NotionCardContent>
          </NotionCard>

          {/* Today's Schedule */}
          <NotionCard>
            <NotionCardHeader>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-500" />
                <NotionCardTitle>Today's Schedule</NotionCardTitle>
              </div>
            </NotionCardHeader>
            <NotionCardContent className="space-y-3">
              <div className="flex items-center gap-3 p-2 rounded-md">
                <div className="w-2 h-8 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Team Standup</p>
                  <p className="text-xs text-muted-foreground">9:00 AM - 9:30 AM</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-2 rounded-md bg-accent/50">
                <div className="w-2 h-8 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Deep Work: Dashboard</p>
                  <p className="text-xs text-muted-foreground">10:00 AM - 12:00 PM</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-2 rounded-md">
                <div className="w-2 h-8 bg-orange-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">YC Application Review</p>
                  <p className="text-xs text-muted-foreground">2:00 PM - 4:00 PM</p>
                </div>
              </div>
            </NotionCardContent>
          </NotionCard>

          {/* Quick Stats */}
          <NotionCard>
            <NotionCardHeader>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-500" />
                <NotionCardTitle>Your Progress</NotionCardTitle>
              </div>
            </NotionCardHeader>
            <NotionCardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">7</div>
                  <div className="text-xs text-muted-foreground">Day Streak</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-500">23</div>
                  <div className="text-xs text-muted-foreground">Entries</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-500">5</div>
                  <div className="text-xs text-muted-foreground">Goals</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-500">12</div>
                  <div className="text-xs text-muted-foreground">Insights</div>
                </div>
              </div>
            </NotionCardContent>
          </NotionCard>
        </div>
      </div>
    </div>
  )
}