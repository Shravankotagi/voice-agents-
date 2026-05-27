'use client';

import { useEffect, useState } from 'react';

/**
 * WCAG AAA compliant skip navigation link
 * Visible on focus, allows keyboard users to skip to main content
 */
export function SkipNavigation() {
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        setIsFocused(true);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') {
        setIsFocused(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <a
      href="#main-content"
      className={`fixed top-0 left-0 z-[10000] px-4 py-2 bg-cyan-500 text-black font-semibold rounded-br-md transition-transform duration-200 ${
        isFocused ? 'translate-y-0' : '-translate-y-full'
      }`}
      aria-label="Skip to main content"
      role="navigation"
      aria-hidden={!isFocused}
    >
      Skip to Main Content
    </a>
  );
}
