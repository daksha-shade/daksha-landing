import Button from '../ui/Button';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-white">
      {/* Simple background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob animation-delay-2000"></div>
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main heading */}
        <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold text-gray-900 mb-8 leading-tight font-playfair">
          Daksha
        </h1>
        
        {/* Subtitle */}
        <p className="text-xl sm:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed font-inter">
          Your journaling, agentic life companion & MindOS
        </p>
        
        {/* CTA Button */}
        <div className="flex justify-center">
          <Button 
            variant="primary" 
            size="lg"
            href="https://tally.so/r/wLN5e2"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-pink-200 text-gray-800 hover:bg-pink-300 border-0 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Join Waitlist
          </Button>
        </div>
      </div>
    </section>
  );
}