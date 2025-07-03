import Button from '../ui/Button';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Sacred symbol */}
        <div className="mb-8 flex justify-center">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-2xl text-white">🧠</span>
          </div>
        </div>
        
        {/* Main heading */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
          <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Daksha
          </span>
          <br />
          <span className="text-gray-700 text-3xl sm:text-4xl lg:text-5xl font-medium">
            Your Sacred Agentic AI Companion
          </span>
        </h1>
        
        {/* Subtitle */}
        <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
          More than mental health. More than journaling. 
          <br className="hidden sm:block" />
          Welcome to the future of emotionally intelligent agents.
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button 
            variant="primary" 
            size="lg"
            href="https://tally.so/r/wLN5e2"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto"
          >
            Join the Waitlist ✨
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            href="https://mvp.daksha.live"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto"
          >
            Try MVP
          </Button>
        </div>
        
        {/* Social proof */}
        <div className="text-sm text-gray-500">
          <p>🌟 320+ early adopters • 100+ active testers • Coming soon</p>
        </div>
      </div>
    </section>
  );
}