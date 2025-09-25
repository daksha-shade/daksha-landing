"use client"

import { useState } from 'react'
import {
  Plus,
  Search,
  Grid,
  List,
  Edit3,
  Trash2,
  Star,
  StarOff,
  Tag,
  Brain,
  Save,
  Sparkles,
  FileText,
  Folder,
  Clock
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { useNotes, useNotesActions } from '@/hooks/useNotes'
import { toast } from 'sonner'

interface Note {
  id: string
  title: string
  content: string
  category: string
  tags: string[]
  isFavorite: boolean
  createdAt: string
  updatedAt: string
  aiGenerated?: boolean
}

interface DakshaResponse {
  response: string
  emotion: string
  timestamp: string
}

const CATEGORIES = [
  'Personal',
  'Work',
  'Ideas',
  'Goals',
  'Learning',
  'Projects',
  'Reminders'
]

export default function NotesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [editingNote, setEditingNote] = useState<Note | null>(null)
  const [isDakshaModalOpen, setIsDakshaModalOpen] = useState(false)
  const [dakshaPrompt, setDakshaPrompt] = useState('')
  const [isLoadingDaksha, setIsLoadingDaksha] = useState(false)

  // Form states
  const [noteTitle, setNoteTitle] = useState('')
  const [noteContent, setNoteContent] = useState('')
  const [noteCategory, setNoteCategory] = useState('Personal')
  const [noteTags, setNoteTags] = useState('')

  // Use hooks for data fetching and actions
  const { notes, isLoading, error } = useNotes({
    search: searchTerm,
    category: selectedCategory,
  })
  const { createNote, updateNote, deleteNote, toggleFavorite, isCreating, isUpdating, isDeleting } = useNotesActions()

  const handleCreateNote = async () => {
    if (!noteTitle.trim()) return

    const noteData = {
      title: noteTitle,
      content: noteContent,
      category: noteCategory,
      tags: noteTags.split(',').map(tag => tag.trim()).filter(tag => tag),
    }

    const result = await createNote(noteData)
    if (result) {
      toast.success('Note created successfully!')
      resetForm()
      setIsCreateModalOpen(false)
    } else {
      toast.error('Failed to create note')
    }
  }

  const handleEditNote = (note: Note) => {
    setEditingNote(note)
    setNoteTitle(note.title)
    setNoteContent(note.content)
    setNoteCategory(note.category)
    setNoteTags(note.tags.join(', '))
    setIsCreateModalOpen(true)
  }

  const handleUpdateNote = async () => {
    if (!editingNote || !noteTitle.trim()) return

    const updateData = {
      title: noteTitle,
      content: noteContent,
      category: noteCategory,
      tags: noteTags.split(',').map(tag => tag.trim()).filter(tag => tag),
    }

    const result = await updateNote(editingNote.id, updateData)
    if (result) {
      toast.success('Note updated successfully!')
      resetForm()
      setIsCreateModalOpen(false)
      setEditingNote(null)
    } else {
      toast.error('Failed to update note')
    }
  }

  const handleDeleteNote = async (noteId: string) => {
    const result = await deleteNote(noteId)
    if (result) {
      toast.success('Note deleted successfully!')
    } else {
      toast.error('Failed to delete note')
    }
  }

  const handleToggleFavorite = async (noteId: string, currentFavorite: boolean) => {
    const result = await toggleFavorite(noteId, currentFavorite)
    if (!result) {
      toast.error('Failed to update favorite status')
    }
  }

  const resetForm = () => {
    setNoteTitle('')
    setNoteContent('')
    setNoteCategory('Personal')
    setNoteTags('')
  }

  const handleDakshaAssist = async () => {
    if (!dakshaPrompt.trim()) return

    setIsLoadingDaksha(true)
    try {
      const response = await fetch('/api/daksha/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `Help me create a note about: ${dakshaPrompt}. Please provide a structured note with a title and detailed content.`,
          conversationHistory: []
        }),
      })

      if (response.ok) {
        const data: DakshaResponse = await response.json()

        // Parse Daksha's response to extract title and content
        const lines = data.response.split('\n').filter(line => line.trim())
        const title = lines[0]?.replace(/^(Title:|#\s*)/i, '').trim() || 'AI Generated Note'
        const content = lines.slice(1).join('\n').trim() || data.response

        const aiNote = {
          title,
          content,
          category: 'Ideas',
          tags: ['ai-generated', 'daksha'],
          aiGenerated: true
        }

        const result = await createNote(aiNote)
        if (result) {
          toast.success('AI note created successfully!')
        } else {
          toast.error('Failed to create AI note')
        }
        setDakshaPrompt('')
        setIsDakshaModalOpen(false)
      }
    } catch (error) {
      console.error('Error getting Daksha assistance:', error)
      toast.error('Failed to get AI assistance')
    } finally {
      setIsLoadingDaksha(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#fafafa] dark:bg-[#1f1f1f] p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-red-600 mb-2">Error loading notes</h3>
            <p className="text-muted-foreground">Please try refreshing the page</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#1f1f1f] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-serif font-bold text-[#1f1f1f] dark:text-white">
                Notes
              </h1>
              <p className="text-muted-foreground mt-1">
                Capture your thoughts, ideas, and insights
              </p>
            </div>
            <div className="flex gap-3">
              <Dialog open={isDakshaModalOpen} onOpenChange={setIsDakshaModalOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Brain className="w-4 h-4" />
                    Ask Daksha
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <Brain className="w-5 h-5 text-blue-500" />
                      Daksha Note Assistant
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Textarea
                      placeholder="What would you like to create a note about? (e.g., 'my goals for this month', 'ideas for improving productivity')"
                      value={dakshaPrompt}
                      onChange={(e) => setDakshaPrompt(e.target.value)}
                      className="min-h-20"
                    />
                    <div className="flex gap-2">
                      <Button
                        onClick={handleDakshaAssist}
                        disabled={!dakshaPrompt.trim() || isLoadingDaksha}
                        className="flex-1 gap-2"
                      >
                        {isLoadingDaksha ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Creating...
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-4 h-4" />
                            Generate Note
                          </>
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setIsDakshaModalOpen(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus className="w-4 h-4" />
                    New Note
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>
                      {editingNote ? 'Edit Note' : 'Create New Note'}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Input
                      placeholder="Note title..."
                      value={noteTitle}
                      onChange={(e) => setNoteTitle(e.target.value)}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Category</label>
                        <select
                          value={noteCategory}
                          onChange={(e) => setNoteCategory(e.target.value)}
                          className="w-full h-9 px-3 rounded-md border border-input bg-background text-sm"
                        >
                          {CATEGORIES.map(category => (
                            <option key={category} value={category}>{category}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Tags</label>
                        <Input
                          placeholder="tag1, tag2, tag3"
                          value={noteTags}
                          onChange={(e) => setNoteTags(e.target.value)}
                        />
                      </div>
                    </div>
                    <Textarea
                      placeholder="Write your note content here..."
                      value={noteContent}
                      onChange={(e) => setNoteContent(e.target.value)}
                      className="min-h-32"
                    />
                    <div className="flex gap-2">
                      <Button
                        onClick={editingNote ? handleUpdateNote : handleCreateNote}
                        disabled={!noteTitle.trim()}
                        className="flex-1 gap-2"
                      >
                        <Save className="w-4 h-4" />
                        {editingNote ? 'Update Note' : 'Create Note'}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setIsCreateModalOpen(false)
                          setEditingNote(null)
                          resetForm()
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-3 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search notes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="h-9 px-3 rounded-md border border-input bg-background text-sm min-w-32"
              >
                <option value="All">All Categories</option>
                {CATEGORIES.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Notes Grid/List */}
        {notes.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-muted-foreground mb-2">
              {searchTerm || selectedCategory !== 'All' ? 'No notes found' : 'No notes yet'}
            </h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || selectedCategory !== 'All'
                ? 'Try adjusting your search or filters'
                : 'Create your first note to get started'
              }
            </p>
            {!searchTerm && selectedCategory === 'All' && (
              <Button onClick={() => setIsCreateModalOpen(true)} className="gap-2">
                <Plus className="w-4 h-4" />
                Create Note
              </Button>
            )}
          </div>
        ) : (
          <div className={cn(
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-4'
          )}>
            {notes.map((note: Note) => (
              <Card
                key={note.id}
                className={cn(
                  "group hover:shadow-md transition-all duration-200 cursor-pointer",
                  viewMode === 'list' && 'flex-row items-center p-4',
                  note.aiGenerated && 'border-blue-200 dark:border-blue-800'
                )}
                onClick={() => handleEditNote(note)}
              >
                <CardHeader className={cn(
                  "pb-3",
                  viewMode === 'list' && 'flex-row items-center justify-between flex-1 pb-0'
                )}>
                  <div className={cn(
                    "space-y-2",
                    viewMode === 'list' && 'space-y-1 flex-1'
                  )}>
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className={cn(
                        "text-lg leading-tight line-clamp-2",
                        viewMode === 'list' && 'text-base line-clamp-1'
                      )}>
                        {note.title}
                        {note.aiGenerated && (
                          <Badge variant="outline" className="ml-2 text-xs">
                            <Brain className="w-3 h-3 mr-1" />
                            AI
                          </Badge>
                        )}
                      </CardTitle>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleToggleFavorite(note.id, note.isFavorite)
                        }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        {note.isFavorite ? (
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        ) : (
                          <StarOff className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Folder className="w-3 h-3" />
                      <span>{note.category}</span>
                      <Clock className="w-3 h-3 ml-2" />
                      <span>{formatDate(note.updatedAt)}</span>
                    </div>
                  </div>
                  {viewMode === 'list' && (
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleEditNote(note)
                        }}
                      >
                        <Edit3 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDeleteNote(note.id)
                        }}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </CardHeader>
                {viewMode === 'grid' && (
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
                      {note.content}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {note.tags.slice(0, 2).map(tag => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            <Tag className="w-2 h-2 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                        {note.tags.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{note.tags.length - 2}
                          </Badge>
                        )}
                      </div>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleEditNote(note)
                          }}
                        >
                          <Edit3 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDeleteNote(note.id)
                          }}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}