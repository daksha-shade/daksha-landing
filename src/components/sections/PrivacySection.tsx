import { Shield, Download, Wifi } from "lucide-react"

const privacyFeatures = [
  {
    icon: Shield,
    text: "End-to-end encryption for all personal data"
  },
  {
    icon: Download,
    text: "You own your data. Export everything anytime"
  },
  {
    icon: Wifi,
    text: "Offline-first features for complete control"
  }
]

export default function PrivacySection() {
  return (
    <section className="py-24">
      <div className="notion-page text-center">
        <h2 className="notion-title font-serif mb-8">
          Privacy First, Always
        </h2>
        <div className="max-w-2xl mx-auto space-y-6">
          {privacyFeatures.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <div key={index} className="flex items-center gap-4 text-left">
                <div className="p-2 bg-muted rounded-md">
                  <IconComponent className="w-5 h-5 text-foreground" />
                </div>
                <p className="text-base text-muted-foreground font-inter">
                  {feature.text}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}