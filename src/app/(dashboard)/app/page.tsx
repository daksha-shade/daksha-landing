import DashboardHeader from '@/components/dashboard/DashboardHeader'
import DashboardSidebar from '@/components/dashboard/DashboardSidebar'
import DashboardMainSimple from '@/components/dashboard/DashboardMainSimple'
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
          <DashboardMainSimple />
        </main>
      </div>
      
      {/* Command Bar */}
      <DashboardCommandBar />
    </div>
  )
}