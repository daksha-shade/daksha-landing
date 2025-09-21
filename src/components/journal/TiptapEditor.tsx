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
import { useCallback, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { TiptapToolbar } from './TiptapToolbar';

interface TiptapEditorProps {
    content: string;
    onChange: (content: string, plainText: string) => void;
    placeholder?: string;
    className?: string;
    editable?: boolean;
}

export function TiptapEditor({
    content,
    onChange,
    placeholder = "Start writing...",
    className,
    editable = true
}: TiptapEditorProps) {
    const editor = useEditor({
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
            }),
            Placeholder.configure({
                placeholder,
            }),
            Typography,
            TaskList,
            TaskItem.configure({
                nested: true,
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-primary underline underline-offset-4 hover:text-primary/80',
                },
            }),
            Highlight.configure({
                multicolor: true,
            }),
            Underline,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
        ],
        content,
        editable,
        onUpdate: ({ editor }) => {
            const html = editor.getHTML();
            const text = editor.getText();
            onChange(html, text);
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
        if (editor && content !== editor.getHTML()) {
            editor.commands.setContent(content);
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
        </div>
    );
}