import { 
  ThreadMessageLike, 
  ChatModelRunResult
} from '@assistant-ui/react';
import { db } from '@/db/client';
import { threads, messages } from '@/db/schema';
import { eq } from 'drizzle-orm';

export class CustomAssistantRuntime {
  private threadId: string | null = null;
  private messages: ThreadMessageLike[] = [];
  private listeners: (() => void)[] = [];
  private isRunning = false;

  constructor() {
    // Initialize with an empty thread
    this.createNewThread();
  }

  private createNewThread() {
    this.threadId = crypto.randomUUID();
    this.messages = [];
    this.notifyListeners();
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener());
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

  public async switchToThread(threadId: string) {
    this.threadId = threadId;
    await this.loadMessagesFromDB();
  }

  public async switchToNewThread() {
    this.createNewThread();
    await this.saveThreadToDB('New Chat');
  }

  private async loadMessagesFromDB() {
    if (!this.threadId) return;

    try {
      const threadMessages = await db
        .select()
        .from(messages)
        .where(eq(messages.threadId, this.threadId))
        .orderBy(messages.createdAt);

      this.messages = threadMessages.map(msg => ({
        id: msg.id,
        role: msg.role as 'user' | 'assistant',
        content: msg.content as ThreadUserContent | ThreadAssistantContent,
      }));

      this.notifyListeners();
    } catch (error) {
      console.error('Error loading messages from DB:', error);
    }
  }

  private async saveThreadToDB(title: string) {
    if (!this.threadId) return;

    try {
      await db
        .insert(threads)
        .values({
          id: this.threadId,
          userId: 'anonymous', // In a real app, get from auth
          title,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .onConflictDoNothing();
    } catch (error) {
      console.error('Error saving thread to DB:', error);
    }
  }

  private async saveMessagesToDB() {
    if (!this.threadId || this.messages.length === 0) return;

    try {
      // Save all messages to DB
      const messagesToSave = this.messages
        .filter(msg => msg.id) // Only save messages with IDs
        .map(msg => ({
          id: msg.id!,
          threadId: this.threadId!,
          role: msg.role,
          content: JSON.stringify(msg.content), // Serialize content
          createdAt: new Date(),
        }));

      if (messagesToSave.length > 0) {
        await db
          .insert(messages)
          .values(messagesToSave)
          .onConflictDoNothing();
      }
    } catch (error) {
      console.error('Error saving messages to DB:', error);
    }
  }

  public async addMessage(message: ThreadMessageLike) {
    this.messages = [...this.messages, message];
    this.notifyListeners();
    await this.saveMessagesToDB();
  }

  public async startRun(
    _messages: ThreadMessageLike[],
    _options: {
      onResponse?: (response: ChatModelRunResult) => void;
      onFinish?: () => void;
      onError?: (error: Error) => void;
    }
  ) {
    // This would be implemented to call your AI API
    // For now, we'll just simulate a response
    this.isRunning = true;
    this.notifyListeners();
    
    // Simulate AI response delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    this.isRunning = false;
    this.notifyListeners();
  }

  public async cancelRun() {
    this.isRunning = false;
    this.notifyListeners();
  }

  public async editMessage(messageId: string, content: ThreadUserContent) {
    this.messages = this.messages.map(msg => 
      msg.id === messageId ? { ...msg, content } : msg
    );
    this.notifyListeners();
    await this.saveMessagesToDB();
  }

  public async deleteMessage(messageId: string) {
    this.messages = this.messages.filter(msg => msg.id !== messageId);
    this.notifyListeners();
    await this.saveMessagesToDB();
  }
}