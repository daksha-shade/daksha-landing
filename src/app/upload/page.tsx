'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Upload, X, FileText, Image, Video, Music, File } from 'lucide-react';

interface UploadedFile {
  name: string;
  originalName: string;
  size: number;
  type: string;
  url: string; // Primary URL (permanent for DB storage)
  permanentUrl?: string; // Permanent URL
  temporaryUrl?: string; // Presigned URL (24h)
  proxyUrl?: string; // Proxy URL through app
  directUrl?: string; // Direct R2 URL (requires auth)
}

interface UploadProgress {
  file: File;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
  error?: string;
  result?: UploadedFile;
}

const getFileIcon = (type: string) => {
  if (type.startsWith('image/')) return <Image className="w-8 h-8 text-blue-500" />;
  if (type.startsWith('video/')) return <Video className="w-8 h-8 text-purple-500" />;
  if (type.startsWith('audio/')) return <Music className="w-8 h-8 text-green-500" />;
  if (type.includes('text/') || type.includes('application/pdf')) return <FileText className="w-8 h-8 text-red-500" />;
  return <File className="w-8 h-8 text-gray-500" />;
};

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export default function UploadPage() {
  const [uploads, setUploads] = useState<UploadProgress[]>([]);
  const [isDragActive, setIsDragActive] = useState(false);

  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    // Add initial upload progress
    setUploads(prev => [...prev, {
      file,
      progress: 0,
      status: 'uploading'
    }]);

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploads(prev => prev.map(upload => 
          upload.file === file && upload.status === 'uploading'
            ? { ...upload, progress: Math.min(upload.progress + 10, 90) }
            : upload
        ));
      }, 200);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);

      if (!response.ok) {
        const errorData = await response.json() as { error?: string };
        throw new Error(errorData.error || 'Upload failed');
      }

      const result = await response.json() as { file: UploadedFile };

      // Update with completed status
      setUploads(prev => prev.map(upload => 
        upload.file === file
          ? { 
              ...upload, 
              progress: 100, 
              status: 'completed' as const,
              result: result.file 
            }
          : upload
      ));

    } catch (error) {
      setUploads(prev => prev.map(upload => 
        upload.file === file
          ? { 
              ...upload, 
              status: 'error' as const,
              error: error instanceof Error ? error.message : 'Upload failed'
            }
          : upload
      ));
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(uploadFile);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragActive(false);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragActive(false);
    
    const files = event.dataTransfer.files;
    if (files) {
      Array.from(files).forEach(uploadFile);
    }
  };

  const removeUpload = (file: File) => {
    setUploads(prev => prev.filter(upload => upload.file !== file));
  };

  const clearAll = () => {
    setUploads([]);
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Cloudflare R2 Upload Test</h1>
        <p className="text-gray-600 mb-2">
          Test file uploads to Cloudflare R2 storage bucket: <code className="bg-gray-100 px-2 py-1 rounded text-sm">daksha-storage</code>
        </p>
        <div className="text-sm text-blue-600 bg-blue-50 p-3 rounded-lg">
          <p><strong>📁 File Access Options:</strong></p>
          <p>• <strong>Presigned URLs:</strong> Direct access for 24 hours (recommended for temporary sharing)</p>
          <p>• <strong>Proxy URLs:</strong> Permanent access through your Next.js app</p>
        </div>
      </div>

      {/* Upload Area */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Upload Files</CardTitle>
          <CardDescription>
            Drag and drop files here or click to select files
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragActive 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <input
              type="file"
              multiple
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
            />
            <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            {isDragActive ? (
              <p className="text-blue-600">Drop the files here...</p>
            ) : (
              <div>
                <p className="text-gray-600 mb-2">
                  Drag & drop files here, or click to select files
                </p>
                <Button variant="outline" asChild>
                  <label htmlFor="file-upload" className="cursor-pointer">
                    Choose Files
                  </label>
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Upload Progress */}
      {uploads.length > 0 && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Upload Progress</CardTitle>
              <CardDescription>
                {uploads.length} file(s) - {uploads.filter(u => u.status === 'completed').length} completed
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={clearAll}>
              Clear All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {uploads.map((upload, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-3 flex-1">
                      {getFileIcon(upload.file.type)}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{upload.file.name}</p>
                        <p className="text-sm text-gray-500">
                          {formatFileSize(upload.file.size)} • {upload.file.type}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeUpload(upload.file)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>

                  {upload.status === 'uploading' && (
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Uploading...</span>
                        <span>{upload.progress}%</span>
                      </div>
                      <Progress value={upload.progress} className="w-full" />
                    </div>
                  )}

                  {upload.status === 'completed' && upload.result && (
                    <div className="bg-green-50 border border-green-200 rounded p-3">
                      <p className="text-green-800 font-medium mb-2">✅ Upload completed!</p>
                      <div className="text-sm space-y-2">
                        <p><strong>Filename:</strong> {upload.result.name}</p>
                        
                        <div className="space-y-1">
                          <p><strong>Presigned URL (24h access):</strong></p>
                          <a 
                            href={upload.result.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline text-xs break-all block"
                          >
                            {upload.result.url}
                          </a>
                        </div>

                        {upload.result.proxyUrl && (
                          <div className="space-y-1">
                            <p><strong>Proxy URL (permanent):</strong></p>
                            <a 
                              href={upload.result.proxyUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline text-xs break-all block"
                            >
                              {upload.result.proxyUrl}
                            </a>
                          </div>
                        )}

                        <div className="text-xs text-gray-600 mt-2 p-2 bg-gray-50 rounded">
                          <p><strong>💡 Tips:</strong></p>
                          <p>• Use <strong>Presigned URL</strong> for temporary access (expires in 24h)</p>
                          <p>• Use <strong>Proxy URL</strong> for permanent access through your app</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {upload.status === 'error' && (
                    <div className="bg-red-50 border border-red-200 rounded p-3">
                      <p className="text-red-800 font-medium">❌ Upload failed</p>
                      {upload.error && (
                        <p className="text-red-600 text-sm mt-1">{upload.error}</p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* R2 Configuration Info */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>R2 Configuration</CardTitle>
          <CardDescription>Current Cloudflare R2 settings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <strong>Account ID:</strong> {process.env.NEXT_PUBLIC_R2_ACCOUNT_ID || '091539408595ba99a0ef106d42391d5b'}
            </div>
            <div>
              <strong>Bucket:</strong> daksha-storage
            </div>
            <div className="md:col-span-2">
              <strong>Endpoint:</strong> https://091539408595ba99a0ef106d42391d5b.r2.cloudflarestorage.com
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}