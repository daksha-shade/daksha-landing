"use client"

import { useState, useMemo } from 'react'
import {
  Camera,
  Video,
  FileText,
  BookOpen,
  Search,
  Filter,
  Grid,
  List,
  Calendar,
  MapPin,
  Users,
  Tag,
  Heart,
  Share2,
  Download,
  Eye,
  Plus,
  Clock,
  Sparkles,
  MoreVertical,
  X,
  ChevronLeft,
  ChevronRight,
  Info,
  Star
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { mockMemories, Memory } from '@/lib/dashboard-data'
import { cn } from '@/lib/utils'

type ViewMode = 'grid' | 'list'
type FilterType = 'all' | 'photo' | 'video' | 'note' | 'journal'
type SortBy = 'newest' | 'oldest' | 'title' | 'type'

export default function MemoriesVaultPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [filterType, setFilterType] = useState<FilterType>('all')
  const [sortBy, setSortBy] = useState<SortBy>('newest')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null)

  // Filter and sort memories
  const filteredMemories = useMemo(() => {
    let filtered = mockMemories

    // Apply type filter
    if (filterType !== 'all') {
      filtered = filtered.filter(memory => memory.type === filterType)
    }

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(memory =>
        memory.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        memory.aiDescription?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        memory.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return b.timestamp.getTime() - a.timestamp.getTime()
        case 'oldest':
          return a.timestamp.getTime() - b.timestamp.getTime()
        case 'title':
          return a.title.localeCompare(b.title)
        case 'type':
          return a.type.localeCompare(b.type)
        default:
          return 0
      }
    })

    return filtered
  }, [filterType, searchQuery, sortBy])

  const getTypeIcon = (type: Memory['type']) => {
    switch (type) {
      case 'photo': return Camera
      case 'video': return Video
      case 'note': return FileText
      case 'journal': return BookOpen
      default: return FileText
    }
  }

  const getTypeColor = (type: Memory['type']) => {
    switch (type) {
      case 'photo': return 'text-blue-500 bg-blue-50 dark:bg-blue-950/20'
      case 'video': return 'text-purple-500 bg-purple-50 dark:bg-purple-950/20'
      case 'note': return 'text-green-500 bg-green-50 dark:bg-green-950/20'
      case 'journal': return 'text-orange-500 bg-orange-50 dark:bg-orange-950/20'
      default: return 'text-gray-500 bg-gray-50 dark:bg-gray-950/20'
    }
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const MemoryCard = ({ memory, index }: { memory: Memory; index: number }) => {
    const TypeIcon = getTypeIcon(memory.type)

    return (
      <div
        className="relative group cursor-pointer"
        onClick={() => setSelectedMemory(memory)}
      >
        {/* Main Image/Content */}
        <div className="relative aspect-square bg-gray-100 dark:bg-gray-800 overflow-hidden rounded-lg">
          {memory.thumbnail ? (
            <img
              src={memory.thumbnail}
              alt={memory.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
              <TypeIcon className="w-8 h-8 text-gray-400" />
            </div>
          )}

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-200" />

          {/* Type indicator */}
          <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-black/60 text-white rounded-full p-1">
              <TypeIcon className="w-3 h-3" />
            </div>
          </div>

          {/* Actions */}
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="flex gap-1">
              <Button
                size="sm"
                variant="ghost"
                className="h-8 w-8 p-0 bg-black/60 hover:bg-black/80 text-white border-0"
                onClick={(e) => {
                  e.stopPropagation()
                  // Handle favorite
                }}
              >
                <Heart className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="h-8 w-8 p-0 bg-black/60 hover:bg-black/80 text-white border-0"
                onClick={(e) => {
                  e.stopPropagation()
                  // Handle more options
                }}
              >
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Duration for videos */}
          {memory.type === 'video' && (
            <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
              2:34
            </div>
          )}
        </div>
      </div>
    )
  }


  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Google Photos style header */}
      <div className="sticky top-0 z-10 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-normal text-gray-900 dark:text-white">Photos</h1>
              <div className="text-sm text-gray-500">
                {filteredMemories.length} items
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search your photos"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-80 bg-gray-100 dark:bg-gray-800 border-0 focus:bg-white dark:focus:bg-gray-700"
                />
              </div>

              {/* Filter */}
              <Button variant="ghost" size="sm" className="gap-2">
                <Filter className="w-4 h-4" />
                Filter
              </Button>

              {/* Upload */}
              <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4" />
                Upload
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 py-6">

        {/* Google Photos style grid */}
        {filteredMemories.length === 0 ? (
          <div className="text-center py-20">
            <Camera className="w-24 h-24 mx-auto mb-6 text-gray-300" />
            <h3 className="text-2xl font-normal text-gray-900 dark:text-white mb-2">No photos yet</h3>
            <p className="text-gray-500 mb-6">
              {searchQuery
                ? "No photos match your search"
                : "Upload photos to get started"
              }
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Upload photos
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-1">
            {filteredMemories.map((memory, index) => (
              <MemoryCard key={memory.id} memory={memory} index={index} />
            ))}
          </div>
        )}
      </div>

      {/* Google Photos style modal */}
      <Dialog open={!!selectedMemory} onOpenChange={() => setSelectedMemory(null)}>
        <DialogContent className="max-w-7xl max-h-[95vh] p-0 bg-black border-0">
          {selectedMemory && (
            <div className="relative w-full h-full">
              {/* Header */}
              <div className="absolute top-0 left-0 right-0 z-20 bg-black/80 backdrop-blur-sm">
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedMemory(null)}
                      className="text-white hover:bg-white/20"
                    >
                      <X className="w-5 h-5" />
                    </Button>
                    <div className="text-white">
                      <h3 className="font-medium">{selectedMemory.title}</h3>
                      <p className="text-sm text-gray-300">{formatDate(selectedMemory.timestamp)}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                      <Star className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                      <Share2 className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                      <Download className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                      <Info className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                      <MoreVertical className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Main image */}
              <div className="flex items-center justify-center w-full h-[95vh] bg-black">
                {selectedMemory.thumbnail ? (
                  <img
                    src={selectedMemory.thumbnail}
                    alt={selectedMemory.title}
                    className="max-w-full max-h-full object-contain"
                  />
                ) : (
                  <div className="flex items-center justify-center w-64 h-64 bg-gray-800 rounded-lg">
                    {(() => {
                      const TypeIcon = getTypeIcon(selectedMemory.type)
                      return <TypeIcon className="w-16 h-16 text-gray-400" />
                    })()}
                  </div>
                )}
              </div>

              {/* Navigation arrows */}
              <Button
                variant="ghost"
                size="sm"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 w-12 h-12 rounded-full"
                onClick={(e) => {
                  e.stopPropagation()
                  // Handle previous image
                }}
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 w-12 h-12 rounded-full"
                onClick={(e) => {
                  e.stopPropagation()
                  // Handle next image
                }}
              >
                <ChevronRight className="w-6 h-6" />
              </Button>

              {/* Bottom info panel (optional) */}
              <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm p-4 text-white">
                <div className="max-w-4xl mx-auto">
                  {selectedMemory.aiDescription && (
                    <p className="text-sm text-gray-300 mb-2">{selectedMemory.aiDescription}</p>
                  )}

                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    {selectedMemory.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {selectedMemory.location}
                      </span>
                    )}
                    {selectedMemory.people && selectedMemory.people.length > 0 && (
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {selectedMemory.people.join(', ')}
                      </span>
                    )}
                  </div>

                  {selectedMemory.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {selectedMemory.tags.map((tag, index) => (
                        <span key={index} className="text-xs bg-white/20 px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}