import { Workbox } from 'workbox-window';

export const registerServiceWorker = () => {
  // Only attempt registration in production and supported environments
  if (
    import.meta.env.PROD && 
    'serviceWorker' in navigator &&
    !window.location.hostname.includes('stackblitz.io')
  ) {
    try {
      const wb = new Workbox('/sw.js');

      wb.addEventListener('installed', (event) => {
        if (event.isUpdate) {
          if (confirm('New version available! Click OK to update.')) {
            window.location.reload();
          }
        }
      });

      wb.register().catch((error) => {
        // Log error but don't disrupt the user experience
        console.warn('Service worker registration failed:', error);
      });
    } catch (error) {
      // Silently handle any errors in development or unsupported environments
      console.warn('Service worker setup skipped:', error);
    }
  }
};