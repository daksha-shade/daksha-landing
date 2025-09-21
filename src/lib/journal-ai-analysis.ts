import "server-only";
import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";

export interface AIAnalysis {
    summary: string; // Markdown format
    insights: string[];
    sentiment: {
        overall: string; // positive, negative, neutral, mixed
        confidence: number; // 0-1
        emotions: Array<{
            emotion: string;
            intensity: number; // 0-1
        }>;
    };
}

export async function generateAISummaryAndSentiment(
    content: string,
    context: {
        mood?: string;
        emotionalTags?: string[];
        type?: string;
    }
): Promise<AIAnalysis> {
    try {
        const prompt = `
Analyze this journal entry and provide comprehensive insights:

**Content:** "${content}"
${context.mood ? `**Mood:** ${context.mood}` : ''}
${context.emotionalTags ? `**Emotional Tags:** ${context.emotionalTags.join(', ')}` : ''}
${context.type ? `**Entry Type:** ${context.type}` : ''}

Please provide:

1. **Summary** (2-3 sentences in markdown format with emphasis on key themes)
2. **Key Insights** (3-4 bullet points about patterns, growth, or notable observations)
3. **Sentiment Analysis** with:
   - Overall sentiment (positive, negative, neutral, or mixed)
   - Confidence score (0-1)
   - Top 3-5 emotions detected with intensity scores (0-1)

Format your response as JSON:
{
  "summary": "**Key themes:** Brief markdown summary with *emphasis* on important aspects...",
  "insights": [
    "Insight about emotional patterns or growth",
    "Observation about recurring themes",
    "Note about personal development or challenges"
  ],
  "sentiment": {
    "overall": "positive|negative|neutral|mixed",
    "confidence": 0.85,
    "emotions": [
      {"emotion": "gratitude", "intensity": 0.8},
      {"emotion": "hope", "intensity": 0.6},
      {"emotion": "anxiety", "intensity": 0.3}
    ]
  }
}

Be empathetic, supportive, and focus on personal growth and self-awareness. Use markdown formatting in the summary for better readability.
`;

        const result = await generateText({
            model: openai("gpt-4o"),
            prompt,
            temperature: 0.7,
            maxTokens: 800,
        });

        // Parse the JSON response, handling markdown code blocks
        let jsonText = result.text.trim();

        // Remove markdown code blocks if present
        if (jsonText.startsWith('```json')) {
            jsonText = jsonText.replace(/^```json\s*/, '').replace(/\s*```$/, '');
        } else if (jsonText.startsWith('```')) {
            jsonText = jsonText.replace(/^```\s*/, '').replace(/\s*```$/, '');
        }

        const parsed = JSON.parse(jsonText);

        return {
            summary: parsed.summary || "**Summary:** This journal entry captures your thoughts and experiences from this moment in time.",
            insights: Array.isArray(parsed.insights) ? parsed.insights : [
                "Your writing reflects your current emotional state and perspective",
                "This entry contributes to your personal growth journey",
                "Regular journaling helps build self-awareness over time"
            ],
            sentiment: {
                overall: parsed.sentiment?.overall || "neutral",
                confidence: parsed.sentiment?.confidence || 0.5,
                emotions: Array.isArray(parsed.sentiment?.emotions) ? parsed.sentiment.emotions : [
                    { emotion: "reflective", intensity: 0.7 }
                ]
            }
        };
    } catch (error) {
        console.error("Error generating AI analysis:", error);

        // Return fallback analysis
        return {
            summary: "**Summary:** This journal entry captures your thoughts and experiences from this moment in time.",
            insights: [
                "Your writing reflects your current emotional state and perspective",
                "This entry contributes to your personal growth journey",
                "Regular journaling helps build self-awareness over time"
            ],
            sentiment: {
                overall: "neutral",
                confidence: 0.5,
                emotions: [
                    { emotion: "reflective", intensity: 0.7 }
                ]
            }
        };
    }
}

export async function generateSentimentOnly(content: string): Promise<AIAnalysis['sentiment']> {
    try {
        const prompt = `
Analyze the sentiment of this text and detect emotions:

"${content}"

Provide a JSON response with:
{
  "overall": "positive|negative|neutral|mixed",
  "confidence": 0.85,
  "emotions": [
    {"emotion": "emotion_name", "intensity": 0.8}
  ]
}

Focus on the primary emotions and overall sentiment. Confidence should be between 0-1.
`;

        const result = await generateText({
            model: openai("gpt-4o"),
            prompt,
            temperature: 0.3,
            maxTokens: 300,
        });

        let jsonText = result.text.trim();
        if (jsonText.startsWith('```json')) {
            jsonText = jsonText.replace(/^```json\s*/, '').replace(/\s*```$/, '');
        } else if (jsonText.startsWith('```')) {
            jsonText = jsonText.replace(/^```\s*/, '').replace(/\s*```$/, '');
        }

        const parsed = JSON.parse(jsonText);

        return {
            overall: parsed.overall || "neutral",
            confidence: parsed.confidence || 0.5,
            emotions: Array.isArray(parsed.emotions) ? parsed.emotions : [
                { emotion: "neutral", intensity: 0.5 }
            ]
        };
    } catch (error) {
        console.error("Error generating sentiment analysis:", error);
        return {
            overall: "neutral",
            confidence: 0.5,
            emotions: [{ emotion: "neutral", intensity: 0.5 }]
        };
    }
}