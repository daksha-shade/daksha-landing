"use client"

import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { useDashboardAnalytics } from '@/hooks/useDashboard'
import { CheckCircle, Circle, TrendingUp, Calendar, Loader2 } from 'lucide-react'

interface Habit {
  id: string
  name: string
  description: string
  streak: number
  completionRate: number
  lastCompleted: Date | null
  createdAt: Date
}

interface HabitTrackerProps {
  className?: string
}

export default function HabitTracker({ className }: HabitTrackerProps) {
  const { data: analyticsData, isLoading } = useDashboardAnalytics('week')
  const [habits, setHabits] = useState<Habit[]>([])
  const [timeRange, setTimeRange] = useState<'week' | 'month'>('week')

  // Generate habit data from analytics
  useEffect(() => {
    if (analyticsData) {
      // Extract habit data from journal entries and goals
      const journalStats = analyticsData.journalStats
      const streakInfo = analyticsData.streakInfo
      
      // Create mock habits based on user data
      const mockHabits: Habit[] = [
        {
          id: '1',
          name: 'Daily Journaling',
          description: 'Write in your journal every day',
          streak: streakInfo.currentStreak,
          completionRate: Math.min(100, Math.round((journalStats.totalEntries / 30) * 100)),
          lastCompleted: streakInfo.lastEntryDate ? new Date(streakInfo.lastEntryDate) : null,
          createdAt: new Date('2024-01-01')
        },
        {
          id: '2',
          name: 'Morning Meditation',
          description: 'Practice mindfulness for 10 minutes',
          streak: Math.floor(Math.random() * 10),
          completionRate: Math.floor(Math.random() * 40) + 60,
          lastCompleted: new Date(Date.now() - Math.floor(Math.random() * 3) * 24 * 60 * 1000),
          createdAt: new Date('2024-01-15')
        },
        {
          id: '3',
          name: 'Exercise Routine',
          description: 'Complete your workout 3 times a week',
          streak: Math.floor(Math.random() * 7),
          completionRate: Math.floor(Math.random() * 30) + 70,
          lastCompleted: new Date(Date.now() - Math.floor(Math.random() * 5) * 24 * 60 * 1000),
          createdAt: new Date('2024-02-01')
        },
        {
          id: '4',
          name: 'Reading',
          description: 'Read for 30 minutes daily',
          streak: Math.floor(Math.random() * 15),
          completionRate: Math.floor(Math.random() * 50) + 50,
          lastCompleted: new Date(Date.now() - Math.floor(Math.random() * 2) * 24 * 60 * 1000),
          createdAt: new Date('2024-02-10')
        }
      ]
      
      setHabits(mockHabits)
    }
  }, [analyticsData])

  const toggleHabitCompletion = (habitId: string) => {
    setHabits(habits.map(habit => 
      habit.id === habitId 
        ? { 
            ...habit, 
            streak: habit.lastCompleted && new Date(habit.lastCompleted).toDateString() === new Date().toDateString() 
              ? habit.streak 
              : habit.streak + 1,
            completionRate: Math.min(100, habit.completionRate + 5),
            lastCompleted: new Date()
          } 
        : habit
    ))
  }

  const getCompletionColor = (rate: number) => {
    if (rate >= 80) return '#10B981' // green
    if (rate >= 60) return '#3B82F6' // blue
    if (rate >= 40) return '#F59E0B' // yellow
    return '#EF4444' // red
  }

  const formatDate = (date: Date | null) => {
    if (!date) return 'Never'
    
    const today = new Date()
    const diffInDays = Math.floor((today.getTime() - date.getTime()) / (1000 * 60 * 24))

    if (diffInDays === 0) return 'Today'
    if (diffInDays === 1) return 'Yesterday'
    if (diffInDays < 7) return `${diffInDays} days ago`
    return date.toLocaleDateString()
  }

  // Prepare data for the chart
  const chartData = habits.map(habit => ({
    name: habit.name,
    completion: habit.completionRate,
    streak: habit.streak
  }))

  if (isLoading) {
    return (
      <Card className={cn("h-full", className)}>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-500" />
            Habit Tracker
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-64">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={cn("h-full", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-500" />
            Habit Tracker
          </CardTitle>
          <div className="flex gap-1">
            <Button 
              variant={timeRange === 'week' ? 'default' : 'outline'} 
              size="sm" 
              className="h-8 text-xs"
              onClick={() => setTimeRange('week')}
            >
              Week
            </Button>
            <Button 
              variant={timeRange === 'month' ? 'default' : 'outline'} 
              size="sm" 
              className="h-8 text-xs"
              onClick={() => setTimeRange('month')}
            >
              Month
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Habits List */}
        <div className="space-y-3">
          {habits.map((habit) => (
            <div 
              key={habit.id} 
              className="p-3 border border-border/50 rounded-lg hover:border-border transition-colors group"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleHabitCompletion(habit.id)}
                      className="h-6 w-6 p-0"
                    >
                      {habit.lastCompleted && new Date(habit.lastCompleted).toDateString() === new Date().toDateString() ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <Circle className="w-4 h-4 text-muted-foreground" />
                      )}
                    </Button>
                    <h4 className="font-medium text-sm truncate">{habit.name}</h4>
                    <Badge variant="outline" className="text-xs">
                      {habit.streak} day streak
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{habit.description}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    <span>Last completed: {formatDate(habit.lastCompleted)}</span>
                  </div>
                </div>
                <div className="text-right ml-3">
                  <div className="text-lg font-bold" style={{ color: getCompletionColor(habit.completionRate) }}>
                    {habit.completionRate}%
                  </div>
                  <div className="text-xs text-muted-foreground">Completion</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-muted rounded-full h-2 mt-2">
                <div
                  className="h-2 rounded-full transition-all duration-300"
                  style={{ 
                    width: `${habit.completionRate}%`,
                    backgroundColor: getCompletionColor(habit.completionRate)
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Habits Chart */}
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12 }}
                tickMargin={10}
              />
              <YAxis 
                domain={[0, 100]} 
                tick={{ fontSize: 12 }}
                tickMargin={10}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip
                formatter={(value) => [`${value}%`, 'Completion Rate']}
                labelFormatter={(label) => `Habit: ${label}`}
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--background))',
                  borderColor: 'hsl(var(--border))',
                  borderRadius: '0.5rem',
                  fontSize: '0.75rem'
                }}
              />
              <Bar 
                dataKey="completion" 
                name="completion"
                radius={[4, 4, 0, 0]}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getCompletionColor(entry.completion)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Quick Actions */}
        <div className="pt-3 border-t border-border/30">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Ready to build new habits?</span>
            <Button variant="ghost" size="sm" className="gap-2 h-8">
              <TrendingUp className="w-3 h-3" />
              Add Habit
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}