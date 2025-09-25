'use client';

import { AssistantRuntimeProvider } from '@assistant-ui/react';
import { useChatRuntime } from '@assistant-ui/react-ai-sdk';
import { useUser } from '@stackframe/stack';
import { Thread } from '@/components/assistant-ui/thread';

export default function ChatPage() {
  const user = useUser();

  const runtime = useChatRuntime();

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <div className="flex h-[90vh] w-full py-6">
        <div className="flex-1 overflow-hidden rounded-xl mx-6">
          <Thread />
        </div>
      </div>
    </AssistantRuntimeProvider>
  );
}