"use client";
import { useState, useEffect, useRef } from "react";
import { RetellWebClient } from "retell-client-js-sdk";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Phone, Moon, Sun, ArrowRight, MessageSquare, CheckCircle2 } from "lucide-react";
import { useCallStore, useCallActive, useSelectedAgent, useTranscript, useCallStatus } from "@/store/callStore";
import type { Agent, Industry, IndustryId } from "../types/index";

type TranscriptMessage = { role: "agent" | "user"; text: string; timestamp: number };

// --- RETELL SINGLETON ------------------------------------------------
let _retellClient: RetellWebClient | null = null;
function getRetellClient(): RetellWebClient {
  if (!_retellClient) _retellClient = new RetellWebClient();
  return _retellClient;
}

const industries: Industry[] = [
  { id: "ecommerce",   name: "Ecommerce",   color: "#fb923c" },
  { id: "edtech",      name: "EdTech",      color: "#2dd4bf" },
  { id: "healthtech",  name: "HealthTech",  color: "#a78bfa" },
  { id: "bfsi",        name: "BFSI",        color: "#38bdf8" },
  { id: "hospitality", name: "Hospitality", color: "#f472b6" },
];

const agents: Agent[] = [
  {
    id: "sam", industry: "ecommerce", name: "SAM", role: "Customer Support AI",
    color: "#fb923c", currentStatus: "Handling a return - Order #47821",
    description: "Resolves delivery issues, refund escalations, and return requests without human involvement.",
    capabilities: ["Delivery exceptions", "Refund escalations", "Return authorizations"],
    useCases: ["Delivery exceptions", "Return authorizations", "Refund escalations"],
    channels: ["Voice", "Chat", "WhatsApp"], status: "live", metric: "",
    retellAgentId: process.env.NEXT_PUBLIC_RETELL_SAM_ID ?? "YOUR_RETELL_AGENT_ID",
    demoTranscript: [],
  },
  {
    id: "max", industry: "ecommerce", name: "MAX", role: "Sales Conversion AI",
    color: "#fb923c", currentStatus: "Running a cart recovery flow",
    description: "Recovers abandoned carts via voice and chat. Surfaces matched alternatives, applies offers, and closes checkout.",
    capabilities: ["Cart recovery", "Product matching", "Checkout assistance"],
    useCases: ["Cart recovery", "Product matching", "Checkout assistance"],
    channels: ["Voice", "Chat", "SMS"], status: "live", metric: "",
    retellAgentId: process.env.NEXT_PUBLIC_RETELL_MAX_ID ?? "YOUR_RETELL_AGENT_ID",
    demoTranscript: [],
  },
  {
    id: "isha", industry: "edtech", name: "ISHA", role: "Lead Qualification AI",
    color: "#2dd4bf", currentStatus: "Qualifying a prospective student",
    description: "Qualifies inbound leads, matches students to the right program, and books counsellor calls automatically.",
    capabilities: ["Student qualification", "Program matching", "Counsellor booking"],
    useCases: ["Student qualification", "Program matching", "Counsellor booking"],
    channels: ["Voice", "WhatsApp", "Chat"], status: "live", metric: "",
    retellAgentId: process.env.NEXT_PUBLIC_RETELL_ISHA_ID ?? "YOUR_RETELL_AGENT_ID",
    demoTranscript: [],
  },
  {
    id: "kiran", industry: "edtech", name: "KIRAN", role: "Student Onboarding",
    color: "#2dd4bf", currentStatus: "Collecting enrollment documents",
    description: "Walks enrolled students through document submission, payment setup, and LMS access without support staff.",
    capabilities: ["Document collection", "Payment guidance", "LMS setup"],
    useCases: ["Document collection", "Payment guidance", "LMS setup"],
    channels: ["Voice", "Email", "Chat"], status: "live", metric: "",
    retellAgentId: process.env.NEXT_PUBLIC_RETELL_KIRAN_ID ?? "YOUR_RETELL_AGENT_ID",
    demoTranscript: [],
  },
  {
    id: "sara", industry: "healthtech", name: "SARA", role: "Healthcare Reception & Patient Support AI",
    color: "#a78bfa", currentStatus: "Scheduling orthopedic follow-up - Dr. Kapoor",
    description: "Handles appointment scheduling, patient intake, insurance verification, rescheduling, follow-ups, and healthcare support workflows across providers without manual staff intervention.",
    capabilities: ["Appointment booking", "Insurance verification", "Pre-visit intake", "Appointment reminders", "Rescheduling", "Emergency routing"],
    useCases: ["Patient appointment scheduling", "Insurance verification", "Pre-visit intake", "Follow-up coordination", "Appointment reminders", "Emergency handling"],
    channels: ["Voice", "WhatsApp", "Web"], status: "live", metric: "92% automated appointment completion",
    retellAgentId: process.env.NEXT_PUBLIC_RETELL_SARA_ID ?? "YOUR_RETELL_AGENT_ID",
    demoTranscript: [],
  },
  {
    id: "riya", industry: "healthtech", name: "RIYA", role: "Clinical Screening & Risk Assessment AI",
    color: "#8b5cf6", currentStatus: "Assessing respiratory risk severity",
    description: "Performs structured symptom assessment, detects risk indicators, identifies emergency signals, and classifies urgency before routing patients to the appropriate care path.",
    capabilities: ["Symptom assessment", "Risk detection", "Emergency detection", "Urgency scoring", "Care pathway recommendation"],
    useCases: ["Respiratory screening", "Emergency identification", "Pre-consultation symptom assessment", "Risk prioritization", "Patient severity classification"],
    channels: ["Voice", "Chat"], status: "live", metric: "94% triage classification accuracy",
    retellAgentId: process.env.NEXT_PUBLIC_RETELL_RIYA_ID ?? "YOUR_RETELL_AGENT_ID",
    demoTranscript: [],
  },
  {
    id: "bhaskar", industry: "bfsi", name: "BHASKAR", role: "Fraud Resolution Executive",
    color: "#38bdf8", currentStatus: "Verifying a disputed transaction",
    description: "Handles fraud disputes end-to-end - blocks cards, applies provisional credits, and assigns replacements per RBI guidelines.",
    capabilities: ["Transaction disputes", "Provisional credits", "Card replacement"],
    useCases: ["Transaction disputes", "Provisional credits", "Card replacement"],
    channels: ["Voice", "Phone", "WhatsApp"], status: "live", metric: "",
    retellAgentId: process.env.NEXT_PUBLIC_RETELL_BHASKAR_ID ?? "YOUR_RETELL_AGENT_ID",
    demoTranscript: [],
  },
  {
    id: "aryan", industry: "bfsi", name: "ARYAN", role: "Claims Processing AI",
    color: "#38bdf8", currentStatus: "Filing a motor insurance FNOL",
    description: "Files FNOL, verifies policy coverage, and assigns adjusters for motor and health claims in under 4 minutes.",
    capabilities: ["FNOL filing", "Policy verification", "Adjuster assignment"],
    useCases: ["FNOL filing", "Policy verification", "Adjuster assignment"],
    channels: ["Voice", "SMS", "Phone"], status: "live", metric: "",
    retellAgentId: process.env.NEXT_PUBLIC_RETELL_ARYAN_ID ?? "YOUR_RETELL_AGENT_ID",
    demoTranscript: [],
  },
  {
    id: "lucky", industry: "hospitality", name: "LUCKY", role: "Hotels Guest Experience & Concierge Executive",
    color: "#ef278e", currentStatus: "Arranging a spa reservation",
    description: "Handles in-stay requests - spa, dining, housekeeping, and local bookings - in the guest's preferred language.",
    capabilities: ["Spa & dining bookings", "Room service", "Multilingual support"],
    useCases: ["Spa & dining bookings", "Room service", "Local recommendations"],
    channels: ["Voice", "Chat", "WhatsApp"], status: "live", metric: "",
    retellAgentId: process.env.NEXT_PUBLIC_RETELL_LUCKY_ID ?? "YOUR_RETELL_AGENT_ID",
    demoTranscript: [],
  },
  {
    id: "nikita", industry: "hospitality", name: "NIKITA", role: "Reservation Management AI",
    color: "#ef1787", currentStatus: "Processing a late checkout request",
    description: "Manages booking modifications, cancellations, early check-in, and late checkout against live occupancy data.",
    capabilities: ["Stay extensions", "Early/late checkout", "Group bookings"],
    useCases: ["Stay extensions", "Early/late checkout", "Group bookings"],
    channels: ["Voice", "Email", "Chat"], status: "live", metric: "",
    retellAgentId: process.env.NEXT_PUBLIC_RETELL_NIKITA_ID ?? "YOUR_RETELL_AGENT_ID",
    demoTranscript: [],
  },
];

