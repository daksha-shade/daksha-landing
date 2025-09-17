import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import FeatureGridSection from '@/components/sections/FeatureGridSection';
import PromptsSection from '@/components/sections/PromptsSection';
import UseCasesSection from '@/components/sections/UseCasesSection';
import PrivacySection from '@/components/sections/PrivacySection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import AboutSection from '@/components/sections/AboutSection';
import CTASection from '@/components/sections/CTASection';

export const metadata: Metadata = {
  title: 'Daksha - Your Second Brain | AI-Powered Life OS',
  description: 'Journaling-first, AI-powered life OS designed to store, reflect, and act - replacing apps like Notion, Google Photos, Drive, and ChatGPT with a single intuitive companion.',
  keywords: ['journaling', 'AI', 'productivity', 'life OS', 'personal assistant', 'note taking', 'memory', 'reflection'],
  openGraph: {
    title: 'Daksha - Your Mind, Organized. Your Life, Enhanced.',
    description: 'Journaling-first, AI-powered life OS designed to store, reflect, and act - replacing apps like Notion, Google Photos, Drive, and ChatGPT with a single intuitive companion.',
    url: 'https://daksha.live',
    siteName: 'Daksha',
    images: [
      {
        url: '/icon-512x512.png',
        width: 512,
        height: 512,
        alt: 'Daksha Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Daksha - Your Mind, Organized. Your Life, Enhanced.',
    description: 'Journaling-first, AI-powered life OS designed to store, reflect, and act - replacing apps like Notion, Google Photos, Drive, and ChatGPT with a single intuitive companion.',
    images: ['/icon-512x512.png'],
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <FeatureGridSection />
        <PromptsSection />
        <UseCasesSection />
        <PrivacySection />
        <TestimonialsSection />
        <AboutSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}