"use client"

import { useState } from 'react'
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Heart, 
  Plane, 
  Camera, 
  Code, 
  Palette, 
  Target, 
  Clock, 
  Brain, 
  MessageCircle, 
  Sparkles, 
  ArrowRight, 
  Play, 
  Copy, 
  CheckCircle,
  Lightbulb,
  Zap,
  Calendar,
  BookOpen,
  Mic,
  Search,
  TrendingUp,
  Users,
  Globe,
  Coffee,
  Moon,
  Sun,
  Activity,
  PenTool,
  FileText,
  Image,
  Video,
  Music,
  Headphones
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const personas = [
  {
    id: 'entrepreneur',
    icon: Briefcase,
    title: 'Entrepreneur',
    description: 'Building the next big thing',
    color: 'bg-blue-50 border-blue-200 dark:bg-blue-950/20 dark:border-blue-800',
    scenarios: [
      {
        title: 'Daily Startup Reflection',
        time: 'Every Evening',
        prompt: '"Daksha, analyze my day. What decisions moved my startup forward? What patterns do you see in my productivity?"',
        response: 'Based on your entries, you\'re most productive during morning strategy sessions. Your breakthrough ideas often come after walking meetings. I notice you\'re overthinking competitor analysis - focus on customer feedback instead.',
        tags: ['Strategy', 'Productivity', 'Decision Making']
      },
      {
        title: 'Investor Pitch Preparation',
        time: 'Before Important Meetings',
        prompt: '"Help me prepare for tomorrow\'s investor meeting. What are my strongest points from the last quarter?"',
        response: 'Your user growth metrics are compelling (40% MoM). Highlight the customer testimonial from last week and the partnership with TechCorp. Address the revenue question with your new pricing strategy.',
        tags: ['Fundraising', 'Metrics', 'Storytelling']
      },
      {
        title: 'Team Mood Analysis',
        time: 'Weekly',
        prompt: '"How is my team feeling? Any red flags I should address?"',
        response: 'Sarah mentioned feeling overwhelmed in Tuesday\'s standup. John\'s been staying late - check if he needs support. The team energy was highest during the product demo session.',
        tags: ['Leadership', 'Team Management', 'Culture']
      }
    ]
  },
  {
    id: 'student',
    icon: GraduationCap,
    title: 'Student',
    description: 'Learning and growing every day',
    color: 'bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-800',
    scenarios: [
      {
        title: 'Study Session Optimization',
        time: 'Before Exams',
        prompt: '"Daksha, when do I study best? Help me plan my exam schedule."',
        response: 'You retain information best between 9-11 AM and 7-9 PM. Math concepts stick better after physical exercise. Schedule your hardest subjects during peak hours and review notes before sleep.',
        tags: ['Study Habits', 'Memory', 'Time Management']
      },
      {
        title: 'Research Paper Assistant',
        time: 'During Projects',
        prompt: '"Find all my notes about climate change and help me structure my research paper."',
        response: 'Found 23 relevant entries across 4 months. Key themes: renewable energy (8 notes), policy analysis (6 notes), case studies (9 notes). Suggested structure: Problem → Current Solutions → Policy Gaps → Recommendations.',
        tags: ['Research', 'Organization', 'Academic Writing']
      },
      {
        title: 'Career Path Clarity',
        time: 'Monthly Reflection',
        prompt: '"What career interests keep coming up in my journals? What should I explore?"',
        response: 'You\'ve mentioned UX design 12 times, always with excitement. Your internship at the design studio was your happiest period. Consider taking that advanced prototyping course you bookmarked.',
        tags: ['Career Planning', 'Self Discovery', 'Interests']
      }
    ]
  },
  {
    id: 'creative',
    icon: Palette,
    title: 'Creative Professional',
    description: 'Bringing ideas to life',
    color: 'bg-purple-50 border-purple-200 dark:bg-purple-950/20 dark:border-purple-800',
    scenarios: [
      {
        title: 'Creative Block Breakthrough',
        time: 'When Stuck',
        prompt: '"I\'m stuck on this design. What inspired me in similar situations before?"',
        response: 'Last time you were stuck on branding, you found inspiration during your museum visit. Your best logo concepts came after listening to jazz. Try visiting that art gallery or taking a nature walk.',
        tags: ['Inspiration', 'Creative Process', 'Problem Solving']
      },
      {
        title: 'Project Portfolio Review',
        time: 'End of Month',
        prompt: '"Show me my creative evolution. What themes are emerging in my work?"',
        response: 'Your style is evolving toward minimalism with bold color accents. Clients love your typography choices. Your most successful projects combine storytelling with clean visuals. Consider developing this signature style.',
        tags: ['Portfolio', 'Style Evolution', 'Client Feedback']
      },
      {
        title: 'Client Communication',
        time: 'Before Presentations',
        prompt: '"Help me explain this design concept to my client in terms they\'ll understand."',
        response: 'Based on your notes, this client values ROI and user engagement. Frame your design choices around conversion rates and user experience. Use the case study from your previous project as proof.',
        tags: ['Client Relations', 'Communication', 'Business Impact']
      }
    ]
  },
  {
    id: 'wellness',
    icon: Heart,
    title: 'Wellness Seeker',
    description: 'Prioritizing mental and physical health',
    color: 'bg-pink-50 border-pink-200 dark:bg-pink-950/20 dark:border-pink-800',
    scenarios: [
      {
        title: 'Mood Pattern Recognition',
        time: 'Weekly Check-in',
        prompt: '"What patterns do you see in my mood? What triggers my anxiety?"',
        response: 'Your anxiety peaks on Sunday evenings (work week prep) and after social media use. You feel best after morning workouts and when you spend time in nature. Consider a Sunday evening routine.',
        tags: ['Mental Health', 'Patterns', 'Self Awareness']
      },
      {
        title: 'Habit Tracking Insights',
        time: 'Monthly Review',
        prompt: '"How consistent am I with my wellness habits? What\'s working?"',
        response: 'Meditation streak: 18/30 days. Exercise: 22/30 days. You skip workouts when stressed but never miss meditation after bad days. Your sleep quality improves when you read before bed.',
        tags: ['Habits', 'Consistency', 'Health Tracking']
      },
      {
        title: 'Gratitude Amplification',
        time: 'During Low Moments',
        prompt: '"I\'m feeling down. Remind me of recent things that brought me joy."',
        response: 'Yesterday you wrote about your friend\'s surprise visit. Last week you felt grateful for your morning coffee ritual. Your dog\'s silly behavior always makes you smile. Small moments matter most.',
        tags: ['Gratitude', 'Emotional Support', 'Perspective']
      }
    ]
  },
  {
    id: 'traveler',
    icon: Plane,
    title: 'Digital Nomad',
    description: 'Working and exploring the world',
    color: 'bg-orange-50 border-orange-200 dark:bg-orange-950/20 dark:border-orange-800',
    scenarios: [
      {
        title: 'Location Memory Palace',
        time: 'Before Trips',
        prompt: '"What did I love about Bali? Help me plan my return trip."',
        response: 'You loved the Ubud rice terraces at sunrise, the coworking space in Canggu, and that warung near your Airbnb. You regretted not trying surfing. Book that surf lesson this time!',
        tags: ['Travel Planning', 'Memories', 'Experiences']
      },
      {
        title: 'Work-Travel Balance',
        time: 'Location Transitions',
        prompt: '"How productive was I in different cities? Where should I work next?"',
        response: 'Highest productivity: Lisbon (great wifi, inspiring cafes). Lowest: Bangkok (too many distractions). Mexico City balanced work and culture perfectly. Consider returning to similar environments.',
        tags: ['Productivity', 'Work Environment', 'Location Analysis']
      },
      {
        title: 'Cultural Insights Collection',
        time: 'After Experiences',
        prompt: '"What cultural insights have I gathered? How am I growing as a person?"',
        response: 'You\'ve become more adaptable and patient. Japanese efficiency inspired your workflow. Italian approach to meals changed your relationship with time. You\'re developing a global perspective.',
        tags: ['Personal Growth', 'Cultural Learning', 'Self Development']
      }
    ]
  }
]

