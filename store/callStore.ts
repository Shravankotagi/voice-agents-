import { create } from 'zustand';
import { Agent } from '@/types';

export interface TranscriptMessage {
  role: 'user' | 'agent';
  text: string;
  timestamp: number;
}

interface CallState {
  callActive: boolean;
  selectedAgent: Agent | null;
  transcript: TranscriptMessage[];
  callStatus: string;
  phase: string;
  demoMode: boolean;
}

interface CallStore extends CallState {
  startDemo: (agent: Agent) => void;
  startLiveCall: (agent: Agent) => Promise<void>;
  endCall: () => void;
  appendTranscript: (msg: TranscriptMessage) => void;
  setStatus: (status: string) => void;
  setPhase: (phase: string) => void;
}

export const useCallStore = create<CallStore>((set) => ({
  callActive: false,
  selectedAgent: null,
  transcript: [],
  callStatus: '',
  phase: 'idle',
  demoMode: false,

  startDemo: (agent) => {
    set({
      demoMode: true,
      selectedAgent: agent,
      callActive: true,
      transcript: [],
      callStatus: 'Starting demo...',
      phase: 'connecting'
    });
  },

  startLiveCall: async (agent) => {
    set({
      demoMode: false,
      selectedAgent: agent,
      callActive: true,
      transcript: [],
      callStatus: 'Connecting...',
      phase: 'connecting'
    });
  },

  endCall: () => {
    set({
      callActive: false,
      demoMode: false,
      selectedAgent: null,
      callStatus: '',
      phase: 'idle',
      transcript: []
    });
  },

  appendTranscript: (msg) => {
    set((state) => ({
      transcript: [...state.transcript, msg]
    }));
  },

  setStatus: (status) => {
    set({ callStatus: status });
  },

  setPhase: (phase) => {
    set({ phase });
  }
}));

export const useCallActive = () => useCallStore((state) => state.callActive);
export const useSelectedAgent = () => useCallStore((state) => state.selectedAgent);
export const useTranscript = () => useCallStore((state) => state.transcript);
export const useCallStatus = () => useCallStore((state) => state.callStatus);

