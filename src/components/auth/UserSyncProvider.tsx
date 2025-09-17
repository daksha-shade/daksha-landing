"use client";

import { Suspense } from 'react';
import { useUserSync } from '@/hooks/use-user-sync';

function UserSyncInner({ children }: { children: React.ReactNode }) {
  // This will automatically sync user data when a user is logged in
  useUserSync();
  
  return <>{children}</>;
}

export function UserSyncProvider({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    }>
      <UserSyncInner>{children}</UserSyncInner>
    </Suspense>
  );
}