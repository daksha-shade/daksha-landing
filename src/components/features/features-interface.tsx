"use client"

import { useState } from 'react'
import {
    CheckCircle,
    Clock,
    HelpCircle,
    Filter,
    Search,
    LayoutDashboard,
    BookOpen,
    MessageCircle,
    Brain,
    StickyNote,
    Calendar,
    PenTool,
    Target,
    Grid3X3,
    Mic,
    Edit3,
    TrendingUp,
    Timer,
    Zap,
    GitBranch,
    Network,
    Link,
    BarChart3,
    Users,
    Globe,
    GraduationCap,
    Shuffle,
    Focus,
    AlertTriangle,
    Smartphone,
    WifiOff,
    Volume2,
    Bell,
    Milestone,
    Sparkles,
    CalendarDays,
    Activity,
    Mail,
    MessageSquare,
    Palette,
    Settings,
    PartyPopper,
    Download,
    Shield,
    HardDrive,
    FileText
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import featuresData from '@/data/features.json'

// Icon mapping
const iconMap = {
    LayoutDashboard,
    BookOpen,
    MessageCircle,
    Brain,
    StickyNote,
    Calendar,
    PenTool,
    Target,
    Grid3X3,
    Mic,
    Edit3,
    TrendingUp,
    CheckCircle,
    FileText,
    Timer,
    Zap,
    GitBranch,
    Network,
    Link,
    BarChart3,
    Users,
    Globe,
    GraduationCap,
    Shuffle,
    Focus,
    AlertTriangle,
    Smartphone,
    WifiOff,
    Volume2,
    Bell,
    Milestone,
    Sparkles,
    CalendarDays,
    Activity,
    Mail,
    MessageSquare,
    Palette,
    Settings,
    PartyPopper,
    Download,
    Shield,
    HardDrive
}

interface Feature {
    id: string
    name: string
    description: string
    category: string
    status: 'implemented' | 'planned' | 'maybe'
    icon: string
    priority: 'low' | 'medium' | 'high'
    version?: string
    estimatedVersion?: string
    dependencies?: string[]
}

const statusConfig = {
    implemented: {
        label: 'Implemented',
        icon: CheckCircle,
        color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
        borderColor: 'border-green-200 dark:border-green-800'
    },
    planned: {
        label: 'Planned',
        icon: Clock,
        color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
        borderColor: 'border-blue-200 dark:border-blue-800'
    },
    maybe: {
        label: 'Maybe',
        icon: HelpCircle,
        color: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300',
        borderColor: 'border-gray-200 dark:border-gray-800'
    }
}

const priorityConfig = {
    high: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
    medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
    low: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
}

const categoryColors = {
    core: 'bg-blue-50 border-blue-200 dark:bg-blue-950/20 dark:border-blue-800',
    ai: 'bg-purple-50 border-purple-200 dark:bg-purple-950/20 dark:border-purple-800',
    productivity: 'bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-800',
    intelligence: 'bg-orange-50 border-orange-200 dark:bg-orange-950/20 dark:border-orange-800',
    social: 'bg-pink-50 border-pink-200 dark:bg-pink-950/20 dark:border-pink-800',
    integration: 'bg-indigo-50 border-indigo-200 dark:bg-indigo-950/20 dark:border-indigo-800',
    accessibility: 'bg-cyan-50 border-cyan-200 dark:bg-cyan-950/20 dark:border-cyan-800',
    mobile: 'bg-emerald-50 border-emerald-200 dark:bg-emerald-950/20 dark:border-emerald-800',
    personalization: 'bg-amber-50 border-amber-200 dark:bg-amber-950/20 dark:border-amber-800',
    privacy: 'bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-800'
}

export function FeaturesInterface() {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [selectedPriority, setSelectedPriority] = useState('all')

    // Combine all features
    const allFeatures: Feature[] = [
        ...featuresData.currentFeatures.map((f: any) => ({
            ...f,
            status: 'implemented' as 'implemented',
            priority: f.priority as 'low' | 'medium' | 'high'
        })),
        ...featuresData.plannedFeatures.map((f: any) => ({
            ...f,
            status: 'planned' as 'planned',
            priority: f.priority as 'low' | 'medium' | 'high'
        })),
        ...featuresData.maybeFeatures.map((f: any) => ({
            ...f,
            status: 'maybe' as 'maybe',
            priority: f.priority as 'low' | 'medium' | 'high'
        }))
    ]

    // Filter features
    const filteredFeatures = allFeatures.filter(feature => {
        const matchesSearch = feature.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            feature.description.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesCategory = selectedCategory === 'all' || feature.category === selectedCategory
        const matchesPriority = selectedPriority === 'all' || feature.priority === selectedPriority

        return matchesSearch && matchesCategory && matchesPriority
    })

    // Group features by status
    const featuresByStatus = {
        implemented: filteredFeatures.filter(f => f.status === 'implemented'),
        planned: filteredFeatures.filter(f => f.status === 'planned'),
        maybe: filteredFeatures.filter(f => f.status === 'maybe')
    }

    // Statistics
    const stats = {
        total: allFeatures.length,
        implemented: featuresData.currentFeatures.length,
        planned: featuresData.plannedFeatures.length,
        maybe: featuresData.maybeFeatures.length
    }

    const FeatureCard = ({ feature }: { feature: Feature }) => {
        const IconComponent = iconMap[feature.icon as keyof typeof iconMap]
        const statusInfo = statusConfig[feature.status]
        const categoryInfo = featuresData.categories[feature.category as keyof typeof featuresData.categories]

        return (
            <Card className={`transition-all hover:shadow-md ${categoryColors[feature.category as keyof typeof categoryColors]}`}>
                <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                            {IconComponent && (
                                <div className="p-2 rounded-lg bg-white/50 dark:bg-black/20">
                                    <IconComponent className="w-5 h-5" />
                                </div>
                            )}
                            <div>
                                <CardTitle className="text-base font-medium">{feature.name}</CardTitle>
                                <p className="text-sm text-muted-foreground mt-1">{categoryInfo?.name}</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 items-end">
                            <Badge className={statusInfo.color}>
                                <statusInfo.icon className="w-3 h-3 mr-1" />
                                {statusInfo.label}
                            </Badge>
                            <Badge variant="outline" className={priorityConfig[feature.priority]}>
                                {feature.priority}
                            </Badge>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground mb-3">{feature.description}</p>

                    <div className="flex flex-wrap gap-2 items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                            {feature.version && (
                                <Badge variant="outline" className="text-xs">
                                    v{feature.version}
                                </Badge>
                            )}
                            {feature.estimatedVersion && (
                                <Badge variant="outline" className="text-xs">
                                    Est. v{feature.estimatedVersion}
                                </Badge>
                            )}
                        </div>

                        {feature.dependencies && feature.dependencies.length > 0 && (
                            <div className="text-xs text-muted-foreground">
                                Depends on: {feature.dependencies.join(', ')}
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        )
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="notion-title font-serif">Features Roadmap</h1>
                        <p className="text-muted-foreground mt-2">
                            Complete overview of Daksha's features - current, planned, and potential future additions
                        </p>
                    </div>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card>
                        <CardContent className="p-4 text-center">
                            <div className="text-2xl font-bold text-green-600">{stats.implemented}</div>
                            <div className="text-sm text-muted-foreground">Implemented</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4 text-center">
                            <div className="text-2xl font-bold text-blue-600">{stats.planned}</div>
                            <div className="text-sm text-muted-foreground">Planned</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4 text-center">
                            <div className="text-2xl font-bold text-gray-600">{stats.maybe}</div>
                            <div className="text-sm text-muted-foreground">Maybe</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4 text-center">
                            <div className="text-2xl font-bold">{stats.total}</div>
                            <div className="text-sm text-muted-foreground">Total</div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="Search features..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                    />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-full sm:w-48">
                        <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {Object.entries(featuresData.categories).map(([key, category]) => (
                            <SelectItem key={key} value={key}>{category.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                    <SelectTrigger className="w-full sm:w-32">
                        <SelectValue placeholder="Priority" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Features by Status */}
            <Tabs defaultValue="all" className="space-y-6">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="all">All Features</TabsTrigger>
                    <TabsTrigger value="implemented">Implemented</TabsTrigger>
                    <TabsTrigger value="planned">Planned</TabsTrigger>
                    <TabsTrigger value="maybe">Maybe</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-8">
                    {Object.entries(featuresByStatus).map(([status, features]) => (
                        features.length > 0 && (
                            <div key={status} className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <h2 className="text-xl font-semibold capitalize">{status} Features</h2>
                                    <Badge variant="outline">{features.length}</Badge>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {features.map((feature) => (
                                        <FeatureCard key={feature.id} feature={feature} />
                                    ))}
                                </div>
                            </div>
                        )
                    ))}
                </TabsContent>

                <TabsContent value="implemented" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {featuresByStatus.implemented.map((feature) => (
                            <FeatureCard key={feature.id} feature={feature} />
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="planned" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {featuresByStatus.planned.map((feature) => (
                            <FeatureCard key={feature.id} feature={feature} />
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="maybe" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {featuresByStatus.maybe.map((feature) => (
                            <FeatureCard key={feature.id} feature={feature} />
                        ))}
                    </div>
                </TabsContent>
            </Tabs>

            {/* Legend */}
            <Card className="bg-muted/30">
                <CardHeader>
                    <CardTitle className="text-lg">Legend</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <h4 className="font-medium">Status</h4>
                            <div className="space-y-1 text-sm">
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                    <span>Implemented - Currently available</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-blue-600" />
                                    <span>Planned - In development roadmap</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <HelpCircle className="w-4 h-4 text-gray-600" />
                                    <span>Maybe - Under consideration</span>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <h4 className="font-medium">Priority</h4>
                            <div className="space-y-1 text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                    <span>High - Critical features</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                    <span>Medium - Important features</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                    <span>Low - Nice to have</span>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <h4 className="font-medium">Categories</h4>
                            <div className="text-sm text-muted-foreground">
                                Features are grouped by functionality: Core, AI, Productivity, Analytics, Social, Integration, Accessibility, Mobile, Personalization, and Privacy.
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
