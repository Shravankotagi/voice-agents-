
"use client";

import {
  createContext,
  useContext,
  useRef,
  useCallback,
  useMemo,
  ReactNode,
  useSyncExternalStore,
  useEffect,
  useTransition,
} from "react";

// ============================================================================
// PERFORMANCE MONITORING - Production diagnostics
// ============================================================================

interface PerformanceMetrics {
  fps: number;
  droppedFrames: number;
  averageFrameTime: number;
  maxFrameTime: number;
  updateCost: Map<string, number>;
  memoryUsage: number;
}

class PerformanceMonitor {
  private frameTimings: number[] = [];
  private updateCosts = new Map<string, number>();
  private droppedFrameCount = 0;
  private frameTimeThreshold = 16.67; // 60fps target
  private maxBufferSize = 120;

  recordFrame = (frameTime: number) => {
    this.frameTimings.push(frameTime);
    if (this.frameTimings.length > this.maxBufferSize) {
      this.frameTimings.shift();
    }

    if (frameTime > this.frameTimeThreshold) {
      this.droppedFrameCount++;
    }
  };

  recordUpdate = (updateId: string, cost: number) => {
    const existing = this.updateCosts.get(updateId) || 0;
    const average = (existing + cost) / 2;
    this.updateCosts.set(updateId, average);
  };

  getMetrics = (): PerformanceMetrics => {
    const avgFrameTime =
      this.frameTimings.length > 0
        ? this.frameTimings.reduce((a, b) => a + b, 0) / this.frameTimings.length
        : 0;

    const maxFrameTime = this.frameTimings.length > 0 ? Math.max(...this.frameTimings) : 0;

    return {
      fps: this.frameTimings.length > 0 ? Math.round(1000 / avgFrameTime) : 0,
      droppedFrames: this.droppedFrameCount,
      averageFrameTime: avgFrameTime,
      maxFrameTime,
      updateCost: new Map(this.updateCosts),
      memoryUsage: (performance as any).memory?.usedJSHeapSize || 0,
    };
  };

  reset = () => {
    this.frameTimings = [];
    this.updateCosts.clear();
    this.droppedFrameCount = 0;
  };
}

// ============================================================================
// VECTOR POOL - Zero-allocation vector system
// ============================================================================

interface Vec2 {
  x: number;
  y: number;
}

class Vec2Pool {
  private pool: Vec2[] = [];
  private initialSize = 100;
  private maxSize = 500;

  constructor() {
    for (let i = 0; i < this.initialSize; i++) {
      this.pool.push({ x: 0, y: 0 });
    }
  }

  acquire = (x: number = 0, y: number = 0): Vec2 => {
    const vec = this.pool.length > 0 ? this.pool.pop()! : { x: 0, y: 0 };
    vec.x = x;
    vec.y = y;
    return vec;
  };

  release = (vec: Vec2) => {
    if (this.pool.length < this.maxSize) {
      vec.x = 0;
      vec.y = 0;
      this.pool.push(vec);
    }
  };

  set = (vec: Vec2, x: number, y: number): Vec2 => {
    vec.x = x;
    vec.y = y;
    return vec;
  };

  add = (vec: Vec2, other: Vec2): Vec2 => {
    vec.x += other.x;
    vec.y += other.y;
    return vec;
  };

  sub = (vec: Vec2, other: Vec2): Vec2 => {
    vec.x -= other.x;
    vec.y -= other.y;
    return vec;
  };

  mul = (vec: Vec2, scalar: number): Vec2 => {
    vec.x *= scalar;
    vec.y *= scalar;
    return vec;
  };

  magnitude = (vec: Vec2): number => {
    return Math.sqrt(vec.x * vec.x + vec.y * vec.y);
  };

  distance = (a: Vec2, b: Vec2): number => {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
  };

  copy = (source: Vec2, dest: Vec2): Vec2 => {
    dest.x = source.x;
    dest.y = source.y;
    return dest;
  };

  reset = () => {
    this.pool = [];
    for (let i = 0; i < this.initialSize; i++) {
      this.pool.push({ x: 0, y: 0 });
    }
  };
}

// ============================================================================
// TRANSFORM MATRIX SYSTEM - Cached, optimized transforms
// ============================================================================

class TransformMatrix {
  private cache: string = "";
  private isDirty = true;

  private translate: Vec2 = { x: 0, y: 0 };
  private rotate: number = 0;
  private scale: Vec2 = { x: 1, y: 1 };
  private skew: Vec2 = { x: 0, y: 0 };

  setTranslate = (x: number, y: number): this => {
    if (this.translate.x !== x || this.translate.y !== y) {
      this.translate.x = x;
      this.translate.y = y;
      this.isDirty = true;
    }
    return this;
  };

  setRotate = (angle: number): this => {
    if (this.rotate !== angle) {
      this.rotate = angle;
      this.isDirty = true;
    }
    return this;
  };

  setScale = (x: number, y: number): this => {
    if (this.scale.x !== x || this.scale.y !== y) {
      this.scale.x = x;
      this.scale.y = y;
      this.isDirty = true;
    }
    return this;
  };

  setSkew = (x: number, y: number): this => {
    if (this.skew.x !== x || this.skew.y !== y) {
      this.skew.x = x;
      this.skew.y = y;
      this.isDirty = true;
    }
    return this;
  };

