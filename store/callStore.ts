import { create } from "zustand";
import type { Agent } from "../types/index";

export type TranscriptMessage = {
  role: "agent" | "user";
  text: string;
  timestamp: number;
  id: string;
};

type CallPhase = "idle" | "connecting" | "active" | "ended";

interface CallState {
  callActive: boolean;
  selectedAgent: Agent | null;
  transcript: TranscriptMessage[];
  callStatus: string;
  phase: CallPhase;
  demoMode: boolean;
  startDemo: (agent: Agent) => void;
  startLiveCall: (agent: Agent) => Promise<void>;
  endCall: () => void;
  appendTranscript: (message: TranscriptMessage) => void;
  setStatus: (status: string) => void;
  setPhase: (phase: CallPhase) => void;
}

export const useCallStore = create<CallState>((set) => ({
  callActive: false,
  selectedAgent: null,
  transcript: [],
  callStatus: "Ready",
  phase: "idle",
  demoMode: false,

  startDemo: (agent: Agent) => {
    set({
      demoMode: true,
      selectedAgent: agent,
      callActive: true,
      transcript: [],
      callStatus: "Starting demo...",
      phase: "connecting",
    });
  },

  startLiveCall: async (agent: Agent) => {
    set({
      demoMode: false,
      selectedAgent: agent,
      callActive: true,
      transcript: [],
      callStatus: "Connecting...",
      phase: "connecting",
    });
  },

  endCall: () => {
    set({
      callActive: false,
      demoMode: false,
      selectedAgent: null,
      transcript: [],
      callStatus: "Ready",
      phase: "idle",
    });
  },

  appendTranscript: (message: TranscriptMessage) => {
    set((state) => ({
      transcript: [...state.transcript, message],
    }));
  },

  setStatus: (status: string) => {
    set({ callStatus: status });
  },

  setPhase: (phase: CallPhase) => {
    set({ phase });
  },
}));

// Selectors
export const useCallActive = () => useCallStore((state) => state.callActive);
export const useSelectedAgent = () => useCallStore((state) => state.selectedAgent);
export const useTranscript = () => useCallStore((state) => state.transcript);
export const useCallStatus = () => useCallStore((state) => state.callStatus);
export const useCallPhase = () => useCallStore((state) => state.phase);
export const useDemoMode = () => useCallStore((state) => state.demoMode);
