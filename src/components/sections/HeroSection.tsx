/* eslint-disable react/no-unescaped-entities */
import { Button } from "@/components/ui/button"
import { Brain, Sparkles, RotateCcw } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-background pt-16">
      <div className="notion-page text-center py-16">
        {/* Logo/Icon */}
        <div className="mb-8 flex justify-center">
          <div className="w-16 h-16 bg-foreground rounded-lg flex items-center justify-center shadow-lg">
            <span className="text-background font-bold text-2xl font-serif">D</span>
          </div>
        </div>

        {/* Main Title */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-4 leading-tight font-serif">
          Daksha
        </h1>

        {/* Subtitle */}
        <h2 className="text-xl sm:text-2xl font-medium text-muted-foreground mb-8 font-inter">
          Your Mind, Organized. Your Life, Enhanced.
        </h2>

        {/* Key Value Props */}
        <div className=" mb-8 max-w-2xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4 text-sm font-medium">
            <span className="bg-background px-3 py-1 rounded-full border border-border flex items-center gap-2">
              <Sparkles className="w-3 h-3" />
              Journaling-first
            </span>
            <span className="bg-background px-3 py-1 rounded-full border border-border flex items-center gap-2">
              <Brain className="w-3 h-3" />
              AI-powered
            </span>
            <span className="bg-background px-3 py-1 rounded-full border border-border flex items-center gap-2">
              <RotateCcw className="w-3 h-3" />
              Replace dozen apps
            </span>
          </div>
        </div>

        {/* Main Description */}
        <p className="text-lg text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed font-inter">
          The only app you'll ever need for your thoughts, memories, and ideas.
          <br className="hidden sm:block" />
          A journaling-first, AI-powered life OS that grows with you.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button
            href="https://tally.so/r/wLN5e2"
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
            className="font-medium"
          >
            Join the Waitlist
          </Button>
          <Button
            href="/app"
            // target="_blank"
            rel="noopener noreferrer"
            variant="notion"
            size="lg"
            className="font-medium"
          >
            Try MVP
          </Button>
        </div>

        {/* Social Proof */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>320+ early adopters</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-border"></div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>100+ active testers</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-border"></div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
            <span>Coming soon</span>
          </div>
        </div>
      </div>
    </section>
  )
}