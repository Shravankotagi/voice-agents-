'use client';

import { ReactNode } from 'react';
import { useAccessibility } from '@/hooks/useAccessibility';

interface AccessibilityProviderProps {
  children: ReactNode;
}

/**
 * Accessibility provider wrapper
 * Initializes all accessibility features
 */
export function AccessibilityProvider({ children }: AccessibilityProviderProps) {
  useAccessibility();
  return <>{children}</>;
}
