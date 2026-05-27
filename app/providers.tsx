'use client';

import { ReactNode, Suspense } from 'react';
import { ThemeProvider } from '@/components/Providers/ThemeProvider';
import { AnalyticsProvider } from '@/components/Providers/AnalyticsProvider';
import { FeatureFlagsProvider } from '@/components/Providers/FeatureFlagsProvider';
import { AccessibilityProvider } from '@/components/Providers/AccessibilityProvider';

interface ProvidersProps {
  children: ReactNode;
}

/**
 * Root provider composition with optimized nesting order
 * Critical providers at top level, feature providers below
 */
export function Providers({ children }: ProvidersProps) {
  return (
    <AccessibilityProvider>
      <ThemeProvider>
        <AnalyticsProvider>
          <FeatureFlagsProvider>
            <Suspense fallback={null}>{children}</Suspense>
          </FeatureFlagsProvider>
        </AnalyticsProvider>
      </ThemeProvider>
    </AccessibilityProvider>
  );
}
