import { NextResponse } from 'next/server';
import { setupChatCollections } from '@/db/milvus-chat-setup';

export const runtime = 'nodejs';

export async function POST() {
  try {
    await setupChatCollections();
    return NextResponse.json({ success: true, message: 'Milvus collections setup completed' });
  } catch (error) {
    console.error('Error setting up Milvus collections:', error);
    return NextResponse.json({ success: false, error: 'Failed to setup Milvus collections' }, { status: 500 });
  }
}