  toString = (): string => {
    if (!this.isDirty) return this.cache;

    const parts: string[] = [];

    if (this.translate.x !== 0 || this.translate.y !== 0) {
      parts.push(`translate(${this.translate.x}px, ${this.translate.y}px)`);
    }

    if (this.rotate !== 0) {
      parts.push(`rotate(${this.rotate}deg)`);
    }

    if (this.scale.x !== 1 || this.scale.y !== 1) {
      parts.push(`scale(${this.scale.x}, ${this.scale.y})`);
    }

    if (this.skew.x !== 0 || this.skew.y !== 0) {
      parts.push(`skew(${this.skew.x}deg, ${this.skew.y}deg)`);
    }

    this.cache = parts.length > 0 ? parts.join(" ") : "none";
    this.isDirty = false;

    return this.cache;
  };

  reset = (): this => {
    this.translate.x = 0;
    this.translate.y = 0;
    this.rotate = 0;
    this.scale.x = 1;
    this.scale.y = 1;
    this.skew.x = 0;
    this.skew.y = 0;
    this.isDirty = true;
    return this;
  };
}

// ============================================================================
// POINTER EVENT ABSTRACTION - Multi-device support
// ============================================================================

type PointerType = "mouse" | "touch" | "pen" | "unknown";

interface PointerEvent {
  type: PointerType;
  position: Vec2;
  pressure: number;
  tiltX: number;
  tiltY: number;
  twist: number;
  isPrimary: boolean;
  pointerId: number;
  timestamp: number;
}

class PointerEventBridge {
  private activePointers = new Map<number, PointerEvent>();
  private vec2Pool: Vec2Pool;

  constructor(vec2Pool: Vec2Pool) {
    this.vec2Pool = vec2Pool;
  }

  handlePointerMove = (e: globalThis.PointerEvent): PointerEvent => {
    const pointerType = (e.pointerType || "mouse") as PointerType;
    const position = this.vec2Pool.acquire(e.clientX, e.clientY);

    const event: PointerEvent = {
      type: pointerType,
      position,
      pressure: e.pressure,
      tiltX: e.tiltX,
      tiltY: e.tiltY,
      twist: e.twist,
      isPrimary: e.isPrimary,
      pointerId: e.pointerId,
      timestamp: e.timeStamp,
    };

    this.activePointers.set(e.pointerId, event);
    return event;
  };

  handlePointerUp = (pointerId: number): void => {
    const event = this.activePointers.get(pointerId);
    if (event) {
      this.vec2Pool.release(event.position);
      this.activePointers.delete(pointerId);
    }
  };

  getActivePointers = (): PointerEvent[] => {
    return Array.from(this.activePointers.values());
  };

  destroy = () => {
    this.activePointers.forEach((event) => {
      this.vec2Pool.release(event.position);
    });
    this.activePointers.clear();
  };
}

// ============================================================================
// LAYOUT READ/WRITE SCHEDULER - Prevent layout thrashing
// ============================================================================

class LayoutScheduler {
  private readQueue: Array<() => void> = [];
  private writeQueue: Array<() => void> = [];
  private isScheduled = false;

  scheduleRead = (callback: () => void) => {
    this.readQueue.push(callback);
    this.ensureScheduled();
  };

  scheduleWrite = (callback: () => void) => {
    this.writeQueue.push(callback);
    this.ensureScheduled();
  };

  private ensureScheduled = () => {
    if (this.isScheduled) return;
    this.isScheduled = true;

    requestAnimationFrame(() => {
      // Reads first
      this.readQueue.forEach((callback) => callback());
      this.readQueue = [];

      // Then writes
      this.writeQueue.forEach((callback) => callback());
      this.writeQueue = [];

      this.isScheduled = false;
    });
  };

  flush = () => {
    this.readQueue.forEach((callback) => callback());
    this.readQueue = [];

    this.writeQueue.forEach((callback) => callback());
    this.writeQueue = [];

    this.isScheduled = false;
  };

  destroy = () => {
    this.readQueue = [];
    this.writeQueue = [];
  };
}

// ============================================================================
// GPU LAYER MANAGER - Optimize compositor efficiency
// ============================================================================

class GPULayerManager {
  private promotedLayers = new Set<HTMLElement>();
  private willChangeElements = new Set<HTMLElement>();
  private maxPromotedLayers = 50;

  promoteLayer = (element: HTMLElement): void => {
    if (this.promotedLayers.has(element) || this.promotedLayers.size >= this.maxPromotedLayers) {
      return;
    }

    element.style.willChange = "transform, opacity";
    element.style.transform = "translateZ(0)";
    this.promotedLayers.add(element);
    this.willChangeElements.add(element);
  };

  demoteLayer = (element: HTMLElement): void => {
    if (!this.promotedLayers.has(element)) return;

    element.style.willChange = "auto";
    element.style.transform = "";
    this.promotedLayers.delete(element);
    this.willChangeElements.delete(element);
  };

  cleanup = () => {
    this.willChangeElements.forEach((element) => {
      element.style.willChange = "auto";
    });
    this.promotedLayers.clear();
    this.willChangeElements.clear();
  };

  destroy = () => {
    this.cleanup();
  };
}

// ============================================================================
// VISIBILITY MANAGER - Viewport-aware execution
// ============================================================================

class VisibilityManager {
  private visibilityMap = new Map<string, boolean>();
  private observerMap = new Map<string, IntersectionObserver>();

  observeElement = (
    id: string,
    element: HTMLElement,
    callback: (isVisible: boolean) => void
  ): (() => void) => {
    const observer = new IntersectionObserver(
      (entries) => {
        const isVisible = entries[0]?.isIntersecting ?? false;
        this.visibilityMap.set(id, isVisible);
        callback(isVisible);
      },
      {
        threshold: 0.01,
      }
    );

    observer.observe(element);
    this.observerMap.set(id, observer);

    return () => {
      observer.disconnect();
      this.observerMap.delete(id);
      this.visibilityMap.delete(id);
    };
  };

  isVisible = (id: string): boolean => {
    return this.visibilityMap.get(id) ?? true; // Default to visible
  };

