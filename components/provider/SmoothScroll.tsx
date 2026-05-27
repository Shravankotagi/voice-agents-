"use client";

import {
  ReactNode,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  createContext,
  useContext,
  useSyncExternalStore,
  FC,
} from "react";
import Lenis from "lenis";

// ============================================================================
// TYPE DEFINITIONS - Enterprise-grade TypeScript architecture
// ============================================================================

type EasingFunction = (t: number) => number;
type GestureDirection = "vertical" | "horizontal" | "both";
type ScrollDirection = "up" | "down" | "none";

interface LenisScrollData {
  scroll: number;
  limit: number;
  velocity: number;
  direction: ScrollDirection;
  progress: number;
}

interface SmoothScrollConfig {
  duration?: number;
  lerp?: number;
  wheelMultiplier?: number;
  touchMultiplier?: number;
  smoothAnchorOffset?: number;
  easing?: EasingFunction;
  velocityThreshold?: number;
  respectReducedMotion?: boolean;
  infinite?: boolean;
  syncTouchLerp?: number;
}

interface ScrollToOptions {
  offset?: number;
  duration?: number;
  easing?: EasingFunction;
  immediate?: boolean;
  force?: boolean;
  lock?: boolean;
  onComplete?: () => void;
}

interface SmoothScrollContextValue {
  scrollTo: (target: HTMLElement | string | number, options?: ScrollToOptions) => void;
  scrollToTop: (options?: ScrollToOptions) => void;
  scrollToBottom: (options?: ScrollToOptions) => void;
  stop: () => void;
  start: () => void;
  getScroll: () => number;
  getVelocity: () => number;
  getDirection: () => ScrollDirection;
  getProgress: () => number;
  isScrolling: boolean;
  isReady: boolean;
  lenis: Lenis | null;
}

interface SmoothScrollProps {
  children: ReactNode;
  config?: SmoothScrollConfig;
  enabled?: boolean;
  onScrollStart?: (data: LenisScrollData) => void;
  onScroll?: (data: LenisScrollData) => void;
  onScrollEnd?: (data: LenisScrollData) => void;
  className?: string;
}

// ============================================================================
// PREMIUM EASING FUNCTIONS - Cinematic motion curves
// ============================================================================

const EASING_PRESETS = {
  apple: (t: number): number => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  },

  luxury: (t: number): number => 1 - Math.pow(1 - t, 4),

  cinematic: (t: number): number => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  },

  fluid: (t: number): number => {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  },
} as const;

// ============================================================================
// STABLE DEFAULT - Prevents infinite useSyncExternalStore loop
// ============================================================================

const DEFAULT_SCROLL_DATA: Readonly<LenisScrollData> = {
  scroll: 0,
  limit: 0,
  velocity: 0,
  direction: "none",
  progress: 0,
};

// ============================================================================
// SCROLL STATE MANAGER - Optimized external store pattern
// ============================================================================

class ScrollStateManager {
  private listeners = new Set<() => void>();
  private scrollData: LenisScrollData = {
    scroll: 0,
    limit: 0,
    velocity: 0,
    direction: "none",
    progress: 0,
  };
  private isScrollingState = false;
  private velocityThreshold: number;
  private scrollTimeout: ReturnType<typeof setTimeout> | null = null;

  constructor(velocityThreshold = 0.05) {
    this.velocityThreshold = velocityThreshold;
  }

  subscribe = (listener: () => void): (() => void) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };

  getSnapshot = (): Readonly<LenisScrollData> => this.scrollData;

  getIsScrolling = (): boolean => this.isScrollingState;

  update = (lenis: Lenis): void => {
    const velocity = lenis.velocity;
    const absVelocity = Math.abs(velocity);

    // Determine scroll direction
    let direction: ScrollDirection = "none";
    if (absVelocity > this.velocityThreshold) {
      direction = velocity > 0 ? "down" : "up";
    }

    const newData: LenisScrollData = {
      scroll: lenis.scroll,
      limit: lenis.limit,
      velocity,
      direction,
      progress: lenis.progress,
    };

    // Velocity-based scrolling detection
    const wasScrolling = this.isScrollingState;
    const isCurrentlyScrolling = absVelocity > this.velocityThreshold;

    this.scrollData = newData;
    this.isScrollingState = isCurrentlyScrolling;

    // Debounced scroll end detection
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }

    if (isCurrentlyScrolling) {
      this.scrollTimeout = setTimeout(() => {
        this.isScrollingState = false;
        this.notifyListeners();
      }, 150);
    }

    // Only notify if data meaningfully changed
    if (wasScrolling !== isCurrentlyScrolling || absVelocity > this.velocityThreshold) {
      this.notifyListeners();
    }
  };

  private notifyListeners = (): void => {
    this.listeners.forEach((listener) => {
      listener();
    });
  };

  destroy = (): void => {
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }
    this.listeners.clear();
  };
}

