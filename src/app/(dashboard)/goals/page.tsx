"use client"

import { useState } from 'react'
import { Target, Plus, Calendar, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'

export default function GoalsPage() {
  const [newGoal, setNewGoal] = useState("")

  const goals = [
    {
      title: "Launch Daksha MVP",
      description: "Complete the minimum viable product for Daksha",
      progress: 75,
      dueDate: "Dec 15, 2024",
      status: "in-progress"
    },
    {
      title: "YC Application",
      description: "Submit Y Combinator application",
      progress: 90,
      dueDate: "Dec 10, 2024",
      status: "in-progress"
    },
    {
      title: "Daily Journaling Habit",
      description: "Maintain consistent daily journaling",
      progress: 60,
      dueDate: "Ongoing",
      status: "in-progress"
    }
  ]

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Target className="w-6 h-6 text-green-500" />
          <h1 className="text-2xl font-serif font-semibold">Goals</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="notion" size="sm" className="gap-2">
            <TrendingUp className="w-4 h-4" />
            Progress
          </Button>
          <Button variant="notion" size="sm" className="gap-2">
            <Calendar className="w-4 h-4" />
            Timeline
          </Button>
        </div>
      </div>

      {/* Add New Goal */}
      <div className="bg-background border border-border/30 rounded-lg p-4">
        <div className="flex gap-2">
          <Input
            placeholder="Add a new goal..."
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
            className="flex-1 border-border/30"
          />
          <Button variant="notion" size="sm" className="gap-2">
            <Plus className="w-4 h-4" />
            Add Goal
          </Button>
        </div>
      </div>

      {/* Goals Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
          <h3 className="font-medium text-green-900 dark:text-green-100 mb-2">Active Goals</h3>
          <p className="text-2xl font-bold text-green-700 dark:text-green-300">3</p>
        </div>
        <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Average Progress</h3>
          <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">75%</p>
        </div>
        <div className="p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200 dark:border-purple-800">
          <h3 className="font-medium text-purple-900 dark:text-purple-100 mb-2">Due This Week</h3>
          <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">2</p>
        </div>
      </div>

      {/* Goals List */}
      <div className="space-y-4">
        <h2 className="text-lg font-medium">Current Goals</h2>
        <div className="space-y-4">
          {goals.map((goal, index) => (
            <div key={index} className="p-6 bg-background border border-border/30 rounded-lg hover:border-border/50 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">{goal.title}</h3>
                  <p className="text-muted-foreground mb-3">{goal.description}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Due: {goal.dueDate}</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      goal.status === 'in-progress' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' :
                      goal.status === 'completed' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' :
                      'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300'
                    }`}>
                      {goal.status.replace('-', ' ')}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary mb-1">{goal.progress}%</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Progress</span>
                  <span>{goal.progress}%</span>
                </div>
                <Progress value={goal.progress} className="h-2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}