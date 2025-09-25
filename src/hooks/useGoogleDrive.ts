import { useState, useEffect } from 'react';
import useSWR, { mutate } from 'swr';

export interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  size?: string;
  parents?: string[];
  webViewLink?: string;
  webContentLink?: string;
  thumbnailLink?: string;
  iconLink?: string;
  shared?: boolean;
  modifiedTime?: string;
  createdTime?: string;
}

export interface DriveAccount {
  email: string;
  name: string;
  picture: string;
  createdAt: string;
}

interface DriveStatus {
  connected: boolean;
  account?: DriveAccount;
}

interface DriveFilesResponse {
  files: DriveFile[];
  nextPageToken?: string;
  connected: boolean;
}

const fetcher = async (url: string): Promise<any> => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

export function useGoogleDriveStatus() {
  const { data, error, isLoading, mutate: mutateStatus } = useSWR<DriveStatus>(
    '/api/drive/status',
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 30000, // 30 seconds
    }
  );

  return {
    connected: data?.connected || false,
    account: data?.account,
    isLoading,
    error,
    refresh: mutateStatus,
  };
}

export function useGoogleDriveFiles(options: {
  folderId?: string;
  search?: string;
  enabled?: boolean;
} = {}) {
  const { folderId, search, enabled = true } = options;
  
  // Build query parameters
  const params = new URLSearchParams();
  if (folderId) params.append('folderId', folderId);
  if (search) params.append('search', search);
  
  const url = enabled ? `/api/drive/files?${params.toString()}` : null;
  
  const { data, error, isLoading } = useSWR<DriveFilesResponse>(
    url,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 10000, // 10 seconds
    }
  );

  return {
    files: data?.files || [],
    nextPageToken: data?.nextPageToken,
    connected: data?.connected,
    isLoading,
    error,
    refresh: () => mutate(url),
  };
}

export function useGoogleDriveActions() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const connectGoogleDrive = async (): Promise<boolean> => {
    setIsConnecting(true);
    try {
      const response = await fetch('/api/drive/auth');
      if (!response.ok) return false;
      
      const data = await response.json() as { authUrl: string };
      const { authUrl } = data;
      window.location.href = authUrl;
      return true;
    } catch (error) {
      console.error('Error connecting to Google Drive:', error);
      return false;
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectGoogleDrive = async (): Promise<boolean> => {
    try {
      const response = await fetch('/api/drive/status', {
        method: 'DELETE',
      });
      
      if (response.ok) {
        // Invalidate all drive-related queries
        mutate((key) => typeof key === 'string' && key.startsWith('/api/drive'));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error disconnecting Google Drive:', error);
      return false;
    }
  };

  const createFile = async (options: {
    name: string;
    content: string;
    mimeType: string;
    folderId?: string;
  }): Promise<DriveFile | null> => {
    setIsCreating(true);
    try {
      const response = await fetch('/api/drive/files', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(options),
      });

      if (!response.ok) return null;

      const data = await response.json() as { file: DriveFile };
      const { file } = data;
      
      // Invalidate files queries
      mutate((key) => typeof key === 'string' && key.startsWith('/api/drive/files'));
      
      return file;
    } catch (error) {
      console.error('Error creating file:', error);
      return null;
    } finally {
      setIsCreating(false);
    }
  };

  const updateFile = async (fileId: string, options: {
    name?: string;
    content?: string;
    mimeType?: string;
  }): Promise<DriveFile | null> => {
    setIsUpdating(true);
    try {
      const response = await fetch(`/api/drive/files/${fileId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(options),
      });

      if (!response.ok) return null;

      const data = await response.json() as { file: DriveFile };
      const { file } = data;
      
      // Invalidate files queries
      mutate((key) => typeof key === 'string' && key.startsWith('/api/drive/files'));
      
      return file;
    } catch (error) {
      console.error('Error updating file:', error);
      return null;
    } finally {
      setIsUpdating(false);
    }
  };

  const deleteFile = async (fileId: string): Promise<boolean> => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/drive/files/${fileId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Invalidate files queries
        mutate((key) => typeof key === 'string' && key.startsWith('/api/drive/files'));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error deleting file:', error);
      return false;
    } finally {
      setIsDeleting(false);
    }
  };

  const downloadFile = async (fileId: string, exportType?: string): Promise<boolean> => {
    setIsDownloading(true);
    try {
      const params = new URLSearchParams({ download: 'true' });
      if (exportType) params.append('export', exportType);
      
      const response = await fetch(`/api/drive/files/${fileId}?${params.toString()}`);
      
      if (!response.ok) return false;

      // Create download link
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      
      // Get filename from Content-Disposition header
      const contentDisposition = response.headers.get('Content-Disposition');
      const filenameMatch = contentDisposition?.match(/filename="([^"]+)"/);
      a.download = filenameMatch?.[1] || 'download';
      
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
      return true;
    } catch (error) {
      console.error('Error downloading file:', error);
      return false;
    } finally {
      setIsDownloading(false);
    }
  };

  const getFileContent = async (fileId: string): Promise<DriveFile | null> => {
    try {
      const response = await fetch(`/api/drive/files/${fileId}`);
      if (!response.ok) return null;
      
      const data = await response.json() as { file: DriveFile };
      const { file } = data;
      return file;
    } catch (error) {
      console.error('Error getting file content:', error);
      return null;
    }
  };

  return {
    connectGoogleDrive,
    disconnectGoogleDrive,
    createFile,
    updateFile,
    deleteFile,
    downloadFile,
    getFileContent,
    isConnecting,
    isCreating,
    isUpdating,
    isDeleting,
    isDownloading,
  };
}