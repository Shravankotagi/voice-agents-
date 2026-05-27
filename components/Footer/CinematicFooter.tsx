'use client';

import { useEffect, useRef, useState } from 'react';

// ============================================================================
// §1  CONFIGURATION
// ============================================================================

const SYSTEM_LINKS = [
  { label: 'Documentation', href: '#' },
  { label: 'System Status', href: '#' },
  { label: 'Privacy Protocols', href: '#' },
  { label: 'Security', href: '#' },
];

// ============================================================================
// §2  SYSTEM TERMINAL FOOTER
// ============================================================================

export default function CinematicFooter() {
  const footerRef = useRef<HTMLElement>(null);
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
    if (footerRef.current) observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const tier = document.documentElement.getAttribute('data-render-tier') || 'high';
    const el = document.getElementById('footer-render-tier');
    if (el) el.textContent = tier.charAt(0).toUpperCase() + tier.slice(1);
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative z-10 border-t border-white/[0.04]"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 1000ms cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-32 pointer-events-none -translate-y-full"
        style={{ background: 'linear-gradient(to top, rgba(10,12,16,1) 0%, transparent 100%)' }}
      />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          
          {/* ── Column 1: Brand & Status ─────────────────── */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-violet-500/20 border border-white/[0.08] flex items-center justify-center">
                <svg className="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
                </svg>
              </div>
              <span className="text-sm font-semibold tracking-tight text-white">AI Voice Agents</span>
            </div>

            <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-emerald-500/[0.04] border border-emerald-500/10 w-fit">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
              </span>
              <span className="text-[10px] tracking-[0.15em] uppercase text-emerald-400/80 font-medium">
                All Systems Operational
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed max-w-xs">
              Enterprise-grade conversational intelligence infrastructure.
              Engineered for precision, empathy, and scale.
            </p>
          </div>

          {/* ── Column 2: Navigation ─────────────────────── */}
          <div className="space-y-4">
            <h4 className="text-[10px] tracking-[0.2em] uppercase text-slate-600 font-medium">System Resources</h4>
            <nav className="flex flex-col gap-3">
              {SYSTEM_LINKS.map((link) => (
                <a key={link.label} href={link.href} className="text-sm text-slate-500 hover:text-white transition-colors duration-300 w-fit">
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* ── Column 3: Interface Info ──────────────────── */}
          <div className="space-y-4">
            <h4 className="text-[10px] tracking-[0.2em] uppercase text-slate-600 font-medium">Interface</h4>
            <div className="space-y-2 font-mono text-[11px] text-slate-600">
              <div className="flex justify-between">
                <span>Mode</span>
                <span className="text-slate-400">Cinematic</span>
              </div>
              <div className="flex justify-between">
                <span>Render</span>
                <span className="text-slate-400" id="footer-render-tier">High</span>
              </div>
              <div className="flex justify-between">
                <span>Accessibility</span>
                <span className="text-slate-400">WCAG AAA</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom Bar ────────────────────────────────── */}
        <div className="mt-16 pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-[10px] tracking-[0.15em] uppercase text-slate-700">
            © {new Date().getFullYear()} AI Voice Agents. All rights reserved.
          </span>
          <div className="flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-cyan-500/50" />
            <span className="w-1 h-1 rounded-full bg-violet-500/50" />
            <span className="w-1 h-1 rounded-full bg-cyan-500/50" />
          </div>
        </div>
      </div>
    </footer>
  );
}