const dailyUseCases = [
  {
    time: '6:00 AM',
    icon: Sun,
    title: 'Morning Intention Setting',
    prompt: '"Daksha, based on yesterday\'s reflection, what should I focus on today?"',
    description: 'Start your day with AI-powered insights from your previous entries'
  },
  {
    time: '9:00 AM',
    icon: Coffee,
    title: 'Work Session Prep',
    prompt: '"What was I working on yesterday? Help me pick up where I left off."',
    description: 'Seamlessly continue projects with context from your work logs'
  },
  {
    time: '12:00 PM',
    icon: Activity,
    title: 'Midday Check-in',
    prompt: '"How am I feeling? What\'s my energy level compared to usual?"',
    description: 'Track your energy patterns and optimize your daily rhythm'
  },
  {
    time: '6:00 PM',
    icon: PenTool,
    title: 'Evening Reflection',
    prompt: '"What went well today? What would I do differently?"',
    description: 'Process your day and extract learnings for continuous improvement'
  },
  {
    time: '9:00 PM',
    icon: Moon,
    title: 'Gratitude & Planning',
    prompt: '"What am I grateful for? What are my priorities for tomorrow?"',
    description: 'End with gratitude and set intentions for the next day'
  }
]

const agentCapabilities = [
  {
    category: 'Memory & Context',
    icon: Brain,
    capabilities: [
      'Remembers every conversation, note, and media you\'ve shared',
      'Connects ideas across different time periods and contexts',
      'Builds a comprehensive understanding of your personality and preferences',
      'Recalls specific details from months or years ago'
    ]
  },
  {
    category: 'Pattern Recognition',
    icon: TrendingUp,
    capabilities: [
      'Identifies mood patterns and emotional triggers',
      'Recognizes productivity cycles and optimal work times',
      'Spots recurring themes in your thoughts and goals',
      'Predicts when you might need support or motivation'
    ]
  },
  {
    category: 'Intelligent Search',
    icon: Search,
    capabilities: [
      'Finds content based on emotions, not just keywords',
      'Searches across text, voice notes, images, and videos',
      'Understands context and intent behind your queries',
      'Surfaces relevant content you might have forgotten'
    ]
  },
  {
    category: 'Creative Assistance',
    icon: Sparkles,
    capabilities: [
      'Helps brainstorm ideas based on your past thoughts',
      'Suggests creative connections between different concepts',
      'Assists with writing, planning, and problem-solving',
      'Provides personalized inspiration and motivation'
    ]
  }
]

