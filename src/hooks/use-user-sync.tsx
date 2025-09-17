"use client";

import { useUser } from '@stackframe/stack';
import { useEffect, useRef, useState } from 'react';

export function useUserSync() {
  // Don't force redirect - let pages handle auth requirements individually
  const user = useUser();
  const syncedRef = useRef<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function syncUser() {
      // Only sync if user is authenticated and we haven't synced this user yet
      if (user && user.id && syncedRef.current !== user.id && !isLoading) {
        setIsLoading(true);
        try {
          const response = await fetch('/api/auth/sync-user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (response.ok) {
            const result = await response.json();
            console.log('User synced successfully:', result);
            syncedRef.current = user.id;
          } else {
            const error = await response.json();
            console.error('Failed to sync user:', error);
          }
        } catch (error) {
          console.error('Error syncing user:', error);
        } finally {
          setIsLoading(false);
        }
      }
    }

    syncUser();
  }, [user, isLoading]);

  return { user, isLoading };
}

// HOC to wrap components that need automatic user sync
export function withUserSync<P extends object>(
  Component: React.ComponentType<P>
) {
  return function UserSyncWrapper(props: P) {
    useUserSync();
    return <Component {...props} />;
  };
}