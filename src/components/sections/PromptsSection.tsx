"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  PenTool,
  Brain,
  MessageCircle,
  Search,
  Target,
  Shuffle,
  ArrowRight,
  Lightbulb,
  Copy,
  Sparkles
} from "lucide-react"
import Link from "next/link"

const promptCategories = [
  {
    id: "journaling",
    icon: PenTool,
    title: "Journaling",
    prompts: [
      "Summarize my thoughts from the last 7 days.",
      "What have I been anxious about lately?",
      "Compare how I felt this month vs. last month.",
      "Write a reflective letter to my future self."
    ]
  },
  {
    id: "memory",
    icon: Brain,
    title: "Memory",
    prompts: [
      "What ideas did I journal related to AI startups?",
      "Show me all entries where I mentioned 'self-doubt'.",
      "When was the last time I felt truly proud?",
      "Remind me what I was working on in March 2024."
    ]
  },
  {
    id: "conversations",
    icon: MessageCircle,
    title: "Conversations",
    prompts: [
      "Hey Daksha, help me continue this thought...",
      "Why do I always feel overwhelmed on Sundays?",
      "Can you turn this raw idea into a blog post?",
      "What's the pattern behind my motivation dips?"
    ]
  },
  {
    id: "search",
    icon: Search,
    title: "Smart Search",
    prompts: [
      "Find that voice note I recorded during the Delhi trip.",
      "Show me all documents tagged 'college' and 'startup'.",
      "Find a photo from when I felt most confident.",
      "List all PDFs I uploaded this month."
    ]
  },
  {
    id: "productivity",
    icon: Target,
    title: "Planning",
    prompts: [
      "Summarize my weekly plan and suggest improvements.",
      "What goals did I miss last quarter?",
      "Break this goal into daily tasks.",
      "Track my consistency for the 30-day challenge."
    ]
  },
  {
    id: "magic",
    icon: Shuffle,
    title: "AI Magic",
    prompts: [
      "Link my startup ideas with my mood logs.",
      "Create a timeline of my emotional highs & lows.",
      "Remind me of things that bring me joy when I'm low.",
      "Can you write me a journal entry based on today's mood?"
    ]
  }
]

export default function PromptsSection() {
  const [copiedPrompt, setCopiedPrompt] = useState<string | null>(null)

  const copyPrompt = async (prompt: string) => {
    try {
      await navigator.clipboard.writeText(prompt)
      setCopiedPrompt(prompt)
      setTimeout(() => setCopiedPrompt(null), 2000)
    } catch (err) {
      console.error('Failed to copy prompt:', err)
    }
  }

  return (
    <section className="py-24 bg-muted">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Lightbulb className="w-6 h-6 text-primary" />
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground font-serif">
              What Can Daksha Do?
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed font-inter">
            Try these prompts to see Daksha&apos;s capabilities
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="journaling" className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 mb-8">
            {promptCategories.map((category) => {
              const IconComponent = category.icon
              return (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="flex items-center gap-2 text-xs sm:text-sm"
                >
                  <IconComponent className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">{category.title}</span>
                </TabsTrigger>
              )
            })}
          </TabsList>

          {promptCategories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="mt-6">
              <div className="grid sm:grid-cols-2 gap-4">
                {category.prompts.map((prompt, index) => (
                  <div
                    key={index}
                    className="group relative p-4 bg-background rounded-lg border border-border hover:border-primary/50 transition-all duration-200 cursor-pointer hover:shadow-sm"
                    onClick={() => copyPrompt(prompt)}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors font-inter leading-relaxed">
                        &ldquo;{prompt}&rdquo;
                      </p>
                      <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        {copiedPrompt === prompt ? (
                          <Sparkles className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <div className="bg-background p-6 rounded-lg border border-border max-w-xl mx-auto mb-6">
            <p className="text-base font-medium text-foreground mb-1 font-inter">
              Daksha understands your context and past
            </p>
            <p className="text-sm text-muted-foreground font-inter">
              The more you use it, the more powerful it becomes
            </p>
          </div>

            <Button
            onClick={() => window.open("https://tally.so/r/wLN5e2", "_blank")}
            className="font-medium text-base   transition-colors"
            >
            <ArrowRight className="w-4 h-4 mr-2" />
            Join the Waitlist
            </Button>
        </div>
      </div>
    </section>
  )
}