// components/Providers/AnalyticsProvider.tsx
'use client';

import { ReactNode, useEffect } from 'react';

interface AnalyticsProviderProps {
  children: ReactNode;
}

/**
 * Analytics integration provider
 */
export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  useEffect(() => {
    // Initialize analytics
    if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_ANALYTICS_ID) {
      // Track page view
      window.dispatchEvent(
        new CustomEvent('analytics:pageview', {
          detail: {
            path: window.location.pathname,
            title: document.title,
            timestamp: new Date().toISOString(),
          },
        })
      );

      // Monitor performance
      if ('PerformanceObserver' in window) {
        try {
          const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              window.dispatchEvent(
                new CustomEvent('analytics:performance', {
                  detail: entry,
                })
              );
            }
          });

          observer.observe({
            entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'],
          });

          return () => observer.disconnect();
        } catch (e) {
          // Fallback for unsupported browsers
        }
      }
    }
  }, []);

  return <>{children}</>;
}
