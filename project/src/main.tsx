import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import ErrorBoundary from './components/common/ErrorBoundary';
import LoadingSpinner from './components/common/LoadingSpinner';
import { initErrorReporting } from './utils/errorReporting';
import { initAnalytics } from './utils/analytics';
import { registerServiceWorker } from './utils/serviceWorker';
import { reportWebVitals } from './utils/webVitals';

// Initialize error reporting
initErrorReporting();

// Initialize analytics
initAnalytics();

// Register service worker
registerServiceWorker();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <Suspense fallback={
        <div className="flex min-h-screen items-center justify-center">
          <LoadingSpinner size="lg" />
        </div>
      }>
        <App />
      </Suspense>
    </ErrorBoundary>
  </StrictMode>
);

// Report web vitals
reportWebVitals(console.log);