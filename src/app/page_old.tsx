/* eslint-disable react/no-unescaped-entities */
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        {/* Hero Section - Organized */}
        <section className="min-h-screen flex items-center justify-center bg-background pt-16">
          <div className="notion-page text-center py-16">
            {/* Logo/Icon */}
            <div className="mb-8 flex justify-center">
              <div className="w-16 h-16 bg-foreground rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-background font-bold text-2xl font-serif">D</span>
              </div>
            </div>

            {/* Main Title */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-4 leading-tight font-serif">
              Daksha
            </h1>
            
            {/* Subtitle */}
            <h2 className="text-xl sm:text-2xl font-medium text-muted-foreground mb-8 font-inter">
              Your Mind, Organized. Your Life, Enhanced.
            </h2>
            
            {/* Key Value Props */}
            <div className="  rounded-xl   mb-8 max-w-2xl mx-auto">
              <div className="flex flex-wrap justify-center gap-4 text-sm font-medium">
                <span className="bg-background px-3 py-1 rounded-full border border-border">✨ Journaling-first</span>
                <span className="bg-background px-3 py-1 rounded-full border border-border">🧠 AI-powered</span>
                <span className="bg-background px-3 py-1 rounded-full border border-border">🔄 Replace dozen apps</span>
              </div>
            </div>

            {/* Main Description */}
            <p className="text-lg text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed font-inter">
              The only app you'll ever need for your thoughts, memories, and ideas. 
              <br className="hidden sm:block" />
              A journaling-first, AI-powered life OS that grows with you.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <a 
                href="https://tally.so/r/wLN5e2"
                target="_blank"
                rel="noopener noreferrer"
                className="notion-button notion-button-primary px-8 py-4 text-base font-medium"
              >
                Join the Waitlist
              </a>
              <a 
                href="https://mvp.daksha.live"
                target="_blank"
                rel="noopener noreferrer"
                className="notion-button px-8 py-4 text-base font-medium"
              >
                Try MVP
              </a>
            </div>

            {/* Social Proof */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>320+ early adopters</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-border"></div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>100+ active testers</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-border"></div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                <span>Coming soon</span>
              </div>
            </div>
          </div>
        </section>

        {/* Why Daksha Section */}
        <section className="py-24 bg-muted" id="features">
          <div className="notion-page">
            <h2 className="notion-title font-serif text-center mb-12">
              📌 Why Daksha?
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-card p-6 rounded-lg border border-border card-hover">
                <h3 className="text-lg font-semibold mb-3 font-inter">🧠 Think Freely, Remember Forever</h3>
                <p className="notion-text">Capture notes, thoughts, dreams, and journal entries. Daksha remembers, reflects, and connects them intelligently.</p>
              </div>
              <div className="bg-card p-6 rounded-lg border border-border card-hover">
                <h3 className="text-lg font-semibold mb-3 font-inter">📷 Unlimited Memories</h3>
                <p className="notion-text">Store unlimited photos, videos, documents, and voice notes with AI-organized search, auto-tagging, and life timelines.</p>
              </div>
              <div className="bg-card p-6 rounded-lg border border-border card-hover">
                <h3 className="text-lg font-semibold mb-3 font-inter">🧩 Replace Multiple Apps</h3>
                <p className="notion-text">Forget app-switching. Daksha replaces Google Photos, Drive, Notion, Obsidian, Day One, ChatGPT, Replika, Todoist, and more...</p>
              </div>
              <div className="bg-card p-6 rounded-lg border border-border card-hover">
                <h3 className="text-lg font-semibold mb-3 font-inter">🪄 AI That Gets You</h3>
                <p className="notion-text">Your AI evolves with your thoughts. Ask it anything about your past, your ideas, your journal, or your goals — it knows your context.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Table */}
        <section className="py-24">
          <div className="notion-page">
            <h2 className="notion-title font-serif text-center mb-12">
              🔍 Features at a Glance
            </h2>
            <div className="bg-card rounded-lg border border-border overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
                <div className="p-6 card-hover">
                  <h3 className="font-semibold mb-2 font-inter">✍️ Intelligent Journaling</h3>
                  <p className="notion-text text-sm">Write freely. Daksha reflects and summarizes beautifully.</p>
                </div>
                <div className="p-6 card-hover">
                  <h3 className="font-semibold mb-2 font-inter">📂 Unlimited Cloud Storage</h3>
                  <p className="notion-text text-sm">Store videos, photos, docs, voice notes. Forever.</p>
                </div>
                <div className="p-6 card-hover">
                  <h3 className="font-semibold mb-2 font-inter">🧠 Memory Graph</h3>
                  <p className="notion-text text-sm">Your own second brain. See connections between past thoughts.</p>
                </div>
                <div className="p-6 card-hover">
                  <h3 className="font-semibold mb-2 font-inter">💬 Smart Conversations</h3>
                  <p className="notion-text text-sm">Ask Daksha about your past, future plans, or ideas.</p>
                </div>
                <div className="p-6 card-hover">
                  <h3 className="font-semibold mb-2 font-inter">📆 Timeline View</h3>
                  <p className="notion-text text-sm">A visual graph of your life across memories and entries.</p>
                </div>
                <div className="p-6 card-hover">
                  <h3 className="font-semibold mb-2 font-inter">🛠️ Plugin System</h3>
                  <p className="notion-text text-sm">Extend Daksha with apps you love (coming soon).</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-24 bg-muted">
          <div className="notion-page">
            <h2 className="notion-title font-serif text-center mb-12">
              👀 Real Use Cases
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card p-6 rounded-lg border border-border card-hover">
                <p className="notion-text">A startup founder journaling his roadmap, reviewing past decisions with AI insight</p>
              </div>
              <div className="bg-card p-6 rounded-lg border border-border card-hover">
                <p className="notion-text">A student storing all notes, voice memos, and emotional entries in one place</p>
              </div>
              <div className="bg-card p-6 rounded-lg border border-border card-hover">
                <p className="notion-text">A creator auto-organizing photos, thoughts, and voice notes into storyboards</p>
              </div>
              <div className="bg-card p-6 rounded-lg border border-border card-hover">
                <p className="notion-text">A traveler storing unlimited media & journaling experiences day by day</p>
              </div>
            </div>
          </div>
        </section>

        {/* Privacy */}
        <section className="py-24">
          <div className="notion-page text-center">
            <h2 className="notion-title font-serif mb-8">
              🔐 Privacy First, Always
            </h2>
            <div className="max-w-2xl mx-auto space-y-4">
              <p className="notion-text">• End-to-end encryption for all personal data</p>
              <p className="notion-text">• You own your data. Export everything anytime</p>
              <p className="notion-text">• Offline-first features for complete control</p>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 bg-muted">
          <div className="notion-page">
            <h2 className="notion-title font-serif text-center mb-12">
              💬 What People Say
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-card p-6 rounded-lg border border-border card-hover">
                <p className="notion-text italic mb-4">"This feels like the future of personal knowledge management."</p>
                <p className="text-sm text-muted-foreground">— Early Beta Tester</p>
              </div>
              <div className="bg-card p-6 rounded-lg border border-border card-hover">
                <p className="notion-text italic mb-4">"Daksha helped me reflect deeper and stay organized. Better than 5 apps I used daily."</p>
                <p className="text-sm text-muted-foreground">— YC Applicant Reviewer</p>
              </div>
            </div>
          </div>
        </section>

        {/* About Founder */}
        <section className="py-24" id="about">
          <div className="notion-page text-center">
            <h2 className="notion-title font-serif mb-8">
              🧑‍💻 Built by People Who Needed This
            </h2>
            <div className="max-w-3xl mx-auto">
              <p className="notion-text text-lg mb-6">
                Daksha was born out of necessity — a personal quest to build a tool that understands not just what we store, but why we store it.
              </p>
              <p className="notion-text">
                Our founder used to write diaries in a language he invented to keep them private. That same desire for intelligent, personal privacy and reflection drives Daksha today.
              </p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 bg-muted">
          <div className="notion-page text-center">
            <h2 className="notion-title font-serif mb-6">
              🙌 Join the Movement
            </h2>
            <p className="notion-text text-lg mb-8 max-w-2xl mx-auto">
              Daksha is more than a product. It's a philosophy. We're building a tool that respects your mind and enhances your life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://tally.so/r/wLN5e2"
                target="_blank"
                rel="noopener noreferrer"
                className="notion-button notion-button-primary px-8 py-4 text-base"
              >
                🚀 Join the Waitlist
              </a>
              <a
                href="https://mvp.daksha.live"
                target="_blank"
                rel="noopener noreferrer"
                className="notion-button px-8 py-4 text-base"
              >
                👀 Explore Features
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}