"use client";

import React from 'react';

interface ContentRendererProps {
    content?: any;
    plainTextContent?: string;
    className?: string;
}

// Helper function to render Tiptap JSON content
const renderTiptapContent = (content: any): React.ReactNode => {
    if (!content || typeof content !== 'object') return null;

    if (content.type === 'doc' && content.content) {
        return content.content.map((node: any, index: number) => renderNode(node, index));
    }

    return renderNode(content, 0);
};

const renderNode = (node: any, key: number): React.ReactNode => {
    if (!node || !node.type) return null;

    switch (node.type) {
        case 'paragraph':
            return (
                <p key={key} className="mb-4 leading-7 text-foreground">
                    {node.content ? node.content.map((child: any, index: number) => renderInline(child, index)) : <br />}
                </p>
            );

        case 'heading':
            const level = node.attrs?.level || 1;
            const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
            return (
                <HeadingTag key={key} className={getHeadingClasses(level)}>
                    {node.content ? node.content.map((child: any, index: number) => renderInline(child, index)) : ''}
                </HeadingTag>
            );

        case 'bulletList':
            return (
                <ul key={key} className="list-disc pl-6 mb-4 space-y-1">
                    {node.content ? node.content.map((child: any, index: number) => renderNode(child, index)) : null}
                </ul>
            );

        case 'orderedList':
            return (
                <ol key={key} className="list-decimal pl-6 mb-4 space-y-1">
                    {node.content ? node.content.map((child: any, index: number) => renderNode(child, index)) : null}
                </ol>
            );

        case 'listItem':
            return (
                <li key={key} className="leading-7 text-foreground">
                    {node.content ? node.content.map((child: any, index: number) => {
                        // For list items, we need to handle paragraphs differently
                        if (child.type === 'paragraph') {
                            return (
                                <span key={index}>
                                    {child.content ? child.content.map((grandchild: any, gIndex: number) => renderInline(grandchild, gIndex)) : ''}
                                </span>
                            );
                        }
                        return renderNode(child, index);
                    }) : ''}
                </li>
            );

        case 'taskList':
            return (
                <ul key={key} className="space-y-2 mb-4">
                    {node.content ? node.content.map((child: any, index: number) => renderNode(child, index)) : null}
                </ul>
            );

        case 'taskItem':
            const checked = node.attrs?.checked || false;
            return (
                <li key={key} className="flex items-start gap-2">
                    <input
                        type="checkbox"
                        checked={checked}
                        readOnly
                        className="mt-1 rounded border-gray-300"
                    />
                    <span className={checked ? 'line-through text-muted-foreground' : ''}>
                        {node.content ? node.content.map((child: any, index: number) => {
                            if (child.type === 'paragraph') {
                                return (
                                    <span key={index}>
                                        {child.content ? child.content.map((grandchild: any, gIndex: number) => renderInline(grandchild, gIndex)) : ''}
                                    </span>
                                );
                            }
                            return renderNode(child, index);
                        }) : ''}
                    </span>
                </li>
            );

        case 'blockquote':
            return (
                <blockquote key={key} className="border-l-4 border-primary pl-4 italic mb-4 text-muted-foreground">
                    {node.content ? node.content.map((child: any, index: number) => renderNode(child, index)) : null}
                </blockquote>
            );

        case 'codeBlock':
            return (
                <pre key={key} className="bg-muted p-4 rounded-md text-sm font-mono mb-4 overflow-x-auto">
                    <code>
                        {node.content ? node.content.map((child: any, index: number) => renderInline(child, index)) : ''}
                    </code>
                </pre>
            );

        case 'horizontalRule':
            return <hr key={key} className="my-6 border-border" />;

        default:
            return null;
    }
};

const renderInline = (node: any, key: number): React.ReactNode => {
    if (!node) return null;

    if (node.type === 'text') {
        let text = node.text || '';
        let element: React.ReactNode = text;

        if (node.marks) {
            node.marks.forEach((mark: any) => {
                switch (mark.type) {
                    case 'bold':
                        element = <strong key={`bold-${key}`}>{element}</strong>;
                        break;
                    case 'italic':
                        element = <em key={`italic-${key}`}>{element}</em>;
                        break;
                    case 'underline':
                        element = <u key={`underline-${key}`}>{element}</u>;
                        break;
                    case 'strike':
                        element = <s key={`strike-${key}`}>{element}</s>;
                        break;
                    case 'code':
                        element = <code key={`code-${key}`} className="bg-muted px-1 py-0.5 rounded text-sm font-mono">{element}</code>;
                        break;
                    case 'highlight':
                        element = <mark key={`highlight-${key}`} className="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">{element}</mark>;
                        break;
                    case 'link':
                        element = (
                            <a
                                key={`link-${key}`}
                                href={mark.attrs?.href}
                                className="text-primary underline underline-offset-4 hover:text-primary/80"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {element}
                            </a>
                        );
                        break;
                }
            });
        }

        return <React.Fragment key={key}>{element}</React.Fragment>;
    }

    return null;
};

const getHeadingClasses = (level: number): string => {
    const baseClasses = "font-bold mb-4 leading-tight text-foreground";
    switch (level) {
        case 1:
            return `${baseClasses} text-3xl sm:text-4xl`;
        case 2:
            return `${baseClasses} text-2xl sm:text-3xl`;
        case 3:
            return `${baseClasses} text-xl sm:text-2xl`;
        case 4:
            return `${baseClasses} text-lg sm:text-xl`;
        case 5:
            return `${baseClasses} text-base sm:text-lg`;
        case 6:
            return `${baseClasses} text-sm sm:text-base`;
        default:
            return `${baseClasses} text-xl sm:text-2xl`;
    }
};

export function ContentRenderer({ content, plainTextContent, className = "" }: ContentRendererProps) {
    // Try to render rich content first
    if (content) {
        try {
            let parsedContent = content;

            // If content is a string, try to parse it as JSON
            if (typeof content === 'string') {
                try {
                    parsedContent = JSON.parse(content);
                } catch {
                    // If parsing fails, treat as plain text
                    return (
                        <div className={`prose prose-sm sm:prose-base lg:prose-lg max-w-none ${className}`}>
                            {content.split('\n').map((paragraph, index) => (
                                <p key={index} className="mb-4 leading-relaxed">
                                    {paragraph || '\u00A0'}
                                </p>
                            ))}
                        </div>
                    );
                }
            }

            // Render Tiptap JSON content
            const renderedContent = renderTiptapContent(parsedContent);
            if (renderedContent) {
                return (
                    <div className={`prose prose-sm sm:prose-base lg:prose-lg max-w-none ${className}`}>
                        {renderedContent}
                    </div>
                );
            }
        } catch (error) {
            console.error('Error rendering content:', error);
        }
    }

    // Fallback to plain text content
    if (plainTextContent) {
        return (
            <div className={`prose prose-sm sm:prose-base lg:prose-lg max-w-none ${className}`}>
                {plainTextContent.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 leading-7 text-foreground">
                        {paragraph || '\u00A0'}
                    </p>
                ))}
            </div>
        );
    }

    return (
        <div className={`prose prose-sm sm:prose-base lg:prose-lg max-w-none ${className}`}>
            <p className="text-muted-foreground italic">No content available</p>
        </div>
    );
}