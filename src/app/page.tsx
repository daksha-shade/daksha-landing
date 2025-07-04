import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        
        {/* Features Section - Notion Style */}
        <section className="py-24 bg-muted">
          <div className="notion-page">
            <h2 className="notion-title font-serif text-center mb-8">
              Features
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-card p-6 rounded-lg border border-border">
                <h3 className="text-lg font-semibold mb-3 font-inter">Smart Journaling</h3>
                <p className="notion-text">AI-powered insights from your daily thoughts and experiences.</p>
              </div>
              <div className="bg-card p-6 rounded-lg border border-border">
                <h3 className="text-lg font-semibold mb-3 font-inter">Life Companion</h3>
                <p className="notion-text">Your personal AI that grows and learns with you over time.</p>
              </div>
              <div className="bg-card p-6 rounded-lg border border-border">
                <h3 className="text-lg font-semibold mb-3 font-inter">MindOS</h3>
                <p className="notion-text">A complete operating system for your mental and emotional wellbeing.</p>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-24">
          <div className="notion-page">
            <h2 className="notion-title font-serif text-center mb-8" id="about">
              About Daksha
            </h2>
            <div className="max-w-3xl mx-auto text-center">
              <p className="notion-text text-lg mb-6">
                Daksha represents the future of personal AI companions. More than just a journaling app, 
                it's an intelligent system that understands your thoughts, emotions, and goals.
              </p>
              <p className="notion-text">
                Built with cutting-edge AI technology, Daksha learns from your interactions to provide 
                personalized insights, emotional support, and guidance for your personal growth journey.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-muted">
          <div className="notion-page text-center">
            <h2 className="notion-title font-serif mb-6">
              Ready to begin?
            </h2>
            <p className="notion-text text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of users who are already transforming their lives with Daksha.
            </p>
            <a 
              href="https://tally.so/r/wLN5e2"
              target="_blank"
              rel="noopener noreferrer"
              className="notion-button notion-button-primary px-8 py-4 text-base"
            >
              Join Waitlist
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
