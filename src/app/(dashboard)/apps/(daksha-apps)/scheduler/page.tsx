"use client"

import { useState, useEffect } from 'react'
import { 
  Calendar, 
  Clock, 
  Plus, 
  Brain, 
  ChevronLeft, 
  ChevronRight,
  Filter,
  Search,
  Settings,
  Zap,
  Target,
  Users,
  Video,
  Coffee,
  Moon,
  Sun,
  Activity
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

interface Event {
  id: string
  title: string
  description: string
  startTime: string
  endTime: string
  type: 'meeting' | 'focus' | 'break' | 'personal' | 'ai-suggested'
  priority: 'low' | 'medium' | 'high'
  attendees?: string[]
  location?: string
  aiGenerated?: boolean
  energyLevel?: 'low' | 'medium' | 'high'
}

interface TimeBlock {
  hour: number
  events: Event[]
  energyLevel: 'low' | 'medium' | 'high'
  productivity: number
}

const SAMPLE_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Morning Reflection',
    description: 'Daily journaling and goal review',
    startTime: '08:00',
    endTime: '08:30',
    type: 'personal',
    priority: 'high',
    energyLevel: 'high'
  },
  {
    id: '2',
    title: 'Deep Work: Project Alpha',
    description: 'Focus time for important project deliverables',
    startTime: '09:00',
    endTime: '11:00',
    type: 'focus',
    priority: 'high',
    aiGenerated: true,
    energyLevel: 'high'
  },
  {
    id: '3',
    title: 'Team Standup',
    description: 'Daily team sync and updates',
    startTime: '11:30',
    endTime: '12:00',
    type: 'meeting',
    priority: 'medium',
    attendees: ['John', 'Sarah', 'Mike'],
    location: 'Conference Room A'
  }
]

