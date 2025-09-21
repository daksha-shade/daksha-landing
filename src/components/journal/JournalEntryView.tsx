"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import { ArrowLeft, Edit3, Save, Calendar, Clock, Heart, Tag, Share, Download, Trash2, Play, Mic, Video, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { TiptapEditor } from './TiptapEditor';
import { toast } from 'sonner';

interface JournalEntry {
    id: string;
    title: string;
    content?: string;
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

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function JournalEntryView({ id, initialMode }: JournalEntryViewProps) {
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(initialMode === 'edit');
    const [editedTitle, setEditedTitle] = useState('');
    const [editedContent, setEditedContent] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    const { data, error, isLoading, mutate } = useSWR<{ entry: JournalEntry }>(
        `/api/journal/${id}`,
        fetcher,
        {
            onSuccess: (data) => {
                if (data.entry) {
                    setEditedTitle(data.entry.title);
                    setEditedContent(data.entry.plainTextContent || data.entry.content || '');
                }
            }
        }
    );

    const entry = data?.entry;

    const handleSave = async () => {
        if (!entry) return;

        setIsSaving(true);
        try {
            const response = await fetch(`/api/journal/${entry.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: editedTitle,
                    plainTextContent: editedContent,
                    content: editedContent,
                    regenerateAI: true
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update journal entry');
            }

            toast.success('Journal entry updated successfully!');
            setIsEditing(false);
            mutate(); // Refresh data
        } catch (error) {
            console.error('Save failed:', error);
            toast.error('Failed to save changes. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleCancel = () => {
        if (entry) {
            setEditedTitle(entry.title);
            setEditedContent(entry.plainTextContent || entry.content || '');
        }
        setIsEditing(false);
    };

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

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'text': return <Edit3 className="h-4 w-4" />;
            case 'audio': return <Mic className="h-4 w-4" />;
            case 'video': return <Video className="h-4 w-4" />;
            default: return <Edit3 className="h-4 w-4" />;
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
        <div className="min-h-screen">
            <div className="container mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => router.push('/journal')}
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back
                        </Button>
                        <Separator orientation="vertical" className="h-6" />
                        <div className="flex items-center gap-2">
                            <Edit3 className="h-5 w-5 text-primary" />
                            <span className="font-medium">Journal Entry</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        {isEditing ? (
                            <>
                                <Button variant="outline" onClick={handleCancel}>
                                    Cancel
                                </Button>
                                <Button onClick={handleSave} disabled={isSaving}>
                                    {isSaving ? (
                                        <>
                                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="h-4 w-4 mr-2" />
                                            Save
                                        </>
                                    )}
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button variant="outline" size="sm">
                                    <Share className="h-4 w-4 mr-2" />
                                    Share
                                </Button>
                                <Button variant="outline" size="sm">
                                    <Download className="h-4 w-4 mr-2" />
                                    Export
                                </Button>
                                <Button variant="outline" size="sm" onClick={handleDelete} className="text-destructive">
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete
                                </Button>
                                <Button onClick={() => setIsEditing(true)}>
                                    <Edit3 className="h-4 w-4 mr-2" />
                                    Edit
                                </Button>
                            </>
                        )}
                    </div>
                </div>

                {/* Entry Content */}
                <div className="space-y-6">
                    {/* Title */}
                    <Card className='border-none shadow-none bg-accent'>
                        <CardContent className="py-4">
                            {isEditing ? (
                                <Input
                                    value={editedTitle}
                                    onChange={(e) => setEditedTitle(e.target.value)}
                                    className="text-2xl font-bold border-none p-0 focus-visible:ring-0 shadow-none bg-transparent"
                                    placeholder="Entry title..."
                                />
                            ) : (
                                <h1 className="text-2xl font-bold">{entry.title}</h1>
                            )}

                            {/* Metadata */}
                            <div className="flex flex-wrap items-center gap-6 mt-2 mb-2 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    <Calendar className="h-4 w-4" />
                                    <span>{formatFullDate(entry.entryDate)}</span>
                                </div>

                                <div className="flex items-center gap-1">
                                    {getTypeIcon(entry.type)}
                                    <span className="capitalize">{entry.type}{entry.duration && ` (${formatDuration(entry.duration)})`}</span>
                                </div>

                                {entry.mood && (
                                    <div className="flex items-center gap-1">
                                        <span className={`w-3 h-3 rounded-full ${getMoodColor(entry.mood)}`} />
                                        <span className="capitalize">{entry.mood}</span>
                                        {entry.moodIntensity && <span>({entry.moodIntensity}/10)</span>}
                                    </div>
                                )}

                                {entry.tags && entry.tags.length > 0 && (
                                    <div className="flex items-center gap-1">
                                        <Tag className="h-4 w-4" />
                                        <div className="flex flex-wrap gap-1">
                                            {entry.tags.map((tag, index) => (
                                                <Badge key={index} variant="secondary" className="text-xs">
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Main Content */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Edit3 className="h-5 w-5" />
                                Content
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {isEditing ? (
                                entry.type === 'text' ? (
                                    <TiptapEditor
                                        content={editedContent}
                                        onChange={(content, plainText) => setEditedContent(plainText)}
                                        placeholder="Write your thoughts..."
                                        className="border-none shadow-none"
                                    />
                                ) : (
                                    <Textarea
                                        value={editedContent}
                                        onChange={(e) => setEditedContent(e.target.value)}
                                        className="min-h-[400px] resize-none border-none p-0 focus-visible:ring-0 shadow-none"
                                        placeholder="Edit your content..."
                                    />
                                )
                            ) : (
                                <div className="prose prose-sm max-w-none">
                                    {(entry.plainTextContent || entry.content || entry.transcript || "No content").split('\n').map((paragraph, index) => (
                                        <p key={index} className="mb-4 leading-relaxed">
                                            {paragraph}
                                        </p>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Audio/Video Player */}
                    {(entry.type === 'audio' || entry.type === 'video') && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Clock className="h-5 w-5" />
                                    {entry.type === 'audio' ? 'Audio Recording' : 'Video Recording'}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="bg-muted rounded-lg p-8 text-center">
                                    <div className="flex items-center justify-center gap-4 mb-4">
                                        <Button variant="outline" size="sm">
                                            <Play className="h-4 w-4 mr-2" />
                                            Play
                                        </Button>
                                        {entry.duration && (
                                            <span className="text-sm text-muted-foreground">
                                                Duration: {formatDuration(entry.duration)}
                                            </span>
                                        )}
                                    </div>
                                    <div className="w-full bg-border rounded-full h-2">
                                        <div className="bg-primary h-2 rounded-full w-0"></div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* AI Insights */}
                    {entry.aiSummary && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Heart className="h-5 w-5" />
                                    AI Insights
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <h4 className="font-medium mb-2">Summary</h4>
                                    <p className="text-sm text-muted-foreground">{entry.aiSummary}</p>
                                </div>

                                {entry.aiInsights && entry.aiInsights.length > 0 && (
                                    <div>
                                        <h4 className="font-medium mb-2">Key Insights</h4>
                                        <ul className="space-y-1">
                                            {entry.aiInsights.map((insight, index) => (
                                                <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                                                    <span className="text-primary">•</span>
                                                    {insight}
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