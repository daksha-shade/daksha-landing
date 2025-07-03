'use client';

import { motion } from 'framer-motion';

export function Future() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="mb-8">
            <div className="w-16 h-16 mx-auto bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center">
              <span className="text-2xl text-white">🔮</span>
            </div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            The Future is 
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent"> Agentic</span>
          </h2>
          
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Daksha is just the beginning.
          </p>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Soon, you'll be able to build your own sacred agents, train them with your values, 
            and let them act — in harmony with you.
          </p>
        </motion.div>
      </div>
    </section>
  );
}