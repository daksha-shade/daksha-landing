"use client";

import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { useChatRuntime } from "@assistant-ui/react-ai-sdk";
import { Thread } from "@/components/assistant-ui/thread";
import { MessageCircle } from 'lucide-react';

export default function ChatPage() {
  const runtime = useChatRuntime({
    api: "/api/chat",
  });

  return (
    <div className="flex flex-col h-[90vh] w-full py-6">
    

      {/* Chat Container */}
      <div className="flex-1 overflow-hidden rounded-xl ">
        <AssistantRuntimeProvider runtime={runtime}>
          <Thread />
        </AssistantRuntimeProvider>
      </div>
    </div>
  );
}
