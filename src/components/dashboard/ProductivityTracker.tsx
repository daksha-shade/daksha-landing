"use client"

import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useDashboardAnalytics } from '@/hooks/useDashboard'

interface ProductivityData {
  date: string
  productivity: number
  tasksCompleted: number
  journalEntries: number
}

interface ProductivityTrackerProps {
  className?: string
}

export default function ProductivityTracker({ className }: ProductivityTrackerProps) {
  const { data: analyticsData, isLoading } = useDashboardAnalytics('week')
  const [productivityData, setProductivityData] = useState<ProductivityData[]>([])
  const [timeRange, setTimeRange] = useState<'week' | 'month'>('week')

  // Generate productivity data from analytics
  useEffect(() => {
    if (analyticsData) {
      // Generate mock data for demonstration
      const mockData: ProductivityData[] = []
      const days = timeRange === 'week' ? 7 : 30
      
      for (let i = days - 1; i >= 0; i--) {
        const date = new Date()
        date.setDate(date.getDate() - i)
        
        // Generate realistic productivity data
        const productivity = Math.floor(Math.random() * 40) + 60 // 60-100%
        const tasksCompleted = Math.floor(Math.random() * 5) + 1 // 1-5 tasks
        const journalEntries = Math.floor(Math.random() * 3) + 1 // 1-3 entries
        
        mockData.push({
          date: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
          productivity,
          tasksCompleted,
          journalEntries
        })
      }
      
      setProductivityData(mockData)
    }
  }, [analyticsData, timeRange])

  // Calculate productivity metrics
  const averageProductivity = productivityData.length > 0 
    ? Math.round(productivityData.reduce((sum, day) => sum + day.productivity, 0) / productivityData.length)
    : 0
  
  const totalTasksCompleted = productivityData.reduce((sum, day) => sum + day.tasksCompleted, 0)
  const totalJournalEntries = productivityData.reduce((sum, day) => sum + day.journalEntries, 0)

  const getColor = (value: number) => {
    if (value >= 80) return '#10B981' // green
    if (value >= 60) return '#3B82F6' // blue
    return '#EF4444' // red
  }

  if (isLoading) {
    return (
      <Card className={cn("h-full", className)}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">Productivity Tracker</CardTitle>
            <div className="flex gap-1">
              <Button variant="outline" size="sm" className="h-8 text-xs">Week</Button>
              <Button variant="outline" size="sm" className="h-8 text-xs">Month</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-64">
          <div className="text-center space-y-4">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-muted-foreground">Loading productivity data...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={cn("h-full", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Productivity Tracker</CardTitle>
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
        {/* Stats Summary */}
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{averageProductivity}%</div>
            <div className="text-xs text-muted-foreground">Avg Productivity</div>
          </div>
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{totalTasksCompleted}</div>
            <div className="text-xs text-muted-foreground">Tasks Completed</div>
          </div>
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{totalJournalEntries}</div>
            <div className="text-xs text-muted-foreground">Journal Entries</div>
          </div>
        </div>

        {/* Chart */}
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={productivityData}
              margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="date" 
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
                formatter={(value, name) => {
                  if (name === 'productivity') return [`${value}%`, 'Productivity']
                  if (name === 'tasksCompleted') return [value, 'Tasks Completed']
                  if (name === 'journalEntries') return [value, 'Journal Entries']
                  return [value, name]
                }}
                labelFormatter={(label) => `Date: ${label}`}
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--background))',
                  borderColor: 'hsl(var(--border))',
                  borderRadius: '0.5rem',
                  fontSize: '0.75rem'
                }}
              />
              <Bar 
                dataKey="productivity" 
                name="productivity"
                radius={[4, 4, 0, 0]}
              >
                {productivityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getColor(entry.productivity)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Insights */}
        <div className="p-3 bg-muted/30 rounded-lg border border-border/30">
          <h4 className="text-sm font-medium mb-2">Productivity Insights</h4>
          <p className="text-xs text-muted-foreground">
            {averageProductivity >= 80 
              ? "You're doing great! Your productivity is consistently high. Keep up the good work!"
              : averageProductivity >= 60 
                ? "Good progress! Try to maintain a consistent routine to boost your productivity."
                : "There's room for improvement. Consider setting smaller daily goals to build momentum."}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}