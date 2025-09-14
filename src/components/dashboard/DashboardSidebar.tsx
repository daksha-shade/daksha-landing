"use client"

import React, { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useUser } from '@stackframe/stack'
import {
  BookOpen,
  Target,
  MessageCircle,
  ChevronLeft,
  Settings,
  LogOut,
  Menu,
  Activity,
  FileText
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navigationItems = [
  { icon: Activity, label: 'Dashboard', href: '/app' },
  { icon: BookOpen, label: 'Journal', href: '/journal' },
  { icon: Target, label: 'Goals', href: '/goals' },
  { icon: FileText, label: 'Context', href: '/context' },
  { icon: MessageCircle, label: 'Chat', href: '/chat' },
  { icon: Settings, label: 'Settings', href: '/settings' }
]


export default function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const user = useUser()

  const signOut = async () => {
    if (user) {
      await user.signOut()
    }
  }

  // Update CSS variable for main content margin
  React.useEffect(() => {
    // Only set margin on desktop
    if (window.innerWidth >= 768) {
      document.documentElement.style.setProperty('--sidebar-width', collapsed ? '64px' : '256px')
    } else {
      document.documentElement.style.setProperty('--sidebar-width', '0px')
    }
  }, [collapsed])

  // Handle window resize
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        document.documentElement.style.setProperty('--sidebar-width', collapsed ? '64px' : '256px')
      } else {
        document.documentElement.style.setProperty('--sidebar-width', '0px')
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [collapsed])

  const SidebarContent = () => (
    <>
      {/* User Profile Section */}
      {/* {!collapsed && user && (
        <div className="p-4 border-b border-border/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user.displayName || 'User'}</p>
              <p className="text-xs text-muted-foreground truncate">{user.primaryEmail}</p>
            </div>
          </div>
        </div>
      )} */}

      {/* Navigation */}
      <div className="flex-1 p-3">
        <div className="space-y-1">
          {navigationItems.map((item, index) => {
            const isActive = pathname === item.href
            return (
              <Link key={index} href={item.href}>
                <div
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all hover:bg-accent/50",
                    isActive && "bg-accent text-accent-foreground",
                    collapsed && "justify-center px-2"
                  )}
                >
                  <item.icon className="w-4 h-4 flex-shrink-0" />
                  {!collapsed && (
                    <span className="flex-1 text-left">{item.label}</span>
                  )}
                </div>
              </Link>
            )
          })}
        </div>

      </div>

      {/* Bottom Section */}
      <div className="p-3 border-t border-border/10">
        {!collapsed && user && (
          <div className="flex items-center gap-3 mb-3 px-1">

            <div className="flex-1 min-w-0 ml-4">
              <p className="text-xs font-medium truncate">{user.displayName || 'User'}</p>
              <p className="text-[11px] text-muted-foreground truncate">{user.primaryEmail}</p>
            </div>
            <button
              onClick={signOut}
              className="ml-2 p-1 rounded hover:bg-accent/50 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4 text-muted-foreground hover:text-foreground" />
            </button>
          </div>
        )}
        {/* Settings and Sign Out */}
        {!collapsed && user && (
          <div className="space-y-1 mb-3">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-9 text-muted-foreground hover:text-foreground hover:bg-accent/50"
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </Button>

          </div>
        )}

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="w-full justify-center h-8"
        >
          <ChevronLeft className={cn("w-4 h-4 transition-transform", collapsed && "rotate-180")} />
        </Button>
      </div>
    </>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={cn(
        "border-r border-border/10 bg-white dark:bg-[#1f1f1f] transition-all duration-300 flex flex-col fixed left-0 top-16 h-[calc(100vh-4rem)] z-40 hidden md:flex",
        collapsed ? "w-16" : "w-64"
      )}>
        <SidebarContent />
      </aside>

      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setMobileOpen(true)}
        className="fixed top-5 left-4 z-50 md:hidden backdrop-blur-sm border border-border/20 shadow-sm"
      >
        <Menu className="w-4 h-4" />
      </Button>

      {/* Mobile Sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <aside className="fixed left-0 top-0 h-full w-64 bg-white dark:bg-[#1f1f1f] border-r border-border/10 flex flex-col">
            <div className="p-4 border-b border-border/10 flex items-center justify-between">
              <h2 className="font-serif font-semibold">Daksha</h2>
              <Button variant="ghost" size="sm" onClick={() => setMobileOpen(false)}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
            </div>
            <SidebarContent />
          </aside>
        </div>
      )}
    </>
  )
}