export default function UseCasesPage() {
  const [selectedPersona, setSelectedPersona] = useState('entrepreneur')
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

  const selectedPersonaData = personas.find(p => p.id === selectedPersona)

  return (
    <div className="notion-page py-8 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Lightbulb className="w-8 h-8 text-primary" />
          <h1 className="notion-title font-serif">Daksha Use Cases</h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Discover how Daksha transforms daily life through intelligent conversations, 
          memory assistance, and personalized insights. Real scenarios, real prompts, real impact.
        </p>
      </div>

      {/* Persona-Based Scenarios */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Who Are You?</h2>
          <p className="text-muted-foreground">Choose your persona to see tailored use cases</p>
        </div>

        {/* Persona Selector */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {personas.map((persona) => {
            const IconComponent = persona.icon
            return (
              <button
                key={persona.id}
                onClick={() => setSelectedPersona(persona.id)}
                className={`p-4 rounded-lg border-2 transition-all hover:shadow-md ${
                  selectedPersona === persona.id 
                    ? 'border-primary bg-primary/5' 
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <IconComponent className="w-8 h-8 mx-auto mb-2 text-primary" />
                <h3 className="font-medium text-sm">{persona.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{persona.description}</p>
              </button>
            )
          })}
        </div>

        {/* Selected Persona Scenarios */}
        {selectedPersonaData && (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-2">
                {selectedPersonaData.title} Scenarios
              </h3>
              <p className="text-muted-foreground">
                Real-world use cases and conversations
              </p>
            </div>

            <div className="grid gap-6">
              {selectedPersonaData.scenarios.map((scenario, index) => (
                <Card key={index} className={selectedPersonaData.color}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{scenario.title}</CardTitle>
                        <div className="flex items-center gap-2 mt-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{scenario.time}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {scenario.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* User Prompt */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-blue-500" />
                        <span className="text-sm font-medium text-blue-500">You</span>
                      </div>
                      <div 
                        className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-950/30 transition-colors group"
                        onClick={() => copyPrompt(scenario.prompt)}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm italic">{scenario.prompt}</p>
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                            {copiedPrompt === scenario.prompt ? (
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            ) : (
                              <Copy className="w-4 h-4 text-muted-foreground" />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Daksha Response */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-purple-500" />
                        <span className="text-sm font-medium text-purple-500">Daksha</span>
                      </div>
                      <div className="bg-purple-50 dark:bg-purple-950/20 p-3 rounded-lg">
                        <p className="text-sm">{scenario.response}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Daily Rhythm */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Your Daily Rhythm with Daksha</h2>
          <p className="text-muted-foreground">How Daksha fits seamlessly into your day</p>
        </div>

        <div className="space-y-4">
          {dailyUseCases.map((useCase, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <useCase.icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-mono text-muted-foreground">{useCase.time}</span>
                      <h3 className="font-semibold">{useCase.title}</h3>
                    </div>
                    <div 
                      className="bg-muted p-3 rounded-lg cursor-pointer hover:bg-muted/80 transition-colors group"
                      onClick={() => copyPrompt(useCase.prompt)}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm italic text-muted-foreground">{useCase.prompt}</p>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                          {copiedPrompt === useCase.prompt ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <Copy className="w-4 h-4 text-muted-foreground" />
                          )}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{useCase.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Agent Capabilities */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">What Makes Daksha Special</h2>
          <p className="text-muted-foreground">Advanced AI capabilities that understand you deeply</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {agentCapabilities.map((category, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <category.icon className="w-6 h-6 text-primary" />
                  <CardTitle className="text-lg">{category.category}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {category.capabilities.map((capability, capIndex) => (
                    <li key={capIndex} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{capability}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Quick Prompts to Try */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Quick Prompts to Try Right Now</h2>
          <p className="text-muted-foreground">Copy these prompts and start your Daksha journey</p>
        </div>

        <Tabs defaultValue="reflection" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="reflection">Reflection</TabsTrigger>
            <TabsTrigger value="planning">Planning</TabsTrigger>
            <TabsTrigger value="creativity">Creativity</TabsTrigger>
            <TabsTrigger value="wellness">Wellness</TabsTrigger>
          </TabsList>

          <TabsContent value="reflection" className="space-y-4">
            {[
              "What patterns do you see in my thoughts this week?",
              "When was I most productive recently? What was different?",
              "What decisions am I avoiding? Help me think through them.",
              "Show me how my perspective on [topic] has evolved."
            ].map((prompt, index) => (
              <div 
                key={index}
                className="p-4 bg-muted rounded-lg cursor-pointer hover:bg-muted/80 transition-colors group"
                onClick={() => copyPrompt(prompt)}
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm">&ldquo;{prompt}&rdquo;</p>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    {copiedPrompt === prompt ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4 text-muted-foreground" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="planning" className="space-y-4">
            {[
              "Based on my past goals, what should I prioritize this month?",
              "What obstacles have I overcome before that apply to my current challenge?",
              "Help me break down this big goal into daily actions.",
              "What time of day am I most focused for important work?"
            ].map((prompt, index) => (
              <div 
                key={index}
                className="p-4 bg-muted rounded-lg cursor-pointer hover:bg-muted/80 transition-colors group"
                onClick={() => copyPrompt(prompt)}
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm">&ldquo;{prompt}&rdquo;</p>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    {copiedPrompt === prompt ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4 text-muted-foreground" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="creativity" className="space-y-4">
            {[
              "What ideas have I been circling around? Help me connect them.",
              "Find that inspiration I captured last month about [topic].",
              "What creative projects brought me the most joy?",
              "Help me brainstorm based on my recent interests and experiences."
            ].map((prompt, index) => (
              <div 
                key={index}
                className="p-4 bg-muted rounded-lg cursor-pointer hover:bg-muted/80 transition-colors group"
                onClick={() => copyPrompt(prompt)}
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm">&ldquo;{prompt}&rdquo;</p>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    {copiedPrompt === prompt ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4 text-muted-foreground" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="wellness" className="space-y-4">
            {[
              "What activities consistently improve my mood?",
              "When do I feel most anxious? What are the triggers?",
              "Remind me of recent moments when I felt truly content.",
              "What self-care practices have I been neglecting?"
            ].map((prompt, index) => (
              <div 
                key={index}
                className="p-4 bg-muted rounded-lg cursor-pointer hover:bg-muted/80 transition-colors group"
                onClick={() => copyPrompt(prompt)}
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm">&ldquo;{prompt}&rdquo;</p>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    {copiedPrompt === prompt ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4 text-muted-foreground" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </section>

      {/* Call to Action */}
      <section className="text-center space-y-6">
        <div className="bg-gradient-to-r from-primary/10 to-purple-500/10 p-8 rounded-lg border">
          <h2 className="text-2xl font-bold mb-4">Ready to Transform Your Daily Life?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join thousands of users who are already experiencing the power of having an AI companion 
            that truly understands them. Start your journey with Daksha today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="font-medium">
              <ArrowRight className="w-4 h-4 mr-2" />
              Join the Waitlist
            </Button>
            <Button variant="outline" size="lg">
              <Play className="w-4 h-4 mr-2" />
              Watch Demo
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}