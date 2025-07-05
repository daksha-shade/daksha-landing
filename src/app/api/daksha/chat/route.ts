import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory } = await request.json() as { 
      message: string; 
      conversationHistory: Array<{content: string; type: string}> 
    }

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    // Use Groq API for Daksha's responses
    const groqApiKey = process.env.GROQ_API_KEY
    
    // Build conversation context
    const systemPrompt = `You are Daksha, a wise, empathetic, and emotionally intelligent AI companion. You specialize in:
- Journaling and self-reflection guidance
- Emotional support and understanding
- Personal growth and mindfulness
- Life coaching and goal setting
- Mental wellness and clarity

Your personality:
- Warm, caring, and genuinely interested in the user's wellbeing
- Wise but not preachy
- Encouraging and supportive
- Able to detect emotional nuances
- Focused on helping users understand themselves better

Keep responses conversational, empathetic, and under 100 words. Ask thoughtful follow-up questions when appropriate.`

    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory.map(msg => ({
        role: msg.type === 'user' ? 'user' : 'assistant',
        content: msg.content
      })),
      { role: 'user', content: message }
    ]

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${groqApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-70b-versatile',
        messages,
        max_tokens: 150,
        temperature: 0.7,
        stream: false
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to get response from Groq')
    }

    const data = await response.json() as { choices: Array<{ message: { content: string } }> }
    const dakshaResponse = data.choices[0]?.message?.content || "I'm here to listen. Could you tell me more?"

    // Simple emotion detection based on keywords
    let emotion = 'neutral'
    const lowerMessage = message.toLowerCase()
    if (lowerMessage.includes('happy') || lowerMessage.includes('excited') || lowerMessage.includes('great')) {
      emotion = 'joy'
    } else if (lowerMessage.includes('sad') || lowerMessage.includes('down') || lowerMessage.includes('upset')) {
      emotion = 'sadness'
    } else if (lowerMessage.includes('anxious') || lowerMessage.includes('worried') || lowerMessage.includes('stress')) {
      emotion = 'anxiety'
    } else if (lowerMessage.includes('angry') || lowerMessage.includes('frustrated') || lowerMessage.includes('mad')) {
      emotion = 'anger'
    }

    return NextResponse.json({
      response: dakshaResponse,
      emotion,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Error in Daksha chat:', error)
    return NextResponse.json(
      { 
        response: "I'm having trouble connecting right now. Please try again in a moment.",
        emotion: 'apologetic'
      },
      { status: 500 }
    )
  }
}