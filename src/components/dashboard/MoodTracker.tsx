"use client"

import { useState, useEffect } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useDashboardAnalytics } from '@/hooks/useDashboard'
import { Smile, Frown, Meh, Heart, Loader2 } from 'lucide-react'

interface MoodData {
    date: string
    mood: number
    moodLabel: string
}

interface MoodTrackerProps {
    className?: string
}

export default function MoodTracker({ className }: MoodTrackerProps) {
    const { data: analyticsData, isLoading } = useDashboardAnalytics('week')
    const [moodData, setMoodData] = useState<MoodData[]>([])
    const [timeRange, setTimeRange] = useState<'week' | 'month'>('week')

    // Generate mood data from analytics
    useEffect(() => {
        if (analyticsData) {
            // Extract mood data from analytics
            const moodTrends = analyticsData.moodTrends
            const chartData: MoodData[] = moodTrends.dailyMoods.map(day => ({
                date: new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
                mood: day.averageMood,
                moodLabel: getMoodLabel(day.averageMood)
            }))

            setMoodData(chartData)
        }
    }, [analyticsData])

    const getMoodLabel = (mood: number): string => {
        if (mood >= 4) return 'Very Happy'
        if (mood >= 3) return 'Happy'
        if (mood >= 2) return 'Neutral'
        if (mood >= 1) return 'Sad'
        return 'Very Sad'
    }

    const getMoodIcon = (mood: number) => {
        if (mood >= 4) return <Smile className="w-4 h-4 text-green-500" />
        if (mood >= 3) return <Smile className="w-4 h-4 text-blue-500" />
        if (mood >= 2) return <Meh className="w-4 h-4 text-yellow-500" />
        if (mood >= 1) return <Frown className="w-4 h-4 text-orange-500" />
        return <Frown className="w-4 h-4 text-red-500" />
    }

    const getMoodColor = (mood: number) => {
        if (mood >= 4) return '#10B981' // green
        if (mood >= 3) return '#3B82F6' // blue
        if (mood >= 2) return '#F59E0B' // yellow
        if (mood >= 1) return '#F97316' // orange
        return '#EF4444' // red
    }

    // Calculate mood statistics
    const averageMood = moodData.length > 0
        ? moodData.reduce((sum, day) => sum + day.mood, 0) / moodData.length
        : 0

    const moodTrend = moodData.length >= 2
        ? moodData[moodData.length - 1].mood - moodData[moodData.length - 2].mood
        : 0

    if (isLoading) {
        return (
            <Card className={cn("h-full", className)}>
                <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-semibold flex items-center gap-2">
                        <Heart className="w-5 h-5 text-red-500" />
                        Mood Tracker
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
                        <Heart className="w-5 h-5 text-red-500" />
                        Mood Tracker
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
                {/* Mood Stats */}
                <div className="grid grid-cols-3 gap-3">
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <div className="text-2xl font-bold" style={{ color: getMoodColor(averageMood) }}>
                            {averageMood.toFixed(1)}
                        </div>
                        <div className="text-xs text-muted-foreground">Avg Mood</div>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center justify-center gap-1">
                            {getMoodIcon(averageMood)}
                            <span className="text-sm font-medium">{getMoodLabel(averageMood)}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">Current</div>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <div className={`text-2xl font-bold ${moodTrend > 0 ? 'text-green-500' : moodTrend < 0 ? 'text-red-500' : 'text-yellow-500'}`}>
                            {moodTrend > 0 ? '+' : ''}{moodTrend.toFixed(1)}
                        </div>
                        <div className="text-xs text-muted-foreground">Trend</div>
                    </div>
                </div>

                {/* Mood Chart */}
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            data={moodData}
                            margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis
                                dataKey="date"
                                tick={{ fontSize: 12 }}
                                tickMargin={10}
                            />
                            <YAxis
                                domain={[0, 5]}
                                tick={{ fontSize: 12 }}
                                tickMargin={10}
                                tickFormatter={(value) => value.toFixed(0)}
                            />
                            <Tooltip
                                formatter={(value) => [value, 'Mood']}
                                labelFormatter={(label) => `Date: ${label}`}
                                contentStyle={{
                                    backgroundColor: 'hsl(var(--background))',
                                    borderColor: 'hsl(var(--border))',
                                    borderRadius: '0.5rem',
                                    fontSize: '0.75rem'
                                }}
                            />
                            <Area
                                type="monotone"
                                dataKey="mood"
                                stroke={getMoodColor(averageMood)}
                                fill={getMoodColor(averageMood)}
                                fillOpacity={0.2}
                                strokeWidth={2}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* Mood Insights */}
                <div className="p-3 bg-muted/30 rounded-lg border border-border/30">
                    <h4 className="text-sm font-medium mb-2">Mood Insights</h4>
                    <p className="text-xs text-muted-foreground">
                        {averageMood >= 4
                            ? "Your mood has been consistently positive! Keep doing what makes you happy."
                            : averageMood >= 3
                                ? "You're maintaining a balanced mood. Continue your current wellness practices."
                                : averageMood >= 2
                                    ? "Your mood is neutral. Consider engaging in activities that bring you joy."
                                    : "Your mood seems low. Reach out to loved ones or try relaxation techniques."}
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}