import { NotionCard, NotionCardContent, NotionCardDescription } from "@/components/ui/notion-card"

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
        <h2 className="notion-title font-serif text-center mb-12">
          Real Use Cases
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
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
      </div>
    </section>
  )
}