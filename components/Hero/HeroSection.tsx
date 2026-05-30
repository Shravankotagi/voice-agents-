import React from 'react';

export const HeroSection: React.FC = () => {
  return (
    <section className="pt-32 pb-20 text-center">
      <div className="container max-w-3xl mx-auto fade-in-up">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800 border border-zinc-700 mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-medium text-zinc-300">General Availability</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-tight mb-6">
          Deploy AI Voice Agents<br />
          <span className="text-[var(--color-primary)]">That Actually Work</span>
        </h1>
        
        <p className="text-lg text-[var(--color-text-muted)] mb-10 max-w-xl mx-auto">
          Build, host, and monitor production-grade AI voice agents for banking, insurance, healthcare, and enterprise support. Sub-2ms latency. Full compliance.
        </p>

        <div className="flex flex-wrap justify-center gap-8 text-center">
          {[
            { value: '<2ms', label: 'Inference' },
            { value: '99.97%', label: 'Uptime SLA' },
            { value: '62', label: 'Languages' },
            { value: 'SOC 2', label: 'Certified' }
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl font-semibold text-zinc-100">{stat.value}</div>
              <div className="text-xs text-zinc-500 uppercase tracking-wider mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