  destroy = () => {
    this.observerMap.forEach((observer) => observer.disconnect());
    this.observerMap.clear();
    this.visibilityMap.clear();
  };
}

// ============================================================================
// FRAME BUDGETER - Adaptive frame skipping
// ============================================================================

class FrameBudgeter {
  private lastFrameTime = 0;
  private frameTimeBuffer: number[] = [];
  private frameSkipCounter = 0;
  private targetFrameTime = 16.67; // 60fps
  private criticalThreshold = 50; // ms - skip non-critical updates
  private bufferSize = 30;

  shouldUpdate = (priority: "high" | "medium" | "low", frameTime: number): boolean => {
    this.frameTimeBuffer.push(frameTime);
    if (this.frameTimeBuffer.length > this.bufferSize) {
      this.frameTimeBuffer.shift();
    }

    const averageFrameTime =
      this.frameTimeBuffer.reduce((a, b) => a + b, 0) / this.frameTimeBuffer.length;
    const isFrameDropping = averageFrameTime > this.targetFrameTime;

    if (!isFrameDropping) return true;

    // Skip based on priority when dropping frames
    if (priority === "high") return true;
    if (priority === "medium") return this.frameSkipCounter % 2 === 0;
    return this.frameSkipCounter % 3 === 0;
  };

  tick = () => {
    this.frameSkipCounter++;
  };

  getMetrics = () => {
    const avg = this.frameTimeBuffer.reduce((a, b) => a + b, 0) / this.frameTimeBuffer.length;
    return {
      averageFrameTime: avg,
      isDropping: avg > this.targetFrameTime,
      droppingFrames: this.frameTimeBuffer.filter((t) => t > this.targetFrameTime).length,
    };
  };

  reset = () => {
    this.frameTimeBuffer = [];
    this.frameSkipCounter = 0;
  };
}

// ============================================================================
// MOTION ENGINE - Unified RAF orchestrator
// ============================================================================

interface MotionCallback {
  id: string;
  priority: "high" | "medium" | "low";
  callback: (deltaTime: number) => void;
  enabled: boolean;
  isVisible?: boolean;
}

class UnifiedMotionEngine {
  private callbacks = new Map<string, MotionCallback>();
  private rafId: number | null = null;
  private isRunning = false;
  private lastTimestamp = 0;

  private frameBudgeter = new FrameBudgeter();
  private performanceMonitor = new PerformanceMonitor();

  private highPriority: MotionCallback[] = [];
  private mediumPriority: MotionCallback[] = [];
  private lowPriority: MotionCallback[] = [];

  start = () => {
    if (this.isRunning) return;
    this.isRunning = true;
    this.rafId = requestAnimationFrame(this.tick);
  };

  stop = () => {
    if (!this.isRunning) return;
    this.isRunning = false;
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  };

  subscribe = (callback: MotionCallback): (() => void) => {
    this.callbacks.set(callback.id, callback);
    this.reorganize();
    return () => {
      this.callbacks.delete(callback.id);
      this.reorganize();
    };
  };

  private reorganize = () => {
    this.highPriority = [];
    this.mediumPriority = [];
    this.lowPriority = [];

    this.callbacks.forEach((cb) => {
      if (cb.priority === "high") {
        this.highPriority.push(cb);
      } else if (cb.priority === "medium") {
        this.mediumPriority.push(cb);
      } else {
        this.lowPriority.push(cb);
      }
    });
  };

  private tick = (timestamp: number) => {
    const deltaTime = this.lastTimestamp ? timestamp - this.lastTimestamp : 16;
    this.lastTimestamp = timestamp;

    const startTime = performance.now();

    this.frameBudgeter.tick();
    this.performanceMonitor.recordFrame(deltaTime);

    // Execute high priority
    this.highPriority.forEach((cb) => {
      if (cb.enabled && (cb.isVisible !== false)) {
        const updateStart = performance.now();
        cb.callback(deltaTime);
        this.performanceMonitor.recordUpdate(cb.id, performance.now() - updateStart);
      }
    });

    // Execute medium priority with budget check
    if (this.frameBudgeter.shouldUpdate("medium", deltaTime)) {
      this.mediumPriority.forEach((cb) => {
        if (cb.enabled && (cb.isVisible !== false)) {
          const updateStart = performance.now();
          cb.callback(deltaTime);
          this.performanceMonitor.recordUpdate(cb.id, performance.now() - updateStart);
        }
      });
    }

    // Execute low priority with budget check
    if (this.frameBudgeter.shouldUpdate("low", deltaTime)) {
      this.lowPriority.forEach((cb) => {
        if (cb.enabled && (cb.isVisible !== false)) {
          const updateStart = performance.now();
          cb.callback(deltaTime);
          this.performanceMonitor.recordUpdate(cb.id, performance.now() - updateStart);
        }
      });
    }

    this.performanceMonitor.recordFrame(performance.now() - startTime);

    if (this.isRunning) {
      this.rafId = requestAnimationFrame(this.tick);
    }
  };

  getMetrics = (): PerformanceMetrics => {
    return this.performanceMonitor.getMetrics();
  };

  destroy = () => {
    this.stop();
    this.callbacks.clear();
    this.highPriority = [];
    this.mediumPriority = [];
    this.lowPriority = [];
    this.frameBudgeter.reset();
  };
}

// ============================================================================
// SPRING PHYSICS ENGINE - High-performance simulation
// ============================================================================

class SpringPhysics {
  private position: Vec2;
  private velocity: Vec2;
  private acceleration: Vec2;
  private target: Vec2;

  private stiffness: number;
  private damping: number;
  private mass: number;
  private maxVelocity: number;

