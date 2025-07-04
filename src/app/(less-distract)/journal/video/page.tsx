"use client"

import { useState, useEffect } from 'react'
import { ArrowLeft, Save, Video, Pause, CircleStop, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function VideoJournalPage() {
  const [title, setTitle] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [hasRecording, setHasRecording] = useState(false)
  const [cameraFacing, setCameraFacing] = useState<'user' | 'environment'>('user')

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
    setHasRecording(false)
  }

  const pauseRecording = () => {
    setIsPaused(!isPaused)
  }

  const stopRecording = () => {
    setIsRecording(false)
    setIsPaused(false)
    setHasRecording(true)
  }

  const flipCamera = () => {
    setCameraFacing(prev => prev === 'user' ? 'environment' : 'user')
  }

  const handleSave = () => {
    console.log({ title, recordingTime, hasRecording, cameraFacing })
    window.location.href = '/journal'
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Minimal Header */}
      <div className="flex items-center justify-between p-4 border-b border-border/10">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => window.location.href = '/journal'}
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
        <Button 
          onClick={handleSave} 
          size="sm" 
          className="gap-2"
          disabled={!hasRecording}
        >
          <Save className="w-4 h-4" />
          Save
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 max-w-2xl mx-auto w-full">
        <div className="w-full space-y-8 text-center">
          {/* Title */}
          <Input
            placeholder="Video journal title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-2xl font-light border-0 focus:ring-0 text-center placeholder:text-muted-foreground/40"
          />

          {/* Camera Preview */}
          <div className="relative">
            <div className={`w-full max-w-md mx-auto aspect-video rounded-2xl overflow-hidden border-4 transition-all duration-300 ${
              isRecording && !isPaused ? 'border-red-500 shadow-lg shadow-red-500/20' : 
              isRecording && isPaused ? 'border-yellow-500 shadow-lg shadow-yellow-500/20' :
              'border-border'
            }`}>
              <div className="w-full h-full bg-muted/10 flex items-center justify-center">
                {hasRecording ? (
                  <div className="text-center space-y-2">
                    <Video className="w-12 h-12 text-blue-500 mx-auto" />
                    <p className="text-sm text-muted-foreground">Video recorded</p>
                  </div>
                ) : (
                  <div className="text-center space-y-2">
                    <Video className="w-12 h-12 text-muted-foreground mx-auto" />
                    <p className="text-sm text-muted-foreground">Camera preview</p>
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
              {!hasRecording && (
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
          </div>

          {/* Controls */}
          <div className="space-y-4">
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
              <div className="flex items-center justify-center gap-4">
                <Button
                  onClick={pauseRecording}
                  variant="outline"
                  size="lg"
                  className="gap-2"
                >
                  <Pause className="w-5 h-5" />
                  {isPaused ? 'Resume' : 'Pause'}
                </Button>
                <Button
                  onClick={stopRecording}
                  size="lg"
                  className="gap-2 bg-red-500 hover:bg-red-600 text-white"
                >
                  <CircleStop className="w-5 h-5" />
                  Stop
                </Button>
              </div>
            )}

            {/* Status */}
            <p className="text-sm text-muted-foreground">
              {isRecording && !isPaused ? 'Recording in progress...' :
               isRecording && isPaused ? 'Recording paused' :
               hasRecording ? 'Recording complete' :
               `Camera facing ${cameraFacing === 'user' ? 'front' : 'back'}`}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}