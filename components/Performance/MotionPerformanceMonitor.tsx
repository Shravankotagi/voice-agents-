// components/Performance/MotionPerformanceMonitor.tsx
'use client';

import { useEffect, useRef } from 'react';

interface PerformanceMetrics {
  fps: number;
  frameTime: number;
  isThrottled: boolean;
  memoryUsage?: number;
}

const THROTTLE_THRESHOLD = 30;
const PERFORMANCE_MONITORING_ENABLED = process.env.NEXT_PUBLIC_ENABLE_PERF_MONITOR === 'true';

/**
 * Real-time performance monitoring
 * Tracks FPS, frame time, and throttling state
 */
export function MotionPerformanceMonitor() {
  const metricsRef = useRef<PerformanceMetrics>({
    fps: 60,
    frameTime: 16.67,
    isThrottled: false,
    memoryUsage: 0,
  });

  const frameCountRef = useRef(0);
  const lastTimeRef = useRef(performance.now());
  const lastFpsUpdateRef = useRef(performance.now());

  useEffect(() => {
    if (!PERFORMANCE_MONITORING_ENABLED) return;

    let rafId: number;

    const measureFrame = (time: number) => {
      const deltaTime = time - lastTimeRef.current;
      lastTimeRef.current = time;
      frameCountRef.current++;

      // Update metrics every 500ms
      if (time - lastFpsUpdateRef.current >= 500) {
        const fps = Math.round(1000 / deltaTime);
        const isThrottled = fps < THROTTLE_THRESHOLD;

        metricsRef.current = {
          fps,
          frameTime: deltaTime,
          isThrottled,
          memoryUsage: (performance as any).memory?.usedJSHeapSize,
        };

        // Dispatch performance event
        window.dispatchEvent(
          new CustomEvent('performance:metrics', {
            detail: metricsRef.current,
          })
        );

        // Update document class
        document.documentElement.classList.toggle('performance-throttled', isThrottled);

        lastFpsUpdateRef.current = time;
      }

      rafId = requestAnimationFrame(measureFrame);
    };

    rafId = requestAnimationFrame(measureFrame);

    return () => {
      cancelAnimationFrame(rafId);
      document.documentElement.classList.remove('performance-throttled');
    };
  }, []);

  return null;
} 
