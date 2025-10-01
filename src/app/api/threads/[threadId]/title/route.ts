import { NextResponse } from 'next/server';
import { db } from '@/db/client';
import { threads } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { stackServerApp } from '@/stack';
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export const runtime = 'edge';

interface ThreadTitleRequestBody {
  message: string;
}

// Update thread title based on first message
export async function POST(
  req: Request,
  { params }: { params: { threadId: string } }
) {
  try {
    const user = await stackServerApp.getUser({ or: "return-null" });
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { threadId } = params;
    const body: ThreadTitleRequestBody = await req.json();
    const { message } = body;

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Generate title using AI
    const response = await streamText({
      model: openai('gpt-4o-mini'),
      messages: [
        {
          role: 'system',
          content: 'Generate a short, descriptive title (max 50 characters) for a chat conversation based on the first user message. Return only the title, no quotes or extra text.'
        },
        {
          role: 'user',
          content: message
        }
      ]
    });
    
    let title = '';
    for await (const chunk of response.textStream) {
      title += chunk;
    }
    
    const finalTitle = title.trim().slice(0, 50) || 'New Chat';

    // Update the thread title
    const updatedThread = await db
      .update(threads)
      .set({ 
        title: finalTitle,
        updatedAt: new Date()
      })
      .where(and(
        eq(threads.id, threadId),
        eq(threads.userId, user.id)
      ))
      .returning();

    if (updatedThread.length === 0) {
      return NextResponse.json({ error: 'Thread not found' }, { status: 404 });
    }

    // Format dates properly for JSON serialization
    const formattedThread = {
      ...updatedThread[0],
      createdAt: updatedThread[0].createdAt instanceof Date ? updatedThread[0].createdAt.toISOString() : updatedThread[0].createdAt,
      updatedAt: updatedThread[0].updatedAt instanceof Date ? updatedThread[0].updatedAt.toISOString() : updatedThread[0].updatedAt,
    };

    return NextResponse.json({ thread: formattedThread });
  } catch (error) {
    console.error('Error updating thread title:', error);
    return NextResponse.json({ error: 'Failed to update thread title' }, { status: 500 });
  }
}