  constructor(
    initialPos: Vec2,
    stiffness: number = 0.15,
    damping: number = 0.95,
    mass: number = 1
  ) {
    this.position = { x: initialPos.x, y: initialPos.y };
    this.velocity = { x: 0, y: 0 };
    this.acceleration = { x: 0, y: 0 };
    this.target = { x: initialPos.x, y: initialPos.y };
    this.stiffness = stiffness;
    this.damping = damping;
    this.mass = mass;
    this.maxVelocity = 1000;
  }

  setTarget = (target: Vec2): void => {
    this.target.x = target.x;
    this.target.y = target.y;
  };

  update = (deltaTime: number): void => {
    const dt = Math.min(deltaTime / 1000, 0.016);

    const forceX = -this.stiffness * (this.position.x - this.target.x);
    const forceY = -this.stiffness * (this.position.y - this.target.y);

    const dampingX = -this.damping * this.velocity.x;
    const dampingY = -this.damping * this.velocity.y;

    this.acceleration.x = (forceX + dampingX) / this.mass;
    this.acceleration.y = (forceY + dampingY) / this.mass;

    this.velocity.x += this.acceleration.x * dt;
    this.velocity.y += this.acceleration.y * dt;

    // Clamp velocity
    const speed = Math.sqrt(this.velocity.x * this.velocity.x + this.velocity.y * this.velocity.y);
    if (speed > this.maxVelocity) {
      const scale = this.maxVelocity / speed;
      this.velocity.x *= scale;
      this.velocity.y *= scale;
    }

    this.position.x += this.velocity.x * dt;
    this.position.y += this.velocity.y * dt;
  };

  getPosition = (): Vec2 => ({
    x: this.position.x,
    y: this.position.y,
  });

  getVelocity = (): Vec2 => ({
    x: this.velocity.x,
    y: this.velocity.y,
  });

  setConfig = (stiffness?: number, damping?: number, mass?: number): void => {
    if (stiffness !== undefined) this.stiffness = stiffness;
    if (damping !== undefined) this.damping = damping;
    if (mass !== undefined) this.mass = mass;
  };
}

// ============================================================================
// TYPE DEFINITIONS - Strict typing
// ============================================================================

interface CursorTrailPoint {
  x: number;
  y: number;
  age: number;
  velocity: number;
}

interface InteractionZone {
  id: string;
  bounds: DOMRect | null;
  element: HTMLElement;
  radius: number;
  priority: "high" | "medium" | "low";
  onEnter?: () => void;
  onExit?: () => void;
  onUpdate?: (distance: number) => void;
}

interface MouseState {
  position: Vec2;
  smoothPosition: Vec2;
  normalizedPosition: Vec2;
  velocity: Vec2;
  acceleration: Vec2;
  speed: number;
  direction: "up" | "down" | "left" | "right" | "none";
  isMoving: boolean;
  isHovering: boolean;
  trail: CursorTrailPoint[];
  predictedPosition: Vec2;
  pointerType: PointerType;
  pressure: number;
}

interface MouseContextValue extends MouseState {
  subscribe: (elementId: string, callback: (state: Readonly<MouseState>) => void) => () => void;
  registerZone: (zone: Omit<InteractionZone, "bounds">) => () => void;
  getRelativePosition: (element: HTMLElement) => Vec2;
  getDistance: (x: number, y: number) => number;
  isNear: (x: number, y: number, threshold: number) => boolean;
  batchTransform: (elementId: string, element: HTMLElement, transform: TransformMatrix, priority: "high" | "medium" | "low") => void;
  enable: () => void;
  disable: () => void;
  isEnabled: boolean;
  updatePhysicsConfig: (config: Partial<{ stiffness: number; damping: number; mass: number }>) => void;
  getMetrics: () => PerformanceMetrics;
  reset: () => void;
}

interface MotionConfig {
  smoothing?: number;
  velocityDecay?: number;
  movementThreshold?: number;
  respectReducedMotion?: boolean;
  enableVelocity?: boolean;
  enableSmoothing?: boolean;
  enableSpringPhysics?: boolean;
  enableTrail?: boolean;
  trailLength?: number;
  springStiffness?: number;
  springDamping?: number;
  springMass?: number;
  accelerationFactor?: number;
  predictiveFrames?: number;
  batchTransforms?: boolean;
  enablePerformanceMonitoring?: boolean;
}

// ============================================================================
// MAIN STATE MANAGER - Strict, optimized
// ============================================================================

class MouseStateManager {
  private listeners = new Set<() => void>();
  private subscribers = new Map<string, Set<(state: Readonly<MouseState>) => void>>();

  private state: MouseState;
  private previousPosition: Vec2 = { x: 0, y: 0 };
  private previousVelocity: Vec2 = { x: 0, y: 0 };
  private previousTime = 0;

  constructor(private vec2Pool: Vec2Pool) {
    this.state = {
      position: vec2Pool.acquire(0, 0),
      smoothPosition: vec2Pool.acquire(0, 0),
      normalizedPosition: vec2Pool.acquire(0, 0),
      velocity: vec2Pool.acquire(0, 0),
      acceleration: vec2Pool.acquire(0, 0),
      speed: 0,
      direction: "none",
      isMoving: false,
      isHovering: false,
      trail: [],
      predictedPosition: vec2Pool.acquire(0, 0),
      pointerType: "mouse",
      pressure: 0,
    };
  }

