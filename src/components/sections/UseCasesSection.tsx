import { NotionCard, NotionCardContent, NotionCardDescription } from "@/components/ui/notion-card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Lightbulb } from "lucide-react"

const useCases = [
  "A startup founder journaling his roadmap, reviewing past decisions with AI insight",
  "A student storing all notes, voice memos, and emotional entries in one place",
  "A creator auto-organizing photos, thoughts, and voice notes into storyboards",
  "A traveler storing unlimited media & journaling experiences day by day"
]

export default function UseCasesSection() {
  return (
    <section className="py-24 bg-muted">
      <div className="notion-page">
        <div className="text-center mb-12">
          <h2 className="notion-title font-serif text-center mb-4">
            Real Use Cases
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            See how different people use Daksha to transform their daily lives
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {useCases.map((useCase, index) => (
            <NotionCard key={index}>
              <NotionCardContent className="p-6">
                <NotionCardDescription className="text-base leading-relaxed">
                  {useCase}
                </NotionCardDescription>
              </NotionCardContent>
            </NotionCard>
          ))}
        </div>
        
        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-background p-6 rounded-lg border border-border max-w-xl mx-auto mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Lightbulb className="w-5 h-5 text-primary" />
              <p className="text-base font-medium text-foreground">
                Want to see more detailed scenarios?
              </p>
            </div>
            <p className="text-sm text-muted-foreground">
              Explore comprehensive use cases with real prompts and AI responses
            </p>
          </div>
          
          <Button 
            href="/usecases"
            size="lg"
            className="font-medium"
          >
            <ArrowRight className="w-4 h-4 mr-2" />
            Explore All Use Cases
          </Button>
        </div>
      </div>
    </section>
  )
}