"use client"

import { useState } from 'react'
import { Grid3X3, Plus, Check, X, Settings, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/Button'
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
    Linkedin,
    StickyNote,
    Target,
    Brain,
    HardDrive,
    Users,
    Timer,
    PenTool
} from 'lucide-react'
import Link from 'next/link'

const dakshaApps = [
    { icon: PenTool, label: 'WriteFlow', connected: true, color: 'text-emerald-500', description: 'AI writing assistant for emails, messages, and content across all platforms', category: 'productivity', link: '/apps/writeflow' },
    { icon: Users, label: 'Vani', connected: false, color: 'text-pink-500', description: 'Anonymous social community for authentic sharing', category: 'social', link: 'https://vani.daksha.live' },
    { icon: MessageSquare, label: 'Chat', connected: true, color: 'text-blue-600', description: 'Conversational AI assistant for daily tasks', category: 'intelligence', link: '/apps/chat' },
    { icon: Brain, label: 'Mind', connected: true, color: 'text-purple-500', description: 'Memory palace and thought organization', category: 'intelligence', link: '/apps/mind' },
    { icon: StickyNote, label: 'Notes', connected: true, color: 'text-yellow-500', description: 'Quick notes and thoughts with AI organization', category: 'productivity', link: '/apps/notes' },
    { icon: Timer, label: 'Timelines', connected: true, color: 'text-indigo-500', description: 'Visual life timeline and memory tracking', category: 'memory', link: '/apps/timelines' },
    { icon: Calendar, label: 'Scheduler', connected: true, color: 'text-blue-500', description: 'AI-powered scheduling and time management', category: 'productivity', link: '/apps/scheduler' },
    { icon: Target, label: 'Goals', connected: true, color: 'text-green-500', description: 'Set, track, and achieve your personal goals', category: 'productivity', link: '/apps/goals' },
    { icon: HardDrive, label: 'Drive', connected: true, color: 'text-gray-600', description: 'Secure cloud storage with AI organization', category: 'storage', link: '/apps/drive' },
]

const externalApps = [
    { icon: Calendar, label: 'Google Calendar', connected: true, color: 'text-blue-500', description: 'Sync your calendar events with Daksha for better planning', category: 'productivity', link: '/apps/google-calendar' },
    { icon: Mail, label: 'Gmail', connected: true, color: 'text-red-500', description: 'Import important emails and conversations', category: 'communication', link: '/apps/gmail' },
    { icon: Camera, label: 'Google Photos', connected: false, color: 'text-green-500', description: 'Automatically organize and reflect on your photos', category: 'media', link: '/apps/google-photos' },
    { icon: Music, label: 'Spotify', connected: true, color: 'text-green-600', description: 'Track your music mood and listening patterns', category: 'media', link: '/apps/spotify' },
    { icon: FileText, label: 'Notion', connected: false, color: 'text-gray-600', description: 'Import and export your notes and databases', category: 'productivity', link: '/apps/notion' },
    { icon: Cloud, label: 'Google Drive', connected: true, color: 'text-blue-600', description: 'Access and organize your documents', category: 'storage', link: '/apps/google-drive' },
    { icon: Smartphone, label: 'Apple Health', connected: false, color: 'text-red-600', description: 'Track wellness data and health insights', category: 'health', link: '/apps/apple-health' },
    { icon: MessageSquare, label: 'Slack', connected: false, color: 'text-purple-500', description: 'Import work conversations and team updates', category: 'communication', link: '/apps/slack' },
    { icon: Video, label: 'Zoom', connected: false, color: 'text-blue-400', description: 'Automatically transcribe and summarize meetings', category: 'communication', link: '/apps/zoom' },
    { icon: Github, label: 'GitHub', connected: true, color: 'text-gray-800', description: 'Track your coding activity and project progress', category: 'development', link: '/apps/github' },
    { icon: Twitter, label: 'Twitter/X', connected: false, color: 'text-blue-400', description: 'Analyze your social media interactions', category: 'social', link: '/apps/twitter' },
    { icon: Linkedin, label: 'LinkedIn', connected: false, color: 'text-blue-700', description: 'Track professional networking and career updates', category: 'social', link: '/apps/linkedin' },
]

