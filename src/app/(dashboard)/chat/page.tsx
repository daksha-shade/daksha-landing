import { Metadata } from 'next';
import { ChatInterface } from '@/components/chat/chat-interface';

export const metadata: Metadata = {
  title: 'Chat - Daksha AI Assistant',
  description: 'Interact with Daksha, your intelligent AI assistant. Get help with productivity, writing, research, and more through natural conversation.',
  keywords: ['AI chat', 'assistant', 'productivity', 'writing help', 'research assistant', 'Daksha'],
  openGraph: {
    title: 'Chat with Daksha AI Assistant',
    description: 'Intelligent AI assistant for productivity, writing, and research',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Chat with Daksha AI Assistant',
    description: 'Intelligent AI assistant for productivity, writing, and research',
  },
};

export default function ChatPage() {
  return <ChatInterface />;
}