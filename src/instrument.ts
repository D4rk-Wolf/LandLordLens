import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration({
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],
  // 10% of transactions in production to keep costs reasonable; full capture in dev
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  tracePropagationTargets: [
    'localhost',
    /^https:\/\/.*\.onrender\.com/,
    /^https:\/\/.*\.landlordlens\./,
  ],
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  enableLogs: true,
});
