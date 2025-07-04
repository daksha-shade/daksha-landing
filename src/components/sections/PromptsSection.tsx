import { NotionCard, NotionCardContent, NotionCardDescription, NotionCardHeader, NotionCardTitle } from "@/components/ui/notion-card"
import { Button } from "@/components/ui/Button"
import { 
  PenTool, 
  Brain, 
  MessageCircle, 
  Search, 
  Target, 
  Shuffle,
  ArrowRight,
  Lightbulb
} from "lucide-react"

const promptCategories = [
  {
    icon: PenTool,
    title: "Journaling & Reflection",
    prompts: [
      "Summarize my thoughts from the last 7 days.",
      "What have I been anxious about lately?",
      "Compare how I felt this month vs. last month.",
      "Write a reflective letter to my future self."
    ]
  },
  {
    icon: Brain,
    title: "Knowledge & Memory",
    prompts: [
      "What ideas did I journal related to AI startups?",
      "Show me all entries where I mentioned 'self-doubt'.",
      "When was the last time I felt truly proud?",
      "Remind me what I was working on in March 2024."
    ]
  },
  {
    icon: MessageCircle,
    title: "Conversations with Context",
    prompts: [
      "Hey Daksha, help me continue this thought...",
      "Why do I always feel overwhelmed on Sundays?",
      "Can you turn this raw idea into a blog post?",
      "What's the pattern behind my motivation dips?"
    ]
  },
  {
    icon: Search,
    title: "Storage + Smart Search",
    prompts: [
      "Find that voice note I recorded during the Delhi trip.",
      "Show me all documents tagged 'college' and 'startup'.",
      "Find a photo from when I felt most confident.",
      "List all PDFs I uploaded this month."
    ]
  },
  {
    icon: Target,
    title: "Productivity & Planning",
    prompts: [
      "Summarize my weekly plan and suggest improvements.",
      "What goals did I miss last quarter?",
      "Break this goal into daily tasks.",
      "Track my consistency for the 30-day challenge."
    ]
  },
  {
    icon: Shuffle,
    title: "Cross-functional Magic",
    prompts: [
      "Link my startup ideas with my mood logs.",
      "Create a timeline of my emotional highs & lows.",
      "Remind me of things that bring me joy when I'm low.",
      "Can you write me a journal entry based on today's mood?"
    ]
  }
]

export default function PromptsSection() {
  return (
    <section className="py-24">
      <div className="notion-page">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Lightbulb className="w-8 h-8 text-primary" />
            <h2 className="notion-title font-serif">
              What Can Daksha Do?
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed font-inter">
            Daksha isn't just an app — it's your second brain, your memory graph, your personal AI. Here's what you can ask it:
          </p>
        </div>

        {/* Prompt Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {promptCategories.map((category, index) => {
            const IconComponent = category.icon
            return (
              <NotionCard key={index} className="h-full">
                <NotionCardHeader>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-muted rounded-md">
                      <IconComponent className="w-5 h-5 text-foreground" />
                    </div>
                    <NotionCardTitle className="text-base">
                      {category.title}
                    </NotionCardTitle>
                  </div>
                </NotionCardHeader>
                <NotionCardContent>
                  <div className="space-y-3">
                    {category.prompts.map((prompt, promptIndex) => (
                      <div 
                        key={promptIndex}
                        className="p-3 bg-muted rounded-md border border-border hover:bg-accent transition-colors cursor-pointer group"
                      >
                        <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors font-inter">
                          "{prompt}"
                        </p>
                      </div>
                    ))}
                  </div>
                </NotionCardContent>
              </NotionCard>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="bg-muted p-8 rounded-xl border border-border max-w-2xl mx-auto mb-8">
            <p className="text-lg font-medium text-foreground mb-2 font-inter">
              Daksha understands your language, your context, and your past.
            </p>
            <p className="text-base text-muted-foreground font-inter">
              The more you use it, the more powerful it becomes.
            </p>
          </div>
          
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
        </div>
      </div>
    </section>
  )
}