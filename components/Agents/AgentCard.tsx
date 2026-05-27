
import React from 'react';
import { Agent } from '@/types';

interface AgentCardProps {
  agent: Agent;
  onDemoRequest: (agent: Agent) => void;
}

export const AgentCard: React.FC<AgentCardProps> = ({
  agent,
  onDemoRequest
}) => {

  const statusColors: Record<string, string> = {
    live: 'bg-emerald-400',
    beta: 'bg-amber-400',
    'coming-soon': 'bg-zinc-500'
  };

  return (
    <div
      className="
      group
      bg-[var(--color-surface)]
      border
      border-[var(--color-border)]
      rounded-[var(--radius-lg)]
      p-6
      flex
      flex-col
      transition-all
      duration-300
      hover:border-[var(--color-primary)]/30
      hover:shadow-lg
      hover:shadow-[var(--color-primary)]/5
      "
    >

      <div className="flex items-start justify-between mb-4">

        <div>
          <h3 className="text-xl font-semibold tracking-tight">
            {agent.name}
          </h3>

          <p className="text-sm text-[var(--color-primary)] mt-1">
            {agent.tagline}
          </p>
        </div>

        <div className="flex items-center gap-1.5 px-2 py-1 bg-zinc-800 rounded-full">

          <span
            className={`
            w-2
            h-2
            rounded-full
            ${statusColors[agent.status] || 'bg-zinc-500'}
            `}
          />

          <span className="text-xs font-medium text-zinc-400 capitalize">
            {agent.status}
          </span>

        </div>

      </div>

      <p className="text-sm text-[var(--color-text-muted)] mb-6 flex-grow">
        {agent.description}
      </p>

      <div
        className="
        grid
        grid-cols-3
        gap-2
        mb-6
        bg-zinc-900/50
        rounded-lg
        p-3
        border
        border-zinc-800
        "
      >

        <div className="text-center">
          <div className="text-sm font-semibold text-zinc-100">
            {agent.latency}
          </div>

          <div className="text-[10px] text-zinc-500 uppercase mt-0.5">
            Latency
          </div>
        </div>

        <div className="text-center border-x border-zinc-800">
          <div className="text-sm font-semibold text-zinc-100">
            {agent.accuracy}
          </div>

          <div className="text-[10px] text-zinc-500 uppercase mt-0.5">
            Accuracy
          </div>
        </div>

        <div className="text-center">
          <div className="text-sm font-semibold text-zinc-100">
            {agent.callsToday}
          </div>

          <div className="text-[10px] text-zinc-500 uppercase mt-0.5">
            Calls Today
          </div>
        </div>

      </div>

      <button
        onClick={() => onDemoRequest(agent)}
        className="
        w-full
        py-2.5
        bg-zinc-800
        hover:bg-zinc-700
        border
        border-zinc-700
        hover:border-zinc-600
        rounded-md
        text-sm
        font-medium
        text-zinc-200
        transition-colors
        flex
        items-center
        justify-center
        gap-2
        "
      >
        <span className="text-[var(--color-primary)]">
          ●
        </span>

        Run Live Demo
      </button>

    </div>
  );
};
```
