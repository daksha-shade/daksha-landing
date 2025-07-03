import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import Features from '@/components/sections/Features';
import ProductFeatures from '@/components/sections/ProductFeatures';
import Audience from '@/components/sections/Audience';
import Founder from '@/components/sections/Founder';
import CTA from '@/components/sections/CTA';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Features />
        <ProductFeatures />
        <Audience />
        <Founder />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
