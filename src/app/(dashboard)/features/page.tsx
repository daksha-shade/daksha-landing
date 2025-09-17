import { Metadata } from 'next';
import { FeaturesInterface } from '@/components/features/features-interface';

export const metadata: Metadata = {
  title: 'Features Roadmap - Daksha',
  description: 'Explore Daksha\'s comprehensive feature roadmap. See what\'s implemented, planned, and under consideration for your AI-powered life OS.',
  keywords: ['features', 'roadmap', 'AI features', 'productivity tools', 'development roadmap', 'Daksha'],
  openGraph: {
    title: 'Features Roadmap - Daksha',
    description: 'Explore Daksha\'s comprehensive feature roadmap and development plans',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Features Roadmap - Daksha',
    description: 'Explore Daksha\'s comprehensive feature roadmap and development plans',
  },
};

export default function FeaturesPage() {
  return <FeaturesInterface />;
}