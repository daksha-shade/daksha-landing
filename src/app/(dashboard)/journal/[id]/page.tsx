import { Metadata } from 'next';
import { PlateJournalView } from '@/components/journal/PlateJournalView';

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ mode?: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  return {
    title: `Journal Entry - Daksha`,
    description: 'View and edit your journal entry with AI-powered insights and analysis.',
    keywords: ['journal entry', 'reflection', 'AI insights', 'personal growth'],
  };
}

export default async function JournalEntryPage({ params, searchParams }: Props) {
  const { id } = await params;
  const { mode } = await searchParams;

  return <PlateJournalView id={id} initialMode={mode === 'edit' ? 'edit' : 'view'} />;
}
