import Button from '../ui/Button';

export default function CTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-purple-600 to-indigo-600">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Sacred symbol */}
        <div className="mb-8 flex justify-center">
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <span className="text-2xl">🌿</span>
          </div>
        </div>
        
        {/* Main CTA */}
        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
          Try Daksha. Align with Yourself.
        </h2>
        
        <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
          Join the waitlist to be among the first to experience the future of emotionally intelligent AI companions.
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Button 
            variant="secondary" 
            size="lg"
            href="https://tally.so/r/wLN5e2"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto"
          >
            Join the Waitlist
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            href="https://mvp.daksha.live"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-purple-600"
          >
            Try MVP
          </Button>
        </div>
        
        {/* Status */}
        <div className="text-purple-200">
          <p className="text-lg font-medium">Currently in early access</p>
          <p className="text-sm mt-2">320+ early adopters • 100+ active testers</p>
        </div>
      </div>
    </section>
  );
}