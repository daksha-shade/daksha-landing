import { Metadata } from 'next';
import { AppsInterface } from '@/components/apps/apps-interface';

export const metadata: Metadata = {
  title: 'Connected Apps - Daksha',
  description: 'Connect and manage your favorite apps with Daksha AI. Integrate Google Calendar, Gmail, Spotify, GitHub, and more to create a unified digital experience.',
  keywords: ['app integrations', 'connected apps', 'Google Calendar', 'Gmail', 'Spotify', 'GitHub', 'productivity apps', 'Daksha'],
  openGraph: {
    title: 'Connected Apps - Daksha',
    description: 'Connect and manage your favorite apps with Daksha AI',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Connected Apps - Daksha',
    description: 'Connect and manage your favorite apps with Daksha AI',
  },
};

export default function AppsPage() {
  return <AppsInterface />;
}