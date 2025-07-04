"use client"

import { useState } from 'react'
import { Grid3X3, Plus, Check, X, Settings, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Calendar, 
  Mail, 
  Camera, 
  Music, 
  FileText, 
  Cloud, 
  Smartphone,
  MessageSquare,
  Video,
  Github,
  Twitter,
  Linkedin
} from 'lucide-react'

const allApps = [
  { icon: Calendar, label: 'Google Calendar', connected: true, color: 'text-blue-500', description: 'Sync your calendar events with Daksha for better planning' },
  { icon: Mail, label: 'Gmail', connected: true, color: 'text-red-500', description: 'Import important emails and conversations' },
  { icon: Camera, label: 'Google Photos', connected: false, color: 'text-green-500', description: 'Automatically organize and reflect on your photos' },
  { icon: Music, label: 'Spotify', connected: true, color: 'text-green-600', description: 'Track your music mood and listening patterns' },
  { icon: FileText, label: 'Notion', connected: false, color: 'text-gray-600', description: 'Import your notes and databases' },
  { icon: Cloud, label: 'Google Drive', connected: true, color: 'text-blue-600', description: 'Access and organize your documents' },
  { icon: Smartphone, label: 'Apple Health', connected: false, color: 'text-red-600', description: 'Track wellness data and health insights' },
  { icon: MessageSquare, label: 'Slack', connected: false, color: 'text-purple-500', description: 'Import work conversations and team updates' },
  { icon: Video, label: 'Zoom', connected: false, color: 'text-blue-400', description: 'Automatically transcribe and summarize meetings' },
  { icon: Github, label: 'GitHub', connected: true, color: 'text-gray-800', description: 'Track your coding activity and project progress' },
  { icon: Twitter, label: 'Twitter/X', connected: false, color: 'text-blue-400', description: 'Analyze your social media interactions' },
  { icon: Linkedin, label: 'LinkedIn', connected: false, color: 'text-blue-700', description: 'Track professional networking and career updates' },
]

export default function AppsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filter, setFilter] = useState<'all' | 'connected' | 'available'>('all')

  const filteredApps = allApps.filter(app => {
    const matchesSearch = app.label.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filter === 'all' || 
      (filter === 'connected' && app.connected) || 
      (filter === 'available' && !app.connected)
    return matchesSearch && matchesFilter
  })

  const connectedCount = allApps.filter(app => app.connected).length

  const toggleConnection = (index: number) => {
    // This would handle the actual connection logic
    console.log(`Toggle connection for ${allApps[index].label}`)
  }

  return (
    <div className="notion-page py-12 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Grid3X3 className="w-6 h-6 text-primary" />
          <h1 className="notion-title font-serif">Connected Apps</h1>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="gap-1">
            <Check className="w-3 h-3" />
            {connectedCount} Connected
          </Badge>
        </div>
      </div>

      {/* Description */}
      <div className="bg-muted/20 rounded-lg p-4">
        <p className="text-sm text-muted-foreground">
          Connect your favorite apps to Daksha AI agent to create a unified view of your digital life. 
          Your data stays secure and is only used to provide personalized insights and assistance.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Input
          placeholder="Search apps..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1"
        />
        <div className="flex gap-2">
          <Button 
            variant={filter === 'all' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setFilter('all')}
          >
            All
          </Button>
          <Button 
            variant={filter === 'connected' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setFilter('connected')}
          >
            Connected
          </Button>
          <Button 
            variant={filter === 'available' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setFilter('available')}
          >
            Available
          </Button>
        </div>
      </div>

      {/* Apps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredApps.map((app, index) => (
          <div key={index} className="bg-background border border-border/30 rounded-lg p-4 hover:shadow-sm transition-all">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-muted/20 rounded-lg">
                  <app.icon className={`w-5 h-5 ${app.color}`} />
                </div>
                <div>
                  <h3 className="font-medium">{app.label}</h3>
                  <div className="flex items-center gap-1 mt-1">
                    <div className={`w-2 h-2 rounded-full ${app.connected ? 'bg-green-500' : 'bg-gray-400'}`} />
                    <span className="text-xs text-muted-foreground">
                      {app.connected ? 'Connected' : 'Not connected'}
                    </span>
                  </div>
                </div>
              </div>
              {app.connected && (
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <Settings className="w-3 h-3" />
                </Button>
              )}
            </div>
            
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
              {app.description}
            </p>
            
            <div className="flex gap-2">
              <Button 
                variant={app.connected ? "outline" : "default"} 
                size="sm" 
                className="flex-1"
                onClick={() => toggleConnection(index)}
              >
                {app.connected ? (
                  <>
                    <X className="w-3 h-3 mr-1" />
                    Disconnect
                  </>
                ) : (
                  <>
                    <Plus className="w-3 h-3 mr-1" />
                    Connect
                  </>
                )}
              </Button>
              {app.connected && (
                <Button variant="ghost" size="sm" className="px-2">
                  <ExternalLink className="w-3 h-3" />
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredApps.length === 0 && (
        <div className="text-center py-12">
          <Grid3X3 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No apps found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  )
}