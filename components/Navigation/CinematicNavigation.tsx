'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

// ============================================================================
// §1  TYPE DEFINITIONS & CONFIGURATION
// ============================================================================

interface IndustryConfig {
  id: string;
  label: string;
  ambientColor: [number, number, number]; // RGB
  ambientIntensity: number;              // 0-1
  glowColor: [number, number, number];   // RGB
  emotionalWeight: number;               // 0.5-1.5 (affects transition pacing)
}

interface PhysicsState {
  currentX: number;
  currentWidth: number;
  velocityX: number;
  velocityWidth: number;
}

interface AtmosphereState {
  r: number;
  g: number;
  b: number;
  intensity: number;
  glowR: number;
  glowG: number;
  glowB: number;
}

const INDUSTRIES: IndustryConfig[] = [
  {
    id: 'all',
    label: 'All Agents',
    ambientColor: [34, 211, 238],
    ambientIntensity: 0.04,
    glowColor: [34, 211, 238],
    emotionalWeight: 1.0,
  },
  {
    id: 'banking',
    label: 'Banking & BFSI',
    ambientColor: [59, 130, 246],
    ambientIntensity: 0.08,
    glowColor: [59, 130, 246],
    emotionalWeight: 1.2,
  },
  {
    id: 'insurance',
    label: 'Insurance',
    ambientColor: [16, 185, 129],
    ambientIntensity: 0.08,
    glowColor: [16, 185, 166],
    emotionalWeight: 1.1,
  },
  {
    id: 'healthcare',
    label: 'Healthcare',
    ambientColor: [167, 139, 250],
    ambientIntensity: 0.07,
    glowColor: [200, 180, 255],
    emotionalWeight: 0.9,
  },
];

const PHYSICS_CONFIG = {
  stiffness: 0.08,
  damping: 0.75,
  mass: 1.2,
  precision: 0.01,
};

const LERP_SPEED = 0.04;

// ============================================================================
// §2  RUNTIME ENGINE (RAF Loop, Interpolation, Memory)
// ============================================================================

function lerp(current: number, target: number, speed: number): number {
  const delta = target - current;
  if (Math.abs(delta) < 0.001) return target;
  return current + delta * speed;
}

function springPhysics(state: PhysicsState, targetX: number, targetWidth: number): PhysicsState {
  const { stiffness, damping, mass, precision } = PHYSICS_CONFIG;
  
  const forceX = (targetX - state.currentX) * stiffness;
  const forceW = (targetWidth - state.currentWidth) * stiffness;
  
  const newVelocityX = (state.velocityX + forceX / mass) * damping;
  const newVelocityW = (state.velocityWidth + forceW / mass) * damping;
  
  return {
    currentX: Math.abs(newVelocityX) < precision && Math.abs(targetX - state.currentX) < precision 
              ? targetX : state.currentX + newVelocityX,
    currentWidth: Math.abs(newVelocityW) < precision && Math.abs(targetWidth - state.currentWidth) < precision 
                  ? targetWidth : state.currentWidth + newVelocityW,
    velocityX: newVelocityX,
    velocityWidth: newVelocityW,
  };
}

// ============================================================================
// §7  ACCESSIBILITY INTELLIGENCE
// ============================================================================

function useAccessibilityFlags() {
  const [flags, setFlags] = useState({
    reducedMotion: false,
    reducedTransparency: false,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const motionMQ = window.matchMedia('(prefers-reduced-motion: reduce)');
    const transMQ = window.matchMedia('(prefers-reduced-transparency: reduce)');
    
    const update = () => setFlags({
      reducedMotion: motionMQ.matches,
      reducedTransparency: transMQ.matches,
    });
    
    update();
    motionMQ.addEventListener('change', update);
    transMQ.addEventListener('change', update);
    return () => {
      motionMQ.removeEventListener('change', update);
      transMQ.removeEventListener('change', update);
    };
  }, []);

  return flags;
}

// ============================================================================
// §8  COMPONENT: CINEMATIC AGI CONTROL BAR
// ============================================================================

