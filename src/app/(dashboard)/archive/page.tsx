"use client"

import { useState } from 'react'
import { 
  Archive, 
  Search, 
  Filter, 
  Calendar, 
  Grid, 
  List, 
  FileText, 
  Target, 
  Brain, 
  MessageCircle,
  Clock,
  Tag,
  MoreHorizontal,
  Download,
  RotateCcw,
  Trash2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'

export default function ArchivePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')
  const [filterType, setFilterType] = useState('all')
  const [sortBy, setSortBy] = useState('date')

  const archivedItems = [
    {
      id: '1',
      title: "Q3 Reflection & Planning",
      type: "journal",
      date: "Sep 30, 2024",
      archivedDate: "Oct 15, 2024",
      preview: "Looking back at the third quarter achievements and setting goals for Q4. Key insights about productivity patterns and team dynamics.",
      tags: ["reflection", "quarterly", "planning"],
      size: "2.4 KB"
    },
    {
      id: '2',
      title: "Product Launch Goal - Beta Release",
      type: "goal",
      date: "Aug 15, 2024",
      archivedDate: "Oct 10, 2024",
      preview: "Successfully launched the beta version with 500+ early adopters. Exceeded initial user acquisition targets by 150%.",
      tags: ["product", "launch", "completed", "milestone"],
      size: "1.8 KB"
    },
    {
      id: '3',
      title: "Summer Learning Insights",
      type: "mind",
      date: "Jul 20, 2024",
      archivedDate: "Oct 5, 2024",
      preview: "Key learnings from summer experiences, including new technologies, personal growth, and career development insights.",
      tags: ["insights", "summer", "learning", "growth"],
      size: "3.2 KB"
    },
    {
      id: '4',
      title: "Team Building Strategy Discussion",
      type: "chat",
      date: "Jun 10, 2024",
      archivedDate: "Sep 28, 2024",
      preview: "In-depth conversation with Daksha about building the right team culture and hiring strategies for rapid growth.",
      tags: ["team", "discussion", "strategy", "hiring"],
      size: "4.1 KB"
    },
    {
      id: '5',
      title: "Daily Standup Notes - Week 24",
      type: "journal",
      date: "Jun 5, 2024",
      archivedDate: "Sep 20, 2024",
      preview: "Weekly compilation of daily standup notes, blockers resolved, and team velocity improvements.",
      tags: ["standup", "team", "weekly", "notes"],
      size: "1.5 KB"
    },
    {
      id: '6',
      title: "Personal Fitness Goal - Marathon",
      type: "goal",
      date: "May 1, 2024",
      archivedDate: "Sep 15, 2024",
      preview: "Completed first marathon in 4:15:32. Training plan worked well, learned valuable lessons about persistence.",
      tags: ["fitness", "marathon", "completed", "personal"],
      size: "2.1 KB"
    }
  ]

  const filteredItems = archivedItems.filter(item => {
    if (filterType !== 'all' && item.type !== filterType) return false
    if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !item.preview.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(b.archivedDate).getTime() - new Date(a.archivedDate).getTime()
      case 'title':
        return a.title.localeCompare(b.title)
      case 'type':
        return a.type.localeCompare(b.type)
      default:
        return 0
    }
  })

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'journal': return <FileText className="h-4 w-4" />
      case 'goal': return <Target className="h-4 w-4" />
      case 'mind': return <Brain className="h-4 w-4" />
      case 'chat': return <MessageCircle className="h-4 w-4" />
      default: return <FileText className="h-4 w-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'journal': return 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30'
      case 'goal': return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30'
      case 'mind': return 'text-purple-600 bg-purple-100 dark:text-purple-400 dark:bg-purple-900/30'
      case 'chat': return 'text-orange-600 bg-orange-100 dark:text-orange-400 dark:bg-orange-900/30'
      default: return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/30'
    }
  }

  const stats = {
    total: archivedItems.length,
    journal: archivedItems.filter(item => item.type === 'journal').length,
    goal: archivedItems.filter(item => item.type === 'goal').length,
    mind: archivedItems.filter(item => item.type === 'mind').length,
    chat: archivedItems.filter(item => item.type === 'chat').length
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Archive className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold tracking-tight">Archive</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export All
            </Button>
          </div>
        </div>
        <p className="text-muted-foreground">
          Your archived entries, goals, and conversations
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">Total Items</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{stats.journal}</div>
            <p className="text-xs text-muted-foreground">Journal Entries</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{stats.goal}</div>
            <p className="text-xs text-muted-foreground">Goals</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">{stats.mind}</div>
            <p className="text-xs text-muted-foreground">Mind Maps</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-600">{stats.chat}</div>
            <p className="text-xs text-muted-foreground">Conversations</p>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-3 flex-1 w-full lg:w-auto">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search archived items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="journal">Journal</SelectItem>
                  <SelectItem value="goal">Goals</SelectItem>
                  <SelectItem value="mind">Mind</SelectItem>
                  <SelectItem value="chat">Chat</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Date</SelectItem>
                  <SelectItem value="title">Title</SelectItem>
                  <SelectItem value="type">Type</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-1 border rounded-md p-1">
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Info */}
      {(searchQuery || filterType !== 'all') && (
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            Showing {sortedItems.length} of {archivedItems.length} archived items
            {searchQuery && ` matching "${searchQuery}"`}
            {filterType !== 'all' && ` of type ${filterType}`}
          </span>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => {
              setSearchQuery('')
              setFilterType('all')
            }}
          >
            Clear filters
          </Button>
        </div>
      )}

      {/* Archived Items */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-3'}>
        {sortedItems.map((item) => (
          <Card key={item.id} className="group hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2 flex-1">
                  <div className={`p-1.5 rounded-md ${getTypeColor(item.type)}`}>
                    {getTypeIcon(item.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium truncate">{item.title}</h3>
                    <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>Archived {item.archivedDate}</span>
                      <span>-</span>
                      <span>{item.size}</span>
                    </div>
                  </div>
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Restore
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </DropdownMenuItem>
                    <Separator />
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Permanently
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              
              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                {item.preview}
              </p>
              
              <div className="flex flex-wrap gap-1">
                {item.tags.slice(0, 3).map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {item.tags.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{item.tags.length - 3}
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {sortedItems.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Archive className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No archived items found</h3>
            <p className="text-muted-foreground text-sm mb-4">
              {searchQuery || filterType !== 'all' 
                ? "Try adjusting your search or filters"
                : "Items you archive will appear here"
              }
            </p>
            {(searchQuery || filterType !== 'all') && (
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchQuery('')
                  setFilterType('all')
                }}
              >
                Clear filters
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}