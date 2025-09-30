"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import { Clock, Play, Pause, RotateCcw, Timer, Loader2 } from 'lucide-react'

interface FocusSession {
  id: string
  duration: number // in minutes
  goal: string
  completed: boolean
  timestamp: Date
}

interface FocusTrackerProps {
  className?: string
}

export default function FocusTracker({ className }: FocusTrackerProps) {
  const [sessions, setSessions] = useState<FocusSession[]>([
    {
      id: '1',
      duration: 25,
      goal: 'Work on project proposal',
      completed: true,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
      id: '2',
      duration: 30,
      goal: 'Read documentation',
      completed: true,
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
    },
    {
      id: '3',
      duration: 45,
      goal: 'Deep work session',
      completed: false,
      timestamp: new Date()
    }
  ])
  
  const [isRunning, setIsRunning] = useState(false)
  const [timeLeft, setTimeLeft] = useState(25 * 60) // 25 minutes in seconds
  const [activeSession, setActiveSession] = useState<FocusSession | null>(null)

  // Calculate today's focus time (completed sessions only)
  const todaysFocusTime = sessions
    .filter(session => 
      session.completed && 
      new Date(session.timestamp).toDateString() === new Date().toDateString()
    )
    .reduce((total, session) => total + session.duration, 0)

  // Calculate this week's focus time
  const weeklyFocusTime = sessions
    .filter(session => session.completed)
    .reduce((total, session) => total + session.duration, 0)

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const startSession = (session: FocusSession) => {
    setActiveSession(session)
    setIsRunning(true)
    setTimeLeft(session.duration * 60)
  }

  const pauseSession = () => {
    setIsRunning(false)
  }

  const resetSession = () => {
    if (activeSession) {
      setTimeLeft(activeSession.duration * 60)
      setIsRunning(false)
    }
  }

  const completeSession = (sessionId: string) => {
    setSessions(sessions.map(session => 
      session.id === sessionId ? { ...session, completed: true } : session
    ))
    setIsRunning(false)
    setActiveSession(null)
    setTimeLeft(25 * 60)
  }

  // Handle timer countdown
  useState(() => {
    let interval: NodeJS.Timeout | null = null
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1)
      }, 1000)
    } else if (isRunning && timeLeft === 0) {
      setIsRunning(false)
      if (activeSession) {
        completeSession(activeSession.id)
      }
    }
    
    return () => {
      if (interval) clearInterval(interval)
    }
  })

  return (
    <Card className={cn("h-full", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Timer className="w-5 h-5 text-blue-500" />
          Focus Tracker
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Timer Display */}
        <div className="bg-muted rounded-lg p-4 text-center">
          <div className="text-3xl font-mono font-bold mb-2">
            {formatTime(timeLeft)}
          </div>
          <div className="text-sm text-muted-foreground mb-3">
            {activeSession ? activeSession.goal : 'Select a session to begin'}
          </div>
          
          <div className="flex justify-center gap-2">
            {isRunning ? (
              <Button 
                variant="destructive" 
                size="sm" 
                onClick={pauseSession}
                className="gap-2"
              >
                <Pause className="w-4 h-4" />
                Pause
              </Button>
            ) : (
              <Button 
                variant="default" 
                size="sm" 
                onClick={resetSession}
                disabled={!activeSession}
                className="gap-2"
              >
                <Play className="w-4 h-4" />
                Start
              </Button>
            )}
            <Button 
              variant="outline" 
              size="sm" 
              onClick={resetSession}
              disabled={!activeSession}
              className="gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </Button>
          </div>
        </div>
        
        {/* Focus Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-blue-500/10 rounded-lg p-3 text-center">
            <div className="text-xl font-bold">{todaysFocusTime}</div>
            <div className="text-xs text-muted-foreground">Today (min)</div>
          </div>
          <div className="bg-green-500/10 rounded-lg p-3 text-center">
            <div className="text-xl font-bold">{weeklyFocusTime}</div>
            <div className="text-xs text-muted-foreground">This Week (min)</div>
          </div>
        </div>
        
        {/* Focus Sessions */}
        <div className="space-y-3">
          <h3 className="font-medium text-sm">Focus Sessions</h3>
          {sessions.map((session) => (
            <div 
              key={session.id} 
              className={cn(
                "p-3 border rounded-lg hover:border-border transition-colors group cursor-pointer",
                activeSession?.id === session.id && "border-blue-500 bg-blue-500/5",
                session.completed && "opacity-75"
              )}
              onClick={() => !session.completed && startSession(session)}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-sm">{session.goal}</h4>
                <Badge 
                  variant={session.completed ? "default" : "secondary"} 
                  className="text-xs"
                >
                  {session.duration} min
                </Badge>
              </div>
              
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                <span>
                  {new Date(session.timestamp).toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
                {session.completed ? (
                  <span className="text-green-500">Completed</span>
                ) : (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-6 px-2 text-xs"
                    onClick={(e) => {
                      e.stopPropagation()
                      startSession(session)
                    }}
                  >
                    Start
                  </Button>
                )}
              </div>
              
              <Progress 
                value={session.completed ? 100 : 0} 
                className="h-1.5" 
              />
            </div>
          ))}
        </div>
        
        {/* Quick Actions */}
        <div className="pt-3 border-t border-border/30">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Ready to focus?</span>
            <Button variant="ghost" size="sm" className="gap-2 h-8">
              <Clock className="w-3 h-3" />
              Add Session
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}