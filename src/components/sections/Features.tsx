import Card from '../ui/Card';

const features = [
  {
    icon: '🧘',
    title: 'Emotional Intelligence at Its Core',
    description: 'Daksha doesn\'t just respond — it feels. From subtle mood shifts to life-altering insights, it helps you process emotions with empathy and understanding.'
  },
  {
    icon: '📓',
    title: 'Smart Journaling that Grows With You',
    description: 'Write freely. Daksha auto-tags thoughts, spots emotional patterns, tracks mental trends, and offers gentle nudges when you need them most.'
  },
  {
    icon: '🤖',
    title: 'Agentic Autonomy Like Jarvis',
    description: 'Not just reactive — Daksha is proactive. Think reminders, suggestions, idea generation, and life navigation — fully personalized and secure.'
  },
  {
    icon: '🌱',
    title: 'Sacred + Scientific',
    description: 'Inspired by ancient wisdom and powered by modern AI, Daksha merges mindfulness and machine learning for inner and outer harmony.'
  }
];

export default function Features() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            What Makes Daksha <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Unique?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Daksha isn't just another AI app. It's your personal sacred companion, built to understand your life, emotions, and ambitions.
          </p>
        </div>
        
        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <Card key={index} hover className="p-8">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}