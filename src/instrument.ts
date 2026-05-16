import * as Sentry from '@sentry/react';

Sentry.init({
  // DSN is a public value — safe to hardcode. Override via SENTRY_DSN env var if needed.
  dsn: process.env.SENTRY_DSN || 'https://b53a33de4d809cff5ffae9c642897883@o4510669168181248.ingest.us.sentry.io/4511400968454144',
  environment: process.env.NODE_ENV,
  sendDefaultPii: true,
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
