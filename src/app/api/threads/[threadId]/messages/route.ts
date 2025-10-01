import { db } from '@/db/client';
import { messages, threads } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { threadId: string } }
) {
  try {
    const { threadId } = params;

    if (!threadId) {
      return NextResponse.json({ error: 'Thread ID is required' }, { status: 400 });
    }

    const rows = await db
      .select()
      .from(messages)
      .where(eq(messages.threadId, threadId))
      .orderBy(messages.createdAt);

    const exportedMessages = rows.map((row) => ({
      message: {
        id: row.id,
        role: row.role,
        content: row.content,
        createdAt: new Date(row.createdAt),
      },
      parentId: row.parentId,
    }));

    return NextResponse.json({ messages: exportedMessages });
  } catch (error) {
    console.error('Error loading thread messages:', error);
    return NextResponse.json(
      { error: 'Failed to load messages' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { threadId: string } }
) {
  try {
    const { threadId } = params;

    if (!threadId) {
      return NextResponse.json({ error: 'Thread ID is required' }, { status: 400 });
    }

    const body = await request.json();
    const { message, parentId } = body;

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Insert the message
    await db.insert(messages).values({
      id: message.id,
      threadId: threadId,
      role: message.role,
      content: message.content,
      createdAt: message.createdAt || new Date(),
      parentId: parentId || null,
      toolCallId: null, // Will be set if needed for tool calls
    });

    // Update thread's updatedAt timestamp
    await db
      .update(threads)
      .set({ updatedAt: new Date() })
      .where(eq(threads.id, threadId));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving message:', error);
    return NextResponse.json(
      { error: 'Failed to save message' },
      { status: 500 }
    );
  }
}