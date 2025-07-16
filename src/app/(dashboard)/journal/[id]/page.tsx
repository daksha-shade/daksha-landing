"use client"

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { ArrowLeft, Edit3, Save, Calendar, Clock, Heart, Tag, Share, Download, Trash2, Play, Mic, Video } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import { mockJournalEntries, getMoodColor, formatDuration, formatFullDate } from '@/lib/journal-data'

export default function JournalEntryPage({ params }: { params: Promise<{ id: string }> }) {
  const searchParams = useSearchParams()
  const isEditMode = searchParams.get('mode') === 'edit'

  const [entry, setEntry] = useState(null)
  const [id, setId] = useState(null)
  const [isEditing, setIsEditing] = useState(isEditMode)
  const [editedTitle, setEditedTitle] = useState('')
  const [editedContent, setEditedContent] = useState('')

  useEffect(() => {
    params.then(resolvedParams => {
      setId(resolvedParams.id)
    })
  }, [params])

  useEffect(() => {
    if (id) {
      const foundEntry = mockJournalEntries.find(e => e.id === id)
      setEntry(foundEntry || null)
      if (foundEntry) {
        setEditedTitle(foundEntry.title)
        setEditedContent(foundEntry.content || '')
      }
    }
  }, [id])

  if (!entry) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardContent className=" text-center">
            <h2 className="text-xl font-semibold mb-2">Entry not found</h2>
            <p className="text-muted-foreground mb-4">
              The journal entry you're looking for doesn't exist.
            </p>
            <Button onClick={() => window.close()}>
              Close
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const handleSave = () => {
    console.log('Saving entry:', { title: editedTitle, content: editedContent })
    setEntry({ ...entry, title: editedTitle, content: editedContent })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedTitle(entry.title)
    setEditedContent(entry.content || '')
    setIsEditing(false)
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case 'text': return <Edit3 className="h-4 w-4" />
      case 'audio': return <Mic className="h-4 w-4" />
      case 'video': return <Video className="h-4 w-4" />
      default: return <Edit3 className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen  ">
      <div className="container mx-auto  ">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.close()}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <div className="flex items-center gap-2">
              <Edit3 className="h-5 w-5 text-primary" />
              <span className="font-medium">Journal Entry</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" size="sm">
                  <Share className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button onClick={() => setIsEditing(true)}>
                  <Edit3 className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Entry Content */}
        <div className="space-y-1">

          {/* Title */}
          <Card className='border-none shadow-none bg-accent'>
            <CardContent className="py-1  ">
              {isEditing ? (
                <Input
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  className="text-2xl font-bold border-none p-0 focus-visible:ring-0 shadow-none"
                  placeholder="Entry title..."
                />
              ) : (
                <h1 className="text-2xl font-bold">{entry.title}</h1>
              )}
              {/* Metadata */}
              <div className="flex flex-wrap items-center gap-6 mt-2 mb-2 text-sm text-muted-foreground">
                {/* Date */}
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{formatFullDate(entry.timestamp)}</span>
                </div>
                {/* Type */}
                <div className="flex items-center gap-1">
                  {getTypeIcon(entry.type)}
                  <span className="capitalize">{entry.type}{entry.duration && ` (${formatDuration(entry.duration)})`}</span>
                </div>
                {/* Mood */}
                {entry.mood && (
                  <div className="flex items-center gap-1">
                    <span className={`w-3 h-3 rounded-full ${getMoodColor(entry.mood)}`} />
                    <span className="capitalize">{entry.mood}</span>
                  </div>
                )}
                {/* Tags */}
                {entry.tags && entry.tags.length > 0 && (
                  <div className="flex items-center gap-1">
                    <Tag className="h-4 w-4" />
                    <div className="flex flex-wrap gap-1">
                      {entry.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Attachments */}
          {entry.attachments && entry.attachments.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Attachments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {entry.attachments.map((attachment, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                      <div className="p-2 bg-muted rounded">
                        {getTypeIcon(attachment.type)}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{attachment.name}</p>
                        <p className="text-xs text-muted-foreground capitalize">
                          {attachment.type}
                        </p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
          {/* Mood and Tags */}

          {/* Main Content */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Edit3 className="h-5 w-5" />
                Content
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <Textarea
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  className="min-h-[400px] resize-none border-none p-0 focus-visible:ring-0 shadow-none"
                  placeholder="Write your thoughts..."
                />
              ) : (
                <div className="prose prose-sm max-w-none">
                  {entry.content?.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Audio/Video Player */}
          {(entry.type === 'audio' || entry.type === 'video') && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  {entry.type === 'audio' ? 'Audio Recording' : 'Video Recording'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted rounded-lg p-8 text-center">
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <Button variant="outline" size="sm">
                      <Play className="h-4 w-4 mr-2" />
                      Play
                    </Button>
                    {entry.duration && (
                      <span className="text-sm text-muted-foreground">
                        Duration: {formatDuration(entry.duration)}
                      </span>
                    )}
                  </div>
                  <div className="w-full bg-border rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full w-0"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Attachments */}
          {entry.attachments && entry.attachments.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Attachments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {entry.attachments.map((attachment, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                      <div className="p-2 bg-muted rounded">
                        {getTypeIcon(attachment.type)}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{attachment.name}</p>
                        <p className="text-xs text-muted-foreground capitalize">
                          {attachment.type}
                        </p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}