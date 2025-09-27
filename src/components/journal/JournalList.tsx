"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { Edit3, Search, Video, Mic, FileText, Grid, List, Plus, ChevronDown, Loader2, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

// Types for journal entries
interface JournalEntry {
    id: string;
    title: string;
    yooptaContent?: any;
    plainTextContent?: string;
    type: "text" | "audio" | "video";
    mood?: string;
    moodIntensity?: number;
    emotionalTags?: string[];
    tags?: string[];
    location?: string;
    weather?: string;
    audioUrl?: string;
    videoUrl?: string;
    imageUrls?: string[];
    duration?: number;
    transcript?: string;
    aiSummary?: string;
    aiInsights?: string[];
    aiSentiment?: {
        overall: string;
        confidence: number;
        emotions: Array<{ emotion: string; intensity: number }>;
    };
    entryDate: string;
    createdAt: string;
    updatedAt: string;
}

interface JournalResponse {
    entries: JournalEntry[];
    pagination: {
        total: number;
        limit: number;
        offset: number;
        hasMore: boolean;
    };
}

// Helper functions
const getMoodColor = (mood?: string) => {
    const colors: Record<string, string> = {
        happy: "bg-yellow-400",
        sad: "bg-blue-400",
        excited: "bg-orange-400",
        anxious: "bg-red-400",
        calm: "bg-green-400",
        grateful: "bg-purple-400",
        stressed: "bg-red-500",
        energized: "bg-orange-500",
        contemplative: "bg-indigo-400",
    };
    return colors[mood || ""] || "bg-gray-400";
};

const formatDuration = (seconds?: number) => {
    if (!seconds) return "";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffInHours < 24 * 7) {
        return date.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
    } else {
        return date.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
    }
};

const fetcher = (url: string): Promise<JournalResponse> => fetch(url).then((res) => res.json());

