import { YooptaContentValue } from '@yoopta/editor';

/**
 * Convert Yoopta Editor content to plain text
 */
export function yooptaToPlainText(content: YooptaContentValue): string {
    if (!content || typeof content !== 'object') {
        return '';
    }

    const extractTextFromBlock = (block: any): string => {
        if (!block || !block.value) return '';

        // Handle different block types
        const value = block.value;

        // For most blocks, text is in value array
        if (Array.isArray(value)) {
            return value.map(item => {
                if (typeof item === 'string') return item;
                if (item && typeof item === 'object' && item.children) {
                    return extractTextFromChildren(item.children);
                }
                if (item && typeof item === 'object' && item.text) {
                    return item.text;
                }
                return '';
            }).join(' ');
        }

        // For single value blocks
        if (typeof value === 'string') return value;
        if (value && typeof value === 'object' && value.text) return value.text;
        if (value && typeof value === 'object' && value.children) {
            return extractTextFromChildren(value.children);
        }

        return '';
    };

    const extractTextFromChildren = (children: any[]): string => {
        if (!Array.isArray(children)) return '';

        return children.map(child => {
            if (typeof child === 'string') return child;
            if (child && typeof child === 'object') {
                if (child.text) return child.text;
                if (child.children) return extractTextFromChildren(child.children);
            }
            return '';
        }).join('');
    };

    // Extract text from all blocks
    const textParts: string[] = [];

    Object.values(content).forEach((block: any) => {
        const text = extractTextFromBlock(block);
        if (text.trim()) {
            textParts.push(text.trim());
        }
    });

    return textParts.join('\n\n');
}

/**
 * Create initial Yoopta content with a paragraph
 */
export function createInitialYooptaContent(text?: string): YooptaContentValue {
    const blockId = crypto.randomUUID();

    return {
        [blockId]: {
            id: blockId,
            type: 'paragraph',
            value: [
                {
                    id: crypto.randomUUID(),
                    type: 'paragraph',
                    children: [{ text: text || '' }],
                },
            ],
            meta: {
                order: 0,
                depth: 0,
            },
        },
    };
}

/**
 * Check if Yoopta content is empty
 */
export function isYooptaContentEmpty(content: YooptaContentValue): boolean {
    if (!content || typeof content !== 'object') return true;

    const plainText = yooptaToPlainText(content);
    return plainText.trim().length === 0;
}