// --- WORKFLOW PIPELINES ----------------------------------------------
type WorkflowStep = { label: string; detail: string };
type WorkflowPipeline = { industry: IndustryId; title: string; steps: WorkflowStep[] };

const workflowPipelines: WorkflowPipeline[] = [
  {
    industry: "bfsi", title: "Fraud alert -> resolution",
    steps: [
      { label: "Fraud alert triggered",  detail: "Unusual transaction pattern detected" },
      { label: "Identity verified",      detail: "OTP and voice authentication confirmed" },
      { label: "Transaction validated",  detail: "Cross-checked against location and device" },
      { label: "Dispute classified",     detail: "Marked as first-party fraud or compromise" },
      { label: "Provisional credit",     detail: "Issued per RBI mandate within 2 business days" },
      { label: "Card replaced",          detail: "Old card blocked, replacement dispatched" },
    ],
  },
  {
    industry: "healthtech", title: "Symptom -> care",
    steps: [
      { label: "Patient call received",  detail: "Inbound via voice or WhatsApp" },
      { label: "Intake collected",       detail: "Validated triage protocol, vitals and history" },
      { label: "Urgency classified",     detail: "Low, medium, or high urgency assigned" },
      { label: "Provider matched",       detail: "By specialty, availability, and insurance" },
      { label: "Slot confirmed",         detail: "Appointment booked, pre-visit form sent" },
      { label: "Reminder triggered",     detail: "2 hours before appointment via WhatsApp" },
    ],
  },
  {
    industry: "edtech", title: "Lead -> enrollment",
    steps: [
      { label: "Lead captured",          detail: "Inbound inquiry or form submission" },
      { label: "Qualification call",     detail: "Background, goals, and program fit assessed" },
      { label: "Course recommended",     detail: "Personalised track matched by profile" },
      { label: "Counsellor booked",      detail: "Slot reserved without human handoff" },
      { label: "Enrollment initiated",   detail: "Documents and payment collected by NOVA" },
      { label: "LMS access confirmed",   detail: "Portal access sent within 24 hours" },
    ],
  },
  {
    industry: "hospitality", title: "Booking -> checkout",
    steps: [
      { label: "Booking request",        detail: "Availability confirmed, preferences noted" },
      { label: "Reservation created",    detail: "Confirmation sent to email and WhatsApp" },
      { label: "Pre-arrival outreach",   detail: "Preferences and in-stay requests collected" },
      { label: "In-stay service",        detail: "Dining, spa, housekeeping handled live" },
      { label: "Late checkout approved", detail: "Against live occupancy, no front desk needed" },
      { label: "Post-stay follow-up",    detail: "Guest survey sent 2 hours after checkout" },
    ],
  },
  {
    industry: "ecommerce", title: "Order -> resolution",
    steps: [
      { label: "Order confirmed",        detail: "Tracking ID assigned, confirmation sent" },
      { label: "Exception detected",     detail: "Carrier delay flagged, customer contacted" },
      { label: "Resolution offered",     detail: "Reroute, redeliver, or refund presented" },
      { label: "Refund initiated",       detail: "Processed without agent involvement" },
      { label: "Return authorised",      detail: "Label generated, pickup scheduled in-call" },
      { label: "Ticket closed",          detail: "CSAT sent, resolution logged to CRM" },
    ],
  },
];

