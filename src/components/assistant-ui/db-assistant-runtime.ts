import { 
  ThreadMessageLike, 
  ChatModelRunResult
} from '@assistant-ui/react';

interface DbAssistantRuntimeOptions {
  onNewThread?: () => void;
}

interface MessagesResponse {
  messages: ThreadMessageLike[];
}

export class DbAssistantRuntime {
  private messages: ThreadMessageLike[] = [];
  private listeners: (() => void)[] = [];
  private isRunning = false;
  private currentThreadId: string | null = null;
  private onNewThreadCallback?: () => void;

  constructor(options?: DbAssistantRuntimeOptions) {
    this.onNewThreadCallback = options?.onNewThread;
  }

  public setThreadId(threadId: string) {
    this.currentThreadId = threadId;
  }

  // AssistantRuntime interface methods
  public get messagesSnapshot() {
    return this.messages;
  }

  public get isRunningSnapshot() {
    return this.isRunning;
  }

  public subscribe(callback: () => void) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(listener => listener !== callback);
    };
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener());
  }

  public async addMessage(message: ThreadMessageLike) {
    this.messages = [...this.messages, message];
    this.notifyListeners();
    
    // Save to database
    if (this.currentThreadId) {
      try {
        await fetch('/api/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            threadId: this.currentThreadId, 
            messages: [message] 
          }),
        });
      } catch (error) {
        console.error('Error saving message to DB:', error);
      }
    }
  }

  public async startRun(
    messages: ThreadMessageLike[],
    options: {
      onResponse?: (response: ChatModelRunResult) => void;
      onFinish?: () => void;
      onError?: (error: Error) => void;
    }
  ) {
    this.isRunning = true;
    this.notifyListeners();
    
    try {
      // Call the AI API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages }),
      });

      if (!response.body) {
        throw new Error('Response body is null');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      
      let assistantResponse = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.choices?.[0]?.delta?.content) {
                const content = data.choices[0].delta.content;
                assistantResponse += content;
                
                // Create a temporary message to show streaming
                const tempMessage: ThreadMessageLike = {
                  id: 'temp-' + Date.now(),
                  role: 'assistant',
                  content: [{ type: 'text', text: assistantResponse }]
                };
                
                // Replace the last message with the updated one
                this.messages = [...this.messages.slice(0, -1), tempMessage];
                this.notifyListeners();
              }
            } catch (e) {
              // Ignore parsing errors
            }
          }
        }
      }

      // Create the final assistant message
      const assistantMessage: ThreadMessageLike = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: [{ type: 'text', text: assistantResponse }]
      };

      // Add the final assistant message
      this.messages = [...this.messages.slice(0, -1), assistantMessage];
      this.notifyListeners();
      
      // Save to database
      if (this.currentThreadId) {
        await fetch('/api/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            threadId: this.currentThreadId, 
            messages: [assistantMessage] 
          }),
        });
      }

      options.onFinish?.();
    } catch (error) {
      console.error('Error in startRun:', error);
      options.onError?.(error instanceof Error ? error : new Error('Unknown error'));
    } finally {
      this.isRunning = false;
      this.notifyListeners();
    }
  }

  public async cancelRun() {
    this.isRunning = false;
    this.notifyListeners();
  }

  public async editMessage(messageId: string, content: any) {
    this.messages = this.messages.map(msg => 
      msg.id === messageId ? { ...msg, content } : msg
    );
    this.notifyListeners();
    
    // Update in database
    if (this.currentThreadId) {
      try {
        // This would require a PUT endpoint to update messages
        // For now, we'll just save all messages
        await fetch('/api/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            threadId: this.currentThreadId, 
            messages: this.messages 
          }),
        });
      } catch (error) {
        console.error('Error updating message in DB:', error);
      }
    }
  }

  public async deleteMessage(messageId: string) {
    this.messages = this.messages.filter(msg => msg.id !== messageId);
    this.notifyListeners();
    
    // Update in database
    if (this.currentThreadId) {
      try {
        // This would require a DELETE endpoint for messages
        // For now, we'll just save all messages
        await fetch('/api/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            threadId: this.currentThreadId, 
            messages: this.messages 
          }),
        });
      } catch (error) {
        console.error('Error deleting message from DB:', error);
      }
    }
  }

  public async switchToThread(threadId: string) {
    this.currentThreadId = threadId;
    try {
      const response = await fetch(`/api/messages?threadId=${threadId}`);
      const data: MessagesResponse = await response.json();
      this.messages = data.messages || [];
      this.notifyListeners();
    } catch (error) {
      console.error('Error loading messages:', error);
      this.messages = [];
      this.notifyListeners();
    }
  }

  public async switchToNewThread() {
    this.currentThreadId = crypto.randomUUID();
    this.messages = [];
    this.notifyListeners();
    this.onNewThreadCallback?.();
    
    // Create thread in database
    try {
      await fetch('/api/threads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          title: 'New Chat',
          id: this.currentThreadId
        }),
      });
    } catch (error) {
      console.error('Error creating thread in DB:', error);
    }
  }
}