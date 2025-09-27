"use client"

import { useState, useEffect } from 'react'
import { Target, TrendingUp, Calendar, CheckCircle2, Loader2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useGoals } from '@/hooks/useDashboard'

interface Goal {
  id: string
  title: string
 content: string
 createdAt: string
}

export default function GoalsProgress() {
  const { goals, isLoading } = useGoals()
  
  // Calculate statistics based on goals
  const totalGoals = goals.length
  const averageProgress = goals.length > 0 
    ? Math.round(goals.reduce((sum, goal) => 50, 0) / goals.length) // Placeholder progress calculation
    : 0 
  const highPriorityGoals = goals.filter(goal => 
    goal.title.toLowerCase().includes('high') || 
    goal.content.toLowerCase().includes('high') ||
    goal.title.toLowerCase().includes('urgent') ||
    goal.content.toLowerCase().includes('urgent')
  ).length

  const getPriorityColor = (priority: string) => {
    if (priority.includes('high') || priority.includes('urgent')) return 'bg-red-100 text-red-700 dark:bg-red-90/30 dark:text-red-300'
    if (priority.includes('medium')) return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300'
    return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500'
    if (progress >= 60) return 'bg-blue-500'
    if (progress >= 40) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  // Extract priority from goal content (placeholder logic)
  const getPriorityFromGoal = (goal: Goal): string => {
    if (goal.content.toLowerCase().includes('high') || goal.title.toLowerCase().includes('high') ||
        goal.content.toLowerCase().includes('urgent') || goal.title.toLowerCase().includes('urgent')) return 'high'
    if (goal.content.toLowerCase().includes('medium') || goal.title.toLowerCase().includes('medium')) return 'medium'
    if (goal.content.toLowerCase().includes('low') || goal.title.toLowerCase().includes('low')) return 'low'
    return 'medium' // default
  }

  // Extract due date from goal content (placeholder logic)
  const getDueDateFromGoal = (goal: Goal): string => {
    const dateMatch = goal.content.match(/\b\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}|\b\d{4}-\d{2}-\d{2}\b/)
    return dateMatch ? dateMatch[0] : 'Ongoing'
  }

  // Extract progress from goal content (placeholder logic)
  const getProgressFromGoal = (goal: Goal): number => {
    const progressMatch = goal.content.match(/progress:\s*(\d+)%/i)
    return progressMatch ? parseInt(progressMatch[1]) : 50 // default to 50%
  }

  if (isLoading) {
    return (
      <Card className="h-full">
        <CardContent className="p-6 flex items-center justify-center h-64">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="h-full">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-green-500" />
            <h3 className="text-lg font-semibold">Goals Progress</h3>
          </div>
          <Button variant="ghost" size="sm" className="gap-2">
            <TrendingUp className="w-4 h-4" />
            View All
          </Button>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{averageProgress}%</div>
            <div className="text-xs text-muted-foreground">Avg Progress</div>
          </div>
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{totalGoals}</div>
            <div className="text-xs text-muted-foreground">Active Goals</div>
          </div>
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="text-2xl font-bold text-red-600">{highPriorityGoals}</div>
            <div className="text-xs text-muted-foreground">High Priority</div>
          </div>
        </div>

        {/* Goals List */}
        <div className="space-y-4 max-h-80 overflow-y-auto">
          {goals.slice(0, 4).map((goal) => {
            const priority = getPriorityFromGoal(goal)
            const dueDate = getDueDateFromGoal(goal)
            const progress = getProgressFromGoal(goal)
            
            return (
              <div key={goal.id} className="p-4 border border-border/50 rounded-lg hover:border-border transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-sm truncate">{goal.title.replace('[Goal] ', '')}</h4>
                      <Badge variant="outline" className={`text-xs ${getPriorityColor(priority)}`}>
                        {priority}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{goal.content.substring(0, 100)}...</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      <span>{dueDate}</span>
                    </div>
                  </div>
                  <div className="text-right ml-3">
                    <div className="text-lg font-bold text-primary">{progress}%</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span>Progress</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(progress)}`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Quick Actions */}
        <div className="mt-4 pt-4 border-t border-border/30">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Need motivation?</span>
            <Button variant="ghost" size="sm" className="gap-2 h-8">
              <CheckCircle2 className="w-3 h-3" />
              Update Progress
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}