"use client"

import { useState } from 'react'
import { Edit3, Search, Video, Mic, FileText, Clock, Filter, Grid, List, Plus, Volume2, Image as ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

type JournalEntry = {
  id: string
  type: 'text' | 'audio' | 'video' | 'mixed'
  title: string
  content?: string
  audioUrl?: string
  videoUrl?: string
  attachments?: Array<{type: 'video' | 'audio' | 'image', name: string, url: string}>
  timestamp: Date
  mood?: string
  tags?: string[]
  duration?: number // for audio/video in seconds
}

export default function JournalPage() {
  const [viewMode, setViewMode] = useState<'timeline' | 'grid'>('timeline')
  const [filterType, setFilterType] = useState<'all' | 'text' | 'audio' | 'video' | 'mixed'>('all')

  // Mock journal entries with different types
  const [journalEntries] = useState<JournalEntry[]>([
    {
      id: '1',
      type: 'text',
      title: 'Morning Reflections',
      content: 'Feeling energized about the Daksha project. Had some great insights during my walk about the user experience flow...',
      timestamp: new Date('2024-01-15T08:30:00'),
      mood: 'energetic',
      tags: ['morning', 'insights', 'daksha']
    },
    {
      id: '2',
      type: 'audio',
      title: 'Voice Note: YC Application Ideas',
      audioUrl: 'mock-audio-url',
      timestamp: new Date('2024-01-15T14:20:00'),
      duration: 180,
      mood: 'focused',
      tags: ['yc', 'application', 'ideas']
    },
    {
      id: '3',
      type: 'video',
      title: 'Demo Recording',
      videoUrl: 'mock-video-url',
      timestamp: new Date('2024-01-14T16:45:00'),
      duration: 300,
      mood: 'excited',
      tags: ['demo', 'product', 'features']
    },
    {
      id: '4',
      type: 'mixed',
      title: 'Weekend Planning Session',
      content: 'Planning out the weekend priorities. Need to focus on the pitch deck and user testing.',
      attachments: [
        { type: 'image', name: 'whiteboard-sketch.jpg', url: 'mock-image-url' },
        { type: 'audio', name: 'brainstorm-session.mp3', url: 'mock-audio-url' }
      ],
      timestamp: new Date('2024-01-14T10:15:00'),
      mood: 'thoughtful',
      tags: ['planning', 'weekend', 'priorities']
    },
    {
      id: '5',
      type: 'text',
      title: 'Late Night Thoughts',
      content: 'Been thinking about the competitive landscape. How do we differentiate Daksha from existing solutions?',
      timestamp: new Date('2024-01-13T23:30:00'),
      mood: 'contemplative',
      tags: ['competition', 'strategy', 'differentiation']
    }
  ])

  const filteredEntries = journalEntries.filter(entry => {
    if (filterType === 'all') return true
    return entry.type === filterType
  })

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const formatDate = (date: Date) => {
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    } else if (diffInHours < 48) {
      return 'Yesterday'
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' })
    }
  }

  const getMoodColor = (mood?: string) => {
    switch (mood) {
      case 'energetic': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
      case 'focused': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
      case 'excited': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300'
      case 'thoughtful': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300'
      case 'contemplative': return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300'
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300'
    }
  }

  return (
    <div className="notion-page py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Edit3 className="w-6 h-6 text-primary" />
          <h1 className="notion-title font-serif">Journal</h1>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1">
            <Button 
              variant={viewMode === 'timeline' ? 'default' : 'outline'} 
              size="sm" 
              onClick={() => setViewMode('timeline')}
              className="gap-1"
            >
              <List className="w-3 h-3" />
              Timeline
            </Button>
            <Button 
              variant={viewMode === 'grid' ? 'default' : 'outline'} 
              size="sm" 
              onClick={() => setViewMode('grid')}
              className="gap-1"
            >
              <Grid className="w-3 h-3" />
              Grid
            </Button>
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Search className="w-4 h-4" />
            Search
          </Button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center gap-2 pb-4 border-b border-border/20">
        <Filter className="w-4 h-4 text-muted-foreground" />
        <div className="flex gap-1 flex-wrap">
          {(['all', 'text', 'audio', 'video', 'mixed'] as const).map((type) => (
            <Button
              key={type}
              variant={filterType === type ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setFilterType(type)}
              className="h-7 px-3 text-xs capitalize"
            >
              {type === 'all' ? 'All' : type}
            </Button>
          ))}
        </div>
        <div className="ml-auto text-sm text-muted-foreground">
          {filteredEntries.length} entries
        </div>
      </div>

      {/* Create New Entry */}
      <div className="bg-background border border-border/30 rounded-lg p-6">
        <div className="text-center space-y-4">
          <h3 className="text-lg font-medium">Create New Entry</h3>
          <p className="text-sm text-muted-foreground">Choose how you'd like to journal today</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button 
              variant="outline" 
              className="gap-2 h-12 px-6"
              onClick={() => window.location.href = '/journal/text'}
            >
              <FileText className="w-5 h-5" />
              <div className="text-left">
                <div className="font-medium">Text Entry</div>
                <div className="text-xs text-muted-foreground">Write your thoughts</div>
              </div>
            </Button>
            <Button 
              variant="outline" 
              className="gap-2 h-12 px-6"
              onClick={() => window.location.href = '/journal/audio'}
            >
              <Mic className="w-5 h-5" />
              <div className="text-left">
                <div className="font-medium">Audio Journal</div>
                <div className="text-xs text-muted-foreground">Record your voice</div>
              </div>
            </Button>
            <Button 
              variant="outline" 
              className="gap-2 h-12 px-6"
              onClick={() => window.location.href = '/journal/video'}
            >
              <Video className="w-5 h-5" />
              <div className="text-left">
                <div className="font-medium">Video Journal</div>
                <div className="text-xs text-muted-foreground">Capture on camera</div>
              </div>
            </Button>
          </div>
        </div>
      </div>

      {/* Journal Entries */}
      <div className="space-y-4">
        <h2 className="text-lg font-medium">Your Journal</h2>
        
        {viewMode === 'timeline' ? (
          <div className="space-y-6">
            {filteredEntries.map((entry, index) => (
              <div key={entry.id} className="relative">
                {/* Timeline Line */}
                {index !== filteredEntries.length - 1 && (
                  <div className="absolute left-6 top-12 w-0.5 h-full bg-border/30" />
                )}
                
                <div className="flex gap-4">
                  {/* Timeline Dot */}
                  <div className="flex flex-col items-center">
                    <div className={`w-3 h-3 rounded-full border-2 border-background ${
                      entry.type === 'text' ? 'bg-blue-500' :
                      entry.type === 'audio' ? 'bg-green-500' :
                      entry.type === 'video' ? 'bg-red-500' :
                      'bg-purple-500'
                    }`} />
                  </div>
                  
                  {/* Entry Content */}
                  <div className="flex-1 pb-6">
                    <div className="bg-background border border-border/30 rounded-lg p-4 hover:shadow-sm transition-all cursor-pointer">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{entry.title}</h3>
                          <div className="flex items-center gap-1">
                            {entry.type === 'text' && <FileText className="w-3 h-3 text-blue-500" />}
                            {entry.type === 'audio' && <Volume2 className="w-3 h-3 text-green-500" />}
                            {entry.type === 'video' && <Video className="w-3 h-3 text-red-500" />}
                            {entry.type === 'mixed' && <Plus className="w-3 h-3 text-purple-500" />}
                          </div>
                          {entry.mood && (
                            <Badge variant="secondary" className={`text-xs ${getMoodColor(entry.mood)}`}>
                              {entry.mood}
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {formatDate(entry.timestamp)}
                        </div>
                      </div>
                      
                      {/* Content Preview */}
                      {entry.content && (
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {entry.content}
                        </p>
                      )}
                      
                      {/* Audio/Video Duration */}
                      {entry.duration && (
                        <div className="flex items-center gap-1 mb-3">
                          <Clock className="w-3 h-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {formatDuration(entry.duration)}
                          </span>
                        </div>
                      )}
                      
                      {/* Attachments */}
                      {entry.attachments && entry.attachments.length > 0 && (
                        <div className="flex items-center gap-2 mb-3">
                          {entry.attachments.map((attachment, idx) => (
                            <div key={idx} className="flex items-center gap-1 text-xs text-muted-foreground">
                              {attachment.type === 'image' && <ImageIcon className="w-3 h-3" />}
                              {attachment.type === 'audio' && <Volume2 className="w-3 h-3" />}
                              {attachment.type === 'video' && <Video className="w-3 h-3" />}
                              <span>{attachment.name}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {/* Tags */}
                      {entry.tags && entry.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {entry.tags.map((tag, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredEntries.map((entry) => (
              <div key={entry.id} className="bg-background border border-border/30 rounded-lg p-4 hover:shadow-sm transition-all cursor-pointer">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-sm">{entry.title}</h3>
                    {entry.type === 'text' && <FileText className="w-3 h-3 text-blue-500" />}
                    {entry.type === 'audio' && <Volume2 className="w-3 h-3 text-green-500" />}
                    {entry.type === 'video' && <Video className="w-3 h-3 text-red-500" />}
                    {entry.type === 'mixed' && <Plus className="w-3 h-3 text-purple-500" />}
                  </div>
                  <span className="text-xs text-muted-foreground">{formatDate(entry.timestamp)}</span>
                </div>
                
                {entry.content && (
                  <p className="text-xs text-muted-foreground mb-2 line-clamp-3">
                    {entry.content}
                  </p>
                )}
                
                {entry.duration && (
                  <div className="flex items-center gap-1 mb-2">
                    <Clock className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      {formatDuration(entry.duration)}
                    </span>
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  {entry.mood && (
                    <Badge variant="secondary" className={`text-xs ${getMoodColor(entry.mood)}`}>
                      {entry.mood}
                    </Badge>
                  )}
                  {entry.tags && entry.tags.length > 0 && (
                    <div className="flex gap-1">
                      {entry.tags.slice(0, 2).map((tag, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                      {entry.tags.length > 2 && (
                        <span className="text-xs text-muted-foreground">+{entry.tags.length - 2}</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        
        {filteredEntries.length === 0 && (
          <div className="text-center py-12">
            <Edit3 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No entries found</h3>
            <p className="text-muted-foreground">
              {filterType === 'all' 
                ? 'Start journaling to see your entries here.' 
                : `No ${filterType} entries found. Try a different filter.`
              }
            </p>
          </div>
        )}
      </div>
    </div>
  )
}