  subscribe = (listener: () => void): (() => void) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };

  getSnapshot = (): Readonly<MouseState> => this.state;

  subscribeToElement = (
    elementId: string,
    callback: (state: Readonly<MouseState>) => void
  ): (() => void) => {
    if (!this.subscribers.has(elementId)) {
      this.subscribers.set(elementId, new Set());
    }
    this.subscribers.get(elementId)!.add(callback);

    return () => {
      const subs = this.subscribers.get(elementId);
      if (subs) {
        subs.delete(callback);
        if (subs.size === 0) {
          this.subscribers.delete(elementId);
        }
      }
    };
  };

  updateFromPointerEvent = (event: PointerEvent): void => {
    const deltaTime = this.previousTime ? event.timestamp - this.previousTime : 16;

    // Update position
    this.vec2Pool.set(this.state.position, event.position.x, event.position.y);

    // Calculate velocity
    const vx = (event.position.x - this.previousPosition.x) / Math.max(deltaTime, 1);
    const vy = (event.position.y - this.previousPosition.y) / Math.max(deltaTime, 1);

    this.vec2Pool.set(this.state.velocity, vx, vy);

    // Calculate acceleration
    const ax = (vx - this.previousVelocity.x) * 0.5;
    const ay = (vy - this.previousVelocity.y) * 0.5;

    this.vec2Pool.set(this.state.acceleration, ax, ay);

    // Calculate speed
    this.state.speed = Math.sqrt(vx * vx + vy * vy);

    // Update direction
    this.state.direction =
      Math.abs(vx) > 0.5
        ? vx > 0
          ? "right"
          : "left"
        : Math.abs(vy) > 0.5
        ? vy > 0
          ? "down"
          : "up"
        : "none";

    // Update pointer info
    this.state.pointerType = event.type;
    this.state.pressure = event.pressure;

    this.previousPosition.x = event.position.x;
    this.previousPosition.y = event.position.y;
    this.previousVelocity.x = vx;
    this.previousVelocity.y = vy;
    this.previousTime = event.timestamp;

    this.notifyListeners();
    this.notifySubscribers();
  };

  updateSmoothedPosition = (smoothPos: Vec2): void => {
    this.vec2Pool.copy(smoothPos, this.state.smoothPosition);

    const nx = (smoothPos.x / window.innerWidth) * 2 - 1;
    const ny = (smoothPos.y / window.innerHeight) * 2 - 1;
    this.vec2Pool.set(this.state.normalizedPosition, nx, ny);

    this.notifyListeners();
    this.notifySubscribers();
  };

  updatePredictedPosition = (predicted: Vec2): void => {
    this.vec2Pool.copy(predicted, this.state.predictedPosition);
  };

  addTrailPoint = (point: CursorTrailPoint): void => {
    this.state.trail.unshift(point);
    if (this.state.trail.length > 50) {
      this.state.trail.pop();
    }
  };

  updateTrail = (deltaTime: number): void => {
    this.state.trail = this.state.trail.filter((p) => {
      p.age += deltaTime;
      return p.age < 1000;
    });
  };

  setHovering = (hovering: boolean): void => {
    if (this.state.isHovering !== hovering) {
      this.state.isHovering = hovering;
      this.notifyListeners();
    }
  };

  setMoving = (moving: boolean): void => {
    if (this.state.isMoving !== moving) {
      this.state.isMoving = moving;
      this.notifyListeners();
    }
  };

  private notifyListeners = (): void => {
    this.listeners.forEach((l) => l());
  };

  private notifySubscribers = (): void => {
    this.subscribers.forEach((subs) => {
      subs.forEach((cb) => cb(this.state));
    });
  };

  destroy = (): void => {
    this.listeners.clear();
    this.subscribers.clear();

    this.vec2Pool.release(this.state.position);
    this.vec2Pool.release(this.state.smoothPosition);
    this.vec2Pool.release(this.state.normalizedPosition);
    this.vec2Pool.release(this.state.velocity);
    this.vec2Pool.release(this.state.acceleration);
    this.vec2Pool.release(this.state.predictedPosition);
  };
}

// ============================================================================
// MOUSE ENGINE - Complete refactor
// ============================================================================

class MouseEngine {
  private stateManager: MouseStateManager;
  private motionEngine: UnifiedMotionEngine;
  private springPhysics: SpringPhysics;
  private layoutScheduler: LayoutScheduler;
  private gpuManager: GPULayerManager;
  private visibilityManager: VisibilityManager;
  private pointerBridge: PointerEventBridge;

  private config: Required<MotionConfig>;
  private prefersReducedMotion: boolean;
  private isEnabled = true;

  private zones = new Map<string, InteractionZone>();
  private transformCache = new Map<string, TransformMatrix>();

  private vec2Pool: Vec2Pool;
  private movementTimeout: ReturnType<typeof setTimeout> | null = null;

  constructor(
    stateManager: MouseStateManager,
    vec2Pool: Vec2Pool,
    config: MotionConfig = {}
  ) {
    this.stateManager = stateManager;
    this.vec2Pool = vec2Pool;
    this.motionEngine = new UnifiedMotionEngine();
    this.layoutScheduler = new LayoutScheduler();
    this.gpuManager = new GPULayerManager();
    this.visibilityManager = new VisibilityManager();
    this.pointerBridge = new PointerEventBridge(vec2Pool);

    this.prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    this.config = {
      smoothing: config.smoothing ?? 0.15,
      velocityDecay: config.velocityDecay ?? 0.92,
      movementThreshold: config.movementThreshold ?? 0.5,
      respectReducedMotion: config.respectReducedMotion ?? true,
      enableVelocity: config.enableVelocity ?? true,
      enableSmoothing: config.enableSmoothing ?? true,
      enableSpringPhysics: config.enableSpringPhysics ?? true,
      enableTrail: config.enableTrail ?? true,
      trailLength: config.trailLength ?? 20,
      springStiffness: config.springStiffness ?? 0.15,
      springDamping: config.springDamping ?? 0.95,
      springMass: config.springMass ?? 1,
      accelerationFactor: config.accelerationFactor ?? 0.5,
      predictiveFrames: config.predictiveFrames ?? 3,
      batchTransforms: config.batchTransforms ?? true,
      enablePerformanceMonitoring: config.enablePerformanceMonitoring ?? false,
    };

    if (this.prefersReducedMotion && this.config.respectReducedMotion) {
      this.config.enableSmoothing = false;
      this.config.enableSpringPhysics = false;
      this.config.smoothing = 1;
    }

    this.springPhysics = new SpringPhysics(
      vec2Pool.acquire(0, 0),
      this.config.springStiffness,
      this.config.springDamping,
      this.config.springMass
    );
  }

