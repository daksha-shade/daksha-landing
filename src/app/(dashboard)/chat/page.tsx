'use client';

import { AssistantProvider, useEdgeRuntime, Thread } from '@assistant-ui/react';

export default function ChatPage() {
  const runtime = useEdgeRuntime({ api: '/api/chat' });

  return (
    <AssistantProvider runtime={runtime}>
      <Thread />
    </AssistantProvider>
  );
}</search>
</search_and_replace>