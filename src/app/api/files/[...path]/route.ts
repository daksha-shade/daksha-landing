import { NextRequest, NextResponse } from 'next/server';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';

const r2Client = new S3Client({
    region: 'auto',
    endpoint: process.env.R2_ENDPOINT,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID!,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
    },
});

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    try {
        const { path } = await params;
        const key = path.join('/');

        const command = new GetObjectCommand({
            Bucket: process.env.R2_BUCKET!,
            Key: key,
        });

        const response = await r2Client.send(command);

        if (!response.Body) {
            return new NextResponse('File not found', { status: 404 });
        }

        // Convert stream to buffer
        const chunks: Uint8Array[] = [];
        const reader = response.Body.transformToWebStream().getReader();

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            chunks.push(value);
        }

        const buffer = Buffer.concat(chunks);

        // Set appropriate headers
        const headers = new Headers();
        headers.set('Content-Type', response.ContentType || 'application/octet-stream');
        headers.set('Content-Length', buffer.length.toString());
        headers.set('Cache-Control', 'public, max-age=31536000'); // Cache for 1 year

        if (response.Metadata) {
            headers.set('X-Original-Name', response.Metadata.originalname || '');
        }

        return new NextResponse(buffer, { headers });
    } catch (error) {
        console.error('File proxy error:', error);
        return new NextResponse('File not found', { status: 404 });
    }
}