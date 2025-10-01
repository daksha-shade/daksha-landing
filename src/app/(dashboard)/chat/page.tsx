'use client';

import { AssistantRuntimeProvider } from '@assistant-ui/react';
import { useChatRuntime } from '@assistant-ui/react-ai-sdk';
import { useUser } from '@stackframe/stack';
import { Thread } from '@/components/assistant-ui/thread';
import { useChatThreads } from '@/hooks/use-chat-threads';
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ChatPage() {
  const _user = useUser(); // Keep for future use
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true); // Auto-minimized by default
  const chatRuntime = useChatRuntime({
    api: '/api/chat',
  } as any);
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
  }, [loadThreads]);

  // Load messages when a thread is selected
  useEffect(() => {
    if (currentThread) {
      loadMessages(currentThread);
    }
  }, [currentThread, loadMessages]);

  // Create a new thread when component mounts if none exists
  useEffect(() => {
    if (threads.length === 0) {
      createNewThread();
    }
  }, [threads.length, createNewThread]);

  return (
    <AssistantRuntimeProvider runtime={chatRuntime as any}>
      <div className="flex h-[90vh] w-full py-6 relative">
        {/* Thread sidebar */}
        <div className={`${sidebarCollapsed ? 'w-12' : 'w-64'} transition-all duration-300 border-r flex flex-col relative`}>
          {/* Collapse/Expand Button */}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="absolute -right-3 top-4 z-10 p-1 rounded-full bg-white dark:bg-gray-800 border shadow-md hover:shadow-lg transition-shadow"
          >
            {sidebarCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>

          {!sidebarCollapsed ? (
            // Expanded sidebar content
            <div className="p-4 flex flex-col h-full">
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
          ) : (
            // Collapsed sidebar content (minimal)
            <div className="p-2 flex flex-col items-center h-full">
              <button 
                onClick={() => {
                  createNewThread();
                }}
                className="p-2 mb-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                title="New Chat"
              >
                +
              </button>
              {/* Show current thread indicator */}
              {threads.slice(0, 3).map(thread => (
                <div 
                  key={thread.id}
                  className={`w-2 h-2 rounded-full mb-2 cursor-pointer ${
                    currentThread === thread.id 
                      ? 'bg-blue-500' 
                      : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400'
                  }`}
                  onClick={() => {
                    setCurrentThread(thread.id);
                  }}
                  title={thread.title || 'Untitled'}
                />
              ))}
            </div>
          )}
        </div>
        
        {/* Chat area */}
        <div className="flex-1 overflow-hidden rounded-xl mx-6">
          <Thread />
        </div>
      </div>
    </AssistantRuntimeProvider>
  );
}