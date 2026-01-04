'use client';

/**
 * Service Worker Provider
 * Initializes service worker and provides offline status
 */

import { useEffect, useState, useRef } from 'react';
import { useServiceWorker } from '@/lib/hooks/useServiceWorker';

interface Props {
  children: React.ReactNode;
}

export default function ServiceWorkerProvider({ children }: Props) {
  const { isOnline } = useServiceWorker();
  const [showOfflineBanner, setShowOfflineBanner] = useState(false);
  const wasOfflineRef = useRef(false);
  const prevIsOnlineRef = useRef(isOnline);

  // Track online/offline state changes
  useEffect(() => {
    // Skip on initial mount
    if (prevIsOnlineRef.current === isOnline) return;

    prevIsOnlineRef.current = isOnline;

    if (!isOnline) {
      wasOfflineRef.current = true;
      // Use requestAnimationFrame to avoid synchronous setState warning
      requestAnimationFrame(() => setShowOfflineBanner(true));
    } else if (wasOfflineRef.current) {
      // Back online after being offline
      const timer = setTimeout(() => {
        setShowOfflineBanner(false);
        wasOfflineRef.current = false;
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isOnline]);

  // Listen for service worker update events
  useEffect(() => {
    const handleSwUpdate = () => {
      // Could show a toast notification here
      console.log('[App] New version available, reload to update');
    };

    window.addEventListener('swUpdate', handleSwUpdate);
    return () => window.removeEventListener('swUpdate', handleSwUpdate);
  }, []);

  return (
    <>
      {children}

      {/* Offline Banner */}
      {showOfflineBanner && (
        <div
          className={`fixed bottom-20 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
            isOnline ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
          }`}
          role="status"
          aria-live="polite"
        >
          <div className="bg-amber-500 text-white px-4 py-2 rounded-full shadow-lg text-sm font-medium flex items-center gap-2">
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414"
              />
            </svg>
            <span>오프라인 모드</span>
          </div>
        </div>
      )}

      {/* Online restored notification */}
      {showOfflineBanner && isOnline && (
        <div
          className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 animate-fade-in"
          role="status"
          aria-live="polite"
        >
          <div className="bg-emerald-500 text-white px-4 py-2 rounded-full shadow-lg text-sm font-medium flex items-center gap-2">
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
              />
            </svg>
            <span>온라인 복귀</span>
          </div>
        </div>
      )}
    </>
  );
}
