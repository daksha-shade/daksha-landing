import { Metadata } from 'next';
import { MemoriesInterface } from '@/components/memories/memories-interface';

export const metadata: Metadata = {
  title: 'Memories Vault - Daksha',
  description: 'Your personal memory vault. Store, organize, and rediscover your photos, videos, notes, and journal entries with AI-powered insights and search.',
  keywords: ['memories', 'photos', 'videos', 'notes', 'journal', 'AI organization', 'personal vault', 'Daksha'],
  openGraph: {
    title: 'Memories Vault - Daksha',
    description: 'Your personal memory vault with AI-powered organization',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Memories Vault - Daksha',
    description: 'Your personal memory vault with AI-powered organization',
  },
};

export default function MemoriesPage() {
  return <MemoriesInterface />;
}