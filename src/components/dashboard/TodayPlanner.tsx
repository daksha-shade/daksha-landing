"use client"

import { Calendar, Clock, CheckCircle2, AlertCircle, ChevronRight, Plus } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { PlannerTask } from '@/lib/dashboard-data'
import { cn } from '@/lib/utils'

interface TodayPlannerProps {
  tasks: PlannerTask[]
  onTaskToggle?: (taskId: string) => void
  className?: string
}

export default function TodayPlanner({ tasks, onTaskToggle, className }: TodayPlannerProps) {
  const completedTasks = tasks.filter(task => task.completed)
  const pendingTasks = tasks.filter(task => !task.completed)
  const completionPercentage = tasks.length > 0 ? Math.round((completedTasks.length / tasks.length) * 100) : 0

  const getPriorityColor = (priority: PlannerTask['priority']) => {
    switch (priority) {
      case 'high':
        return 'text-red-500 bg-red-50 dark:bg-red-950/20'
      case 'medium':
        return 'text-yellow-500 bg-yellow-50 dark:bg-yellow-950/20'
      case 'low':
        return 'text-green-500 bg-green-50 dark:bg-green-950/20'
      default:
        return 'text-gray-500 bg-gray-50 dark:bg-gray-950/20'
    }
  }

  const getTypeIcon = (type: PlannerTask['type']) => {
    switch (type) {
      case 'meeting':
        return '🤝'
      case 'task':
        return '📋'
      case 'reminder':
        return '⏰'
      case 'event':
        return '📅'
      default:
        return '📝'
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  }

  const isOverdue = (task: PlannerTask) => {
    return !task.completed && task.startTime < new Date()
  }

  const handleTaskToggle = (taskId: string) => {
    if (onTaskToggle) {
      onTaskToggle(taskId)
    }
  }

  return (
    <Card className={cn("", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-500" />
            Today's Plan
          </CardTitle>
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            <Plus className="w-4 h-4 mr-1" />
            Add Task
          </Button>
        </div>

        {/* Progress Summary */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {completedTasks.length} of {tasks.length} completed
          </p>
          <Badge variant={completionPercentage === 100 ? "default" : "secondary"}>
            {completionPercentage}%
          </Badge>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Pending Tasks */}
        {pendingTasks.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-muted-foreground">Pending</h4>
            {pendingTasks.map((task) => (
              <div
                key={task.id}
                className={cn(
                  "flex items-start gap-3 p-3 rounded-lg border transition-all duration-200 hover:border-border/60",
                  isOverdue(task) ? "border-red-200 bg-red-50/50 dark:border-red-800 dark:bg-red-950/10" : "border-border/30"
                )}
              >
                <Checkbox
                  checked={task.completed}
                  onCheckedChange={() => handleTaskToggle(task.id)}
                  className="mt-0.5"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm">{getTypeIcon(task.type)}</span>
                    <h5 className={cn(
                      "font-medium text-sm",
                      task.completed && "line-through text-muted-foreground"
                    )}>
                      {task.title}
                    </h5>
                    {isOverdue(task) && (
                      <AlertCircle className="w-4 h-4 text-red-500" />
                    )}
                  </div>

                  {task.description && (
                    <p className="text-xs text-muted-foreground mb-2">
                      {task.description}
                    </p>
                  )}

                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatTime(task.startTime)}
                      {task.endTime && ` - ${formatTime(task.endTime)}`}
                    </span>

                    <Badge
                      variant="outline"
                      className={cn("text-xs", getPriorityColor(task.priority))}
                    >
                      {task.priority}
                    </Badge>

                    <Badge variant="outline" className="text-xs">
                      {task.category}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Completed Tasks */}
        {completedTasks.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              Completed ({completedTasks.length})
            </h4>
            {completedTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-start gap-3 p-3 rounded-lg border border-border/30 bg-muted/30"
              >
                <Checkbox
                  checked={task.completed}
                  onCheckedChange={() => handleTaskToggle(task.id)}
                  className="mt-0.5"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm">{getTypeIcon(task.type)}</span>
                    <h5 className="font-medium text-sm line-through text-muted-foreground">
                      {task.title}
                    </h5>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatTime(task.startTime)}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {task.category}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {tasks.length === 0 && (
          <div className="text-center py-6">
            <Calendar className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">No tasks scheduled for today</p>
            <Button variant="ghost" size="sm" className="mt-2">
              <Plus className="w-4 h-4 mr-1" />
              Add your first task
            </Button>
          </div>
        )}

        {/* Quick Actions */}
        {tasks.length > 0 && (
          <div className="pt-3 border-t border-border/30">
            <Button variant="ghost" size="sm" className="w-full justify-between">
              View Full Schedule
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}