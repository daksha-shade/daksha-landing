"use client"

import { useState, useEffect } from 'react'
import { Camera, Video, FileText, Heart, MapPin, Users, Calendar, ChevronRight, Loader2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useJournalEntries } from '@/hooks/useDashboard'

interface Memory {
  id: string
  title: string
 type: 'photo' | 'video' | 'journal' | 'note'
  thumbnail?: string
  timestamp: Date | string
  aiDescription?: string | null
  location?: string | null
 people?: string[]
  tags: string[]
}

interface MemoriesVaultProps {
  className?: string
}

export default function MemoriesVault({ className }: MemoriesVaultProps) {
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null)
  const { entries, isLoading } = useJournalEntries({ limit: 6 })

  // Convert journal entries to memory format
  const memories: Memory[] = entries.map(entry => ({
    id: entry.id,
    title: entry.title,
    type: entry.type as 'photo' | 'video' | 'journal' | 'note' || 'journal',
    thumbnail: entry.imageUrls?.[0],
    timestamp: entry.entryDate,
    aiDescription: entry.aiSummary,
    location: entry.location,
    people: entry.emotionalTags?.filter(tag => tag.includes('@')) || [],
    tags: entry.tags || []
  }))

  const getTypeIcon = (type: Memory['type']) => {
    switch (type) {
      case 'photo':
        return <Camera className="w-4 h-4" />
      case 'video':
        return <Video className="w-4 h-4" />
      case 'journal':
      case 'note':
        return <FileText className="w-4 h-4" />
      default:
        return <FileText className="w-4 h-4" />
    }
  }

  const getTypeColor = (type: Memory['type']) => {
    switch (type) {
      case 'photo':
        return 'text-blue-500 bg-blue-50 dark:bg-blue-950/20'
      case 'video':
        return 'text-purple-500 bg-purple-50 dark:bg-purple-950/20'
      case 'journal':
        return 'text-green-500 bg-green-50 dark:bg-green-950/20'
      case 'note':
        return 'text-orange-500 bg-orange-50 dark:bg-orange-950/20'
      default:
        return 'text-gray-500 bg-gray-50 dark:bg-gray-950/20'
    }
  }

  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    const now = new Date()
    const diffInHours = (now.getTime() - dateObj.getTime()) / (1000 * 60 * 60)

    if (diffInHours < 1) {
      return 'Just now'
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`
    } else if (diffInHours < 48) {
      return 'Yesterday'
    } else {
      return dateObj.toLocaleDateString()
    }
  }

  if (isLoading) {
    return (
      <Card className={cn("", className)}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500" />
              Memories Vault
            </CardTitle>
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="text-muted-foreground"
            >
              <Link href="/memories">
                View All
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Your life's beautiful moments, organized by AI
          </p>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-64">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={cn("", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500" />
            Memories Vault
          </CardTitle>
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="text-muted-foreground"
          >
            <Link href="/memories">
              View All
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          Your life's beautiful moments, organized by AI
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Memory Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {memories.map((memory) => (
            <div
              key={memory.id}
              className="group relative aspect-square rounded-lg overflow-hidden cursor-pointer border border-border/30 hover:border-border/60 transition-all duration-200"
              onClick={() => setSelectedMemory(memory)}
            >
              {/* Thumbnail or Content Preview */}
              {memory.thumbnail ? (
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${memory.thumbnail})` }}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-muted/50 to-muted flex items-center justify-center">
                  {getTypeIcon(memory.type)}
                </div>
              )}

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200" />

              {/* Type Badge */}
              <div className={cn(
                "absolute top-2 left-2 p-1 rounded-full",
                getTypeColor(memory.type)
              )}>
                {getTypeIcon(memory.type)}
              </div>

              {/* Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent">
                <p className="text-white text-xs font-medium truncate">
                  {memory.title}
                </p>
                <p className="text-white/80 text-xs">
                  {formatDate(memory.timestamp)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="flex items-center justify-between pt-2 border-t border-border/30">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Camera className="w-3 h-3" />
              {memories.filter(m => m.type === 'photo').length}
            </span>
            <span className="flex items-center gap-1">
              <Video className="w-3 h-3" />
              {memories.filter(m => m.type === 'video').length}
            </span>
            <span className="flex items-center gap-1">
              <FileText className="w-3 h-3" />
              {memories.filter(m => m.type === 'journal' || m.type === 'note').length}
            </span>
          </div>
          <Badge variant="secondary" className="text-xs">
            {memories.length} memories
          </Badge>
        </div>

        {/* Selected Memory Detail (if any) */}
        {selectedMemory && (
          <div className="mt-4 p-3 bg-muted/30 rounded-lg border border-border/30">
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-medium text-sm">{selectedMemory.title}</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedMemory(null)}
                className="h-6 w-6 p-0"
              >
                ×
              </Button>
            </div>

            {selectedMemory.aiDescription && (
              <p className="text-sm text-muted-foreground mb-2 italic">
                "{selectedMemory.aiDescription}"
              </p>
            )}

            <div className="flex items-center gap-2 text-xs text-muted-foreground">
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
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {formatDate(selectedMemory.timestamp)}
              </span>
            </div>

            <div className="flex flex-wrap gap-1 mt-2">
              {selectedMemory.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}