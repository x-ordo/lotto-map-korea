/**
 * Sentry Client Configuration
 * This file configures Sentry for the browser/client-side
 */

import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Performance Monitoring
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

  // Session Replay (optional - captures user interactions)
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,

  // Only send errors in production
  enabled: process.env.NODE_ENV === 'production',

  // Environment tag
  environment: process.env.NODE_ENV,

  // Release tracking (set via CI/CD)
  release: process.env.NEXT_PUBLIC_SENTRY_RELEASE,

  // Ignore common browser errors
  ignoreErrors: [
    // Browser extensions
    /^chrome-extension:\/\//,
    /^moz-extension:\/\//,
    // Network errors
    'Network request failed',
    'Failed to fetch',
    'Load failed',
    // User-initiated aborts
    'AbortError',
    // Kakao Maps SDK errors (expected)
    /kakao/i,
  ],

  // Filter out sensitive data
  beforeSend(event) {
    // Remove sensitive data from breadcrumbs
    if (event.breadcrumbs) {
      event.breadcrumbs = event.breadcrumbs.map(breadcrumb => {
        if (breadcrumb.data?.url) {
          // Remove API keys from URLs
          breadcrumb.data.url = breadcrumb.data.url.replace(
            /appkey=[^&]+/gi,
            'appkey=[REDACTED]'
          );
        }
        return breadcrumb;
      });
    }
    return event;
  },

  integrations: [
    Sentry.replayIntegration({
      // Mask all text and block all media
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],
});
