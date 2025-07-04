"use client"

import { useUser } from '@stackframe/stack'
import { redirect, useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface AuthGuardProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export default function AuthGuard({ children, fallback }: AuthGuardProps) {
  const user = useUser()
  const router = useRouter()

  useEffect(() => {
    // Redirect to sign-in if user is not authenticated
    if (user === undefined) {
      router.push('/handler/sign-in')
    }
  }, [user, router])

  // Show loading state while checking authentication
  if (user === null) {
    redirect('/handler/sign-in');
    return fallback || (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  // Don't render anything while redirecting
  if (user === undefined) {
    return null
  }

  // Render children only when user is authenticated
  return <>{children}</>
}