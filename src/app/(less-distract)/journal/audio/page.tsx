"use client"

import { useState, useEffect } from 'react'
import { ArrowLeft, Save, Mic, Pause, CircleStop } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function AudioJournalPage() {
  const [title, setTitle] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [hasRecording, setHasRecording] = useState(false)

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

  const handleSave = () => {
    console.log({ title, recordingTime, hasRecording })
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
            placeholder="Audio journal title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-2xl font-light border-0 focus:ring-0 text-center placeholder:text-muted-foreground/40"
          />

          {/* Recording Interface */}
          <div className="space-y-8">
            {/* Timer */}
            <div className="text-6xl font-mono font-light text-muted-foreground">
              {formatTime(recordingTime)}
            </div>

            {/* Recording Button */}
            <div className="flex justify-center">
              <div className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 ${
                isRecording && !isPaused ? 'bg-red-500 scale-110 animate-pulse' : 
                isRecording && isPaused ? 'bg-yellow-500' :
                'bg-muted/20 hover:bg-muted/30'
              }`}>
                {!isRecording ? (
                  <Button
                    onClick={startRecording}
                    variant="ghost"
                    size="lg"
                    className="w-20 h-20 rounded-full text-foreground hover:bg-transparent"
                  >
                    <Mic className="w-10 h-10" />
                  </Button>
                ) : (
                  <Button
                    onClick={pauseRecording}
                    variant="ghost"
                    size="lg"
                    className="w-20 h-20 rounded-full text-white hover:bg-transparent"
                  >
                    <Pause className="w-10 h-10" />
                  </Button>
                )}
              </div>
            </div>

            {/* Status */}
            <div className="space-y-2">
              <p className="text-lg text-muted-foreground">
                {isRecording && !isPaused ? 'Recording...' :
                 isRecording && isPaused ? 'Paused' :
                 hasRecording ? 'Recording complete' :
                 'Tap to start recording'}
              </p>
              
              {isRecording && (
                <Button
                  onClick={stopRecording}
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  <CircleStop className="w-4 h-4" />
                  Stop Recording
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}