"use client"

import { useState } from 'react'
import { Edit3, Save, Calendar, Search, Video, Mic, Camera, Upload, Play, Pause, Clock, Filter, Grid, List, Plus, X, Volume2, FileText, Image as ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

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
  const [entry, setEntry] = useState("")
  const [title, setTitle] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [isVideoRecording, setIsVideoRecording] = useState(false)
  const [recordedAudio, setRecordedAudio] = useState<string | null>(null)
  const [recordedVideo, setRecordedVideo] = useState<string | null>(null)
  const [attachedFiles, setAttachedFiles] = useState<Array<{type: 'video' | 'audio' | 'image', name: string, url: string}>>([])
  const [showMediaOptions, setShowMediaOptions] = useState(false)
  const [activeTab, setActiveTab] = useState<'text' | 'audio' | 'video'>('text')
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

  const handleAudioRecord = () => {
    if (isRecording) {
      setIsRecording(false)
      setRecordedAudio("recorded-audio-" + Date.now())
    } else {
      setIsRecording(true)
    }
  }

  const handleVideoRecord = () => {
    if (isVideoRecording) {
      setIsVideoRecording(false)
      setRecordedVideo("recorded-video-" + Date.now())
    } else {
      setIsVideoRecording(true)
    }
  }

  const handleFileUpload = (type: 'video' | 'audio' | 'image') => {
    const mockFile = {
      type,
      name: `${type}-${Date.now()}.${type === 'video' ? 'mp4' : type === 'audio' ? 'mp3' : 'jpg'}`,
      url: `mock-url-${Date.now()}`
    }
    setAttachedFiles(prev => [...prev, mockFile])
  }

  const removeAttachment = (index: number) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index))
  }

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

      {/* New Entry Creation */}
      <div className="bg-background border border-border/30 rounded-lg overflow-hidden">
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'text' | 'audio' | 'video')}>
          <TabsList className="w-full justify-start rounded-none border-b bg-muted/20">
            <TabsTrigger value="text" className="gap-2">
              <FileText className="w-4 h-4" />
              Text Entry
            </TabsTrigger>
            <TabsTrigger value="audio" className="gap-2">
              <Mic className="w-4 h-4" />
              Audio Journal
            </TabsTrigger>
            <TabsTrigger value="video" className="gap-2">
              <Video className="w-4 h-4" />
              Video Journal
            </TabsTrigger>
          </TabsList>

          <div className="p-6">
            <TabsContent value="text" className="mt-0 space-y-4">
              <Input
                placeholder="Entry title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-lg font-medium border-0 focus:ring-0 px-2"
              />
              <Textarea
                placeholder="What's on your mind today?"
                value={entry}
                onChange={(e) => setEntry(e.target.value)}
                className="min-h-[200px] border-0 focus:ring-0 resize-none text-base leading-relaxed px-2"
              />
            </TabsContent>

            <TabsContent value="audio" className="mt-0 space-y-4">
              <Input
                placeholder="Audio journal title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-lg font-medium border-0 focus:ring-0 px-2"
              />
              <div className="flex flex-col items-center justify-center py-12 space-y-4">
                <div className={`w-24 h-24 rounded-full flex items-center justify-center transition-all ${
                  isRecording ? 'bg-red-100 dark:bg-red-900/30 animate-pulse' : 'bg-muted/20'
                }`}>
                  <Button
                    variant="ghost"
                    size="lg"
                    onClick={handleAudioRecord}
                    className={`w-16 h-16 rounded-full ${
                      isRecording ? 'text-red-500 hover:text-red-600' : 'text-green-500 hover:text-green-600'
                    }`}
                  >
                    {isRecording ? <Pause className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
                  </Button>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium">
                    {isRecording ? 'Recording...' : 'Tap to start recording'}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {isRecording ? 'Tap again to stop' : 'Share your thoughts with voice'}
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="video" className="mt-0 space-y-4">
              <Input
                placeholder="Video journal title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-lg font-medium border-0 focus:ring-0 px-2"
              />
              <div className="flex flex-col items-center justify-center py-12 space-y-4">
                <div className={`w-32 h-24 rounded-lg flex items-center justify-center transition-all border-2 border-dashed ${
                  isVideoRecording ? 'border-red-300 bg-red-50 dark:bg-red-900/20 animate-pulse' : 'border-muted-foreground/30 bg-muted/10'
                }`}>
                  <Button
                    variant="ghost"
                    size="lg"
                    onClick={handleVideoRecord}
                    className={`${
                      isVideoRecording ? 'text-red-500 hover:text-red-600' : 'text-blue-500 hover:text-blue-600'
                    }`}
                  >
                    {isVideoRecording ? <Pause className="w-8 h-8" /> : <Video className="w-8 h-8" />}
                  </Button>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium">
                    {isVideoRecording ? 'Recording video...' : 'Tap to start video recording'}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {isVideoRecording ? 'Tap again to stop' : 'Capture your thoughts on camera'}
                  </p>
                </div>
              </div>
            </TabsContent>
        
        {/* Media Attachments */}
        {attachedFiles.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-muted-foreground">Attachments</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {attachedFiles.map((file, index) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-muted/20 rounded-lg">
                  {file.type === 'video' && <Video className="w-4 h-4 text-blue-500" />}
                  {file.type === 'audio' && <Mic className="w-4 h-4 text-green-500" />}
                  {file.type === 'image' && <Camera className="w-4 h-4 text-purple-500" />}
                  <span className="text-sm flex-1 truncate">{file.name}</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => removeAttachment(index)}
                    className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                  >
                    ×
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

            {/* Media Previews */}
            {recordedAudio && (
              <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <Volume2 className="w-4 h-4 text-green-500" />
                <span className="text-sm flex-1">Audio recording ready</span>
                <Button variant="ghost" size="sm" className="h-6 gap-1">
                  <Play className="w-3 h-3" />
                  Play
                </Button>
              </div>
            )}

            {recordedVideo && (
              <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <Video className="w-4 h-4 text-blue-500" />
                <span className="text-sm flex-1">Video recording ready</span>
                <Button variant="ghost" size="sm" className="h-6 gap-1">
                  <Play className="w-3 h-3" />
                  Preview
                </Button>
              </div>
            )}

        <div className="flex items-center justify-between pt-4 border-t border-border/30">
          <div className="flex items-center gap-2">
            <div className="text-sm text-muted-foreground">
              {entry.length} characters
            </div>
            
            {/* Media Options */}
            <div className="flex items-center gap-1">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowMediaOptions(!showMediaOptions)}
                className="h-7 px-2 text-muted-foreground hover:text-foreground"
              >
                <Upload className="w-3 h-3" />
              </Button>
              
              {showMediaOptions && (
                <div className="flex items-center gap-1 ml-1">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleFileUpload('video')}
                    className="h-7 px-2 text-blue-500 hover:text-blue-600"
                    title="Add Video"
                  >
                    <Video className="w-3 h-3" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleAudioRecord}
                    className={`h-7 px-2 ${isRecording ? 'text-red-500 hover:text-red-600' : 'text-green-500 hover:text-green-600'}`}
                    title={isRecording ? "Stop Recording" : "Record Audio"}
                  >
                    {isRecording ? <Pause className="w-3 h-3" /> : <Mic className="w-3 h-3" />}
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleFileUpload('image')}
                    className="h-7 px-2 text-purple-500 hover:text-purple-600"
                    title="Add Image"
                  >
                    <Camera className="w-3 h-3" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleFileUpload('audio')}
                    className="h-7 px-2 text-orange-500 hover:text-orange-600"
                    title="Upload Audio"
                  >
                    <Upload className="w-3 h-3" />
                  </Button>
                </div>
              )}
            </div>
          </div>
          
            <Button variant="default" size="sm" className="gap-2">
              <Save className="w-4 h-4" />
              Save Entry
            </Button>
          </div>
        </div>
        </Tabs>
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