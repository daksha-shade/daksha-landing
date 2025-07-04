'use client';

import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-14">
          {/* Logo - Notion style */}
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 bg-gray-900 rounded-md flex items-center justify-center">
              <span className="text-white font-medium text-sm">D</span>
            </div>
            <span className="text-lg font-medium text-gray-900 font-inter">
              Daksha
            </span>
          </div>

          {/* Desktop Navigation - Notion style */}
          <nav className="hidden md:flex items-center space-x-1">
            <a href="#features" className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-all duration-200">
              Features
            </a>
            <a href="#about" className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-all duration-200">
              About
            </a>
            <a href="https://mvp.daksha.live" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-all duration-200">
              MVP
            </a>
          </nav>

          {/* Desktop CTA - Notion style */}
          <div className="hidden md:block">
            <a 
              href="https://tally.so/r/wLN5e2"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-1.5 text-sm font-medium text-gray-700 bg-pink-100 hover:bg-pink-200 rounded-md transition-all duration-200 border border-pink-200 hover:border-pink-300"
            >
              Join Waitlist
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-1.5 hover:bg-gray-100 rounded-md transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-3 border-t border-gray-200/50">
            <div className="flex flex-col space-y-1">
              <a href="#features" className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-all duration-200">
                Features
              </a>
              <a href="#about" className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-all duration-200">
                About
              </a>
              <a href="https://mvp.daksha.live" target="_blank" rel="noopener noreferrer" className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-all duration-200">
                MVP
              </a>
              <a 
                href="https://tally.so/r/wLN5e2"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-pink-100 hover:bg-pink-200 rounded-md transition-all duration-200 border border-pink-200"
              >
                Join Waitlist
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}