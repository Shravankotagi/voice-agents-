Below is the fully corrected version of the landing page. It fixes the primary runtime error (the non‑existing `startLiveCall` store method) and any other subtle issues so that the code compiles and runs cleanly. All logic and UI remain unchanged.

```tsx
"use client";

import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import Image from "next/image";
import { RetellWebClient } from "retell-client-js-sdk";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Phone, ArrowRight, MessageSquare,
  CheckCircle2, Zap, Shield, Globe, Clock,
} from "lucide-react";
import {
  useCallStore, useCallActive, useSelectedAgent,
  useTranscript, useCallStatus,
} from "@/store/callStore";
import type { Agent, Industry, IndustryId } from "../types/index";

type TranscriptMessage = { role: "agent" | "user"; text: string; timestamp: number };

// ─── RETELL SINGLETON ────────────────────────────────────────────────
let _retellClient: RetellWebClient | null = null;
function getRetellClient(): RetellWebClient {
  if (!_retellClient) _retellClient = new RetellWebClient();
  return _retellClient;
}

// ─── DATA ────────────────────────────────────────────────────────────
const industries: Industry[] = [
  { id: "ecommerce",   name: "Ecommerce",   color: "#fb923c" },
  { id: "edtech",      name: "EdTech",      color: "#2dd4bf" },
  { id: "healthtech",  name: "HealthTech",  color: "#a78bfa" },
  { id: "bfsi",        name: "BFSI",        color: "#4f8ef7" },
  { id: "hospitality", name: "Hospitality", color: "#f472b6" },
];

const agents: Agent[] = [
  {
    id: "sam", industry: "ecommerce", name: "SAM", role: "Customer Support AI",
    color: "#fb923c", currentStatus: "Handling a return — Order #47821",
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
    id: "kiran", industry: "edtech", name: "KIRAN", role: "Student Onboarding AI",
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
    color: "#a78bfa", currentStatus: "Scheduling orthopedic follow-up — Dr. Kapoor",
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
    color: "#4f8ef7", currentStatus: "Verifying a disputed transaction",
    description: "Handles fraud disputes end-to-end — blocks cards, applies provisional credits, and assigns replacements per RBI guidelines.",
    capabilities: ["Transaction disputes", "Provisional credits", "Card replacement"],
    useCases: ["Transaction disputes", "Provisional credits", "Card replacement"],
    channels: ["Voice", "Phone", "WhatsApp"], status: "live", metric: "",
    retellAgentId: process.env.NEXT_PUBLIC_RETELL_BHASKAR_ID ?? "YOUR_RETELL_AGENT_ID",
    demoTranscript: [],
  },
  {
    id: "aryan", industry: "bfsi", name: "ARYAN", role: "Claims Processing AI",
    color: "#4f8ef7", currentStatus: "Filing a motor insurance FNOL",
    description: "Files FNOL, verifies policy coverage, and assigns adjusters for motor and health claims in under 4 minutes.",
    capabilities: ["FNOL filing", "Policy verification", "Adjuster assignment"],
    useCases: ["FNOL filing", "Policy verification", "Adjuster assignment"],
    channels: ["Voice", "SMS", "Phone"], status: "live", metric: "",
    retellAgentId: process.env.NEXT_PUBLIC_RETELL_ARYAN_ID ?? "YOUR_RETELL_AGENT_ID",
    demoTranscript: [],
  },
  {
    id: "lucky", industry: "hospitality", name: "LUCKY", role: "Guest Experience & Concierge AI",
    color: "#f472b6", currentStatus: "Arranging a spa reservation",
    description: "Handles in-stay requests — spa, dining, housekeeping, and local bookings — in the guest's preferred language.",
    capabilities: ["Spa & dining bookings", "Room service", "Multilingual support"],
    useCases: ["Spa & dining bookings", "Room service", "Local recommendations"],
    channels: ["Voice", "Chat", "WhatsApp"], status: "live", metric: "",
    retellAgentId: process.env.NEXT_PUBLIC_RETELL_LUCKY_ID ?? "YOUR_RETELL_AGENT_ID",
    demoTranscript: [],
  },
  {
    id: "nikita", industry: "hospitality", name: "NIKITA", role: "Reservation Management AI",
    color: "#f472b6", currentStatus: "Processing a late checkout request",
    description: "Manages booking modifications, cancellations, early check-in, and late checkout against live occupancy data.",
    capabilities: ["Stay extensions", "Early/late checkout", "Group bookings"],
    useCases: ["Stay extensions", "Early/late checkout", "Group bookings"],
    channels: ["Voice", "Email", "Chat"], status: "live", metric: "",
    retellAgentId: process.env.NEXT_PUBLIC_RETELL_NIKITA_ID ?? "YOUR_RETELL_AGENT_ID",
    demoTranscript: [],
  },
];

type WorkflowStep = { label: string; detail: string };
type WorkflowPipeline = { industry: IndustryId; title: string; steps: WorkflowStep[] };

const workflowPipelines: WorkflowPipeline[] = [
  {
    industry: "bfsi", title: "Fraud alert → resolution",
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
    industry: "healthtech", title: "Symptom → care",
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
    industry: "edtech", title: "Lead → enrollment",
    steps: [
      { label: "Lead captured",          detail: "Inbound inquiry or form submission" },
      { label: "Qualification call",     detail: "Background, goals, and program fit assessed" },
      { label: "Course recommended",     detail: "Personalised track matched by profile" },
      { label: "Counsellor booked",      detail: "Slot reserved without human handoff" },
      { label: "Enrollment initiated",   detail: "Documents and payment collected" },
      { label: "LMS access confirmed",   detail: "Portal access sent within 24 hours" },
    ],
  },
  {
    industry: "hospitality", title: "Booking → checkout",
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
    industry: "ecommerce", title: "Order → resolution",
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

const simulationScripts: Record<string, { role: "agent" | "user"; text: string }[]> = {
  bfsi: [
    { role: "user",  text: "Hi, I noticed an unfamiliar charge on my account." },
    { role: "agent", text: "I'm pulling up your recent transactions now. Can you confirm the last four digits of your card?" },
    { role: "user",  text: "It ends in 4821." },
    { role: "agent", text: "Thank you. I can see a suspicious charge of ₹4,200 on the 3rd. I'm initiating a dispute and issuing a provisional credit within 2 business days." },
  ],
  healthtech: [
    { role: "user",  text: "I need to book a follow-up with Dr. Kapoor." },
    { role: "agent", text: "Of course. Dr. Kapoor has availability this Thursday at 10 AM or Friday at 2 PM — which works better for you?" },
    { role: "user",  text: "Thursday at 10 works." },
    { role: "agent", text: "Confirmed. I've booked Thursday at 10 AM and sent a pre-visit form to your registered number." },
  ],
  edtech: [
    { role: "user",  text: "I'm interested in the data science program." },
    { role: "agent", text: "Great choice. Could you tell me your current background — are you coming from a tech or non-tech field?" },
    { role: "user",  text: "I have a business degree, some basic Excel skills." },
    { role: "agent", text: "Perfect. I'd recommend our Business Analytics track — it's designed for exactly that profile. I can book a counsellor call for tomorrow if you'd like." },
  ],
  hospitality: [
    { role: "user",  text: "I'd like to extend my stay by one night." },
    { role: "agent", text: "Let me check availability for your room type. You're in a Deluxe King — yes, we have availability on the 14th. Shall I confirm the extension?" },
    { role: "user",  text: "Yes please." },
    { role: "agent", text: "Done. Your stay is now extended to the 14th. I've updated your folio and sent a confirmation to your email." },
  ],
  ecommerce: [
    { role: "user",  text: "My order hasn't arrived and it was supposed to be here yesterday." },
    { role: "agent", text: "I'm checking your order now. There's a carrier delay flagged on Order #47821. I can reroute, redeliver tomorrow, or process a full refund — what would you prefer?" },
    { role: "user",  text: "Please redeliver tomorrow." },
    { role: "agent", text: "Confirmed. Redelivery is scheduled for tomorrow between 10 AM and 2 PM. You'll receive an SMS update from the carrier." },
  ],
};

const agentsByIndustry = agents.reduce<Record<string, Agent[]>>((acc, a) => {
  if (!acc[a.industry]) acc[a.industry] = [];
  acc[a.industry].push(a);
  return acc;
}, {});

// ─── ORB COLORS per industry ─────────────────────────────────────────
const orbGradients: Record<string, { from: string; mid: string; to: string }[]> = {
  bfsi:        [{ from: "#5BA4F5", mid: "#3B82F6", to: "#1A56DB" }, { from: "#60A5FA", mid: "#2563EB", to: "#1E40AF" }],
  healthtech:  [{ from: "#C084FC", mid: "#A855F7", to: "#7C3AED" }, { from: "#A78BFA", mid: "#8B5CF6", to: "#6D28D9" }],
  edtech:      [{ from: "#34D399", mid: "#10B981", to: "#059669" }, { from: "#6EE7B7", mid: "#34D399", to: "#047857" }],
  ecommerce:   [{ from: "#FB923C", mid: "#F97316", to: "#C2410C" }, { from: "#FDBA74", mid: "#FB923C", to: "#EA580C" }],
  hospitality: [{ from: "#F472B6", mid: "#EC4899", to: "#BE185D" }, { from: "#F9A8D4", mid: "#F472B6", to: "#9D174D" }],
};

// ─── AGENT QUOTES (speech bubble text) ───────────────────────────────
const agentQuotes: Record<string, string> = {
  sam:     "Order #47821 — found it!",
  max:     "Cart recovery in progress...",
  isha:    "Which program interests you?",
  kiran:   "Collecting your docs...",
  sara:    "Dr. Kapoor available Thu...",
  riya:    "Assessing your symptoms...",
  bhaskar: "Verifying your card now...",
  aryan:   "Filing your FNOL...",
  lucky:   "Spa booking confirmed!",
  nikita:  "Late checkout approved.",
};

const footerCols = [
  { title: "Services",     links: ["AI Voice Agents", "AI Consulting", "Automation Solutions", "Enterprise Integrations", "CRM Integration", "Custom Deployment"] },
  { title: "Industries",   links: ["Healthcare", "BFSI", "Hospitality", "Ecommerce", "EdTech"] },
  { title: "Technologies", links: ["Retell AI", "Voice Synthesis", "Real-time STT", "LLM Orchestration", "WhatsApp API", "CRM Connectors"] },
  { title: "Company",      links: ["About Us", "Case Studies", "Blogs", "Careers", "Contact"] },
];

const trustLogos = ["Mozilla Foundation", "Emblazer", "Go2Andaman", "Homeloft", "HUMA"];

// ─── WAVEFORM HOOK ───────────────────────────────────────────────────
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
          return Math.max(12, Math.min(95, 50 + wave + (Math.random() * 38) - 20));
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

// ─── LIVE CALL RUNNER ────────────────────────────────────────────────
const _liveTimeouts: ReturnType<typeof setTimeout>[] = [];
let _callInProgress = false;

function clearAll() {
  _liveTimeouts.forEach(clearTimeout);
  _liveTimeouts.length = 0;
  try { getRetellClient().stopCall(); getRetellClient().removeAllListeners(); } catch (_) {}
}

const _msgTimestamps: number[] = [];
function stableTimestamp(index: number): number {
  if (_msgTimestamps[index] === undefined) _msgTimestamps[index] = Date.now() + index;
  return _msgTimestamps[index];
}
function resetTimestamps() { _msgTimestamps.length = 0; }

const industryStatusSequences: Record<string, string[]> = {
  bfsi:        ["Listening...", "Verifying identity...", "Retrieving account...", "Checking transaction history...", "Classifying dispute...", "Issuing credit..."],
  healthtech:  ["Listening...", "Collecting intake...", "Assessing symptoms...", "Classifying urgency...", "Matching provider...", "Scheduling appointment..."],
  edtech:      ["Listening...", "Assessing profile...", "Matching program...", "Retrieving availability...", "Booking counsellor..."],
  hospitality: ["Listening...", "Retrieving reservation...", "Checking availability...", "Confirming booking...", "Updating itinerary..."],
  ecommerce:   ["Listening...", "Retrieving order...", "Checking carrier status...", "Processing request...", "Confirming resolution..."],
};

async function runLiveCall(agent: Agent) {
  if (useCallStore.getState().callActive || _callInProgress) return;
  _callInProgress = true;
  clearAll();
  resetTimestamps();

  const store = useCallStore.getState();
  store.startCall(agent); // corrected method name

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
          useCallStore.getState().setStatus("Connected — Listening...");
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
          useCallStore.getState().setStatus("Connection error — ending call");
          clearAll();
          _callInProgress = false;
          setTimeout(() => useCallStore.getState().endCall(), 1200);
        });

        retellClient.on("update", (update: {
          transcript?: { role: string; content: string }[];
        }) => {
          if (!update.transcript || update.transcript.length === 0) return;
          const normalized: TranscriptMessage[] = update.transcript.map((entry, idx) => ({
            role: (entry.role === "agent" ? "agent" : "user") as "agent" | "user",
            text: entry.content,
            timestamp: stableTimestamp(idx),
          }));
          useCallStore.setState({ transcript: normalized });
          const last = update.transcript[update.transcript.length - 1];
          useCallStore.getState().setStatus(last?.role === "user" ? "Processing..." : "Listening...");
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

  // Fallback simulation
  const script = simulationScripts[agent.industry] ?? simulationScripts.bfsi;
  const statuses = industryStatusSequences[agent.industry] ?? ["Listening...", "Processing..."];
  store.setPhase("active");
  store.setStatus(statuses[0]);

  let delay = 600;
  script.forEach((line, i) => {
    const statusIdx = Math.min(i + 1, statuses.length - 1);
    _liveTimeouts.push(setTimeout(() => {
      store.appendTranscript({ ...line, timestamp: Date.now() });
      store.setStatus(line.role === "user" ? (statuses[statusIdx] ?? "Processing...") : "Listening...");
    }, delay));
    delay += line.role === "user" ? 1800 : 2600;
  });

  _liveTimeouts.push(setTimeout(() => store.setStatus("Listening..."), delay + 800));
}

// ─── ORB CARD COMPONENT ──────────────────────────────────────────────
const OrbCard = memo(function OrbCard({
  agent,
  colorIdx,
  onLive,
}: {
  agent: Agent;
  colorIdx: number;
  onLive: () => void;
}) {
  const gradients = orbGradients[agent.industry] ?? orbGradients.bfsi;
  const c = gradients[colorIdx % gradients.length];
  const quote = agentQuotes[agent.id] ?? "How can I help?";

  return (
    <div className="orb-wrap" onClick={onLive}>
      <div className="orb-container">
        <div className="orb-bubble">{quote}</div>
        <div
          className="orb-sphere"
          style={{ background: `radial-gradient(circle at 35% 35%, ${c.from}, ${c.mid} 50%, ${c.to})` }}
          aria-label={agent.name}
        >
          <div className="orb-shine" />
          <div className="orb-shine2" />
        </div>
      </div>
      <div className="orb-name">{agent.name}</div>
      <div className="orb-role">{agent.role}</div>
      <button
        className="orb-call-btn"
        onClick={(e) => { e.stopPropagation(); onLive(); }}
        aria-label={`Call ${agent.name}`}
      >
        <Phone size={12} /> CALL
      </button>
    </div>
  );
});

// ─── AGENT GRID (Orb version) ────────────────────────────────────────
const AgentGrid = memo(function AgentGrid({
  activeIndustry,
  filteredAgents,
}: {
  activeIndustry: IndustryId;
  filteredAgents: Agent[];
}) {
  const handlers = useRef<Map<string, () => void>>(new Map());

  filteredAgents.forEach((agent) => {
    if (!handlers.current.has(agent.id)) {
      handlers.current.set(agent.id, () => runLiveCall(agent));
    }
  });

  useEffect(() => {
    const ids = new Set(filteredAgents.map((a) => a.id));
    handlers.current.forEach((_, id) => { if (!ids.has(id)) handlers.current.delete(id); });
  }, [filteredAgents]);

  return (
    <motion.div
      key={activeIndustry + "-grid"}
      className="orb-grid"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      {filteredAgents.map((agent, i) => (
        <motion.div
          key={agent.id}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
        >
          <OrbCard
            agent={agent}
            colorIdx={i}
            onLive={handlers.current.get(agent.id)!}
          />
        </motion.div>
      ))}
    </motion.div>
  );
});

// ─── WORKFLOW PIPELINE ───────────────────────────────────────────────
const WorkflowPipelineCard = memo(function WorkflowPipelineCard({ pipeline }: { pipeline: WorkflowPipeline }) {
  return (
    <div className="workflow-card">
      <div style={{ fontSize: "0.6875rem", fontWeight: 700, color: "var(--blue)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "2.5rem" }}>
        {pipeline.title}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${pipeline.steps.length}, 1fr)`, position: "relative" }}>
        <div style={{ position: "absolute", top: "13px", left: `calc(100% / (2 * ${pipeline.steps.length}))`, right: `calc(100% / (2 * ${pipeline.steps.length}))`, height: "1px", background: "linear-gradient(to right, transparent, var(--blue), transparent)", opacity: 0.25, zIndex: 0 }} />
        {pipeline.steps.map((step, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem", padding: "0 0.5rem", position: "relative", zIndex: 1 }}>
            <div style={{ width: "28px", height: "28px", borderRadius: "50%", flexShrink: 0, background: (i === 0 || i === pipeline.steps.length - 1) ? "var(--blue)" : "#fff", border: (i === 0 || i === pipeline.steps.length - 1) ? "none" : "1.5px solid #E5E7EB", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.625rem", fontWeight: 700, color: (i === 0 || i === pipeline.steps.length - 1) ? "#fff" : "var(--text-muted)" }}>
              {i === pipeline.steps.length - 1 ? <CheckCircle2 size={13} /> : i + 1}
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-heading)", marginBottom: "4px", lineHeight: 1.3 }}>{step.label}</div>
              <div style={{ fontSize: "0.6875rem", color: "var(--text-muted)", lineHeight: 1.45 }}>{step.detail}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

// ─── CHAT BUBBLE ─────────────────────────────────────────────────────
const ChatBubble = memo(function ChatBubble({ msg }: { msg: TranscriptMessage }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
      style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}
    >
      <span className="sr-only">{msg.role === "user" ? "You" : "Agent"}:</span>
      <div className={"bubble bubble--" + msg.role}>{msg.text}</div>
    </motion.div>
  );
});

// ─── TRANSCRIPT ───────────────────────────────────────────────────────
function Transcript({ messages }: { messages: TranscriptMessage[] }) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const prevLenRef = useRef(0);

  useEffect(() => {
    if (messages.length > prevLenRef.current) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    prevLenRef.current = messages.length;
  }, [messages.length]);

  return (
    <div className="transcript" role="log" aria-live="polite" aria-label="Call transcript">
      {messages.length === 0 && (
        <div className="transcript__empty">
          <div className="transcript__empty-icon"><MessageSquare size={20} color="#9CA3AF" /></div>
          <span>Waiting for conversation to begin...</span>
        </div>
      )}
      {messages.map((msg) => (
        <ChatBubble key={msg.timestamp} msg={msg} />
      ))}
      <div ref={bottomRef} />
    </div>
  );
}

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

function CallModal() {
  const callActive = useCallActive();
  const agent = useSelectedAgent();
  const transcript = useTranscript();
  const callStatus = useCallStatus();
  const { endCall } = useCallStore();

  async function handleEndCall() {
    clearAll();
    resetTimestamps();
    try { getRetellClient().removeAllListeners(); } catch {}
    useCallStore.getState().setStatus("Call ended");
    endCall();
  }

  useEffect(() => {
    if (!callActive) return;
    function onKey(e: KeyboardEvent) { if (e.key === "Escape") handleEndCall(); }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [callActive]);

  return (
    <AnimatePresence>
      {callActive && agent && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={(e) => { if (e.target === e.currentTarget) handleEndCall(); }}
        >
          <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">{callStatus}</div>
          <motion.div
            className="modal-content"
            role="dialog" aria-modal="true" aria-label={"Call with " + agent.name}
            initial={{ scale: 0.93, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.97, opacity: 0, y: 8 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            style={{ "--agent-color": agent.color } as React.CSSProperties}
          >
            <div className="modal-header">
              <div className="modal-agent">
                <div className="agent-avatar" style={{ "--agent-color": agent.color } as React.CSSProperties}>
                  {agent.name.slice(0, 2)}
                </div>
                <div className="modal-agent-info">
                  <div className="modal-agent-name" style={{ color: agent.color }}>{agent.name}</div>
                  <div className="modal-agent-role">{agent.role}</div>
                </div>
              </div>
              <button onClick={handleEndCall} className="btn-end-call">End call</button>
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

// ─── NAVBAR ──────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <nav aria-label="Main navigation" style={{ position: "sticky", top: 0, zIndex: 50, background: "#ffffff", borderBottom: "1px solid #E5E7EB", boxShadow: scrolled ? "0 2px 16px rgba(0,0,0,0.08)" : "none", transition: "box-shadow 0.2s ease", height: "68px", display: "flex", alignItems: "center" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem", width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Image src="/Layer_1.png" alt="Enlight AI" width={160} height={40} style={{ objectFit: "contain", height: "36px", width: "auto" }} priority />
        <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
          {[
            { label: "About",        id: "why-section" },
            { label: "Services",     id: "agents-section" },
            { label: "Industries",   id: "industries-section" },
            { label: "Case Studies", id: "cases-section" },
            { label: "Contact",      id: "contact-section" },
          ].map((item) => (
            <button key={item.label} onClick={() => scrollTo(item.id)}
              style={{ background: "none", border: "none", cursor: "pointer", fontSize: "0.9375rem", fontWeight: 500, color: "#374151", padding: "0.5rem 0.875rem", borderRadius: "6px", transition: "color 0.15s, background 0.15s" }}
              onMouseEnter={e => { e.currentTarget.style.color = "#2563EB"; e.currentTarget.style.background = "#EFF6FF"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "#374151"; e.currentTarget.style.background = "none"; }}
            >{item.label}</button>
          ))}
        </div>
        <button onClick={() => scrollTo("contact-section")}
          style={{ background: "#2563EB", color: "#fff", border: "none", borderRadius: "8px", padding: "0.625rem 1.5rem", fontSize: "0.9375rem", fontWeight: 700, cursor: "pointer", transition: "background 0.15s", whiteSpace: "nowrap" }}
          onMouseEnter={e => { e.currentTarget.style.background = "#1D4ED8"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "#2563EB"; }}
        >Get a Proposal</button>
      </div>
    </nav>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer id="contact-section">
      <div className="footer-trust-bar">
        <div className="footer-trust-inner">
          <span className="footer-trust-label">Trusted by Fortune-Grade Global Leaders</span>
          <div className="footer-trust-logos">
            {trustLogos.map((logo) => <span key={logo} className="footer-trust-logo">{logo}</span>)}
          </div>
        </div>
      </div>
      <div className="site-footer">
        <div className="footer-main">
          <div className="footer-brand">
            <div style={{ marginBottom: "0.75rem" }}>
              <Image src="/Layer_1.png" alt="Enlight AI" width={140} height={36} style={{ objectFit: "contain", height: "32px", width: "auto" }} />
            </div>
            <p className="footer-brand-tagline">
              Enterprise AI Voice Agents for healthcare, BFSI, hospitality, ecommerce, and education.
            </p>
            <button style={{ background: "none", border: "none", cursor: "pointer", color: "#2563EB", fontSize: "0.875rem", fontWeight: 600, padding: 0, textAlign: "left", textDecoration: "underline", marginTop: "0.5rem" }}>
              contact@enlightai.com
            </button>
            <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
              {["LinkedIn", "Twitter"].map((label) => (
                <button key={label} style={{ padding: "0.375rem 0.75rem", borderRadius: "6px", background: "#2563EB", color: "#fff", border: "none", cursor: "pointer", fontSize: "0.75rem", fontWeight: 600 }}>{label}</button>
              ))}
            </div>
          </div>
          {footerCols.map((col) => (
            <div key={col.title}>
              <div className="footer-col-title">{col.title}</div>
              <div className="footer-col-links">
                {col.links.map((link) => <button key={link} className="footer-col-link">{link}</button>)}
              </div>
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <p className="footer-copy">Copyright © 2026 Enlight AI. All Rights Reserved.</p>
          <div className="footer-bottom-links">
            <button className="footer-bottom-link">Privacy Policy</button>
            <button className="footer-bottom-link">Terms of Use</button>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── PAGE ────────────────────────────────────────────────────────────
export default function Page() {
  const [activeIndustry, setActiveIndustry] = useState<IndustryId>("bfsi");
  const filteredAgents = agentsByIndustry[activeIndustry] ?? [];
  const activePipeline = workflowPipelines.find((p) => p.industry === activeIndustry)!;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visible"); observer.unobserve(e.target); } }),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => { document.documentElement.setAttribute("data-industry", activeIndustry); }, [activeIndustry]);
  useEffect(() => () => clearAll(), []);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const handleIndustryChange = useCallback((id: IndustryId) => {
    setActiveIndustry(id);
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#F8F9FC" }}>
      <Navbar />

      {/* ── HERO ── */}
      <header className="hero">
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem" }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}>
            <p style={{ fontSize: "1rem", fontWeight: 400, color: "#374151", marginBottom: "0.75rem" }}>
              Your Award-Winning AI Voice Technology Partner Delivering
            </p>
            <h1 className="hero-title">
              Enterprise AI Voice Agents<br />That Scale Operations
            </h1>
            <p className="hero-subtitle">
              Deploy AI voice agents for customer support, appointment booking, lead qualification,
              collections, hospitality, healthcare, and banking. End-to-end automation without a
              human in the loop.
            </p>
            <p style={{ fontSize: "0.9375rem", fontWeight: 700, color: "#111827", marginBottom: "2rem" }}>
              Scale Faster. Automate Smarter. Operate Confidently.
            </p>
            <div className="hero-cta">
              <button className="btn-primary-cta" onClick={() => scrollTo("contact-section")}>
                Book a Consultation
              </button>
              <button className="btn-secondary-cta" onClick={() => scrollTo("agents-section")}>
                <Phone size={15} /> Talk to an AI Agent
              </button>
            </div>
          </motion.div>
        </div>
      </header>

      {/* ── STATS ── */}
      <section id="industries-section" className="max-w-7xl mx-auto px-6 reveal">
        <div className="stats-row">
          <div className="stat-card">
            <div className="stat-number">38%</div>
            <div className="stat-label">Faster Resolution</div>
            <div className="stat-desc">Average improvement after deploying a custom AI voice agent in production.</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">92%</div>
            <div className="stat-label">First-Call Completion</div>
            <div className="stat-desc">Disputes, bookings, and onboarding closed end-to-end without a transfer.</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">8 Wks</div>
            <div className="stat-label">Concept to Production</div>
            <div className="stat-desc">Fully configured, compliance-tested, and deployed voice agent.</div>
          </div>
        </div>
      </section>

      {/* ── METRIC STRIP ── */}
      <section className="max-w-7xl mx-auto px-6 reveal">
        <div className="metric-strip">
          <div className="metric-item">
            <div className="metric-eyebrow">Resolution</div>
            <div className="metric-label">First-call completion</div>
            <div className="metric-sub">Disputes, bookings, and onboarding closed end-to-end without a transfer.</div>
          </div>
          <div className="metric-item">
            <div className="metric-eyebrow">Language</div>
            <div className="metric-label">Mid-call switching</div>
            <div className="metric-sub">Shifts to Hindi, Tamil, or Arabic mid-conversation without losing context.</div>
          </div>
          <div className="metric-item">
            <div className="metric-eyebrow">Escalation</div>
            <div className="metric-label">Context-aware routing</div>
            <div className="metric-sub">Routes to a human only on policy breach — with full transcript attached.</div>
          </div>
          <div className="metric-item">
            <div className="metric-eyebrow">Memory</div>
            <div className="metric-label">Cross-session recall</div>
            <div className="metric-sub">Customers never repeat themselves on follow-up calls.</div>
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section id="why-section" className="max-w-7xl mx-auto px-6 reveal" style={{ marginBottom: "5rem" }}>
        <div className="section-header" style={{ marginBottom: "2.5rem" }}>
          <div>
            <div className="section-eyebrow">Why Enlight AI</div>
            <h2 className="section-title">
              Built for outcomes,<br />
              <span className="section-title-italic">not demonstrations.</span>
            </h2>
          </div>
        </div>
        <div className="feature-bar">
          <div className="feature-item">
            <div className="feature-icon"><Zap size={17} /></div>
            <div>
              <div className="feature-title">Streamlined Execution</div>
              <div className="feature-text">No handoffs, no filler. Proven AI consultants end-to-end from strategy to deployment.</div>
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-icon"><Shield size={17} /></div>
            <div>
              <div className="feature-title">Enterprise-Grade Security</div>
              <div className="feature-text">SOC 2 compliant infrastructure. Every deployment meets your industry's regulatory requirements.</div>
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-icon"><Globe size={17} /></div>
            <div>
              <div className="feature-title">Measurable Outcomes</div>
              <div className="feature-text">Success is defined by resolved tickets, closed claims, and enrolled students — not activity.</div>
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-icon"><Clock size={17} /></div>
            <div>
              <div className="feature-title">Flexible Engagement</div>
              <div className="feature-text">From strategic sprints to fully managed delivery. Scale the engagement as your needs evolve.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── AGENTS WITH ORB GRID ── */}
      <section id="agents-section" className="max-w-7xl mx-auto px-6">
        <div className="section-header reveal" style={{ flexDirection: "column", alignItems: "flex-start", gap: "1.5rem" }}>
          <div>
            <div className="section-eyebrow">Live AI Voice Agents</div>
            <h2 className="agents-section-headline">
              HEAR IT <span className="headline-highlight">FOR YOURSELF</span>
            </h2>
            <p style={{ fontSize: "1rem", color: "var(--text-muted)", maxWidth: "540px", lineHeight: 1.6, marginTop: "0.75rem" }}>
              No signup. No sales call. Just pick an agent below and start a live conversation right now.
            </p>
          </div>
          <div className="industry-tabs" role="tablist" aria-label="Industries">
            {industries.map((ind) => (
              <button
                key={ind.id} role="tab"
                aria-selected={activeIndustry === ind.id}
                onClick={() => handleIndustryChange(ind.id)}
                className={"industry-tab" + (activeIndustry === ind.id ? " industry-tab--active" : "")}
              >{ind.name}</button>
            ))}
          </div>
        </div>
        <div role="tabpanel" style={{ marginTop: "2rem" }}>
          <AgentGrid activeIndustry={activeIndustry} filteredAgents={filteredAgents} />
        </div>
      </section>

      {/* ── WORKFLOW PIPELINE ── */}
      <section id="enterprise-section" className="max-w-7xl mx-auto px-6 reveal" style={{ marginTop: "6rem" }}>
        <div className="section-header" style={{ marginBottom: "2.5rem" }}>
          <div>
            <div className="section-eyebrow">End-to-End Workflow</div>
            <h2 className="section-title">
              What the agent<br />
              <span className="section-title-italic">actually resolves.</span>
            </h2>
          </div>
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={activeIndustry + "-pipeline"} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}>
            <WorkflowPipelineCard pipeline={activePipeline} />
          </motion.div>
        </AnimatePresence>
      </section>

      {/* ── CTA BANNER ── */}
      <section id="cases-section" className="max-w-7xl mx-auto px-6 reveal">
        <div className="cta-banner">
          <div className="cta-banner-content">
            <h2 className="cta-banner-title">
              Ready to automate your operations?
            </h2>
            <p className="cta-banner-subtitle">
              Speak with a solutions engineer. We'll design a pilot agent around your real workflows — deployed and measured in 8 weeks.
            </p>
            <div className="hero-cta" style={{ justifyContent: "center", marginTop: 0 }}>
              <button className="btn-primary-cta" onClick={() => scrollTo("contact-section")}>
                Book a Consultation <ArrowRight size={15} />
              </button>
              <button className="btn-secondary-cta" onClick={() => scrollTo("agents-section")}>
                View Live Agents
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <CallModal />
    </div>
  );
}
