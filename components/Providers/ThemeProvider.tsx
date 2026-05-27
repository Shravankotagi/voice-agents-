// components/Providers/ThemeProvider.tsx
'use client';

import { ReactNode, useEffect, useState } from 'react';

interface ThemeProviderProps {
  children: ReactNode;
}

/**
 * Theme provider with system preference detection
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light' | 'system'>('system');

  useEffect(() => {
    setMounted(true);

    // Check system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    const savedTheme = localStorage.getItem('theme-preference') as 'dark' | 'light' | 'system' | null;

    const currentTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    setTheme(currentTheme);

    // Apply theme
    const applyTheme = (t: string) => {
      if (t === 'dark' || (t === 'system' && prefersDark)) {
        document.documentElement.classList.add('dark');
        document.documentElement.style.colorScheme = 'dark';
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.style.colorScheme = 'light';
      }
    };

    applyTheme(currentTheme);

    // Listen for changes
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      applyTheme(e.matches ? 'dark' : 'light');
    };

    darkModeQuery.addEventListener('change', handleChange);

    return () => darkModeQuery.removeEventListener('change', handleChange);
  }, []);

  if (!mounted) return null;

  return <>{children}</>;
}
