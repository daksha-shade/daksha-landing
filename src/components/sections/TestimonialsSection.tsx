import { NotionCard, NotionCardContent, NotionCardDescription } from "@/components/ui/notion-card"
import { Quote } from "lucide-react"

const testimonials = [
  {
    quote: "This feels like the future of personal knowledge management.",
    author: "Early Beta Tester"
  },
  {
    quote: "Daksha helped me reflect deeper and stay organized. Better than 5 apps I used daily.",
    author: "Anonymous Student"
  }
]

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-muted">
      <div className="notion-page">
        <h2 className="notion-title font-serif text-center mb-12">
          What People Say
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <NotionCard key={index}>
              <NotionCardContent className="p-6">
                <div className="flex items-start gap-3">
                  <Quote className="w-5 h-5 text-muted-foreground mt-1 flex-shrink-0" />
                  <div>
                    <NotionCardDescription className="text-base italic mb-4 leading-relaxed">
                      {testimonial.quote}
                    </NotionCardDescription>
                    <p className="text-sm text-muted-foreground font-medium">
                      — {testimonial.author}
                    </p>
                  </div>
                </div>
              </NotionCardContent>
            </NotionCard>
          ))}
        </div>
      </div>
    </section>
  )
}