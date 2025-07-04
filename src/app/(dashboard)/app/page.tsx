import DashboardHeader from '@/components/dashboard/DashboardHeader'
import DashboardSidebar from '@/components/dashboard/DashboardSidebar'
import DashboardMain from '@/components/dashboard/DashboardMain'
import DashboardCommandBar from '@/components/dashboard/DashboardCommandBar'

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <DashboardHeader />
      
      {/* Main Layout */}
      <div className="flex">
        {/* Sidebar */}
        <DashboardSidebar />
        
        {/* Main Content */}
        <main className="flex-1 min-h-[calc(100vh-4rem)]">
          <DashboardMain />
        </main>
      </div>
      
      {/* Command Bar */}
      <DashboardCommandBar />
    </div>
  )
}