import type { Metadata } from 'next';
import { Toaster } from 'sonner';

import { PlateEditor } from '@/components/editor/plate-editor';

export const metadata: Metadata = {
  title: 'Editor - Daksha',
  description: 'Advanced rich text editor for creating and editing your journal entries and context files.',
};

export default function Page() {
  return (
    <div className="h-screen w-full">
      <PlateEditor />

      <Toaster />
    </div>
  );
}
