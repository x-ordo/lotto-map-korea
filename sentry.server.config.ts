/**
 * Sentry Server Configuration
 * This file configures Sentry for the Node.js server-side
 */

import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Performance Monitoring
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

  // Only send errors in production
  enabled: process.env.NODE_ENV === 'production',

  // Environment tag
  environment: process.env.NODE_ENV,

  // Release tracking
  release: process.env.SENTRY_RELEASE || process.env.NEXT_PUBLIC_SENTRY_RELEASE,

  // Ignore common server errors
  ignoreErrors: [
    // Expected errors
    'ECONNRESET',
    'ENOTFOUND',
    'ETIMEDOUT',
    // Rate limiting (expected behavior)
    '요청 한도를 초과했습니다',
  ],

  // Filter out sensitive data
  beforeSend(event) {
    // Remove sensitive headers
    if (event.request?.headers) {
      const sensitiveHeaders = ['authorization', 'cookie', 'x-api-key'];
      sensitiveHeaders.forEach(header => {
        if (event.request?.headers?.[header]) {
          event.request.headers[header] = '[REDACTED]';
        }
      });
    }
    return event;
  },
});
