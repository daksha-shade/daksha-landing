"use client";

import { Button } from "@/components/ui/button";
import { Heart, Sparkles, Clock, MessageCircle } from 'lucide-react';
import Link from 'next/link';

export default function ComingSoonPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-background to-accent/10 p-4">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Icon */}
        <div className="mx-auto w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
          <Clock className="w-12 h-12 text-primary" />
        </div>
        
        {/* Heading */}
        <h1 className="text-3xl font-serif font-bold tracking-tight">
          Coming Soon
        </h1>
        
        {/* Message */}
        <div className="space-y-4">
          <p className="text-lg text-muted-foreground">
            I'm waiting for you also desperately ❤️
          </p>
          <p className="text-sm text-muted-foreground/80">
            We're working hard to bring you something amazing. Stay tuned!
          </p>
        </div>
        
        {/* Waitlist Button */}
        <div className="pt-4">
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link href="https://tally.so/r/wLN5e2" target="_blank" rel="noopener noreferrer">
              <Sparkles className="w-4 h-4 mr-2" />
              Join the Waitlist
            </Link>
          </Button>
        </div>
        
        {/* Decorative Elements */}
        <div className="flex justify-center space-x-4 pt-8">
          <Heart className="w-5 h-5 text-pink-500 animate-pulse" />
          <MessageCircle className="w-5 h-5 text-blue-500 animate-pulse" style={{ animationDelay: '0.5s' }} />
          <Sparkles className="w-5 h-5 text-yellow-500 animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
      </div>
    </div>
  );
}
