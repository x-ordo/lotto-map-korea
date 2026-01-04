/**
 * Service Worker Registration Hook
 * Handles PWA service worker lifecycle
 */

import { useEffect, useState } from 'react';

interface ServiceWorkerState {
  isSupported: boolean;
  isRegistered: boolean;
  isOnline: boolean;
  registration: ServiceWorkerRegistration | null;
  error: Error | null;
}

export function useServiceWorker() {
  const [state, setState] = useState<ServiceWorkerState>({
    isSupported: false,
    isRegistered: false,
    isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
    registration: null,
    error: null,
  });

  useEffect(() => {
    // Check if service workers are supported
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
      return;
    }

    setState((prev) => ({ ...prev, isSupported: true }));

    // Online/offline event handlers
    const handleOnline = () => setState((prev) => ({ ...prev, isOnline: true }));
    const handleOffline = () => setState((prev) => ({ ...prev, isOnline: false }));

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Register service worker
    const registerSW = async () => {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js', {
          scope: '/',
          updateViaCache: 'none',
        });

        setState((prev) => ({
          ...prev,
          isRegistered: true,
          registration,
        }));

        // Check for updates periodically
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // New service worker available
                console.log('[SW] New version available');
                // Could dispatch custom event for UI notification
                window.dispatchEvent(new CustomEvent('swUpdate', { detail: registration }));
              }
            });
          }
        });

        // Handle controller change (new SW activated)
        navigator.serviceWorker.addEventListener('controllerchange', () => {
          console.log('[SW] Controller changed, reloading for updates');
          // Optionally reload to apply updates
          // window.location.reload();
        });

        console.log('[SW] Registered successfully');
      } catch (error) {
        console.error('[SW] Registration failed:', error);
        setState((prev) => ({
          ...prev,
          error: error instanceof Error ? error : new Error('Service worker registration failed'),
        }));
      }
    };

    // Register after page load for better performance
    if (document.readyState === 'complete') {
      registerSW();
    } else {
      window.addEventListener('load', registerSW);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('load', registerSW);
    };
  }, []);

  // Update service worker manually
  const update = async () => {
    if (state.registration) {
      try {
        await state.registration.update();
        console.log('[SW] Update check initiated');
      } catch (error) {
        console.error('[SW] Update check failed:', error);
      }
    }
  };

  // Skip waiting and activate new service worker
  const skipWaiting = () => {
    if (state.registration?.waiting) {
      state.registration.waiting.postMessage({ type: 'SKIP_WAITING' });
    }
  };

  return {
    ...state,
    update,
    skipWaiting,
  };
}
