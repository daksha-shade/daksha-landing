"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { useDashboardAnalytics } from '@/hooks/useDashboard'
import { Calendar, Clock, FileText, Target, Lightbulb, Loader2, TrendingUp } from 'lucide-react'

interface Activity {
  id: string
  type: string
  title: string
  description: string
  timestamp: Date
  icon: React.ReactNode
  color: string
}

interface RecentActivitiesProps {
  className?: string
}

export default function RecentActivities({ className }: RecentActivitiesProps) {
  const { data: analyticsData, isLoading } = useDashboardAnalytics('week')
  const [activities, setActivities] = useState<Activity[]>([])

  // Generate activity data from analytics
  useEffect(() => {
    if (analyticsData) {
      const journalStats = analyticsData.journalStats
      const goalStats = analyticsData.goalStats
      const thoughtStats = analyticsData.thoughtStats
      
      // Create activities based on user data
      const recentActivities: Activity[] = analyticsData.recentActivities.map(activity => {
        let icon = <FileText className="w-4 h-4" />
        let color = 'bg-gray-500'
        
        switch (activity.type) {
          case 'journal':
            icon = <FileText className="w-4 h-4" />
            color = 'bg-blue-500'
            break
          case 'goal':
            icon = <Target className="w-4 h-4" />
            color = 'bg-green-500'
            break
        }
        
        return {
          id: activity.id,
          type: activity.type,
          title: activity.title,
          description: activity.subtitle,
          timestamp: new Date(activity.timestamp),
          icon,
          color
        }
      })
      
      setActivities(recentActivities)
    }
  }, [analyticsData])

  const formatTime = (date: Date) => {
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    const diffInDays = Math.floor(diffInHours / 24)

    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInDays < 7) return `${diffInDays}d ago`
    return date.toLocaleDateString()
  }

  const getActivityTypeConfig = (type: string) => {
    switch (type) {
      case 'journal':
        return { icon: <FileText className="w-4 h-4" />, color: 'bg-blue-500', label: 'Journal' }
      case 'goal':
        return { icon: <Target className="w-4 h-4" />, color: 'bg-green-500', label: 'Goal' }
      default:
        return { icon: <FileText className="w-4 h-4" />, color: 'bg-gray-500', label: 'Activity' }
    }
  }

  if (isLoading) {
    return (
      <Card className={cn("h-full", className)}>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold">Recent Activities</CardTitle>
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
        <CardTitle className="text-lg font-semibold">Recent Activities</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => {
          const config = getActivityTypeConfig(activity.type)
          
          return (
            <div 
              key={activity.id} 
              className="p-3 border border-border/50 rounded-lg hover:border-border transition-colors group"
            >
              <div className="flex items-start gap-3">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${config.color} text-white`}>
                  {config.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-sm truncate">{activity.title}</h4>
                    <Badge variant="outline" className="text-xs">
                      {config.label}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{activity.description}</p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>{formatTime(activity.timestamp)}</span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
        
        {activities.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Clock className="w-8 h-8 mx-auto mb-2" />
            <p className="text-sm">No recent activities</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}