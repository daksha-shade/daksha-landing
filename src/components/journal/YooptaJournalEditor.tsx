'use client';

import { useMemo, useState, useCallback, useEffect } from 'react';
import YooptaEditor, { createYooptaEditor, YooptaContentValue, YooptaOnChangeOptions } from '@yoopta/editor';
import Paragraph from '@yoopta/paragraph';
import { HeadingOne, HeadingTwo, HeadingThree } from '@yoopta/headings';
import { NumberedList, BulletedList, TodoList } from '@yoopta/lists';
import Blockquote from '@yoopta/blockquote';
import Callout from '@yoopta/callout';
import Divider from '@yoopta/divider';
import Code from '@yoopta/code';
import Table from '@yoopta/table';
import Embed from '@yoopta/embed';
import Image from '@yoopta/image';
import Video from '@yoopta/video';
import File from '@yoopta/file';
import Accordion from '@yoopta/accordion';
import { Bold, Italic, CodeMark, Underline, Strike, Highlight } from '@yoopta/marks';
import LinkTool, { DefaultLinkToolRender } from '@yoopta/link-tool';
import ActionMenu, { DefaultActionMenuRender } from '@yoopta/action-menu-list';
import Toolbar, { DefaultToolbarRender } from '@yoopta/toolbar';

// Define plugins (use the `.plugin` export)
const PLUGINS = [
    Paragraph,
    HeadingOne,
    HeadingTwo,
    HeadingThree,
    BulletedList,
    NumberedList,
    TodoList,
    Blockquote,
    Callout,
    Divider,
    Code,
    Table,
    // You can enable more advanced blocks as needed:
    // Table, Embed, Image, Video, File, Accordion,
];

// Define marks
const MARKS = [
    Bold,
    Italic,
    CodeMark,
    Underline,
    Strike,
    Highlight,
];

// Define tools
const TOOLS = {
    Toolbar: {
        tool: Toolbar,
        render: DefaultToolbarRender,
    },
    ActionMenu: {
        tool: ActionMenu,
        render: DefaultActionMenuRender,
    },
    LinkTool: {
        tool: LinkTool,
        render: DefaultLinkToolRender,
    },
};

interface YooptaJournalEditorProps {
    initialValue?: YooptaContentValue;
    onChange?: (value: YooptaContentValue) => void;
    placeholder?: string;
    readOnly?: boolean;
    className?: string;
}

export default function YooptaJournalEditor({
    initialValue,
    onChange,
    placeholder = "Start writing your thoughts...",
    readOnly = false,
    className = "",
}: YooptaJournalEditorProps) {
    const editor = useMemo(() => createYooptaEditor(), []);
    
    // Normalize incoming value to YooptaContentValue shape
    const normalizedInitialValue = useMemo(() => {
        // No content yet
        if (!initialValue) return undefined;

        // Already a mapping of blocks (YooptaContentValue): values have `value` array
        if (
            typeof initialValue === 'object' &&
            !Array.isArray(initialValue) &&
            Object.values(initialValue as any).every((v: any) => v && typeof v === 'object' && ('value' in v || 'meta' in v))
        ) {
            return initialValue as YooptaContentValue;
        }

        // Legacy wrapped shape: { blocks: { id: { children|value } }, meta? }
        if (typeof initialValue === 'object' && 'blocks' in (initialValue as any)) {
            const srcBlocks = (initialValue as any).blocks as Record<string, any>;
            const mapped: Record<string, any> = {};
            Object.entries(srcBlocks).forEach(([id, block], order) => {
                const element = block?.value?.[0] || {
                    id: `${id}-p`,
                    type: 'paragraph',
                    children: block?.children ?? [{ text: '' }],
                };
                const type = block?.type === 'Paragraph' || block?.type === 'paragraph' ? 'Paragraph' : (block?.type ?? 'Paragraph');
                mapped[id] = {
                    id,
                    type,
                    value: Array.isArray(block?.value) ? block.value : [element],
                    meta: block?.meta ?? { order, depth: 0 },
                };
            });
            return mapped as YooptaContentValue;
        }

        // Plate-style array of nodes -> convert into single Paragraph block
        if (Array.isArray(initialValue)) {
            const id = '1';
            const first = (initialValue as any[])[0] || { type: 'paragraph', children: [{ text: '' }] };
            const element = {
                id: `${id}-p`,
                type: 'paragraph',
                children: first.children ?? [{ text: '' }],
            };
            return {
                [id]: {
                    id,
                    type: 'Paragraph',
                    value: [element],
                    meta: { order: 0, depth: 0 },
                },
            } as YooptaContentValue;
        }

        return undefined;
    }, [initialValue]);
    
    // Debug log to check plugins
    useEffect(() => {
        console.log('Yoopta Plugins:', PLUGINS);
        PLUGINS.forEach((plugin, index) => {
            console.log(`Plugin ${index}:`, plugin);
            if (plugin && typeof plugin === 'object') {
                console.log(`Plugin ${index} keys:`, Object.keys(plugin));
            }
        });
    }, []);
    
    const [value, setValue] = useState<YooptaContentValue | undefined>(normalizedInitialValue as YooptaContentValue | undefined);

    const handleChange = useCallback((newValue: YooptaContentValue, options: YooptaOnChangeOptions) => {
        setValue(newValue);
        onChange?.(newValue);
    }, [onChange]);

    return (
        <div className={`yoopta-editor-container ${className}`}>
            <YooptaEditor
                editor={editor}
                plugins={PLUGINS as any}
                tools={TOOLS}
                marks={MARKS}
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                readOnly={readOnly}
                className="min-h-[200px] focus:outline-none"
            />
        </div>
    );
}
