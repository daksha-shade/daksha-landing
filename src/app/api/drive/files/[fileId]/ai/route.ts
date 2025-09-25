import { NextRequest, NextResponse } from "next/server";
import { stackServerApp } from "@/stack";
import { GoogleDriveService } from "@/lib/google-drive";
import { db } from "@/db/client";
import { googleDriveTokens, googleDriveFiles } from "@/db/schema";
import { eq, and } from "drizzle-orm";
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

// Helper function to extract text content from files
async function extractTextContent(driveService: GoogleDriveService, fileId: string, mimeType: string): Promise<string> {
  try {
    if (mimeType.includes('google-apps.document')) {
      // Export Google Doc as plain text
      const content = await driveService.exportFile(fileId, 'text/plain');
      return content.toString('utf-8');
    } else if (mimeType.includes('google-apps.spreadsheet')) {
      // Export Google Sheets as CSV
      const content = await driveService.exportFile(fileId, 'text/csv');
      return content.toString('utf-8');
    } else if (mimeType.includes('google-apps.presentation')) {
      // Export Google Slides as plain text
      const content = await driveService.exportFile(fileId, 'text/plain');
      return content.toString('utf-8');
    } else if (mimeType.startsWith('text/') || mimeType.includes('json') || mimeType.includes('xml')) {
      // Download text-based files directly
      const content = await driveService.downloadFile(fileId);
      return content.toString('utf-8');
    } else {
      throw new Error('Unsupported file type for text extraction');
    }
  } catch (error) {
    console.error('Error extracting text content:', error);
    throw new Error('Failed to extract text content from file');
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ fileId: string }> }
) {
  try {
    const user = await stackServerApp.getUser({ or: "return-null" });
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { fileId } = await params;
    const body = await req.json() as {
      action: 'summarize' | 'analyze' | 'extract_keywords' | 'generate_questions' | 'translate' | 'improve_writing';
      language?: string;
      instructions?: string;
    };

    const driveService = new GoogleDriveService();
    const tokenRecord = await getUserTokens(user.id);
    await ensureValidToken(driveService, tokenRecord);

    // Get file metadata
    const file = await driveService.getFile(fileId);
    
    // Extract text content from the file
    const textContent = await extractTextContent(driveService, fileId, file.mimeType);
    
    if (!textContent.trim()) {
      return NextResponse.json({ error: "No text content found in file" }, { status: 400 });
    }

    let prompt: string;
    const systemMessage: string = "You are a helpful AI assistant that analyzes documents and provides insightful responses.";

    switch (body.action) {
      case 'summarize':
        prompt = `Please provide a comprehensive summary of the following document. Focus on the main points, key insights, and important details:\n\n${textContent}`;
        break;
      
      case 'analyze':
        prompt = `Please analyze the following document and provide insights about:
- Main themes and topics
- Key arguments or points
- Writing style and tone
- Potential improvements or suggestions

Document content:
${textContent}`;
        break;
      
      case 'extract_keywords':
        prompt = `Extract the most important keywords and key phrases from the following document. Provide them in order of importance:\n\n${textContent}`;
        break;
      
      case 'generate_questions':
        prompt = `Based on the following document, generate thoughtful questions that could be used for:
- Discussion and deeper understanding
- Testing comprehension
- Further research

Document content:
${textContent}`;
        break;
      
      case 'translate':
        const targetLanguage = body.language || 'Spanish';
        prompt = `Translate the following document to ${targetLanguage}. Maintain the original formatting and structure:\n\n${textContent}`;
        break;
      
      case 'improve_writing':
        prompt = `Please improve the writing quality of the following document by:
- Enhancing clarity and readability
- Improving grammar and style
- Maintaining the original meaning and tone
- Suggesting structural improvements

Document content:
${textContent}`;
        break;
      
      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    // Add custom instructions if provided
    if (body.instructions) {
      prompt += `\n\nAdditional instructions: ${body.instructions}`;
    }

    // Generate AI response
    const { text } = await generateText({
      model: openai('gpt-4'),
      system: systemMessage,
      prompt: prompt,
    });

    // Save AI analysis to the database
    await db
      .update(googleDriveFiles)
      .set({
        aiSummary: body.action === 'summarize' ? text : undefined,
        updatedAt: new Date(),
      })
      .where(and(
        eq(googleDriveFiles.id, fileId),
        eq(googleDriveFiles.userId, user.id)
      ));

    return NextResponse.json({
      action: body.action,
      fileName: file.name,
      result: text,
      fileType: file.mimeType,
      contentLength: textContent.length
    });

  } catch (error: any) {
    console.error("Google Drive AI analysis error:", error);
    
    if (error.message === "Google Drive not connected") {
      return NextResponse.json({ 
        error: "Google Drive not connected",
        connected: false 
      }, { status: 401 });
    }

    if (error.message.includes('Unsupported file type')) {
      return NextResponse.json({ 
        error: "This file type is not supported for AI analysis. Supported types: Google Docs, Sheets, Slides, and text files."
      }, { status: 400 });
    }

    return NextResponse.json({ 
      error: error.message || "Internal server error" 
    }, { status: 500 });
  }
}