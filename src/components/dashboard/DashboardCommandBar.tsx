"use client"

import { useState, useEffect, useRef } from 'react'
import { Brain, Mic, MicOff, X, Minimize2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import FullScreenVoiceInput from './FullScreenVoiceInput'

export default function DashboardCommandBar() {
  const [isVoiceOpen, setIsVoiceOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [recordingDuration, setRecordingDuration] = useState(0)
  const recordingIntervalRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsVoiceOpen(true)
      }
      if (e.key === 'Escape' && isExpanded) {
        handleMinimize()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isExpanded])

  useEffect(() => {
    if (isRecording) {
      recordingIntervalRef.current = setInterval(() => {
        setRecordingDuration(prev => prev + 1)
      }, 1000)
    } else {
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current)
      }
    }

    return () => {
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current)
      }
    }
  }, [isRecording])

  const handleExpand = () => {
    setIsExpanded(true)
    setIsMinimized(false)
  }

  const handleMinimize = () => {
    setIsExpanded(false)
    if (isRecording) {
      setIsMinimized(true)
    }
  }

  const handleClose = () => {
    setIsExpanded(false)
    setIsMinimized(false)
    setIsRecording(false)
    setRecordingDuration(0)
  }

  const handleStartRecording = () => {
    setIsRecording(true)
    setRecordingDuration(0)
    console.log('Recording started in background')
  }

  const handleStopRecording = () => {
    setIsRecording(false)
    setRecordingDuration(0)
    console.log('Recording stopped')
  }

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <>
      {/* Floating Command Bar */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Minimized Recording Indicator */}
        {isMinimized && isRecording && (
          <div 
            className="mb-3 bg-red-500/90 backdrop-blur border border-red-400/50 rounded-full shadow-lg px-4 py-2 cursor-pointer hover:bg-red-500 transition-all duration-200 animate-pulse"
            onClick={handleExpand}
          >
            <div className="flex items-center gap-2 text-white">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              <span className="text-sm font-medium">Recording {formatDuration(recordingDuration)}</span>
              <Mic className="w-3 h-3" />
            </div>
          </div>
        )}

        {/* Main Command Bar */}
        <div 
          className={`bg-white/95 dark:bg-[#1f1f1f]/95 backdrop-blur border border-border/20 rounded-2xl shadow-lg transition-all duration-300 ease-out ${
            isExpanded 
              ? 'w-80 h-auto p-4' 
              : 'hover:scale-105 cursor-pointer'
          }`}
          onClick={!isExpanded ? handleExpand : undefined}
        >
          {!isExpanded ? (
            /* Collapsed State */
            <div className="px-4 py-3">
              <div className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                <Brain className="w-4 h-4" />
                <span className="text-sm">Talk to Daksha...</span>
                <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted/50 px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                  ⌘ K
                </kbd>
              </div>
            </div>
          ) : (
            /* Expanded State */
            <div className="space-y-4 animate-in slide-in-from-bottom-2 duration-300">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-primary" />
                  <span className="font-medium">Talk to Daksha</span>
                  {isRecording && (
                    <Badge variant="destructive" className="gap-1 animate-pulse">
                      <div className="w-2 h-2 bg-white rounded-full" />
                      {formatDuration(recordingDuration)}
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleMinimize}
                    className="h-8 w-8 p-0"
                  >
                    <Minimize2 className="w-3 h-3" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleClose}
                    className="h-8 w-8 p-0"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setIsVoiceOpen(true)}
                    className="justify-start gap-2"
                  >
                    <Brain className="w-3 h-3" />
                    Full Screen
                  </Button>
                  <Button 
                    variant={isRecording ? "destructive" : "outline"}
                    size="sm" 
                    onClick={isRecording ? handleStopRecording : handleStartRecording}
                    className="justify-start gap-2"
                  >
                    {isRecording ? <MicOff className="w-3 h-3" /> : <Mic className="w-3 h-3" />}
                    {isRecording ? 'Stop' : 'Record'}
                  </Button>
                </div>
                
                {/* Quick Prompts */}
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Quick prompts:</p>
                  {[
                    "How was my day?",
                    "Help me reflect",
                    "What patterns do you see?"
                  ].map((prompt, index) => (
                    <button
                      key={index}
                      className="w-full text-left text-xs p-2 rounded-md hover:bg-accent/50 transition-colors text-muted-foreground hover:text-foreground"
                      onClick={() => {
                        console.log('Quick prompt:', prompt)
                        // Handle quick prompt
                      }}
                    >
                      "{prompt}"
                    </button>
                  ))}
                </div>
              </div>

              {/* Recording Status */}
              {isRecording && (
                <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800">
                  <div className="flex items-center gap-2 text-red-700 dark:text-red-300">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    <span className="text-sm font-medium">Recording in background</span>
                  </div>
                  <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                    You can minimize this and continue using Daksha while recording
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Full Screen Voice Input */}
      <FullScreenVoiceInput 
        isOpen={isVoiceOpen}
        onClose={() => setIsVoiceOpen(false)}
        onStartRecording={handleStartRecording}
        onStopRecording={handleStopRecording}
        isRecording={isRecording}
      />
    </>
  )
}