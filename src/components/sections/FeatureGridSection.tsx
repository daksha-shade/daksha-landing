import { NotionCard } from "@/components/ui/notion-card"
import { Edit3, HardDrive, Network, MessageCircle, Calendar, Plug } from "lucide-react"

const featureGrid = [
  {
    icon: Edit3,
    title: "Intelligent Journaling",
    description: "Write freely. Daksha reflects and summarizes beautifully."
  },
  {
    icon: HardDrive,
    title: "Unlimited Cloud Storage",
    description: "Store videos, photos, docs, voice notes. Forever."
  },
  {
    icon: Network,
    title: "Memory Graph",
    description: "Your own second brain. See connections between past thoughts."
  },
  {
    icon: MessageCircle,
    title: "Smart Conversations",
    description: "Ask Daksha about your past, future plans, or ideas."
  },
  {
    icon: Calendar,
    title: "Timeline View",
    description: "A visual graph of your life across memories and entries."
  },
  {
    icon: Plug,
    title: "Plugin System",
    description: "Extend Daksha with apps you love"
  }
]

export default function FeatureGridSection() {
  return (
    <section className="py-24">
      <div className="notion-page">
        <h2 className="notion-title font-serif text-center mb-12">
          Features at a Glance
        </h2>
        <NotionCard className="overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
            {featureGrid.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div key={index} className="p-6 card-hover">
                  <div className="flex items-start gap-3">
                    <div className="p-1.5 bg-muted rounded-md mt-0.5">
                      <IconComponent className="w-4 h-4 text-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 font-inter">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </NotionCard>
      </div>
    </section>
  )
}