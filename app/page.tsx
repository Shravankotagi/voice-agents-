"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, ChevronDown, Phone, Calendar, MessageSquare, Shield, Users, TrendingUp, Clock, Star, Heart, ShoppingCart, Building, Home, Building2, Zap, Users2 } from "lucide-react";
import { useCallStore } from "@/store/callStore";
import {LayoutTemplate, Settings2, Plug, Rocket } from "lucide-react";

const industries = [
  { id: "healthcare", name: "Healthcare", icon: Heart, color: "#a78bfa" },
  { id: "ecommerce", name: "Ecommerce", icon: ShoppingCart, color: "#fb923c" },
  { id: "bfsi", name: "BFSI", icon: Building, color: "#4f8ef7" },
  { id: "homeservices", name: "Home Services", icon: Home, color: "#10b981" },
  { id: "realestate", name: "Real Estate", icon: Building2, color: "#f59e0b" },
  { id: "hospitality", name: "Hospitality", icon: Users2, color: "#f472b6" },
];

const agents: Record<string, { name: string; role: string; description: string; capabilities: string[]; type: string; retellId: string }[]> = {
  healthcare: [
    { name: "EMILY", role: "Patient Services Agent", description: "Schedules appointments, recommends doctors, and handles patient inquiries.", capabilities: ["Appointment scheduling", "Doctor recommendations", "Hospital info", "Emergency routing"], type: "Inbound", retellId: "agent_ddf03bcc20dc6fdd83adbc290c" },
    { name: "NICOLE", role: "Clinical Screening Agent", description: "Performs symptom assessment and patient triage before consultation.", capabilities: ["Symptom collection", "Risk assessment", "Urgency classification", "Care recommendations"], type: "Inbound", retellId: "agent_670481e5581961108e2370f85c" },
  ],
  ecommerce: [
    { name: "SAM", role: "Customer Resolution Agent", description: "Handles delivery issues, refund escalations, and return requests.", capabilities: ["Delivery exceptions", "Refund processing", "Return authorization", "Order tracking"], type: "Inbound", retellId: "agent_cdf245f90ff14ff0e307e09dbf" },
    { name: "ANDREW", role: "Sales Conversion Agent", description: "Recovers abandoned carts via voice. Surfaces alternatives and closes checkout.", capabilities: ["Cart recovery", "Product matching", "Offer application", "Checkout assistance"], type: "Outbound", retellId: "agent_714ffb20c4149edaf5cb6fbe19" },
  ],
  bfsi: [
    { name: "BRANDON", role: "Banking Fraud Agent", description: "Handles fraud disputes, blocks cards, and initiates dispute resolution.", capabilities: ["Fraud detection", "Card blocking", "Dispute filing", "Credit issuance"], type: "Inbound", retellId: "agent_dfe1866c6e0c9ac883546b48ca" },
    { name: "VICTOR", role: "Insurance Claims Agent", description: "Files FNOL, verifies coverage, and assigns surveyors for claims processing.", capabilities: ["FNOL filing", "Coverage verification", "Surveyor assignment", "Claim tracking"], type: "Inbound", retellId: "agent_8729165b472337b00fa205b921" },
  ],
  homeservices: [
    { name: "MIKE", role: "Plumbing Intake Agent", description: "Handles incoming plumbing requests, identifies emergencies, and schedules visits.", capabilities: ["Emergency detection", "Service scheduling", "Customer intake", "Urgent routing"], type: "Inbound", retellId: "agent_15407575cc1758938e5875dfff" },
    { name: "SARAH", role: "HVAC Scheduling Agent", description: "Manages HVAC appointments, maintenance scheduling, and urgent service prioritization.", capabilities: ["AC/heating inquiries", "Repair booking", "Maintenance scheduling", "Priority handling"], type: "Inbound", retellId: "agent_5260b5be1db138f848f2b94bb8" },
    { name: "DAVID", role: "Electrician Quote Agent", description: "Qualifies electrical requests and schedules on-site estimates.", capabilities: ["Project capture", "Site inspection scheduling", "Quote requests", "Job qualification"], type: "Inbound", retellId: "agent_bcee2ed253599ef57b565912c9" },
  ],
  realestate: [
    { name: "RYAN", role: "Real Estate Agent", description: "Qualifies buyers, sellers, and investors and schedules property consultations.", capabilities: ["Buyer requirements", "Seller info collection", "Investment qualification", "Tour booking"], type: "Inbound", retellId: "agent_606ddbea4bbf4fbec7fa9025e5" },
  ],
  hospitality: [
    { name: "DANIEL", role: "Concierge Agent", description: "Arranges dining, spa, transportation, and special occasion bookings.", capabilities: ["Dining reservations", "Spa scheduling", "Transportation", "Local recommendations"], type: "Inbound", retellId: "agent_445484ee39011669181e6e57fb" },
    { name: "LAUREN", role: "Reservations Agent", description: "Manages hotel reservations, booking modifications, and stay requests.", capabilities: ["Booking creation", "Modifications", "Room upgrades", "Group bookings"], type: "Inbound", retellId: "agent_391c1b87a83ef3b1e46560429e" },
  ],
};

