'use client';

import { useState, useEffect, useCallback } from 'react';
import { Industry } from '@/types';
import { industries } from '@/data/industries';

export function useIndustryTheme(): {
  activeIndustry: Industry;
  setIndustry: (id: string) => void;
} {
  const [activeIndustry, setActiveIndustry] = useState<Industry>(industries[0]);

  const setIndustry = useCallback((id: string) => {
    const found = industries.find((ind) => ind.id === id);
    if (found) {
      setActiveIndustry(found);
    }
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty('--color-primary', activeIndustry.primaryColor);
  }, [activeIndustry]);

  return { activeIndustry, setIndustry };
}

