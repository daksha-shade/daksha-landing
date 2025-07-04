import { Button } from "@/components/ui/Button"
import { ArrowRight, Eye } from "lucide-react"

export default function CTASection() {
  return (
    <section className="py-24 bg-muted">
      <div className="notion-page text-center">
        <h2 className="notion-title font-serif mb-6">
          Join the Movement
        </h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed font-inter">
          Daksha is more than a product. It's a philosophy. We're building a tool that respects your mind and enhances your life.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            href="https://tally.so/r/wLN5e2"
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
            className="font-medium"
          >
            <ArrowRight className="w-4 h-4 mr-2" />
            Join the Waitlist
          </Button>
          <Button 
            href="https://mvp.daksha.live"
            target="_blank"
            rel="noopener noreferrer"
            variant="notion"
            size="lg"
            className="font-medium"
          >
            <Eye className="w-4 h-4 mr-2" />
            Explore Features
          </Button>
        </div>
      </div>
    </section>
  )
}