'use client';

import { useEffect, useState, useCallback } from 'react';

/**
 * Custom hook for responsive media queries
 * Prevents SSR hydration mismatch
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  const [mounted, setMounted] = useState(false);

  const handleChange = useCallback((e: MediaQueryListEvent) => {
    setMatches(e.matches);
  }, []);

  useEffect(() => {
    setMounted(true);

    if (!window.matchMedia) return;

    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [query, handleChange]);

  return mounted ? matches : false;
}
