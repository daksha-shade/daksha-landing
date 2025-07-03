const audiences = [
  {
    icon: '🎓',
    title: 'Students',
    description: 'Managing studies & stress'
  },
  {
    icon: '💼',
    title: 'Professionals',
    description: 'Balancing ambition & burnout'
  },
  {
    icon: '🎨',
    title: 'Creators',
    description: 'Fighting creative blocks'
  },
  {
    icon: '🧘‍♀️',
    title: 'Seekers',
    description: 'Finding clarity, growth, or peace'
  }
];

export default function Audience() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Built for <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Everyone</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Whether you're navigating life's challenges or pursuing growth, Daksha adapts to your unique journey.
          </p>
        </div>
        
        {/* Audience grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {audiences.map((audience, index) => (
            <div key={index} className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-full flex items-center justify-center">
                <span className="text-3xl">{audience.icon}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{audience.title}</h3>
              <p className="text-gray-600">{audience.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}