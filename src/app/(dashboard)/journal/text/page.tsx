import { Metadata } from 'next';
import { PlateJournalEditor } from '@/components/journal/PlateJournalEditor';

export const metadata: Metadata = {
    title: 'Text Journal - Daksha',
    description: 'Write and reflect with our rich text journal editor. Capture your thoughts, emotions, and experiences with AI-powered insights.',
    keywords: ['journal', 'writing', 'reflection', 'text editor', 'markdown', 'AI insights'],
    openGraph: {
        title: 'Text Journal - Daksha',
        description: 'Write and reflect with our rich text journal editor',
        type: 'website',
    },
};

export default function TextJournalPage() {
    return <PlateJournalEditor isNew={true} />;
}