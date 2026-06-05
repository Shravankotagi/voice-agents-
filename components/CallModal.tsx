"use client";

import { useEffect, useRef } from "react";
import { Phone, PhoneOff } from "lucide-react";
import { useCallStore, useCallActive, useSelectedAgent, useCallPhase, useCallStatus, useTranscript } from "@/store/callStore";

export default function CallModal() {
  const callActive = useCallActive();
  const selectedAgent = useSelectedAgent();
  const phase = useCallPhase();
  const callStatus = useCallStatus();
  const transcript = useTranscript();
  const endCall = useCallStore((s) => s.endCall);
  const transcriptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [transcript]);

  useEffect(() => {
    if (callActive) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [callActive]);

  if (!callActive && phase === "idle") return null;

  const isConnecting = phase === "connecting";
  const isActive = phase === "active";
  const isEnded = phase === "ended";

  return (
    <>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        .call-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: 9999;
          background: rgba(0,0,0,0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          box-sizing: border-box;
          overflow: hidden;
        }
        .call-modal {
          background: #fff;
          border-radius: 24px;
          padding: 2rem 1.5rem;
          width: 100%;
          max-width: 380px;
          box-shadow: 0 24px 80px rgba(0,0,0,0.3);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.25rem;
          box-sizing: border-box;
        }
        .call-transcript {
          width: 100%;
          max-height: 180px;
          overflow-y: auto;
          background: #F9FAFB;
          border-radius: 12px;
          padding: 0.75rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          box-sizing: border-box;
        }
        .call-hangup {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: #EF4444;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 16px rgba(239,68,68,0.4);
          flex-shrink: 0;
        }
      `}</style>

      <div className="call-overlay">
        <div className="call-modal">
          <div style={{
            width: "80px", height: "80px", borderRadius: "50%",
            background: "linear-gradient(135deg, #818cf8, #4F46E5)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: isActive ? "0 0 0 12px rgba(79,70,229,0.15)" : "none",
            transition: "box-shadow 0.3s", flexShrink: 0,
          }}>
            <Phone size={28} color="#fff" />
          </div>

          <div style={{ textAlign: "center" }}>
            <p style={{ fontSize: "1.125rem", fontWeight: 700, color: "#111827", marginBottom: "0.25rem" }}>
              {selectedAgent?.name || "Agent"}
            </p>
            <p style={{ fontSize: "0.8rem", color: "#6B7280" }}>{selectedAgent?.role || ""}</p>
          </div>

          <div style={{
            display: "flex", alignItems: "center", gap: "0.5rem",
            background: isActive ? "#F0FDF4" : isConnecting ? "#FFF7ED" : "#F9FAFB",
            padding: "0.4rem 1rem", borderRadius: "9999px",
          }}>
            <div style={{
              width: 8, height: 8, borderRadius: "50%", flexShrink: 0,
              background: isActive ? "#10B981" : isConnecting ? "#F59E0B" : "#9CA3AF",
              animation: isConnecting ? "pulse 1s infinite" : "none",
            }} />
            <span style={{
              fontSize: "0.8rem", fontWeight: 600,
              color: isActive ? "#10B981" : isConnecting ? "#F59E0B" : "#6B7280",
            }}>
              {callStatus}
            </span>
          </div>

          {transcript.length > 0 && (
            <div className="call-transcript" ref={transcriptRef}>
              {transcript.map((msg) => (
                <div key={msg.id} style={{
                  display: "flex",
                  justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                }}>
                  <div style={{
                    background: msg.role === "user" ? "#4F46E5" : "#E5E7EB",
                    color: msg.role === "user" ? "#fff" : "#111827",
                    padding: "0.4rem 0.75rem", borderRadius: "12px",
                    fontSize: "0.8rem", maxWidth: "80%", lineHeight: 1.4,
                  }}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
          )}

          <button className="call-hangup" onClick={endCall} title="End call">
            <PhoneOff size={24} color="#fff" />
          </button>

          <p style={{ fontSize: "0.75rem", color: "#9CA3AF", textAlign: "center" }}>
            {isEnded ? "Call ended" : "Tap to end call"}
          </p>
        </div>
      </div>
    </>
  );
}