import { Metadata } from 'next';
import { JournalList } from '@/components/journal/JournalList';

export const metadata: Metadata = {
  title: 'Journal - Daksha',
  description: 'Your personal journaling space. Write, reflect, and track your thoughts, emotions, and experiences with AI-powered insights.',
  keywords: ['journal', 'diary', 'reflection', 'writing', 'mood tracking', 'AI insights'],
  openGraph: {
    title: 'Journal - Daksha',
    description: 'Your personal journaling space with AI-powered insights',
    type: 'website',
  },
};

export default function JournalPage() {
  return <JournalList />;
}