const integrations = [
  { name: "HubSpot", desc: "CRM integration for lead management" },
  { name: "Salesforce", desc: "Enterprise CRM synchronization" },
  { name: "Zapier", desc: "Connect to 5000+ apps" },
  { name: "Jobber", desc: "Field service scheduling" },
  { name: "ServiceTitan", desc: "Enterprise dispatch integration" },
  { name: "Housecall Pro", desc: "Home services software" },
];

const faqs = [
  { q: "What exactly does the AI agent do?", a: "Our AI acts as a virtual team member that answers calls, handles inquiries, books appointments, and processes requests 24/7 without human involvement." },
  { q: "How does it work with my existing phone system?", a: "It works with your existing business number. We route your calls through our AI, which handles the conversation and transfers or books as needed." },
  { q: "What if the AI cannot answer a question?", a: "The AI knows when to escalate. If it cannot handle a request, it takes a message and notifies your team immediately via SMS and app notification." },
  { q: "How long does setup take?", a: "Most businesses are up and running within 3 to 5 business days. We train the AI on your services, pricing, and business logic." },
  { q: "Is there a free trial?", a: "Yes, we offer a 14-day pilot where you can test the AI with your actual callers. No credit card required." },
];

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/enlightlab",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
  label: "Facebook",
  href: "https://www.facebook.com/enlightlabfb/",
  icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  ),
},  
];

const footerLinks = [
  { title: "Services", links: [
    { label: "Inbound Agents", href: "/services/inbound-agents" },
    { label: "Outbound Agents", href: "/services/outbound-agents" },
    { label: "Appointment Booking", href: "/services/appointment-booking" },
    { label: "Lead Qualification", href: "/services/lead-qualification" },
    { label: "CRM Integration", href: "/services/crm-integration" },
  ]},
  { title: "Industries", links: [
    { label: "Healthcare", href: "/industries/healthcare" },
    { label: "Ecommerce", href: "/industries/ecommerce" },
    { label: "BFSI", href: "/industries/bfsi" },
    { label: "Home Services", href: "/industries/home-services" },
    { label: "Real Estate", href: "/industries/real-estate" },
    { label: "Hospitality", href: "/industries/hospitality" },
  ]},
  { title: "Company", links: [
    { label: "About Us", href: "https://enlightlab.com/about" },
    { label: "Case Studies", href: "https://enlightlab.com/case-study/" },
    { label: "Contact", href: "https://enlightlab.com/contact" },
    { label: "Blog", href: "https://enlightlab.com/blog" },
  ]},
];

async function startCall(agentId: string, agentName: string, agentRole: string = "Demo Agent") {
  try {
    const { startLiveCall } = useCallStore.getState();
    const agent = {
      id: agentName.toLowerCase().replace(" ", "-"),
      name: agentName,
      role: agentRole,
      retellAgentId: agentId,
    };
    await startLiveCall(agent as any);
  } catch (e) {
    console.error("Failed to start call:", e);
  }
}

