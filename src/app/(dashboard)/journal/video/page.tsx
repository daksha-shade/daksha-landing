"use client"

import { useState, useEffect } from 'react'
import { ArrowLeft, Save, Video, Pause, Play, Soup, Camera, Trash2, Calendar, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

export default function VideoJournalPage() {
  const [title, setTitle] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null)
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const [mood, setMood] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const [cameraFacing, setCameraFacing] = useState<'user' | 'environment'>('user')

  const moods = [
    { emoji: "😊", label: "Happy", value: "happy" },
    { emoji: "😔", label: "Sad", value: "sad" },
    { emoji: "😤", label: "Frustrated", value: "frustrated" },
    { emoji: "😌", label: "Peaceful", value: "peaceful" },
    { emoji: "🤔", label: "Thoughtful", value: "thoughtful" },
    { emoji: "😴", label: "Tired", value: "tired" },
    { emoji: "🎉", label: "Excited", value: "excited" },
    { emoji: "😰", label: "Anxious", value: "anxious" },
  ]

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRecording && !isPaused) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRecording, isPaused])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const startRecording = () => {
    setIsRecording(true)
    setIsPaused(false)
    setRecordingTime(0)
    // Recording logic would go here
  }

  const pauseRecording = () => {
    setIsPaused(!isPaused)
  }

  const stopRecording = () => {
    setIsRecording(false)
    setIsPaused(false)
    // Create mock video blob
    setVideoBlob(new Blob())
    setVideoUrl("mock-video-url")
  }

  const deleteRecording = () => {
    setVideoBlob(null)
    setVideoUrl(null)
    setRecordingTime(0)
  }

  const flipCamera = () => {
    setCameraFacing(prev => prev === 'user' ? 'environment' : 'user')
  }

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  const handleSave = () => {
    // Save logic would go here
    console.log({ title, videoBlob, mood, tags, duration: recordingTime })
    // Redirect back to journal
    window.location.href = '/journal'
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-background/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/journal">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </Button>
              </Link>
              <div className="h-4 w-px bg-border" />
              <h1 className="font-medium">Video Journal</h1>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {formatTime(recordingTime)}
              </span>
              <Button 
                onClick={handleSave} 
                disabled={!videoBlob}
                className="gap-2"
              >
                <Save className="w-4 h-4" />
                Save Entry
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="space-y-8">
          {/* Title */}
          <div>
            <Input
              placeholder="Give your video journal a title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-2xl font-medium border-0 focus:ring-0 px-0 placeholder:text-muted-foreground/60"
            />
          </div>

          {/* Video Recording Interface */}
          <div className="bg-muted/10 rounded-2xl p-8">
            <div className="flex flex-col items-center space-y-6">
              {/* Camera Preview */}
              <div className={`relative w-full max-w-md aspect-video rounded-xl overflow-hidden border-4 transition-all duration-300 ${
                isRecording && !isPaused ? 'border-red-500 shadow-lg shadow-red-500/20' : 
                isRecording && isPaused ? 'border-yellow-500 shadow-lg shadow-yellow-500/20' :
                'border-border'
              }`}>
                <div className="w-full h-full bg-muted/20 flex items-center justify-center">
                  {videoBlob ? (
                    <div className="text-center space-y-2">
                      <Video className="w-12 h-12 text-blue-500 mx-auto" />
                      <p className="text-sm text-muted-foreground">Video recorded</p>
                    </div>
                  ) : (
                    <div className="text-center space-y-2">
                      <Camera className="w-12 h-12 text-muted-foreground mx-auto" />
                      <p className="text-sm text-muted-foreground">
                        {isRecording ? 'Recording...' : 'Camera preview'}
                      </p>
                    </div>
                  )}
                </div>
                
                {/* Recording indicator */}
                {isRecording && !isPaused && (
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                    <span className="text-white text-sm font-medium bg-black/50 px-2 py-1 rounded">
                      REC
                    </span>
                  </div>
                )}

                {/* Timer overlay */}
                <div className="absolute top-4 right-4">
                  <div className="bg-black/50 text-white text-sm font-mono px-2 py-1 rounded">
                    {formatTime(recordingTime)}
                  </div>
                </div>

                {/* Camera flip button */}
                {!videoBlob && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={flipCamera}
                    className="absolute bottom-4 right-4 bg-black/50 text-white hover:bg-black/70"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                )}
              </div>

              {/* Status */}
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  {isRecording && !isPaused ? 'Recording in progress...' :
                   isRecording && isPaused ? 'Recording paused' :
                   videoBlob ? 'Recording complete' :
                   `Camera facing ${cameraFacing === 'user' ? 'front' : 'back'}`}
                </p>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-4">
                {!isRecording ? (
                  <Button
                    onClick={startRecording}
                    size="lg"
                    className="gap-2 bg-red-500 hover:bg-red-600 text-white px-8"
                  >
                    <Video className="w-5 h-5" />
                    Start Recording
                  </Button>
                ) : (
                  <div className="flex items-center gap-3">
                    <Button
                      onClick={pauseRecording}
                      variant="outline"
                      size="lg"
                      className="gap-2"
                    >
                      {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
                      {isPaused ? 'Resume' : 'Pause'}
                    </Button>
                    <Button
                      onClick={stopRecording}
                      size="lg"
                      className="gap-2 bg-red-500 hover:bg-red-600 text-white"
                    >
                      <Soup className="w-5 h-5" />
                      Stop
                    </Button>
                  </div>
                )}
              </div>

              {/* Video Preview */}
              {videoBlob && (
                <div className="w-full max-w-md bg-background border border-border/30 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Video className="w-4 h-4 text-red-500" />
                      <span className="text-sm font-medium">Video ready</span>
                      <Badge variant="secondary" className="text-xs">
                        {formatTime(recordingTime)}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="gap-1">
                        <Play className="w-3 h-3" />
                        Preview
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={deleteRecording}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mood Selection */}
          <div className="space-y-3">
            <h3 className="text-lg font-medium">How are you feeling?</h3>
            <div className="flex flex-wrap gap-2">
              {moods.map((moodOption) => (
                <Button
                  key={moodOption.value}
                  variant={mood === moodOption.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setMood(mood === moodOption.value ? "" : moodOption.value)}
                  className="gap-2"
                >
                  <span>{moodOption.emoji}</span>
                  {moodOption.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-3">
            <h3 className="text-lg font-medium">Add tags</h3>
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="gap-1">
                  #{tag}
                  <button
                    onClick={() => removeTag(tag)}
                    className="ml-1 hover:text-destructive"
                  >
                    ×
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Add a tag..."
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTag()}
                className="max-w-xs"
              />
              <Button variant="outline" size="sm" onClick={addTag}>
                Add
              </Button>
            </div>
          </div>

          {/* Date */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>{new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
          </div>
        </div>
      </div>
    </div>
  )
}