"use client"

import { Target, TrendingUp, Calendar, CheckCircle2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface Goal {
  id: string
  title: string
  description: string
  progress: number
  dueDate: string
  priority: 'high' | 'medium' | 'low'
  category: string
  status: 'in-progress' | 'completed' | 'paused'
}

const mockGoals: Goal[] = [
  {
    id: '1',
    title: 'Launch Daksha MVP',
    description: 'Complete the minimum viable product',
    progress: 75,
    dueDate: 'Dec 15, 2024',
    priority: 'high',
    category: 'Product',
    status: 'in-progress'
  },
  {
    id: '2',
    title: 'YC Application',
    description: 'Submit Y Combinator application',
    progress: 90,
    dueDate: 'Dec 10, 2024',
    priority: 'high',
    category: 'Business',
    status: 'in-progress'
  },
  {
    id: '3',
    title: 'Daily Journaling',
    description: 'Maintain consistent daily journaling habit',
    progress: 60,
    dueDate: 'Ongoing',
    priority: 'medium',
    category: 'Personal',
    status: 'in-progress'
  },
  {
    id: '4',
    title: 'Learn TypeScript',
    description: 'Master TypeScript for better development',
    progress: 40,
    dueDate: 'Jan 31, 2025',
    priority: 'medium',
    category: 'Learning',
    status: 'in-progress'
  }
]

export default function GoalsProgress() {
  const totalGoals = mockGoals.length
  const averageProgress = Math.round(mockGoals.reduce((sum, goal) => sum + goal.progress, 0) / totalGoals)
  const highPriorityGoals = mockGoals.filter(goal => goal.priority === 'high').length

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
      case 'medium': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300'
      case 'low': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300'
    }
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500'
    if (progress >= 60) return 'bg-blue-500'
    if (progress >= 40) return 'bg-yellow-500'
    return 'bg-red-500'
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
          {mockGoals.slice(0, 4).map((goal) => (
            <div key={goal.id} className="p-4 border border-border/50 rounded-lg hover:border-border transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-sm truncate">{goal.title}</h4>
                    <Badge variant="outline" className={`text-xs ${getPriorityColor(goal.priority)}`}>
                      {goal.priority}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{goal.description}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    <span>{goal.dueDate}</span>
                    <span>•</span>
                    <span>{goal.category}</span>
                  </div>
                </div>
                <div className="text-right ml-3">
                  <div className="text-lg font-bold text-primary">{goal.progress}%</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span>Progress</span>
                  <span>{goal.progress}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(goal.progress)}`}
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
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