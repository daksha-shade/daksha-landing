"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { HelpCircle, Keyboard } from 'lucide-react';

export function MarkdownShortcuts() {
    const shortcuts = [
        {
            category: 'Text Formatting', items: [
                { shortcut: 'Ctrl/Cmd + B', description: 'Bold text' },
                { shortcut: 'Ctrl/Cmd + I', description: 'Italic text' },
                { shortcut: 'Ctrl/Cmd + U', description: 'Underline text' },
                { shortcut: 'Ctrl/Cmd + E', description: 'Inline code' },
                { shortcut: 'Ctrl/Cmd + H', description: 'Highlight text' },
            ]
        },
        {
            category: 'Headings', items: [
                { shortcut: 'Ctrl/Cmd + 1', description: 'Heading 1' },
                { shortcut: 'Ctrl/Cmd + 2', description: 'Heading 2' },
                { shortcut: 'Ctrl/Cmd + 3', description: 'Heading 3' },
            ]
        },
        {
            category: 'Markdown Shortcuts', items: [
                { shortcut: '# + Space', description: 'Heading 1' },
                { shortcut: '## + Space', description: 'Heading 2' },
                { shortcut: '### + Space', description: 'Heading 3' },
                { shortcut: '- + Space', description: 'Bullet list' },
                { shortcut: '* + Space', description: 'Bullet list' },
                { shortcut: '1. + Space', description: 'Numbered list' },
                { shortcut: '[] + Space', description: 'Task list' },
                { shortcut: '> + Space', description: 'Blockquote' },
            ]
        },
        {
            category: 'Other', items: [
                { shortcut: 'Ctrl/Cmd + K', description: 'Add link' },
                { shortcut: 'Ctrl/Cmd + Z', description: 'Undo' },
                { shortcut: 'Ctrl/Cmd + Y', description: 'Redo' },
            ]
        },
    ];

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                    <HelpCircle className="h-4 w-4" />
                    Shortcuts
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Keyboard className="h-5 w-5" />
                        Keyboard Shortcuts & Markdown
                    </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    {shortcuts.map((category) => (
                        <Card key={category.category}>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm font-medium">{category.category}</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-0">
                                <div className="space-y-2">
                                    {category.items.map((item, index) => (
                                        <div key={index} className="flex items-center justify-between">
                                            <span className="text-sm text-muted-foreground">{item.description}</span>
                                            <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">
                                                {item.shortcut}
                                            </kbd>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                    <div className="text-xs text-muted-foreground p-4 bg-muted/30 rounded-lg">
                        <p className="font-medium mb-2">Tips:</p>
                        <ul className="space-y-1">
                            <li>• Type markdown shortcuts and press Space to auto-format</li>
                            <li>• Use Ctrl/Cmd + shortcuts for quick formatting</li>
                            <li>• Select text first, then apply formatting</li>
                            <li>• Use the toolbar buttons for additional options</li>
                        </ul>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}