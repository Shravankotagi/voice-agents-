import { Agent } from "@/types";

interface AgentCardProps {
  agent: Agent;
  onDemoRequest: (agent: Agent) => void;
}

const statusColors: Record<Agent["status"], string> = {
  live: "bg-emerald-400",
  beta: "bg-amber-400",
  "coming-soon": "bg-zinc-500",
};

export function AgentCard({ agent, onDemoRequest }: AgentCardProps) {
  const statusColor = statusColors[agent.status] ?? "bg-zinc-500";

  return (
    <div
      className="
        group
        flex
        flex-col
        rounded-[var(--radius-lg)]
        border
        border-[var(--color-border)]
        bg-[var(--color-surface)]
        p-6
        transition-all
        duration-300
        hover:border-[var(--color-primary)]/30
        hover:shadow-lg
        hover:shadow-[var(--color-primary)]/5
      "
    >
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h3 className="text-xl font-semibold tracking-tight">{agent.name}</h3>
          <p className="mt-1 text-sm text-[var(--color-primary)]">
            {agent.tagline}
          </p>
        </div>

        <div className="flex items-center gap-1.5 rounded-full bg-zinc-800 px-2 py-1">
          <span className={`h-2 w-2 rounded-full ${statusColor}`} />
          <span className="text-xs font-medium capitalize text-zinc-400">
            {agent.status}
          </span>
        </div>
      </div>

      <p className="mb-6 flex-grow text-sm text-[var(--color-text-muted)]">
        {agent.description}
      </p>

      <div
        className="
          mb-6
          grid
          grid-cols-3
          gap-2
          rounded-lg
          border
          border-zinc-800
          bg-zinc-900/50
          p-3
        "
      >
        <div className="text-center">
          <div className="text-sm font-semibold text-zinc-100">
            {agent.latency}
          </div>
          <div className="mt-0.5 text-[10px] uppercase text-zinc-500">
            Latency
          </div>
        </div>

        <div className="border-x border-zinc-800 text-center">
          <div className="text-sm font-semibold text-zinc-100">
            {agent.accuracy}
          </div>
          <div className="mt-0.5 text-[10px] uppercase text-zinc-500">
            Accuracy
          </div>
        </div>

        <div className="text-center">
          <div className="text-sm font-semibold text-zinc-100">
            {agent.callsToday}
          </div>
          <div className="mt-0.5 text-[10px] uppercase text-zinc-500">
            Calls Today
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onDemoRequest(agent)}
        className="
          flex
          w-full
          items-center
          justify-center
          gap-2
          rounded-md
          border
          border-zinc-700
          bg-zinc-800
          py-2.5
          text-sm
          font-medium
          text-zinc-200
          transition-colors
          hover:border-zinc-600
          hover:bg-zinc-700
        "
      >
        <span className="text-[var(--color-primary)]">●</span>
        Run Live Demo
      </button>
    </div>
  );
}
