"use client";

import { useRef, useCallback } from "react";
import { useCallStore } from "@/store/callStore";
import { RetellWebCall, TranscriptUpdate } from "@/lib/retell";
import type { Agent } from "../types/index";

export function useRetellCall() {
  const retellCallRef = useRef<RetellWebCall | null>(null);
  const store = useCallStore();

  const handleTranscript = useCallback((update: TranscriptUpdate) => {
    store.appendTranscript({
      role: update.role,
      text: update.text,
      timestamp: update.timestamp,
    });
  }, [store]);

  const handleError = useCallback((error: Error) => {
    console.error("Retell call error:", error);
    store.setStatus("Connection error. Please try again.");
    setTimeout(() => {
      store.endCall();
    }, 3000);
  }, [store]);

  const handleCallEnd = useCallback(() => {
    console.log("Call ended");
    store.setStatus("Call ended");
    store.endCall();
  }, [store]);

  const startRetellCall = useCallback(async (agent: Agent) => {
    try {
      store.startLiveCall(agent);
      store.setStatus("Requesting microphone access...");

      const isPlaceholder = !agent.retellAgentId || agent.retellAgentId === "YOUR_RETELL_AGENT_ID";
      
      if (isPlaceholder) {
        console.warn("No Retell agent ID configured for", agent.name);
        store.setStatus("Agent not configured yet · Running demo mode");
        setTimeout(() => {
          store.setPhase("active");
          store.setStatus("Connected · Demo mode");
        }, 1000);
        return;
      }

      store.setStatus("Creating voice session...");
      
      const response = await fetch("/api/retell/create-web-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ agentId: agent.retellAgentId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create web call");
      }

      const { access_token, call_id } = await response.json();

      if (!access_token) {
        throw new Error("No access token received");
      }

      store.setStatus("Connecting to voice agent...");
      
      const retellCall = new RetellWebCall({
        accessToken: access_token,
        callId: call_id,
        onStart: () => {
          store.setPhase("active");
          store.setStatus("Connected · Listening...");
        },
        onTranscript: handleTranscript,
        onError: handleError,
        onEnd: handleCallEnd,
      });

      retellCallRef.current = retellCall;
      await retellCall.start();

      console.log(\Retell call started for agent \ (ID: \)\);

    } catch (error) {
      console.error("Failed to start Retell call:", error);
      store.setStatus("Failed to start call. Please try again.");
      handleError(error as Error);
    }
  }, [store, handleTranscript, handleError, handleCallEnd]);

  const stopRetellCall = useCallback(() => {
    if (retellCallRef.current) {
      retellCallRef.current.stop();
      retellCallRef.current = null;
    }
    store.endCall();
  }, [store]);

  return {
    startRetellCall,
    stopRetellCall,
  };
}

