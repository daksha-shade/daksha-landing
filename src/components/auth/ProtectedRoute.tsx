"use client";

import { useUser } from '@stackframe/stack';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  redirectTo?: string;
}

export function ProtectedRoute({ 
  children, 
  fallback,
  redirectTo = '/handler/sign-in?after_auth_return_to=' 
}: ProtectedRouteProps) {
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      // User is explicitly not authenticated, redirect to sign in
      const currentPath = encodeURIComponent(window.location.pathname);
      router.push(`${redirectTo}${currentPath}`);
    }
  }, [user, router, redirectTo]);

  // Show loading while user state is being determined
  if (user === undefined) {
    return fallback || (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // User is not authenticated
  if (user === null) {
    return fallback || (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Authentication Required</h2>
          <p className="text-gray-600">Redirecting to sign in...</p>
        </div>
      </div>
    );
  }

  // User is authenticated, render children
  return <>{children}</>;
}

// Hook for pages that need authentication
export function useRequireAuth() {
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      const currentPath = encodeURIComponent(window.location.pathname);
      router.push(`/handler/sign-in?after_auth_return_to=${currentPath}`);
    }
  }, [user, router]);

  return user;
}