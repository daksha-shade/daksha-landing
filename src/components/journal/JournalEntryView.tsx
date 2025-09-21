"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import { ArrowLeft, Edit3, Calendar, Clock, Heart, Tag, Share, Download, Trash2, MapPin, Cloud, BarChart3, Loader2, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

interface JournalEntry {
    id: string;
    title: string;
    content?: any; // JSON content from Tiptap
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

interface JournalEntryViewProps {
    id: string;
    initialMode?: string;
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

const formatFullDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

const fetcher = (url: string): Promise<{ entry: JournalEntry }> => fetch(url).then((res) => res.json());

// Helper function to render rich content from JSON
const renderContent = (content: any, plainTextContent?: string) => {
    if (!content && !plainTextContent) return <p className="text-muted-foreground italic">No content</p>;

    // If we have plainTextContent, use it for display (it's more reliable)
    if (plainTextContent) {
        return plainTextContent.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4 leading-relaxed">
                {paragraph || '\u00A0'} {/* Non-breaking space for empty lines */}
            </p>
        ));
    }

    // Fallback to content if no plainTextContent
    if (typeof content === 'string') {
        return content.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4 leading-relaxed">
                {paragraph || '\u00A0'}
            </p>
        ));
    }

    return <p className="text-muted-foreground italic">Content format not supported</p>;
};