// ============================================================================
// CONTEXT - Zero-cost abstraction layer
// ============================================================================

const SmoothScrollContext = createContext<SmoothScrollContextValue | null>(null);

/**
 * Hook to access smooth scroll context
 * @throws Error if used outside SmoothScroll provider
 */
export function useSmoothScroll(): SmoothScrollContextValue {
  const context = useContext(SmoothScrollContext);
  if (!context) {
    throw new Error("[SmoothScroll] useSmoothScroll must be used within SmoothScrollProvider");
  }
  return context;
}

// ============================================================================
// MAIN COMPONENT - Enterprise-grade scroll orchestrator
// ============================================================================

/**
 * SmoothScroll component providing cinematic scroll experience
 * Wraps Lenis with React integration, state management, and premium motion
 */
const SmoothScroll: FC<SmoothScrollProps> = ({
  children,
  config = {},
  enabled = true,
  onScrollStart,
  onScroll,
  onScrollEnd,
  className,
}) => {
  // ============================================================================
  // REFS - Stable references with zero GC pressure
  // ============================================================================

  const lenisRef = useRef<Lenis | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const stateManagerRef = useRef<ScrollStateManager | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<MutationObserver | null>(null);
  const anchorListenersRef = useRef<Map<HTMLAnchorElement, EventListener>>(new Map());
  const isReadyRef = useRef(false);
  const callbacksRef = useRef({ onScrollStart, onScroll, onScrollEnd });

  // Motion preferences detection
  const prefersReducedMotion = useRef(
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  // ============================================================================
  // CONFIGURATION - Premium defaults with override support
  // ============================================================================

  const scrollConfig = useMemo<Required<SmoothScrollConfig>>(() => {
    const shouldReduceMotion = prefersReducedMotion.current && config.respectReducedMotion !== false;

    return {
      duration: config.duration ?? 1.2,
      lerp: config.lerp ?? 0.08,
      wheelMultiplier: shouldReduceMotion ? 1.5 : config.wheelMultiplier ?? 0.8,
      touchMultiplier: config.touchMultiplier ?? 1.5,
      smoothAnchorOffset: config.smoothAnchorOffset ?? -80,
      easing: config.easing ?? EASING_PRESETS.luxury,
      velocityThreshold: config.velocityThreshold ?? 0.05,
      respectReducedMotion: config.respectReducedMotion ?? true,
      infinite: config.infinite ?? false,
      syncTouchLerp: config.syncTouchLerp ?? 0.1,
    };
  }, [config]);

  // ============================================================================
  // EXTERNAL STORE SUBSCRIPTION - Zero unnecessary rerenders (FIXED)
  // ============================================================================

  const scrollData = useSyncExternalStore(
    useCallback(
      (onStoreChange) => {
        if (!stateManagerRef.current) {
          stateManagerRef.current = new ScrollStateManager(scrollConfig.velocityThreshold);
        }
        return stateManagerRef.current.subscribe(onStoreChange);
      },
      [scrollConfig.velocityThreshold]
    ),
    () => stateManagerRef.current?.getSnapshot() ?? DEFAULT_SCROLL_DATA
  );

  const isScrolling = useSyncExternalStore(
    useCallback(
      (onStoreChange) => {
        if (!stateManagerRef.current) {
          stateManagerRef.current = new ScrollStateManager(scrollConfig.velocityThreshold);
        }
        return stateManagerRef.current.subscribe(onStoreChange);
      },
      [scrollConfig.velocityThreshold]
    ),
    () => stateManagerRef.current?.getIsScrolling() ?? false
  );

  // ============================================================================
  // ANCHOR MANAGEMENT - Dynamic, performant, memory-safe
  // ============================================================================

  const setupAnchorListeners = useCallback(() => {
    if (!containerRef.current) return;

    // Cleanup previous listeners
    anchorListenersRef.current.forEach((listener, anchor) => {
      anchor.removeEventListener("click", listener);
    });
    anchorListenersRef.current.clear();

    // Setup new listeners with delegation pattern
    const anchors = containerRef.current.querySelectorAll<HTMLAnchorElement>('a[href^="#"]');

    const handleAnchorClick = (e: Event): void => {
      const target = e.currentTarget as HTMLAnchorElement;
      const href = target.getAttribute("href");

      if (!href?.startsWith("#") || href === "#") return;

      e.preventDefault();

      const element = document.querySelector(href);
      if (!element || !lenisRef.current) return;

      lenisRef.current.scrollTo(element as HTMLElement, {
        offset: scrollConfig.smoothAnchorOffset,
        duration: 1.5,
        easing: scrollConfig.easing,
      });
    };

    anchors.forEach((anchor) => {
      const listener = handleAnchorClick.bind(null) as EventListener;
      anchor.addEventListener("click", listener, { passive: false });
      anchorListenersRef.current.set(anchor, listener);
    });
  }, [scrollConfig.smoothAnchorOffset, scrollConfig.easing]);

  // ============================================================================
  // RAF LOOP - Hyper-optimized animation frame management
  // ============================================================================

  const previousScrollRef = useRef(0);
  const hasStartedRef = useRef(false);

  const raf = useCallback(
    (time: number): void => {
      if (!lenisRef.current || !stateManagerRef.current) {
        rafIdRef.current = null;
        return;
      }

      // Update Lenis
      lenisRef.current.raf(time);

      // Update state manager (triggers minimal rerenders via external store)
      stateManagerRef.current.update(lenisRef.current);

      const currentData = stateManagerRef.current.getSnapshot();
      const absVelocity = Math.abs(currentData.velocity);

      // Scroll start detection
      if (absVelocity > scrollConfig.velocityThreshold && !hasStartedRef.current) {
        hasStartedRef.current = true;
        callbacksRef.current.onScrollStart?.(currentData);
      }

      // Scroll callback (throttled by velocity)
      if (absVelocity > scrollConfig.velocityThreshold) {
        callbacksRef.current.onScroll?.(currentData);
      }

      // Scroll end detection
      if (absVelocity <= scrollConfig.velocityThreshold && hasStartedRef.current) {
        hasStartedRef.current = false;
        callbacksRef.current.onScrollEnd?.(currentData);
      }

      previousScrollRef.current = currentData.scroll;

      // Continue loop
      rafIdRef.current = requestAnimationFrame(raf);
    },
    [scrollConfig.velocityThreshold]
  );

  // ============================================================================
  // LENIS INITIALIZATION - Production-grade setup
  // ============================================================================

  const initLenis = useCallback((): void => {
    if (lenisRef.current || !enabled) return;

    try {
      // Reduced motion fallback
      if (prefersReducedMotion.current && scrollConfig.respectReducedMotion) {
        isReadyRef.current = true;
        return;
      }

      // Build Lenis options with only valid properties
      const lenisOptions = {
        duration: scrollConfig.duration,
        lerp: scrollConfig.lerp,
        wheelMultiplier: scrollConfig.wheelMultiplier,
        touchMultiplier: scrollConfig.touchMultiplier,
        infinite: scrollConfig.infinite,
        autoResize: true,
        syncTouch: true,
      };

      lenisRef.current = new Lenis(lenisOptions);

      // Apply additional options after initialization if Lenis supports them
      if (lenisRef.current && typeof lenisRef.current === "object") {
        // syncTouchLerp can be set as a property if Lenis supports it
        try {
          (lenisRef.current as any).syncTouchLerp = scrollConfig.syncTouchLerp;
        } catch {
          // Silently fail if property doesn't exist
        }
      }

      // Start RAF loop
      rafIdRef.current = requestAnimationFrame(raf);

      // Setup anchor handling
      setupAnchorListeners();

      // Dynamic content observation
      if (containerRef.current) {
        observerRef.current = new MutationObserver(() => {
          setupAnchorListeners();
        });

        observerRef.current.observe(containerRef.current, {
          childList: true,
          subtree: true,
          attributes: false,
          characterData: false,
        });
      }

      isReadyRef.current = true;
    } catch (error) {
      console.error("[SmoothScroll] Initialization failed:", error);
      isReadyRef.current = false;
    }
  }, [
    enabled,
    scrollConfig.duration,
    scrollConfig.lerp,
    scrollConfig.wheelMultiplier,
    scrollConfig.touchMultiplier,
    scrollConfig.infinite,
    scrollConfig.respectReducedMotion,
    scrollConfig.syncTouchLerp,
    raf,
    setupAnchorListeners,
  ]);

  // ============================================================================
  // CLEANUP - Zero memory leaks, production-grade disposal
  // ============================================================================

  const cleanup = useCallback((): void => {
    // Cancel RAF
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }

    // Destroy observer
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }

    // Remove anchor listeners
    anchorListenersRef.current.forEach((listener, anchor) => {
      anchor.removeEventListener("click", listener);
    });
    anchorListenersRef.current.clear();

    // Destroy state manager
    if (stateManagerRef.current) {
      stateManagerRef.current.destroy();
      stateManagerRef.current = null;
    }

    // Destroy Lenis
    if (lenisRef.current) {
      lenisRef.current.destroy();
      lenisRef.current = null;
    }

    isReadyRef.current = false;
    hasStartedRef.current = false;
    previousScrollRef.current = 0;
  }, []);

  // ============================================================================
  // PUBLIC API - Imperative scroll control methods
  // ============================================================================

  const scrollTo = useCallback(
    (target: HTMLElement | string | number, options: ScrollToOptions = {}): void => {
      if (!lenisRef.current) return;

      if (prefersReducedMotion.current && scrollConfig.respectReducedMotion) {
        const element =
          typeof target === "string"
            ? document.querySelector(target)
            : typeof target === "number"
            ? null
            : target;

        if (element instanceof HTMLElement) {
          element.scrollIntoView({ behavior: "auto", block: "start" });
        } else if (typeof target === "number") {
          window.scrollTo(0, target);
        }
        return;
      }

      lenisRef.current.scrollTo(target as HTMLElement | string | number, {
        offset: options.offset ?? scrollConfig.smoothAnchorOffset,
        duration: options.duration ?? scrollConfig.duration,
        easing: options.easing ?? scrollConfig.easing,
        immediate: options.immediate ?? false,
        force: options.force ?? false,
        lock: options.lock ?? false,
        onComplete: options.onComplete,
      });
    },
    [
      scrollConfig.smoothAnchorOffset,
      scrollConfig.duration,
      scrollConfig.easing,
      scrollConfig.respectReducedMotion,
    ]
  );

  const scrollToTop = useCallback(
    (options: ScrollToOptions = {}): void => {
      scrollTo(0, { ...options, duration: options.duration ?? 1.5 });
    },
    [scrollTo]
  );

  const scrollToBottom = useCallback(
    (options: ScrollToOptions = {}): void => {
      if (!lenisRef.current) return;
      scrollTo(lenisRef.current.limit, { ...options, duration: options.duration ?? 1.5 });
    },
    [scrollTo]
  );

  const stop = useCallback((): void => {
    lenisRef.current?.stop();
  }, []);

  const start = useCallback((): void => {
    lenisRef.current?.start();
  }, []);

  const getScroll = useCallback((): number => scrollData.scroll, [scrollData.scroll]);
  const getVelocity = useCallback((): number => scrollData.velocity, [scrollData.velocity]);
  const getDirection = useCallback((): ScrollDirection => scrollData.direction, [scrollData.direction]);
  const getProgress = useCallback((): number => scrollData.progress, [scrollData.progress]);

  // ============================================================================
  // LIFECYCLE - Optimized mount/unmount
  // ============================================================================

  useEffect(() => {
    callbacksRef.current = { onScrollStart, onScroll, onScrollEnd };
  }, [onScrollStart, onScroll, onScrollEnd]);

  useEffect(() => {
    initLenis();
    return cleanup;
  }, [initLenis, cleanup]);

  // ============================================================================
  // CONTEXT VALUE - Memoized to prevent unnecessary rerenders
  // ============================================================================

  const contextValue = useMemo<SmoothScrollContextValue>(
    () => ({
      scrollTo,
      scrollToTop,
      scrollToBottom,
      stop,
      start,
      getScroll,
      getVelocity,
      getDirection,
      getProgress,
      isScrolling,
      isReady: isReadyRef.current,
      lenis: lenisRef.current,
    }),
    [
      scrollTo,
      scrollToTop,
      scrollToBottom,
      stop,
      start,
      getScroll,
      getVelocity,
      getDirection,
      getProgress,
      isScrolling,
    ]
  );

  // ============================================================================
  // RENDER - Zero-overhead container
  // ============================================================================

  return (
    <SmoothScrollContext.Provider value={contextValue}>
      <div ref={containerRef} className={className}>
        {children}
      </div>
    </SmoothScrollContext.Provider>
  );
};

SmoothScroll.displayName = "SmoothScroll";

export default SmoothScroll;

// ============================================================================
// EXPORTS
// ============================================================================

export { SmoothScrollContext };
export type {
  SmoothScrollConfig,
  ScrollToOptions,
  LenisScrollData,
  SmoothScrollContextValue,
  EasingFunction,
  GestureDirection,
  ScrollDirection,
};

// Re-export easing presets for external use
export const EasingPresets = EASING_PRESETS;
