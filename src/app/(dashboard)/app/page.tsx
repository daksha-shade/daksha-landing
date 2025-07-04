"use client"

import { useUser } from '@stackframe/stack'
import DashboardMainSimple from '@/components/dashboard/DashboardMainSimple'
import { Button } from '@/components/ui/button'

export default function DashboardPage() {
  const user = useUser()

  // Show loading state while checking authentication
  if (user === null) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  // Show sign in prompt if user is not authenticated
  if (user === undefined) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-6 max-w-md">
          <div className="space-y-2">
            <h1 className="text-2xl font-serif font-semibold">Welcome to Daksha</h1>
            <p className="text-muted-foreground">
              Your AI-powered life OS for journaling, reflection, and personal growth.
            </p>
          </div>
          <div className="space-y-3">
            <Button 
              onClick={() => window.location.href = '/sign-in'}
              className="w-full"
              size="lg"
            >
              Sign In to Continue
            </Button>
            <p className="text-xs text-muted-foreground">
              New to Daksha? Signing in will create your account automatically.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return <DashboardMainSimple />
}