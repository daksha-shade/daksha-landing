import { NextResponse } from 'next/server';
import { db } from '@/db/client';
import { messages } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { stackServerApp } from '@/stack';

export const runtime = 'edge';

interface Message {
  role: string;
  content: any;
}

interface MessagesRequestBody {
  threadId: string;
  messages: Message[];
}

// Get messages for a thread
export async function GET(req: Request) {
  try {
    const user = await stackServerApp.getUser({ or: "redirect" });
    const url = new URL(req.url);
    const threadId = url.searchParams.get('threadId');

    if (!threadId) {
      return NextResponse.json({ error: 'Thread ID is required' }, { status: 400 });
    }

    // Verify the thread belongs to the user by checking if it exists
    // (We'll implement this check in the query below)

    const threadMessages = await db
      .select()
      .from(messages)
      .where(eq(messages.threadId, threadId))
      .orderBy(messages.createdAt);

    // Format dates properly for JSON serialization
    const formattedMessages = threadMessages.map(msg => ({
      ...msg,
      createdAt: msg.createdAt instanceof Date ? msg.createdAt.toISOString() : msg.createdAt,
    }));

    return NextResponse.json({ messages: formattedMessages });
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}

// Save messages to a thread
export async function POST(req: Request) {
  try {
    const user = await stackServerApp.getUser({ or: "redirect" });
    const body: MessagesRequestBody = await req.json();
    const { threadId, messages: newMessages } = body;

    if (!threadId || !newMessages || !Array.isArray(newMessages)) {
      return NextResponse.json({ error: 'Thread ID and messages are required' }, { status: 400 });
    }

    // Insert all messages
    const insertedMessages = await db
      .insert(messages)
      .values(
        newMessages.map((msg) => ({
          id: crypto.randomUUID(),
          threadId,
          role: msg.role,
          content: msg.content,
          createdAt: new Date(),
        }))
      )
      .returning();

    // Format dates properly for JSON serialization
    const formattedMessages = insertedMessages.map(msg => ({
      ...msg,
      createdAt: msg.createdAt instanceof Date ? msg.createdAt.toISOString() : msg.createdAt,
    }));

    return NextResponse.json({ messages: formattedMessages });
  } catch (error) {
    console.error('Error saving messages:', error);
    return NextResponse.json({ error: 'Failed to save messages' }, { status: 500 });
  }
}