export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-background">
      <div className="notion-page text-center py-24">
        {/* Main heading */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight font-serif">
          Daksha
        </h1>
        
        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed font-inter">
          Your journaling, agentic life companion & MindOS
        </p>
        
        {/* CTA Button */}
        <div className="flex justify-center">
          <a 
            href="https://tally.so/r/wLN5e2"
            target="_blank"
            rel="noopener noreferrer"
            className="notion-button notion-button-primary px-6 py-3 text-sm"
          >
            Join Waitlist
          </a>
        </div>
      </div>
    </section>
  );
}