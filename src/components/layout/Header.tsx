'use client';

import { useState } from 'react';
import ThemeToggle from '../ui/ThemeToggle';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex items-center justify-between h-12">
          {/* Logo - Notion style */}
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-foreground rounded-sm flex items-center justify-center">
              <span className="text-background font-medium text-xs">D</span>
            </div>
            <span className="text-base font-medium text-foreground font-inter">
              Daksha
            </span>
          </div>

          {/* Desktop Navigation - Notion style */}
          <nav className="hidden md:flex items-center space-x-1">
            <a href="#features" className="px-2 py-1 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-sm transition-all duration-150">
              Features
            </a>
            <a href="#about" className="px-2 py-1 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-sm transition-all duration-150">
              About
            </a>
            <a href="https://mvp.daksha.live" target="_blank" rel="noopener noreferrer" className="px-2 py-1 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-sm transition-all duration-150">
              MVP
            </a>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-2">
            <ThemeToggle />
            <a 
              href="https://tally.so/r/wLN5e2"
              target="_blank"
              rel="noopener noreferrer"
              className="notion-button notion-button-primary text-xs px-3 py-1.5"
            >
              Join Waitlist
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              className="p-1 hover:bg-accent rounded-sm transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-2 border-t border-border">
            <div className="flex flex-col space-y-1">
              <a href="#features" className="px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-sm transition-all duration-150">
                Features
              </a>
              <a href="#about" className="px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-sm transition-all duration-150">
                About
              </a>
              <a href="https://mvp.daksha.live" target="_blank" rel="noopener noreferrer" className="px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-sm transition-all duration-150">
                MVP
              </a>
              <a 
                href="https://tally.so/r/wLN5e2"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 notion-button notion-button-primary text-xs justify-center"
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