export function JournalList() {
    const router = useRouter();
    const [viewMode, setViewMode] = useState("timeline");
    const [filterType, setFilterType] = useState("all");
    const [displayedEntries, setDisplayedEntries] = useState(12);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [entryToDelete, setEntryToDelete] = useState<string | null>(null);

    // Build API URL with filters + semantic search
    const apiUrl = `/api/journal?${new URLSearchParams({
        limit: "50",
        offset: "0",
        ...(filterType !== "all" && { type: filterType }),
        ...(searchQuery.trim() && { q: searchQuery.trim() }),
    })}`;

    const { data, error, isLoading, mutate } = useSWR<JournalResponse>(apiUrl, fetcher);

    const journalEntries = data?.entries || [];

    // If server-side semantic search used (q present), skip client filtering
    const filteredEntries = searchQuery.trim()
        ? journalEntries
        : journalEntries.filter(entry => {
            if (searchQuery && !entry.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
                !entry.plainTextContent?.toLowerCase().includes(searchQuery.toLowerCase())) return false;
            return true;
        });

    const visibleEntries = filteredEntries.slice(0, displayedEntries);
    const hasMoreEntries = displayedEntries < filteredEntries.length;

    const loadMore = useCallback(() => {
        if (isLoadingMore || !hasMoreEntries) return;
        setIsLoadingMore(true);
        setTimeout(() => {
            setDisplayedEntries(prev => Math.min(prev + 6, filteredEntries.length));
            setIsLoadingMore(false);
        }, 300);
    }, [isLoadingMore, hasMoreEntries, filteredEntries.length]);

    const seedData = async () => {
        try {
            const response = await fetch("/api/journal/seed", { method: "POST" });
            if (response.ok) {
                toast.success("Sample journal entries loaded!");
                mutate(); // Refresh data
            } else {
                toast.error("Failed to load sample data");
            }
        } catch (error) {
            console.error("Error seeding data:", error);
            toast.error("Failed to load sample data");
        }
    };

    const deleteAndReseedData = async () => {
        if (!confirm("Are you sure you want to delete ALL journal entries and reseed with sample data? This cannot be undone.")) {
            return;
        }

        try {
            const response = await fetch("/api/journal/seed", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ deleteFirst: true })
            });
            if (response.ok) {
                toast.success("All journal data deleted and reseeded!");
                mutate(); // Refresh data
            } else {
                toast.error("Failed to delete and reseed data");
            }
        } catch (error) {
            console.error("Error deleting and reseeding data:", error);
            toast.error("Failed to delete and reseed data");
        }
    };

    const handleDeleteClick = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setEntryToDelete(id);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!entryToDelete) return;
        
        try {
            const response = await fetch(`/api/journal/${entryToDelete}`, { method: "DELETE" });
            if (response.ok) {
                toast.success("Journal entry deleted");
                mutate();
            } else {
                toast.error("Failed to delete entry");
            }
        } catch (error) {
            console.error("Error deleting entry:", error);
            toast.error("Failed to delete entry");
        } finally {
            setDeleteDialogOpen(false);
            setEntryToDelete(null);
        }
    };

    const handleDeleteCancel = () => {
        setDeleteDialogOpen(false);
        setEntryToDelete(null);
    };

    const stats = {
        total: journalEntries.length,
        thisWeek: journalEntries.filter(entry => {
            const entryDate = new Date(entry.entryDate);
            const weekAgo = new Date();
            weekAgo.setDate(weekAgo.getDate() - 7);
            return entryDate >= weekAgo;
        }).length
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case "text": return <FileText className="h-4 w-4" />;
            case "audio": return <Mic className="h-4 w-4" />;
            case "video": return <Video className="h-4 w-4" />;
            default: return <FileText className="h-4 w-4" />;
        }
    };

    if (error) {
        return (
            <div className="container mx-auto p-6">
                <Card>
                    <CardContent className="p-8 text-center">
                        <h2 className="text-xl font-semibold mb-2">Error Loading Journal</h2>
                        <p className="text-muted-foreground mb-4">Failed to load journal entries</p>
                        <Button onClick={() => mutate()}>Try Again</Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-6 space-y-6">
                {/* Header */}
                <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <Edit3 className="h-6 w-6 text-primary" />
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Journal</h1>
                                <p className="text-sm text-muted-foreground sm:hidden">
                                    Your personal space for thoughts and reflections
                                </p>
                            </div>
                        </div>
                        {/* Search */}
                        <div className="w-full sm:w-80">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search entries..."
                                    className="pl-9"
                                />
                            </div>
                        </div>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className="gap-2">
                                    <Plus className="h-4 w-4" />
                                    <span className="hidden sm:inline">New Entry</span>
                                    <span className="sm:hidden">New</span>
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md">
                                <DialogHeader>
                                    <DialogTitle>Create New Entry</DialogTitle>
                                </DialogHeader>
                                <div className="grid gap-3 py-4">
                                    <Button
                                        variant="outline"
                                        className="justify-start h-auto p-4"
                                        onClick={() => router.push('/journal/text')}
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
                                        onClick={() => router.push('/journal/audio')}
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
                                        onClick={() => router.push('/journal/video')}
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
                    <p className="text-muted-foreground hidden sm:block">
                        Your personal space for thoughts, memories, and reflections
                    </p>
                </div>

                {/* Filters & Search */}
                <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                        <div className="flex flex-col sm:flex-row gap-3 flex-1 w-full sm:w-auto">
                            <div className="relative flex-1 sm:max-w-sm">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search entries..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-9"
                                />
                            </div>

                            <Tabs value={filterType} onValueChange={(value) => setFilterType(value)} className="w-full sm:w-auto">
                                <TabsList className="grid w-full grid-cols-4 sm:w-auto">
                                    <TabsTrigger value="all">All</TabsTrigger>
                                    <TabsTrigger value="text">Text</TabsTrigger>
                                    <TabsTrigger value="audio">Audio</TabsTrigger>
                                    <TabsTrigger value="video">Video</TabsTrigger>
                                </TabsList>
                            </Tabs>
                        </div>

                        <div className="flex items-center justify-between w-full sm:w-auto gap-4">
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <span className="hidden sm:inline">
                                    <span className="font-semibold">{stats.total}</span> Total
                                </span>
                                <span className="hidden sm:inline">·</span>
                                <span>
                                    <span className="font-semibold">{stats.thisWeek}</span> This Week
                                </span>
                                <span className="hidden sm:inline">·</span>
                                <span className="hidden sm:inline">
                                    <span className="font-semibold">{filteredEntries.length}</span> Showing
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
                </div>

                {isLoading ? (
                    <>
                        <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-3"}>
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="border rounded-lg p-4 animate-pulse">
                                    <div className="h-5 w-1/2 bg-muted rounded mb-3" />
                                    <div className="space-y-2">
                                        <div className="h-3 bg-muted rounded" />
                                        <div className="h-3 bg-muted rounded w-5/6" />
                                        <div className="h-3 bg-muted rounded w-2/3" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <>
                        <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-3"}>
                            {visibleEntries.map((entry) => (
                                <Card
                                    key={entry.id}
                                    className="group cursor-pointer hover:shadow-md transition-shadow"
                                    onClick={() => router.push(`/journal/${entry.id}`)}
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
                                                            {formatDate(entry.entryDate)}
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
                                                        e.stopPropagation();
                                                        router.push(`/journal/${entry.id}?mode=edit`);
                                                    }}>
                                                        Edit
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                                                        Share
                                                    </DropdownMenuItem>
                                                    <Separator />
                                                    <DropdownMenuItem 
                                                        className="text-destructive" 
                                                        onClick={(e) => handleDeleteClick(entry.id, e)}
                                                    >
                                                        Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </CardHeader>

                                    <CardContent className="pt-0">
                                        <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                                            {entry.plainTextContent || entry.transcript || "No content"}
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
                                    disabled={isLoadingMore}
                                    variant="outline"
                                >
                                    {isLoadingMore ? (
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

                        {filteredEntries.length === 0 && !isLoading && (
                            <Card>
                                <CardContent className="p-12 text-center">
                                    <Edit3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                    <h3 className="text-lg font-semibold mb-2">No entries found</h3>
                                    <p className="text-muted-foreground text-sm mb-4">
                                        {searchQuery || filterType !== "all"
                                            ? "Try adjusting your search or filters"
                                            : journalEntries.length === 0
                                                ? "Start your journaling journey by creating your first entry"
                                                : "No entries match your current filters"
                                        }
                                    </p>
                                    {journalEntries.length > 0 && (
                                        <div className="flex gap-2 justify-center">
                                            <Button onClick={deleteAndReseedData} variant="outline" className="mt-2 text-destructive hover:text-destructive">
                                                Delete All & Reseed
                                            </Button>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        )}
                    </>
                )}
            </div>

            <AlertDialog open={deleteDialogOpen} onOpenChange={(open) => {
                setDeleteDialogOpen(open);
                if (!open) setEntryToDelete(null);
            }}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete journal entry?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your entry.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteCancel();
                        }}>Cancel</AlertDialogCancel>
                        <AlertDialogAction 
                            className="bg-destructive hover:bg-destructive/90" 
                            onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteConfirm();
                            }}
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}