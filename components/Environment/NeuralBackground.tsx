'use client';

import { useRef, useEffect, useMemo, useCallback } from 'react';
import * as THREE from 'three';

// ============================================================================
// TYPES
// ============================================================================

interface NeuralBackgroundProps {
  particleCount?: number;
  maxConnections?: number;
  connectionDistance?: number;
  baseSpeed?: number;
  colorPrimary?: string;
  colorSecondary?: string;
}

interface ParticleData {
  velocity: THREE.Vector3;
  baseOpacity: number;
  pulseOffset: number;
}

// ============================================================================
// SHADER SOURCE — WebGL 1 / WebGL 2 Compatible (no GLSL3 syntax)
// ============================================================================

const vertexShader = /* glsl */ `
  precision highp float;

  // Attributes
  attribute float aOpacity;
  attribute float aSize;

  // Uniforms
  uniform float uTime;
  uniform float uPixelRatio;
  uniform float uSpeedFactor;

  // Varyings
  varying float vOpacity;
  varying float vDepth;

  void main() {
    vOpacity = aOpacity;

    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vDepth = -mvPosition.z;

    // Pulsing size
    float pulse = 1.0 + 0.15 * sin(uTime * 2.0 + aOpacity * 6.2831);
    float size = aSize * pulse * uPixelRatio;

    // Distance attenuation
    gl_PointSize = size * (150.0 / max(1.0, -mvPosition.z));
    gl_PointSize = clamp(gl_PointSize, 1.0, 64.0);

    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;

  // Uniforms
  uniform vec3 uColorPrimary;
  uniform vec3 uColorSecondary;
  uniform float uTime;

  // Varyings
  varying float vOpacity;
  varying float vDepth;

  void main() {
    // Circular particle shape
    vec2 center = gl_PointCoord - vec2(0.5);
    float dist = length(center);

    // Discard outside circle
    if (dist > 0.5) discard;

    // Soft edge falloff
    float alpha = 1.0 - smoothstep(0.25, 0.5, dist);

    // Glow core
    float core = exp(-dist * 8.0) * 0.6;
    alpha += core;

    // Color blend based on depth
    float colorMix = smoothstep(5.0, 30.0, vDepth);
    vec3 color = mix(uColorPrimary, uColorSecondary, colorMix);

    // Subtle shimmer
    float shimmer = 0.9 + 0.1 * sin(uTime * 3.0 + vDepth * 0.5);
    color *= shimmer;

    gl_FragColor = vec4(color, alpha * vOpacity);
  }
`;

const connectionVertexShader = /* glsl */ `
  precision highp float;

  attribute float aLineOpacity;

  varying float vLineOpacity;

  void main() {
    vLineOpacity = aLineOpacity;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const connectionFragmentShader = /* glsl */ `
  precision highp float;

  uniform vec3 uLineColor;
  uniform float uTime;

  varying float vLineOpacity;

  void main() {
    float pulse = 0.8 + 0.2 * sin(uTime * 1.5);
    gl_FragColor = vec4(uLineColor, vLineOpacity * pulse);
  }
