"use client"

import { useState, useRef, useEffect, useCallback } from 'react'
import { 
  FileText, 
  Brain, 
  Lock, 
  Zap, 
  TrendingUp, 
  Calendar, 
  Target, 
  BookOpen, 
  Plus, 
  Save, 
  Edit3,
  ArrowLeft,
  Focus,
  Menu,
  X,
  Minimize2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { NotionCard, NotionCardContent, NotionCardHeader, NotionCardTitle } from '@/components/ui/notion-card'
import { PlateEditor } from '@/components/editor/plate-editor'
import { Toaster } from 'sonner'

export default function ContextPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [articleMode, setArticleMode] = useState('list')
  const [selectedArticle, setSelectedArticle] = useState(null)
  const [title, setTitle] = useState("")
  const [isFocusMode, setIsFocusMode] = useState(false)
  const [showMenuBar, setShowMenuBar] = useState(true)
  const titleRef = useRef(null)

  // Mock data - in a real implementation, this would come from the API
  const contextData = {
    totalEntries: 127,
    totalGoals: 8,
    activeStreak: 23,
    insightsGenerated: 42,
    dataSources: [
      { name: 'Journal Entries', count: 127, icon: BookOpen },
      { name: 'Goals', count: 8, icon: Target },
      { name: 'Memories', count: 56, icon: Calendar },
    ],
    recentInsights: [
      {
        title: 'Productivity Pattern',
        description: 'You\'re most productive on Tuesdays and Thursdays between 10 AM - 2 PM',
        date: '2 days ago'
      },
      {
        title: 'Emotional Cycle',
        description: 'Your mood tends to dip mid-week but rebounds strongly on weekends',
        date: '1 week ago'
      },
      {
        title: 'Goal Alignment',
        description: 'Your recent journal entries show strong alignment with your career goals',
        date: '3 days ago'
      }
    ]
  }

  // Mock articles data
  const [articles, setArticles] = useState([
    {
      id: 1,
      title: 'Understanding Personal Context',
      content: 'This is a sample article about personal context...',
      createdAt: new Date('2023-05-15'),
      updatedAt: new Date('2023-05-15')
    },
    {
      id: 2,
      title: 'Building Knowledge Graphs',
      content: 'Another sample article about knowledge graphs...',
      createdAt: new Date('2023-05-10'),
      updatedAt: new Date('2023-05-12')
    }
  ])

  const handleNewArticle = () => {
    setSelectedArticle(null)
    setTitle("")
    setArticleMode('editor')
  }

  const handleEditArticle = (article) => {
    setSelectedArticle(article)
    setTitle(article.title)
    setArticleMode('editor')
  }

  const handleSaveArticle = useCallback(async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    if (selectedArticle) {
      // Update existing article
      setArticles(prev => prev.map(article => 
        article.id === selectedArticle.id 
          ? { ...article, title, updatedAt: new Date() } 
          : article
      ))
    } else {
      // Create new article
      const newArticle = {
        id: Date.now(),
        title,
        content: '',
        createdAt: new Date(),
        updatedAt: new Date()
      }
      setArticles(prev => [...prev, newArticle])
    }
    
    setArticleMode('list')
  }, [title, selectedArticle])

  const handleBackToList = () => {
    setArticleMode('list')
  }

  // Focus title on mount when in editor mode
  useEffect(() => {
    if (articleMode === 'editor') {
      titleRef.current?.focus()
    }
  }, [articleMode])

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Escape key to exit focus mode
      if (e.key === 'Escape' && isFocusMode) {
        setIsFocusMode(false)
      }
      // Ctrl/Cmd + S to save
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault()
        if (articleMode === 'editor') {
          handleSaveArticle()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isFocusMode, articleMode, handleSaveArticle])

  const backgroundClass = isFocusMode 
    ? 'bg-background' 
    : 'bg-gradient-to-br from-muted/30 via-background to-accent/10'

  // Render article list view
  const renderArticleList = () => {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Your Articles</h2>
        {articles.length === 0 ? (
          <NotionCard>
            <NotionCardContent className="text-center py-12">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No articles yet</h3>
              <p className="text-muted-foreground mb-4">Create your first article to start organizing your thoughts and knowledge.</p>
              <Button onClick={handleNewArticle} className="gap-2">
                <Plus className="w-4 h-4" />
                Create Article
              </Button>
            </NotionCardContent>
          </NotionCard>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {articles.map((article) => (
              <NotionCard key={article.id}>
                <NotionCardHeader>
                  <NotionCardTitle className="line-clamp-2">{article.title}</NotionCardTitle>
                </NotionCardHeader>
                <NotionCardContent>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-xs text-muted-foreground">
                      {article.updatedAt.toLocaleDateString()}
                    </span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleEditArticle(article)}
                      className="gap-1"
                    >
                      <Edit3 className="w-3 h-3" />
                      Edit
                    </Button>
                  </div>
                </NotionCardContent>
              </NotionCard>
            ))}
          </div>
        )}
      </div>
    )
  }

  // Render privacy view
  const renderPrivacyView = () => {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="w-5 h-5" />
            Privacy & Data Control
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div>
                <h3 className="font-medium">End-to-End Encryption</h3>
                <p className="text-sm text-muted-foreground">All your data is encrypted both in transit and at rest.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Brain className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div>
                <h3 className="font-medium">Local Processing</h3>
                <p className="text-sm text-muted-foreground">AI processing happens locally on your device whenever possible.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div>
                <h3 className="font-medium">Granular Control</h3>
                <p className="text-sm text-muted-foreground">You control what data is used for AI insights and can delete anything at any time.</p>
              </div>
            </div>
          </div>
          <div className="pt-4 border-t">
            <h3 className="font-medium mb-3">Data Management</h3>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm">Export Data</Button>
              <Button variant="outline" size="sm">Review Permissions</Button>
              <Button variant="outline" size="sm">Delete Account</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Render overview view
  const renderOverviewView = () => {
    return (
      <div className="space-y-6">
        {/* Data Sources */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Data Sources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {contextData.dataSources.map((source, index) => (
                <NotionCard key={index}>
                  <NotionCardContent className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-muted/20 flex items-center justify-center">
                      <source.icon className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium">{source.name}</p>
                      <p className="text-sm text-muted-foreground">{source.count} items</p>
                    </div>
                  </NotionCardContent>
                </NotionCard>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Insights */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Recent Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {contextData.recentInsights.map((insight, index) => (
                <NotionCard key={index}>
                  <NotionCardHeader>
                    <NotionCardTitle>{insight.title}</NotionCardTitle>
                  </NotionCardHeader>
                  <NotionCardContent>
                    <p className="text-muted-foreground mb-2">{insight.description}</p>
                    <p className="text-xs text-muted-foreground">{insight.date}</p>
                  </NotionCardContent>
                </NotionCard>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Render article editor view
  const renderArticleEditor = () => {
    return (
      <>
        {/* Header - Hidden in focus mode unless showMenuBar is true */}
        {(!isFocusMode || showMenuBar) && (
          <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
            <div className="max-w-7xl mx-auto px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="sm" className="gap-2" onClick={handleBackToList}>
                    <ArrowLeft className="w-4 h-4" />
                    Back to Context
                  </Button>
                </div>
                
                <div className="flex items-center gap-2">
                  {/* Focus Mode Toggle */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsFocusMode(!isFocusMode)}
                    className="gap-2"
                  >
                    {isFocusMode ? (
                      <>
                        <Minimize2 className="w-4 h-4" />
                        Exit Focus
                      </>
                    ) : (
                      <>
                        <Focus className="w-4 h-4" />
                        Focus Mode
                      </>
                    )}
                  </Button>
                  
                  <Button 
                    onClick={handleSaveArticle} 
                    className="gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Save Article
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Focus Mode Menu Bar Toggle */}
        {isFocusMode && !showMenuBar && (
          <div className="fixed top-4 right-4 z-20">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowMenuBar(true)}
              className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-lg"
            >
              <Menu className="w-4 h-4" />
            </Button>
          </div>
        )}

        {/* Focus Mode Menu Bar Close */}
        {isFocusMode && showMenuBar && (
          <div className="fixed top-4 right-4 z-20">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowMenuBar(false)}
              className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-lg"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        )}

        {/* Main Content */}
        <div className={`mx-auto px-4 transition-all duration-300 ${
          isFocusMode 
            ? 'max-w-4xl py-4' 
            : 'max-w-5xl py-8'
        }`}>
          <div className="space-y-6">
            {/* Title */}
            <div>
              <input
                ref={titleRef}
                type="text"
                placeholder="Article title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`w-full font-bold bg-transparent border-none outline-none placeholder-gray-400 dark:placeholder-gray-600 focus:placeholder-gray-300 dark:focus:placeholder-gray-400 text-gray-900 dark:text-white transition-all duration-300 ${
                  isFocusMode ? 'text-3xl' : 'text-4xl'
                }`}
              />
            </div>

            {/* Rich Text Editor */}
            <div className={`bg-card border border-border transition-all duration-300 ${
              isFocusMode 
                ? 'rounded-none shadow-none min-h-[calc(100vh-200px)]' 
                : 'rounded-lg shadow-sm min-h-[600px]'
            }`}>
              <PlateEditor />
            </div>
          </div>
        </div>

        {/* Focus Mode Keyboard Shortcuts Hint */}
        {isFocusMode && (
          <div className="fixed bottom-4 left-4 z-20">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-lg rounded-lg p-3 text-xs text-muted-foreground">
              <div className="space-y-1">
                <div><kbd className="px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-xs">Ctrl+S</kbd> Save</div>
                <div><kbd className="px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-xs">Esc</kbd> Exit Focus</div>
              </div>
            </div>
          </div>
        )}
      </>
    )
  }

  // Render main view based on articleMode
  const renderMainView = () => {
    if (articleMode === 'editor') {
      return renderArticleEditor()
    }

    return (
      <>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="notion-title font-serif">Your Context</h1>
            <p className="text-muted-foreground">How Daksha understands and organizes your digital life</p>
          </div>
          <Button variant="notion" onClick={handleNewArticle} className="gap-2">
            <Plus className="w-4 h-4" />
            New Article
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <NotionCard>
            <NotionCardContent className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Entries</p>
                <p className="text-xl font-semibold">{contextData.totalEntries}</p>
              </div>
            </NotionCardContent>
          </NotionCard>

          <NotionCard>
            <NotionCardContent className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <Target className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Goals</p>
                <p className="text-xl font-semibold">{contextData.totalGoals}</p>
              </div>
            </NotionCardContent>
          </NotionCard>

          <NotionCard>
            <NotionCardContent className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <Zap className="w-5 h-5 text-purple-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Day Streak</p>
                <p className="text-xl font-semibold">{contextData.activeStreak}</p>
              </div>
            </NotionCardContent>
          </NotionCard>

          <NotionCard>
            <NotionCardContent className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Insights</p>
                <p className="text-xl font-semibold">{contextData.insightsGenerated}</p>
              </div>
            </NotionCardContent>
          </NotionCard>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-muted/20 p-1 rounded-lg w-fit">
          <Button
            variant={activeTab === 'overview' ? 'notion' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('overview')}
            className="gap-2"
          >
            <Brain className="w-4 h-4" />
            Overview
          </Button>
          <Button
            variant={activeTab === 'articles' ? 'notion' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('articles')}
            className="gap-2"
          >
            <FileText className="w-4 h-4" />
            Articles
          </Button>
          <Button
            variant={activeTab === 'privacy' ? 'notion' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('privacy')}
            className="gap-2"
          >
            <Lock className="w-4 h-4" />
            Privacy
          </Button>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && renderOverviewView()}
        {activeTab === 'articles' && renderArticleList()}
        {activeTab === 'privacy' && renderPrivacyView()}
      </>
    )
  }

  return (
    <div className={`min-h-screen notion-page py-6 space-y-6 transition-all duration-300 ${backgroundClass}`}>
      {renderMainView()}
      <Toaster />
    </div>
  )
}