// components/Providers/FeatureFlagsProvider.tsx
'use client';

import { ReactNode, createContext, useContext } from 'react';

interface FeatureFlags {
  enablePerformanceMonitoring: boolean;
  enableAnalytics: boolean;
  enableNewUI: boolean;
  enableExperimentalFeatures: boolean;
}

const FeatureFlagsContext = createContext<FeatureFlags>({
  enablePerformanceMonitoring: process.env.NEXT_PUBLIC_ENABLE_PERF_MONITOR === 'true',
  enableAnalytics: process.env.NEXT_PUBLIC_ANALYTICS_ID !== undefined,
  enableNewUI: process.env.NEXT_PUBLIC_ENABLE_NEW_UI === 'true',
  enableExperimentalFeatures: process.env.NODE_ENV === 'development',
});

interface FeatureFlagsProviderProps {
  children: ReactNode;
}

/**
 * Feature flags provider for gradual rollout
 */
export function FeatureFlagsProvider({ children }: FeatureFlagsProviderProps) {
  const flags: FeatureFlags = {
    enablePerformanceMonitoring: process.env.NEXT_PUBLIC_ENABLE_PERF_MONITOR === 'true',
    enableAnalytics: Boolean(process.env.NEXT_PUBLIC_ANALYTICS_ID),
    enableNewUI: process.env.NEXT_PUBLIC_ENABLE_NEW_UI === 'true',
    enableExperimentalFeatures: process.env.NODE_ENV === 'development',
  };

  return (
    <FeatureFlagsContext.Provider value={flags}>{children}</FeatureFlagsContext.Provider>
  );
}

/**
 * Hook to use feature flags
 */
export function useFeatureFlags() {
  return useContext(FeatureFlagsContext);
}
