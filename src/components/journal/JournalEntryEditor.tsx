"use client";

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import { ArrowLeft, Save, Loader2, Sparkles, BarChart3, MapPin, Cloud } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TiptapEditor } from './TiptapEditor';
import { MoodSelector } from './MoodSelector';
import { TagInput } from './TagInput';
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

interface JournalEntryEditorProps {
    id: string;
}

const fetcher = (url: string): Promise<{ entry: JournalEntry }> => fetch(url).then((res) => res.json());

export function JournalEntryEditor({ id }: JournalEntryEditorProps) {
    const router = useRouter();
    const [isSaving, setIsSaving] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const [editData, setEditData] = useState({
        title: '',
        content: null as any,
        plainTextContent: '',
        mood: undefined as string | undefined,
        moodIntensity: undefined as number | undefined,
        emotionalTags: [] as string[],
        tags: [] as string[],
        location: '',
        weather: '',
    });

    const { data, error, isLoading, mutate } = useSWR<{ entry: JournalEntry }>(
        `/api/journal/${id}`,
        fetcher,
        {
            onSuccess: (data) => {
                if (data.entry) {
                    // Handle content - if it's JSON, convert to HTML for editing
                    let editorContent = '';
                    if (data.entry.content) {
                        try {
                            // If content is stored as JSON, we need to set it properly
                            if (typeof data.entry.content === 'object') {
                                editorContent = data.entry.content;
                            } else if (typeof data.entry.content === 'string') {
                                // Try to parse as JSON first
                                try {
                                    editorContent = JSON.parse(data.entry.content);
                                } catch {
                                    // If not JSON, use as HTML/text
                                    editorContent = data.entry.content;
                                }
                            }
                        } catch (error) {
                            console.error('Error processing content:', error);
                            editorContent = data.entry.plainTextContent || '';
                        }
                    }

                    setEditData({
                        title: data.entry.title,
                        content: editorContent,
                        plainTextContent: data.entry.plainTextContent || '',
                        mood: data.entry.mood,
                        moodIntensity: data.entry.moodIntensity,
                        emotionalTags: data.entry.emotionalTags || [],
                        tags: data.entry.tags || [],
                        location: data.entry.location || '',
                        weather: data.entry.weather || '',
                    });
                }
            }
        }
    );

    const entry = data?.entry;

    const handleContentChange = useCallback((content: string, plainText: string) => {
        try {
            // Ensure we're storing proper JSON object, not string
            const contentObj = typeof content === 'string' ? JSON.parse(content) : content;
            setEditData(prev => ({
                ...prev,
                content: contentObj,
                plainTextContent: plainText
            }));
        } catch (error) {
            console.error('Error parsing content JSON:', error);
            // Fallback to storing as-is if JSON parsing fails
            setEditData(prev => ({
                ...prev,
                content: content,
                plainTextContent: plainText
            }));
        }
    }, []);

    const handleSave = async () => {
        if (!entry) return;

        setIsSaving(true);
        try {
            const response = await fetch(`/api/journal/${entry.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: editData.title,
                    content: editData.content, // JSON content
                    plainTextContent: editData.plainTextContent,
                    mood: editData.mood,
                    moodIntensity: editData.moodIntensity,
                    emotionalTags: editData.emotionalTags,
                    tags: editData.tags,
                    location: editData.location,
                    weather: editData.weather,
                    regenerateAI: false // Don't regenerate AI on save
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update journal entry');
            }

            toast.success('Journal entry updated successfully!');
            mutate(); // Refresh data
        } catch (error) {
            console.error('Save failed:', error);
            toast.error('Failed to save changes. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleAnalyzeWithAI = async () => {
        if (!entry || !editData.plainTextContent.trim()) {
            toast.error('Please add some content before analyzing');
            return;
        }

        setIsAnalyzing(true);
        try {
            const response = await fetch(`/api/journal/${entry.id}/analyze`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    content: editData.plainTextContent,
                    mood: editData.mood,
                    emotionalTags: editData.emotionalTags,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to analyze journal entry');
            }

            const result = await response.json();
            toast.success('AI analysis completed!');
            mutate(); // Refresh data to show new analysis
        } catch (error) {
            console.error('Analysis failed:', error);
            toast.error('Failed to analyze entry. Please try again.');
        } finally {
            setIsAnalyzing(false);
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
                            onClick={() => router.push(`/journal/${id}`)}
                            className="gap-2"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            <span className="hidden sm:inline">Back to Entry</span>
                        </Button>

                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleAnalyzeWithAI}
                                disabled={isAnalyzing || !editData.plainTextContent.trim()}
                                className="hidden sm:flex gap-2"
                            >
                                {isAnalyzing ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        <span className="hidden md:inline">Analyzing...</span>
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="h-4 w-4" />
                                        <span className="hidden md:inline">AI Analysis</span>
                                    </>
                                )}
                            </Button>

                            <Button onClick={handleSave} disabled={isSaving} size="sm" className="gap-2">
                                {isSaving ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        <span className="hidden sm:inline">Saving...</span>
                                    </>
                                ) : (
                                    <>
                                        <Save className="h-4 w-4" />
                                        <span className="hidden sm:inline">Save</span>
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Main Editor */}
                    <div className="lg:col-span-3 space-y-4">
                        {/* Title */}
                        <div className="space-y-2">
                            <Input
                                value={editData.title}
                                onChange={(e) => setEditData(prev => ({ ...prev, title: e.target.value }))}
                                className="text-xl sm:text-2xl font-bold border-none p-0 focus-visible:ring-0 shadow-none bg-transparent h-auto"
                                placeholder="What's on your mind?"
                            />
                        </div>

                        {/* Content Editor */}
                        <div className="min-h-[400px]">
                            <TiptapEditor
                                content={typeof editData.content === 'object' && editData.content !== null ? JSON.stringify(editData.content) : (editData.content || '')}
                                onChange={handleContentChange}
                                placeholder="Start writing your thoughts..."
                                showWordCount={true}
                                className="border-none shadow-none"
                            />
                        </div>

                        {/* Mobile AI Analysis Button */}
                        <div className="sm:hidden">
                            <Button
                                variant="outline"
                                onClick={handleAnalyzeWithAI}
                                disabled={isAnalyzing || !editData.plainTextContent.trim()}
                                className="w-full gap-2"
                            >
                                {isAnalyzing ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Analyzing...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="h-4 w-4" />
                                        AI Analysis
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-4">
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
                                    tags={editData.tags}
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
                                        value={editData.location}
                                        onChange={(e) => setEditData(prev => ({ ...prev, location: e.target.value }))}
                                        className="pl-10 h-9"
                                    />
                                </div>
                                <div className="relative">
                                    <Cloud className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Weather"
                                        value={editData.weather}
                                        onChange={(e) => setEditData(prev => ({ ...prev, weather: e.target.value }))}
                                        className="pl-10 h-9"
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* AI Analysis Results */}
                        {(entry.aiSummary || entry.aiSentiment) && (
                            <Card className="border-none shadow-sm">
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                                        <BarChart3 className="h-4 w-4" />
                                        AI Insights
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="pt-0 space-y-4">
                                    {entry.aiSummary && (
                                        <div>
                                            <h4 className="font-medium text-xs uppercase tracking-wide text-muted-foreground mb-2">Summary</h4>
                                            <div className="text-sm leading-relaxed">
                                                <div dangerouslySetInnerHTML={{ __html: entry.aiSummary }} />
                                            </div>
                                        </div>
                                    )}

                                    {entry.aiSentiment && (
                                        <div>
                                            <h4 className="font-medium text-xs uppercase tracking-wide text-muted-foreground mb-2">Sentiment</h4>
                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm">Overall</span>
                                                    <span className="text-sm font-medium capitalize px-2 py-1 bg-muted rounded-md">
                                                        {entry.aiSentiment.overall}
                                                    </span>
                                                </div>
                                                {entry.aiSentiment.emotions && entry.aiSentiment.emotions.length > 0 && (
                                                    <div className="space-y-1">
                                                        {entry.aiSentiment.emotions.slice(0, 3).map((emotion, index) => (
                                                            <div key={index} className="flex items-center justify-between text-xs">
                                                                <span className="capitalize">{emotion.emotion}</span>
                                                                <span className="text-muted-foreground">{Math.round(emotion.intensity * 100)}%</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {entry.aiInsights && entry.aiInsights.length > 0 && (
                                        <div>
                                            <h4 className="font-medium text-xs uppercase tracking-wide text-muted-foreground mb-2">Key Insights</h4>
                                            <ul className="space-y-1">
                                                {entry.aiInsights.slice(0, 3).map((insight, index) => (
                                                    <li key={index} className="text-sm leading-relaxed flex items-start gap-2">
                                                        <span className="text-primary mt-1.5 w-1 h-1 rounded-full bg-current flex-shrink-0"></span>
                                                        <span>{insight}</span>
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