export function AppsInterface() {
    const [searchQuery, setSearchQuery] = useState("")
    const [filter, setFilter] = useState<'all' | 'connected' | 'available'>('all')

    const allApps = [...dakshaApps, ...externalApps]

    const filteredDakshaApps = dakshaApps.filter(app => {
        const matchesSearch = app.label.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesFilter = filter === 'all' ||
            (filter === 'connected' && app.connected) ||
            (filter === 'available' && !app.connected)
        return matchesSearch && matchesFilter
    })

    const filteredExternalApps = externalApps.filter(app => {
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
        <div className="w-full max-w-7xl mx-auto px-6 py-8 space-y-8">
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

            {/* Daksha Apps Section */}
            {(filteredDakshaApps.length > 0 || searchQuery === "") && (
                <div className="space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                            <span className="text-primary-foreground font-bold text-sm">D</span>
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold">Daksha Apps</h2>
                            <p className="text-sm text-muted-foreground">Built-in apps designed for your personal AI ecosystem</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {filteredDakshaApps.map((app, index) => (
                            <div key={index} className="bg-background border border-border/30 rounded-xl p-5 hover:shadow-md hover:border-border/50 transition-all duration-200 group">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-3 bg-gradient-to-br from-muted/30 to-muted/10 rounded-xl group-hover:scale-105 transition-transform">
                                            <app.icon className={`w-6 h-6 ${app.color}`} />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-base">{app.label}</h3>
                                            <div className="flex items-center gap-1 mt-1">
                                                <div className={`w-2 h-2 rounded-full ${app.connected ? 'bg-green-500' : 'bg-gray-400'}`} />
                                                <span className="text-xs text-muted-foreground capitalize">
                                                    {app.category}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    {app.connected && (
                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Settings className="w-4 h-4" />
                                        </Button>
                                    )}
                                </div>

                                <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
                                    {app.description}
                                </p>

                                <div className="flex gap-2">
                                    {app.connected ? (
                                        <Button variant="outline" size="sm" className="flex-1">
                                            <Link href={app.link} className="flex-1 flex items-center justify-center">
                                                <ExternalLink className="w-3 h-3 mr-2" />
                                                Open App
                                            </Link>
                                        </Button>
                                    ) : (
                                        <Button size="sm" className="flex-1">
                                            <Plus className="w-3 h-3 mr-2" />
                                            Enable
                                        </Button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* External Apps Section */}
            {(filteredExternalApps.length > 0 || searchQuery === "") && (
                <div className="space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                            <Grid3X3 className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold">Connected Apps</h2>
                            <p className="text-sm text-muted-foreground">Third-party integrations to enhance your Daksha experience</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {filteredExternalApps.map((app, index) => (
                            <div key={index} className="bg-background border border-border/30 rounded-xl p-5 hover:shadow-md hover:border-border/50 transition-all duration-200 group">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-3 bg-gradient-to-br from-muted/30 to-muted/10 rounded-xl group-hover:scale-105 transition-transform">
                                            <app.icon className={`w-6 h-6 ${app.color}`} />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-base">{app.label}</h3>
                                            <div className="flex items-center gap-1 mt-1">
                                                <div className={`w-2 h-2 rounded-full ${app.connected ? 'bg-green-500' : 'bg-gray-400'}`} />
                                                <span className="text-xs text-muted-foreground capitalize">
                                                    {app.category}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    {app.connected && (
                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Settings className="w-4 h-4" />
                                        </Button>
                                    )}
                                </div>

                                <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
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
                                                <X className="w-3 h-3 mr-2" />
                                                Disconnect
                                            </>
                                        ) : (
                                            <>
                                                <Plus className="w-3 h-3 mr-2" />
                                                Connect
                                            </>
                                        )}
                                    </Button>
                                    {app.connected && (
                                        <Button variant="ghost" size="sm" className="px-3">
                                            <ExternalLink className="w-3 h-3" />
                                        </Button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {filteredDakshaApps.length === 0 && filteredExternalApps.length === 0 && (
                <div className="text-center py-16">
                    <Grid3X3 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-medium mb-2">No apps found</h3>
                    <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
                </div>
            )}

            {/* Description */}
            <div className="bg-muted/20 rounded-lg p-4">
                <p className="text-sm text-muted-foreground">
                    Connect your favorite apps to Daksha AI agent to create a unified view of your digital life.
                    Your data stays secure and is only used to provide personalized insights and assistance.
                </p>
            </div>
        </div>
    )
}