"use client"

import { useState } from 'react'
import { 
  Calendar, 
  Brain, 
  BookOpen, 
  Target, 
  MessageCircle, 
  Archive, 
  Plus,
  ChevronRight,
  Clock,
  Pin,
  CheckCircle2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { NotionCard, NotionCardContent, NotionCardHeader, NotionCardTitle } from '@/components/ui/notion-card'
import { cn } from '@/lib/utils'

const navigationItems = [
  { icon: Calendar, label: 'Today', active: true, count: 3 },
  { icon: Brain, label: 'Mind', count: 12 },
  { icon: BookOpen, label: 'Journal', count: 7 },
  { icon: Target, label: 'Goals', count: 5 },
  { icon: MessageCircle, label: 'Dialogues', count: 2 },
  { icon: Archive, label: 'Archive' },
]

const ongoingGoals = [
  { title: 'Launch Daksha MVP', progress: 75, dueDate: 'Dec 15' },
  { title: 'YC Application', progress: 90, dueDate: 'Dec 10' },
  { title: 'Daily Journaling', progress: 60, dueDate: 'Ongoing' },
]

const pinnedNotes = [
  { title: 'Product Vision', time: '2h ago' },
  { title: 'User Feedback', time: '1d ago' },
  { title: 'Technical Architecture', time: '3d ago' },
]

export default function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside className={cn(
      "border-r border-border bg-muted/20 transition-all duration-300 flex flex-col",
      collapsed ? "w-16" : "w-80"
    )}>
      {/* Navigation */}
      <div className="p-4 space-y-1">
        {navigationItems.map((item, index) => (
          <Button
            key={index}
            variant="ghost"
            className={cn(
              "w-full justify-start gap-3 h-9 font-medium transition-all",
              item.active && "bg-accent text-accent-foreground shadow-sm",
              collapsed && "justify-center px-2"
            )}
          >
            <item.icon className="w-4 h-4 flex-shrink-0" />
            {!collapsed && (
              <>
                <span className="flex-1 text-left">{item.label}</span>
                {item.count && (
                  <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
                    {item.count}
                  </span>
                )}
              </>
            )}
          </Button>
        ))}
        
        {!collapsed && (
          <Button variant="ghost" className="w-full justify-start gap-3 h-9 text-muted-foreground">
            <Plus className="w-4 h-4" />
            <span>Add Section</span>
          </Button>
        )}
      </div>

      {!collapsed && (
        <>
          {/* Ongoing Goals */}
          <div className="px-4 pb-4">
            <NotionCard className="shadow-none border-border/50">
              <NotionCardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-primary" />
                  <NotionCardTitle className="text-sm">Ongoing Goals</NotionCardTitle>
                </div>
              </NotionCardHeader>
              <NotionCardContent className="space-y-3">
                {ongoingGoals.map((goal, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{goal.title}</span>
                      <span className="text-xs text-muted-foreground">{goal.dueDate}</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-1.5">
                      <div 
                        className="bg-primary h-1.5 rounded-full transition-all duration-500" 
                        style={{ width: `${goal.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </NotionCardContent>
            </NotionCard>
          </div>

          {/* Pinned Notes */}
          <div className="px-4 pb-4">
            <NotionCard className="shadow-none border-border/50">
              <NotionCardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Pin className="w-4 h-4 text-orange-500" />
                  <NotionCardTitle className="text-sm">Pinned Notes</NotionCardTitle>
                </div>
              </NotionCardHeader>
              <NotionCardContent className="space-y-2">
                {pinnedNotes.map((note, index) => (
                  <div key={index} className="flex items-center justify-between p-2 rounded-md hover:bg-accent/50 cursor-pointer transition-colors">
                    <span className="text-sm">{note.title}</span>
                    <span className="text-xs text-muted-foreground">{note.time}</span>
                  </div>
                ))}
              </NotionCardContent>
            </NotionCard>
          </div>

          {/* Today's Tasks */}
          <div className="px-4 pb-4 flex-1">
            <NotionCard className="shadow-none border-border/50">
              <NotionCardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <NotionCardTitle className="text-sm">Today's Tasks</NotionCardTitle>
                </div>
              </NotionCardHeader>
              <NotionCardContent className="space-y-2">
                <div className="flex items-center gap-2 p-2 rounded-md hover:bg-accent/50 cursor-pointer">
                  <div className="w-4 h-4 border border-border rounded-sm" />
                  <span className="text-sm">Review user feedback</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-md hover:bg-accent/50 cursor-pointer">
                  <div className="w-4 h-4 bg-primary rounded-sm flex items-center justify-center">
                    <CheckCircle2 className="w-3 h-3 text-primary-foreground" />
                  </div>
                  <span className="text-sm line-through text-muted-foreground">Morning journal</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-md hover:bg-accent/50 cursor-pointer">
                  <div className="w-4 h-4 border border-border rounded-sm" />
                  <span className="text-sm">Plan tomorrow</span>
                </div>
              </NotionCardContent>
            </NotionCard>
          </div>
        </>
      )}

      {/* Collapse Toggle */}
      <div className="p-4 border-t border-border">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="w-full justify-center"
        >
          <ChevronRight className={cn("w-4 h-4 transition-transform", !collapsed && "rotate-180")} />
        </Button>
      </div>
    </aside>
  )
}