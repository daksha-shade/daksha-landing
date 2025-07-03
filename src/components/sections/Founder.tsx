import Card from '../ui/Card';

export default function Founder() {
  return (
    <section id="about" className="py-20 bg-gradient-to-br from-purple-50 to-indigo-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            From the <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Founder</span>
          </h2>
        </div>
        
        {/* Founder quote card */}
        <Card className="p-8 sm:p-12 text-center">
          <div className="mb-6">
            <div className="w-16 h-16 mx-auto bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl text-white">👤</span>
            </div>
          </div>
          
          <blockquote className="text-xl sm:text-2xl text-gray-700 italic leading-relaxed mb-8">
            "Daksha was born from a need — not just for productivity, but for presence. 
            It's not just about doing more. It's about becoming more… consciously."
          </blockquote>
          
          <div className="border-t border-gray-200 pt-6">
            <p className="text-lg font-semibold text-gray-900">Shaswat Raj</p>
            <p className="text-gray-600">Founder & CEO</p>
          </div>
        </Card>
        
        {/* Future vision */}
        <div className="mt-16 text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            🔮 The Future is <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Agentic</span>
          </h3>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Daksha is just the beginning. Soon, you'll be able to build your own sacred agents, 
            train them with your values, and let them act — in harmony with you.
          </p>
        </div>
      </div>
    </section>
  );
}