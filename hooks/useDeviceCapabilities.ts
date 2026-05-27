'use client';

import { useEffect, useState } from 'react';

interface DeviceCapabilities {
  hasWebGL: boolean;
  supportsWebGLTier: 'high' | 'medium' | 'low';
  isMobile: boolean;
  isTablet: boolean;
  isHighDPI: boolean;
  maxParticles: number;
  canUseGPU: boolean;
  battery?: number;
  isLowBattery: boolean;
  connection?: 'slow-2g' | '2g' | '3g' | '4g' | '5g' | 'unknown';
  prefersReducedMotion: boolean;
  supportsBackdropFilter: boolean;
}

/**
 * Detect device capabilities for adaptive rendering
 * Enables high-performance features on capable devices
 */
export function useDeviceCapabilities(): DeviceCapabilities {
  const [capabilities, setCapabilities] = useState<DeviceCapabilities>({
    hasWebGL: false,
    supportsWebGLTier: "low",
    isMobile: false,
    isTablet: false,
    isHighDPI: false,
    maxParticles: 1000,
    canUseGPU: false,
    isLowBattery: false,
    prefersReducedMotion: false,
    supportsBackdropFilter: false,
  });

  useEffect(() => {
    // WebGL detection
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl") || canvas.getContext("webgl2");
    const hasWebGL = !!gl;

    // WebGL tier detection
    let supportsWebGLTier: "high" | "medium" | "low" = "low";
    if (hasWebGL && gl) {
      const maxTexture = gl.getParameter(gl.MAX_TEXTURE_SIZE);
      supportsWebGLTier = maxTexture >= 4096 ? "high" : "medium";
    }

    // Device detection
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobile = /mobile|android|iphone|ipod/.test(userAgent);
    const isTablet = /tablet|ipad/.test(userAgent);
    const isHighDPI =
      typeof window !== "undefined" && window.devicePixelRatio > 1.5;

    // GPU capability detection
    const canUseGPU = hasWebGL && !isMobile;
    const maxParticles = isMobile ? 500 : isTablet ? 1000 : 2500;

    // Battery API
    let battery: number | undefined;
    let isLowBattery = false;
    if ("getBattery" in navigator) {
      (navigator as any).getBattery?.().then((batteryManager: any) => {
        battery = Math.round(batteryManager.level * 100);
        isLowBattery = battery < 20;
      });
    }

    // Network detection
    const connection = (navigator as any).connection;
    const connectionType = connection?.effectiveType ?? "unknown";

    // Reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Backdrop filter support
    const supportsBackdropFilter = CSS.supports(
      "backdrop-filter",
      "blur(10px)"
    );

    setCapabilities({
      hasWebGL,
      supportsWebGLTier,
      isMobile,
      isTablet,
      isHighDPI,
      maxParticles,
      canUseGPU,
      battery,
      isLowBattery,
      connection: connectionType as any,
      prefersReducedMotion,
      supportsBackdropFilter,
    });
  }, []);

  return capabilities;
}
