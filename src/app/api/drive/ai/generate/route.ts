import { NextRequest, NextResponse } from "next/server";
import { stackServerApp } from "@/stack";
import { GoogleDriveService } from "@/lib/google-drive";
import { db } from "@/db/client";
import { googleDriveTokens, googleDriveFiles } from "@/db/schema";
import { eq } from "drizzle-orm";
import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';

// Helper function to get user's Google Drive tokens
async function getUserTokens(userId: string) {
  const tokenRecord = await db
    .select()
    .from(googleDriveTokens)
    .where(eq(googleDriveTokens.userId, userId))
    .limit(1);

  if (tokenRecord.length === 0) {
    throw new Error("Google Drive not connected");
  }

  return tokenRecord[0];
}

// Helper function to refresh token if needed
async function ensureValidToken(driveService: GoogleDriveService, tokenRecord: any) {
  const now = new Date();
  const expiresAt = new Date(tokenRecord.expiresAt);

  if (now >= expiresAt) {
    const newTokens = await driveService.refreshAccessToken(tokenRecord.refreshToken);
    
    await db
      .update(googleDriveTokens)
      .set({
        accessToken: newTokens.access_token,
        expiresAt: new Date(newTokens.expiry_date),
        updatedAt: new Date(),
      })
      .where(eq(googleDriveTokens.userId, tokenRecord.userId));

    driveService.setCredentials(newTokens);
  } else {
    driveService.setCredentials({
      access_token: tokenRecord.accessToken,
      refresh_token: tokenRecord.refreshToken,
      token_type: tokenRecord.tokenType,
      expiry_date: expiresAt.getTime(),
      scope: tokenRecord.scope
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await stackServerApp.getUser({ or: "return-null" });
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json() as {
      type: 'document' | 'essay' | 'letter' | 'report' | 'blog_post' | 'email' | 'code' | 'creative_writing';
      topic: string;
      tone?: 'professional' | 'casual' | 'academic' | 'creative' | 'technical';
      length?: 'short' | 'medium' | 'long';
      language?: string;
      additionalInstructions?: string;
      fileName?: string;
      folderId?: string;
    };

    if (!body.topic.trim()) {
      return NextResponse.json({ error: "Topic is required" }, { status: 400 });
    }

    const driveService = new GoogleDriveService();
    const tokenRecord = await getUserTokens(user.id);
    await ensureValidToken(driveService, tokenRecord);

    // Build the prompt based on the content type
    let systemMessage = "You are a professional content writer with expertise in creating high-quality documents.";
    let prompt = "";
    let fileName = body.fileName || "";
    let mimeType = "text/plain";

    const tone = body.tone || 'professional';
    const length = body.length || 'medium';
    const language = body.language || 'English';

    // Length guidelines
    const lengthGuidelines = {
      short: "Keep it concise (200-500 words)",
      medium: "Write a medium-length piece (500-1000 words)",
      long: "Create a comprehensive piece (1000-2000 words)"
    };

    switch (body.type) {
      case 'document':
        systemMessage = "You are a professional document writer who creates well-structured, informative documents.";
        prompt = `Create a professional document about "${body.topic}". Use a ${tone} tone and ${lengthGuidelines[length]}. Structure it with clear headings, sections, and bullet points where appropriate.`;
        fileName = fileName || `${body.topic.replace(/[^a-zA-Z0-9]/g, '_')}_Document.txt`;
        break;

      case 'essay':
        systemMessage = "You are an academic writer who creates well-researched, structured essays.";
        prompt = `Write an essay on "${body.topic}" with a ${tone} tone. ${lengthGuidelines[length]}. Include an introduction, body paragraphs with clear arguments, and a conclusion.`;
        fileName = fileName || `Essay_${body.topic.replace(/[^a-zA-Z0-9]/g, '_')}.txt`;
        break;

      case 'letter':
        systemMessage = "You are a professional correspondence writer.";
        prompt = `Write a ${tone} letter regarding "${body.topic}". ${lengthGuidelines[length]}. Include proper salutation, body, and closing.`;
        fileName = fileName || `Letter_${body.topic.replace(/[^a-zA-Z0-9]/g, '_')}.txt`;
        break;

      case 'report':
        systemMessage = "You are a business analyst who creates detailed, data-driven reports.";
        prompt = `Create a comprehensive report on "${body.topic}" with a ${tone} tone. ${lengthGuidelines[length]}. Include executive summary, findings, analysis, and recommendations.`;
        fileName = fileName || `Report_${body.topic.replace(/[^a-zA-Z0-9]/g, '_')}.txt`;
        break;

      case 'blog_post':
        systemMessage = "You are a skilled blog writer who creates engaging, SEO-friendly content.";
        prompt = `Write an engaging blog post about "${body.topic}" with a ${tone} tone. ${lengthGuidelines[length]}. Include a catchy title, introduction, main content with subheadings, and conclusion.`;
        fileName = fileName || `Blog_${body.topic.replace(/[^a-zA-Z0-9]/g, '_')}.txt`;
        break;

      case 'email':
        systemMessage = "You are a professional email writer.";
        prompt = `Compose a ${tone} email about "${body.topic}". Keep it concise and professional with clear subject line, greeting, body, and closing.`;
        fileName = fileName || `Email_${body.topic.replace(/[^a-zA-Z0-9]/g, '_')}.txt`;
        break;

      case 'code':
        systemMessage = "You are a skilled software developer who writes clean, well-documented code.";
        prompt = `Create code for "${body.topic}". Include comments explaining the functionality, follow best practices, and provide usage examples.`;
        fileName = fileName || `${body.topic.replace(/[^a-zA-Z0-9]/g, '_')}.txt`;
        mimeType = "text/plain";
        break;

      case 'creative_writing':
        systemMessage = "You are a creative writer with a talent for storytelling and imaginative content.";
        prompt = `Write a creative piece about "${body.topic}" with a ${tone} tone. ${lengthGuidelines[length]}. Use vivid descriptions, engaging narrative, and creative elements.`;
        fileName = fileName || `Creative_${body.topic.replace(/[^a-zA-Z0-9]/g, '_')}.txt`;
        break;

      default:
        return NextResponse.json({ error: "Invalid content type" }, { status: 400 });
    }

    // Add language specification
    if (language !== 'English') {
      prompt += `\n\nWrite the content in ${language}.`;
    }

    // Add additional instructions if provided
    if (body.additionalInstructions) {
      prompt += `\n\nAdditional instructions: ${body.additionalInstructions}`;
    }

    // Generate AI content
    const { text } = await generateText({
      model: openai('gpt-4'),
      system: systemMessage,
      prompt: prompt,
    });

    // Create file in Google Drive
    const file = await driveService.createFile({
      name: fileName,
      content: text,
      mimeType: mimeType,
      parents: body.folderId ? [body.folderId] : undefined
    });

    // Cache the new file in database
    await db.insert(googleDriveFiles).values({
      id: file.id,
      userId: user.id,
      name: file.name,
      mimeType: file.mimeType,
      size: file.size || null,
      parents: file.parents || [],
      webViewLink: file.webViewLink || null,
      webContentLink: file.webContentLink || null,
      thumbnailLink: file.thumbnailLink || null,
      iconLink: file.iconLink || null,
      shared: file.shared || false,
      modifiedTime: file.modifiedTime ? new Date(file.modifiedTime) : null,
      createdTime: file.createdTime ? new Date(file.createdTime) : null,
      aiSummary: `AI-generated ${body.type} about ${body.topic}`,
      aiTags: [body.type, 'ai-generated', body.tone || 'professional', body.topic.toLowerCase()],
      lastSynced: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json({
      file,
      content: text,
      type: body.type,
      topic: body.topic,
      wordCount: text.split(' ').length,
      characterCount: text.length
    }, { status: 201 });

  } catch (error: any) {
    console.error("Google Drive AI generation error:", error);
    
    if (error.message === "Google Drive not connected") {
      return NextResponse.json({ 
        error: "Google Drive not connected",
        connected: false 
      }, { status: 401 });
    }

    return NextResponse.json({ 
      error: error.message || "Internal server error" 
    }, { status: 500 });
  }
}