  start = (): void => {
    this.motionEngine.start();

    this.motionEngine.subscribe({
      id: "mouse-engine-main",
      priority: "high",
      callback: this.mainLoop,
      enabled: true,
    });
  };

  stop = (): void => {
    this.motionEngine.stop();
  };

  private mainLoop = (deltaTime: number): void => {
    const currentState = this.stateManager.getSnapshot();

    // Update spring physics
    if (this.config.enableSmoothing && this.config.enableSpringPhysics) {
      this.springPhysics.update(deltaTime);
      const smoothPos = this.springPhysics.getPosition();
      this.stateManager.updateSmoothedPosition(smoothPos);
    } else if (this.config.enableSmoothing) {
      // Simple lerp
      const lerp = this.config.smoothing;
      const smoothX =
        currentState.smoothPosition.x + (currentState.position.x - currentState.smoothPosition.x) * lerp;
      const smoothY =
        currentState.smoothPosition.y + (currentState.position.y - currentState.smoothPosition.y) * lerp;

      const smoothPos = this.vec2Pool.acquire(smoothX, smoothY);
      this.stateManager.updateSmoothedPosition(smoothPos);
      this.vec2Pool.release(smoothPos);
    }

    // Update trail
    if (this.config.enableTrail && currentState.speed > 0.1) {
      this.stateManager.addTrailPoint({
        x: currentState.smoothPosition.x,
        y: currentState.smoothPosition.y,
        age: 0,
        velocity: currentState.speed,
      });
    }

    this.stateManager.updateTrail(deltaTime);

    // Update zones
    this.updateZones(currentState.smoothPosition);

    // Update movement state
    const isMoving = currentState.speed > this.config.movementThreshold;
    if (isMoving) {
      if (this.movementTimeout) clearTimeout(this.movementTimeout);
      this.stateManager.setMoving(true);

      this.movementTimeout = setTimeout(() => {
        this.stateManager.setMoving(false);
      }, 100);
    }
  };

  private updateZones = (position: Vec2): void => {
    this.zones.forEach((zone) => {
      if (!zone.bounds) return;

      const distX = position.x - (zone.bounds.left + zone.bounds.width / 2);
      const distY = position.y - (zone.bounds.top + zone.bounds.height / 2);
      const distance = Math.sqrt(distX * distX + distY * distY);

      const isInside = distance < zone.radius;
      const wasInside = zone.bounds !== null;

      if (isInside && !wasInside) {
        zone.onEnter?.();
      } else if (!isInside && wasInside) {
        zone.onExit?.();
      }

      if (isInside) {
        zone.onUpdate?.(distance);
      }
    });
  };

  handlePointerMove = (event: globalThis.PointerEvent): void => {
    if (!this.isEnabled) return;

    const pointerEvent = this.pointerBridge.handlePointerMove(event);
    this.springPhysics.setTarget(pointerEvent.position);
    this.stateManager.updateFromPointerEvent(pointerEvent);
  };

  handlePointerUp = (pointerId: number): void => {
    this.pointerBridge.handlePointerUp(pointerId);
  };

  registerZone = (zone: Omit<InteractionZone, "bounds">): (() => void) => {
    const fullZone: InteractionZone = {
      ...zone,
      bounds: zone.element.getBoundingClientRect(),
    };

    this.zones.set(zone.id, fullZone);

    return () => {
      this.zones.delete(zone.id);
    };
  };

  batchTransform = (
    elementId: string,
    element: HTMLElement,
    transform: TransformMatrix,
    priority: "high" | "medium" | "low"
  ): void => {
    if (!this.transformCache.has(elementId)) {
      this.transformCache.set(elementId, new TransformMatrix());
      this.gpuManager.promoteLayer(element);
    }

    const cache = this.transformCache.get(elementId)!;
    const transformStr = transform.toString();
    const cacheStr = cache.toString();

    if (transformStr !== cacheStr) {
      this.layoutScheduler.scheduleWrite(() => {
        element.style.transform = transformStr;
      });
    }
  };

  subscribeToRAF = (
    callback: (deltaTime: number, state: Readonly<MouseState>) => void,
    priority: "high" | "medium" | "low" = "medium"
  ): (() => void) => {
    const id = `subscription-${Math.random()}`;
    const state = this.stateManager.getSnapshot();

    return this.motionEngine.subscribe({
      id,
      priority,
      callback: (dt) => callback(dt, state),
      enabled: true,
    });
  };

  updatePhysicsConfig = (config: Partial<{ stiffness: number; damping: number; mass: number }>): void => {
    this.springPhysics.setConfig(config.stiffness, config.damping, config.mass);
  };

  getMetrics = (): PerformanceMetrics => {
    return this.motionEngine.getMetrics();
  };

  destroy = (): void => {
    if (this.movementTimeout) clearTimeout(this.movementTimeout);

    this.motionEngine.destroy();
    this.layoutScheduler.destroy();
    this.gpuManager.destroy();
    this.visibilityManager.destroy();
    this.pointerBridge.destroy();

    this.zones.clear();
    this.transformCache.clear();
  };
}

