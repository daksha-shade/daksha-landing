"use client"

import { useRef, useState } from 'react'
import { Send, Paperclip, Mic, Image, FileText, Code, Smile } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

interface ChatInputProps {
  value: string
  onChange: (value: string) => void
  onSend: () => void
  isProcessing: boolean
  selectedCapabilities: string[]
  onAttachment?: (file: File) => void
  onVoiceInput?: () => void
}

export default function ChatInput({
  value,
  onChange,
  onSend,
  isProcessing,
  selectedCapabilities,
  onAttachment,
  onVoiceInput
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false)

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onSend()
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && onAttachment) {
      onAttachment(file)
    }
    setShowAttachmentMenu(false)
  }

  const insertTemplate = (template: string) => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const newValue = value.substring(0, start) + template + value.substring(end)
    
    onChange(newValue)
    
    // Set cursor position after template
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + template.length, start + template.length)
    }, 0)
  }

  const quickTemplates = [
    { label: 'Analyze', template: 'Analyze my ' },
    { label: 'Summarize', template: 'Summarize my recent ' },
    { label: 'Compare', template: 'Compare my progress on ' },
    { label: 'Suggest', template: 'Suggest ways to improve my ' },
    { label: 'Plan', template: 'Help me plan my ' },
    { label: 'Review', template: 'Review my ' }
  ]

  return (
    <div className="p-4 border-t border-border">
      <div className="max-w-4xl mx-auto">
        {/* Quick Templates */}
        <div className="flex items-center gap-2 mb-3 overflow-x-auto pb-2">
          <span className="text-xs text-muted-foreground whitespace-nowrap">Quick:</span>
          {quickTemplates.map((template) => (
            <Button
              key={template.label}
              variant="outline"
              size="sm"
              className="h-6 text-xs whitespace-nowrap"
              onClick={() => insertTemplate(template.template)}
            >
              {template.label}
            </Button>
          ))}
        </div>

        <div className="relative">
          <Textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Ask me anything about your journal, goals, memories, or get help with analysis and insights..."
            className="min-h-[60px] max-h-[200px] resize-none pr-24 py-4"
            onKeyDown={handleKeyDown}
          />
          
          <div className="absolute bottom-3 right-3 flex items-center gap-1">
            {/* Attachment Menu */}
            <Popover open={showAttachmentMenu} onOpenChange={setShowAttachmentMenu}>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Paperclip className="w-4 h-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-48 p-2" align="end">
                <div className="space-y-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start gap-2"
                    onClick={() => {
                      fileInputRef.current?.click()
                    }}
                  >
                    <FileText className="w-4 h-4" />
                    Upload File
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start gap-2"
                    onClick={() => {
                      // Handle image upload
                      setShowAttachmentMenu(false)
                    }}
                  >
                    <Image className="w-4 h-4" />
                    Upload Image
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start gap-2"
                    onClick={() => {
                      insertTemplate('```\n\n```')
                      setShowAttachmentMenu(false)
                    }}
                  >
                    <Code className="w-4 h-4" />
                    Code Block
                  </Button>
                </div>
              </PopoverContent>
            </Popover>

            {/* Voice Input */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0"
              onClick={onVoiceInput}
            >
              <Mic className="w-4 h-4" />
            </Button>

            {/* Send Button */}
            <Button 
              onClick={onSend}
              disabled={!value.trim() || isProcessing}
              size="sm"
              className="h-8 w-8 p-0"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleFileSelect}
            accept=".txt,.md,.pdf,.doc,.docx,.json"
          />
        </div>
        
        {/* Footer Info */}
        <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <span>Press Enter to send, Shift+Enter for new line</span>
            <div className="flex items-center gap-1">
              <span>Context: {selectedCapabilities.length} capabilities active</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              GPT-4 Turbo
            </Badge>
            <Badge variant="outline" className="text-xs">
              Context-Aware
            </Badge>
          </div>
        </div>
      </div>
    </div>
  )
}