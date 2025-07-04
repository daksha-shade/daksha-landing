"use client"

import { useUser } from '@stackframe/stack'
import DashboardMainSimple from '@/components/dashboard/DashboardMainSimple'
import { redirect } from 'next/navigation'

export default function DashboardPage() {
  const user = useUser()

  // Show loading state while checking authentication
  if (user === null) {
    redirect('/handler/sign-in');
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  // Redirect to sign in if user is not authenticated
  if (user === undefined) {
    window.location.href = '/handler/sign-in'
    return null
  }

  return <DashboardMainSimple />
}