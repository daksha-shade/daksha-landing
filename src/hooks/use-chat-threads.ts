import { useState, useEffect } from 'react';

interface Thread {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: any;
  createdAt: string;
}

interface ThreadsResponse {
  threads: Thread[];
}

interface ThreadResponse {
  thread: Thread;
}

interface MessagesResponse {
  messages: Message[];
}

export function useChatThreads() {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [currentThread, setCurrentThread] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  // Load threads when hook is initialized
  useEffect(() => {
    loadThreads();
  }, []);

  const loadThreads = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/threads');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: ThreadsResponse = await response.json();
      setThreads(data.threads || []);
    } catch (error) {
      console.error('Error loading threads:', error);
    } finally {
      setLoading(false);
    }
  };

  const createNewThread = async (title: string = 'New Chat') => {
    try {
      const response = await fetch('/api/threads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: ThreadResponse = await response.json();
      if (data.thread) {
        setThreads(prev => [...prev, data.thread]);
        setCurrentThread(data.thread.id);
        setMessages([]);
        return data.thread;
      }
    } catch (error) {
      console.error('Error creating thread:', error);
    }
  };

  const deleteThread = async (threadId: string) => {
    try {
      const response = await fetch(`/api/threads?threadId=${threadId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      setThreads(prev => prev.filter(thread => thread.id !== threadId));
      if (currentThread === threadId) {
        setCurrentThread(null);
        setMessages([]);
      }
    } catch (error) {
      console.error('Error deleting thread:', error);
    }
  };

  const loadMessages = async (threadId: string) => {
    try {
      const response = await fetch(`/api/messages?threadId=${threadId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: MessagesResponse = await response.json();
      setMessages(data.messages || []);
      setCurrentThread(threadId);
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const saveMessages = async (threadId: string, newMessages: Message[]) => {
    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ threadId, messages: newMessages }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: MessagesResponse = await response.json();
      setMessages(data.messages);
    } catch (error) {
      console.error('Error saving messages:', error);
    }
  };

  return {
    threads,
    currentThread,
    messages,
    loading,
    loadThreads,
    createNewThread,
    deleteThread,
    loadMessages,
    saveMessages,
    setCurrentThread,
    setMessages,
  };
}