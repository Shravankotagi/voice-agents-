'use client';

import { useEffect, useRef, useState } from 'react';

interface ScrollPosition {
  x: number;
  y: number;
  isScrolling: boolean;
  direction: 'up' | 'down' | 'none';
}

/**
 * Custom hook for scroll position tracking
 * Optimized for smooth scrolling systems like Lenis
 */

export function useScrollPosition(): ScrollPosition {
  const [position, setPosition] = useState<ScrollPosition>({
    x: 0,
    y: 0,
    isScrolling: false,
    direction: 'none',
  });

  const previousYRef = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollX = window.scrollX;
      const scrollY = window.scrollY;

      const direction: 'up' | 'down' | 'none' =
        scrollY > previousYRef.current
          ? 'down'
          : scrollY < previousYRef.current
          ? 'up'
          : 'none';

      setPosition({
        x: scrollX,
        y: scrollY,
        isScrolling: true,
        direction,
      });

      previousYRef.current = scrollY;

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setPosition((prev) => ({
          ...prev,
          isScrolling: false,
        }));
      }, 150);
    };

    const handleLenisScroll = (event: Event) => {
      if (event instanceof CustomEvent) {
        handleScroll();
      }
    };

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    window.addEventListener('lenis:scroll', handleLenisScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('lenis:scroll', handleLenisScroll);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return position;
}
