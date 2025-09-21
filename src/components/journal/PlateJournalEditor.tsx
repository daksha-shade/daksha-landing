'use client';

import * as React from 'react';
import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plate, usePlateEditor } from 'platejs/react';
import { serializeMd } from '@platejs/markdown';
import { ArrowLeft, Save, Loader2, Sparkles, MapPin, Cloud, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Editor, EditorContainer } from '@/components/ui/editor';
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

interface PlateJournalEditorProps {
    entry?: JournalEntry;
    isNew?: boolean;
    onSave?: (entry: Partial<JournalEntry>) => Promise<void>;
    onCancel?: () => void;
}

const defaultValue = [
    {
        children: [{ text: 'Start writing your thoughts...' }],
        type: 'p',
    },
];

export function PlateJournalEditor({ entry, isNew = false, onSave, onCancel }: PlateJournalEditorProps) {
    const router = useRouter();
    const [isSaving, setIsSaving] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [lastSaved, setLastSaved] = useState<Date | null>(null);

    const [formData, setFormData] = useState({
        title: entry?.title || '',
        mood: entry?.mood,
        moodIntensity: entry?.moodIntensity,
        emotionalTags: entry?.emotionalTags || [],
        tags: entry?.tags || [],
        location: entry?.location || '',
        weather: entry?.weather || '',
    });

    const editor = usePlateEditor({
        plugins: EditorKit,
        value: entry?.content || defaultValue,
    });

    // Auto-save functionality
    const handleAutoSave = useCallback(async () => {
        if (!formData.title.trim() || !editor.children.length) return;
        if (isNew) return; // Don't auto-save new entries

        try {
            const content = editor.children;
            const markdownContent = serializeMd(editor, { nodes: content });

            const response = await fetch(`/api/journal/${entry?.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: formData.title,
                    content,
                    markdownContent,
                    mood: formData.mood,
                    moodIntensity: formData.moodIntensity,
                    emotionalTags: formData.emotionalTags,
                    tags: formData.tags,
                    location: formData.location,
                    weather: formData.weather,
                    regenerateAI: false,
                }),
            });

            if (response.ok) {
                setLastSaved(new Date());
            }
        } catch (error) {
            console.error('Auto-save failed:', error);
        }
    }, [formData, editor, entry?.id, isNew]);

    // Auto-save every 30 seconds
    useEffect(() => {
        if (isNew) return;
        const interval = setInterval(handleAutoSave, 30000);
        return () => clearInterval(interval);
    }, [handleAutoSave, isNew]);

    const handleSave = async () => {
        if (!formData.title.trim()) {
            toast.error('Please enter a title for your journal entry');
            return;
        }

        const content = editor.children;
        const markdownContent = serializeMd(editor, { nodes: content });

        if (!markdownContent.trim()) {
            toast.error('Please write some content for your journal entry');
            return;
        }

        setIsSaving(true);
        try {
            if (isNew) {
                // Create new entry
                const response = await fetch('/api/journal', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        title: formData.title,
                        content,
                        markdownContent,
                        type: 'text',
                        mood: formData.mood,
                        moodIntensity: formData.moodIntensity,
                        emotionalTags: formData.emotionalTags,
                        tags: formData.tags,
                        location: formData.location,
                        weather: formData.weather,
                        entryDate: new Date().toISOString(),
                        generateAI: true,
                    }),
                });

                if (!response.ok) {
                    throw new Error('Failed to create journal entry');
                }

                const result = await response.json();
                toast.success('Journal entry created successfully!');

                // Redirect to the new entry
                setTimeout(() => {
                    router.push(`/journal/${result.id}`);
                }, 1500);
            } else {
                // Update existing entry
                const response = await fetch(`/api/journal/${entry?.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        title: formData.title,
                        content,
                        markdownContent,
                        mood: formData.mood,
                        moodIntensity: formData.moodIntensity,
                        emotionalTags: formData.emotionalTags,
                        tags: formData.tags,
                        location: formData.location,
                        weather: formData.weather,
                        regenerateAI: false,
                    }),
                });

                if (!response.ok) {
                    throw new Error('Failed to update journal entry');
                }

                toast.success('Journal entry updated successfully!');
                setLastSaved(new Date());

                if (onSave) {
                    await onSave({
                        title: formData.title,
                        content,
                        markdownContent,
                        ...formData,
                    });
                }
            }
        } catch (error) {
            console.error('Save failed:', error);
            toast.error('Failed to save journal entry. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleAnalyzeWithAI = async () => {
        if (!entry?.id) {
            toast.error('Please save the entry first before analyzing');
            return;
        }

        const markdownContent = serializeMd(editor, { nodes: editor.children });
        if (!markdownContent.trim()) {
            toast.error('Please add some content before analyzing');
            return;
        }

        setIsAnalyzing(true);
        try {
            const response = await fetch(`/api/journal/${entry.id}/analyze`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    content: markdownContent,
                    mood: formData.mood,
                    emotionalTags: formData.emotionalTags,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to analyze journal entry');
            }

            toast.success('AI analysis completed!');
        } catch (error) {
            console.error('Analysis failed:', error);
            toast.error('Failed to analyze entry. Please try again.');
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
                <div className="container mx-auto px-4 py-3">
                    <div className="flex items-center justify-between">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onCancel ? onCancel() : router.push('/journal')}
                            className="gap-2"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            <span className="hidden sm:inline">Back</span>
                        </Button>

                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            {lastSaved && !isNew && (
                                <span>Saved {lastSaved.toLocaleTimeString()}</span>
                            )}
                        </div>

                        <div className="flex items-center gap-2">
                            {!isNew && (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleAnalyzeWithAI}
                                    disabled={isAnalyzing}
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
                            )}

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
                        <Input
                            value={formData.title}
                            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                            className="text-xl sm:text-2xl font-bold border-none p-0 focus-visible:ring-0 shadow-none bg-transparent h-auto"
                            placeholder="What's on your mind?"
                        />

                        {/* Plate.js Editor */}
                        <div className="min-h-[400px]">
                            <Plate editor={editor}>
                                <EditorContainer>
                                    <Editor
                                        variant="demo"
                                        className="min-h-[400px] p-4 border rounded-lg focus-within:ring-2 focus-within:ring-primary focus-within:border-primary"
                                    />
                                </EditorContainer>
                            </Plate>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-4">
                        {/* Mood & Emotions */}
                        <Card className="border-none shadow-sm">
                            <CardContent className="p-4">
                                <MoodSelector
                                    mood={formData.mood}
                                    moodIntensity={formData.moodIntensity}
                                    emotionalTags={formData.emotionalTags}
                                    onChange={(mood, intensity, emotions) =>
                                        setFormData(prev => ({
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
                                    tags={formData.tags}
                                    onChange={(tags) => setFormData(prev => ({ ...prev, tags }))}
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
                                        value={formData.location}
                                        onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                                        className="pl-10 h-9"
                                    />
                                </div>
                                <div className="relative">
                                    <Cloud className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Weather"
                                        value={formData.weather}
                                        onChange={(e) => setFormData(prev => ({ ...prev, weather: e.target.value }))}
                                        className="pl-10 h-9"
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Date Info */}
                        <Card className="border-none shadow-sm">
                            <CardContent className="p-4 flex items-center gap-2 text-sm text-muted-foreground">
                                <Calendar className="h-4 w-4" />
                                <span>
                                    {new Date().toLocaleDateString('en-US', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </span>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}