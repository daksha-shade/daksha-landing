import { Inter, Crimson_Text } from 'next/font/google'
import DashboardHeader from '@/components/dashboard/DashboardHeader'
import DashboardSidebar from '@/components/dashboard/DashboardSidebar'
import DashboardCommandBar from '@/components/dashboard/DashboardCommandBar'

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
    <div className={`${inter.variable} ${crimsonText.variable} min-h-screen bg-[#fefefe] dark:bg-[#191919]`}>
      {/* Header */}
      <DashboardHeader />
      
      {/* Main Layout */}
      <div className="flex">
        {/* Sidebar */}
        <DashboardSidebar />
        
        {/* Main Content */}
        <main className="flex-1 min-h-[calc(100vh-4rem)] bg-white dark:bg-[#1f1f1f]">
          {children}
        </main>
      </div>
      
      {/* Command Bar */}
      <DashboardCommandBar />
    </div>
  )
}