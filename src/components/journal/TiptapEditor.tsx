"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Typography from '@tiptap/extension-typography';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Link from '@tiptap/extension-link';
import Highlight from '@tiptap/extension-highlight';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
// Table extensions temporarily removed due to import issues
import CharacterCount from '@tiptap/extension-character-count';
import { useCallback, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { TiptapToolbar } from './TiptapToolbar';

interface TiptapEditorProps {
    content: string;
    onChange: (content: string, plainText: string) => void;
    placeholder?: string;
    className?: string;
    editable?: boolean;
    showWordCount?: boolean;
}

export function TiptapEditor({
    content,
    onChange,
    placeholder = "Start writing...",
    className,
    editable = true,
    showWordCount = false
}: TiptapEditorProps) {
    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit.configure({
                bulletList: {
                    keepMarks: true,
                    keepAttributes: false,
                },
                orderedList: {
                    keepMarks: true,
                    keepAttributes: false,
                },
                codeBlock: {
                    HTMLAttributes: {
                        class: 'bg-muted p-4 rounded-md text-sm font-mono',
                    },
                },
            }),
            Placeholder.configure({
                placeholder,
            }),
            Typography,
            TaskList,
            TaskItem.configure({
                nested: true,
                HTMLAttributes: {
                    class: 'flex items-start gap-2',
                },
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-primary underline underline-offset-4 hover:text-primary/80 cursor-pointer',
                },
            }),
            Highlight.configure({
                multicolor: true,
                HTMLAttributes: {
                    class: 'bg-yellow-200 dark:bg-yellow-800 px-1 rounded',
                },
            }),
            Underline,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            CharacterCount,
        ],
        content,
        editable,
        onUpdate: ({ editor }) => {
            const json = editor.getJSON();
            const text = editor.getText();
            onChange(JSON.stringify(json), text);
        },
        editorProps: {
            attributes: {
                class: cn(
                    'prose prose-sm sm:prose-base lg:prose-lg xl:prose-xl mx-auto focus:outline-none',
                    'prose-headings:font-bold prose-headings:text-foreground',
                    'prose-p:text-foreground prose-p:leading-relaxed',
                    'prose-a:text-primary prose-a:no-underline hover:prose-a:underline',
                    'prose-strong:text-foreground prose-strong:font-semibold',
                    'prose-em:text-foreground',
                    'prose-code:text-foreground prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded',
                    'prose-pre:bg-muted prose-pre:text-foreground',
                    'prose-blockquote:text-muted-foreground prose-blockquote:border-l-primary',
                    'prose-ul:text-foreground prose-ol:text-foreground',
                    'prose-li:text-foreground',
                    'prose-hr:border-border',
                    'min-h-[200px] p-4',
                    className
                ),
            },
        },
    });

    // Update editor content when prop changes
    useEffect(() => {
        if (editor && content) {
            try {
                const currentContent = JSON.stringify(editor.getJSON());
                if (content !== currentContent) {
                    const parsedContent = typeof content === 'string' ? JSON.parse(content) : content;
                    editor.commands.setContent(parsedContent);
                }
            } catch (error) {
                // If content is not valid JSON, treat as HTML/text
                if (content !== editor.getHTML()) {
                    editor.commands.setContent(content);
                }
            }
        }
    }, [content, editor]);

    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        // Handle markdown shortcuts
        if (event.ctrlKey || event.metaKey) {
            switch (event.key) {
                case 'b':
                    event.preventDefault();
                    editor?.chain().focus().toggleBold().run();
                    break;
                case 'i':
                    event.preventDefault();
                    editor?.chain().focus().toggleItalic().run();
                    break;
                case 'u':
                    event.preventDefault();
                    editor?.chain().focus().toggleUnderline().run();
                    break;
                case 'k':
                    event.preventDefault();
                    const url = window.prompt('Enter URL:');
                    if (url) {
                        editor?.chain().focus().setLink({ href: url }).run();
                    }
                    break;
                case 'e':
                    event.preventDefault();
                    editor?.chain().focus().toggleCode().run();
                    break;
                case 'h':
                    event.preventDefault();
                    editor?.chain().focus().toggleHighlight().run();
                    break;
                case '1':
                    event.preventDefault();
                    editor?.chain().focus().toggleHeading({ level: 1 }).run();
                    break;
                case '2':
                    event.preventDefault();
                    editor?.chain().focus().toggleHeading({ level: 2 }).run();
                    break;
                case '3':
                    event.preventDefault();
                    editor?.chain().focus().toggleHeading({ level: 3 }).run();
                    break;
            }
        }

        // Handle markdown-style shortcuts without modifier keys
        if (!event.ctrlKey && !event.metaKey && !event.altKey) {
            const { selection } = editor?.state || {};
            if (selection && selection.empty) {
                const { $from } = selection;
                const textBefore = $from.parent.textBetween(0, $from.parentOffset);

                if (event.key === ' ') {
                    // Auto-format markdown shortcuts
                    if (textBefore === '#') {
                        event.preventDefault();
                        editor?.chain().focus().deleteRange({ from: $from.pos - 1, to: $from.pos }).toggleHeading({ level: 1 }).run();
                    } else if (textBefore === '##') {
                        event.preventDefault();
                        editor?.chain().focus().deleteRange({ from: $from.pos - 2, to: $from.pos }).toggleHeading({ level: 2 }).run();
                    } else if (textBefore === '###') {
                        event.preventDefault();
                        editor?.chain().focus().deleteRange({ from: $from.pos - 3, to: $from.pos }).toggleHeading({ level: 3 }).run();
                    } else if (textBefore === '-' || textBefore === '*') {
                        event.preventDefault();
                        editor?.chain().focus().deleteRange({ from: $from.pos - 1, to: $from.pos }).toggleBulletList().run();
                    } else if (textBefore === '1.') {
                        event.preventDefault();
                        editor?.chain().focus().deleteRange({ from: $from.pos - 2, to: $from.pos }).toggleOrderedList().run();
                    } else if (textBefore === '[]') {
                        event.preventDefault();
                        editor?.chain().focus().deleteRange({ from: $from.pos - 2, to: $from.pos }).toggleTaskList().run();
                    } else if (textBefore === '>') {
                        event.preventDefault();
                        editor?.chain().focus().deleteRange({ from: $from.pos - 1, to: $from.pos }).toggleBlockquote().run();
                    }
                }
            }
        }
    }, [editor]);

    useEffect(() => {
        if (editor) {
            const editorElement = editor.view.dom;
            editorElement.addEventListener('keydown', handleKeyDown);
            return () => editorElement.removeEventListener('keydown', handleKeyDown);
        }
    }, [editor, handleKeyDown]);

    if (!editor) {
        return (
            <div className={cn("border rounded-lg p-4 min-h-[200px] animate-pulse bg-muted/20", className)}>
                <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-muted rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-muted rounded w-2/3"></div>
            </div>
        );
    }

    return (
        <div className={cn("border rounded-lg overflow-hidden bg-background", className)}>
            {editable && <TiptapToolbar editor={editor} />}
            <EditorContent
                editor={editor}
                className="min-h-[200px] max-w-none"
            />
            {showWordCount && (
                <div className="border-t px-4 py-2 text-xs text-muted-foreground flex justify-between">
                    <span>
                        {editor.storage.characterCount?.characters() || 0} characters, {' '}
                        {editor.storage.characterCount?.words() || 0} words
                    </span>
                    <span>
                        Press Ctrl+S to save
                    </span>
                </div>
            )}
        </div>
    );
}