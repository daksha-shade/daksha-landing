"use client"

import { useState, useEffect } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useDashboardAnalytics } from '@/hooks/useDashboard'
import { Brain, TrendingUp, TrendingDown, Minus } from 'lucide-react'

interface EmotionData {
    name: string
    value: number
    color: string
}

interface ReflectionInsightsProps {
    className?: string
}

export default function ReflectionInsights({ className }: ReflectionInsightsProps) {
    const { data: analyticsData, isLoading } = useDashboardAnalytics('week')
    const [emotionData, setEmotionData] = useState<EmotionData[]>([])
    const [moodTrend, setMoodTrend] = useState<'up' | 'down' | 'neutral'>('neutral')
    const [insight, setInsight] = useState<string>('')

    // Generate emotion data from analytics
    useEffect(() => {
        if (analyticsData) {
            // Extract emotion data from mood trends
            const moodTrends = analyticsData.moodTrends
            const emotionCounts: Record<string, number> = {}

            // Count emotions from daily moods
            moodTrends.dailyMoods.forEach(day => {
                day.moods.forEach(mood => {
                    emotionCounts[mood] = (emotionCounts[mood] || 0) + 1
                })
            })

            // Convert to chart format
            const chartData: EmotionData[] = Object.entries(emotionCounts)
                .map(([emotion, count]) => ({
                    name: emotion,
                    value: count,
                    color: getEmotionColor(emotion)
                }))
                .sort((a, b) => b.value - a.value)
                .slice(0, 5) // Top 5 emotions

            setEmotionData(chartData)

            // Calculate mood trend
            if (moodTrends.dailyMoods.length >= 2) {
                const recentMood = moodTrends.dailyMoods[moodTrends.dailyMoods.length - 1].averageMood
                const previousMood = moodTrends.dailyMoods[moodTrends.dailyMoods.length - 2].averageMood

                if (recentMood > previousMood) {
                    setMoodTrend('up')
                } else if (recentMood < previousMood) {
                    setMoodTrend('down')
                } else {
                    setMoodTrend('neutral')
                }
            }

            // Generate insight based on emotions
            const topEmotion = chartData.length > 0 ? chartData[0].name : ''
            const insightText = generateInsight(topEmotion)
            setInsight(insightText)
        }
    }, [analyticsData])

    const getEmotionColor = (emotion: string): string => {
        const emotionColors: Record<string, string> = {
            'happy': '#FBBF24',
            'sad': '#60A5FA',
            'angry': '#F87171',
            'anxious': '#FBBF24',
            'excited': '#34D399',
            'calm': '#A78BFA',
            'frustrated': '#F87171',
            'grateful': '#34D399',
            'tired': '#9CA3AF',
            'energized': '#34D399',
            'confused': '#A78BFA',
            'content': '#34D399',
            'stressed': '#F87171',
            'hopeful': '#34D399',
            'lonely': '#60A5FA',
            'loved': '#FBBF24',
            'default': '#9CA3AF'
        }

        return emotionColors[emotion.toLowerCase()] || emotionColors['default']
    }

    const generateInsight = (topEmotion: string): string => {
        const insights: Record<string, string> = {
            'happy': "You've been feeling happy frequently lately. Keep engaging in activities that bring you joy!",
            'sad': "You've experienced sadness recently. Consider reaching out to loved ones or engaging in self-care activities.",
            'angry': "Anger has been prominent in your reflections. Try journaling about the sources of frustration to gain clarity.",
            'anxious': "Anxiety appears in your entries. Breathing exercises and mindfulness practices might help.",
            'excited': "Excitement is a recurring theme. Channel this energy into pursuing your goals and interests.",
            'calm': "You've felt calm often. Maintain this peaceful state by continuing your mindfulness practices.",
            'frustrated': "Frustration has appeared in your reflections. Identifying specific triggers might help you manage it better.",
            'grateful': "Gratitude is a strong theme. This positive perspective contributes to your overall well-being.",
            'tired': "Fatigue shows in your entries. Ensure you're getting adequate rest and taking breaks when needed.",
            'energized': "You've felt energized frequently. Use these periods of high energy for tackling challenging tasks.",
            'confused': "Confusion appears in your reflections. Breaking down complex issues into smaller parts might help.",
            'content': "Contentment is a recurring feeling. Appreciate these moments of peace and satisfaction.",
            'stressed': "Stress has been noted in your entries. Consider stress-management techniques like exercise or meditation.",
            'hopeful': "Hope is evident in your reflections. This optimistic outlook will help you overcome challenges.",
            'lonely': "Loneliness appears in your entries. Connecting with friends or joining communities might help.",
            'loved': "Feeling loved is significant in your reflections. Cherish these connections and express gratitude for them.",
            'default': "Your emotional landscape is diverse. Continue exploring your feelings through reflection and journaling."
        }

        return insights[topEmotion.toLowerCase()] || insights['default']
    }

    if (isLoading) {
        return (
            <Card className={cn("h-full", className)}>
                <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-semibold flex items-center gap-2">
                        <Brain className="w-5 h-5 text-purple-500" />
                        Reflection Insights
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center h-64">
                    <div className="text-center space-y-4">
                        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                        <p className="text-muted-foreground">Analyzing your reflections...</p>
                    </div>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className={cn("h-full", className)}>
            <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <Brain className="w-5 h-5 text-purple-500" />
                    Reflection Insights
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Mood Trend */}
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Mood Trend</span>
                        {moodTrend === 'up' && <TrendingUp className="w-4 h-4 text-green-500" />}
                        {moodTrend === 'down' && <TrendingDown className="w-4 h-4 text-red-500" />}
                        {moodTrend === 'neutral' && <Minus className="w-4 h-4 text-muted-foreground" />}
                    </div>
                    <span className="text-sm text-muted-foreground">
                        {moodTrend === 'up' ? 'Improving' : moodTrend === 'down' ? 'Declining' : 'Stable'}
                    </span>
                </div>

                {/* Emotion Distribution */}
                <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={emotionData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                                label={({ name, percent }) => `${name} ${percent ? (percent * 100).toFixed(0) : '0'}%`}
                            >
                                {emotionData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip
                                formatter={(value) => [value, 'Frequency']}
                                contentStyle={{
                                    backgroundColor: 'hsl(var(--background))',
                                    borderColor: 'hsl(var(--border))',
                                    borderRadius: '0.5rem',
                                    fontSize: '0.75rem'
                                }}
                            />
                            <Legend
                                layout="vertical"
                                verticalAlign="middle"
                                align="right"
                                content={(props) => {
                                    const { payload } = props
                                    return (
                                        <ul className="text-xs space-y-1">
                                            {payload?.map((entry, index) => (
                                                <li key={`item-${index}`} className="flex items-center gap-2">
                                                    <div
                                                        className="w-3 h-3 rounded-full"
                                                        style={{ backgroundColor: entry.color }}
                                                    />
                                                    <span>{entry.value}</span>
                                                    <span className="text-muted-foreground">
                                                        ({emotionData.find(d => d.name === entry.value)?.value || 0})
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    )
                                }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* AI Insight */}
                <div className="p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200 dark:border-purple-800">
                    <div className="flex items-start gap-2">
                        <Brain className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                        <div>
                            <h4 className="text-sm font-medium mb-1">AI Insight</h4>
                            <p className="text-xs text-muted-foreground">{insight}</p>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="pt-3 border-t border-border/30">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Want to explore further?</span>
                        <Button variant="ghost" size="sm" className="gap-2 h-8">
                            <Brain className="w-3 h-3" />
                            Deep Dive
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}