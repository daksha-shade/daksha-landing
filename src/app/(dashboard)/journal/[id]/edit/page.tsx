import { Metadata } from 'next';
import { JournalEntryEditor } from '@/components/journal/JournalEntryEditor';

interface Props {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;

    return {
        title: `Edit Journal Entry - Daksha`,
        description: 'Edit your journal entry with AI-powered insights and analysis.',
        keywords: ['journal entry', 'edit', 'reflection', 'AI insights', 'personal growth'],
    };
}

export default async function JournalEntryEditPage({ params }: Props) {
    const { id } = await params;

    return <JournalEntryEditor id={id} />;
}