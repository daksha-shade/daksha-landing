'use client';

import { useChat } from '@ai-sdk/react';
import { Conversation, ConversationContent, ConversationScrollButton } from './conversation';
import { Message, MessageContent, MessageAvatar } from './message';
import { PromptInput, PromptInputTextarea, PromptInputToolbar, PromptInputSubmit } from './prompt-input';
import { Button } from './ui/button';
import { PlusIcon, MessageSquareIcon } from 'lucide-react';

export function Chatbot() {
  const chat = useChat() as any;
  const { messages, input, handleInputChange, handleSubmit, isLoading, reload } = chat;

  const handleNewChat = () => {
    window.location.reload();
  };

  return (
    <div className="flex h-screen w-full bg-background">
      {/* Sidebar */}
      <div className="w-64 bg-muted/30 border-r flex flex-col">
        <div className="p-3">
          <Button 
            onClick={handleNewChat}
            className="w-full justify-start gap-2"
            variant="outline"
          >
            <PlusIcon className="size-4" />
            New chat
          </Button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-3">
          <div className="space-y-2">
            <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/50 text-sm">
              <MessageSquareIcon className="size-4" />
              Current Chat
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b p-4">
          <h1 className="text-lg font-semibold">ChatGPT</h1>
        </div>

        {/* Messages */}
        <Conversation className="flex-1">
          <ConversationContent className="max-w-4xl mx-auto">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center space-y-4">
                  <div className="text-4xl">💬</div>
                  <h2 className="text-2xl font-semibold">How can I help you today?</h2>
                  <p className="text-muted-foreground">Start a conversation by typing a message below.</p>
                </div>
              </div>
            ) : (
              messages.map((message: any) => (
                <Message key={message.id} from={message.role}>
                  <MessageAvatar 
                    src={message.role === 'user' ? '/user-avatar.png' : '/ai-avatar.png'}
                    name={message.role === 'user' ? 'You' : 'AI'}
                  />
                  <MessageContent className="prose prose-sm max-w-none">
                    {message.content}
                  </MessageContent>
                </Message>
              ))
            )}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>

        {/* Input Area */}
        <div className="border-t p-4">
          <div className="max-w-4xl mx-auto">
            <PromptInput onSubmit={handleSubmit}>
              <PromptInputTextarea
                value={input}
                onChange={handleInputChange}
                placeholder="Message ChatGPT..."
                className="min-h-[52px]"
              />
              <PromptInputToolbar>
                <div />
                <PromptInputSubmit 
                  status={isLoading ? 'streaming' : 'ready'}
                  disabled={!input.trim()}
                />
              </PromptInputToolbar>
            </PromptInput>
            
            <p className="text-xs text-muted-foreground text-center mt-2">
              ChatGPT can make mistakes. Check important info.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
