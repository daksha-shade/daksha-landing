'use client';

import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from '@/components/ai-elements/conversation';
import { Message, MessageContent } from '@/components/ai-elements/message';
import {
  PromptInput,
  PromptInputActionAddAttachments,
  PromptInputActionMenu,
  PromptInputActionMenuContent,
  PromptInputActionMenuTrigger,
  PromptInputAttachment,
  PromptInputAttachments,
  PromptInputBody,
  PromptInputButton,
  type PromptInputMessage,
  PromptInputModelSelect,
  PromptInputModelSelectContent,
  PromptInputModelSelectItem,
  PromptInputModelSelectTrigger,
  PromptInputModelSelectValue,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputTools,
} from '@/components/ai-elements/prompt-input';
import {
  Actions,
  ActionsTrigger,
  ActionsContent,
} from '@/components/ai-elements/actions';
import {
  Sources,
  SourcesTrigger,
  SourcesContent,
  Source,
} from '@/components/ai-elements/sources';
import { Reasoning } from '@/components/ai-elements/reasoning';
import { Response } from '@/components/ai-elements/response';
import { Loader } from '@/components/ai-elements/loader';
import { Suggestion } from '@/components/ai-elements/suggestion';
import { Tool } from '@/components/ai-elements/tool';

import { useState } from 'react';
import { useChat } from '@ai-sdk/react';
import { GlobeIcon, Database } from 'lucide-react';

const models = [
  {
    name: 'GPT-4o',
    value: 'openai/gpt-4o',
  },
  {
    name: 'GPT-4o Mini',
    value: 'openai/gpt-4o-mini',
  },
  {
    name: 'Claude 3.5 Sonnet',
    value: 'anthropic/claude-3-5-sonnet-20241022',
  },
];

const suggestions = [
  "When is my birthday?",
  "What are the latest trends in AI?",
  "How does machine learning work?",
  "Explain quantum computing",
  "Best practices for React development",
  "Tell me about TypeScript benefits",
  "How to optimize database queries?",
  "What is the difference between SQL and NoSQL?",
];

export default function ChatPage() {
  const [input, setInput] = useState('');
  const [model, setModel] = useState<string>(models[0].value);
  const [webSearch, setWebSearch] = useState(false);
  const [contextSearch, setContextSearch] = useState(true);
  
  const { messages, sendMessage, status } = useChat({
    api: '/api/chat',
  });

  const handleSubmit = (message: PromptInputMessage) => {
    const hasText = Boolean(message.text);
    const hasAttachments = Boolean(message.files?.length);

    if (!(hasText || hasAttachments)) {
      return;
    }

    sendMessage(
      {
        text: message.text || 'Sent with attachments',
        files: message.files,
      },
      {
        body: {
          model: model,
          webSearch: webSearch,
          contextSearch: contextSearch,
        },
      },
    );
    setInput('');
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  return (
    <div className="flex flex-col h-screen w-full max-w-4xl mx-auto p-6">
      <div className="flex-1 overflow-hidden">
        <Conversation className="h-full">
          <ConversationContent>
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full space-y-6">
                <div className="text-center space-y-2">
                  <h1 className="text-3xl font-bold text-foreground">Welcome to Daksha</h1>
                  <p className="text-muted-foreground">
                    Your intelligent AI research assistant. Ask me anything!
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-3 max-w-2xl w-full">
                  {suggestions.map((suggestion, index) => (
                    <Suggestion
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="cursor-pointer"
                    >
                      {suggestion}
                    </Suggestion>
                  ))}
                </div>
              </div>
            )}

            {messages.map((message) => (
              <div key={message.id}>
                {/* Show sources if available */}
                {message.role === 'assistant' && 
                 message.parts.filter((part) => part.type === 'source-url').length > 0 && (
                  <Sources>
                    <SourcesTrigger
                      count={
                        message.parts.filter((part) => part.type === 'source-url').length
                      }
                    />
                    {message.parts.filter((part) => part.type === 'source-url').map((part, i) => (
                      <SourcesContent key={`${message.id}-${i}`}>
                        <Source
                          key={`${message.id}-${i}`}
                          href={part.url}
                          title={part.url}
                        />
                      </SourcesContent>
                    ))}
                  </Sources>
                )}

                {/* Render message parts */}
                {message.parts.map((part, i) => {
                  switch (part.type) {
                    case 'text':
                      return (
                        <Message key={`${message.id}-${i}`} from={message.role}>
                          <MessageContent>
                            <Response>{part.text}</Response>
                          </MessageContent>
                          {message.role === 'assistant' && (
                            <Actions>
                              <ActionsTrigger />
                              <ActionsContent />
                            </Actions>
                          )}
                        </Message>
                      );

                    case 'reasoning':
                      return (
                        <Reasoning key={`${message.id}-${i}`}>
                          {part.text}
                        </Reasoning>
                      );

                    case 'tool-call':
                      return (
                        <Tool
                          key={`${message.id}-${i}`}
                          tool={part.toolName}
                          status="completed"
                        >
                          Tool: {part.toolName}
                        </Tool>
                      );

                    default:
                      return null;
                  }
                })}
              </div>
            ))}

            {/* Show loader when AI is thinking */}
            {status === 'loading' && (
              <Message from="assistant">
                <MessageContent>
                  <Loader />
                </MessageContent>
              </Message>
            )}

            <ConversationScrollButton />
          </ConversationContent>

          {/* Input area */}
          <PromptInput onSubmit={handleSubmit} className="mt-4" globalDrop multiple>
            <PromptInputBody>
              <PromptInputAttachments>
                {(attachment) => <PromptInputAttachment data={attachment} />}
              </PromptInputAttachments>
              <PromptInputTextarea
                onChange={(e) => setInput(e.target.value)}
                value={input}
                placeholder="Ask me anything..."
              />
            </PromptInputBody>
            
            <PromptInputToolbar>
              <PromptInputTools>
                <PromptInputActionMenu>
                  <PromptInputActionMenuTrigger />
                  <PromptInputActionMenuContent>
                    <PromptInputActionAddAttachments />
                  </PromptInputActionMenuContent>
                </PromptInputActionMenu>
                
                <PromptInputButton
                  variant={webSearch ? 'default' : 'ghost'}
                  onClick={() => setWebSearch(!webSearch)}
                >
                  <GlobeIcon size={16} />
                  <span>Web Search</span>
                </PromptInputButton>

                <PromptInputButton
                  variant={contextSearch ? 'default' : 'ghost'}
                  onClick={() => setContextSearch(!contextSearch)}
                >
                  <Database size={16} />
                  <span>Context</span>
                </PromptInputButton>

                <PromptInputModelSelect
                  onValueChange={(value) => {
                    setModel(value);
                  }}
                  value={model}
                >
                  <PromptInputModelSelectTrigger>
                    <PromptInputModelSelectValue />
                  </PromptInputModelSelectTrigger>
                  <PromptInputModelSelectContent>
                    {models.map((model) => (
                      <PromptInputModelSelectItem key={model.value} value={model.value}>
                        {model.name}
                      </PromptInputModelSelectItem>
                    ))}
                  </PromptInputModelSelectContent>
                </PromptInputModelSelect>
              </PromptInputTools>
              
              <PromptInputSubmit />
            </PromptInputToolbar>
          </PromptInput>
        </Conversation>
      </div>
    </div>
  );
}