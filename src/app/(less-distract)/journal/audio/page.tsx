"use client"

import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, Save, Mic, Pause, CircleStop } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'

export default function AudioJournalPage() {
  const [title, setTitle] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [hasRecording, setHasRecording] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [showTranscript, setShowTranscript] = useState(false)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const intervalRef = useRef<any>(null)
  const blobRef = useRef<Blob | null>(null)
  const mimeType = 'audio/webm'
  const [localPlaybackUrl, setLocalPlaybackUrl] = useState<string | null>(null)

  useEffect(() => () => clearInterval(intervalRef.current), [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const startTimer = () => {
    clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => setRecordingTime(t => t + 1), 1000)
  }
  const stopTimer = () => clearInterval(intervalRef.current)

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mr = new MediaRecorder(stream, { mimeType })
      chunksRef.current = []
      mr.ondataavailable = (e) => { if (e.data && e.data.size > 0) chunksRef.current.push(e.data) }
      mr.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: mimeType })
        blobRef.current = blob
        setHasRecording(true)
        try { setLocalPlaybackUrl(URL.createObjectURL(blob)) } catch {}
        await transcribe(blob)
      }
      mediaRecorderRef.current = mr
      mr.start(250)
      setRecordingTime(0)
      setIsRecording(true)
      setIsPaused(false)
      startTimer()
    } catch (e) {
      console.error(e)
      toast.error('Microphone permission denied')
    }
  }

  const pauseRecording = () => {
    const mr = mediaRecorderRef.current
    if (!mr) return
    if (isPaused) {
      mr.resume(); setIsPaused(false); startTimer()
    } else {
      mr.pause(); setIsPaused(true); stopTimer()
    }
  }

  const stopRecording = () => {
    const mr = mediaRecorderRef.current
    if (!mr) return
    mr.stop()
    mr.stream.getTracks().forEach(t => t.stop())
    setIsRecording(false)
    setIsPaused(false)
    stopTimer()
  }

  const transcribe = async (blob: Blob) => {
    try {
      const fd = new FormData()
      fd.append('audio', new File([blob], `recording-${Date.now()}.webm`, { type: mimeType }))
      fd.append('action', 'transcribe')
      const res = await fetch('/api/journal/audio', { method: 'POST', body: fd })
      if (res.ok) {
        const data = await res.json()
        setTranscript(data.transcript || '')
      } else {
        toast.error('Transcription failed')
      }
    } catch (e) {
      console.error(e); toast.error('Transcription error')
    }
  }

  const uploadToR2 = async (blob: Blob) => {
    const fd = new FormData()
    fd.append('file', new File([blob], `journal-audio-${Date.now()}.webm`, { type: mimeType }))
    const res = await fetch('/api/upload', { method: 'POST', body: fd })
    if (!res.ok) throw new Error('Upload failed')
    const json = await res.json()
    return json.file?.url as string
  }

  const handleSave = async () => {
    try {
      if (!blobRef.current) { toast.error('No recording found'); return }
      const audioUrl = await uploadToR2(blobRef.current)
      const response = await fetch('/api/journal', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim() || 'Audio Journal',
          type: 'audio',
          duration: recordingTime,
          transcript,
          plainTextContent: transcript,
          audioUrl,
          entryDate: new Date().toISOString(),
          generateAI: true,
        })
      })
      if (!response.ok) throw new Error('Save failed')
      const result = await response.json()
      toast.success('Journal saved')
      window.location.href = `/journal/${result.id}`
    } catch (e) { console.error(e); toast.error('Save failed') }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex items-center justify-between p-4 border-b">
        <Button variant="ghost" size="sm" onClick={() => (window.location.href = '/journal')} className="gap-2">
          <ArrowLeft className="w-4 h-4" /> Back
        </Button>
        <Button onClick={handleSave} size="sm" className="gap-2" disabled={!hasRecording}>
          <Save className="w-4 h-4" /> Save
        </Button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 max-w-2xl mx-auto w-full">
        <div className="w-full space-y-8 text-center">
          <Input placeholder="Audio journal title..." value={title} onChange={(e) => setTitle(e.target.value)} className="text-2xl font-light border-0 focus:ring-0 text-center placeholder:text-muted-foreground/40" />
          <div className="space-y-8">
            <div className="text-6xl font-mono font-light text-muted-foreground">{formatTime(recordingTime)}</div>
            <div className="flex justify-center">
              <div className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 ${isRecording && !isPaused ? 'bg-red-500 scale-110 animate-pulse' : isRecording && isPaused ? 'bg-yellow-500' : 'bg-muted/20 hover:bg-muted/30'}`}>
                {!isRecording ? (
                  <Button onClick={startRecording} variant="ghost" size="lg" className="w-20 h-20 rounded-full"><Mic className="w-10 h-10" /></Button>
                ) : (
                  <Button onClick={pauseRecording} variant="ghost" size="lg" className="w-20 h-20 rounded-full text-white"><Pause className="w-10 h-10" /></Button>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">{isRecording ? (isPaused ? 'Paused' : 'Recording...') : hasRecording ? 'Ready to save' : 'Tap to start recording'}</div>
              {isRecording && (
                <Button variant="ghost" size="sm" onClick={stopRecording} className="gap-2"><CircleStop className="w-4 h-4" /> Stop</Button>
              )}
            </div>
          </div>

          {hasRecording && (
            <div className="space-y-4">
              {localPlaybackUrl && (
                <audio src={localPlaybackUrl} controls className="w-full" />
              )}
              <Button variant="outline" size="sm" onClick={() => setShowTranscript(s => !s)}>{showTranscript ? 'Hide transcript' : 'Show transcript'}</Button>
              {showTranscript && (
                <Card>
                  <CardHeader><CardTitle className="text-left text-sm">Transcript</CardTitle></CardHeader>
                  <CardContent className="text-left text-sm text-muted-foreground whitespace-pre-wrap">{transcript || 'Processing...'}</CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
