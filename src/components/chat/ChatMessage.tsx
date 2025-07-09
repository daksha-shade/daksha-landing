"use client"

import { useState } from 'react'
import { 
  Bot, 
  User, 
  Copy, 
  Star, 
  RefreshCw, 
  Paperclip, 
  Cpu, 
  TrendingUp, 
  Eye, 
  Database,
  ChevronDown,
  ChevronUp,
  ExternalLink
} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface Message {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
  type?: 'text' | 'code' | 'analysis' | 'suggestion' | 'task'
  metadata?: {
    thinking?: string
    sources?: string[]
    confidence?: number
    processingTime?: number
    tokens?: number
  }
  attachments?: Array<{
    type: 'image' | 'file' | 'audio' | 'video'
    name: string
    url: string
    size?: number
  }>
}

interface ChatMessageProps {
  message: Message
  showThinking: boolean
  onCopy?: () => void
  onStar?: () => void
  onRegenerate?: () => void
}

export default function ChatMessage({ 
  message, 
  showThinking, 
  onCopy, 
  onStar, 
  onRegenerate 
}: ChatMessageProps) {
  const [showSources, setShowSources] = useState(false)
  const [showThinkingDetails, setShowThinkingDetails] = useState(false)
  
  const isUser = message.role === 'user'
  
  const handleCopy = () => {
    navigator.clipboard.writeText(message.content)
    onCopy?.()
  }

  const renderMarkdown = (content: string) => {
    return (
      <div className="prose prose-sm dark:prose-invert max-w-none">
        <ReactMarkdown
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '')
              return !inline && match ? (
                <SyntaxHighlighter
                  style={oneDark}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className="bg-muted px-1 py-0.5 rounded text-sm" {...props}>
                  {children}
                </code>
              )
            },
          h1: ({ children }) => <h1 className="text-xl font-bold mb-3">{children}</h1>,
          h2: ({ children }) => <h2 className="text-lg font-semibold mb-2">{children}</h2>,
          h3: ({ children }) => <h3 className="text-base font-medium mb-2">{children}</h3>,
          p: ({ children }) => <p className="mb-2 leading-relaxed">{children}</p>,
          ul: ({ children }) => <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>,
          li: ({ children }) => <li className="ml-2">{children}</li>,
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-primary pl-4 italic my-2 text-muted-foreground">
              {children}
            </blockquote>
          ),
          strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
          em: ({ children }) => <em className="italic">{children}</em>,
          a: ({ href, children }) => (
            <a 
              href={href} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline inline-flex items-center gap-1"
            >
              {children}
              <ExternalLink className="w-3 h-3" />
            </a>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
      </div>
    )
  }
  
  return (
    <div className={cn("flex gap-3 mb-6", isUser ? "justify-end" : "justify-start")}>
      {!isUser && (
        <Avatar className="w-8 h-8 mt-1">
          <AvatarFallback className="bg-primary text-primary-foreground">
            <Bot className="w-4 h-4" />
          </AvatarFallback>
        </Avatar>
      )}
      
      <div className={cn("max-w-[80%] space-y-2", isUser ? "items-end" : "items-start")}>
        <div className={cn(
          "rounded-2xl px-4 py-3",
          isUser 
            ? "bg-primary text-primary-foreground ml-auto" 
            : "bg-muted"
        )}>
          {isUser ? (
            <div className="whitespace-pre-wrap text-sm">{message.content}</div>
          ) : (
            <div className="text-sm">
              {renderMarkdown(message.content)}
            </div>
          )}
          
          {message.attachments && message.attachments.length > 0 && (
            <div className="mt-3 space-y-2">
              {message.attachments.map((attachment, index) => (
                <div key={index} className="flex items-center gap-2 text-xs opacity-80 bg-black/10 rounded p-2">
                  <Paperclip className="w-3 h-3" />
                  <span>{attachment.name}</span>
                  {attachment.size && (
                    <span className="text-muted-foreground">
                      ({(attachment.size / 1024).toFixed(1)} KB)
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Message Metadata */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{message.timestamp.toLocaleTimeString()}</span>
          
          {message.metadata && !isUser && (
            <>
              <Separator orientation="vertical" className="h-3" />
              <div className="flex items-center gap-1">
                <Cpu className="w-3 h-3" />
                <span>{message.metadata.processingTime}s</span>
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                <span>{message.metadata.confidence}%</span>
              </div>
              {message.metadata.tokens && (
                <div className="flex items-center gap-1">
                  <span>{message.metadata.tokens} tokens</span>
                </div>
              )}
            </>
          )}
          
          {!isUser && (
            <div className="flex items-center gap-1">
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-5 w-5 p-0 hover:bg-muted-foreground/10"
                onClick={handleCopy}
              >
                <Copy className="w-3 h-3" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-5 w-5 p-0 hover:bg-muted-foreground/10"
                onClick={onStar}
              >
                <Star className="w-3 h-3" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-5 w-5 p-0 hover:bg-muted-foreground/10"
                onClick={onRegenerate}
              >
                <RefreshCw className="w-3 h-3" />
              </Button>
            </div>
          )}
        </div>
        
        {/* AI Thinking Process */}
        {message.metadata?.thinking && showThinking && !isUser && (
          <div className="space-y-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-6 px-2 text-xs gap-1"
              onClick={() => setShowThinkingDetails(!showThinkingDetails)}
            >
              <Eye className="w-3 h-3" />
              AI Thinking Process
              {showThinkingDetails ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </Button>
            
            {showThinkingDetails && (
              <div className="text-xs bg-blue-50 dark:bg-blue-950/20 rounded-lg p-3 border border-blue-200 dark:border-blue-800">
                <div className="font-medium text-blue-900 dark:text-blue-100 mb-2 flex items-center gap-1">
                  <Bot className="w-3 h-3" />
                  Thinking Process
                </div>
                <div className="text-blue-800 dark:text-blue-200 whitespace-pre-wrap">
                  {message.metadata.thinking}
                </div>
              </div>
            )}
          </div>
        )}
        
        {/* Sources */}
        {message.metadata?.sources && showThinking && !isUser && (
          <div className="space-y-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-6 px-2 text-xs gap-1"
              onClick={() => setShowSources(!showSources)}
            >
              <Database className="w-3 h-3" />
              Sources ({message.metadata.sources.length})
              {showSources ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </Button>
            
            {showSources && (
              <div className="text-xs bg-muted/50 rounded-lg p-3 border">
                <div className="font-medium mb-2">Data Sources Used:</div>
                <ul className="space-y-1">
                  {message.metadata.sources.map((source, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Database className="w-3 h-3 text-muted-foreground" />
                      <span>{source}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
        
        {/* Message Type Badge */}
        {message.type && message.type !== 'text' && !isUser && (
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {message.type === 'analysis' && '📊 Analysis'}
              {message.type === 'suggestion' && '💡 Suggestion'}
              {message.type === 'task' && '✅ Task'}
              {message.type === 'code' && '💻 Code'}
            </Badge>
          </div>
        )}
      </div>
      
      {isUser && (
        <Avatar className="w-8 h-8 mt-1">
          <AvatarFallback className="bg-secondary">
            <User className="w-4 h-4" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  )
}