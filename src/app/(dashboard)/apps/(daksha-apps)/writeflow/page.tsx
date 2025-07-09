"use client"

import { useState } from 'react'
import { 
  PenTool, 
  Mail, 
  MessageSquare, 
  Linkedin, 
  Twitter, 
  Instagram, 
  Chrome,
  Zap,
  Copy,
  RefreshCw,
  Settings,
  Sparkles,
  Send,
  Globe,
  Smartphone,
  Monitor,
  Plus,
  Check,
  Edit3,
  FileText,
  Users,
  Heart,
  TrendingUp
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'

interface WritingTemplate {
  id: string
  name: string
  platform: string
  icon: any
  description: string
  tone: string
  category: 'email' | 'social' | 'professional' | 'casual'
  template: string
}

const writingTemplates: WritingTemplate[] = [
  {
    id: '1',
    name: 'Professional Email',
    platform: 'Gmail',
    icon: Mail,
    description: 'Formal business communication',
    tone: 'professional',
    category: 'email',
    template: 'Subject: [Your Subject]\n\nDear [Name],\n\nI hope this email finds you well. [Your message here]\n\nBest regards,\n[Your name]'
  },
  {
    id: '2',
    name: 'LinkedIn Post',
    platform: 'LinkedIn',
    icon: Linkedin,
    description: 'Professional networking content',
    tone: 'professional',
    category: 'professional',
    template: '🚀 [Your insight or achievement]\n\n[Detailed explanation]\n\n💡 Key takeaway: [Main point]\n\n#hashtags #relevant #tags'
  },
  {
    id: '3',
    name: 'WhatsApp Message',
    platform: 'WhatsApp',
    icon: MessageSquare,
    description: 'Casual messaging',
    tone: 'casual',
    category: 'casual',
    template: 'Hey [Name]! 👋\n\n[Your message here]\n\nLet me know what you think!'
  },
  {
    id: '4',
    name: 'Instagram Caption',
    platform: 'Instagram',
    icon: Instagram,
    description: 'Engaging social media content',
    tone: 'casual',
    category: 'social',
    template: '[Engaging hook] ✨\n\n[Story or context]\n\n[Call to action]\n\n#hashtags #instagram #content'
  },
  {
    id: '5',
    name: 'Twitter Thread',
    platform: 'Twitter',
    icon: Twitter,
    description: 'Viral thread content',
    tone: 'engaging',
    category: 'social',
    template: '🧵 Thread: [Topic] (1/n)\n\n[Hook statement]\n\nHere\'s what I learned:\n\n👇'
  },
  {
    id: '6',
    name: 'Reddit Comment',
    platform: 'Reddit',
    icon: Globe,
    description: 'Community discussion',
    tone: 'conversational',
    category: 'casual',
    template: 'This is really interesting! [Your perspective]\n\nI\'ve had a similar experience where [example]\n\nWhat do you think about [question]?'
  }
]

const platforms = [
  { name: 'Gmail', icon: Mail, color: 'text-red-500', active: true },
  { name: 'LinkedIn', icon: Linkedin, color: 'text-blue-600', active: true },
  { name: 'WhatsApp', icon: MessageSquare, color: 'text-green-500', active: true },
  { name: 'Instagram', icon: Instagram, color: 'text-pink-500', active: true },
  { name: 'Twitter', icon: Twitter, color: 'text-blue-400', active: true },
  { name: 'Reddit', icon: Globe, color: 'text-orange-500', active: false },
  { name: 'Slack', icon: MessageSquare, color: 'text-purple-500', active: false },
  { name: 'Discord', icon: MessageSquare, color: 'text-indigo-500', active: false },
]

export default function WriteFlowPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<WritingTemplate | null>(null)
  const [inputText, setInputText] = useState('')
  const [generatedText, setGeneratedText] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [tone, setTone] = useState('professional')
  const [context, setContext] = useState('')
  const [activeTab, setActiveTab] = useState('templates')

  const handleGenerate = async () => {
    if (!inputText.trim()) return
    
    setIsGenerating(true)
    
    // Simulate AI generation
    setTimeout(() => {
      const enhanced = `${selectedTemplate?.template.replace('[Your message here]', inputText).replace('[Your Subject]', inputText.split(' ').slice(0, 5).join(' '))}

---
✨ Enhanced by WriteFlow with your Daksha context
📝 Tone: ${tone}
🎯 Platform optimized: ${selectedTemplate?.platform}
${context ? `🧠 Context: ${context}` : ''}`
      
      setGeneratedText(enhanced)
      setIsGenerating(false)
    }, 2000)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedText)
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-100 dark:bg-emerald-900/20 rounded-lg">
            <PenTool className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">WriteFlow</h1>
            <p className="text-muted-foreground">AI writing assistant powered by your Daksha context</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Chrome className="w-4 h-4" />
            Install Extension
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Settings className="w-4 h-4" />
            Settings
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Zap className="w-5 h-5 text-yellow-500" />
            <div>
              <p className="text-sm text-muted-foreground">Generated Today</p>
              <p className="text-2xl font-bold">24</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-5 h-5 text-green-500" />
            <div>
              <p className="text-sm text-muted-foreground">Improvement</p>
              <p className="text-2xl font-bold">85%</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Heart className="w-5 h-5 text-red-500" />
            <div>
              <p className="text-sm text-muted-foreground">Platforms</p>
              <p className="text-2xl font-bold">8</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-blue-500" />
            <div>
              <p className="text-sm text-muted-foreground">Templates</p>
              <p className="text-2xl font-bold">50+</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Input & Templates */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="templates">Templates</TabsTrigger>
              <TabsTrigger value="compose">Quick Compose</TabsTrigger>
              <TabsTrigger value="enhance">Enhance Text</TabsTrigger>
            </TabsList>

            <TabsContent value="templates" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Writing Templates
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {writingTemplates.map((template) => (
                      <div
                        key={template.id}
                        className={cn(
                          "p-4 border rounded-lg cursor-pointer transition-all hover:border-primary/50",
                          selectedTemplate?.id === template.id ? "border-primary bg-primary/5" : "border-border"
                        )}
                        onClick={() => setSelectedTemplate(template)}
                      >
                        <div className="flex items-start gap-3">
                          <template.icon className="w-5 h-5 text-muted-foreground mt-1" />
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{template.name}</h4>
                            <p className="text-xs text-muted-foreground mb-2">{template.description}</p>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                {template.platform}
                              </Badge>
                              <Badge variant="secondary" className="text-xs">
                                {template.tone}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="compose" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Edit3 className="w-5 h-5" />
                    Quick Compose
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Platform</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select platform" />
                        </SelectTrigger>
                        <SelectContent>
                          {platforms.map((platform) => (
                            <SelectItem key={platform.name} value={platform.name.toLowerCase()}>
                              <div className="flex items-center gap-2">
                                <platform.icon className={cn("w-4 h-4", platform.color)} />
                                {platform.name}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Tone</label>
                      <Select value={tone} onValueChange={setTone}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="professional">Professional</SelectItem>
                          <SelectItem value="casual">Casual</SelectItem>
                          <SelectItem value="friendly">Friendly</SelectItem>
                          <SelectItem value="formal">Formal</SelectItem>
                          <SelectItem value="creative">Creative</SelectItem>
                          <SelectItem value="persuasive">Persuasive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Context (Optional)</label>
                    <Input
                      placeholder="e.g., Following up on our meeting, Sharing project update..."
                      value={context}
                      onChange={(e) => setContext(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Your Message</label>
                    <Textarea
                      placeholder="What do you want to communicate?"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      rows={4}
                    />
                  </div>

                  <Button 
                    onClick={handleGenerate} 
                    disabled={!inputText.trim() || isGenerating}
                    className="w-full gap-2"
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        Generate with WriteFlow
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="enhance" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Enhance Existing Text
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    placeholder="Paste your existing text here to enhance it..."
                    rows={6}
                  />
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Fix Grammar</Button>
                    <Button variant="outline" size="sm">Improve Tone</Button>
                    <Button variant="outline" size="sm">Make Shorter</Button>
                    <Button variant="outline" size="sm">Make Longer</Button>
                    <Button variant="outline" size="sm">Simplify</Button>
                  </div>
                  <Button className="w-full gap-2">
                    <Sparkles className="w-4 h-4" />
                    Enhance Text
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Generated Output */}
          {generatedText && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-500" />
                    Generated Content
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={copyToClipboard}>
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <RefreshCw className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-muted/30 rounded-lg border">
                  <pre className="whitespace-pre-wrap text-sm">{generatedText}</pre>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column - Platforms & Features */}
        <div className="space-y-6">
          {/* Connected Platforms */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Connected Platforms
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {platforms.map((platform) => (
                <div key={platform.name} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <platform.icon className={cn("w-5 h-5", platform.color)} />
                    <span className="font-medium text-sm">{platform.name}</span>
                  </div>
                  <Badge variant={platform.active ? "default" : "secondary"}>
                    {platform.active ? "Active" : "Connect"}
                  </Badge>
                </div>
              ))}
              <Button variant="outline" size="sm" className="w-full gap-2">
                <Plus className="w-4 h-4" />
                Add Platform
              </Button>
            </CardContent>
          </Card>

          {/* Features */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                WriteFlow Features
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-sm">Context-Aware Writing</p>
                    <p className="text-xs text-muted-foreground">Uses your Daksha history and preferences</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-sm">Platform Optimization</p>
                    <p className="text-xs text-muted-foreground">Adapts to each platform's best practices</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-sm">Real-time Enhancement</p>
                    <p className="text-xs text-muted-foreground">Improves as you type across all apps</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-sm">Smart Templates</p>
                    <p className="text-xs text-muted-foreground">50+ templates for every situation</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Browser Extension */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Chrome className="w-5 h-5" />
                Browser Extension
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/20 rounded-full flex items-center justify-center mx-auto">
                  <PenTool className="w-8 h-8 text-emerald-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">WriteFlow Extension</p>
                  <p className="text-xs text-muted-foreground">Works on any website with text input</p>
                </div>
                <Button size="sm" className="w-full gap-2">
                  <Chrome className="w-4 h-4" />
                  Install Extension
                </Button>
              </div>
              
              <div className="space-y-2 pt-3 border-t">
                <div className="flex items-center gap-2 text-xs">
                  <Monitor className="w-3 h-3" />
                  <span>Works on desktop browsers</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <Smartphone className="w-3 h-3" />
                  <span>Mobile app coming soon</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <Zap className="w-3 h-3" />
                  <span>Real-time suggestions</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}