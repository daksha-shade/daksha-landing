"use client"

import { useState, useEffect, useCallback } from 'react'
import { Edit3, Search, Video, Mic, FileText, Clock, Filter, Grid, List, Plus, Volume2, Image as ImageIcon, ChevronDown, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { mockJournalEntries, getMoodColor, formatDuration, formatDate } from '@/lib/journal-data'

export default function JournalPage() {
  const [viewMode, setViewMode] = useState<'timeline' | 'grid'>('timeline')
  const [filterType, setFilterType] = useState<'all' | 'text' | 'audio' | 'video' | 'mixed'>('all')
  const [displayedEntries, setDisplayedEntries] = useState(5) // Start with 5 entries
  const [isLoading, setIsLoading] = useState(false)

  // Use shared journal entries
  const journalEntries = mockJournalEntries

  const filteredEntries = journalEntries.filter(entry => {
    if (filterType === 'all') return true
    return entry.type === filterType
  })

  const visibleEntries = filteredEntries.slice(0, displayedEntries)
  const hasMoreEntries = displayedEntries < filteredEntries.length

  const loadMore = useCallback(() => {
    if (isLoading || !hasMoreEntries) return
    
    setIsLoading(true)
    // Simulate loading delay
    setTimeout(() => {
      setDisplayedEntries(prev => Math.min(prev + 3, filteredEntries.length))
      setIsLoading(false)
    }, 800)
  }, [isLoading, hasMoreEntries, filteredEntries.length])

  // Reset displayed entries when filter changes
  useEffect(() => {
    setDisplayedEntries(5)
  }, [filterType])


  return (
    <div className="notion-page py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Edit3 className="w-6 h-6 text-primary" />
          <h1 className="notion-title font-serif">Journal</h1>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1">
            <Button
              variant={viewMode === 'timeline' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('timeline')}
              className="gap-1"
            >
              <List className="w-3 h-3" />
              Timeline
            </Button>
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="gap-1"
            >
              <Grid className="w-3 h-3" />
              Grid
            </Button>
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Search className="w-4 h-4" />
            Search
          </Button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center gap-2 pb-4 border-b border-border/20">
        <Filter className="w-4 h-4 text-muted-foreground" />
        <div className="flex gap-1 flex-wrap">
          {(['all', 'text', 'audio', 'video', 'mixed'] as const).map((type) => (
            <Button
              key={type}
              variant={filterType === type ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setFilterType(type)}
              className="h-7 px-3 text-xs capitalize"
            >
              {type === 'all' ? 'All' : type}
            </Button>
          ))}
        </div>
        <div className="ml-auto text-sm text-muted-foreground">
          {visibleEntries.length} of {filteredEntries.length} entries
        </div> {/* Create New Entry */}
        <div className="flex justify-center">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="gap-2 h-8  ">
                <Plus className="w-5 h-5" />
                Create New Entry
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Create New Entry</DialogTitle>
              </DialogHeader>
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground text-center">Choose how you'd like to journal today</p>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full gap-3 h-14 justify-start"
                    onClick={() => window.location.href = '/journal/text'}
                  >
                    <FileText className="w-5 h-5" />
                    <div className="text-left">
                      <div className="font-medium">Text Entry</div>
                      <div className="text-xs text-muted-foreground">Write your thoughts</div>
                    </div>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full gap-3 h-14 justify-start"
                    onClick={() => window.location.href = '/journal/audio'}
                  >
                    <Mic className="w-5 h-5" />
                    <div className="text-left">
                      <div className="font-medium">Audio Journal</div>
                      <div className="text-xs text-muted-foreground">Record your voice</div>
                    </div>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full gap-3 h-14 justify-start"
                    onClick={() => window.location.href = '/journal/video'}
                  >
                    <Video className="w-5 h-5" />
                    <div className="text-left">
                      <div className="font-medium">Video Journal</div>
                      <div className="text-xs text-muted-foreground">Capture on camera</div>
                    </div>
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>



      {/* Journal Entries */}
      <div className="space-y-4">
        <h2 className="text-lg font-medium">Your Journal</h2>

        {viewMode === 'timeline' ? (
          <div className="relative">
            {/* Main Timeline Line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 via-purple-200 to-transparent dark:from-blue-800 dark:via-purple-800" />
            
            <div className="space-y-6">
              {visibleEntries.map((entry) => (
                <div key={entry.id} className="relative">
                  <div className="flex gap-4">
                    {/* Enhanced Timeline Dot */}
                    <div className="relative flex flex-col items-center z-10">
                      <div className={`w-4 h-4 rounded-full border-3 border-background shadow-lg ${
                        entry.type === 'text' ? 'bg-blue-500 ring-2 ring-blue-200 dark:ring-blue-800' :
                        entry.type === 'audio' ? 'bg-green-500 ring-2 ring-green-200 dark:ring-green-800' :
                        entry.type === 'video' ? 'bg-red-500 ring-2 ring-red-200 dark:ring-red-800' :
                        'bg-purple-500 ring-2 ring-purple-200 dark:ring-purple-800'
                      }`} />
                      {/* Date marker line */}
                      <div className="absolute -left-8 top-1 text-xs text-muted-foreground font-mono bg-background px-1 rounded">
                        {formatDate(entry.timestamp)}
                      </div>
                    </div>

                  {/* Entry Content */}
                  <div className="flex-1 pb-6">
                    <div 
                      className="bg-background border border-border/30 rounded-lg p-4 hover:shadow-sm transition-all cursor-pointer"
                      onClick={() => window.location.href = `/journal/${entry.id}`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{entry.title}</h3>
                          <div className="flex items-center gap-1">
                            {entry.type === 'text' && <FileText className="w-3 h-3 text-blue-500" />}
                            {entry.type === 'audio' && <Volume2 className="w-3 h-3 text-green-500" />}
                            {entry.type === 'video' && <Video className="w-3 h-3 text-red-500" />}
                            {entry.type === 'mixed' && <Plus className="w-3 h-3 text-purple-500" />}
                          </div>
                          {entry.mood && (
                            <Badge variant="secondary" className={`text-xs ${getMoodColor(entry.mood)}`}>
                              {entry.mood}
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {entry.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>

                      {/* Content Preview */}
                      {entry.content && (
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {entry.content}
                        </p>
                      )}

                      {/* Audio/Video Duration */}
                      {entry.duration && (
                        <div className="flex items-center gap-1 mb-3">
                          <Clock className="w-3 h-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {formatDuration(entry.duration)}
                          </span>
                        </div>
                      )}

                      {/* Attachments */}
                      {entry.attachments && entry.attachments.length > 0 && (
                        <div className="flex items-center gap-2 mb-3">
                          {entry.attachments.map((attachment, idx) => (
                            <div key={idx} className="flex items-center gap-1 text-xs text-muted-foreground">
                              {attachment.type === 'image' && <ImageIcon className="w-3 h-3" />}
                              {attachment.type === 'audio' && <Volume2 className="w-3 h-3" />}
                              {attachment.type === 'video' && <Video className="w-3 h-3" />}
                              <span>{attachment.name}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Tags */}
                      {entry.tags && entry.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {entry.tags.map((tag, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Load More Section */}
            {hasMoreEntries && (
              <div className="relative flex justify-center pt-8">
                <div className="absolute left-6 top-0 w-0.5 h-8 bg-gradient-to-b from-purple-200 to-transparent dark:from-purple-800" />
                <Button 
                  onClick={loadMore}
                  disabled={isLoading}
                  variant="outline"
                  className="gap-2 bg-background/80 backdrop-blur-sm border-dashed hover:border-solid transition-all"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Loading more entries...
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-4 h-4" />
                      Load {Math.min(3, filteredEntries.length - displayedEntries)} more entries
                    </>
                  )}
                </Button>
              </div>
            )}
            
            {!hasMoreEntries && visibleEntries.length > 5 && (
              <div className="relative flex justify-center pt-8">
                <div className="absolute left-6 top-0 w-0.5 h-8 bg-gradient-to-b from-purple-200 to-transparent dark:from-purple-800" />
                <div className="text-center">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">You've reached the beginning of your journal</p>
                </div>
              </div>
            )}
          </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {visibleEntries.map((entry) => (
              <div 
                key={entry.id} 
                className="bg-background border border-border/30 rounded-lg p-4 hover:shadow-sm transition-all cursor-pointer"
                onClick={() => window.location.href = `/journal/${entry.id}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-sm">{entry.title}</h3>
                    {entry.type === 'text' && <FileText className="w-3 h-3 text-blue-500" />}
                    {entry.type === 'audio' && <Volume2 className="w-3 h-3 text-green-500" />}
                    {entry.type === 'video' && <Video className="w-3 h-3 text-red-500" />}
                    {entry.type === 'mixed' && <Plus className="w-3 h-3 text-purple-500" />}
                  </div>
                  <span className="text-xs text-muted-foreground">{formatDate(entry.timestamp)}</span>
                </div>

                {entry.content && (
                  <p className="text-xs text-muted-foreground mb-2 line-clamp-3">
                    {entry.content}
                  </p>
                )}

                {entry.duration && (
                  <div className="flex items-center gap-1 mb-2">
                    <Clock className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      {formatDuration(entry.duration)}
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  {entry.mood && (
                    <Badge variant="secondary" className={`text-xs ${getMoodColor(entry.mood)}`}>
                      {entry.mood}
                    </Badge>
                  )}
                  {entry.tags && entry.tags.length > 0 && (
                    <div className="flex gap-1">
                      {entry.tags.slice(0, 2).map((tag, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                      {entry.tags.length > 2 && (
                        <span className="text-xs text-muted-foreground">+{entry.tags.length - 2}</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
            </div>
            
            {/* Load More for Grid View */}
            {hasMoreEntries && (
              <div className="flex justify-center pt-6">
                <Button 
                  onClick={loadMore}
                  disabled={isLoading}
                  variant="outline"
                  className="gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Loading more entries...
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-4 h-4" />
                      Load {Math.min(3, filteredEntries.length - displayedEntries)} more entries
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        )}

        {filteredEntries.length === 0 && (
          <div className="text-center py-12">
            <Edit3 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No entries found</h3>
            <p className="text-muted-foreground">
              {filterType === 'all'
                ? 'Start journaling to see your entries here.'
                : `No ${filterType} entries found. Try a different filter.`
              }
            </p>
          </div>
        )}
      </div>
    </div>
  )
}