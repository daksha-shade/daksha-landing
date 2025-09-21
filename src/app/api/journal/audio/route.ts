import { NextRequest, NextResponse } from "next/server";
import { stackServerApp } from "@/stack";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
    try {
        const user = await stackServerApp.getUser({ or: "return-null" });
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const formData = await req.formData();
        const audioFile = formData.get("audio") as File;
        const action = formData.get("action") as string; // "transcribe" or "generate"

        if (!audioFile && action === "transcribe") {
            return NextResponse.json({ error: "Audio file is required for transcription" }, { status: 400 });
        }

        if (action === "transcribe") {
            // Convert audio to transcript using OpenAI Whisper
            const transcription = await openai.audio.transcriptions.create({
                file: audioFile,
                model: "whisper-1",
                language: "en", // You can make this dynamic
                response_format: "verbose_json",
            });

            return NextResponse.json({
                transcript: transcription.text,
                confidence: transcription.segments ?
                    transcription.segments.reduce((acc, seg) => acc + (seg.avg_logprob || 0), 0) / transcription.segments.length :
                    null,
                duration: transcription.duration,
                segments: transcription.segments,
            });
        }

        if (action === "generate") {
            const text = formData.get("text") as string;
            const voice = (formData.get("voice") as string) || "alloy";

            if (!text) {
                return NextResponse.json({ error: "Text is required for audio generation" }, { status: 400 });
            }

            // Generate audio using OpenAI TTS
            const mp3 = await openai.audio.speech.create({
                model: "tts-1",
                voice: voice as any,
                input: text,
                response_format: "mp3",
            });

            const buffer = Buffer.from(await mp3.arrayBuffer());

            // Upload to R2 storage
            const uploadResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001'}/api/upload`, {
                method: "POST",
                body: (() => {
                    const formData = new FormData();
                    const audioBlob = new Blob([buffer], { type: "audio/mpeg" });
                    formData.append("file", audioBlob, `tts-${Date.now()}.mp3`);
                    return formData;
                })(),
            });

            if (!uploadResponse.ok) {
                throw new Error("Failed to upload generated audio");
            }

            const uploadResult = (await uploadResponse.json()) as any;

            return NextResponse.json({
                audioUrl: uploadResult.file.url,
                duration: null, // TTS doesn't provide duration
                message: "Audio generated successfully",
            });
        }

        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    } catch (error) {
        console.error("Audio processing error:", error);
        return NextResponse.json({ error: "Failed to process audio" }, { status: 500 });
    }
}

// Handle OPTIONS for CORS
export async function OPTIONS() {
    return new NextResponse(null, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
    });
}