export function JournalEntryView({ id, initialMode }: JournalEntryViewProps) {
    const router = useRouter();

    const { data, error, isLoading, mutate } = useSWR<{ entry: JournalEntry }>(
        `/api/journal/${id}`,
        fetcher
    );

    const entry = data?.entry;



    const handleDelete = async () => {
        if (!entry || !confirm('Are you sure you want to delete this journal entry?')) return;

        try {
            const response = await fetch(`/api/journal/${entry.id}`, { method: 'DELETE' });
            if (response.ok) {
                toast.success('Journal entry deleted');
                router.push('/journal');
            } else {
                toast.error('Failed to delete entry');
            }
        } catch (error) {
            console.error('Delete failed:', error);
            toast.error('Failed to delete entry');
        }
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: entry?.title,
                    text: entry?.plainTextContent?.slice(0, 100) + '...',
                    url: window.location.href,
                });
            } catch (error) {
                // User cancelled sharing
            }
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(window.location.href);
            toast.success('Link copied to clipboard');
        }
    };



    if (isLoading) {
        return (
            <div className="container mx-auto p-6">
                <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin mr-2" />
                    <span>Loading journal entry...</span>
                </div>
            </div>
        );
    }

    if (error || !entry) {
        return (
            <div className="container mx-auto p-6">
                <Card>
                    <CardContent className="p-8 text-center">
                        <h2 className="text-xl font-semibold mb-2">Entry not found</h2>
                        <p className="text-muted-foreground mb-4">
                            The journal entry you're looking for doesn't exist.
                        </p>
                        <Button onClick={() => router.push('/journal')}>
                            Back to Journal
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Mobile-first Header */}
            <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
                <div className="container mx-auto px-4 py-3">
                    <div className="flex items-center justify-between">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => router.push('/journal')}
                            className="gap-2"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            <span className="hidden sm:inline">Back</span>
                        </Button>

                        <div className="flex items-center gap-2">
                            {/* Desktop Actions */}
                            <div className="hidden sm:flex items-center gap-2">
                                <Button variant="outline" size="sm" onClick={handleShare} className="gap-2">
                                    <Share className="h-4 w-4" />
                                    <span className="hidden md:inline">Share</span>
                                </Button>
                                <Button variant="outline" size="sm" onClick={handleDelete} className="gap-2 text-destructive hover:text-destructive">
                                    <Trash2 className="h-4 w-4" />
                                    <span className="hidden md:inline">Delete</span>
                                </Button>
                            </div>

                            <Button onClick={() => router.push(`/journal/${id}/edit`)} size="sm" className="gap-2">
                                <Edit3 className="h-4 w-4" />
                                <span className="hidden sm:inline">Edit</span>
                            </Button>

                            {/* Mobile Menu */}
                            <div className="sm:hidden">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="sm">
                                            <MoreVertical className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem onClick={handleShare}>
                                            <Share className="h-4 w-4 mr-2" />
                                            Share
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={handleDelete} className="text-destructive">
                                            <Trash2 className="h-4 w-4 mr-2" />
                                            Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-6">
                <div className="max-w-4xl mx-auto space-y-6">
                    {/* Title & Metadata */}
                    <div className="space-y-4">
                        <h1 className="text-2xl sm:text-3xl font-bold leading-tight">{entry.title}</h1>

                        {/* Metadata Row */}
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <span>{formatFullDate(entry.entryDate)}</span>
                            </div>

                            {entry.mood && (
                                <div className="flex items-center gap-2">
                                    <span className={`w-3 h-3 rounded-full ${getMoodColor(entry.mood)}`} />
                                    <span className="capitalize">{entry.mood}</span>
                                    {entry.moodIntensity && <span className="text-xs">({entry.moodIntensity}/10)</span>}
                                </div>
                            )}

                            {entry.location && (
                                <div className="flex items-center gap-1">
                                    <MapPin className="h-4 w-4" />
                                    <span>{entry.location}</span>
                                </div>
                            )}

                            {entry.weather && (
                                <div className="flex items-center gap-1">
                                    <Cloud className="h-4 w-4" />
                                    <span>{entry.weather}</span>
                                </div>
                            )}
                        </div>

                        {/* Tags */}
                        {entry.tags && entry.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {entry.tags.map((tag, index) => (
                                    <Badge key={index} variant="secondary" className="text-xs">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        )}

                        {/* Emotional Tags */}
                        {entry.emotionalTags && entry.emotionalTags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {entry.emotionalTags.map((tag, index) => (
                                    <Badge key={index} variant="outline" className="text-xs">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Main Content */}
                    <Card className="border-none shadow-sm">
                        <CardContent className="p-6 sm:p-8">
                            <div className="prose prose-sm sm:prose-base max-w-none">
                                {renderContent(entry.content, entry.plainTextContent)}
                            </div>
                        </CardContent>
                    </Card>

                    {/* AI Analysis */}
                    {(entry.aiSummary || entry.aiSentiment || (entry.aiInsights && entry.aiInsights.length > 0)) && (
                        <Card className="border-none shadow-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <BarChart3 className="h-5 w-5" />
                                    AI Insights
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {entry.aiSummary && (
                                    <div>
                                        <h4 className="font-medium text-sm uppercase tracking-wide text-muted-foreground mb-3">Summary</h4>
                                        <div className="prose prose-sm max-w-none">
                                            <div dangerouslySetInnerHTML={{ __html: entry.aiSummary }} />
                                        </div>
                                    </div>
                                )}

                                {entry.aiSentiment && (
                                    <div>
                                        <h4 className="font-medium text-sm uppercase tracking-wide text-muted-foreground mb-3">Sentiment Analysis</h4>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm">Overall Sentiment</span>
                                                    <Badge variant="outline" className="capitalize">
                                                        {entry.aiSentiment.overall}
                                                    </Badge>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm">Confidence</span>
                                                    <span className="text-sm font-medium">
                                                        {Math.round(entry.aiSentiment.confidence * 100)}%
                                                    </span>
                                                </div>
                                            </div>

                                            {entry.aiSentiment.emotions && entry.aiSentiment.emotions.length > 0 && (
                                                <div>
                                                    <span className="text-sm font-medium mb-2 block">Top Emotions</span>
                                                    <div className="space-y-1">
                                                        {entry.aiSentiment.emotions.slice(0, 4).map((emotion, index) => (
                                                            <div key={index} className="flex items-center justify-between text-sm">
                                                                <span className="capitalize">{emotion.emotion}</span>
                                                                <span className="text-muted-foreground">{Math.round(emotion.intensity * 100)}%</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {entry.aiInsights && entry.aiInsights.length > 0 && (
                                    <div>
                                        <h4 className="font-medium text-sm uppercase tracking-wide text-muted-foreground mb-3">Key Insights</h4>
                                        <ul className="space-y-3">
                                            {entry.aiInsights.map((insight, index) => (
                                                <li key={index} className="flex items-start gap-3">
                                                    <span className="text-primary mt-2 w-1.5 h-1.5 rounded-full bg-current flex-shrink-0"></span>
                                                    <span className="text-sm leading-relaxed">{insight}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}