"use client";

import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Calendar, BookOpen, Clock, Focus, Menu, X, Minimize2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { TiptapEditor } from '@/components/journal/TiptapEditor';
import { MoodSelector } from '@/components/journal/MoodSelector';
import { TagInput } from '@/components/journal/TagInput';
import { MarkdownShortcuts } from '@/components/journal/MarkdownShortcuts';
import { toast } from 'sonner';
import useSWR from 'swr';

interface JournalEntry {
    title: string;
    content: string;
    plainTextContent: string;
    mood?: string;
    moodIntensity?: number;
    emotionalTags?: string[];
    tags?: string[];
    location?: string;
    weather?: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function TextJournalEditor() {
    const router = useRouter();
    const [entry, setEntry] = useState<JournalEntry>({
        title: '',
        content: '',
        plainTextContent: '',
        mood: undefined,
        moodIntensity: undefined,
        emotionalTags: [],
        tags: [],
        location: '',
        weather: '',
    });

    const [isSaving, setIsSaving] = useState(false);
    const [lastSaved, setLastSaved] = useState<Date | null>(null);
    const [isFocusMode, setIsFocusMode] = useState(false);
    const [showMenuBar, setShowMenuBar] = useState(true);
    const [wordCount, setWordCount] = useState(0);
    const [isTyping, setIsTyping] = useState(false);

    // Auto-save functionality
    const handleAutoSave = useCallback(async () => {
        if (!entry.title.trim() || !entry.plainTextContent.trim()) return;

        try {
            const response = await fetch('/api/journal', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: entry.title,
                    content: entry.content, // JSON object
                    plainTextContent: entry.plainTextContent,
                    mood: entry.mood,
                    moodIntensity: entry.moodIntensity,
                    emotionalTags: entry.emotionalTags,
                    tags: entry.tags,
                    location: entry.location,
                    weather: entry.weather,
                    type: 'text',
                    entryDate: new Date().toISOString(),
                    generateAI: false, // Don't generate AI for auto-saves
                }),
            });

            if (response.ok) {
                setLastSaved(new Date());
            }
        } catch (error) {
            console.error('Auto-save failed:', error);
        }
    }, [entry]);

    // Auto-save every 30 seconds
    useEffect(() => {
        const interval = setInterval(handleAutoSave, 30000);
        return () => clearInterval(interval);
    }, [handleAutoSave]);

    const handleSave = useCallback(async () => {
        if (!entry.title.trim()) {
            toast.error('Please enter a title for your journal entry');
            return;
        }

        if (!entry.plainTextContent.trim()) {
            toast.error('Please write some content for your journal entry');
            return;
        }

        setIsSaving(true);
        try {
            const response = await fetch('/api/journal', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: entry.title,
                    content: entry.content, // JSON object
                    plainTextContent: entry.plainTextContent,
                    mood: entry.mood,
                    moodIntensity: entry.moodIntensity,
                    emotionalTags: entry.emotionalTags,
                    tags: entry.tags,
                    location: entry.location,
                    weather: entry.weather,
                    type: 'text',
                    entryDate: new Date().toISOString(),
                    generateAI: true,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to save journal entry');
            }

            const result = await response.json();
            toast.success('Journal entry saved successfully!');
            setLastSaved(new Date());

            // Redirect to journal list after a short delay
            setTimeout(() => {
                router.push('/journal');
            }, 1500);
        } catch (error) {
            console.error('Save failed:', error);
            toast.error('Failed to save journal entry. Please try again.');
        } finally {
            setIsSaving(false);
        }
    }, [entry, router]);

    const handleContentChange = useCallback((content: string, plainText: string) => {
        try {
            // Parse JSON content properly
            const contentObj = typeof content === 'string' ? JSON.parse(content) : content;
            setEntry(prev => ({
                ...prev,
                content: contentObj,
                plainTextContent: plainText
            }));
            setWordCount(plainText.split(/\s+/).filter(word => word.length > 0).length);
            setIsTyping(true);

            // Clear typing indicator after 1 second of no changes
            const timer = setTimeout(() => setIsTyping(false), 1000);
            return () => clearTimeout(timer);
        } catch (error) {
            console.error('Error parsing content JSON:', error);
            // Fallback to storing as-is
            setEntry(prev => ({
                ...prev,
                content: content,
                plainTextContent: plainText
            }));
        }
    }, []);

    // Handle keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isFocusMode) {
                setIsFocusMode(false);
            }
            if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                e.preventDefault();
                handleSave();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isFocusMode, handleSave]);

    return (
        <div className={`min-h-screen transition-all duration-300 ${isFocusMode ? 'bg-background' : ''}`}>
            {/* Header - Hidden in focus mode unless showMenuBar is true */}
            {(!isFocusMode || showMenuBar) && (
                <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b">
                    <div className="max-w-7xl mx-auto px-4 py-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="gap-2"
                                    onClick={() => router.push('/journal')}
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Back to Journal
                                </Button>

                                <div className="flex items-center gap-3">
                                    <Badge variant="outline" className="gap-1">
                                        <BookOpen className="w-3 h-3" />
                                        Rich Text Entry
                                    </Badge>

                                    <div className="text-sm text-muted-foreground">
                                        {isTyping ? (
                                            <span className="flex items-center gap-1">
                                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                                Typing...
                                            </span>
                                        ) : (
                                            `${wordCount} words`
                                        )}
                                    </div>

                                    {lastSaved && (
                                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            Saved {lastSaved.toLocaleTimeString()}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <Button variant="ghost" size="sm" className="gap-2">
                                    <Calendar className="w-4 h-4" />
                                    {new Date().toLocaleDateString('en-US', {
                                        weekday: 'short',
                                        month: 'short',
                                        day: 'numeric'
                                    })}
                                </Button>

                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setIsFocusMode(!isFocusMode)}
                                    className="gap-2"
                                >
                                    {isFocusMode ? (
                                        <>
                                            <Minimize2 className="w-4 h-4" />
                                            Exit Focus
                                        </>
                                    ) : (
                                        <>
                                            <Focus className="w-4 h-4" />
                                            Focus Mode
                                        </>
                                    )}
                                </Button>

                                <MarkdownShortcuts />

                                <Button
                                    onClick={handleSave}
                                    disabled={isSaving}
                                    className="gap-2"
                                >
                                    {isSaving ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="w-4 h-4" />
                                            Save Entry
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Focus Mode Menu Bar Toggle */}
            {isFocusMode && !showMenuBar && (
                <div className="fixed top-4 right-4 z-20">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowMenuBar(true)}
                        className="backdrop-blur-sm shadow-lg"
                    >
                        <Menu className="w-4 h-4" />
                    </Button>
                </div>
            )}

            {/* Focus Mode Menu Bar Close */}
            {isFocusMode && showMenuBar && (
                <div className="fixed top-4 right-4 z-20">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowMenuBar(false)}
                        className="backdrop-blur-sm shadow-lg"
                    >
                        <X className="w-4 h-4" />
                    </Button>
                </div>
            )}

            {/* Main Content */}
            <div className={`mx-auto px-4 transition-all duration-300 ${isFocusMode ? 'max-w-4xl py-4' : 'max-w-5xl py-8'
                }`}>
                <div className="space-y-6">
                    {/* Title */}
                    <div>
                        <Input
                            type="text"
                            placeholder="Give your entry a title..."
                            value={entry.title}
                            onChange={(e) => setEntry(prev => ({ ...prev, title: e.target.value }))}
                            className={`w-full font-bold bg-transparent border-none outline-none focus-visible:ring-0 shadow-none text-foreground transition-all duration-300 ${isFocusMode ? 'text-3xl' : 'text-4xl'
                                }`}
                        />
                    </div>

                    {/* Metadata Section - Hidden in focus mode */}
                    {!isFocusMode && (
                        <Card className="bg-muted/30">
                            <CardContent className="p-4 space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <MoodSelector
                                        mood={entry.mood}
                                        moodIntensity={entry.moodIntensity}
                                        emotionalTags={entry.emotionalTags}
                                        onChange={(mood, intensity, emotions) =>
                                            setEntry(prev => ({
                                                ...prev,
                                                mood,
                                                moodIntensity: intensity,
                                                emotionalTags: emotions
                                            }))
                                        }
                                    />

                                    <TagInput
                                        tags={entry.tags || []}
                                        onChange={(tags) => setEntry(prev => ({ ...prev, tags }))}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Input
                                        placeholder="Location (optional)"
                                        value={entry.location}
                                        onChange={(e) => setEntry(prev => ({ ...prev, location: e.target.value }))}
                                    />
                                    <Input
                                        placeholder="Weather (optional)"
                                        value={entry.weather}
                                        onChange={(e) => setEntry(prev => ({ ...prev, weather: e.target.value }))}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Rich Text Editor */}
                    <div className={`transition-all duration-300 ${isFocusMode
                        ? 'rounded-none shadow-none min-h-[calc(100vh-200px)]'
                        : 'min-h-[600px]'
                        }`}>
                        <TiptapEditor
                            content={typeof entry.content === 'object' && entry.content !== null ? JSON.stringify(entry.content) : (entry.content || '')}
                            onChange={handleContentChange}
                            placeholder="Start writing your thoughts..."
                            className={isFocusMode ? 'border-none shadow-none' : ''}
                            showWordCount={true}
                        />
                    </div>
                </div>
            </div>

            {/* Focus Mode Keyboard Shortcuts Hint */}
            {isFocusMode && (
                <div className="fixed bottom-4 left-4 z-20">
                    <div className="bg-background/90 backdrop-blur-sm shadow-lg rounded-lg p-3 text-xs text-muted-foreground border">
                        <div className="space-y-1">
                            <div><kbd className="px-1 py-0.5 bg-muted rounded text-xs">Ctrl+S</kbd> Save</div>
                            <div><kbd className="px-1 py-0.5 bg-muted rounded text-xs">Esc</kbd> Exit Focus</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}