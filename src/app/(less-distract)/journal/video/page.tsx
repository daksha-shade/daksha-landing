"use client"

import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, Save, Video as VideoIcon, Pause, CircleStop, RotateCcw, Mic, MicOff, FileText, MessageCircle, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'

export default function FullScreenVideoJournalPage() {
  const [title, setTitle] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [hasRecording, setHasRecording] = useState(false)
  const [cameraFacing, setCameraFacing] = useState<'user' | 'environment'>('user')
  const [isMuted, setIsMuted] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [transcript, setTranscript] = useState("")
  const [showTranscript, setShowTranscript] = useState(false)
  const [aiQuestion, setAiQuestion] = useState("")
  const [aiResponse, setAiResponse] = useState("")
  const [isProcessingAI, setIsProcessingAI] = useState(false)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const blobRef = useRef<Blob | null>(null)
  const intervalRef = useRef<any>(null)
  const mimeType = 'video/webm'

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

  // Auto-hide controls during recording
  useEffect(() => {
    let timeout: NodeJS.Timeout
    if (isRecording && showControls) {
      timeout = setTimeout(() => {
        setShowControls(false)
      }, 3000)
    }
    return () => clearTimeout(timeout)
  }, [isRecording, showControls])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const startRecording = async () => {
    try {
      const constraints: MediaStreamConstraints = {
        video: { facingMode: cameraFacing },
        audio: !isMuted,
      }
      const stream = await navigator.mediaDevices.getUserMedia(constraints)
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        await videoRef.current.play()
      }
      const mr = new MediaRecorder(stream, { mimeType })
      chunksRef.current = []
      mr.ondataavailable = (e) => { if (e.data && e.data.size > 0) chunksRef.current.push(e.data) }
      mr.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: mimeType })
        blobRef.current = blob
        setHasRecording(true)
        await transcribe(blob)
      }
      mediaRecorderRef.current = mr
      mr.start(250)
      setRecordingTime(0)
      setIsRecording(true)
      setIsPaused(false)
    } catch (e) {
      console.error(e); toast.error('Camera or microphone permission denied')
    }
  }

  const pauseRecording = () => {
    const mr = mediaRecorderRef.current
    if (!mr) return
    if (isPaused) {
      mr.resume(); setIsPaused(false)
    } else { mr.pause(); setIsPaused(true) }
  }

  const stopRecording = () => {
    const mr = mediaRecorderRef.current
    if (!mr) return
    mr.stop()
    streamRef.current?.getTracks().forEach(t => t.stop())
    setIsRecording(false)
    setIsPaused(false)
    setShowControls(true)
  }

  const flipCamera = () => {
    setCameraFacing(prev => prev === 'user' ? 'environment' : 'user')
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const uploadToR2 = async (blob: Blob) => {
    const fd = new FormData()
    fd.append('file', new File([blob], `journal-video-${Date.now()}.webm`, { type: mimeType }))
    const res = await fetch('/api/upload', { method: 'POST', body: fd })
    if (!res.ok) throw new Error('Upload failed')
    const json = await res.json() as { file?: { url: string } }
    return json.file?.url as string
  }

  const transcribe = async (blob: Blob) => {
    try {
      const fd = new FormData()
      fd.append('audio', new File([blob], `recording-${Date.now()}.webm`, { type: mimeType }))
      fd.append('action', 'transcribe')
      const res = await fetch('/api/journal/audio', { method: 'POST', body: fd })
      if (res.ok) {
        const data = await res.json() as { transcript?: string }
        setTranscript(data.transcript || '')
      }
    } catch (e) { console.error(e) }
  }


  const handleSave = async () => {
    try {
      if (!blobRef.current) { toast.error('No recording found'); return }
      const videoUrl = await uploadToR2(blobRef.current)
      const res = await fetch('/api/journal', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim() || 'Video Journal',
          type: 'video',
          duration: recordingTime,
          transcript,
          plainTextContent: transcript,
          videoUrl,
          entryDate: new Date().toISOString(),
          generateAI: true,
        })
      })
      if (!res.ok) throw new Error('Save failed')
      const json = await res.json() as { id: string }
      toast.success('Journal saved')
      window.location.href = `/journal/${json.id}`
    } catch (e) { console.error(e); toast.error('Save failed') }
  }

  const handleAIQuestion = async () => {
    if (!aiQuestion.trim()) return

    setIsProcessingAI(true)
    // Simulate AI processing
    setTimeout(() => {
      setAiResponse(`Based on your video recording about "${title}", here's my analysis: ${aiQuestion} - This is a simulated AI response. In a real implementation, this would analyze both your video content and audio transcript to provide contextual insights.`)
      setIsProcessingAI(false)
    }, 2000)
  }

  const showControlsTemporarily = () => {
    setShowControls(true)
  }

  return (
    <div className="fixed inset-0 bg-background overflow-hidden">
      {/* Video Preview - Full Screen */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-muted/5 to-muted/10"
        onClick={showControlsTemporarily}
      >
        {/* Camera Preview */}
        <div className="w-full h-full relative">
          {hasRecording ? (
            <div className="w-full h-full bg-muted/20 flex items-center justify-center">
              <div className="text-center space-y-4">
                <VideoIcon className="w-16 h-16 text-white/80 mx-auto" />
                <p className="text-white/80 text-lg">Video recorded successfully</p>
              </div>
            </div>
          ) : (
            <video ref={videoRef} className="w-full h-full object-cover bg-black/60" muted playsInline />
          )}
        </div>

        {/* Recording Indicator */}
        {isRecording && !isPaused && (
          <div className="absolute top-6 left-6 flex items-center gap-3 bg-black/60 backdrop-blur-sm rounded-full px-4 py-2">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
            <span className="text-white font-medium text-sm">RECORDING</span>
          </div>
        )}

        {/* Timer */}
        <div className="absolute top-6 right-6 bg-black/60 backdrop-blur-sm rounded-full px-4 py-2">
          <span className="text-white font-mono text-lg font-medium">
            {formatTime(recordingTime)}
          </span>
        </div>

        {/* Pause Indicator */}
        {isPaused && (
          <div className="absolute top-20 left-6 bg-yellow-500/90 backdrop-blur-sm rounded-full px-4 py-2">
            <span className="text-black font-medium text-sm">PAUSED</span>
          </div>
        )}
      </div>

      {/* Top Controls */}
      <div className={`absolute top-0 left-0 right-0 z-10 transition-all duration-300 ${showControls || !isRecording ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'
        }`}>
        <div className="bg-gradient-to-b from-black/60 to-transparent backdrop-blur-sm p-6">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.location.href = '/journal'}
              className="text-white hover:bg-white/20 gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>

            <div className="flex-1 max-w-md mx-6">
              <Input
                placeholder="Video journal title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60 text-center"
              />
            </div>

            <Button
              onClick={handleSave}
              size="sm"
              className="gap-2 bg-white/20 hover:bg-white/30 text-white border-white/20"
              disabled={!hasRecording}
            >
              <Save className="w-4 h-4" />
              Save
            </Button>
          </div>
        </div>
      </div>

      {/* Side Controls */}
      <div className={`absolute right-6 top-1/2 -translate-y-1/2 z-10 transition-all duration-300 ${showControls || !isRecording ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
        }`}>
        <div className="flex flex-col gap-4">
          {/* Camera Flip */}
          {!hasRecording && (
            <Button
              variant="ghost"
              size="lg"
              onClick={flipCamera}
              className="w-12 h-12 rounded-full bg-white/30 hover:bg-white/50 text-white border border-white/60 shadow"
            >
              <RotateCcw className="w-6 h-6 text-white" />
            </Button>
          )}

          {/* Mute Toggle */}
          <Button
            variant="ghost"
            size="lg"
            onClick={toggleMute}
            className={`w-12 h-12 rounded-full border border-white/60 shadow ${isMuted
              ? 'bg-red-500/90 hover:bg-red-600 text-white'
              : 'bg-white/30 hover:bg-white/50 text-white'
              }`}
          >
            {isMuted ? (
              <MicOff className="w-6 h-6 text-white" />
            ) : (
              <Mic className="w-6 h-6 text-white" />
            )}
          </Button>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className={`absolute bottom-0 left-0 right-0 z-10 transition-all duration-300 ${showControls || !isRecording ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'
        }`}>
        <div className="bg-gradient-to-t from-black/60 to-transparent backdrop-blur-sm p-8">
          <div className="flex items-center justify-center">
            {!isRecording ? (
              <Button
                onClick={startRecording}
                size="lg"
                className="w-20 h-20 rounded-full bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/30 transition-all duration-200 hover:scale-105"
              >
                <VideoIcon className="w-8 h-8" />
              </Button>
            ) : (
              <div className="flex items-center gap-6">
                <Button
                  onClick={pauseRecording}
                  variant="outline"
                  size="lg"
                  className="w-16 h-16 rounded-full bg-white/10 hover:bg-white/20 text-white border-white/30"
                >
                  <Pause className="w-6 h-6" />
                </Button>

                <Button
                  onClick={stopRecording}
                  size="lg"
                  className="w-20 h-20 rounded-full bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/30"
                >
                  <CircleStop className="w-8 h-8" />
                </Button>
              </div>
            )}
          </div>

          {/* Status Text */}
          <div className="text-center mt-4">
            <p className="text-white/80 text-sm">
              {isRecording && !isPaused ? 'Recording in progress - tap screen to show controls' :
                isRecording && isPaused ? 'Recording paused' :
                  hasRecording ? 'Recording complete' :
                    'Tap the red button to start recording'}
            </p>
          </div>
        </div>
      </div>

      {/* Transcript and AI Section */}
      {hasRecording && (
        <div className="absolute bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border/20 p-4 space-y-4 max-h-80 overflow-y-auto">
          {/* Transcript */}
          <Card className="bg-background/80">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm">
                <FileText className="w-4 h-4" />
                Transcript
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              {transcript ? (
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowTranscript(!showTranscript)}
                    size="sm"
                    className="w-full"
                  >
                    {showTranscript ? 'Hide' : 'Show'} Transcript
                  </Button>
                  {showTranscript && (
                    <div className="p-3 bg-muted/20 rounded-lg">
                      <p className="text-xs leading-relaxed">{transcript}</p>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-muted-foreground text-xs">Generating transcript...</p>
              )}
            </CardContent>
          </Card>

          {/* AI Chat */}
          <Card className="bg-background/80">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm">
                <MessageCircle className="w-4 h-4" />
                Ask AI about your video
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-3">
              <div className="flex gap-2">
                <Input
                  placeholder="Ask about your video..."
                  value={aiQuestion}
                  onChange={(e) => setAiQuestion(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAIQuestion()}
                  className="text-sm"
                />
                <Button
                  onClick={handleAIQuestion}
                  disabled={isProcessingAI || !aiQuestion.trim()}
                  size="sm"
                >
                  <Send className="w-3 h-3" />
                </Button>
              </div>

              {aiResponse && (
                <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                  <p className="text-xs leading-relaxed">{aiResponse}</p>
                </div>
              )}

              {isProcessingAI && (
                <div className="p-3 bg-muted/20 rounded-lg">
                  <p className="text-xs text-muted-foreground">AI is analyzing your video...</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Tap to show controls overlay */}
      {isRecording && !showControls && (
        <div
          className="absolute inset-0 z-5"
          onClick={showControlsTemporarily}
        />
      )}
    </div>
  )
}
