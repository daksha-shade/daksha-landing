"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Smile, Meh, Frown, Zap, Brain, Sun, Cloud } from 'lucide-react';

interface MoodSelectorProps {
    mood?: string;
    moodIntensity?: number;
    emotionalTags?: string[];
    onChange: (mood?: string, intensity?: number, emotions?: string[]) => void;
}

const MOODS = [
    { id: 'happy', label: 'Happy', icon: Smile, color: 'bg-yellow-500' },
    { id: 'excited', label: 'Excited', icon: Zap, color: 'bg-orange-500' },
    { id: 'calm', label: 'Calm', icon: Sun, color: 'bg-green-500' },
    { id: 'contemplative', label: 'Thoughtful', icon: Brain, color: 'bg-indigo-500' },
    { id: 'neutral', label: 'Neutral', icon: Meh, color: 'bg-gray-500' },
    { id: 'sad', label: 'Sad', icon: Frown, color: 'bg-blue-500' },
    { id: 'anxious', label: 'Anxious', icon: Cloud, color: 'bg-red-500' },
    { id: 'grateful', label: 'Grateful', icon: Heart, color: 'bg-purple-500' },
];

const EMOTIONAL_TAGS = [
    'peaceful', 'energized', 'focused', 'creative', 'motivated',
    'stressed', 'overwhelmed', 'tired', 'restless', 'hopeful',
    'proud', 'disappointed', 'curious', 'inspired', 'lonely',
    'connected', 'confident', 'uncertain', 'relieved', 'frustrated'
];

export function MoodSelector({ mood, moodIntensity = 5, emotionalTags = [], onChange }: MoodSelectorProps) {
    const [selectedMood, setSelectedMood] = useState(mood);
    const [intensity, setIntensity] = useState([moodIntensity]);
    const [selectedEmotions, setSelectedEmotions] = useState<string[]>(emotionalTags);

    const handleMoodChange = (newMood: string) => {
        const updatedMood = newMood === selectedMood ? undefined : newMood;
        setSelectedMood(updatedMood);
        onChange(updatedMood, intensity[0], selectedEmotions);
    };

    const handleIntensityChange = (newIntensity: number[]) => {
        setIntensity(newIntensity);
        onChange(selectedMood, newIntensity[0], selectedEmotions);
    };

    const handleEmotionToggle = (emotion: string) => {
        const updatedEmotions = selectedEmotions.includes(emotion)
            ? selectedEmotions.filter(e => e !== emotion)
            : [...selectedEmotions, emotion];

        setSelectedEmotions(updatedEmotions);
        onChange(selectedMood, intensity[0], updatedEmotions);
    };

    return (
        <Card>
            <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">How are you feeling?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Mood Selection */}
                <div className="grid grid-cols-4 gap-2">
                    {MOODS.map((moodOption) => {
                        const Icon = moodOption.icon;
                        const isSelected = selectedMood === moodOption.id;

                        return (
                            <Button
                                key={moodOption.id}
                                variant={isSelected ? "default" : "outline"}
                                size="sm"
                                onClick={() => handleMoodChange(moodOption.id)}
                                className="flex flex-col gap-1 h-auto py-2"
                            >
                                <Icon className="h-4 w-4" />
                                <span className="text-xs">{moodOption.label}</span>
                            </Button>
                        );
                    })}
                </div>

                {/* Intensity Slider */}
                {selectedMood && (
                    <div className="space-y-2">
                        <Label className="text-xs">Intensity: {intensity[0]}/10</Label>
                        <Slider
                            value={intensity}
                            onValueChange={handleIntensityChange}
                            max={10}
                            min={1}
                            step={1}
                            className="w-full"
                        />
                    </div>
                )}

                {/* Emotional Tags */}
                <div className="space-y-2">
                    <Label className="text-xs">Emotional nuances (optional)</Label>
                    <div className="flex flex-wrap gap-1">
                        {EMOTIONAL_TAGS.slice(0, 10).map((emotion) => (
                            <Badge
                                key={emotion}
                                variant={selectedEmotions.includes(emotion) ? "default" : "outline"}
                                className="text-xs cursor-pointer hover:bg-muted"
                                onClick={() => handleEmotionToggle(emotion)}
                            >
                                {emotion}
                            </Badge>
                        ))}
                    </div>

                    {selectedEmotions.length > 0 && (
                        <div className="text-xs text-muted-foreground">
                            Selected: {selectedEmotions.join(', ')}
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}