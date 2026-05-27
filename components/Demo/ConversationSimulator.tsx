import React, { useEffect, useRef } from 'react';
import { Agent, Message } from '@/types';
import { useConversation } from '@/hooks/useConversation';
import { Button } from '@/components/UI/Button';

interface ConversationSimulatorProps {
  agent: Agent | null;
  onClose: () => void;
}

export const ConversationSimulator: React.FC<ConversationSimulatorProps> = ({ agent, onClose }) => {
  const { visibleMessages, isTyping, isComplete, start, reset } = useConversation(agent?.demoScript || []);
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
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [visibleMessages, isTyping]);

  if (!agent) return null;

  return (
    <div className="fixed inset-0 z-50 bg-zinc-900/70 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl w-full max-w-2xl flex flex-col max-h-[80vh] shadow-2xl"
        onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-[var(--color-border)]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 flex items-center justify-center text-[var(--color-primary)] text-xs font-bold">
              {agent.name.substring(0, 2)}
            </div>
            <div>
              <h3 className="text-sm font-semibold text-zinc-100">{agent.name} Demo</h3>
              <p className="text-xs text-zinc-500">{agent.tagline}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-zinc-500 hover:text-zinc-200 transition-colors p-1">?</button>
        </div>

        <div className="flex-grow overflow-y-auto p-6 space-y-4 bg-zinc-950/50">
          {visibleMessages.map((msg: Message) => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} msg-enter`}>
              <div className={`max-w-[80%] px-4 py-2.5 rounded-xl text-sm ${
                msg.role === 'user'
                  ? 'bg-zinc-800 text-zinc-100 rounded-br-sm'
                  : 'bg-zinc-900 border border-zinc-800 text-zinc-200 rounded-bl-sm'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start msg-enter">
              <div className="bg-zinc-900 border border-zinc-800 px-4 py-3 rounded-xl rounded-bl-sm flex gap-1.5">
                <span className="typing-dot w-2 h-2 bg-zinc-500 rounded-full"></span>
                <span className="typing-dot w-2 h-2 bg-zinc-500 rounded-full"></span>
                <span className="typing-dot w-2 h-2 bg-zinc-500 rounded-full"></span>
              </div>
            </div>
          )}
          
          {isComplete && (
            <div className="text-center text-xs text-zinc-600 mt-4 msg-enter">
              Demo complete. Conversation ended.
            </div>
          )}
          
          <div ref={chatEndRef} />
        </div>

        <div className="flex items-center justify-between p-4 border-t border-[var(--color-border)] bg-[var(--color-surface)]">
          <div className="text-xs text-zinc-500 font-mono">
            {agent.latency} latency · {agent.accuracy} accuracy
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" onClick={() => { reset(); start(); }}>Replay</Button>
            <Button variant="secondary" onClick={onClose}>Close</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

