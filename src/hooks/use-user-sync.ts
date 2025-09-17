"use client";

import { useUser } from '@stackframe/stack';
import { useEffect, useRef } from 'react';

export function useUserSync() {
  const user = useUser();
  const syncedRef = useRef<string | null>(null);

  useEffect(() => {
    async function syncUser() {
      if (user && user.id && syncedRef.current !== user.id) {
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
        }
      }
    }

    syncUser();
  }, [user]);

  return user;
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