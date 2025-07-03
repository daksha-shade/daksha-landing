import Card from '../ui/Card';

const productFeatures = [
  {
    icon: '🧠',
    title: 'AI-Powered Journaling',
    description: 'Auto-analyze, organize, and revisit your thoughts in meaningful ways'
  },
  {
    icon: '💬',
    title: 'Emotional Chat Companion',
    description: 'Vent, reflect, or talk — Daksha listens like a therapist and responds like a wise friend'
  },
  {
    icon: '⏳',
    title: 'Life Timeline',
    description: 'Visualize your growth, memories, and moods across weeks and months'
  },
  {
    icon: '🧩',
    title: 'Custom Skills (Agent Modules)',
    description: 'Add powerful features like productivity coaching, dream tracking, creative brainstorming, and more'
  },
  {
    icon: '🔒',
    title: 'Offline-First & Privacy-Focused',
    description: 'Your data stays yours. End-to-end encryption and optional local storage'
  },
  {
    icon: '🎙️',
    title: 'Voice-Enabled & Multimodal',
    description: 'Type, speak, or draw — Daksha adapts to you'
  }
];

export default function ProductFeatures() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Features You'll <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Love</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Every feature is designed to help you grow, reflect, and take meaningful action in your life.
          </p>
        </div>
        
        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productFeatures.map((feature, index) => (
            <Card key={index} hover className="p-6 text-center">
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}