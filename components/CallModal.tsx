"use client";

import { useEffect, useRef } from "react";
import { Phone, PhoneOff, Mic, MicOff } from "lucide-react";
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

  if (!callActive && phase === "idle") return null;

  const isConnecting = phase === "connecting";
  const isActive = phase === "active";
  const isEnded = phase === "ended";

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "24px",
          padding: "2rem",
          width: "100%",
          maxWidth: "420px",
          boxShadow: "0 24px 80px rgba(0,0,0,0.3)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.25rem",
        }}
      >
        {/* Agent Avatar */}
        <div
          style={{
            width: "88px",
            height: "88px",
            borderRadius: "50%",
            background: "radial-gradient(circle at 35% 35%, #818cf8, #4F46E5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: isActive ? "0 0 0 12px rgba(79,70,229,0.15)" : "none",
            transition: "box-shadow 0.3s",
          }}
        >
          <Phone size={32} color="#fff" />
        </div>

        {/* Agent Name */}
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: "1.25rem", fontWeight: 700, color: "#111827", marginBottom: "0.25rem" }}>
            {selectedAgent?.name || "Agent"}
          </p>
          <p style={{ fontSize: "0.875rem", color: "#6B7280" }}>{selectedAgent?.role || ""}</p>
        </div>

        {/* Status Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            background: isActive ? "#F0FDF4" : isConnecting ? "#FFF7ED" : "#F9FAFB",
            padding: "0.4rem 1rem",
            borderRadius: "9999px",
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: isActive ? "#10B981" : isConnecting ? "#F59E0B" : "#9CA3AF",
              animation: isConnecting ? "pulse 1s infinite" : "none",
            }}
          />
          <span
            style={{
              fontSize: "0.8rem",
              fontWeight: 600,
              color: isActive ? "#10B981" : isConnecting ? "#F59E0B" : "#6B7280",
            }}
          >
            {callStatus}
          </span>
        </div>

        {/* Transcript */}
        {transcript.length > 0 && (
          <div
            ref={transcriptRef}
            style={{
              width: "100%",
              maxHeight: "180px",
              overflowY: "auto",
              background: "#F9FAFB",
              borderRadius: "12px",
              padding: "0.75rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            {transcript.map((msg) => (
              <div
                key={msg.id}
                style={{
                  display: "flex",
                  justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                }}
              >
                <div
                  style={{
                    background: msg.role === "user" ? "#4F46E5" : "#E5E7EB",
                    color: msg.role === "user" ? "#fff" : "#111827",
                    padding: "0.4rem 0.75rem",
                    borderRadius: "12px",
                    fontSize: "0.8rem",
                    maxWidth: "80%",
                    lineHeight: 1.4,
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Hang Up Button */}
        <button
          onClick={endCall}
          style={{
            width: "64px",
            height: "64px",
            borderRadius: "50%",
            background: "#EF4444",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 16px rgba(239,68,68,0.4)",
            transition: "transform 0.15s, box-shadow 0.15s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.08)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
          }}
          title="End call"
        >
          <PhoneOff size={24} color="#fff" />
        </button>

        <p style={{ fontSize: "0.75rem", color: "#9CA3AF" }}>
          {isEnded ? "Call ended — tap X to close" : "Tap to end call"}
        </p>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}