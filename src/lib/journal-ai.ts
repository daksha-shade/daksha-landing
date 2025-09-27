import "server-only";
import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";

export interface AIInsights {
    summary: string;
    insights: string[];
    questions: string[];
}

export async function generateAIInsights(
    content: string,
    context: {
        mood?: string;
        emotionalTags?: string[];
        type?: string;
    }
): Promise<AIInsights> {
    try {
        const prompt = `
Analyze this journal entry and provide insights:

Content: "${content}"
${context.mood ? `Mood: ${context.mood}` : ''}
${context.emotionalTags ? `Emotional Tags: ${context.emotionalTags.join(', ')}` : ''}
${context.type ? `Entry Type: ${context.type}` : ''}

Please provide:
1. A brief summary (1-2 sentences)
2. 2-3 key insights or patterns you notice
3. 2-3 thoughtful reflection questions for the user

Format your response as JSON with the following structure:
{
  "summary": "Brief summary here",
  "insights": ["Insight 1", "Insight 2", "Insight 3"],
  "questions": ["Question 1", "Question 2", "Question 3"]
}

Be empathetic, supportive, and focus on personal growth and self-awareness.
`;

        const result = await generateText({
            model: openai("gpt-4o"),
            prompt,
            temperature: 0.7,
            maxCompletionTokens: 500,
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
            summary: parsed.summary || "No summary generated",
            insights: Array.isArray(parsed.insights) ? parsed.insights : [],
            questions: Array.isArray(parsed.questions) ? parsed.questions : [],
        };
    } catch (error) {
        console.error("Error generating AI insights:", error);

        // Return fallback insights
        return {
            summary: "This journal entry captures your thoughts and experiences from this moment in time.",
            insights: [
                "Your writing reflects your current emotional state and perspective",
                "This entry contributes to your personal growth journey",
                "Regular journaling helps build self-awareness over time"
            ],
            questions: [
                "What emotions were most prominent while writing this?",
                "How might you feel about this entry when you read it in the future?",
                "What would you like to explore further from these thoughts?"
            ]
        };
    }
}

export async function generateTranscript(audioUrl: string): Promise<string> {
    try {
        // Note: This would require downloading the audio file and using OpenAI's Whisper API
        // For now, return a placeholder
        console.log("Generating transcript for:", audioUrl);

        // In a real implementation, you would:
        // 1. Download the audio file from R2
        // 2. Send it to OpenAI's Whisper API
        // 3. Return the transcript

        return "Transcript generation not yet implemented";
    } catch (error) {
        console.error("Error generating transcript:", error);
        throw error;
    }
}

export async function generateAudioFromText(text: string): Promise<string> {
    try {
        // Note: This would use OpenAI's TTS API
        // For now, return a placeholder
        console.log("Generating audio for text:", text.substring(0, 100));

        // In a real implementation, you would:
        // 1. Send text to OpenAI's TTS API
        // 2. Upload the generated audio to R2
        // 3. Return the R2 URL

        return "Audio generation not yet implemented";
    } catch (error) {
        console.error("Error generating audio:", error);
        throw error;
    }
}