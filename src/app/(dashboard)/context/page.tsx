"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { FileText, Search, Grid, List, Plus, ChevronDown, Loader2, MoreHorizontal, Book, Edit3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { ContextSearch } from "@/components/context/ContextSearch"

type ContextFile = { 
  id: string; 
  title: string; 
  content: string;
  updatedAt: string;
  createdAt: string;
  sourceUrl?: string;
}

export default function ContextPage() {
  const router = useRouter()
  const [viewMode, setViewMode] = useState("timeline")
  const [displayedEntries, setDisplayedEntries] = useState(12)
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [items, setItems] = useState<ContextFile[]>([])
  const [loading, setLoading] = useState(true)

  async function load() {
    setLoading(true)
    try {
      const res = await fetch("/api/context")
      if (!res.ok) throw new Error("Failed to load")
      const json = await res.json() as { items: ContextFile[] }
      setItems(json.items ?? [])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const filteredEntries = items.filter(item => {
    if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !item.content?.toLowerCase().includes(searchQuery.toLowerCase())) return false
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
  }, [searchQuery])

  const stats = {
    total: items.length,
    thisWeek: items.filter(item => {
      const itemDate = new Date(item.createdAt || item.updatedAt)
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      return itemDate >= weekAgo
    }).length
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    } else if (diffInHours < 24 * 7) {
      return date.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })
    }
  }

  const getContentPreview = (content: string, maxLength: number = 150) => {
    if (!content) return "No content"
    return content.length > maxLength ? content.substring(0, maxLength) + "..." : content
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this context file?")) return
    try {
      const res = await fetch(`/api/context/${id}`, { method: "DELETE" })
      if (res.ok) {
        load() // Refresh the list
      } else {
        alert("Failed to delete")
      }
    } catch (error) {
      console.error("Error deleting file:", error)
      alert("Error deleting file")
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Book className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold tracking-tight">Context</h1>
          </div>
          <Button onClick={() => router.push("/context/edit")}>
            <Plus className="h-4 w-4 mr-2" />
            New Context
          </Button>
        </div>
        <p className="text-muted-foreground">
          Create and manage context files that enhance your AI conversations
        </p>
      </div>

      <Card className="border-0 p-0 my-2 bg-transparent">
        <CardContent className="p-0 m-0">
          <div className="flex flex-col sm:flex-row gap-4 p-0 m-0 items-start sm:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-3 flex-1">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search context files..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground whitespace-nowrap">
                <span>
                  <span className="font-semibold">{stats.total}</span> Total
                </span>
                <span>·</span>
                <span>
                  <span className="font-semibold">{stats.thisWeek}</span> This Week
                </span>
                <span>·</span>
                <span>
                  <span className="font-semibold">{filteredEntries.length}</span> Filtered
                </span>
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
          </div>
        </CardContent>
      </Card>

      {/* Context Search Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Search className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-lg font-semibold">Semantic Search</h2>
        </div>
        <ContextSearch />
      </div>

      <Separator />

      {loading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-8">
          <Book className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No context files yet</h3>
          <p className="text-muted-foreground mb-4">
            Create your first context file to get started
          </p>
          <Button onClick={() => router.push("/context/edit")}>
            <Plus className="h-4 w-4 mr-2" />
            Create Context File
          </Button>
        </div>
      ) : (
        <>
          <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-4"}>
            {visibleEntries.map((item) => (
              <Card
                key={item.id}
                className="group cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => router.push(`/context/edit?id=${item.id}`)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="p-2 rounded-md bg-muted">
                        <FileText className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-base truncate">
                          {item.title}
                        </CardTitle>
                        <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                          <span>
                            Updated {formatDate(item.updatedAt)}
                          </span>
                          {item.sourceUrl && (
                            <>
                              <span>•</span>
                              <span className="truncate">From URL</span>
                            </>
                          )}
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
                        <DropdownMenuItem onClick={() => {
                          router.push(`/context/edit?id=${item.id}`)
                        }}>
                          <Edit3 className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDelete(item.id)
                          }}
                          className="text-destructive"
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {getContentPreview(item.content)}
                  </p>
                  {item.sourceUrl && (
                    <div className="mt-2">
                      <Badge variant="outline" className="text-xs">
                        External Source
                      </Badge>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {hasMoreEntries && (
            <div className="flex justify-center pt-6">
              <Button
                variant="outline"
                onClick={loadMore}
                disabled={isLoading}
                className="w-full max-w-xs"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Loading...
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-4 w-4 mr-2" />
                    Load More ({filteredEntries.length - displayedEntries} remaining)
                  </>
                )}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}