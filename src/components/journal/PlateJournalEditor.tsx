'use client';

import * as React from 'react';
import { useState, useCallback, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Loader2, Sparkles, MapPin, Cloud, Calendar, ScanLine } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MoodSelector } from './MoodSelector';
import { TagInput } from './TagInput';
import { toast } from 'sonner';
import YooptaJournalEditor from './YooptaJournalEditor';
import { yooptaToPlainText } from '@/lib/yoopta-utils';

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

const defaultValue = {
    '1': {
        id: '1',
        type: 'Paragraph',
        value: [
            {
                id: '1-p',
                type: 'paragraph',
                children: [{ text: 'Start writing your thoughts...' }],
            },
        ],
        meta: { order: 0, depth: 0 },
    },
} as const;

export function PlateJournalEditor({ entry, isNew = false, onSave, onCancel }: PlateJournalEditorProps) {
    const router = useRouter();
    const [isSaving, setIsSaving] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [lastSaved, setLastSaved] = useState<Date | null>(null);
    const [draftSavedAt, setDraftSavedAt] = useState<Date | null>(null);
    const [focusMode, setFocusMode] = useState(false);

    const [formData, setFormData] = useState({
        title: entry?.title || '',
        mood: entry?.mood,
        moodIntensity: entry?.moodIntensity,
        emotionalTags: entry?.emotionalTags || [],
        tags: entry?.tags || [],
        location: entry?.location || '',
        weather: entry?.weather || '',
    });

    const [yooptaContent, setYooptaContent] = useState<any>(entry?.yooptaContent || defaultValue);

    // Load draft for new entries
    useEffect(() => {
        if (!isNew) return;
        try {
            const raw = localStorage.getItem('journal-draft');
            if (!raw) return;
            const draft = JSON.parse(raw);
            if (draft?.title) {
                setFormData((prev) => ({ ...prev, title: draft.title }));
            }
            if (draft?.yooptaContent) {
                setYooptaContent(draft.yooptaContent);
            }
        } catch {}
    }, [isNew]);

    // Auto-save functionality
    const handleAutoSave = useCallback(async () => {
        if (!formData.title.trim() || !yooptaContent) return;
        if (isNew) return; // Don't auto-save new entries

        try {
            const plainTextContent = yooptaToPlainText(yooptaContent);

            const response = await fetch(`/api/journal/${entry?.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: formData.title,
                    yooptaContent,
                    plainTextContent,
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
    }, [formData, yooptaContent, entry?.id, isNew]);

    // Auto-save every 30 seconds
    useEffect(() => {
        if (isNew) return;
        const interval = setInterval(handleAutoSave, 30000);
        return () => clearInterval(interval);
    }, [handleAutoSave, isNew]);

    // Local draft save for new entries
    useEffect(() => {
        if (!isNew) return;
        const id = setTimeout(() => {
            try {
                localStorage.setItem(
                    'journal-draft',
                    JSON.stringify({ title: formData.title, yooptaContent })
                );
                setDraftSavedAt(new Date());
            } catch {}
        }, 600);
        return () => clearTimeout(id);
    }, [isNew, formData.title, yooptaContent]);

    // Warn on navigation with unsaved changes (new entries)
    useEffect(() => {
        if (!isNew) return;
        const handler = (e: BeforeUnloadEvent) => {
            const plain = yooptaToPlainText(yooptaContent).trim();
            if (formData.title.trim() || plain) {
                e.preventDefault();
                e.returnValue = '';
            }
        };
        window.addEventListener('beforeunload', handler);
        return () => window.removeEventListener('beforeunload', handler);
    }, [isNew, formData.title, yooptaContent]);

    // Keyboard shortcut: Cmd/Ctrl+S to save
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 's') {
                e.preventDefault();
                if (!isSaving) {
                    handleSave();
                }
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [isSaving, formData, yooptaContent]);

    const handleSave = async () => {
        const plainTextContent = yooptaToPlainText(yooptaContent);
        const titleToUse = formData.title.trim() || (plainTextContent.trim().slice(0, 60) || 'Untitled entry');
        if (!plainTextContent.trim() && !formData.title.trim()) {
            toast.error('Please add a title or some content for your journal entry');
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
                        title: titleToUse,
                        yooptaContent,
                        plainTextContent,
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

                const result: any = await response.json();
                toast.success('Journal entry created successfully!');
                try { localStorage.removeItem('journal-draft'); } catch {}

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
                        title: titleToUse,
                        yooptaContent,
                        plainTextContent,
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
                        yooptaContent,
                        plainTextContent,
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

        const plainTextContent = yooptaToPlainText(yooptaContent);
        if (!plainTextContent.trim()) {
            toast.error('Please add some content before analyzing');
            return;
        }

        setIsAnalyzing(true);
        try {
            const response = await fetch(`/api/journal/${entry.id}/analyze`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    content: plainTextContent,
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

    // Distraction-free overlay
    if (focusMode) {
        return (
            <div className="fixed inset-0 z-50 bg-background">
                <div className="flex items-center justify-between px-4 py-3 border-b">
                    <Button variant="ghost" size="sm" onClick={() => setFocusMode(false)} className="gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        Exit
                    </Button>
                    <div className="text-xs text-muted-foreground">
                        {isNew && draftSavedAt ? `Draft saved ${draftSavedAt.toLocaleTimeString()}` : lastSaved ? `Saved ${lastSaved.toLocaleTimeString()}` : ''}
                    </div>
                    <Button onClick={handleSave} disabled={isSaving} size="sm" className="gap-2">
                        {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                        Save
                    </Button>
                </div>
                <div className="h-[calc(100vh-49px)] overflow-auto">
                    <div className="mx-auto max-w-3xl p-6 space-y-6">
                        <Input
                            value={formData.title}
                            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                            className="text-3xl md:text-4xl font-semibold border-none p-0 focus-visible:ring-0 shadow-none bg-transparent h-auto tracking-tight placeholder:text-muted-foreground/60"
                            placeholder="What's on your mind?"
                        />
                        <div className="min-h-[60vh] rounded-xl">
                            <YooptaJournalEditor
                                initialValue={yooptaContent}
                                onChange={setYooptaContent}
                                className="min-h-[60vh] p-2"
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="sticky top-0 z-20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
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
                            {!isNew && lastSaved && (
                                <span>Saved {lastSaved.toLocaleTimeString()}</span>
                            )}
                            {isNew && draftSavedAt && (
                                <span>Draft saved {draftSavedAt.toLocaleTimeString()}</span>
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

                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => setFocusMode(v => !v)}
                                className="hidden sm:inline-flex gap-2"
                                title="Distraction-free writing"
                            >
                                <ScanLine className="h-4 w-4" />
                                <span className="hidden md:inline">{focusMode ? 'Exit Focus' : 'Focus Mode'}</span>
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
                <div className={focusMode ? 'grid grid-cols-1 gap-8' : 'grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_320px] gap-8'}>
                    {/* Main Editor */}
                    <div className="lg:col-span-3 space-y-4">
                        {/* Title */}
                        <Input
                            value={formData.title}
                            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                            className="text-3xl md:text-4xl font-semibold border-none p-0 focus-visible:ring-0 shadow-none bg-transparent h-auto tracking-tight placeholder:text-muted-foreground/60"
                            placeholder="What's on your mind?"
                        />

                        {/* Yoopta Editor */}
                        <div className={"min-h-[400px] rounded-xl border bg-background/30 " + (focusMode ? 'fixed inset-16 z-30 container mx-auto max-w-4xl bg-background shadow-xl' : '')}>
                            <YooptaJournalEditor
                                initialValue={yooptaContent}
                                onChange={setYooptaContent}
                                className="min-h-[400px] p-5"
                            />
                        </div>
                        {focusMode && (
                            <div className="fixed top-6 right-6 z-40">
                                <Button size="sm" onClick={() => setFocusMode(false)}>
                                    Exit Focus
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className={focusMode ? 'hidden' : 'space-y-4 xl:sticky xl:top-24 h-fit'}>
                        {/* Only show mood selector for existing entries; for new entries, we ask optionally after save */}
                        {!isNew && (
                            <Card className="border-none shadow-none bg-transparent">
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
                        )}

                        {/* Advanced (Tags & Context) */}
                        <Card className="border-none shadow-none bg-transparent">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">Advanced</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-0">
                                <details className="group">
                                    <summary className="cursor-pointer text-sm text-muted-foreground py-2">Tags</summary>
                                    <div className="pt-2">
                                        <TagInput
                                            tags={formData.tags}
                                            onChange={(tags) => setFormData(prev => ({ ...prev, tags }))}
                                        />
                                    </div>
                                </details>
                                <details className="group mt-4">
                                    <summary className="cursor-pointer text-sm text-muted-foreground py-2">Context</summary>
                                    <div className="pt-2 space-y-3">
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
                                    </div>
                                </details>
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
            {/* Mobile sticky actions */}
            <div className="fixed bottom-4 left-4 right-4 z-20 sm:hidden">
                <div className="flex gap-2 rounded-full border bg-background/95 backdrop-blur p-2 shadow-lg">
                    {!isNew && (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleAnalyzeWithAI}
                            disabled={isAnalyzing}
                            className="flex-1"
                        >
                            {isAnalyzing ? 'Analyzing…' : 'AI Analyze'}
                        </Button>
                    )}
                    <Button onClick={handleSave} disabled={isSaving} size="sm" className="flex-1">
                        {isSaving ? 'Saving…' : 'Save'}
                    </Button>
                </div>
            </div>
        </div>
    );
}
