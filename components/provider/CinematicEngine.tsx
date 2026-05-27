'use client'

import { useEffect } from 'react'

export default function CinematicEngine({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Prevent double-initialization in React Strict Mode
    if ((window as any).__CAI_OS) return;

    (function CinematicOSEngine() {
      'use strict';

      const ROOT = document.documentElement;
      const BODY = document.body;
      const STORAGE_KEY = 'cai-os-prefs';
      const VERSION = '4.0.0';

      const setVar  = (k: string, v: string) => ROOT.style.setProperty(k, v);
      const setAttr = (k: string, v: string) => ROOT.setAttribute(k, v);
      
      function loadPrefs() {
        try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); }
        catch { return {}; }
      }

      function savePrefs(patch: any) {
        try {
          const prefs = { ...loadPrefs(), ...patch, _v: VERSION };
          localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
        } catch {}
      }

      // --- DEVICE INSPECTOR ---
      const DeviceInspector = {
        async detect() {
          let battery: any = { charging: true, level: 1 };
          try { if ('getBattery' in navigator) battery = await (navigator as any).getBattery(); } catch {}
          
          const mem = (navigator as any).deviceMemory || 4;
          const threads = navigator.hardwareConcurrency || 4;
          const conn = (navigator as any).connection?.effectiveType || '4g';
          const isMobile = /Mobi|Android/i.test(navigator.userAgent);
          const isBatterySaver = !battery.charging && battery.level < 0.2;

          let gpuTier = 'high';
          if (mem <= 1 || threads <= 2 || conn === '2g') gpuTier = 'low';
          else if (mem <= 2 || threads <= 4 || isMobile) gpuTier = 'medium';
          else if (mem >= 8 && threads >= 8 && !isMobile) gpuTier = 'cinematic';
          if (isBatterySaver) gpuTier = 'low';

          return { gpuTier, isMobile, isBatterySaver };
        }
      };

      // --- RENDER BUDGET ---
      const RenderBudget = {
        frames: [] as number[],
        currentTier: 'high' as string,
        
        sample(ts: number) {
          this.frames.push(ts);
          if (this.frames.length > 60) this.frames.shift();
          
          if (this.frames.length >= 30) {
            const elapsed = this.frames[this.frames.length - 1] - this.frames[0];
            const fps = ((this.frames.length - 1) / elapsed) * 1000;
            if (fps < 30 && this.currentTier !== 'low') {
              this.setRenderTier('low');
            }
          }
          requestAnimationFrame((t) => this.sample(t));
        },
        setRenderTier(tier: string) {
          this.currentTier = tier;
          setAttr('data-render-tier', tier);
        },
        start(tier: string) {
          this.currentTier = tier;
          requestAnimationFrame((t) => this.sample(t));
        }
      };

      // --- THEME ENGINE ---
      const ThemeEngine = {
        set(theme: string, save = true) {
          setAttr('data-theme', theme);
          ROOT.style.colorScheme = theme === 'light' ? 'light' : 'dark';
          if (save) savePrefs({ theme });
        },
        hydrationSafeInit() {
          const prefs = loadPrefs();
          const theme = prefs.theme || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
          this.set(theme, false);
          BODY.classList.remove('theme-pending');
        }
      };

      // --- CANVAS NOISE ---
      const CanvasNoise = {
        apply() {
          try {
            const size = 128;
            const canvas = document.createElement('canvas');
            canvas.width = canvas.height = size;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;
            const img = ctx.createImageData(size, size);
            const noise = new Uint8Array(size * size);
            crypto.getRandomValues(noise);
            for (let i = 0; i < noise.length; i++) {
              const idx = i * 4;
              const v = noise[i];
              img.data[idx] = v; img.data[idx+1] = v; img.data[idx+2] = v; img.data[idx+3] = 255;
            }
            ctx.putImageData(img, 0, 0);
            setVar('--texture-noise', `url("${canvas.toDataURL('image/webp', 0.5)}")`);
          } catch {}
        }
      };

      // --- INIT ---
      async function init() {
        ThemeEngine.hydrationSafeInit();
        const device = await DeviceInspector.detect();
        RenderBudget.start(device.gpuTier);
        if (device.isMobile) setVar('--blur-cap', '12px');
        
        setTimeout(() => CanvasNoise.apply(), 500); // Idle apply

        (window as any).__CAI_OS = { theme: ThemeEngine, render: RenderBudget, device, version: VERSION };
        console.debug(`[CAI-OS v${VERSION}] Engine initialized — Tier: ${device.gpuTier}`);
      }

      init();
    })();
  }, []);

  return <>{children}</>;
}
