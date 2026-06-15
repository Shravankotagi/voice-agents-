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
  _retellClient: any | null;
  startDemo: (agent: Agent) => void;
  startLiveCall: (agent: Agent) => Promise<void>;
  endCall: () => void;
  appendTranscript: (message: TranscriptMessage) => void;
  setStatus: (status: string) => void;
  setPhase: (phase: CallPhase) => void;
}

export const useCallStore = create<CallState>((set, get) => ({
  callActive: false,
  selectedAgent: null,
  transcript: [],
  callStatus: "Ready",
  phase: "idle",
  demoMode: false,
  _retellClient: null,

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

    try {
      const res = await fetch("/api/retell/create-web-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
        agentId: agent.retellAgentId,
        dynamicVariables: {
          current_datetime: new Date().toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
            dateStyle: "full",
            timeStyle: "short"
          }),
          time_of_day: (() => {
            const hour = parseInt(new Intl.DateTimeFormat("en-IN", {
              timeZone: "Asia/Kolkata",
              hour: "numeric",
              hour12: false
            }).format(new Date()));
            return hour < 12 ? "morning" : hour < 17 ? "afternoon" : "evening";
          })()
        }
      }),
      });

      const data = await res.json();

      if (!data.access_token) {
        console.error("No access token returned:", data);
        set({ callStatus: "Failed to connect", phase: "ended", callActive: false });
        return;
      }

      const { RetellWebClient } = await import("retell-client-js-sdk");
      const retellClient = new RetellWebClient();
      
      // Store client so endCall can stop it
      set({ _retellClient: retellClient });

      retellClient.on("call_started", () => {
        set({ callStatus: "Connected", phase: "active" });
      });

      retellClient.on("call_ended", () => {
        set({ callActive: false, phase: "ended", callStatus: "Call ended", _retellClient: null });
      });

      retellClient.on("error", (err) => {
        console.error("Retell error:", err);
        set({ callActive: false, phase: "ended", callStatus: "Error", _retellClient: null });
      });

      retellClient.on("update", (update) => {
        if (update.transcript) {
          const messages = update.transcript.map((msg: { role: string; content: string }, index: number) => ({
            role: msg.role as "agent" | "user",
            text: msg.content,
            timestamp: Date.now(),
            id: `msg-${index}`,
          }));
          useCallStore.setState({ transcript: messages });
        }
      });
      await retellClient.startCall({ accessToken: data.access_token });

    } catch (e) {
      console.error("Failed to start call:", e);
      set({ callStatus: "Failed to connect", phase: "ended", callActive: false, _retellClient: null });
    }
  },

  endCall: () => {
    const { _retellClient } = get();
    if (_retellClient) {
      try {
        _retellClient.stopCall();
      } catch (e) {
        console.error("Error stopping call:", e);
      }
    }
    set({
      callActive: false,
      demoMode: false,
      selectedAgent: null,
      transcript: [],
      callStatus: "Ready",
      phase: "idle",
      _retellClient: null,
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