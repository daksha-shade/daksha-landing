"use client";

import { useState, KeyboardEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TagInputProps {
    tags: string[];
    onChange: (tags: string[]) => void;
    placeholder?: string;
    maxTags?: number;
}

const SUGGESTED_TAGS = [
    'reflection', 'gratitude', 'goals', 'work', 'family', 'friends',
    'health', 'creativity', 'learning', 'travel', 'nature', 'mindfulness',
    'productivity', 'relationships', 'growth', 'challenges', 'success',
    'inspiration', 'memories', 'dreams'
];

export function TagInput({
    tags,
    onChange,
    placeholder = "Add tags...",
    maxTags = 10
}: TagInputProps) {
    const [inputValue, setInputValue] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);

    const addTag = (tag: string) => {
        const trimmedTag = tag.trim().toLowerCase();
        if (trimmedTag && !tags.includes(trimmedTag) && tags.length < maxTags) {
            onChange([...tags, trimmedTag]);
        }
        setInputValue('');
        setShowSuggestions(false);
    };

    const removeTag = (tagToRemove: string) => {
        onChange(tags.filter(tag => tag !== tagToRemove));
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            addTag(inputValue);
        } else if (e.key === 'Backspace' && inputValue === '' && tags.length > 0) {
            removeTag(tags[tags.length - 1]);
        }
    };

    const filteredSuggestions = SUGGESTED_TAGS.filter(
        suggestion =>
            !tags.includes(suggestion) &&
            suggestion.toLowerCase().includes(inputValue.toLowerCase())
    ).slice(0, 6);

    return (
        <Card>
            <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Tags</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                {/* Current Tags */}
                {tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                        {tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeTag(tag)}
                                    className="ml-1 h-auto p-0 hover:bg-transparent"
                                >
                                    <X className="h-3 w-3" />
                                </Button>
                            </Badge>
                        ))}
                    </div>
                )}

                {/* Input */}
                <div className="relative">
                    <Input
                        value={inputValue}
                        onChange={(e) => {
                            setInputValue(e.target.value);
                            setShowSuggestions(e.target.value.length > 0);
                        }}
                        onKeyDown={handleKeyDown}
                        onFocus={() => setShowSuggestions(inputValue.length > 0)}
                        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                        placeholder={tags.length >= maxTags ? `Max ${maxTags} tags` : placeholder}
                        disabled={tags.length >= maxTags}
                        className="text-sm"
                    />

                    {inputValue && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => addTag(inputValue)}
                            className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
                        >
                            <Plus className="h-3 w-3" />
                        </Button>
                    )}
                </div>

                {/* Suggestions */}
                {showSuggestions && filteredSuggestions.length > 0 && (
                    <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground">Suggestions:</Label>
                        <div className="flex flex-wrap gap-1">
                            {filteredSuggestions.map((suggestion) => (
                                <Badge
                                    key={suggestion}
                                    variant="outline"
                                    className="text-xs cursor-pointer hover:bg-muted"
                                    onClick={() => addTag(suggestion)}
                                >
                                    {suggestion}
                                </Badge>
                            ))}
                        </div>
                    </div>
                )}

                {/* Help Text */}
                <div className="text-xs text-muted-foreground">
                    Press Enter or comma to add tags. {tags.length}/{maxTags} tags used.
                </div>
            </CardContent>
        </Card>
    );
}