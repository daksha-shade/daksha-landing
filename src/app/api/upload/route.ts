import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { GetObjectCommand } from '@aws-sdk/client-s3';

// Initialize S3 client for Cloudflare R2
const s3Client = new S3Client({
  region: 'auto', // Cloudflare R2 uses 'auto' as region
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Generate unique filename with timestamp
    const timestamp = Date.now();
    const fileName = `${timestamp}-${file.name}`;

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Upload to R2
    const command = new PutObjectCommand({
      Bucket: process.env.R2_BUCKET!,
      Key: fileName,
      Body: buffer,
      ContentType: file.type,
      ContentLength: buffer.length,
    });

    await s3Client.send(command);

    // Determine the best permanent URL for database storage
    let permanentUrl: string;
    let temporaryUrl: string;
    
    // Generate presigned URL for temporary access (24 hours)
    const getObjectCommand = new GetObjectCommand({
      Bucket: process.env.R2_BUCKET!,
      Key: fileName,
    });
    
    temporaryUrl = await getSignedUrl(s3Client, getObjectCommand, { 
      expiresIn: 86400 // 24 hours
    });

    // Determine permanent URL strategy
    if (process.env.R2_PUBLIC_DOMAIN && process.env.R2_USE_PROXY_URLS !== 'true') {
      // Use custom domain if configured
      permanentUrl = `${process.env.R2_PUBLIC_DOMAIN}/${fileName}`;
    } else {
      // Use proxy URL through our app as permanent solution
      permanentUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001'}/api/files/${fileName}`;
    }

    // Return success response with file info optimized for database storage
    return NextResponse.json({
      success: true,
      message: 'File uploaded successfully',
      file: {
        name: fileName,
        originalName: file.name,
        size: file.size,
        type: file.type,
        // Primary URL for database storage (permanent)
        url: permanentUrl,
        // Alternative URLs for different use cases
        permanentUrl: permanentUrl,
        temporaryUrl: temporaryUrl,
        proxyUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001'}/api/files/${fileName}`,
        directUrl: `${process.env.R2_ENDPOINT}/${process.env.R2_BUCKET}/${fileName}`, // Requires auth
      },
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to upload file',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
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