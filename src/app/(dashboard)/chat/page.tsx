'use client';

import { AssistantRuntimeProvider } from '@assistant-ui/react';
import { useChatRuntime } from '@assistant-ui/react-ai-sdk';
import { useUser } from '@stackframe/stack';
import { Thread } from '@/components/assistant-ui/thread';
import { useChatThreads } from '@/hooks/use-chat-threads';
import { useEffect } from 'react';

export default function ChatPage() {
  const user = useUser();
  const chatRuntime = useChatRuntime();
  const {
    threads,
    currentThread,
    loadThreads,
    createNewThread,
    deleteThread,
    setCurrentThread,
    loadMessages
  } = useChatThreads();

  // Load threads when component mounts
  useEffect(() => {
    loadThreads();
  }, []);

  // Load messages when a thread is selected
  useEffect(() => {
    if (currentThread) {
      loadMessages(currentThread);
    }
  }, [currentThread]);

  // Create a new thread when component mounts if none exists
  useEffect(() => {
    if (threads.length === 0) {
      createNewThread();
    }
  }, [threads.length]);

  return (
    <AssistantRuntimeProvider runtime={chatRuntime as any}>
      <div className="flex h-[90vh] w-full py-6">
        {/* Thread sidebar */}
        <div className="w-64 border-r p-4 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Chats</h2>
            <button 
              onClick={() => {
                createNewThread();
              }}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              +
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            {threads.map(thread => (
              <div 
                key={thread.id}
                className={`p-2 mb-2 rounded cursor-pointer ${
                  currentThread === thread.id 
                    ? 'bg-blue-100 dark:bg-blue-900' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
                onClick={() => {
                  setCurrentThread(thread.id);
                }}
              >
                <div className="flex justify-between">
                  <span className="truncate">{thread.title || 'Untitled'}</span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteThread(thread.id);
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </div>
                <div className="text-xs text-gray-500">
                  {new Date(thread.updatedAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Chat area */}
        <div className="flex-1 overflow-hidden rounded-xl mx-6">
          <Thread />
        </div>
      </div>
    </AssistantRuntimeProvider>
  );
}