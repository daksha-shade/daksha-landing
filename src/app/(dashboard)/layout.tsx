import type { Metadata } from 'next';
import { Inter, Crimson_Text } from 'next/font/google'
import DashboardHeader from '@/components/dashboard/DashboardHeader'
import DashboardSidebar from '@/components/dashboard/DashboardSidebar'
import DashboardCommandBar from '@/components/dashboard/DashboardCommandBar'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'

export const metadata: Metadata = {
  title: 'Dashboard - Daksha',
  description: 'Your personal AI-powered dashboard for journaling, goal tracking, and memory management.',
};

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const crimsonText = Crimson_Text({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['400', '600', '700']
})

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute>
      <div className={`${inter.variable} ${crimsonText.variable} min-h-screen  bg-secondary  text-[#1f1f1f] dark:text-white  transition-colors duration-300`}>
        {/* Header */}
        <DashboardHeader />
        
        {/* Main Layout */}
        <div className="flex">
          {/* Sidebar */}
          <DashboardSidebar />
          
          {/* Main Content */}
          <main className="flex-1 min-h-[calc(100vh-4rem)]   transition-all duration-300 md:ml-0 pt-16" style={{ marginLeft: 'var(--sidebar-width, 0px)' }}>
            <div className="">
              {children}
            </div>
          </main>
        </div>
        
        {/* Command Bar */}
        <DashboardCommandBar />
      </div>
    </ProtectedRoute>
  )
}