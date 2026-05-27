// app/layout-content.tsx
'use client';

import { ReactNode, Suspense, useEffect } from 'react';
import { SkipToMainContent } from '@/components/Accessibility/SkipToMainContent';
import { MotionPerformanceMonitor } from '@/components/Performance/MotionPerformanceMonitor';
import { GlobalErrorBoundary } from '@/components/Error/GlobalErrorBoundary';
import { LoadingFallback } from '@/components/Fallbacks/LoadingFallback';
import { useAccessibility } from '@/hooks/useAccessibility';

interface RootLayoutContentProps {
  children: ReactNode;
}

/**
 * Main content wrapper with accessibility layer
 * Isolated boundary for error handling and performance
 */
export function RootLayoutContent({ children }: RootLayoutContentProps) {
  useAccessibility();

  useEffect(() => {
    // Announce route changes for screen readers
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    document.body.appendChild(announcement);

    return () => {
      document.body.removeChild(announcement);
    };
  }, []);

  return (
    <>
      <SkipToMainContent />
      <MotionPerformanceMonitor />

      <GlobalErrorBoundary>
        <Suspense fallback={<LoadingFallback />}>
          <main
            id="main-content"
            className="relative z-10 isolate min-h-screen w-full"
            role="main"
            aria-label="Main content"
          >
            {children}
          </main>
        </Suspense>
      </GlobalErrorBoundary>
    </>
  );
}