`;

// ============================================================================
// HELPER: Check if rendering should be disabled
// ============================================================================

function shouldDisableRendering(): boolean {
  if (typeof window === 'undefined') return false;
  const html = document.documentElement;
  const tier = html.getAttribute('data-render-tier');
  const neuralMode = html.getAttribute('data-neural-mode');
  const motion = html.getAttribute('data-motion');
  if (tier === 'low') return true;
  if (neuralMode === 'off') return true;
  if (motion === 'reduced') return true;
  return false;
}

// ============================================================================
// COMPONENT
// ============================================================================

export default function ClientNeuralBackground({
  particleCount = 80,
  maxConnections = 120,
  connectionDistance = 8,
  baseSpeed = 0.15,
  colorPrimary = '#22D3EE',
  colorSecondary = '#8B5CF6',
}: NeuralBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const connectionsRef = useRef<THREE.LineSegments | null>(null);
  const particleDataRef = useRef<ParticleData[]>([]);
  const animFrameRef = useRef<number>(0);
  const startTimeRef = useRef(performance.now());
  const mouseRef = useRef({ x: 0, y: 0 });
  const isVisibleRef = useRef(true);

  // ---- Parse colors once ----
  const primaryColor = useMemo(() => new THREE.Color(colorPrimary), [colorPrimary]);
  const secondaryColor = useMemo(() => new THREE.Color(colorSecondary), [colorSecondary]);
  const lineColor = useMemo(() => new THREE.Color(colorPrimary).multiplyScalar(0.6), [colorPrimary]);

  // ---- Adaptive particle count based on render tier ----
  const adaptiveParticleCount = useMemo(() => {
    if (typeof window === 'undefined') return particleCount;
    const tier = document.documentElement.getAttribute('data-render-tier');
    if (tier === 'low') return 0;
    if (tier === 'medium') return Math.floor(particleCount * 0.5);
    if (tier === 'cinematic') return Math.floor(particleCount * 1.5);
    return particleCount;
  }, [particleCount]);

  // ---- Mouse handler ----
  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
  }, []);

  // ---- Visibility handler ----
  const handleVisibilityChange = useCallback(() => {
    isVisibleRef.current = !document.hidden;
  }, []);

  // ---- Initialize Three.js ----
  useEffect(() => {
    if (!containerRef.current) return;
    if (shouldDisableRendering()) return;

    const container = containerRef.current;

    // ---- Scene ----
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // ---- Camera ----
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.z = 20;
    cameraRef.current = camera;

    // ---- Renderer ----
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: false,           // Performance: disable AA
        alpha: true,                // Transparent background
        powerPreference: 'high-performance',
        failIfMajorPerformanceCaveat: false,  // Fallback gracefully
      });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));  // Cap at 2x
      renderer.setClearColor(0x000000, 0);
      container.appendChild(renderer.domElement);
      rendererRef.current = renderer;
    } catch (err) {
      console.warn('[NeuralBackground] WebGL not available, falling back:', err);
      return;
    }

    // ---- Create Particles ----
    const count = adaptiveParticleCount;
    if (count === 0) return;

    const positions = new Float32Array(count * 3);
    const opacities = new Float32Array(count);
    const sizes = new Float32Array(count);
    const particleData: ParticleData[] = [];

    for (let i = 0; i < count; i++) {
      // Spread particles in a 3D volume
      positions[i * 3]     = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

      opacities[i] = 0.3 + Math.random() * 0.7;
      sizes[i] = 1.5 + Math.random() * 3.0;

      particleData.push({
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * baseSpeed,
          (Math.random() - 0.5) * baseSpeed,
          (Math.random() - 0.5) * baseSpeed * 0.3
        ),
        baseOpacity: opacities[i],
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }
    particleDataRef.current = particleData;

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('aOpacity', new THREE.BufferAttribute(opacities, 1));
    geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
        uSpeedFactor: { value: 1.0 },
        uColorPrimary: { value: primaryColor },
        uColorSecondary: { value: secondaryColor },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);
    particlesRef.current = points;

    // ---- Create Connection Lines ----
    const linePositions = new Float32Array(maxConnections * 6);  // 2 vertices per line * 3 components
    const lineOpacities = new Float32Array(maxConnections * 2);  // 2 vertices per line

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute('aLineOpacity', new THREE.BufferAttribute(lineOpacities, 1));

    const lineMaterial = new THREE.ShaderMaterial({
      vertexShader: connectionVertexShader,
      fragmentShader: connectionFragmentShader,
      uniforms: {
        uLineColor: { value: lineColor },
        uTime: { value: 0 },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);
    connectionsRef.current = lines;

    // ---- Animation Loop ----
    // FIX: Replaced deprecated THREE.Clock with native performance.now()
    startTimeRef.current = performance.now();

    let frameCount = 0;

    function animate() {
      if (!isVisibleRef.current) {
        animFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      animFrameRef.current = requestAnimationFrame(animate);
      frameCount++;

      // FIX: Calculate elapsed time natively (in seconds)
      const elapsed = (performance.now() - startTimeRef.current) / 1000;

      // Update particle positions
      const posAttr = geometry.getAttribute('position') as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;

      for (let i = 0; i < count; i++) {
        const pd = particleData[i];

        // Mouse influence (gentle attraction)
        const px = posArray[i * 3];
        const py = posArray[i * 3 + 1];
        const dx = mouseRef.current.x * 15 - px;
        const dy = mouseRef.current.y * 10 - py;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 10 && dist > 0.1) {
          const force = 0.001 / Math.max(dist, 0.5);
          pd.velocity.x += dx * force;
          pd.velocity.y += dy * force;
        }

        // Damping
        pd.velocity.multiplyScalar(0.998);

        // Update position
        posArray[i * 3]     += pd.velocity.x;
        posArray[i * 3 + 1] += pd.velocity.y;
        posArray[i * 3 + 2] += pd.velocity.z;

        // Boundary wrapping
        if (posArray[i * 3]     >  15) posArray[i * 3]     = -15;
        if (posArray[i * 3]     < -15) posArray[i * 3]     =  15;
        if (posArray[i * 3 + 1] >  10) posArray[i * 3 + 1] = -10;
        if (posArray[i * 3 + 1] < -10) posArray[i * 3 + 1] =  10;
        if (posArray[i * 3 + 2] >  10) posArray[i * 3 + 2] = -10;
        if (posArray[i * 3 + 2] < -10) posArray[i * 3 + 2] =  10;
      }
      posAttr.needsUpdate = true;

      // Update connections (every 3rd frame for performance)
      if (frameCount % 3 === 0) {
        const linePosAttr = lineGeometry.getAttribute('position') as THREE.BufferAttribute;
        const lineOpAttr = lineGeometry.getAttribute('aLineOpacity') as THREE.BufferAttribute;
        const linePosArray = linePosAttr.array as Float32Array;
        const lineOpArray = lineOpAttr.array as Float32Array;

        let lineIndex = 0;

        for (let i = 0; i < count && lineIndex < maxConnections; i++) {
          for (let j = i + 1; j < count && lineIndex < maxConnections; j++) {
            const x1 = posArray[i * 3];
            const y1 = posArray[i * 3 + 1];
            const z1 = posArray[i * 3 + 2];
            const x2 = posArray[j * 3];
            const y2 = posArray[j * 3 + 1];
            const z2 = posArray[j * 3 + 2];

            const d = Math.sqrt(
              (x1 - x2) * (x1 - x2) +
              (y1 - y2) * (y1 - y2) +
              (z1 - z2) * (z1 - z2)
            );

            if (d < connectionDistance) {
              const opacity = (1 - d / connectionDistance) * 0.25;

              const idx = lineIndex * 6;
              linePosArray[idx]     = x1;
              linePosArray[idx + 1] = y1;
              linePosArray[idx + 2] = z1;
              linePosArray[idx + 3] = x2;
              linePosArray[idx + 4] = y2;
              linePosArray[idx + 5] = z2;

              const opIdx = lineIndex * 2;
              lineOpArray[opIdx]     = opacity;
              lineOpArray[opIdx + 1] = opacity;

              lineIndex++;
            }
          }
        }

        // Zero out unused lines
        for (let i = lineIndex * 6; i < maxConnections * 6; i++) {
          linePosArray[i] = 0;
        }
        for (let i = lineIndex * 2; i < maxConnections * 2; i++) {
          lineOpArray[i] = 0;
        }

        linePosAttr.needsUpdate = true;
        lineOpAttr.needsUpdate = true;
        lineGeometry.setDrawRange(0, lineIndex * 2);
      }

      // Update uniforms
      material.uniforms.uTime.value = elapsed;
      lineMaterial.uniforms.uTime.value = elapsed;

      // Subtle camera breathing
      camera.position.x = Math.sin(elapsed * 0.1) * 0.5;
      camera.position.y = Math.cos(elapsed * 0.15) * 0.3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }

    animFrameRef.current = requestAnimationFrame(animate);

    // ---- Event Listeners ----
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // ---- Resize Handler ----
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // ---- Cleanup ----
    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);

      // Dispose Three.js resources
      geometry.dispose();
      material.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      rendererRef.current = null;
      sceneRef.current = null;
      cameraRef.current = null;
      particlesRef.current = null;
      connectionsRef.current = null;
    };
  }, [
    adaptiveParticleCount,
    baseSpeed,
    connectionDistance,
    maxConnections,
    primaryColor,
    secondaryColor,
    lineColor,
    handleMouseMove,
    handleVisibilityChange,
  ]);

  // ---- Render ----
  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      data-neural="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    />
  );
}
