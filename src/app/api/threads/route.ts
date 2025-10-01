import { NextResponse } from 'next/server';
import { db } from '@/db/client';
import { threads, messages } from '@/db/schema';
import { eq, and, desc } from 'drizzle-orm';
import { stackServerApp } from '@/stack';
import { nanoid } from 'nanoid';

export const runtime = 'edge';

interface ThreadRequestBody {
  title?: string;
}

// Get all threads for a user
export async function GET(req: Request) {
  try {
    const user = await stackServerApp.getUser({ or: "return-null" });
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userThreads = await db
      .select()
      .from(threads)
      .where(eq(threads.userId, user.id))
      .orderBy(desc(threads.updatedAt));

    // Format dates properly for JSON serialization
    const formattedThreads = userThreads.map(thread => ({
      ...thread,
      createdAt: thread.createdAt instanceof Date ? thread.createdAt.toISOString() : thread.createdAt,
      updatedAt: thread.updatedAt instanceof Date ? thread.updatedAt.toISOString() : thread.updatedAt,
    }));

    return NextResponse.json({ threads: formattedThreads });
  } catch (error) {
    console.error('Error fetching threads:', error);
    return NextResponse.json({ error: 'Failed to fetch threads' }, { status: 500 });
  }
}

// Create a new thread
export async function POST(req: Request) {
  try {
    const user = await stackServerApp.getUser({ or: "return-null" });
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body: ThreadRequestBody = await req.json();
    const { title } = body;

    const threadId = nanoid();
    const now = new Date();

    const newThread = await db
      .insert(threads)
      .values({
        id: threadId,
        userId: user.id,
        title: title || 'New Chat',
        createdAt: now,
        updatedAt: now,
      })
      .returning();

    // Format dates properly for JSON serialization
    const formattedThread = {
      ...newThread[0],
      createdAt: newThread[0].createdAt instanceof Date ? newThread[0].createdAt.toISOString() : newThread[0].createdAt,
      updatedAt: newThread[0].updatedAt instanceof Date ? newThread[0].updatedAt.toISOString() : newThread[0].updatedAt,
    };

    return NextResponse.json({ thread: formattedThread });
  } catch (error) {
    console.error('Error creating thread:', error);
    return NextResponse.json({ error: 'Failed to create thread' }, { status: 500 });
  }
}

// Delete a thread
export async function DELETE(req: Request) {
  try {
    const user = await stackServerApp.getUser({ or: "return-null" });
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const url = new URL(req.url);
    const threadId = url.searchParams.get('threadId');

    if (!threadId) {
      return NextResponse.json({ error: 'Thread ID is required' }, { status: 400 });
    }

    // First delete all messages in the thread
    await db
      .delete(messages)
      .where(eq(messages.threadId, threadId));

    // Then delete the thread
    await db
      .delete(threads)
      .where(and(
        eq(threads.id, threadId),
        eq(threads.userId, user.id)
      ));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting thread:', error);
    return NextResponse.json({ error: 'Failed to delete thread' }, { status: 500 });
  }
}