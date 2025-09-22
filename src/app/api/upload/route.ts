import { NextRequest, NextResponse } from 'next/server';
import { stackServerApp } from '@/stack';
import { uploadToR2, generateFileKey, getFileTypeFromMimeType } from '@/lib/r2-upload';

export async function POST(req: NextRequest) {
  try {
    const user = await stackServerApp.getUser({ or: 'return-null' });
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate file size (max 50MB)
    const maxSize = 50 * 1024 * 1024; // 50MB
    if (file.size > maxSize) {
      return NextResponse.json({ error: 'File too large. Maximum size is 50MB.' }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = [
      'image/jpeg', 'image/png', 'image/gif', 'image/webp',
      'video/mp4', 'video/webm', 'video/quicktime',
      'audio/mp3', 'audio/wav', 'audio/ogg', 'audio/mpeg', 'audio/webm',
      'application/pdf', 'text/plain', 'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'File type not supported' }, { status: 400 });
    }

    // Generate file key
    const fileType = getFileTypeFromMimeType(file.type);
    const key = generateFileKey(user.id, fileType, file.name);

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Upload to R2
    const result = await uploadToR2(buffer, key, file.type, {
      userId: user.id,
      originalName: file.name,
      uploadedAt: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      file: {
        url: result.publicUrl,
        key: result.key,
        type: fileType,
        mimeType: file.type,
        size: file.size,
        name: file.name,
      },
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const user = await stackServerApp.getUser({ or: 'return-null' });
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const key = searchParams.get('key');

    if (!key) {
      return NextResponse.json({ error: 'No file key provided' }, { status: 400 });
    }

    // Verify the file belongs to the user
    if (!key.startsWith(`journal/${user.id}/`)) {
      return NextResponse.json({ error: 'Unauthorized to delete this file' }, { status: 403 });
    }

    // Delete from R2
    const { deleteFromR2 } = await import('@/lib/r2-upload');
    await deleteFromR2(key);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json(
      { error: 'Failed to delete file' },
      { status: 500 }
    );
  }
}
