'use client';

import * as React from 'react';
import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import { Plate, usePlateEditor } from 'platejs/react';
import { serializeMd } from '@platejs/markdown';
import { ArrowLeft, Edit3, Share, Trash2, MapPin, Cloud, BarChart3, Loader2, MoreVertical, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Editor, EditorContainer } from '@/components/ui/editor';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { EditorKit } from '@/components/editor/editor-kit';
import { MoodSelector } from './MoodSelector';
import { TagInput } from './TagInput';
import { toast } from 'sonner';

interface JournalEntry {
    id: string;
    title: string;
    content?: any; // Plate.js JSON content
    markdownContent?: string;
    type: "text" | "audio" | "video";
    mood?: string;
    moodIntensity?: number;
    emotionalTags?: string[];
    tags?: string[];
    location?: string;
    weather?: string;
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

interface PlateJournalViewProps {
    id: string;
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

export function PlateJournalView({ id }: PlateJournalViewProps) {
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [editData, setEditData] = useState<Partial<JournalEntry>>({});
    const [editorKey, setEditorKey] = useState(0);

    const { data, error, isLoading, mutate } = useSWR<{ entry: JournalEntry }>(
        `/api/journal/${id}`,
        fetcher
    );

    const entry = data?.entry;

    const editor = usePlateEditor({
        plugins: EditorKit,
        value: entry?.content || [{ children: [{ text: '' }], type: 'p' }],
    });

    const handleEdit = () => {
        if (entry) {
            setEditData({
                title: entry.title,
                mood: entry.mood,
                moodIntensity: entry.moodIntensity,
                emotionalTags: entry.emotionalTags || [],
                tags: entry.tags || [],
                location: entry.location || '',
                weather: entry.weather || '',
            });
            // Force editor re-render with new content
            setEditorKey(prev => prev + 1);
            setIsEditing(true);
        }
    };

    const handleSave = async () => {
        if (!entry) return;

        setIsSaving(true);
        try {
            const content = editor.children;
            const markdownContent = serializeMd(editor, { nodes: content });

            const response = await fetch(`/api/journal/${entry.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: editData.title,
                    content,
                    markdownContent,
                    mood: editData.mood,
                    moodIntensity: editData.moodIntensity,
                    emotionalTags: editData.emotionalTags,
                    tags: editData.tags,
                    location: editData.location,
                    weather: editData.weather,
                    regenerateAI: false,
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
        setIsEditing(false);
        setEditData({});
        // Force editor re-render with original content
        setEditorKey(prev => prev + 1);
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

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: entry?.title,
                    text: entry?.markdownContent?.slice(0, 100) + '...',
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
            {/* Header */}
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
                            {isEditing ? (
                                <>
                                    <Button variant="outline" size="sm" onClick={handleCancel}>
                                        <X className="h-4 w-4 mr-2" />
                                        Cancel
                                    </Button>
                                    <Button onClick={handleSave} disabled={isSaving} size="sm">
                                        {isSaving ? (
                                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                        ) : (
                                            <Save className="h-4 w-4 mr-2" />
                                        )}
                                        Save
                                    </Button>
                                </>
                            ) : (
                                <>
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

                                    <Button onClick={handleEdit} size="sm" className="gap-2">
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
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-3 space-y-6">
                        {/* Title */}
                        <div className="space-y-4">
                            {isEditing ? (
                                <Input
                                    value={editData.title || ''}
                                    onChange={(e) => setEditData(prev => ({ ...prev, title: e.target.value }))}
                                    className="text-2xl sm:text-3xl font-bold border-none p-0 focus-visible:ring-0 shadow-none bg-transparent h-auto"
                                    placeholder="Entry title..."
                                />
                            ) : (
                                <h1 className="text-2xl sm:text-3xl font-bold leading-tight cursor-pointer hover:bg-muted/50 rounded p-2 -m-2 transition-colors" onClick={handleEdit}>
                                    {entry.title}
                                </h1>
                            )}

                            {/* Metadata Row */}
                            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
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

                        {/* Content */}
                        <Card className="border-none shadow-sm">
                            <CardContent className="p-6 sm:p-8">
                                {isEditing ? (
                                    <Plate key={`edit-${editorKey}`} editor={editor}>
                                        <EditorContainer>
                                            <Editor
                                                variant="demo"
                                                className="min-h-[400px] p-4 border rounded-lg focus-within:ring-2 focus-within:ring-primary focus-within:border-primary"
                                            />
                                        </EditorContainer>
                                    </Plate>
                                ) : (
                                    <div
                                        className="min-h-[200px] cursor-pointer hover:bg-muted/20 rounded p-4 -m-4 transition-colors"
                                        onClick={handleEdit}
                                    >
                                        <Plate key={`view-${editorKey}`} editor={editor}>
                                            <EditorContainer>
                                                <Editor
                                                    variant="demo"
                                                    readOnly
                                                    className="prose prose-sm sm:prose-base lg:prose-lg max-w-none"
                                                />
                                            </EditorContainer>
                                        </Plate>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-4">
                        {isEditing && (
                            <>
                                {/* Mood & Emotions */}
                                <Card className="border-none shadow-sm">
                                    <CardContent className="p-4">
                                        <MoodSelector
                                            mood={editData.mood}
                                            moodIntensity={editData.moodIntensity}
                                            emotionalTags={editData.emotionalTags}
                                            onChange={(mood, intensity, emotions) =>
                                                setEditData(prev => ({
                                                    ...prev,
                                                    mood,
                                                    moodIntensity: intensity,
                                                    emotionalTags: emotions || []
                                                }))
                                            }
                                        />
                                    </CardContent>
                                </Card>

                                {/* Tags */}
                                <Card className="border-none shadow-sm">
                                    <CardContent className="p-4">
                                        <TagInput
                                            tags={editData.tags || []}
                                            onChange={(tags) => setEditData(prev => ({ ...prev, tags }))}
                                        />
                                    </CardContent>
                                </Card>

                                {/* Context */}
                                <Card className="border-none shadow-sm">
                                    <CardHeader className="pb-3">
                                        <CardTitle className="text-sm font-medium">Context</CardTitle>
                                    </CardHeader>
                                    <CardContent className="pt-0 space-y-3">
                                        <div className="relative">
                                            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                placeholder="Location"
                                                value={editData.location || ''}
                                                onChange={(e) => setEditData(prev => ({ ...prev, location: e.target.value }))}
                                                className="pl-10 h-9"
                                            />
                                        </div>
                                        <div className="relative">
                                            <Cloud className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                placeholder="Weather"
                                                value={editData.weather || ''}
                                                onChange={(e) => setEditData(prev => ({ ...prev, weather: e.target.value }))}
                                                className="pl-10 h-9"
                                            />
                                        </div>
                                    </CardContent>
                                </Card>
                            </>
                        )}

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
        </div>
    );
}