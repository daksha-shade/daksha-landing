"use client"

import { useState } from 'react'
import { Target, Plus, Calendar, TrendingUp, Loader2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useGoals, useCreateGoal } from '@/hooks/useDashboard'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'

export default function GoalsPage() {
  const [newGoal, setNewGoal] = useState({
    title: "",
    description: "",
    targetDate: "",
    priority: "medium"
  })
  const [isCreating, setIsCreating] = useState(false)
  const [showForm, setShowForm] = useState(false)
  
  const { goals, isLoading, error, refresh } = useGoals()
  const { createGoal } = useCreateGoal()

  const handleCreateGoal = async () => {
    if (!newGoal.title.trim()) return
    
    setIsCreating(true)
    try {
      await createGoal({
        title: newGoal.title,
        description: newGoal.description,
        targetDate: newGoal.targetDate,
        priority: newGoal.priority
      })
      
      // Reset form
      setNewGoal({
        title: "",
        description: "",
        targetDate: "",
        priority: "medium"
      })
      setShowForm(false)
    } catch (err) {
      console.error("Failed to create goal:", err)
    } finally {
      setIsCreating(false)
    }
  }

  // Calculate statistics
  const activeGoals = goals.length
  const averageProgress = goals.length > 0 
    ? Math.round(goals.reduce((sum) => sum + 50, 0) / goals.length) // Placeholder for now
    : 0
  
  const highPriorityGoals = goals.filter(goal => 
    goal.content.toLowerCase().includes('high') || 
    goal.content.toLowerCase().includes('urgent')
  ).length

  // Extract goal details from content
  const parseGoalContent = (content: string) => {
    const lines = content.split('\n')
    let description = ''
    let priority = 'medium'
    let targetDate = 'No due date'
    
    for (const line of lines) {
      if (line.startsWith('Priority:')) {
        priority = line.replace('Priority:', '').trim()
      } else if (line.startsWith('Target Date:')) {
        targetDate = line.replace('Target Date:', '').trim()
      } else if (line.startsWith('Description:')) {
        // Description starts after this line
        const descIndex = lines.indexOf(line)
        if (descIndex !== -1) {
          description = lines.slice(descIndex + 1).join('\n').trim()
          // Stop at Progress section
          const progressIndex = description.indexOf('Progress:')
          if (progressIndex !== -1) {
            description = description.substring(0, progressIndex).trim()
          }
        }
      }
    }
    
    return { description, priority, targetDate }
  }

  if (error) {
    return (
      <div className="notion-page py-12 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Target className="w-6 h-6 text-green-500" />
            <h1 className="notion-title font-serif">Goals</h1>
          </div>
        </div>
        
        <Card>
          <CardContent className="flex items-center justify-center p-12">
            <div className="text-center">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Error Loading Goals</h3>
              <p className="text-muted-foreground mb-4">There was an issue loading your goals. Please try again.</p>
              <Button onClick={() => refresh()}>Retry</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="notion-page py-12 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Target className="w-6 h-6 text-green-500" />
          <h1 className="notion-title font-serif">Goals</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="notion" 
            size="sm" 
            className="gap-2"
            onClick={() => setShowForm(!showForm)}
          >
            <Plus className="w-4 h-4" />
            {showForm ? "Cancel" : "Add Goal"}
          </Button>
        </div>
      </div>

      {/* Add New Goal Form */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Goal</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Goal Title</label>
              <Input
                placeholder="What do you want to achieve?"
                value={newGoal.title}
                onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea
                placeholder="Describe your goal in more detail..."
                value={newGoal.description}
                onChange={(e) => setNewGoal({...newGoal, description: e.target.value})}
                rows={3}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Target Date</label>
                <Input
                  type="date"
                  value={newGoal.targetDate}
                  onChange={(e) => setNewGoal({...newGoal, targetDate: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Priority</label>
                <select
                  className="w-full p-2 border rounded-md bg-background"
                  value={newGoal.priority}
                  onChange={(e) => setNewGoal({...newGoal, priority: e.target.value})}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end gap-2">
              <Button 
                variant="outline" 
                onClick={() => setShowForm(false)}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleCreateGoal}
                disabled={isCreating || !newGoal.title.trim()}
              >
                {isCreating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : "Create Goal"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Goals Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {isLoading ? (
          <>
            <Skeleton className="h-24 rounded-lg" />
            <Skeleton className="h-24 rounded-lg" />
            <Skeleton className="h-24 rounded-lg" />
          </>
        ) : (
          <>
            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium text-green-900 dark:text-green-100 mb-2">Active Goals</h3>
                <p className="text-2xl font-bold text-green-700 dark:text-green-300">{activeGoals}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Average Progress</h3>
                <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">{averageProgress}%</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium text-purple-900 dark:text-purple-100 mb-2">High Priority</h3>
                <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">{highPriorityGoals}</p>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* Goals List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium">Current Goals</h2>
          <Badge variant="secondary">{activeGoals} goals</Badge>
        </div>
        
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-8 w-16 rounded-full" />
                    </div>
                    <Skeleton className="h-2 w-full rounded-full" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : goals.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-12 text-center">
              <Target className="w-12 h-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No Goals Yet</h3>
              <p className="text-muted-foreground mb-4">Start by creating your first goal to track your progress.</p>
              <Button onClick={() => setShowForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Goal
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {goals.map((goal) => {
              const { description, priority, targetDate } = parseGoalContent(goal.content)
              const progress = 30 // Placeholder progress
              
              return (
                <Card key={goal.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">{goal.title.replace('[Goal] ', '')}</h3>
                        {description && (
                          <p className="text-muted-foreground mb-3">{description}</p>
                        )}
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>Due: {targetDate}</span>
                          </div>
                          <Badge 
                            variant="outline" 
                            className={`${
                              priority === 'high' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' :
                              priority === 'medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300' :
                              'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                            }`}
                          >
                            {priority} priority
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary mb-1">{progress}%</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Progress</span>
                        <span>{progress}%</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}