// ============================================================================
// CONTEXT
// ============================================================================

const MouseContext = createContext<MouseContextValue | null>(null);

export const useMouse = (): MouseContextValue => {
  const context = useContext(MouseContext);
  if (!context) {
    throw new Error("[MouseProvider] useMouse must be used within MouseProvider");
  }
  return context;
};

// ============================================================================
// SPECIALIZED HOOKS
// ============================================================================

export const useMousePosition = (): Readonly<Vec2> => {
  const { position } = useMouse();
  return position;
};

export const useMouseSmooth = (): Readonly<Vec2> => {
  const { smoothPosition } = useMouse();
  return smoothPosition;
};

export const useMouseVelocity = (): Readonly<Vec2> => {
  const { velocity } = useMouse();
  return velocity;
};

export const useMouseAcceleration = (): Readonly<Vec2> => {
  const { acceleration } = useMouse();
  return acceleration;
};

export const useMouseNormalized = (): Readonly<Vec2> => {
  const { normalizedPosition } = useMouse();
  return normalizedPosition;
};

export const useMouseSpeed = (): number => {
  const { speed } = useMouse();
  return speed;
};

export const useMouseTrail = (): Readonly<CursorTrailPoint[]> => {
  const { trail } = useMouse();
  return trail;
};

export const useMouseMoving = (): boolean => {
  const { isMoving } = useMouse();
  return isMoving;
};

export const usePointerType = (): PointerType => {
  const { pointerType } = useMouse();
  return pointerType;
};

// ============================================================================
// ADVANCED HOOKS
// ============================================================================

export const useMagneticElement = (
  elementRef: React.RefObject<HTMLElement>,
  options: {
    strength?: number;
    radius?: number;
    priority?: "high" | "medium" | "low";
  } = {}
): void => {
  const { strength = 0.3, radius = 100, priority = "high" } = options;
  const { batchTransform, subscribe } = useMouse();

  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;
    const elementId = `magnetic-${Math.random()}`;

    const unsubscribe = subscribe(elementId, (state) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distX = state.smoothPosition.x - centerX;
      const distY = state.smoothPosition.y - centerY;
      const distance = Math.sqrt(distX * distX + distY * distY);

      const transform = new TransformMatrix();

      if (distance < radius) {
        const force = 1 - distance / radius;
        const moveX = distX * force * strength;
        const moveY = distY * force * strength;
        transform.setTranslate(moveX, moveY);
      }

      batchTransform(elementId, element, transform, priority);
    });

    return () => {
      unsubscribe();
      if (element) element.style.transform = "";
    };
  }, [elementRef, strength, radius, priority, subscribe, batchTransform]);
};

export const useTiltElement = (
  elementRef: React.RefObject<HTMLElement>,
  options: {
    maxTilt?: number;
    scale?: number;
    priority?: "high" | "medium" | "low";
  } = {}
): void => {
  const { maxTilt = 15, scale = 1.05, priority = "high" } = options;
  const { batchTransform, subscribe } = useMouse();

  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;
    const elementId = `tilt-${Math.random()}`;

    const unsubscribe = subscribe(elementId, (state) => {
      const rect = element.getBoundingClientRect();
      const relativeX = state.smoothPosition.x - rect.left;
      const relativeY = state.smoothPosition.y - rect.top;

      const percentX = relativeX / rect.width;
      const percentY = relativeY / rect.height;

      const tiltX = (percentY - 0.5) * maxTilt * 2;
      const tiltY = (percentX - 0.5) * -maxTilt * 2;

      const transform = new TransformMatrix();
      transform.setRotate(Math.sqrt(tiltX * tiltX + tiltY * tiltY) * 0.5);
      transform.setScale(scale, scale);

      batchTransform(elementId, element, transform, priority);
    });

    return () => {
      unsubscribe();
      if (element) element.style.transform = "";
    };
  }, [elementRef, maxTilt, scale, priority, subscribe, batchTransform]);
};

export const useProximityScale = (
  elementRef: React.RefObject<HTMLElement>,
  options: {
    maxScale?: number;
    radius?: number;
    priority?: "high" | "medium" | "low";
  } = {}
): void => {
  const { maxScale = 1.2, radius = 150, priority = "medium" } = options;
  const { batchTransform, subscribe } = useMouse();

  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;
    const elementId = `proximity-${Math.random()}`;

    const unsubscribe = subscribe(elementId, (state) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distX = state.smoothPosition.x - centerX;
      const distY = state.smoothPosition.y - centerY;
      const distance = Math.sqrt(distX * distX + distY * distY);

      const transform = new TransformMatrix();

      if (distance < radius) {
        const proximity = 1 - distance / radius;
        const scaleFactor = 1 + proximity * (maxScale - 1);
        transform.setScale(scaleFactor, scaleFactor);
      }

      batchTransform(elementId, element, transform, priority);
    });

    return () => {
      unsubscribe();
      if (element) element.style.transform = "";
    };
  }, [elementRef, maxScale, radius, priority, subscribe, batchTransform]);
};

export const useGlitchEffect = (
  elementRef: React.RefObject<HTMLElement>,
  options: {
    intensity?: number;
    priority?: "high" | "medium" | "low";
  } = {}
): void => {
  const { intensity = 0.05, priority = "medium" } = options;
  const { batchTransform, subscribe, velocity } = useMouse();

  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;
    const elementId = `glitch-${Math.random()}`;

    const unsubscribe = subscribe(elementId, (state) => {
      const speed = Math.min(state.speed * 0.01, 1);
      const offsetX = (Math.random() - 0.5) * speed * intensity * 100;
      const offsetY = (Math.random() - 0.5) * speed * intensity * 100;

      const transform = new TransformMatrix();
      if (speed > 0.1) {
        transform.setTranslate(offsetX, offsetY);
      }

      batchTransform(elementId, element, transform, priority);
    });

    return () => {
      unsubscribe();
      if (element) element.style.transform = "";
    };
  }, [elementRef, intensity, priority, subscribe, batchTransform, velocity]);
};

