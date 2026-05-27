// src/hooks/useAccessibility.ts

'use client';

import { useEffect, useState } from 'react';

export function useAccessibility() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const contrastQuery = window.matchMedia('(prefers-contrast: more)');

    setReducedMotion(motionQuery.matches);
    setHighContrast(contrastQuery.matches);

    const handleMotionChange = () => {
      setReducedMotion(motionQuery.matches);
    };

    const handleContrastChange = () => {
      setHighContrast(contrastQuery.matches);
    };

    motionQuery.addEventListener('change', handleMotionChange);
    contrastQuery.addEventListener('change', handleContrastChange);

    return () => {
      motionQuery.removeEventListener('change', handleMotionChange);
      contrastQuery.removeEventListener('change', handleContrastChange);
    };
  }, []);

  return {
    reducedMotion,
    highContrast,
  };
}
