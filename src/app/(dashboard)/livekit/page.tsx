"use client"

import { useState } from 'react'
import { 
  LiveKitRoom, 
  VideoConference, 
  RoomAudioRenderer
} from '@livekit/components-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/badge'
import { 
  PhoneOff, 
  Bot, 
  Brain,
  MessageSquare,
  Settings,
  Users
} from 'lucide-react'
import '@livekit/components-styles'
import '@/styles/livekit.css'
import LiveKitAIAgent from '@/components/ai/LiveKitAIAgent'

interface AIAgentMessage {
  id: string
  content: string
  timestamp: Date
  type: 'user' | 'agent'
  emotion?: string
  confidence?: number
}

export default function LiveKitPage() {
  const [token, setToken] = useState<string>('')
  const [wsURL, setWsURL] = useState<string>(process.env.NEXT_PUBLIC_LIVEKIT_URL || 'wss://daksha-fuq54ytc.livekit.cloud')
  const [roomName, setRoomName] = useState<string>('daksha-ai-session')
  const [userName, setUserName] = useState<string>('User')
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const [aiMessages, setAiMessages] = useState<AIAgentMessage[]>([])
  const [isAIActive, setIsAIActive] = useState<boolean>(false)
  const [roomStats] = useState({
    participants: 0,
    duration: 0,
    quality: 'good'
  })

  // Generate access token
  const generateToken = async () => {
    try {
      const response = await fetch('/api/livekit/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          roomName,
          participantName: userName,
        }),
      })
      
      if (!response.ok) {
        throw new Error('Failed to generate token')
      }
      
      const data = await response.json() as { token: string }
      setToken(data.token)
      setIsConnected(true)
    } catch (error) {
      console.error('Error generating token:', error)
    }
  }

  // AI Agent Integration
  const activateAIAgent = async () => {
    try {
      setIsAIActive(true)
      const response = await fetch('/api/livekit/ai-agent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          roomName,
          action: 'join',
        }),
      })
      
      if (!response.ok) {
        throw new Error('Failed to activate AI agent')
      }
      
      // Add welcome message from AI
      const welcomeMessage: AIAgentMessage = {
        id: Date.now().toString(),
        content: "Hello! I'm Daksha, your AI companion. I'm here to help you with journaling insights, emotional support, and life guidance. How can I assist you today?",
        timestamp: new Date(),
        type: 'agent',
        emotion: 'welcoming',
        confidence: 0.95
      }
      
      setAiMessages(prev => [...prev, welcomeMessage])
    } catch (error) {
      console.error('Error activating AI agent:', error)
      setIsAIActive(false)
    }
  }


  if (!isConnected) {
    return (
      <div className="notion-page py-12 space-y-6">
        <div className="flex items-center gap-3 mb-8">
          <Bot className="w-6 h-6 text-blue-500" />
          <h1 className="notion-title font-serif">AI Voice Session</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Session Setup
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Room Name</label>
                <Input
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                  placeholder="Enter room name"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Your Name</label>
                <Input
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">LiveKit Server URL</label>
                <Input
                  value={wsURL}
                  onChange={(e) => setWsURL(e.target.value)}
                  placeholder="wss://your-livekit-server.com"
                />
              </div>
              <Button 
                onClick={generateToken} 
                className="w-full"
                disabled={!roomName || !userName}
              >
                Join AI Session
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5" />
                AI Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                  <Bot className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="font-medium text-blue-900 dark:text-blue-100">Daksha AI Agent</p>
                    <p className="text-sm text-blue-700 dark:text-blue-300">Real-time emotional intelligence and journaling insights</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                  <MessageSquare className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="font-medium text-green-900 dark:text-green-100">Live Transcription</p>
                    <p className="text-sm text-green-700 dark:text-green-300">Automatic speech-to-text with emotion detection</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                  <Brain className="w-5 h-5 text-purple-500" />
                  <div>
                    <p className="font-medium text-purple-900 dark:text-purple-100">Memory Integration</p>
                    <p className="text-sm text-purple-700 dark:text-purple-300">Connects with your journal and mind palace</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="notion-page py-12 space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Bot className="w-6 h-6 text-blue-500" />
          <h1 className="notion-title font-serif">AI Voice Session</h1>
          <Badge variant="outline" className="ml-2">
            <Users className="w-3 h-3 mr-1" />
            {roomStats.participants} participants
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={activateAIAgent}
            disabled={isAIActive}
            variant={isAIActive ? "default" : "outline"}
            size="sm"
          >
            <Bot className="w-4 h-4 mr-2" />
            {isAIActive ? 'AI Active' : 'Activate AI'}
          </Button>
          <Button
            onClick={() => setIsConnected(false)}
            variant="destructive"
            size="sm"
          >
            <PhoneOff className="w-4 h-4 mr-2" />
            Leave
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Video Conference Area */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-0">
              <LiveKitRoom
                video={true}
                audio={true}
                token={token}
                serverUrl={wsURL}
                data-lk-theme="default"
                style={{ height: '500px' }}
                onConnected={() => {
                  // Room connection handled by LiveKit internally
                  // We'll get the room instance through other means
                }}
              >
                <VideoConference />
                <RoomAudioRenderer />
                <LiveKitAIAgent 
                  room={null}
                  isActive={isAIActive}
                  onMessage={(message) => setAiMessages(prev => [...prev, message as AIAgentMessage])}
                  userProfile={{ name: userName }}
                />
              </LiveKitRoom>
            </CardContent>
          </Card>
        </div>

        {/* AI Chat Panel */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                AI Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {aiMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`p-3 rounded-lg ${
                      message.type === 'agent'
                        ? 'bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-500'
                        : 'bg-gray-50 dark:bg-gray-950/20 border-l-4 border-gray-500'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {message.type === 'agent' ? (
                        <Bot className="w-4 h-4 text-blue-500" />
                      ) : (
                        <Users className="w-4 h-4 text-gray-500" />
                      )}
                      <span className="text-xs font-medium">
                        {message.type === 'agent' ? 'Daksha AI' : 'You'}
                      </span>
                      {message.emotion && (
                        <Badge variant="secondary" className="text-xs">
                          {message.emotion}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5" />
                Session Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Participants:</span>
                <span className="font-medium">{roomStats.participants}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">AI Status:</span>
                <Badge variant={isAIActive ? "default" : "secondary"}>
                  {isAIActive ? "Active" : "Inactive"}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Connection:</span>
                <Badge variant="default">Connected</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}