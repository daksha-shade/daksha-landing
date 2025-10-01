import { type ThreadHistoryAdapter, type ThreadMessage } from '@assistant-ui/react';

export class APIThreadHistoryAdapter implements ThreadHistoryAdapter {
  constructor(private threadId: string) {}

  async load(): Promise<{ messages: { message: ThreadMessage; parentId: string | null }[] }> {
    try {
      if (!this.threadId) {
        return { messages: [] };
      }

      const response = await fetch(`/api/threads/${this.threadId}/messages`);
      if (!response.ok) {
        throw new Error(`Failed to load messages: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error loading thread messages:', error);
      return { messages: [] };
    }
  }

  async append(item: { message: ThreadMessage; parentId: string | null }): Promise<void> {
    try {
      if (!this.threadId) {
        console.warn('Cannot save message - thread ID not set');
        return;
      }

      const response = await fetch(`/api/threads/${this.threadId}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      });

      if (!response.ok) {
        throw new Error(`Failed to save message: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error saving message:', error);
      throw error;
    }
  }
}

// Factory function to create adapters
export const createThreadHistoryAdapter = (threadId: string): ThreadHistoryAdapter => {
  return new APIThreadHistoryAdapter(threadId);
};