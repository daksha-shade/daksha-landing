"use client"

import { useState } from 'react'
import { Archive, Search, Filter, Calendar, Grid, List } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function ArchivePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')

  const archivedItems = [
    {
      title: "Q3 Reflection",
      type: "journal",
      date: "Sep 30, 2024",
      preview: "Looking back at the third quarter achievements...",
      tags: ["reflection", "quarterly"]
    },
    {
      title: "Product Launch Goal",
      type: "goal",
      date: "Aug 15, 2024",
      preview: "Successfully launched the beta version",
      tags: ["product", "launch", "completed"]
    },
    {
      title: "Summer Insights",
      type: "mind",
      date: "Jul 20, 2024",
      preview: "Key learnings from summer experiences",
      tags: ["insights", "summer", "learning"]
    },
    {
      title: "Team Building Discussion",
      type: "chat",
      date: "Jun 10, 2024",
      preview: "Conversation about building the right team",
      tags: ["team", "discussion", "strategy"]
    }
  ]

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'journal': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
      case 'goal': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
      case 'mind': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300'
      case 'chat': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300'
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300'
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Archive className="w-6 h-6 text-gray-500" />
          <h1 className="text-2xl font-serif font-semibold">Archive</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant={viewMode === 'list' ? 'default' : 'notion'} 
            size="sm" 
            onClick={() => setViewMode('list')}
          >
            <List className="w-4 h-4" />
          </Button>
          <Button 
            variant={viewMode === 'grid' ? 'default' : 'notion'} 
            size="sm" 
            onClick={() => setViewMode('grid')}
          >
            <Grid className="w-4 h-4" />
          </Button>
          <Button variant="notion" size="sm" className="gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search archived items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-border/30"
          />
        </div>
        <Button variant="notion" size="sm" className="gap-2">
          <Calendar className="w-4 h-4" />
          Date Range
        </Button>
      </div>

      {/* Archive Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-1">Journal Entries</h3>
          <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">24</p>
        </div>
        <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
          <h3 className="font-medium text-green-900 dark:text-green-100 mb-1">Completed Goals</h3>
          <p className="text-2xl font-bold text-green-700 dark:text-green-300">8</p>
        </div>
        <div className="p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200 dark:border-purple-800">
          <h3 className="font-medium text-purple-900 dark:text-purple-100 mb-1">Mind Maps</h3>
          <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">12</p>
        </div>
        <div className="p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-200 dark:border-orange-800">
          <h3 className="font-medium text-orange-900 dark:text-orange-100 mb-1">Conversations</h3>
          <p className="text-2xl font-bold text-orange-700 dark:text-orange-300">16</p>
        </div>
      </div>

      {/* Archived Items */}
      <div className="space-y-4">
        <h2 className="text-lg font-medium">Archived Items</h2>
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : 'space-y-3'}>
          {archivedItems.map((item, index) => (
            <div key={index} className="p-4 bg-background border border-border/30 rounded-lg hover:border-border/50 cursor-pointer transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-medium">{item.title}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(item.type)}`}>
                      {item.type}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{item.preview}</p>
                  <div className="flex items-center gap-2">
                    {item.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="text-xs px-2 py-1 bg-muted rounded-full text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="text-sm text-muted-foreground whitespace-nowrap ml-4">{item.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}