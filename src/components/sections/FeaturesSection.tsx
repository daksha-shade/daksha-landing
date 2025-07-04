import { NotionCard, NotionCardContent, NotionCardDescription, NotionCardHeader, NotionCardTitle } from "@/components/ui/notion-card"
import { Brain, Camera, Puzzle, Wand2 } from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "Think Freely, Remember Forever",
    description: "Capture notes, thoughts, dreams, and journal entries. Daksha remembers, reflects, and connects them intelligently."
  },
  {
    icon: Camera,
    title: "Unlimited Memories",
    description: "Store unlimited photos, videos, documents, and voice notes with AI-organized search, auto-tagging, and life timelines."
  },
  {
    icon: Puzzle,
    title: "Replace Multiple Apps",
    description: "Forget app-switching. Daksha replaces Google Photos, Drive, Notion, Obsidian, Day One, ChatGPT, Replika, Todoist, and more."
  },
  {
    icon: Wand2,
    title: "AI That Gets You",
    description: "Your AI evolves with your thoughts. Ask it anything about your past, your ideas, your journal, or your goals — it knows your context."
  }
]

export default function FeaturesSection() {
  return (
    <section className="py-24 bg-muted" id="features">
      <div className="notion-page">
        <h2 className="notion-title font-serif text-center mb-12">
          Why Daksha?
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <NotionCard key={index}>
                <NotionCardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-muted rounded-md">
                      <IconComponent className="w-5 h-5 text-foreground" />
                    </div>
                    <NotionCardTitle className="text-lg">
                      {feature.title}
                    </NotionCardTitle>
                  </div>
                </NotionCardHeader>
                <NotionCardContent>
                  <NotionCardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </NotionCardDescription>
                </NotionCardContent>
              </NotionCard>
            )
          })}
        </div>
      </div>
    </section>
  )
}