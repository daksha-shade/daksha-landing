"use client"

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { 
  Mic, 
  MicOff, 
  VolumeX,
  MessageSquare,
  X
} from 'lucide-react'

interface ConversationMessage {
  id: string
  content: string
  timestamp: Date
  type: 'user' | 'daksha'
  emotion?: string
  isListening?: boolean
}

export default function DakshaVoicePage() {
  const [isListening, setIsListening] = useState<boolean>(false)
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false)
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const [messages, setMessages] = useState<ConversationMessage[]>([])
  const [showHistory, setShowHistory] = useState<boolean>(false)
  const [currentTranscript, setCurrentTranscript] = useState<string>('')
  const [connectionStatus, setConnectionStatus] = useState<'disconnected' | 'connecting' | 'connected'>('disconnected')
  
  const recognitionRef = useRef<unknown>(null)
  const synthRef = useRef<SpeechSynthesis | null>(null)

  // Initialize speech recognition and synthesis
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Initialize speech recognition
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition()
        recognition.continuous = true
        recognition.interimResults = true
        recognition.lang = 'en-US'
        
        recognition.onstart = () => {
          setIsListening(true)
          setConnectionStatus('connected')
        }
        
        recognition.onresult = (event) => {
          let transcript = ''
          for (let i = event.resultIndex; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript
          }
          setCurrentTranscript(transcript)
          
          // If final result, process with Daksha
          if (event.results[event.results.length - 1].isFinal) {
            processUserInput(transcript)
            setCurrentTranscript('')
          }
        }
        
        recognition.onerror = (event) => {
          console.error('Speech recognition error:', event.error)
          setIsListening(false)
          setConnectionStatus('disconnected')
        }
        
        recognition.onend = () => {
          setIsListening(false)
        }
        
        recognitionRef.current = recognition
      }
      
      // Initialize speech synthesis
      synthRef.current = window.speechSynthesis
    }
  }, [])

  // Process user input and get Daksha's response
  const processUserInput = async (transcript: string) => {
    if (!transcript.trim()) return
    
    // Add user message
    const userMessage: ConversationMessage = {
      id: Date.now().toString(),
      content: transcript,
      timestamp: new Date(),
      type: 'user'
    }
    setMessages(prev => [...prev, userMessage])
    
    try {
      // Call Daksha AI API (using Groq)
      const response = await fetch('/api/daksha/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: transcript,
          conversationHistory: messages.slice(-5) // Last 5 messages for context
        }),
      })
      
      if (!response.ok) {
        throw new Error('Failed to get Daksha response')
      }
      
      const data = await response.json() as { response: string; emotion?: string }
      
      // Add Daksha's response
      const dakshaMessage: ConversationMessage = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        timestamp: new Date(),
        type: 'daksha',
        emotion: data.emotion
      }
      setMessages(prev => [...prev, dakshaMessage])
      
      // Speak Daksha's response
      speakResponse(data.response)
      
    } catch (error) {
      console.error('Error processing input:', error)
      const errorMessage: ConversationMessage = {
        id: (Date.now() + 1).toString(),
        content: "I'm having trouble connecting right now. Please try again.",
        timestamp: new Date(),
        type: 'daksha'
      }
      setMessages(prev => [...prev, errorMessage])
    }
  }

  // Speak Daksha's response
  const speakResponse = (text: string) => {
    if (synthRef.current && text) {
      setIsSpeaking(true)
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.9
      utterance.pitch = 1.1
      utterance.volume = 0.8
      
      utterance.onend = () => {
        setIsSpeaking(false)
      }
      
      utterance.onerror = () => {
        setIsSpeaking(false)
      }
      
      synthRef.current.speak(utterance)
    }
  }

  // Start/stop listening
  const toggleListening = () => {
    if (recognitionRef.current) {
      if (isListening) {
        (recognitionRef.current as { stop: () => void }).stop()
      } else {
        (recognitionRef.current as { start: () => void }).start()
      }
    }
  }

  // Stop speaking
  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel()
      setIsSpeaking(false)
    }
  }

  // Connect to Daksha
  const connectToDaksha = async () => {
    setConnectionStatus('connecting')
    
    // Add welcome message
    const welcomeMessage: ConversationMessage = {
      id: Date.now().toString(),
      content: "Hello! I'm Daksha, your personal AI companion. I'm here to help you with journaling, emotional support, and life guidance. How are you feeling today?",
      timestamp: new Date(),
      type: 'daksha',
      emotion: 'welcoming'
    }
    
    setMessages([welcomeMessage])
    setIsConnected(true)
    setConnectionStatus('connected')
    
    // Speak welcome message
    speakResponse(welcomeMessage.content)
  }


  if (!isConnected) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center space-y-8 max-w-md mx-auto px-6">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center">
              <span className="text-2xl font-serif font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                D
              </span>
            </div>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-3xl font-serif font-bold text-gray-900 dark:text-white">
              Talk with Daksha
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Your personal AI companion for journaling, emotional support, and life guidance
            </p>
          </div>
          
          <Button 
            onClick={connectToDaksha}
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            disabled={connectionStatus === 'connecting'}
          >
            {connectionStatus === 'connecting' ? 'Connecting...' : 'Start Conversation'}
          </Button>
          
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Click to begin your voice conversation with Daksha
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Chat History Sidebar */}
      <div className={`fixed left-0 top-0 h-full w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 z-20 ${
        showHistory ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-gray-900 dark:text-white">Conversation</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowHistory(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`p-3 rounded-lg ${
                message.type === 'daksha'
                  ? 'bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-500'
                  : 'bg-gray-50 dark:bg-gray-950/20 border-l-4 border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                  {message.type === 'daksha' ? 'Daksha' : 'You'}
                </span>
                <span className="text-xs text-gray-500">
                  {message.timestamp.toLocaleTimeString()}
                </span>
              </div>
              <p className="text-sm text-gray-800 dark:text-gray-200">{message.content}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Voice Interface */}
      <div className="flex flex-col items-center justify-center h-full relative">
        {/* History Toggle Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowHistory(true)}
          className="absolute top-6 left-6 z-10"
        >
          <MessageSquare className="w-4 h-4 mr-2" />
          History
        </Button>

        {/* Disconnect Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsConnected(false)}
          className="absolute top-6 right-6 z-10 text-red-600 hover:text-red-700"
        >
          <X className="w-4 h-4 mr-2" />
          End
        </Button>

        {/* Central Voice Interface */}
        <div className="text-center space-y-8 max-w-2xl mx-auto px-6">
          {/* Daksha Avatar */}
          <div className="relative">
            <div className={`w-32 h-32 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center transition-all duration-300 ${
              isSpeaking ? 'scale-110 shadow-2xl' : isListening ? 'scale-105 shadow-xl' : 'shadow-lg'
            }`}>
              <div className="w-24 h-24 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center">
                <span className="text-4xl font-serif font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  D
                </span>
              </div>
            </div>
            
            {/* Status Indicator */}
            <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-full text-xs font-medium ${
              isSpeaking ? 'bg-green-500 text-white' : 
              isListening ? 'bg-blue-500 text-white' : 
              'bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
            }`}>
              {isSpeaking ? 'Speaking...' : isListening ? 'Listening...' : 'Ready'}
            </div>
          </div>

          {/* Current Transcript */}
          {currentTranscript && (
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg border border-gray-200 dark:border-gray-700">
              <p className="text-gray-800 dark:text-gray-200 italic">"{currentTranscript}"</p>
            </div>
          )}

          {/* Last Daksha Message */}
          {messages.length > 0 && messages[messages.length - 1].type === 'daksha' && (
            <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-6 shadow-lg border border-blue-200 dark:border-blue-800">
              <p className="text-blue-900 dark:text-blue-100 text-lg">
                {messages[messages.length - 1].content}
              </p>
            </div>
          )}

          {/* Voice Controls */}
          <div className="flex items-center justify-center gap-6">
            <Button
              onClick={toggleListening}
              size="lg"
              variant={isListening ? "default" : "outline"}
              className={`w-16 h-16 rounded-full ${
                isListening 
                  ? 'bg-red-500 hover:bg-red-600 text-white' 
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
            </Button>

            {isSpeaking && (
              <Button
                onClick={stopSpeaking}
                size="lg"
                variant="outline"
                className="w-16 h-16 rounded-full"
              >
                <VolumeX className="w-6 h-6" />
              </Button>
            )}
          </div>

          {/* Instructions */}
          <div className="text-center space-y-2">
            <p className="text-gray-600 dark:text-gray-300">
              {isListening ? 'Speak now...' : 'Click the microphone to start talking'}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Daksha is here to listen and help with your thoughts and feelings
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}