const agentsByIndustry = agents.reduce<Record<string, Agent[]>>((acc, a) => {
  if (!acc[a.industry]) acc[a.industry] = [];
  acc[a.industry].push(a);
  return acc;
}, {});

function useTheme() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  useEffect(() => { document.documentElement.setAttribute("data-theme", theme); }, [theme]);
  return { theme, toggle: () => setTheme((t) => (t === "dark" ? "light" : "dark")) };
}

const BAR_COUNT = 48;

function useWaveform(active: boolean) {
  const prefersReduced = useReducedMotion();
  const [heights, setHeights] = useState<number[]>(() => Array(BAR_COUNT).fill(30));
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef(0);
  useEffect(() => {
    if (!active || prefersReduced) { setHeights(Array(BAR_COUNT).fill(30)); return; }
    function tick(ts: number) {
      if (ts - lastRef.current >= 90) {
        setHeights(Array.from({ length: BAR_COUNT }, (_, i) => {
          const wave = Math.sin((Date.now() / 190) + i * 0.28) * 28;
          const rnd  = Math.random() * 38;
          return Math.max(12, Math.min(95, 50 + wave + rnd - 20));
        }));
        lastRef.current = ts;
      }
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [active, prefersReduced]);
  return heights;
}

// --- LIVE CALL RUNNER ------------------------------------------------
const _liveTimeouts: ReturnType<typeof setTimeout>[] = [];
let _callInProgress = false;

function clearAll() {
  _liveTimeouts.forEach(clearTimeout);
  _liveTimeouts.length = 0;
  try {
    const client = getRetellClient();
    client.stopCall();
    client.removeAllListeners();
  } catch (_) {
    // ignore - client may not have an active call
  }
}

const industryStatusSequences: Record<string, string[]> = {
  bfsi:        ["Listening...", "Verifying identity...", "Retrieving account...", "Checking transaction history...", "Classifying dispute...", "Issuing credit...", "Listening..."],
  healthtech:  ["Listening...", "Collecting intake...", "Assessing symptoms...", "Classifying urgency...", "Matching provider...", "Scheduling appointment...", "Listening..."],
  edtech:      ["Listening...", "Assessing profile...", "Matching program...", "Retrieving availability...", "Booking counsellor...", "Listening..."],
  hospitality: ["Listening...", "Retrieving reservation...", "Checking availability...", "Confirming booking...", "Updating itinerary...", "Listening..."],
  ecommerce:   ["Listening...", "Retrieving order...", "Checking carrier status...", "Processing refund...", "Generating return label...", "Listening..."],
};

function getStatusSequence(industry: string): string[] {
  return industryStatusSequences[industry] ?? ["Listening...", "Processing...", "Listening..."];
}

async function runLiveCall(agent: Agent) {
  if (useCallStore.getState().callActive || _callInProgress) return;
  _callInProgress = true;
  clearAll();
  const store = useCallStore.getState();
  await store.startLiveCall(agent);

  const isPlaceholder = agent.retellAgentId === "YOUR_RETELL_AGENT_ID";

  if (!isPlaceholder) {
    try {
      const micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      micStream.getTracks().forEach(t => t.stop());

      const res = await fetch("/api/retell/create-web-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ agentId: agent.retellAgentId }),
      });

      if (res.ok) {
        const { access_token } = await res.json();
        const retellClient = getRetellClient();

        retellClient.removeAllListeners();

        retellClient.on("call_started", () => {
          useCallStore.getState().setStatus("Connected - Listening...");
          useCallStore.getState().setPhase("active");
        });

        retellClient.on("call_ended", () => {
          useCallStore.getState().setStatus("Call ended");
          retellClient.removeAllListeners();
          _liveTimeouts.forEach(clearTimeout);
          _liveTimeouts.length = 0;
          _callInProgress = false;
          setTimeout(() => useCallStore.getState().endCall(), 800);
        });

        retellClient.on("error", (err: unknown) => {
          console.error("Retell error:", err);
          useCallStore.getState().setStatus("Connection error - ending call");
          clearAll();
          _callInProgress = false;
          setTimeout(() => useCallStore.getState().endCall(), 1200);
        });

        retellClient.on("update", (update: {
          transcript?: { role: string; content: string }[];
        }) => {
          if (!update.transcript || update.transcript.length === 0) return;

          const incoming = update.transcript;
          const storeState = useCallStore.getState();
          const current = storeState.transcript;

          const last = incoming[incoming.length - 1];
          const lastNormRole = last.role === "agent" ? "agent" : "user";

          if (incoming.length === current.length && current.length > 0) {
            const updatedTranscript: TranscriptMessage[] = [
              ...current.slice(0, -1),
              {
                role: lastNormRole as "agent" | "user",
                text: last.content,
                timestamp: Date.now(),
              },
            ];
            useCallStore.setState({ transcript: updatedTranscript });
          } else if (incoming.length > current.length) {
            for (let i = current.length; i < incoming.length; i++) {
              const entry = incoming[i];
              useCallStore.getState().appendTranscript({
                role: entry.role === "agent" ? "agent" : "user",
                text: entry.content,
                timestamp: Date.now(),
              });
            }
          }

          if (last?.role === "user") {
            useCallStore.getState().setStatus("Processing...");
          } else {
            useCallStore.getState().setStatus("Listening...");
          }
        });

        await retellClient.startCall({ accessToken: access_token });
        _callInProgress = false;
        return;
      }
    } catch (err) {
      console.error("Live call setup failed, falling back to simulation:", err);
      _callInProgress = false;
    }
  }

  _callInProgress = false;

  // -- Fallback simulation ------------------------------------------
  const statuses = getStatusSequence(agent.industry);
  store.setPhase("active");
  const steps: [number, () => void][] = [
    [500,  () => { store.setStatus(statuses[0]); store.appendTranscript({ role: "user", text: "Hi, I need some help with my account.", timestamp: Date.now() }); }],
    [1800, () => { store.setStatus(statuses[1] ?? "Retrieving account..."); }],
    [2800, () => { store.appendTranscript({ role: "agent", text: `Of course - I'm ${agent.name}. Can you give me your registered number or reference ID?`, timestamp: Date.now() }); store.setStatus(statuses[0]); }],
    [4600, () => { store.appendTranscript({ role: "user", text: "I was charged twice for my last transaction.", timestamp: Date.now() }); store.setStatus(statuses[2] ?? "Checking account activity..."); }],
    [6200, () => { store.setStatus(statuses[3] ?? "Verifying transaction..."); }],
    [7400, () => { store.appendTranscript({ role: "agent", text: "I can see the duplicate charge. Reversal initiated - credit will appear within 2 to 3 business days.", timestamp: Date.now() }); store.setStatus(statuses[0]); }],
    [9000, () => { store.setStatus("Listening..."); }],
  ];
  steps.forEach(([ms, fn]) => _liveTimeouts.push(setTimeout(fn, ms)));
}

// --- WORKFLOW PIPELINE -----------------------------------------------
function WorkflowPipeline({ pipeline }: { pipeline: WorkflowPipeline }) {
  return (
    <div style={{ position: "relative", zIndex: 1 }}>
      <div style={{
        padding: "1.75rem 2rem",
        border: "1px solid var(--border-card)",
        background: "var(--bg-card)",
        borderRadius: "var(--radius-lg)",
        backdropFilter: "blur(10px)",
      }}>
        <div style={{
          fontSize: "0.6875rem", fontWeight: 600, color: "var(--color-accent-bright)",
          textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: "1.5rem",
        }}>
          {pipeline.title}
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: `repeat(${pipeline.steps.length}, 1fr)`,
          gap: "0",
          position: "relative",
        }}>
          <div style={{
            position: "absolute",
            top: "13px", left: "calc(100% / (2 * " + pipeline.steps.length + "))",
            right: "calc(100% / (2 * " + pipeline.steps.length + "))",
            height: "1px",
            background: "linear-gradient(to right, transparent, var(--border-card), var(--border-card), transparent)",
            zIndex: 0,
          }} />

          {pipeline.steps.map((step, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem", padding: "0 0.5rem", position: "relative", zIndex: 1 }}>
              <div style={{
                width: "28px", height: "28px", borderRadius: "50%", flexShrink: 0,
                background: i === 0
                  ? "linear-gradient(135deg, var(--color-accent), var(--color-violet))"
                  : i === pipeline.steps.length - 1
                    ? "linear-gradient(135deg, var(--color-violet), var(--color-rose))"
                    : "var(--bg-elevated)",
                border: (i === 0 || i === pipeline.steps.length - 1) ? "none" : "1px solid var(--border-card)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.625rem", fontWeight: 700,
                color: (i === 0 || i === pipeline.steps.length - 1) ? "#050507" : "var(--text-muted)",
                boxShadow: i === 0 ? "0 0 16px var(--color-accent-glow)" : "none",
              }}>
                {i === pipeline.steps.length - 1 ? <CheckCircle2 size={12} /> : i + 1}
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "-0.01em", color: "var(--text-primary)", marginBottom: "3px", lineHeight: 1.3 }}>
                  {step.label}
                </div>
                <div style={{ fontSize: "0.6875rem", color: "var(--text-faint)", lineHeight: 1.45 }}>
                  {step.detail}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- AGENT CARD ------------------------------------------------------
function AgentCard({ agent, onLive }: { agent: Agent; onLive: () => void }) {
  const cardRef = useRef<HTMLElement>(null);
  function handleMouseMove(e: React.MouseEvent) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    cardRef.current!.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    cardRef.current!.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  }
  return (
    <article
      ref={cardRef}
      className="agent-card"
      onMouseMove={handleMouseMove}
      style={{ "--agent-color": agent.color } as React.CSSProperties}
    >
      <div className="agent-card-glow" />

      <div className="agent-header">
        <div className="agent-identity">
          <div className="agent-name-row">
            <h3 className="agent-name">{agent.name}</h3>
            <span className="status-badge"><span className="status-badge__dot" />Live</span>
          </div>
          <p className="agent-role">{agent.role}</p>
        </div>
        <div className="agent-avatar">{agent.name.slice(0, 2)}</div>
      </div>

      <div className="agent-live-status">
        <span style={{
          width: "5px", height: "5px", borderRadius: "50%",
          background: agent.color, boxShadow: `0 0 6px ${agent.color}`,
          display: "inline-block", flexShrink: 0,
          animation: "pulse-soft 2s ease-in-out infinite",
        }} />
        {agent.currentStatus}
      </div>

      <p className="agent-description">{agent.description}</p>

      <div className="use-case-row">
        {agent.capabilities.map((cap) => (
          <span key={cap} className="use-case-tag">
            <span className="use-case-dot" />
            {cap}
          </span>
        ))}
      </div>

      <div className="channels-row">
        <span className="channels-label">Channels</span>
        {agent.channels.map((c) => (
          <span key={c} className="channel-tag">{c}</span>
        ))}
      </div>

      <div className="agent-footer">
        <button onClick={onLive} className="btn-live" aria-label={`Start live call with ${agent.name}`}>
          <Phone size={12} /> Try live
        </button>
      </div>
    </article>
  );
}

// --- TRANSCRIPT ------------------------------------------------------
function Transcript({ messages }: { messages: { role: string; text: string; timestamp: number }[] }) {
  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages.length]);
  return (
    <div className="transcript" role="log" aria-live="polite" aria-label="Call transcript">
      {messages.length === 0 && (
        <div className="transcript__empty">
          <div className="transcript__empty-icon"><MessageSquare size={20} color="#555" /></div>
          <span>Waiting for conversation...</span>
        </div>
      )}
      {messages.map((msg, i) => (
        <motion.div
          key={i + "-" + msg.timestamp}
          initial={{ opacity: 0, y: 8, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}
        >
          <span className="sr-only">{msg.role === "user" ? "You" : "Agent"}:</span>
          <div className={"bubble bubble--" + msg.role}>{msg.text}</div>
        </motion.div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
}

// --- WAVEFORM ---------------------------------------------------------
function Waveform({ active }: { active: boolean }) {
  const heights = useWaveform(active);
  return (
    <div className="waveform" role="img" aria-label="Audio waveform" aria-hidden="true">
      {heights.map((h, i) => (
        <div key={i} className="waveform-bar" style={{ transform: `scaleY(${h / 100})`, height: "100%" }} />
      ))}
    </div>
  );
}

// --- CALL MODAL -------------------------------------------------------
function CallModal() {
  const callActive = useCallActive();
  const agent = useSelectedAgent();
  const transcript = useTranscript();
  const callStatus = useCallStatus();
  const { endCall, demoMode } = useCallStore();

  async function handleEndCall() {
    clearAll();
    try { getRetellClient().removeAllListeners(); } catch {}
    useCallStore.getState().setStatus("Call ended");
    endCall();
  }

  useEffect(() => {
    if (!callActive) return;
    function onKey(e: KeyboardEvent) { if (e.key === "Escape") handleEndCall(); }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [callActive, endCall]);

  return (
    <AnimatePresence>
      {callActive && agent && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={(e) => { if (e.target === e.currentTarget) handleEndCall(); }}
        >
          <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">{callStatus}</div>
          <motion.div
            className="modal-content"
            role="dialog"
            aria-modal="true"
            aria-label={"Call with " + agent.name}
            initial={{ scale: 0.94, opacity: 0, y: 14 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.97, opacity: 0, y: 6 }}
            transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
            style={{ "--agent-color": agent.color } as React.CSSProperties}
          >
            <div className="modal-header">
              <div className="modal-agent">
                <div className="agent-avatar">{agent.name.slice(0, 2)}</div>
                <div className="modal-agent-info">
                  <div className="modal-agent-name" style={{ color: agent.color }}>{agent.name}</div>
                  <div className="modal-agent-role">{agent.role}</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                {demoMode && <span className="demo-badge">Demo</span>}
                <button onClick={handleEndCall} className="btn-end-call">End call</button>
              </div>
            </div>

            <div className="modal-status">
              <span className="status-indicator" />
              <span className="status-text">{callStatus}</span>
            </div>

            <Transcript messages={transcript} />

            <div className="modal-footer">
              <Waveform active={callActive} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// --- PAGE -------------------------------------------------------------
export default function Page() {
  const [activeIndustry, setActiveIndustry] = useState<IndustryId>("bfsi");
  const { theme, toggle: toggleTheme } = useTheme();

  const filteredAgents = agentsByIndustry[activeIndustry] ?? [];
  const activePipeline = workflowPipelines.find((p) => p.industry === activeIndustry)!;

  useEffect(() => { document.documentElement.setAttribute("data-industry", activeIndustry); }, [activeIndustry]);
  useEffect(() => () => clearAll(), []);

  return (
    <div style={{ minHeight: "100vh", position: "relative" }}>
      <div className="cinematic-bg" aria-hidden="true" />
      <div className="grid-overlay" aria-hidden="true" />

      {/* -- NAVBAR -- */}
      <nav className="navbar" aria-label="Main navigation">
        <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="logo-mark"><div className="logo-mark-dot" /></div>
            <span className="font-semibold text-[15px] tracking-tight">Enlights AI</span>
          </div>
          <div className="hidden md:flex items-center gap-1">
            {[
              { label: "Agents",       id: "agents-section" },
              { label: "Industries",   id: "industries-section" },
              { label: "Enterprise",   id: "enterprise-section" },
              { label: "Case Studies", id: "cases-section" },
              { label: "Contact",      id: "contact-section" },
            ].map((item) => (
              <button
                key={item.label}
                className="nav-link"
                onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" })}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button onClick={toggleTheme} aria-label="Toggle theme" className="theme-toggle">
              {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
            </button>
            <button
              className="btn-book-demo"
              onClick={() => document.getElementById("contact-section")?.scrollIntoView({ behavior: "smooth" })}
            >
              Book a demo <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </nav>

      {/* -- HERO -- */}
      <header className="hero">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="hero-badge">
              <span className="hero-badge-tag">Live</span>
              <span>10 voice agents - Interact right now</span>
              <ArrowRight size={12} />
            </div>
            <h1 className="hero-title">
              Voice agents for<br />
              <span className="hero-gradient">claims, reservations,</span><br />
              onboarding & support.
            </h1>
            <p className="hero-subtitle">
              Each agent handles a real end-to-end workflow - fraud resolution, patient triage, student enrollment, guest concierge - without a human in the loop. Select an industry and talk to one now.
            </p>
            <div className="hero-cta">
              <button
                className="btn-primary-cta"
                onClick={() => document.getElementById("agents-section")?.scrollIntoView({ behavior: "smooth" })}
              >
                Talk to an agent <ArrowRight size={15} />
              </button>
            </div>
          </motion.div>
        </div>
      </header>

      {/* -- OPERATIONAL STRIP -- */}
      <section id="industries-section" className="max-w-7xl mx-auto px-6">
        <div className="metric-strip">
          <div className="metric-item">
            <div className="metric-eyebrow">Resolution</div>
            <div className="metric-label">First-call finish</div>
            <div className="metric-sub">Disputes, bookings, and onboarding closed end-to-end without a transfer.</div>
          </div>
          <div className="metric-item">
            <div className="metric-eyebrow">Language</div>
            <div className="metric-label">Mid-call switching</div>
            <div className="metric-sub">Shifts to Hindi, Tamil, or Arabic mid-conversation without losing context.</div>
          </div>
          <div className="metric-item">
            <div className="metric-eyebrow">Escalation</div>
            <div className="metric-label">Context-aware</div>
            <div className="metric-sub">Routes to a human only on policy breach - with full transcript attached.</div>
          </div>
          <div className="metric-item">
            <div className="metric-eyebrow">Memory</div>
            <div className="metric-label">Cross-session</div>
            <div className="metric-sub">Customers never repeat themselves on follow-up calls.</div>
          </div>
        </div>
      </section>

      {/* -- AGENTS SECTION -- */}
      <section id="agents-section" className="max-w-7xl mx-auto px-6">
        <div className="section-header">
          <div>
            <div className="section-eyebrow">AI voice agent showroom</div>
            <h2 className="section-title">
              Select an industry.<br />
              <span className="section-title-italic">Talk to a live agent.</span>
            </h2>
          </div>
          <div className="industry-tabs" role="tablist" aria-label="Industries">
            {industries.map((ind) => (
              <button
                key={ind.id}
                role="tab"
                aria-selected={activeIndustry === ind.id}
                onClick={() => setActiveIndustry(ind.id)}
                className={"industry-tab" + (activeIndustry === ind.id ? " industry-tab--active" : "")}
              >
                {ind.name}
              </button>
            ))}
          </div>
        </div>

        <div role="tabpanel">
          <motion.div
            key={activeIndustry + "-grid"}
            className="agent-grid"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {filteredAgents.map((agent, i) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              >
                <AgentCard agent={agent} onLive={() => runLiveCall(agent)} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* -- WORKFLOW PIPELINE -- */}
      <section id="enterprise-section" className="max-w-7xl mx-auto px-6 mt-24">
        <div className="section-header" style={{ marginBottom: "2rem" }}>
          <div>
            <div className="section-eyebrow">End-to-end workflow</div>
            <h2 className="section-title">
              What the agent<br />
              <span className="section-title-italic">actually resolves.</span>
            </h2>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndustry + "-pipeline"}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <WorkflowPipeline pipeline={activePipeline} />
          </motion.div>
        </AnimatePresence>
      </section>

      {/* -- CTA BANNER -- */}
      <section id="cases-section" className="max-w-7xl mx-auto px-6">
        <div className="cta-banner">
          <div className="cta-banner-content">
            <h2 className="cta-banner-title">
              See an agent handle{" "}
              <span className="cta-banner-italic">your workflows.</span>
            </h2>
            <p className="cta-banner-subtitle">
              Talk to a solutions engineer. We'll configure a pilot agent against your real use cases.
            </p>
            <div className="hero-cta" style={{ justifyContent: "center", marginTop: 0 }}>
              <button
                className="btn-primary-cta"
                onClick={() => document.getElementById("contact-section")?.scrollIntoView({ behavior: "smooth" })}
              >
                Book a pilot call <ArrowRight size={15} />
              </button>
              <button
                className="btn-secondary-cta"
                onClick={() => document.getElementById("cases-section")?.scrollIntoView({ behavior: "smooth" })}
              >
                View case studies
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* -- FOOTER -- */}
      <footer id="contact-section" className="site-footer">
        <div className="max-w-7xl mx-auto px-6">
          <div className="footer-grid">
            <div className="flex items-center gap-2.5">
              <div className="logo-mark"><div className="logo-mark-dot" /></div>
              <span className="footer-copy">Enlights AI - Powered by Enlights Lab</span>
            </div>
            <div className="footer-links">
              <button className="footer-link">Privacy</button>
              <button className="footer-link">Terms</button>
              <button className="footer-link">Security</button>
              <button className="footer-link">Enterprise</button>
              <button className="footer-link">Contact</button>
            </div>
          </div>
        </div>
      </footer>

      <CallModal />
    </div>
  );
}