import * as Sentry from '@sentry/react';

export const initErrorReporting = () => {
  if (process.env.NODE_ENV === 'production') {
    Sentry.init({
      dsn: "YOUR_SENTRY_DSN", // Replace with actual DSN in production
      integrations: [
        new Sentry.BrowserTracing(),
        new Sentry.Replay(),
      ],
      tracesSampleRate: 1.0,
      replaysSessionSampleRate: 0.1,
      replaysOnErrorSampleRate: 1.0,
    });
  }
};

export const reportError = (error: Error, context?: Record<string, any>) => {
  console.error('Error:', error);
  if (process.env.NODE_ENV === 'production') {
    Sentry.captureException(error, { extra: context });
  }
};