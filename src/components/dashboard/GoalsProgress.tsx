"use client"

import { useState, useEffect } from 'react'
import { Target, TrendingUp, Calendar, CheckCircle2, Loader2, AlertCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useGoals } from '@/hooks/useDashboard'

interface Goal {
  id: string
  title: string
  content: string
  createdAt: string
}

export default function GoalsProgress() {
  const { goals, isLoading, error } = useGoals()

  // Calculate statistics based on goals
  const totalGoals = goals.length
  const averageProgress = goals.length > 0
    ? Math.round(goals.reduce((sum, goal) => 50, 0) / goals.length) // Placeholder progress calculation
    : 0
  const highPriorityGoals = goals.filter(goal =>
    goal.content.toLowerCase().includes('high') ||
    goal.title.toLowerCase().includes('high') ||
    goal.content.toLowerCase().includes('urgent') ||
    goal.title.toLowerCase().includes('urgent')
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

  if (error) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-green-500" />
            Goals Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-64">
          <div className="text-center">
            <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-2" />
            <p className="text-muted-foreground">Failed to load goals</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (isLoading) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-green-500" />
            Goals Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Stats Skeleton */}
          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="text-center p-3 bg-muted/50 rounded-lg">
                <Skeleton className="h-6 w-3/4 mx-auto mb-1" />
                <Skeleton className="h-3 w-1/2 mx-auto" />
              </div>
            ))}
          </div>

          {/* Goals List Skeleton */}
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-4 border border-border/50 rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-12 rounded-full" />
                    </div>
                    <Skeleton className="h-3 w-full mb-2" />
                    <Skeleton className="h-3 w-2/3" />
                  </div>
                  <Skeleton className="h-6 w-10 ml-3" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-3 w-8" />
                  </div>
                  <Skeleton className="h-2 w-full rounded-full" />
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions Skeleton */}
          <div className="pt-4 border-t border-border/30">
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-24 rounded-md" />
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-green-500" />
            Goals Progress
          </CardTitle>
          <Button variant="ghost" size="sm" className="gap-2" asChild>
            <a href="/goals">
              <TrendingUp className="w-4 h-4" />
              View All
            </a>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Overview Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="text-center p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
            <div className="text-2xl font-bold text-green-600 dark:text-green-300">{averageProgress}%</div>
            <div className="text-xs text-green-700 dark:text-green-400">Avg Progress</div>
          </div>
          <div className="text-center p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-300">{totalGoals}</div>
            <div className="text-xs text-blue-700 dark:text-blue-400">Active Goals</div>
          </div>
          <div className="text-center p-3 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800">
            <div className="text-2xl font-bold text-red-600 dark:text-red-300">{highPriorityGoals}</div>
            <div className="text-xs text-red-700 dark:text-red-400">High Priority</div>
          </div>
        </div>

        {/* Goals List */}
        <div className="space-y-4 max-h-80 overflow-y-auto">
          {goals.slice(0, 4).map((goal) => {
            const priority = getPriorityFromGoal(goal)
            const dueDate = getDueDateFromGoal(goal)
            const progress = getProgressFromGoal(goal)

            return (
              <div key={goal.id} className="p-4 border border-border/50 rounded-lg hover:border-border hover:shadow-sm transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-sm truncate">{goal.title.replace('[Goal] ', '')}</h4>
                      <Badge variant="outline" className={`text-xs ${getPriorityColor(priority)}`}>
                        {priority}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{goal.content.substring(0, 100)}...</p>
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

          {goals.length === 0 && (
            <div className="text-center py-8">
              <Target className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground text-sm">No active goals</p>
              <Button variant="ghost" size="sm" className="mt-2" asChild>
                <a href="/goals">Create your first goal</a>
              </Button>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-4 pt-4 border-t border-border/30">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Need motivation?</span>
            <Button variant="ghost" size="sm" className="gap-2 h-8" asChild>
              <a href="/goals">
                <CheckCircle2 className="w-3 h-3" />
                Update Progress
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}