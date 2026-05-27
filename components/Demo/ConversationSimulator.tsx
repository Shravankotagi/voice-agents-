import React, { useEffect, useRef } from "react";
import { Agent, TranscriptMessage } from "@/types";
import { useConversation } from "@/hooks/useConversation";
import { Button } from "@/components/UI/Button";

interface ConversationSimulatorProps {
  agent: Agent | null;
  onClose: () => void;
}

export function ConversationSimulator({ agent, onClose }: ConversationSimulatorProps) {
  const {
    visibleMessages,
    isTyping,
    isComplete,
    start,
    reset,
  } = useConversation(agent?.demoScript ?? []);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (agent) {
      start();
    } else {
      reset();
    }
    return () => reset();
  }, [agent, start, reset]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [visibleMessages, isTyping]);

  if (!agent) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="flex max-h-[80vh] w-full max-w-2xl flex-col rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--color-border)] p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--color-primary)]/20 bg-[var(--color-primary)]/10 text-xs font-bold text-[var(--color-primary)]">
              {agent.name.substring(0, 2)}
            </div>
            <div>
              <h3 className="text-sm font-semibold text-zinc-100">
                {agent.name} Demo
              </h3>
              <p className="text-xs text-zinc-500">{agent.tagline}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 text-zinc-500 transition-colors hover:text-zinc-200"
          >
            ✕
          </button>
        </div>

        {/* Messages */}
        <div className="flex-grow space-y-4 overflow-y-auto bg-zinc-950/50 p-6">
          {visibleMessages.map((msg: TranscriptMessage, index: number) => (
            <div
              key={msg.id ?? `${msg.role}-${index}`}
              className={`msg-enter flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-xl px-4 py-2.5 text-sm ${
                  msg.role === "user"
                    ? "rounded-br-sm bg-zinc-800 text-zinc-100"
                    : "rounded-bl-sm border border-zinc-800 bg-zinc-900 text-zinc-200"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="msg-enter flex justify-start">
              <div className="flex gap-1.5 rounded-xl rounded-bl-sm border border-zinc-800 bg-zinc-900 px-4 py-3">
                <span className="typing-dot h-2 w-2 rounded-full bg-zinc-500" />
                <span className="typing-dot h-2 w-2 rounded-full bg-zinc-500" />
                <span className="typing-dot h-2 w-2 rounded-full bg-zinc-500" />
              </div>
            </div>
          )}

          {isComplete && (
            <div className="msg-enter mt-4 text-center text-xs text-zinc-600">
              Demo complete. Conversation ended.
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-[var(--color-border)] bg-[var(--color-surface)] p-4">
          <div className="font-mono text-xs text-zinc-500">
            {agent.latency} &bull; {agent.accuracy}
          </div>

          <div className="flex gap-2">
            <Button
              variant="ghost"
              onClick={() => {
                reset();
                start();
              }}
            >
              Replay
            </Button>

            <Button variant="secondary" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
