'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

// ============================================================================
// §1  AGENT DATA CONFIGURATION
// ============================================================================

interface AgentConfig {
  id: string;
  name: string;
  role: string;
  status: 'active' | 'standby' | 'learning';
  accent: string;
  accentHex: string;
  channels: string[];
  capabilities: string[];
  voiceSample: number[];
}

const AGENTS: AgentConfig[] = [
  {
    id: 'aria',
    name: 'ARIA',
    role: 'Banking & Financial Intelligence',
    status: 'active',
    accent: 'text-blue-400',
    accentHex: '#3B82F6',
    channels: ['Voice', 'API', 'Chat'],
    capabilities: ['Fraud Detection', 'Loan Processing', 'Account Management'],
    voiceSample: [0.2, 0.8, 0.4, 0.9, 0.3, 0.7, 0.5, 0.8, 0.2, 0.6, 0.9, 0.4],
  },
  {
    id: 'nexus',
    name: 'NEXUS',
    role: 'Insurance Claims & Empathy Engine',
    status: 'active',
    accent: 'text-emerald-400',
    accentHex: '#10B981',
    channels: ['Voice', 'Chat'],
    capabilities: ['Emotion Detection', 'Claims Triage', 'Policy Verification'],
    voiceSample: [0.5, 0.3, 0.8, 0.6, 0.9, 0.2, 0.7, 0.4, 0.8, 0.5, 0.3, 0.9],
  },
  {
    id: 'pulse',
    name: 'PULSE',
    role: 'Healthcare & Clinical Triage',
    status: 'learning',
    accent: 'text-violet-300',
    accentHex: '#A78BFA',
    channels: ['Voice', 'API'],
    capabilities: ['Symptom Assessment', 'Rx Refills', 'Appointment Booking'],
    voiceSample: [0.3, 0.6, 0.4, 0.8, 0.7, 0.5, 0.9, 0.3, 0.6, 0.8, 0.4, 0.7],
  },
  {
    id: 't2',
    name: 't2',
    role: 'Universal Support & Multilingual',
    status: 'standby',
    accent: 'text-cyan-400',
    accentHex: '#22D3EE',
    channels: ['Voice', 'Chat', 'API'],
    capabilities: ['40+ Languages', 'Sentiment Analysis', 'Escalation Routing'],
    voiceSample: [0.7, 0.4, 0.9, 0.3, 0.6, 0.8, 0.2, 0.7, 0.5, 0.9, 0.4, 0.6],
  },
];

// ============================================================================
// §2  VOICE WAVEFORM VISUALIZER
// ============================================================================

function VoiceWaveform({ amplitudes, color, isActive }: { amplitudes: number[]; color: string; isActive: boolean }) {
  return (
    <div className="flex items-end gap-[2px] h-8">
      {amplitudes.map((amp, i) => (
        <div
          key={i}
          className="rounded-full transition-all duration-300"
          style={{
            width: '3px',
            height: `${amp * 100}%`,
            backgroundColor: color,
            opacity: isActive ? 0.6 : 0.15,
            animation: isActive ? `wave-bar ${0.8 + (i * 0.1)}s ease-in-out infinite alternate` : 'none',
          }}
        />
      ))}
      <style>{`
        @keyframes wave-bar {
          0% { transform: scaleY(0.6); }
          100% { transform: scaleY(1.2); }
        }
      `}</style>
    </div>
  );
}

// ============================================================================
// §3  3D TILT AGENT CARD
// ============================================================================

function AgentCard({ agent, index }: { agent: AgentConfig; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !glareRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateX = (y - 0.5) * -8;
    const rotateY = (x - 0.5) * 8;
    cardRef.current.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    glareRef.current.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.08), transparent 60%)`;
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    if (cardRef.current) cardRef.current.style.transition = 'transform 0.1s ease-out';
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    if (cardRef.current) {
      cardRef.current.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
      cardRef.current.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    }
    if (glareRef.current) glareRef.current.style.background = 'transparent';
  }, []);

  const statusColor = agent.status === 'active' ? 'bg-emerald-400' : agent.status === 'learning' ? 'bg-amber-400' : 'bg-slate-500';
  const statusLabel = agent.status.charAt(0).toUpperCase() + agent.status.slice(1);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#10131A]/70 backdrop-blur-xl transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
      style={{
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        transitionDelay: `${index * 120}ms`,
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
    >
      <div ref={glareRef} className="absolute inset-0 pointer-events-none z-10 rounded-2xl" />
      <div className="absolute top-0 left-0 right-0 h-px opacity-40 transition-opacity duration-500" style={{ background: `linear-gradient(90deg, transparent, ${agent.accentHex}, transparent)` }} />

      <div className="relative z-[2] p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div className={`text-2xl font-bold tracking-tight ${agent.accent}`} style={{ fontVariantNumeric: 'tabular-nums' }}>
            {agent.name}
          </div>
          <div className="flex items-center gap-2">
            <span className={`w-1.5 h-1.5 rounded-full ${statusColor} ${agent.status === 'active' ? 'animate-pulse' : ''}`} />
            <span className="text-[9px] tracking-[0.15em] uppercase text-slate-500">{statusLabel}</span>
          </div>
        </div>

        <p className="text-sm text-slate-400 leading-relaxed">{agent.role}</p>

        <VoiceWaveform amplitudes={agent.voiceSample} color={agent.accentHex} isActive={isHovered || agent.status === 'active'} />

        <div className="flex items-center gap-3">
          {agent.channels.map((channel) => (
            <span key={channel} className="px-2 py-0.5 rounded text-[10px] tracking-wider uppercase border border-white/[0.06] bg-white/[0.02] text-slate-500">
              {channel}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          {agent.capabilities.map((cap) => (
            <span key={cap} className="px-2.5 py-1 rounded-md text-[10px] tracking-wider uppercase border border-white/[0.06] bg-white/[0.02] text-slate-400">
              {cap}
            </span>
          ))}
        </div>

        <button className="w-full py-3 rounded-xl text-xs font-medium tracking-wider uppercase border border-white/[0.06] bg-white/[0.02] text-slate-300 transition-all duration-300 hover:bg-white/[0.05] hover:border-white/[0.12] hover:text-white">
          Activate {agent.name}
        </button>
      </div>

      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-700"
        style={{
          background: `radial-gradient(ellipse at 50% 50%, ${agent.accentHex}08 0%, transparent 70%)`,
          opacity: isHovered ? 1 : 0,
        }}
      />
    </div>
  );
}

// ============================================================================
// §4  MAIN EXPORT
// ============================================================================

export default function AgentGrid() {
  const headerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (headerRef.current) observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative z-10 py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div
          ref={headerRef}
          className={`text-center mb-20 space-y-4 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
        >
          <span className="text-mono-interface">Agent Collective</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">Meet Your AI Workforce</h2>
          <p className="text-slate-400 max-w-xl mx-auto text-lg">
            Purpose-built voice agents. Each engineered for domain mastery,
            emotional intelligence, and sub-second response times.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {AGENTS.map((agent, i) => (
            <AgentCard key={agent.id} agent={agent} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
