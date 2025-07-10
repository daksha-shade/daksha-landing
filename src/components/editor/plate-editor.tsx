'use client';

import * as React from 'react';

import { Plate, usePlateEditor } from 'platejs/react';

import { EditorKit } from '@/components/editor/editor-kit';
import { SettingsDialog } from '@/components/editor/settings-dialog';
import { Editor, EditorContainer } from '@/components/ui/editor';

export function PlateEditor() {
  const editor = usePlateEditor({
    plugins: EditorKit,
    value,
  });

  return (
    <Plate editor={editor}>
      <EditorContainer>
        <Editor variant="demo" />
      </EditorContainer>

      <SettingsDialog />
    </Plate>
  );
}

const value = [
  {
    children: [{ text: 'How was your day today?' }],
    type: 'h2',
  },
  {
    children: [
      { text: 'Take a moment to reflect on your day. What moments stood out to you? What are you feeling grateful for? What challenges did you face, and how did you handle them?' },
    ],
    type: 'p',
  },
  {
    children: [{ text: '' }],
    type: 'p',
  },
  {
    children: [{ text: 'Today I...' }],
    type: 'p',
  },
  {
    children: [{ text: '' }],
    type: 'p',
  },
  {
    children: [{ text: 'Gratitude' }],
    type: 'h3',
  },
  {
    children: [{ text: 'Three things I\'m grateful for today:' }],
    type: 'p',
  },
  {
    children: [
      {
        children: [{ text: '' }],
        type: 'lic',
      },
    ],
    type: 'ul',
  },
  {
    children: [{ text: '' }],
    type: 'p',
  },
  {
    children: [{ text: 'Reflections' }],
    type: 'h3',
  },
  {
    children: [{ text: 'What did I learn about myself today?' }],
    type: 'p',
  },
  {
    children: [{ text: '' }],
    type: 'p',
  },
  {
    children: [{ text: 'Tomorrow\'s Goals' }],
    type: 'h3',
  },
  {
    children: [{ text: 'What do I want to focus on tomorrow?' }],
    type: 'p',
  },
];