export default function CinematicNavigation() {
  const [activeId, setActiveId] = useState('all');
  const flags = useAccessibilityFlags();
  
  // ── DOM Refs ──────────────────────────────────────────
  const navRef = useRef<HTMLElement>(null);
  const buttonRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const indicatorRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  
  // ── Runtime State (mutable, avoids React re-render thrashing) ──
  const physicsRef = useRef<PhysicsState>({ currentX: 0, currentWidth: 0, velocityX: 0, velocityWidth: 0 });
  const atmosphereRef = useRef<AtmosphereState>({
    r: 34, g: 211, b: 238, intensity: 0.04,
    glowR: 34, glowG: 211, glowB: 238,
  });
  const targetAtmoRef = useRef<AtmosphereState>(atmosphereRef.current);
  const rafIdRef = useRef<number>(0);
  const timeRef = useRef<number>(0);
  const isHoveringNav = useRef(false);

  // ============================================================================
  // §3  ATMOSPHERE ORCHESTRATOR
  // ============================================================================

  const setTargetAtmosphere = useCallback((industry: IndustryConfig) => {
    const [r, g, b] = industry.ambientColor;
    const [gr, gg, gb] = industry.glowColor;
    targetAtmoRef.current = {
      r, g, b,
      intensity: industry.ambientIntensity,
      glowR: gr, glowG: gg, glowB: gb,
    };
  }, []);

  // ============================================================================
  // §4  AGI PRESENCE SYSTEM
  // ============================================================================

  const applyPresenceEffects = useCallback((time: number) => {
    if (!glowRef.current) return;
    
    // Ambient breathing (sine wave modulation)
    const breathCycle = Math.sin(time * 0.001) * 0.5 + 0.5; // 0.0 - 1.0
    const presenceIntensity = isHoveringNav.current ? 0.15 : 0.05;
    const breathScale = 1 + (breathCycle * presenceIntensity);
    
    glowRef.current.style.transform = `scale(${breathScale})`;
    glowRef.current.style.opacity = `${0.4 + (breathCycle * 0.3)}`;
  }, []);

  // ============================================================================
  // §5  MOTION PHYSICS ENGINE & RENDER LOOP
  // ============================================================================

  const calculateTargetPhysics = useCallback(() => {
    const activeBtn = buttonRefs.current.get(activeId);
    const nav = navRef.current;
    if (!activeBtn || !nav) return { x: 0, width: 0 };
    
    const navRect = nav.getBoundingClientRect();
    const btnRect = activeBtn.getBoundingClientRect();
    
    return {
      x: btnRect.left - navRect.left,
      width: btnRect.width,
    };
  }, [activeId]);

  const startRenderLoop = useCallback(() => {
    let lastTime = performance.now();
    
    const loop = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;
      timeRef.current = time;
      
      // ── Physics Update (Indicator) ──────────────────
      const target = calculateTargetPhysics();
      physicsRef.current = springPhysics(physicsRef.current, target.x, target.width);
      
      if (indicatorRef.current && !flags.reducedMotion) {
        indicatorRef.current.style.transform = `translateX(${physicsRef.current.currentX}px) scaleX(${physicsRef.current.currentWidth / 100})`;
      }
      
      // ── Atmosphere Interpolation ────────────────────
      const atmo = atmosphereRef.current;
      const targetAtmo = targetAtmoRef.current;
      const speed = flags.reducedMotion ? 1.0 : LERP_SPEED;
      
      atmo.r = lerp(atmo.r, targetAtmo.r, speed);
      atmo.g = lerp(atmo.g, targetAtmo.g, speed);
      atmo.b = lerp(atmo.b, targetAtmo.b, speed);
      atmo.intensity = lerp(atmo.intensity, targetAtmo.intensity, speed);
      atmo.glowR = lerp(atmo.glowR, targetAtmo.glowR, speed);
      atmo.glowG = lerp(atmo.glowG, targetAtmo.glowG, speed);
      atmo.glowB = lerp(atmo.glowB, targetAtmo.glowB, speed);
      
      // Apply to CSS Variables (Throttled to every 2nd frame for perf)
      if (Math.round(time) % 2 === 0) {
        const root = document.documentElement;
        root.style.setProperty('--agi-atmo-r', Math.round(atmo.r).toString());
        root.style.setProperty('--agi-atmo-g', Math.round(atmo.g).toString());
        root.style.setProperty('--agi-atmo-b', Math.round(atmo.b).toString());
        root.style.setProperty('--agi-atmo-a', atmo.intensity.toFixed(4));
        root.style.setProperty('--agi-glow-r', Math.round(atmo.glowR).toString());
        root.style.setProperty('--agi-glow-g', Math.round(atmo.glowG).toString());
        root.style.setProperty('--agi-glow-b', Math.round(atmo.glowB).toString());
        
        // Update the volumetric backgrounds directly for smooth cross-fade
        root.style.setProperty('--atmosphere-volumetric-cyan', `
          radial-gradient(ellipse 60% 40% at 20% 50%, rgba(${Math.round(atmo.r)}, ${Math.round(atmo.g)}, ${Math.round(atmo.b)}, ${atmo.intensity.toFixed(3)}) 0%, transparent 70%)
        `);
        root.style.setProperty('--atmosphere-volumetric-violet', `
          radial-gradient(ellipse 50% 60% at 80% 30%, rgba(${Math.round(atmo.glowR)}, ${Math.round(atmo.glowG)}, ${Math.round(atmo.glowB)}, ${(atmo.intensity * 0.7).toFixed(3)}) 0%, transparent 70%)
        `);
      }
      
      // ── AGI Presence ────────────────────────────────
      if (!flags.reducedMotion) {
        applyPresenceEffects(time);
      }
      
      rafIdRef.current = requestAnimationFrame(loop);
    };
    
    rafIdRef.current = requestAnimationFrame(loop);
  }, [calculateTargetPhysics, applyPresenceEffects, flags.reducedMotion]);

  // ============================================================================
  // §6  INTERACTION HANDLERS
  // ============================================================================

  const handleSwitch = useCallback((industry: IndustryConfig) => {
    setActiveId(industry.id);
    setTargetAtmosphere(industry);
    
    // Instant snap for accessibility
    if (flags.reducedMotion && indicatorRef.current) {
      const target = calculateTargetPhysics();
      indicatorRef.current.style.transform = `translateX(${target.x}px) scaleX(${target.width / 100})`;
      indicatorRef.current.style.transition = 'none';
    }
  }, [setTargetAtmosphere, flags.reducedMotion, calculateTargetPhysics]);

  const handleNavMouseEnter = useCallback(() => { isHoveringNav.current = true; }, []);
  const handleNavMouseLeave = useCallback(() => { isHoveringNav.current = false; }, []);

  // ── Keyboard Interaction ──────────────────────────────
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    const currentIndex = INDUSTRIES.findIndex(i => i.id === activeId);
    let nextIndex = currentIndex;

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      nextIndex = (currentIndex + 1) % INDUSTRIES.length;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      nextIndex = (currentIndex - 1 + INDUSTRIES.length) % INDUSTRIES.length;
    } else if (e.key === 'Home') {
      nextIndex = 0;
    } else if (e.key === 'End') {
      nextIndex = INDUSTRIES.length - 1;
    } else {
      return;
    }

    e.preventDefault();
    const nextIndustry = INDUSTRIES[nextIndex];
    handleSwitch(nextIndustry);
    
    // Focus the new button
    const btn = buttonRefs.current.get(nextIndustry.id);
    btn?.focus();
  }, [activeId, handleSwitch]);

  // ============================================================================
  // §8  LIFECYCLE & MOUNTING
  // ============================================================================

  useEffect(() => {
    // Initialize target atmosphere
    setTargetAtmosphere(INDUSTRIES[0]);
    
    // Initialize indicator position instantly
    if (indicatorRef.current) {
      const target = calculateTargetPhysics();
      physicsRef.current = { 
        currentX: target.x, 
        currentWidth: target.width, 
        velocityX: 0, 
        velocityWidth: 0 
      };
      indicatorRef.current.style.transform = `translateX(${target.x}px) scaleX(${target.width / 100})`;
    }
    
    startRenderLoop();
    
    return () => {
      cancelAnimationFrame(rafIdRef.current);
    };
  }, [setTargetAtmosphere, calculateTargetPhysics, startRenderLoop]);

  // Recalculate on resize
  useEffect(() => {
    const handleResize = () => {
      const target = calculateTargetPhysics();
      physicsRef.current.currentX = target.x;
      physicsRef.current.currentWidth = target.width;
    };
    
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, [calculateTargetPhysics]);

  // ============================================================================
  // §9  RENDER LAYER
  // ============================================================================

  return (
    <nav
      ref={navRef}
      role="tablist"
      aria-label="AI Operating System Environment Control"
      onMouseEnter={handleNavMouseEnter}
      onMouseLeave={handleNavMouseLeave}
      onKeyDown={handleKeyDown}
      className={`
        fixed top-6 left-1/2 -translate-x-1/2 z-50 
        flex items-center gap-1 p-1.5 rounded-full
        border border-white/[0.06]
        ${flags.reducedTransparency ? 'bg-[#10131A]' : 'bg-[#10131A]/70 backdrop-blur-2xl'}
        shadow-[0_8px_40px_rgba(0,0,0,0.6)]
        transition-shadow duration-700 ease-out
        hover:shadow-[0_8px_60px_rgba(0,0,0,0.7)]
      `}
      style={{ 
        width: 'max-content',
        maxWidth: 'calc(100vw - 2rem)'
      }}
    >
      {/* ── AGI Ambient Glow Presence ──────────────────── */}
      <div 
        ref={glowRef}
        aria-hidden="true"
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 80% 120% at 50% 50%, rgba(${Math.round(atmosphereRef.current.glowR)}, ${Math.round(atmosphereRef.current.glowG)}, ${Math.round(atmosphereRef.current.glowB)}, 0.08) 0%, transparent 70%)`,
          filter: 'blur(15px)',
          opacity: 0.4,
          zIndex: -1,
        }} 
      />

      {/* ── Active State Indicator (Physics Driven) ────── */}
      <div
        ref={indicatorRef}
        aria-hidden="true"
        className={`
          absolute top-1.5 left-0 h-[calc(100%-12px)] rounded-full
          ${flags.reducedTransparency 
            ? 'bg-white/10' 
            : 'bg-gradient-to-b from-white/[0.12] to-white/[0.06]'}
          shadow-[0_0_20px_rgba(var(--agi-glow-r, 34),var(--agi-glow-g, 211),var(--agi-glow-b, 238),0.1)]
          border border-white/[0.08]
          pointer-events-none
        `}
        style={{
          width: '100px', // Base width, scaled by scaleX via physics
          transformOrigin: '0% 50%',
          transition: flags.reducedMotion ? 'transform 0.1s ease-out' : 'none',
          willChange: 'transform',
        }}
      />

      {/* ── Control Buttons ────────────────────────────── */}
      {INDUSTRIES.map((industry) => (
        <button
          key={industry.id}
          ref={(el) => { if (el) buttonRefs.current.set(industry.id, el); }}
          role="tab"
          id={`agi-tab-${industry.id}`}
          aria-selected={activeId === industry.id}
          tabIndex={activeId === industry.id ? 0 : -1}
          onClick={() => handleSwitch(industry)}
          className={`
            relative z-10 px-5 py-2 rounded-full
            text-[11px] font-medium tracking-[0.12em] uppercase
            transition-colors duration-300 ease-out
            outline-none
            ${activeId === industry.id 
              ? 'text-white' 
              : 'text-white/30 hover:text-white/60'
            }
            focus-visible:ring-2 focus-visible:ring-cyan-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#10131A]
          `}
        >
          {industry.label}
        </button>
      ))}
    </nav>
  );
}     
