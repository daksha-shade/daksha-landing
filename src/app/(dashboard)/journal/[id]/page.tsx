"use client"

import { useState, useEffect } from 'react'
import { ArrowLeft, Edit3, Clock, Volume2, Video, FileText, Plus, Play, Pause, Download, Share2, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { useRouter } from 'next/navigation'
import { getJournalEntryById, getMoodColor, formatDuration, formatFullDate, type JournalEntry } from '@/lib/journal-data'

export default function JournalEntryPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [entry, setEntry] = useState<JournalEntry | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    // Find the entry by ID
    const foundEntry = getJournalEntryById(params.id)
    setEntry(foundEntry || null)
  }, [params.id])

  if (!entry) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Entry not found</h2>
          <p className="text-muted-foreground mb-4">The journal entry you're looking for doesn't exist.</p>
          <Button onClick={() => router.push('/journal')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Journal
          </Button>
        </div>
      </div>
    )
  }


  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'text': return <FileText className="w-5 h-5 text-blue-500" />
      case 'audio': return <Volume2 className="w-5 h-5 text-green-500" />
      case 'video': return <Video className="w-5 h-5 text-red-500" />
      case 'mixed': return <Plus className="w-5 h-5 text-purple-500" />
      default: return <FileText className="w-5 h-5" />
    }
  }

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
    // In a real app, this would control actual audio/video playback
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    // Could show a toast notification here
  }

  const handleEdit = () => {
    // Navigate to edit mode based on entry type
    router.push(`/journal/${entry.type}?edit=${entry.id}`)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border/20">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => router.push('/journal')}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Journal
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex items-center gap-2">
                {getTypeIcon(entry.type)}
                <span className="text-sm text-muted-foreground capitalize">{entry.type} Entry</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={handleShare}>
                <Share2 className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={handleEdit}>
                <Edit3 className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Entry Header */}
          <div className="space-y-4">
            <h1 className="text-3xl font-serif font-bold">{entry.title}</h1>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {formatFullDate(entry.timestamp)}
              </div>
              
              {entry.duration && (
                <div className="flex items-center gap-1">
                  <Volume2 className="w-4 h-4" />
                  {formatDuration(entry.duration)}
                </div>
              )}
              
              {entry.mood && (
                <Badge className={getMoodColor(entry.mood)}>
                  {entry.mood}
                </Badge>
              )}
            </div>

            {/* Tags */}
            {entry.tags && entry.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {entry.tags.map((tag, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <Separator />

          {/* Media Content */}
          {(entry.type === 'audio' || entry.type === 'video') && (
            <div className="space-y-4">
              {entry.type === 'audio' && (
                <div className="bg-muted/20 rounded-lg p-6 text-center">
                  <div className="space-y-4">
                    <Volume2 className="w-12 h-12 text-green-500 mx-auto" />
                    <div className="space-y-2">
                      <p className="font-medium">Audio Recording</p>
                      <p className="text-sm text-muted-foreground">Duration: {formatDuration(entry.duration || 0)}</p>
                    </div>
                    <Button onClick={handlePlayPause} className="gap-2">
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      {isPlaying ? 'Pause' : 'Play'}
                    </Button>
                  </div>
                </div>
              )}

              {entry.type === 'video' && (
                <div className="bg-muted/20 rounded-lg p-6 text-center">
                  <div className="space-y-4">
                    <Video className="w-12 h-12 text-red-500 mx-auto" />
                    <div className="space-y-2">
                      <p className="font-medium">Video Recording</p>
                      <p className="text-sm text-muted-foreground">Duration: {formatDuration(entry.duration || 0)}</p>
                    </div>
                    <Button onClick={handlePlayPause} className="gap-2">
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      {isPlaying ? 'Pause' : 'Play'}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Text Content */}
          {entry.content && (
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <div className="whitespace-pre-wrap text-foreground leading-relaxed">
                {entry.content}
              </div>
            </div>
          )}

          {/* Attachments */}
          {entry.attachments && entry.attachments.length > 0 && (
            <div className="space-y-4">
              <Separator />
              <div>
                <h3 className="font-medium mb-3">Attachments</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {entry.attachments.map((attachment, idx) => (
                    <div key={idx} className="border border-border/30 rounded-lg p-3 hover:bg-muted/20 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0">
                          {attachment.type === 'image' && <FileText className="w-5 h-5 text-blue-500" />}
                          {attachment.type === 'audio' && <Volume2 className="w-5 h-5 text-green-500" />}
                          {attachment.type === 'video' && <Video className="w-5 h-5 text-red-500" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{attachment.name}</p>
                          <p className="text-xs text-muted-foreground capitalize">{attachment.type}</p>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}