// ============================================================================
// PROVIDER
// ============================================================================

interface MouseProviderProps {
  children: ReactNode;
  config?: MotionConfig;
  className?: string;
}

export function MouseProvider({
  children,
  config = {},
  className,
}: MouseProviderProps) {
  const vec2PoolRef = useRef<Vec2Pool>(new Vec2Pool());
  const stateManagerRef = useRef<MouseStateManager | null>(null);
  const engineRef = useRef<MouseEngine | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isEnabledRef = useRef(true);

  if (!stateManagerRef.current) {
    stateManagerRef.current = new MouseStateManager(vec2PoolRef.current);
  }

  if (!engineRef.current) {
    engineRef.current = new MouseEngine(stateManagerRef.current, vec2PoolRef.current, config);
  }

  const mouseState = useSyncExternalStore(
    useCallback((onStoreChange) => stateManagerRef.current!.subscribe(onStoreChange), []),
    () => stateManagerRef.current!.getSnapshot()
  );

  const handlePointerMove = useCallback(
    (e: globalThis.PointerEvent) => {
      if (!isEnabledRef.current || !engineRef.current) return;
      engineRef.current.handlePointerMove(e);
    },
    []
  );

  const handlePointerUp = useCallback((e: globalThis.PointerEvent) => {
    if (!engineRef.current) return;
    engineRef.current.handlePointerUp(e.pointerId);
  }, []);

  const handlePointerEnter = useCallback(() => {
    stateManagerRef.current?.setHovering(true);
  }, []);

  const handlePointerLeave = useCallback(() => {
    stateManagerRef.current?.setHovering(false);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });
    window.addEventListener("pointerenter", handlePointerEnter, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave, { passive: true });

    engineRef.current?.start();

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointerenter", handlePointerEnter);
      window.removeEventListener("pointerleave", handlePointerLeave);

      engineRef.current?.stop();
      engineRef.current?.destroy();
      stateManagerRef.current?.destroy();
      vec2PoolRef.current.reset();
    };
  }, [handlePointerMove, handlePointerUp, handlePointerEnter, handlePointerLeave]);

  const subscribe = useCallback(
    (elementId: string, callback: (state: Readonly<MouseState>) => void) => {
      return stateManagerRef.current!.subscribeToElement(elementId, callback);
    },
    []
  );

  const registerZone = useCallback((zone: Omit<InteractionZone, "bounds">) => {
    return engineRef.current!.registerZone(zone);
  }, []);

  const getRelativePosition = useCallback((element: HTMLElement): Vec2 => {
    const rect = element.getBoundingClientRect();
    return vec2PoolRef.current.acquire(
      mouseState.position.x - rect.left,
      mouseState.position.y - rect.top
    );
  }, [mouseState.position]);

  const getDistance = useCallback((x: number, y: number): number => {
    return Math.sqrt(
      Math.pow(mouseState.position.x - x, 2) + Math.pow(mouseState.position.y - y, 2)
    );
  }, [mouseState.position]);

  const isNear = useCallback(
    (x: number, y: number, threshold: number): boolean => {
      return getDistance(x, y) < threshold;
    },
    [getDistance]
  );

  const batchTransform = useCallback(
    (elementId: string, element: HTMLElement, transform: TransformMatrix, priority: "high" | "medium" | "low") => {
      engineRef.current?.batchTransform(elementId, element, transform, priority);
    },
    []
  );

  const enable = useCallback(() => {
    isEnabledRef.current = true;
    engineRef.current?.start();
  }, []);

  const disable = useCallback(() => {
    isEnabledRef.current = false;
    engineRef.current?.stop();
  }, []);

  const updatePhysicsConfig = useCallback(
    (config: Partial<{ stiffness: number; damping: number; mass: number }>) => {
      engineRef.current?.updatePhysicsConfig(config);
    },
    []
  );

  const getMetrics = useCallback(() => {
    return engineRef.current?.getMetrics() || {
      fps: 0,
      droppedFrames: 0,
      averageFrameTime: 0,
      maxFrameTime: 0,
      updateCost: new Map(),
      memoryUsage: 0,
    };
  }, []);

  const reset = useCallback(() => {
    // Reset logic here
  }, []);

  const contextValue: MouseContextValue = useMemo(
    () => ({
      ...mouseState,
      subscribe,
      registerZone,
      getRelativePosition,
      getDistance,
      isNear,
      batchTransform,
      enable,
      disable,
      isEnabled: isEnabledRef.current,
      updatePhysicsConfig,
      getMetrics,
      reset,
    }),
    [
      mouseState,
      subscribe,
      registerZone,
      getRelativePosition,
      getDistance,
      isNear,
      batchTransform,
      enable,
      disable,
      updatePhysicsConfig,
      getMetrics,
      reset,
    ]
  );

  return (
    <MouseContext.Provider value={contextValue}>
      <div ref={containerRef} className={className}>
        {children}
      </div>
    </MouseContext.Provider>
  );
}

// ============================================================================
// EXPORTS
// ============================================================================

export { MouseContext };
export type {
  MouseState,
  MouseContextValue,
  MotionConfig,
  Vec2,
  InteractionZone,
  PointerEvent,
  PointerType,
  CursorTrailPoint,
  PerformanceMetrics,
};