export default function HomePage() {
  const [activeIndustry, setActiveIndustry] = useState("healthcare");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activePlan, setActivePlan] = useState("Growth");
  const currentAgents = agents[activeIndustry] || [];

  return (
    <div style={{ minHeight: "100vh", background: "#FFFFFF", fontFamily: "Inter, system-ui, sans-serif" }}>
      {/* Navbar */}
      <nav className="navbar">
        <div className="container">
          <div className="nav-brand">
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Link href="/" style={{ display: "flex", flexDirection: "column", alignItems: "center", textDecoration: "none" }}>
                <Image src="/enlight-lab-logo.png" alt="Enlight Lab" width={200} height={42} style={{ objectFit: "contain" }} />
                <span style={{ fontSize: "0.625rem", fontWeight: 700, color: "#0A1F6B", letterSpacing: "0.15em", textTransform: "uppercase", marginTop: "-4px" }}>AI VOICE AGENTS</span>
              </Link>
            </div>
          </div>
          <div className="nav-links">
            <button className="nav-link" onClick={() => document.getElementById('solutions')?.scrollIntoView({ behavior: 'smooth' })}>Solutions</button>
            <button className="nav-link" onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}>Features</button>
            <button className="nav-link" onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}>How It Works</button>
            <button className="nav-link" onClick={() => document.getElementById('industries')?.scrollIntoView({ behavior: 'smooth' })}>Industries</button>
            <button className="nav-link" onClick={() => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' })}>FAQ</button>
          </div>
          <a href="https://cal.com/dhananjay-goel/30min"  rel="noopener noreferrer" className="btn btn-primary" style={{ padding: "0.5rem 1.25rem", fontSize: "0.875rem" }}>
            Book Demo
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ padding: "5rem 0 4rem", background: "#fff" }}>
        <div className="container" style={{ maxWidth: "1280px" }}>
          <div className="hero-grid">
            
            {/* Left: Text */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "#F3F4F6", padding: "0.5rem 1rem", borderRadius: "9999px", fontSize: "0.875rem", fontWeight: 500, color: "#6B7280", marginBottom: "1.5rem" }}>
                <Star size={14} style={{ fill: "#F59E0B", color: "#F59E0B" }} />
                Trusted by 500+ enterprises worldwide
              </div>
              <h1 style={{ fontSize: "clamp(2.25rem, 4vw, 3.25rem)", fontWeight: 700, letterSpacing: "-0.025em", lineHeight: 1.1, marginBottom: "1.5rem", color: "#111827" }}>
                AI Voice Agents for<br />
                <span style={{ color: "#4F46E5" }}>Every Industry</span>
              </h1>
              <p style={{ fontSize: "1.25rem", color: "#6B7280", lineHeight: 1.6, marginBottom: "2rem" }}>
                Industry-Specific AI Voice Agents That Actually Get Work Done
                From customer support to bookings, sales, and follow ups fully automated, 24/7.
              </p>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <a href="https://cal.com/dhananjay-goel/30min"  rel="noopener noreferrer" className="btn btn-primary">Book a Demo <ArrowRight size={16} /></a>
                <button className="btn btn-outline" onClick={() => document.getElementById('industries')?.scrollIntoView({ behavior: 'smooth' })}>See Agent Demos</button>
              </div>
              <p style={{ marginTop: "1.5rem", fontSize: "0.875rem", color: "#6B7280" }}>
                ✓ No credit card required   ✓ Setup in 3 days    ✓ Cancel anytime
              </p>
            </motion.div>

            {/* Right: Agent Cards Grid */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
              <p style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#9CA3AF", marginBottom: "1rem", textAlign: "center" }}>
                ↓ LIVE AGENTS — TAP TO CALL NOW
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
                {[
                  { name: "EMILY", role: "Patient Services Agent", color: "#a78bfa", retellId: "agent_ddf03bcc20dc6fdd83adbc290c", industry: "Healthcare" },
                  { name: "BRANDON", role: "Banking Fraud Agent", color: "#4f8ef7", retellId: "agent_dfe1866c6e0c9ac883546b48ca", industry: "BFSI" },
                  { name: "LAUREN", role: "Reservations Agent", color: "#f472b6", retellId: "agent_391c1b87a83ef3b1e46560429e", industry: "Hospitality" },
                  { name: "SAM", role: "Customer Resolution Agent", color: "#fb923c", retellId: "agent_cdf245f90ff14ff0e307e09dbf", industry: "Ecommerce" },
                ].map((agent) => (
                  <div
                    key={agent.name}
                    onClick={() => startCall(agent.retellId, agent.name, agent.role)}
                    style={{
                      background: "#fff",
                      border: "1.5px solid #F3F4F6",
                      borderRadius: "20px",
                      padding: "1.75rem 1.25rem",
                      cursor: "pointer",
                      transition: "all 0.25s",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                      gap: "0.875rem",
                      boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLDivElement;
                      el.style.boxShadow = `0 8px 32px ${agent.color}40`;
                      el.style.borderColor = `${agent.color}60`;
                      el.style.transform = "translateY(-4px)";
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLDivElement;
                      el.style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)";
                      el.style.borderColor = "#F3F4F6";
                      el.style.transform = "translateY(0)";
                    }}
                  >
                    {/* Avatar circle with glow */}
                    <div style={{ position: "relative" }}>
                      <div style={{
                        position: "absolute",
                        inset: "-6px",
                        borderRadius: "50%",
                        background: `radial-gradient(circle, ${agent.color}30 0%, transparent 70%)`,
                      }} />
                      <div style={{
                        width: "90px",
                        height: "90px",
                        borderRadius: "50%",
                        background: `radial-gradient(circle at 35% 30%, ${agent.color}ee, ${agent.color})`,
                        boxShadow: `0 8px 24px ${agent.color}66, inset 0 -4px 8px rgba(0,0,0,0.15), inset 0 4px 8px rgba(255,255,255,0.3)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                      }}>
                        <Phone size={28} color="#fff" strokeWidth={1.75} />
                      </div>
                    </div>

                    {/* Info */}
                    <div>
                      <p style={{ fontSize: "0.6875rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#9CA3AF", marginBottom: "0.3rem" }}>{agent.industry}</p>
                      <p style={{ fontSize: "1.0625rem", fontWeight: 800, color: "#111827", marginBottom: "0.2rem", letterSpacing: "-0.01em" }}>{agent.name}</p>
                      <p style={{ fontSize: "0.75rem", color: "#6B7280", lineHeight: 1.4 }}>{agent.role}</p>
                    </div>

                    {/* Tap to call badge */}
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.375rem",
                      background: "#F0FDF4",
                      border: "1px solid #BBF7D0",
                      padding: "0.35rem 0.875rem",
                      borderRadius: "9999px",
                    }}>
                      <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#10B981" }} />
                      <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#10B981", letterSpacing: "0.02em" }}>Tap to call</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding: "3rem 0", background: "#F9FAFB", borderTop: "1px solid #E5E7EB", borderBottom: "1px solid #E5E7EB" }}>
        <div className="container">
          <div className="stats-grid">
            {[{ v: "2M+", l: "Calls Handled" }, { v: "500+", l: "Businesses" }, { v: "40%", l: "Cost Reduction" }, { v: "99.9%", l: "Uptime" }].map((s) => (
              <div key={s.l} className="stat-item">
                <div className="stat-value">{s.v}</div>
                <div className="stat-label">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Tabs */}
      <section id="industries" className="section">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <p style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#4F46E5", marginBottom: "0.5rem" }}>Industries</p>
            <h2 className="section-title">AI agents built for your industry</h2>
          </div>
          <div className="industry-tabs">
            {industries.map((ind) => (
              <button
                key={ind.id}
                onClick={() => setActiveIndustry(ind.id)}
                className={`industry-tab ${activeIndustry === ind.id ? "active" : ""}`}
                style={{ "--tab-color": ind.color } as React.CSSProperties}
              >
                <ind.icon size={18} />
                {ind.name}
              </button>
            ))}
          </div>

          {/* Agent Demo Cards */}
          <div className="agent-grid">
            <AnimatePresence mode="wait">
            <motion.div
              key={activeIndustry}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ marginTop: "2rem" }}
            >
              {(() => {
                const industryInfo: Record<string, {
                  headline: string;
                  desc: string;
                  features: string[];
                  stat: string;
                  statLabel: string;
                  color: string;
                }> = {
                  healthcare: {
                    headline: "AI that speaks patient ? not tech.",
                    desc: "From appointment scheduling to clinical screening, our HIPAA-compliant agents handle the full patient communication lifecycle so your staff can focus on care.",
                    features: ["Schedule & confirm appointments 24/7", "Pre-visit symptom triage & intake", "Insurance verification before visits", "Post-visit follow-up calls", "Emergency routing to on-call staff", "HIPAA compliant by design"],
                    stat: "92%", statLabel: "of appointment calls automated", color: "#a78bfa",
                  },
                  ecommerce: {
                    headline: "Turn missed calls into completed orders.",
                    desc: "AI agents recover abandoned carts, resolve support tickets, and drive repeat purchases ? all without adding headcount to your support team.",
                    features: ["Abandoned cart recovery via voice", "Order tracking & delivery updates", "Return & refund authorization", "Upsell during support calls", "Post-purchase review collection", "CRM sync after every interaction"],
                    stat: "23%", statLabel: "cart recovery rate on average", color: "#fb923c",
                  },
                  bfsi: {
                    headline: "Compliance-ready. Enterprise-grade.",
                    desc: "Built for the strict compliance demands of banking and insurance. Our agents handle fraud resolution, FNOL filing, and account management with full audit trails.",
                    features: ["Fraud dispute detection & resolution", "Card blocking & re-issuance", "FNOL filing in under 4 minutes", "Loan inquiry qualification", "Account balance & transaction queries", "RBI, SEBI & IRDAI compliance ready"],
                    stat: "4 min", statLabel: "average FNOL filing time", color: "#4f8ef7",
                  },
                  homeservices: {
                    headline: "Never miss a job while you're on one.",
                    desc: "While your team is on-site, our AI agents answer every inbound call, qualify the job, and book the appointment ? integrated with ServiceTitan and Jobber.",
                    features: ["Answer every call 24/7", "Emergency detection & routing", "Job scheduling & dispatch", "Arrival time updates to customers", "Post-service review requests", "ServiceTitan & Jobber integration"],
                    stat: "15+", statLabel: "jobs booked per week on autopilot", color: "#10b981",
                  },
                  realestate: {
                    headline: "Qualify leads before your agents pick up.",
                    desc: "AI agents pre-qualify every buyer, seller, and investor lead ? collecting requirements, budget, and timeline ? so your agents only spend time on sales-ready prospects.",
                    features: ["Buyer & seller intake qualification", "Investment criteria collection", "Property tour scheduling", "Long-term lead nurturing follow-ups", "CRM auto-logging after every call", "New listing match notifications"],
                    stat: "3x", statLabel: "more qualified leads for your team", color: "#f59e0b",
                  },
                  hospitality: {
                    headline: "5-star service at every touchpoint.",
                    desc: "From room reservations to concierge requests, our multilingual agents deliver exceptional guest experiences around the clock ? without adding front desk staff.",
                    features: ["Room booking & modifications", "Dining & spa reservations", "Transportation arrangements", "In-stay service requests", "Multilingual guest support", "Upsell room upgrades automatically"],
                    stat: "3.2x", statLabel: "more bookings via proactive outreach", color: "#f472b6",
                  },
                };
                const info = industryInfo[activeIndustry];
                if (!info) return null;
                return (
                  <div className="industry-info-panel" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "center", background: "#F9FAFB", borderRadius: "20px", padding: "2.5rem", border: "1px solid #E5E7EB" }}>
                    {/* Left */}
                    <div>
                      <h3 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800, color: "#111827", letterSpacing: "-0.025em", lineHeight: 1.2, marginBottom: "1rem" }}>{info.headline}</h3>
                      <p style={{ fontSize: "1rem", color: "#6B7280", lineHeight: 1.7, marginBottom: "1.75rem" }}>{info.desc}</p>
                      <div style={{ background: "#fff", border: `1.5px solid ${info.color}40`, borderRadius: "12px", padding: "1.25rem 1.5rem", display: "inline-flex", alignItems: "center", gap: "1rem", marginBottom: "1.75rem" }}>
                        <span style={{ fontSize: "2.25rem", fontWeight: 800, color: info.color, letterSpacing: "-0.03em" }}>{info.stat}</span>
                        <span style={{ fontSize: "0.875rem", color: "#6B7280", lineHeight: 1.4, maxWidth: "140px" }}>{info.statLabel}</span>
                      </div>
                      <br />
                      <a href="https://cal.com/dhananjay-goel/30min"  rel="noopener noreferrer"
                        style={{ background: info.color, color: "#fff", padding: "0.875rem 1.75rem", borderRadius: "10px", textDecoration: "none", fontWeight: 700, fontSize: "0.9375rem", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                        Book a Demo <ArrowRight size={15} />
                      </a>
                    </div>
                    {/* Right: features */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                      {info.features.map((feat) => (
                        <div key={feat} style={{ display: "flex", alignItems: "center", gap: "0.625rem", background: "#fff", border: "1px solid #E5E7EB", borderRadius: "10px", padding: "0.875rem 1rem" }}>
                          <Check size={15} color={info.color} strokeWidth={2.5} style={{ flexShrink: 0, marginTop: "2px" }} />
                          <span style={{ fontSize: "0.8125rem", fontWeight: 500, color: "#374151", lineHeight: 1.4 }}>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Hear it for yourself */}
      <section id="solutions" className="section section-alt">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <p style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#4F46E5", marginBottom: "0.5rem" }}>Live Demos</p>
            <h2 className="section-title">
              HEAR IT{" "}
              <span style={{ background: "#4F46E5", color: "#fff", padding: "0.1em 0.4em", borderRadius: "6px" }}>FOR YOURSELF.</span>
            </h2>
            <p style={{ color: "#6B7280", fontSize: "1rem", marginTop: "0.75rem" }}>Tap any agent to start a live AI call right now.</p>
          </div>
          <div className="agents-showcase-grid">
            {[
              { name: "EMILY", role: "Patient Services Agent", industry: "Healthcare", color: "#a78bfa", retellId: "agent_ddf03bcc20dc6fdd83adbc290c" },
              { name: "BRANDON", role: "Banking Fraud Agent", industry: "BFSI", color: "#4f8ef7", retellId: "agent_dfe1866c6e0c9ac883546b48ca" },
              { name: "LAUREN", role: "Reservations Agent", industry: "Hospitality", color: "#f472b6", retellId: "agent_391c1b87a83ef3b1e46560429e" },
              { name: "SAM", role: "Customer Resolution Agent", industry: "Ecommerce", color: "#fb923c", retellId: "agent_cdf245f90ff14ff0e307e09dbf" },
              { name: "NICOLE", role: "Clinical Screening Agent", industry: "Healthcare", color: "#818cf8", retellId: "agent_670481e5581961108e2370f85c" },
              { name: "VICTOR", role: "Insurance Claims Agent", industry: "BFSI", color: "#3b82f6", retellId: "agent_8729165b472337b00fa205b921" },
              { name: "ANDREW", role: "Sales Conversion Agent", industry: "Ecommerce", color: "#f97316", retellId: "agent_714ffb20c4149edaf5cb6fbe19" },
              { name: "DANIEL", role: "Concierge Agent", industry: "Hospitality", color: "#ec4899", retellId: "agent_445484ee39011669181e6e57fb" },
              { name: "RYAN", role: "Real Estate Agent", industry: "Real Estate", color: "#f59e0b", retellId: "agent_606ddbea4bbf4fbec7fa9025e5" },
              { name: "MIKE", role: "Plumbing Intake Agent", industry: "Home Services", color: "#06b6d4", retellId: "agent_15407575cc1758938e5875dfff" },
              { name: "SARAH", role: "HVAC Scheduling Agent", industry: "Home Services", color: "#8b5cf6", retellId: "agent_5260b5be1db138f848f2b94bb8" },
              { name: "DAVID", role: "Electrician Quote Agent", industry: "Home Services", color: "#f43f5e", retellId: "agent_bcee2ed253599ef57b565912c9" },
            ].map((agent, i) => (
              <motion.div
                key={agent.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                onClick={() => startCall(agent.retellId, agent.name, agent.role)}
                style={{
                  background: "#fff",
                  border: "1.5px solid #F3F4F6",
                  borderRadius: "20px",
                  padding: "1.75rem 1.25rem",
                  cursor: "pointer",
                  transition: "all 0.25s",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  gap: "0.875rem",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                }}


















                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.boxShadow = `0 8px 32px ${agent.color}40`;
                  el.style.borderColor = `${agent.color}60`;
                  el.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)";
                  el.style.borderColor = "#F3F4F6";
                  el.style.transform = "translateY(0)";
                }}
              >
                <div style={{ width: "72px", height: "72px", borderRadius: "50%", background: `radial-gradient(circle at 35% 30%, ${agent.color}ee, ${agent.color})`, boxShadow: `0 4px 16px ${agent.color}66`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Phone size={24} color="#fff" strokeWidth={1.75} />
                </div>
                <div>
                  <p style={{ fontSize: "0.6875rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#9CA3AF", marginBottom: "0.3rem" }}>{agent.industry}</p>
                  <p style={{ fontSize: "1rem", fontWeight: 800, color: "#111827", marginBottom: "0.2rem" }}>{agent.name}</p>
                  <p style={{ fontSize: "0.75rem", color: "#6B7280" }}>{agent.role}</p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.375rem", background: "#F0FDF4", border: "1px solid #BBF7D0", padding: "0.35rem 0.875rem", borderRadius: "9999px" }}>
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#10B981" }} />
                  <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#10B981" }}>Tap to call</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}

      {/* Features */}
      <section id="features" className="section" style={{ background: "#EFF6FF" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <p style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#4F46E5", marginBottom: "0.5rem" }}>Features</p>
            <h2 className="section-title">
              Answer every call.{" "}
              <span style={{ background: "#4F46E5", color: "#fff", padding: "0.1em 0.4em", borderRadius: "6px" }}>Book every job.</span>
            </h2>
            <p style={{ color: "#6B7280", fontSize: "1rem", marginTop: "0.75rem" }}>
              Voice by Enlight Lab handles the phone so you can stay on the job.
            </p>
          </div>
          <div className="features-section-grid">
            {[
              { color: "#EF4444", icon: Phone, title: "Zero Calls to Voicemail", desc: "While you're on the job, we're on the phone. Every caller gets a real answer ? not a recording, not a competitor." },
              { color: "#3B82F6", icon: Calendar, title: "Your Calendar, Always Full", desc: "New jobs get scheduled in the first call. No callbacks, no back-and-forth, no admin time." },
              { color: "#10B981", icon: Users, title: "Only Qualified Leads Reach You", desc: "Callers get pre-screened on the spot. Your time goes to prospects worth the drive." },
              { color: "#F97316", icon: Zap, title: "Quick Answers, Faster Bookings", desc: "Pricing, availability, and service questions handled in the first call ? before it ever reaches your team." },
              { color: "#8B5CF6", icon: Clock, title: "Revenue While You Sleep", desc: "That 11pm emergency call? Answered, qualified, and scheduled before morning." },
              { color: "#EF4444", icon: Shield, title: "Urgent Calls, Handled Fast", desc: "Emergencies get flagged and routed to the right person immediately. No delays, no dropped balls." },
              { color: "#3B82F6", icon: TrendingUp, title: "Plugs Into Your Workflow", desc: "Connects to 1,000+ tools ? your CRM, calendar, and field service platform ? out of the box." },
              { color: "#F59E0B", icon: MessageSquare, title: "Sounds Like Your Team", desc: "Natural conversations, not robotic menus. Callers feel heard ? and they book." },
            ].map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                style={{
                  background: "#fff",
                  border: "1.5px solid #E5E7EB",
                  borderRadius: "16px",
                  padding: "1.75rem",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                  transition: "box-shadow 0.2s, transform 0.2s",
                }}
                whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(0,0,0,0.1)" }}
              >
                <div style={{
                  width: "48px", height: "48px", borderRadius: "10px",
                  background: f.color, display: "flex", alignItems: "center",
                  justifyContent: "center", marginBottom: "1.25rem",
                }}>
                  <f.icon size={22} color="#fff" strokeWidth={2} />
                </div>
                <h3 style={{ fontSize: "0.875rem", fontWeight: 700, color: "#111827", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.75rem" }}>{f.title}</h3>
                <p style={{ fontSize: "0.875rem", color: "#6B7280", lineHeight: 1.65 }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* How It Works */}
      <section id="how-it-works" className="section section-alt">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <p style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#4F46E5", marginBottom: "0.5rem" }}>How It Works</p>
            <h2 className="section-title">From ring to resolution in one call</h2>
          </div>
          <div className="steps-list">
            {[
              { n: "01", title: "Answer", desc: "AI picks up every call 24/7, even when you are off the clock." },
              { n: "02", title: "Qualify", desc: "Collects details, checks availability, and understands intent." },
              { n: "03", title: "Resolve", desc: "Books appointments, processes requests, and follows up automatically." },
            ].map((step) => (
              <div key={step.n} className="step-item">
                <div className="step-number">{step.n}</div>
                <div className="step-content">
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Up and Running */}
      <section className="section" style={{ background: "#fff" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <p style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#4F46E5", marginBottom: "0.5rem" }}>Setup</p>
            <h2 className="section-title">
              Up and running in{" "}
              <span style={{ background: "#4F46E5", color: "#fff", padding: "0.1em 0.4em", borderRadius: "6px" }}>minutes</span>
            </h2>
            <p style={{ color: "#6B7280", fontSize: "1rem", marginTop: "0.75rem" }}>No complex setup. No coding required. Just results.</p>
          </div>
          <div className="setup-grid">
            {[
              { n: "01", icon: LayoutTemplate, title: "Pick a Template", desc: "Choose from industry-specific agent templates built for your business type." },
              { n: "02", icon: Settings2, title: "Customize", desc: "Add your business info, services, pricing, and brand personality." },
              { n: "03", icon: Plug, title: "Connect Tools", desc: "Link your calendar, CRM, phone number, and booking system." },
              { n: "04", icon: Rocket, title: "Go Live", desc: "Launch your agent and start answering calls, booking jobs, and capturing leads." },
            ].map((step, i) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                style={{ background: "#F9FAFB", border: "1px solid #E5E7EB", borderRadius: "16px", padding: "1.75rem", position: "relative", textAlign: "center" }}
              >
                {/* Step number badge */}
                <div style={{ position: "absolute", top: "-12px", left: "50%", transform: "translateX(-50%)", background: "#4F46E5", color: "#fff", borderRadius: "9999px", width: "28px", height: "28px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", fontWeight: 700 }}>
                  {step.n}
                </div>
                {/* Icon */}
                <div style={{ width: "52px", height: "52px", borderRadius: "12px", background: "rgba(79,70,229,0.08)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0.5rem auto 1rem" }}>
                  <step.icon size={26} color="#4F46E5" strokeWidth={1.5} />
                </div>
                {/* Title */}
                <h3 style={{ fontSize: "0.9375rem", fontWeight: 700, color: "#111827", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.75rem" }}>{step.title}</h3>
                {/* Desc */}
                <p style={{ fontSize: "0.875rem", color: "#6B7280", lineHeight: 1.6 }}>{step.desc}</p>
                {/* Connector arrow (not on last) */}
                {i < 3 && (
                  <div style={{ position: "absolute", right: "-19px", top: "50%", transform: "translateY(-50%)", color: "#a59a9a", fontSize: "1.5rem", zIndex: 10 }}> → </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section id="industries" className="section">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <p style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#4F46E5", marginBottom: "0.5rem" }}>Integrations</p>
            <h2 className="section-title">Works with your existing tools</h2>
          </div>
          <div className="integrations-grid">
            {integrations.map((int) => (
              <div key={int.name} className="integration-card">
                <div className="integration-logo">{int.name.charAt(0)}</div>
                <h3 className="integration-name">{int.name}</h3>
                <p className="integration-desc">{int.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      


      {/* Testimonials */}
      <section className="section">
        <div className="container">
          <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>What our customers say</h2>
          <div className="testimonials-grid">
            {[
              { name: "John D.", biz: "HVAC Business Owner", quote: "Our AI agent books 15+ jobs a week without us lifting a finger." },
              { name: "Priya M.", biz: "Healthcare Clinic", quote: "EMILY handles 80% of our appointment calls. Patients love it." },
              { name: "Mike R.", biz: "Plumbing Co.", quote: "We never miss a lead now. ROI paid for itself in week one." },
            ].map(t => (
              <div key={t.name} style={{ background: "#F9FAFB", borderRadius: "16px", padding: "1.5rem", border: "1px solid #E5E7EB" }}>
                <div style={{ display: "flex", gap: "0.25rem", marginBottom: "0.75rem" }}>
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} style={{ fill: "#F59E0B", color: "#F59E0B" }} />)}
                </div>
                <p style={{ color: "#374151", marginBottom: "1rem", fontStyle: "italic" }}>"{t.quote}"</p>
                <p style={{ fontWeight: 600, fontSize: "0.875rem" }}>{t.name}</p>
                <p style={{ color: "#6B7280", fontSize: "0.75rem" }}>{t.biz}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* FAQ */}
      <section id="faq" className="section">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <p style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#4F46E5", marginBottom: "0.5rem" }}>FAQ</p>
            <h2 className="section-title">Common questions answered</h2>
          </div>
          <div className="faq-list">
            {faqs.map((f, i) => (
              <div key={i} className="faq-item">
                <button className="faq-question" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span>{f.q}</span>
                  <ChevronDown size={20} className={`faq-chevron ${openFaq === i ? "open" : ""}`} />
                </button>
                {openFaq === i && <div className="faq-answer"><p>{f.a}</p></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "6rem 0", background: "#4F46E5", textAlign: "center" }}>
        <div className="container">
          <h2 style={{ fontSize: "clamp(1.875rem, 4vw, 2.5rem)", fontWeight: 700, color: "#fff", marginBottom: "1rem", letterSpacing: "-0.025em" }}>
            Ready to automate your calls?
          </h2>
          <p style={{ fontSize: "1.125rem", color: "rgba(255,255,255,0.8)", marginBottom: "2rem" }}>
            Book a free demo and see how AI voice agents can transform your business.
          </p>
          <a href="https://cal.com/dhananjay-goel/30min"  rel="noopener noreferrer" className="btn" style={{ background: "#fff", color: "#4F46E5", padding: "1rem 2rem", fontSize: "1rem" }}>
            Book a Free Demo <ArrowRight size={16} />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <Image src="/enlight-lab-logo.png" alt="Enlight Lab" width={180} height={42} style={{ filter: "brightness(0) invert(1)", objectFit: "contain" }} />
              <p className="footer-tagline">AI voice agents for every business.</p>
            </div>
            {footerLinks.map((col) => (
              <div key={col.title}>
                <div className="footer-col-title">{col.title}</div>
                <div className="footer-col-links">
                  {col.links.map((l) => (
                    <a key={l.label} href={l.href} target="" rel="noopener noreferrer" className="footer-col-link">{l.label}</a>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="footer-bottom">
            <p className="footer-copy">Copyright 2026 Voice by Enlight Lab</p>
            <div style={{ display: "flex", gap: "1.5rem" }}>
              <a href="https://enlightlab.com/privacy-policy/" target="" rel="noopener noreferrer" className="footer-col-link">Privacy Policy</a>
              <a href="https://enlightlab.com/website-service-usage-terms-conditions/" target="" rel="noopener noreferrer" className="footer-col-link">Terms of Use</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 
