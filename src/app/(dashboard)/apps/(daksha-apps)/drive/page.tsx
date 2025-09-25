"use client"

import { useState, useEffect } from 'react'
import {
  Cloud,
  CloudOff,
  Plus,
  Search,
  Grid,
  List,
  Download,
  Edit3,
  Trash2,
  File,
  Folder,
  Image,
  Video,
  Music,
  FileText,
  Settings,
  Sparkles,
  Brain,
  Upload,
  RefreshCw,
  Link,
  Eye,
  Share
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { useGoogleDriveStatus, useGoogleDriveFiles, useGoogleDriveActions, type DriveFile } from '@/hooks/useGoogleDrive'
import { toast } from 'sonner'

interface CreateFileModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onFileCreated: () => void
  currentFolderId?: string
}

function CreateFileModal({ open, onOpenChange, onFileCreated, currentFolderId }: CreateFileModalProps) {
  const [fileName, setFileName] = useState('')
  const [fileContent, setFileContent] = useState('')
  const [fileType, setFileType] = useState('text/plain')
  const { createFile, isCreating } = useGoogleDriveActions()

  const handleCreate = async () => {
    if (!fileName.trim()) {
      toast.error('Please enter a file name')
      return
    }

    const result = await createFile({
      name: fileName,
      content: fileContent,
      mimeType: fileType,
      folderId: currentFolderId
    })

    if (result) {
      toast.success('File created successfully!')
      onFileCreated()
      onOpenChange(false)
      setFileName('')
      setFileContent('')
      setFileType('text/plain')
    } else {
      toast.error('Failed to create file')
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create New File</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">File Name</label>
            <Input
              placeholder="Enter file name..."
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">File Type</label>
            <select
              value={fileType}
              onChange={(e) => setFileType(e.target.value)}
              className="w-full h-9 px-3 rounded-md border border-input bg-background text-sm"
            >
              <option value="text/plain">Text File</option>
              <option value="text/html">HTML File</option>
              <option value="text/css">CSS File</option>
              <option value="application/javascript">JavaScript File</option>
              <option value="application/json">JSON File</option>
              <option value="text/markdown">Markdown File</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Content</label>
            <Textarea
              placeholder="Enter file content..."
              value={fileContent}
              onChange={(e) => setFileContent(e.target.value)}
              className="min-h-32"
            />
          </div>
          <div className="flex gap-2">
            <Button
              onClick={handleCreate}
              disabled={!fileName.trim() || isCreating}
              className="flex-1"
            >
              {isCreating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Creating...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  Create File
                </>
              )}
            </Button>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function getFileIcon(mimeType: string) {
  if (mimeType.startsWith('image/')) return Image
  if (mimeType.startsWith('video/')) return Video
  if (mimeType.startsWith('audio/')) return Music
  if (mimeType.includes('folder')) return Folder
  if (mimeType.includes('text') || mimeType.includes('document')) return FileText
  return File
}

function formatFileSize(bytes?: string) {
  if (!bytes) return 'Unknown'
  const size = parseInt(bytes)
  if (size === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(size) / Math.log(k))
  return Math.round((size / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
}

function formatDate(dateString?: string) {
  if (!dateString) return 'Unknown'
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export default function DrivePage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [currentFolderId, setCurrentFolderId] = useState<string>()
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set())

  const { connected, account, isLoading: statusLoading, refresh: refreshStatus } = useGoogleDriveStatus()
  const { files, isLoading: filesLoading, refresh: refreshFiles } = useGoogleDriveFiles({
    folderId: currentFolderId,
    search: searchTerm,
    enabled: connected
  })
  const { 
    connectGoogleDrive, 
    disconnectGoogleDrive, 
    deleteFile, 
    downloadFile,
    isConnecting,
    isDeleting,
    isDownloading
  } = useGoogleDriveActions()

  // Handle URL params for OAuth callback
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const success = urlParams.get('success')
    const error = urlParams.get('error')

    if (success === 'connected') {
      toast.success('Google Drive connected successfully!')
      refreshStatus()
      // Clear URL params
      window.history.replaceState({}, '', '/apps/drive')
    } else if (error) {
      toast.error(`Connection failed: ${error}`)
      // Clear URL params
      window.history.replaceState({}, '', '/apps/drive')
    }
  }, [refreshStatus])

  const handleConnect = async () => {
    const success = await connectGoogleDrive()
    if (!success) {
      toast.error('Failed to initiate Google Drive connection')
    }
  }

  const handleDisconnect = async () => {
    const success = await disconnectGoogleDrive()
    if (success) {
      toast.success('Google Drive disconnected successfully')
    } else {
      toast.error('Failed to disconnect Google Drive')
    }
  }

  const handleDeleteFile = async (fileId: string, fileName: string) => {
    if (!confirm(`Are you sure you want to delete "${fileName}"?`)) return
    
    const success = await deleteFile(fileId)
    if (success) {
      toast.success('File deleted successfully')
      setSelectedFiles(prev => {
        const newSet = new Set(prev)
        newSet.delete(fileId)
        return newSet
      })
    } else {
      toast.error('Failed to delete file')
    }
  }

  const handleDownloadFile = async (fileId: string, fileName: string, mimeType: string) => {
    // Check if it's a Google Workspace file that needs export
    const isGoogleDoc = mimeType.includes('google-apps')
    const exportType = isGoogleDoc ? 'pdf' : undefined
    
    const success = await downloadFile(fileId, exportType)
    if (success) {
      toast.success(`${fileName} downloaded successfully`)
    } else {
      toast.error('Failed to download file')
    }
  }

  const handleFileClick = (file: DriveFile) => {
    if (file.mimeType === 'application/vnd.google-apps.folder') {
      setCurrentFolderId(file.id)
    } else if (file.webViewLink) {
      window.open(file.webViewLink, '_blank')
    }
  }

  const toggleFileSelection = (fileId: string) => {
    setSelectedFiles(prev => {
      const newSet = new Set(prev)
      if (newSet.has(fileId)) {
        newSet.delete(fileId)
      } else {
        newSet.add(fileId)
      }
      return newSet
    })
  }

  if (statusLoading) {
    return (
      <div className="min-h-screen bg-[#fafafa] dark:bg-[#1f1f1f] p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading Google Drive status...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!connected) {
    return (
      <div className="min-h-screen bg-[#fafafa] dark:bg-[#1f1f1f] p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12">
            <CloudOff className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
            <h1 className="text-3xl font-serif font-bold text-[#1f1f1f] dark:text-white mb-4">
              Connect Google Drive
            </h1>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Connect your Google Drive to access, manage, and enhance your files with AI-powered tools.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Cloud className="w-5 h-5" />
                    File Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• Browse and organize your files</li>
                    <li>• Upload and download files</li>
                    <li>• Create new documents</li>
                    <li>• Share and collaborate</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="w-5 h-5" />
                    AI-Powered Tools
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• Summarize documents</li>
                    <li>• Extract key information</li>
                    <li>• Generate content</li>
                    <li>• Analyze and categorize files</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Button
              onClick={handleConnect}
              disabled={isConnecting}
              size="lg"
              className="gap-2"
            >
              {isConnecting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  <Cloud className="w-4 h-4" />
                  Connect Google Drive
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#1f1f1f] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-serif font-bold text-[#1f1f1f] dark:text-white">
                Google Drive
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center gap-1">
                  <Cloud className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-muted-foreground">
                    Connected as {account?.email}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={refreshFiles}
                  disabled={filesLoading}
                >
                  <RefreshCw className={cn("w-3 h-3", filesLoading && "animate-spin")} />
                </Button>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setIsCreateModalOpen(true)}
                className="gap-2"
              >
                <Plus className="w-4 h-4" />
                New File
              </Button>
              <Button
                variant="outline"
                onClick={handleDisconnect}
                className="gap-2"
              >
                <Settings className="w-4 h-4" />
                Settings
              </Button>
            </div>
          </div>

          {/* Search and Controls */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-3 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search files..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              {currentFolderId && (
                <Button
                  variant="outline"
                  onClick={() => setCurrentFolderId(undefined)}
                  className="gap-2"
                >
                  <Folder className="w-4 h-4" />
                  Back to Root
                </Button>
              )}
            </div>
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Files Grid/List */}
        {filesLoading ? (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading files...</p>
          </div>
        ) : files.length === 0 ? (
          <div className="text-center py-12">
            <File className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-muted-foreground mb-2">
              {searchTerm ? 'No files found' : 'No files yet'}
            </h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm 
                ? 'Try adjusting your search terms'
                : 'Create your first file or upload from your device'
              }
            </p>
            {!searchTerm && (
              <Button onClick={() => setIsCreateModalOpen(true)} className="gap-2">
                <Plus className="w-4 h-4" />
                Create File
              </Button>
            )}
          </div>
        ) : (
          <div className={cn(
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
              : 'space-y-4'
          )}>
            {files.map((file: DriveFile) => {
              const IconComponent = getFileIcon(file.mimeType)
              const isFolder = file.mimeType === 'application/vnd.google-apps.folder'
              const isSelected = selectedFiles.has(file.id)

              return (
                <Card
                  key={file.id}
                  className={cn(
                    "group hover:shadow-md transition-all duration-200 cursor-pointer",
                    viewMode === 'list' && 'flex-row items-center p-4',
                    isSelected && 'ring-2 ring-blue-500'
                  )}
                  onClick={() => handleFileClick(file)}
                >
                  <CardHeader className={cn(
                    "pb-3",
                    viewMode === 'list' && 'flex-row items-center justify-between flex-1 pb-0'
                  )}>
                    <div className={cn(
                      "space-y-2",
                      viewMode === 'list' && 'space-y-1 flex-1'
                    )}>
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0 flex-1">
                          <IconComponent className={cn(
                            "w-5 h-5 text-muted-foreground flex-shrink-0",
                            isFolder && "text-blue-500"
                          )} />
                          <CardTitle className={cn(
                            "text-sm leading-tight truncate",
                            viewMode === 'list' && 'text-base'
                          )}>
                            {file.name}
                          </CardTitle>
                        </div>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          {!isFolder && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleDownloadFile(file.id, file.name, file.mimeType)
                              }}
                              disabled={isDownloading}
                            >
                              <Download className="w-3 h-3" />
                            </Button>
                          )}
                          {file.webViewLink && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                window.open(file.webViewLink, '_blank')
                              }}
                            >
                              <Eye className="w-3 h-3" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDeleteFile(file.id, file.name)
                            }}
                            disabled={isDeleting}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{formatFileSize(file.size)}</span>
                        <span>{formatDate(file.modifiedTime)}</span>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              )
            })}
          </div>
        )}

        <CreateFileModal
          open={isCreateModalOpen}
          onOpenChange={setIsCreateModalOpen}
          onFileCreated={refreshFiles}
          currentFolderId={currentFolderId}
        />
      </div>
    </div>
  )
}