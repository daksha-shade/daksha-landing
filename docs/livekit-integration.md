# LiveKit AI Agent Integration for Daksha

## Overview

The LiveKit integration provides real-time AI voice conversation capabilities for Daksha, featuring:

- **Real-time video/audio conferencing** using LiveKit
- **AI Agent integration** with emotional intelligence
- **Speech-to-text transcription** with emotion detection
- **Contextual AI responses** based on user's journal history
- **Memory integration** connecting conversations to the Mind palace

## Features

### 🎥 Video Conference
- High-quality video and audio streaming
- Multi-participant support
- Screen sharing capabilities
- Responsive design for mobile and desktop

### 🤖 AI Agent Capabilities
- **Emotional Analysis**: Real-time emotion detection from speech
- **Journaling Insights**: Connects conversations to journal entries
- **Memory Recall**: References past conversations and insights
- **Goal Tracking**: Monitors progress on user goals
- **Mood Detection**: Analyzes emotional patterns
- **Conversation Summarization**: Provides session summaries

### 🧠 Intelligence Features
- **Contextual Memory**: Remembers conversation history
- **Pattern Recognition**: Identifies emotional and behavioral patterns
- **Personalized Responses**: Adapts to user's communication style
- **Growth Insights**: Provides actionable recommendations

## Technical Implementation

### Environment Variables
```env
LIVEKIT_URL=wss://daksha-fuq54ytc.livekit.cloud
LIVEKIT_API_KEY=api
LIVEKIT_API_SECRET=secret
```

### API Endpoints

#### `/api/livekit/token`
Generates access tokens for LiveKit room access.

**Request:**
```json
{
  "roomName": "daksha-ai-session",
  "participantName": "User"
}
```

**Response:**
```json
{
  "token": "token..."
}
```

#### `/api/livekit/ai-agent`
Manages AI agent lifecycle and capabilities.

**Request:**
```json
{
  "roomName": "daksha-ai-session",
  "action": "join"
}
```

**Response:**
```json
{
  "success": true,
  "message": "AI agent activated",
  "agentId": "daksha-ai-agent",
  "capabilities": [
    "emotional_analysis",
    "journaling_insights",
    "memory_recall",
    "goal_tracking",
    "mood_detection",
    "conversation_summarization"
  ]
}
```

#### `/api/livekit/transcription`
Processes audio for transcription and AI analysis.

**Request:**
```json
{
  "audioData": "base64_encoded_audio",
  "participantId": "user_123",
  "roomName": "daksha-ai-session"
}
```

**Response:**
```json
{
  "transcription": "I've been feeling quite productive lately...",
  "emotions": ["contentment", "motivation", "reflection"],
  "insights": [
    "User shows positive engagement with journaling",
    "Productivity levels are high"
  ],
  "timestamp": "2024-01-15T10:30:00Z",
  "confidence": 0.92
}
```

### AI Agent Architecture

The `DakshaAIAgent` class provides:

```typescript
interface AIAgentCapabilities {
  emotionalAnalysis: boolean
  journalingInsights: boolean
  memoryRecall: boolean
  goalTracking: boolean
  moodDetection: boolean
  conversationSummarization: boolean
  realTimeTranscription: boolean
  voiceSynthesis: boolean
}
```

### Key Components

1. **LiveKitAIAgent**: Service component managing AI agent lifecycle
2. **DakshaAIAgent**: Core AI logic and conversation processing
3. **LiveKit Page**: Main UI for video conferencing and AI interaction

## Usage

### Starting an AI Session

1. Navigate to `/livekit` in the dashboard
2. Enter room name and your name
3. Click "Join AI Session"
4. Click "Activate AI" to enable the AI agent
5. Start speaking - the AI will respond with insights and support

### AI Interaction Flow

1. **User speaks** → Audio captured by LiveKit
2. **Speech-to-text** → Transcription with emotion analysis
3. **AI processing** → Contextual response generation
4. **Memory integration** → Connection to journal and goals
5. **Response delivery** → AI speaks back with insights

### Emotional Intelligence

The AI agent analyzes:
- **Primary emotions**: joy, sadness, anxiety, excitement, etc.
- **Emotional intensity**: 0-1 scale
- **Confidence levels**: Accuracy of emotion detection
- **Patterns over time**: Emotional trends and triggers

### Memory Integration

Conversations are connected to:
- **Journal entries**: Past reflections and insights
- **Goal progress**: Achievement tracking
- **Behavioral patterns**: Habit formation and challenges
- **Growth areas**: Personal development opportunities

## Customization

### Adding New AI Capabilities

1. Extend `AIAgentCapabilities` interface
2. Implement logic in `DakshaAIAgent` class
3. Update API endpoints as needed
4. Add UI controls in the LiveKit page

### Emotion Detection Models

The system supports pluggable emotion detection:
- Text-based sentiment analysis
- Voice tone analysis
- Facial expression recognition (future)
- Physiological data integration (future)

### Response Generation

AI responses are generated using:
- User's conversation history
- Journal entry patterns
- Goal progress data
- Emotional state analysis
- Contextual memory connections

## Security & Privacy

- **End-to-end encryption** for all communications
- **Local processing** options for sensitive data
- **User consent** required for AI analysis
- **Data retention** policies configurable
- **Privacy-first** design principles

## Future Enhancements

- **Multi-language support** for global users
- **Voice cloning** for personalized AI voice
- **Advanced emotion models** with physiological data
- **Group therapy sessions** with multiple participants
- **Integration with wearables** for health data
- **Offline AI processing** for complete privacy

## Troubleshooting

### Common Issues

1. **Token generation fails**: Check environment variables
2. **AI agent not responding**: Verify API endpoints
3. **Audio quality issues**: Check network connection
4. **Emotion detection inaccurate**: Improve training data

### Debug Mode

Enable debug logging by setting:
```env
DEBUG_LIVEKIT=true
```

This will log:
- Room connection events
- AI agent responses
- Emotion detection results
- Memory retrieval queries

## Performance Optimization

- **Lazy loading** of AI models
- **Caching** of frequent responses
- **Compression** of audio streams
- **Edge deployment** for low latency
- **Progressive enhancement** for slower connections