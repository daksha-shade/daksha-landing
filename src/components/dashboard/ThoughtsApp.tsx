"use client"

import { useState } from 'react'
import { Lightbulb, Plus, Search, Brain, Star, Clock, Tag, Edit3, Trash2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

interface Thought {
  id: string
  title: string
  content: string
  category: 'idea' | 'insight' | 'random' | 'inspiration' | 'problem' | 'solution'
  tags: string[]
  isFavorite: boolean
  createdAt: Date
  updatedAt: Date
}

const mockThoughts: Thought[] = [
  {
    id: '1',
    title: 'AI-powered habit tracking',
    content: 'What if Daksha could automatically detect habits from journal entries and suggest improvements? Like noticing patterns in sleep, exercise, or mood.',
    category: 'idea',
    tags: ['ai', 'habits', 'automation'],
    isFavorite: true,
    createdAt: new Date('2024-01-15T10:30:00'),
    updatedAt: new Date('2024-01-15T10:30:00')
  },
  {
    id: '2',
    title: 'Simplicity is key',
    content: 'Users don\'t want complexity. They want tools that feel invisible but powerful. The best apps are the ones you don\'t have to think about using.',
    category: 'insight',
    tags: ['ux', 'design', 'philosophy'],
    isFavorite: false,
    createdAt: new Date('2024-01-14T15:20:00'),
    updatedAt: new Date('2024-01-14T15:20:00')
  },
  {
    id: '3',
    title: 'Memory palace for digital life',
    content: 'Could we create a visual memory palace where users can navigate through their digital memories? Like a 3D space where photos, notes, and journal entries are spatially organized.',
    category: 'idea',
    tags: ['memory', 'visualization', '3d', 'spatial'],
    isFavorite: true,
    createdAt: new Date('2024-01-13T09:15:00'),
    updatedAt: new Date('2024-01-13T09:15:00')
  },
  {
    id: '4',
    title: 'Coffee shop productivity',
    content: 'Why do I work better in coffee shops? Maybe it\'s the ambient noise, the presence of others being productive, or just the change of environment. Need to recreate this at home.',
    category: 'random',
    tags: ['productivity', 'environment', 'focus'],
    isFavorite: false,
    createdAt: new Date('2024-01-12T14:45:00'),
    updatedAt: new Date('2024-01-12T14:45:00')
  }
]

interface ThoughtsAppProps {
  className?: string
}

export default function ThoughtsApp({ className }: ThoughtsAppProps) {
  const [thoughts, setThoughts] = useState<Thought[]>(mockThoughts)
  const [searchQuery, setSearchQuery] = useState('')
  const [isAddingThought, setIsAddingThought] = useState(false)
  const [newThought, setNewThought] = useState<{ title: string; content: string; category: Thought['category'] }>({ title: '', content: '', category: 'idea' })

  const getCategoryIcon = (category: Thought['category']) => {
    switch (category) {
      case 'idea': return <Lightbulb className="w-4 h-4" />
      case 'insight': return <Brain className="w-4 h-4" />
      case 'inspiration': return <Star className="w-4 h-4" />
      default: return <Lightbulb className="w-4 h-4" />
    }
  }

  const getCategoryColor = (category: Thought['category']) => {
    switch (category) {
      case 'idea': return 'text-yellow-500 bg-yellow-50 dark:bg-yellow-950/20'
      case 'insight': return 'text-purple-500 bg-purple-50 dark:bg-purple-950/20'
      case 'random': return 'text-blue-500 bg-blue-50 dark:bg-blue-950/20'
      case 'inspiration': return 'text-pink-500 bg-pink-50 dark:bg-pink-950/20'
      case 'problem': return 'text-red-500 bg-red-50 dark:bg-red-950/20'
      case 'solution': return 'text-green-500 bg-green-50 dark:bg-green-950/20'
      default: return 'text-gray-500 bg-gray-50 dark:bg-gray-950/20'
    }
  }

  const formatDate = (date: Date) => {
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    
    if (diffInHours < 1) {
      return 'Just now'
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`
    } else if (diffInHours < 48) {
      return 'Yesterday'
    } else {
      return date.toLocaleDateString()
    }
  }

  const filteredThoughts = thoughts.filter(thought =>
    thought.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    thought.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    thought.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const handleAddThought = () => {
    if (newThought.title.trim() && newThought.content.trim()) {
      const thought: Thought = {
        id: Date.now().toString(),
        title: newThought.title,
        content: newThought.content,
        category: newThought.category,
        tags: [],
        isFavorite: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      setThoughts([thought, ...thoughts])
      setNewThought({ title: '', content: '', category: 'idea' })
      setIsAddingThought(false)
    }
  }

  const toggleFavorite = (thoughtId: string) => {
    setThoughts(thoughts.map(thought =>
      thought.id === thoughtId
        ? { ...thought, isFavorite: !thought.isFavorite }
        : thought
    ))
  }

  return (
    <Card className={cn("h-full", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-yellow-500" />
            Thoughts & Ideas
          </CardTitle>
          <Dialog open={isAddingThought} onOpenChange={setIsAddingThought}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2">
                <Plus className="w-4 h-4" />
                Add Thought
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Capture a New Thought</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  placeholder="What's your thought about?"
                  value={newThought.title}
                  onChange={(e) => setNewThought({ ...newThought, title: e.target.value })}
                />
                <Textarea
                  placeholder="Describe your thought, idea, or insight..."
                  value={newThought.content}
                  onChange={(e) => setNewThought({ ...newThought, content: e.target.value })}
                  rows={4}
                />
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Category:</span>
                  <select
                    value={newThought.category}
                    onChange={(e) => setNewThought({ ...newThought, category: e.target.value as Thought['category'] })}
                    className="px-2 py-1 border border-border rounded text-sm"
                  >
                    <option value="idea">Idea</option>
                    <option value="insight">Insight</option>
                    <option value="random">Random</option>
                    <option value="inspiration">Inspiration</option>
                    <option value="problem">Problem</option>
                    <option value="solution">Solution</option>
                  </select>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsAddingThought(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddThought}>
                    Save Thought
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <p className="text-sm text-muted-foreground">
          Your creative mind's playground
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search thoughts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-9"
          />
        </div>

        {/* Quick Stats */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{filteredThoughts.length} thoughts</span>
          <span>{thoughts.filter(t => t.isFavorite).length} favorites</span>
        </div>

        {/* Thoughts List */}
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {filteredThoughts.map((thought) => (
            <div
              key={thought.id}
              className="p-3 border border-border/50 rounded-lg hover:border-border transition-colors group"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={cn(
                    "p-1 rounded-full",
                    getCategoryColor(thought.category)
                  )}>
                    {getCategoryIcon(thought.category)}
                  </div>
                  <h4 className="font-medium text-sm">{thought.title}</h4>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleFavorite(thought.id)}
                    className="h-6 w-6 p-0"
                  >
                    <Star className={cn(
                      "w-3 h-3",
                      thought.isFavorite ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                    )} />
                  </Button>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                {thought.content}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {thought.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  {formatDate(thought.createdAt)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredThoughts.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Lightbulb className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No thoughts found</p>
            <p className="text-xs">Start capturing your ideas!</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}