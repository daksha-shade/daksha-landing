import { Button } from "@/components/ui/button"
import { ArrowRight, Eye } from "lucide-react"
import Link from "next/link"

export default function CTASection() {
  return (
    <section className="text-center space-y-6 max-w-6xl mx-auto py-16 px-4">
      <div className="bg-gradient-to-r from-primary/10 to-purple-500/10 p-8 rounded-lg border">
        <h2 className="notion-title font-serif text-2xl font-bold mb-4">
          Join the Movement
        </h2>
        <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto leading-relaxed font-inter">
          Daksha is more than a product. It&apos;s a philosophy. We&apos;re building a tool that respects your mind and enhances your life.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="font-medium">
            <a
              href="https://tally.so/r/wLN5e2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ArrowRight className="w-4 h-4 mr-2" />
              Join the Waitlist
            </a>
          </Button>
          <Button asChild variant="notion" size="lg" className="font-medium">
            <Link href="/usecases">
              <Eye className="w-4 h-4 mr-2" />
              Explore Usecases
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}