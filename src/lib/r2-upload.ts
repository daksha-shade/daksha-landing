import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const r2Client = new S3Client({
    region: 'auto',
    endpoint: process.env.R2_ENDPOINT,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID!,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
    },
});

export interface UploadResult {
    url: string;
    key: string;
    publicUrl: string;
}

export async function uploadToR2(
    file: Buffer | Uint8Array,
    key: string,
    contentType: string,
    metadata?: Record<string, string>
): Promise<UploadResult> {
    const command = new PutObjectCommand({
        Bucket: process.env.R2_BUCKET!,
        Key: key,
        Body: file,
        ContentType: contentType,
        Metadata: metadata,
    });

    await r2Client.send(command);

    // Generate public URL
    const publicUrl = process.env.R2_USE_PROXY_URLS === 'true'
        ? `/api/files/${key}` // Use proxy URL
        : `${process.env.R2_PUBLIC_DOMAIN}/${key}`; // Use direct CDN URL

    return {
        url: publicUrl,
        key,
        publicUrl,
    };
}

export async function deleteFromR2(key: string): Promise<void> {
    const command = new DeleteObjectCommand({
        Bucket: process.env.R2_BUCKET!,
        Key: key,
    });

    await r2Client.send(command);
}

export async function getSignedUploadUrl(
    key: string,
    contentType: string,
    expiresIn: number = 3600
): Promise<string> {
    const command = new PutObjectCommand({
        Bucket: process.env.R2_BUCKET!,
        Key: key,
        ContentType: contentType,
    });

    return await getSignedUrl(r2Client, command, { expiresIn });
}

export function generateFileKey(
    userId: string,
    type: 'image' | 'video' | 'audio' | 'file',
    originalName: string
): string {
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(2, 15);
    const extension = originalName.split('.').pop() || '';

    return `journal/${userId}/${type}/${timestamp}-${randomId}.${extension}`;
}

export function getFileTypeFromMimeType(mimeType: string): 'image' | 'video' | 'audio' | 'file' {
    if (mimeType.startsWith('image/')) return 'image';
    if (mimeType.startsWith('video/')) return 'video';
    if (mimeType.startsWith('audio/')) return 'audio';
    return 'file';
}