// Mock Google Analytics implementation
export const initAnalytics = () => {
  // Initialize analytics in production
  if (process.env.NODE_ENV === 'production') {
    console.log('Analytics initialized');
  }
};

export const trackEvent = (category: string, action: string, label?: string, value?: number) => {
  // Track events in production
  if (process.env.NODE_ENV === 'production') {
    console.log('Event tracked:', { category, action, label, value });
  }
};

export const trackPageView = (path: string) => {
  // Track page views in production
  if (process.env.NODE_ENV === 'production') {
    console.log('Page view tracked:', path);
  }
};