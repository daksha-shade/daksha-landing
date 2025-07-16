'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '../ui/button';
import ThemeToggle from '../ui/ThemeToggle';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex items-center justify-between h-12">
          {/* Logo - Notion style */}
            <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="w-6 h-6 bg-foreground rounded-sm flex items-center justify-center">
              <span className="text-background font-medium text-xs">D</span>
            </div>
            <span className="text-base font-medium text-foreground font-inter">
              Daksha
            </span>
            </Link>

          {/* Desktop Navigation - Notion style */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link href="/#features" className="px-2 py-1 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-sm transition-all duration-150">
              Features
            </Link>
            <Link href="/usecases" className="px-2 py-1 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-sm transition-all duration-150">
              Use Cases
            </Link>
            <Link href="/#about" className="px-2 py-1 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-sm transition-all duration-150">
              About
            </Link>
            <Link href="/app" rel="noopener noreferrer" className="px-2 py-1 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-sm transition-all duration-150">
              Preview
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-2">
            <ThemeToggle />
            <Link
              href="https://tally.so/r/wLN5e2"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2 py-1 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-sm transition-all duration-150"
            >
              Join Waitlist
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              className="p-1 hover:bg-accent rounded-sm transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-4 h-4 text-muted-foreground" />
              ) : (
                <Menu className="w-4 h-4 text-muted-foreground" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-2 border-t border-border">
            <div className="flex flex-col space-y-1">
              <Link href="#features" className="px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-sm transition-all duration-150">
                Features
              </Link>
              <Link href="/usecases" className="px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-sm transition-all duration-150">
                Use Cases
              </Link>
              <Link href="#about" className="px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-sm transition-all duration-150">
                About
              </Link>
              <Link href="/app" rel="noopener noreferrer" className="px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-sm transition-all duration-150">
                Preview
              </Link>
              <Link
                href="https://tally.so/r/wLN5e2"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 w-full justify-center"
              >
                Join Waitlist
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}