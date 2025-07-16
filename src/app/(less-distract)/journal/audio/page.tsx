"use client"

import { useState, useEffect } from 'react'
import { ArrowLeft, Save, Mic, Pause, CircleStop, FileText, MessageCircle, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function AudioJournalPage() {
  const [title, setTitle] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [hasRecording, setHasRecording] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [showTranscript, setShowTranscript] = useState(false)
  const [aiQuestion, setAiQuestion] = useState("")
  const [aiResponse, setAiResponse] = useState("")
  const [isProcessingAI, setIsProcessingAI] = useState(false)

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
    // Simulate transcript generation
    setTimeout(() => {
      setTranscript("This is a sample transcript of your audio recording. In a real implementation, this would be generated using speech-to-text technology like OpenAI Whisper or similar services.")
    }, 1000)
  }

  const handleSave = () => {
    console.log({ title, recordingTime, hasRecording, transcript })
    window.location.href = '/journal'
  }

  const handleAIQuestion = async () => {
    if (!aiQuestion.trim()) return

    setIsProcessingAI(true)
    // Simulate AI processing
    setTimeout(() => {
      setAiResponse(`Based on your audio recording about "${title}", here's my analysis: ${aiQuestion} - This is a simulated AI response. In a real implementation, this would analyze your audio content and provide contextual insights.`)
      setIsProcessingAI(false)
    }, 2000)
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
              <div className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 ${isRecording && !isPaused ? 'bg-red-500 scale-110 animate-pulse' :
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

            {/* Transcript and AI Section */}
            {hasRecording && (
              <div className="space-y-6 mt-8">
                {/* Transcript */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      Transcript
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {transcript ? (
                      <div className="space-y-3">
                        <Button
                          variant="outline"
                          onClick={() => setShowTranscript(!showTranscript)}
                          className="w-full"
                        >
                          {showTranscript ? 'Hide' : 'Show'} Transcript
                        </Button>
                        {showTranscript && (
                          <div className="p-4 bg-muted/20 rounded-lg">
                            <p className="text-sm leading-relaxed">{transcript}</p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-sm">Generating transcript...</p>
                    )}
                  </CardContent>
                </Card>

                {/* AI Chat */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageCircle className="w-5 h-5" />
                      Ask AI about your recording
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Ask something about your audio recording..."
                        value={aiQuestion}
                        onChange={(e) => setAiQuestion(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleAIQuestion()}
                      />
                      <Button
                        onClick={handleAIQuestion}
                        disabled={isProcessingAI || !aiQuestion.trim()}
                        size="sm"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>

                    {aiResponse && (
                      <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                        <p className="text-sm leading-relaxed">{aiResponse}</p>
                      </div>
                    )}

                    {isProcessingAI && (
                      <div className="p-4 bg-muted/20 rounded-lg">
                        <p className="text-sm text-muted-foreground">AI is analyzing your recording...</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}