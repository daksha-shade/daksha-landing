'use client';

import { motion } from 'framer-motion';

const featuresList = [
  {
    icon: "🧠",
    title: "AI-Powered Journaling",
    description: "Auto-analyze, organize, and revisit your thoughts in meaningful ways"
  },
  {
    icon: "💬",
    title: "Emotional Chat Companion",
    description: "Vent, reflect, or talk — Daksha listens like a therapist and responds like a wise friend"
  },
  {
    icon: "⏳",
    title: "Life Timeline",
    description: "Visualize your growth, memories, and moods across weeks and months"
  },
  {
    icon: "🧩",
    title: "Custom Skills (Agent Modules)",
    description: "Add powerful features like productivity coaching, dream tracking, creative brainstorming, and more"
  },
  {
    icon: "🔒",
    title: "Offline-First & Privacy-Focused",
    description: "Your data stays yours. End-to-end encryption and optional local storage"
  },
  {
    icon: "🎙️",
    title: "Voice-Enabled & Multimodal",
    description: "Type, speak, or draw — Daksha adapts to you"
  }
];

export function FeaturesList() {
  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 to-indigo-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Features You'll 
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent"> Love</span>
          </h2>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuresList.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
            >
              <div className="text-3xl mb-3">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}