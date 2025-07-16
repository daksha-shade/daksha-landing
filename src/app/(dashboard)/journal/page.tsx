"use client"

import { useState, useEffect, useCallback } from "react"
import { Edit3, Search, Video, Mic, FileText, Grid, List, Plus, ChevronDown, Loader2, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { mockJournalEntries, getMoodColor, formatDuration, formatDate } from "@/lib/journal-data"

export default function JournalPage() {
  const [viewMode, setViewMode] = useState("timeline")
  const [filterType, setFilterType] = useState("all")
  const [displayedEntries, setDisplayedEntries] = useState(12)
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const journalEntries = mockJournalEntries

  const filteredEntries = journalEntries.filter(entry => {
    if (filterType !== "all" && entry.type !== filterType) return false
    if (searchQuery && !entry.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !entry.content?.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const visibleEntries = filteredEntries.slice(0, displayedEntries)
  const hasMoreEntries = displayedEntries < filteredEntries.length

  const loadMore = useCallback(() => {
    if (isLoading || !hasMoreEntries) return
    setIsLoading(true)
    setTimeout(() => {
      setDisplayedEntries(prev => Math.min(prev + 6, filteredEntries.length))
      setIsLoading(false)
    }, 300)
  }, [isLoading, hasMoreEntries, filteredEntries.length])

  useEffect(() => {
    setDisplayedEntries(12)
  }, [filterType, searchQuery])

  const stats = {
    total: journalEntries.length,
    thisWeek: journalEntries.filter(entry => {
      const entryDate = new Date(entry.timestamp)
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      return entryDate >= weekAgo
    }).length
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case "text": return <FileText className="h-4 w-4" />
      case "audio": return <Mic className="h-4 w-4" />
      case "video": return <Video className="h-4 w-4" />
      default: return <FileText className="h-4 w-4" />
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Edit3 className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold tracking-tight">Journal</h1>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Entry
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Entry</DialogTitle>
              </DialogHeader>
              <div className="grid gap-3 py-4">
                <Button
                  variant="outline"
                  className="justify-start h-auto p-4"
                  onClick={() => window.location.href = '/journal/text'}
                >
                  <FileText className="h-5 w-5 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">Text Entry</div>
                    <div className="text-sm text-muted-foreground">Write your thoughts and ideas</div>
                  </div>
                </Button>
                <Button
                  variant="outline"
                  className="justify-start h-auto p-4"
                  onClick={() => window.location.href = '/journal/audio'}
                >
                  <Mic className="h-5 w-5 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">Audio Journal</div>
                    <div className="text-sm text-muted-foreground">Record your voice and feelings</div>
                  </div>
                </Button>
                <Button
                  variant="outline"
                  className="justify-start h-auto p-4"
                  onClick={() => window.location.href = '/journal/video'}
                >
                  <Video className="h-5 w-5 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">Video Journal</div>
                    <div className="text-sm text-muted-foreground">Capture moments and emotions</div>
                  </div>
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <p className="text-muted-foreground">
          Your personal space for thoughts, memories, and reflections
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">Total Entries</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{stats.thisWeek}</div>
            <p className="text-xs text-muted-foreground">This Week</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{filteredEntries.length}</div>
            <p className="text-xs text-muted-foreground">Filtered</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            
            <div className="flex flex-col sm:flex-row gap-3 flex-1">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search entries with semantic understanding..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              
              <Tabs value={filterType} onValueChange={(value) => setFilterType(value)}>
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="text">Text</TabsTrigger>
                  <TabsTrigger value="audio">Audio</TabsTrigger>
                  <TabsTrigger value="video">Video</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="flex items-center gap-1 border rounded-md p-1">
              <Button
                variant={viewMode === "timeline" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("timeline")}
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-4"}>
        {visibleEntries.map((entry) => (
          <Card 
            key={entry.id} 
            className="group cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => window.open(`/journal/${entry.id}`, '_blank')}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className="p-2 rounded-md bg-muted">
                    {getTypeIcon(entry.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-base truncate">
                      {entry.title}
                    </CardTitle>
                    <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                      {entry.mood && (
                        <>
                          <div className={`w-2 h-2 rounded-full ${getMoodColor(entry.mood)}`} />
                          <span className="capitalize">{entry.mood}</span>
                          <span>•</span>
                        </>
                      )}
                      <span>
                        {entry.timestamp ? formatDate(entry.timestamp) : "No date"}
                      </span>
                    </div>
                  </div>
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="opacity-0 group-hover:opacity-100"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={(e) => {
                      e.stopPropagation()
                      window.open(`/journal/${entry.id}?mode=edit`, '_blank')
                    }}>
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                      Share
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                      Export
                    </DropdownMenuItem>
                    <Separator />
                    <DropdownMenuItem 
                      className="text-destructive"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                {entry.content}
              </p>
              
              {entry.type === "audio" && entry.duration && (
                <div className="flex items-center gap-2 mt-3 p-2 bg-muted rounded-md">
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <Mic className="h-3 w-3" />
                  </Button>
                  <div className="flex-1 h-1 bg-border rounded-full">
                    <div className="h-full w-1/3 bg-primary rounded-full"></div>
                  </div>
                  <span className="text-xs text-muted-foreground">{formatDuration(entry.duration)}</span>
                </div>
              )}
              
              {entry.tags && entry.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-3">
                  {entry.tags.slice(0, 3).map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {entry.tags.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{entry.tags.length - 3}
                    </Badge>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {hasMoreEntries && (
        <div className="flex justify-center">
          <Button 
            onClick={loadMore} 
            disabled={isLoading}
            variant="outline"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Loading...
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4 mr-2" />
                Load More Entries
              </>
            )}
          </Button>
        </div>
      )}

      {filteredEntries.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Edit3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No entries found</h3>
            <p className="text-muted-foreground text-sm mb-4">
              {searchQuery || filterType !== "all" 
                ? "Try adjusting your search or filters"
                : "Start your journaling journey by creating your first entry"
              }
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