export default function SchedulerPage() {
  const [events, setEvents] = useState<Event[]>(SAMPLE_EVENTS)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('day')
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isDakshaModalOpen, setIsDakshaModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [dakshaPrompt, setDakshaPrompt] = useState('')
  const [isLoadingDaksha, setIsLoadingDaksha] = useState(false)

  // Form states
  const [eventTitle, setEventTitle] = useState('')
  const [eventDescription, setEventDescription] = useState('')
  const [eventStartTime, setEventStartTime] = useState('')
  const [eventEndTime, setEventEndTime] = useState('')
  const [eventType, setEventType] = useState<Event['type']>('personal')
  const [eventPriority, setEventPriority] = useState<Event['priority']>('medium')

  const timeSlots = Array.from({ length: 24 }, (_, i) => i)

  const getEventsForTimeSlot = (hour: number) => {
    return events.filter(event => {
      const startHour = parseInt(event.startTime.split(':')[0])
      const endHour = parseInt(event.endTime.split(':')[0])
      return hour >= startHour && hour < endHour
    })
  }

  const getEnergyLevel = (hour: number): 'low' | 'medium' | 'high' => {
    if (hour >= 9 && hour <= 11) return 'high' // Morning peak
    if (hour >= 14 && hour <= 16) return 'high' // Afternoon peak
    if (hour >= 6 && hour <= 8) return 'medium' // Early morning
    if (hour >= 19 && hour <= 21) return 'medium' // Evening
    return 'low' // Late night/very early morning
  }

  const getProductivityScore = (hour: number): number => {
    const energyLevel = getEnergyLevel(hour)
    const baseScore = energyLevel === 'high' ? 90 : energyLevel === 'medium' ? 70 : 40
    const randomVariation = Math.random() * 20 - 10 // ±10 variation
    return Math.max(0, Math.min(100, baseScore + randomVariation))
  }

  const handleCreateEvent = () => {
    if (!eventTitle.trim() || !eventStartTime || !eventEndTime) return

    const newEvent: Event = {
      id: Date.now().toString(),
      title: eventTitle,
      description: eventDescription,
      startTime: eventStartTime,
      endTime: eventEndTime,
      type: eventType,
      priority: eventPriority,
      energyLevel: getEnergyLevel(parseInt(eventStartTime.split(':')[0]))
    }

    setEvents(prev => [...prev, newEvent])
    resetForm()
    setIsCreateModalOpen(false)
  }

  const resetForm = () => {
    setEventTitle('')
    setEventDescription('')
    setEventStartTime('')
    setEventEndTime('')
    setEventType('personal')
    setEventPriority('medium')
  }

  const handleDakshaScheduling = async () => {
    if (!dakshaPrompt.trim()) return

    setIsLoadingDaksha(true)
    try {
      const response = await fetch('/api/daksha/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `Help me schedule: ${dakshaPrompt}. Please suggest optimal time slots based on my energy levels and existing schedule. Consider productivity patterns and provide specific time recommendations.`,
          conversationHistory: []
        }),
      })

      if (response.ok) {
        const data = await response.json()
        
        // Parse Daksha's response to create suggested events
        const suggestedEvent: Event = {
          id: Date.now().toString(),
          title: `AI Suggested: ${dakshaPrompt}`,
          description: data.response,
          startTime: '14:00', // Default to high-energy afternoon slot
          endTime: '15:30',
          type: 'ai-suggested',
          priority: 'medium',
          aiGenerated: true,
          energyLevel: 'high'
        }

        setEvents(prev => [...prev, suggestedEvent])
        setDakshaPrompt('')
        setIsDakshaModalOpen(false)
      }
    } catch (error) {
      console.error('Error getting Daksha scheduling assistance:', error)
    } finally {
      setIsLoadingDaksha(false)
    }
  }

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':')
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour % 12 || 12
    return `${displayHour}:${minutes} ${ampm}`
  }

  const getEventTypeIcon = (type: Event['type']) => {
    switch (type) {
      case 'meeting': return <Users className="w-4 h-4" />
      case 'focus': return <Target className="w-4 h-4" />
      case 'break': return <Coffee className="w-4 h-4" />
      case 'personal': return <Sun className="w-4 h-4" />
      case 'ai-suggested': return <Brain className="w-4 h-4" />
      default: return <Calendar className="w-4 h-4" />
    }
  }

  const getEventTypeColor = (type: Event['type']) => {
    switch (type) {
      case 'meeting': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'focus': return 'bg-green-100 text-green-800 border-green-200'
      case 'break': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'personal': return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'ai-suggested': return 'bg-indigo-100 text-indigo-800 border-indigo-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#1f1f1f] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-serif font-bold text-[#1f1f1f] dark:text-white">
                Scheduler
              </h1>
              <p className="text-muted-foreground mt-1">
                AI-powered time management and scheduling
              </p>
            </div>
            <div className="flex gap-3">
              <Dialog open={isDakshaModalOpen} onOpenChange={setIsDakshaModalOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Brain className="w-4 h-4" />
                    Ask Daksha
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <Brain className="w-5 h-5 text-blue-500" />
                      Daksha Scheduling Assistant
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Textarea
                      placeholder="What would you like to schedule? (e.g., 'deep work session for project', 'exercise routine', 'meeting with team')"
                      value={dakshaPrompt}
                      onChange={(e) => setDakshaPrompt(e.target.value)}
                      className="min-h-20"
                    />
                    <div className="flex gap-2">
                      <Button 
                        onClick={handleDakshaScheduling} 
                        disabled={!dakshaPrompt.trim() || isLoadingDaksha}
                        className="flex-1 gap-2"
                      >
                        {isLoadingDaksha ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Scheduling...
                          </>
                        ) : (
                          <>
                            <Zap className="w-4 h-4" />
                            Smart Schedule
                          </>
                        )}
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => setIsDakshaModalOpen(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus className="w-4 h-4" />
                    New Event
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Create New Event</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Input
                      placeholder="Event title..."
                      value={eventTitle}
                      onChange={(e) => setEventTitle(e.target.value)}
                    />
                    <Textarea
                      placeholder="Event description..."
                      value={eventDescription}
                      onChange={(e) => setEventDescription(e.target.value)}
                      className="min-h-20"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Start Time</label>
                        <Input
                          type="time"
                          value={eventStartTime}
                          onChange={(e) => setEventStartTime(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">End Time</label>
                        <Input
                          type="time"
                          value={eventEndTime}
                          onChange={(e) => setEventEndTime(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Type</label>
                        <select
                          value={eventType}
                          onChange={(e) => setEventType(e.target.value as Event['type'])}
                          className="w-full h-9 px-3 rounded-md border border-input bg-background text-sm"
                        >
                          <option value="personal">Personal</option>
                          <option value="meeting">Meeting</option>
                          <option value="focus">Focus Work</option>
                          <option value="break">Break</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Priority</label>
                        <select
                          value={eventPriority}
                          onChange={(e) => setEventPriority(e.target.value as Event['priority'])}
                          className="w-full h-9 px-3 rounded-md border border-input bg-background text-sm"
                        >
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        onClick={handleCreateEvent}
                        disabled={!eventTitle.trim() || !eventStartTime || !eventEndTime}
                        className="flex-1 gap-2"
                      >
                        <Calendar className="w-4 h-4" />
                        Create Event
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setIsCreateModalOpen(false)
                          resetForm()
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Date Navigation and Controls */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <h2 className="text-xl font-semibold">
                  {selectedDate.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </h2>
                <Button variant="outline" size="sm">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
              <Button variant="outline" size="sm">
                Today
              </Button>
            </div>
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'day' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('day')}
              >
                Day
              </Button>
              <Button
                variant={viewMode === 'week' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('week')}
              >
                Week
              </Button>
              <Button
                variant={viewMode === 'month' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('month')}
              >
                Month
              </Button>
            </div>
          </div>
        </div>

        {/* Energy and Productivity Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Activity className="w-4 h-4 text-green-500" />
                Energy Levels
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Morning (9-11 AM)</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">High</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Afternoon (2-4 PM)</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">High</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Evening (7-9 PM)</span>
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Medium</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Target className="w-4 h-4 text-blue-500" />
                Focus Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.5 hrs</div>
              <p className="text-sm text-muted-foreground">Scheduled today</p>
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">75% of optimal</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Clock className="w-4 h-4 text-purple-500" />
                Next Event
              </CardTitle>
            </CardHeader>
            <CardContent>
              {events.length > 0 ? (
                <div>
                  <div className="font-medium">{events[0].title}</div>
                  <p className="text-sm text-muted-foreground">
                    {formatTime(events[0].startTime)} - {formatTime(events[0].endTime)}
                  </p>
                  <Badge variant="outline" className="mt-2">
                    {events[0].type}
                  </Badge>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No upcoming events</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Schedule View */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Daily Schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {timeSlots.map(hour => {
                const hourEvents = getEventsForTimeSlot(hour)
                const energyLevel = getEnergyLevel(hour)
                const productivity = getProductivityScore(hour)
                
                return (
                  <div key={hour} className="flex items-center gap-4 py-2 border-b border-border/20 last:border-b-0">
                    <div className="w-20 text-sm font-medium text-muted-foreground">
                      {hour.toString().padStart(2, '0')}:00
                    </div>
                    <div className="flex-1">
                      {hourEvents.length > 0 ? (
                        <div className="space-y-2">
                          {hourEvents.map(event => (
                            <div
                              key={event.id}
                              className={cn(
                                "p-3 rounded-lg border",
                                getEventTypeColor(event.type)
                              )}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  {getEventTypeIcon(event.type)}
                                  <span className="font-medium">{event.title}</span>
                                  {event.aiGenerated && (
                                    <Badge variant="outline" className="text-xs">
                                      <Brain className="w-2 h-2 mr-1" />
                                      AI
                                    </Badge>
                                  )}
                                </div>
                                <div className="text-sm">
                                  {formatTime(event.startTime)} - {formatTime(event.endTime)}
                                </div>
                              </div>
                              {event.description && (
                                <p className="text-sm mt-1 opacity-80">{event.description}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <div className={cn(
                              "w-2 h-2 rounded-full",
                              energyLevel === 'high' ? 'bg-green-500' :
                              energyLevel === 'medium' ? 'bg-yellow-500' : 'bg-red-500'
                            )} />
                            <span className="capitalize">{energyLevel} energy</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Activity className="w-3 h-3" />
                            <span>{Math.round(productivity)}% productivity</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}