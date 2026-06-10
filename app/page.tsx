"use client";

import { useState } from "react";
import Image from "next/image";
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
    { name: "SARA", role: "Patient Services Agent", description: "Schedules appointments, recommends doctors, and handles patient inquiries.", capabilities: ["Appointment scheduling", "Doctor recommendations", "Hospital info", "Emergency routing"], type: "Inbound", retellId: "agent_b7aeab2c389d64e0ae9ec3d999" },
    { name: "RIYA", role: "Clinical Screening Agent", description: "Performs symptom assessment and patient triage before consultation.", capabilities: ["Symptom collection", "Risk assessment", "Urgency classification", "Care recommendations"], type: "Inbound", retellId: "agent_cce30852caccbdd3021ef4aa01" },
  ],
  ecommerce: [
    { name: "SAM", role: "Customer Resolution Agent", description: "Handles delivery issues, refund escalations, and return requests.", capabilities: ["Delivery exceptions", "Refund processing", "Return authorization", "Order tracking"], type: "Inbound", retellId: "agent_111243055fdd3bec81dacfafbd" },
    { name: "MAX", role: "Sales Conversion Agent", description: "Recovers abandoned carts via voice. Surfaces alternatives and closes checkout.", capabilities: ["Cart recovery", "Product matching", "Offer application", "Checkout assistance"], type: "Outbound", retellId: "agent_c4e856cd16c890eaa1d738e11d" },
  ],
  bfsi: [
    { name: "BHASKAR", role: "Banking Fraud Agent", description: "Handles fraud disputes, blocks cards, and initiates dispute resolution.", capabilities: ["Fraud detection", "Card blocking", "Dispute filing", "Credit issuance"], type: "Inbound", retellId: "agent_71e0327cf0a27f63144aa74f09" },
    { name: "ARYAN", role: "Insurance Claims Agent", description: "Files FNOL, verifies coverage, and assigns surveyors for claims processing.", capabilities: ["FNOL filing", "Coverage verification", "Surveyor assignment", "Claim tracking"], type: "Inbound", retellId: "agent_a8945a4965d741e547517361b0" },
  ],
  homeservices: [
    { name: "Mike Thompson", role: "Plumbing Intake Agent", description: "Handles incoming plumbing requests, identifies emergencies, and schedules visits.", capabilities: ["Emergency detection", "Service scheduling", "Customer intake", "Urgent routing"], type: "Inbound", retellId: "agent_7a2e179e5304e28672360a15ee" },
    { name: "Sarah Johnson", role: "HVAC Scheduling Agent", description: "Manages HVAC appointments, maintenance scheduling, and urgent service prioritization.", capabilities: ["AC/heating inquiries", "Repair booking", "Maintenance scheduling", "Priority handling"], type: "Inbound", retellId: "agent_015cf5b6284d3bb41708fcc29e" },
    { name: "David Miller", role: "Electrician Quote Agent", description: "Qualifies electrical requests and schedules on-site estimates.", capabilities: ["Project capture", "Site inspection scheduling", "Quote requests", "Job qualification"], type: "Inbound", retellId: "agent_8821bb64745c21c48f2526b2b5" },
  ],
  realestate: [
    { name: "Ryan Mitchell", role: "Real Estate Agent", description: "Qualifies buyers, sellers, and investors and schedules property consultations.", capabilities: ["Buyer requirements", "Seller info collection", "Investment qualification", "Tour booking"], type: "Inbound", retellId: "agent_b58c6c076b3e6a2a84d4f96afa" },
  ],
  hospitality: [
    { name: "LUCKY", role: "Concierge Agent", description: "Arranges dining, spa, transportation, and special occasion bookings.", capabilities: ["Dining reservations", "Spa scheduling", "Transportation", "Local recommendations"], type: "Inbound", retellId: "agent_5ae818c99ed491aba70e90c4ad" },
    { name: "NIKITA", role: "Reservations Agent", description: "Manages hotel reservations, booking modifications, and stay requests.", capabilities: ["Booking creation", "Modifications", "Room upgrades", "Group bookings"], type: "Inbound", retellId: "agent_c8ad0b041fba067ea02f6ca850" },
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
    { label: "Case Studies", href: "https://enlightlab.com/case-studies" },
    { label: "Contact", href: "https://enlightlab.com/contact" },
    { label: "Blog", href: "https://enlightlab.com/blog" },
  ]},
  { title: "Legal", links: [
    { label: "Privacy Policy", href: "https://enlightlab.com/privacy" },
    { label: "Terms of Service", href: "https://enlightlab.com/terms" },
    { label: "Cookie Policy", href: "https://enlightlab.com/cookies" },
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
            <Image src="/enlight-lab-logo.png" alt="Enlight Lab" width={200} height={42} style={{ objectFit: "contain" }} />
          </div>
          <div className="nav-links">
            <button className="nav-link" onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}>How It Works</button>
            <button className="nav-link" onClick={() => document.getElementById('industries')?.scrollIntoView({ behavior: 'smooth' })}>Industries</button>
            <button className="nav-link" onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}>Pricing</button>
            <button className="nav-link" onClick={() => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' })}>FAQ</button>
          </div>
          <a href="https://cal.com/dhananjay-goel/30min" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: "0.5rem 1.25rem", fontSize: "0.875rem" }}>
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
                <a href="https://cal.com/dhananjay-goel/30min" target="_blank" rel="noopener noreferrer" className="btn btn-primary">Book a Demo <ArrowRight size={16} /></a>
                <button className="btn btn-outline" onClick={() => document.getElementById('industries')?.scrollIntoView({ behavior: 'smooth' })}>See Agent Demos</button>
              </div>
              <p style={{ marginTop: "1.5rem", fontSize: "0.875rem", color: "#6B7280" }}>
                ✓ No credit card required &nbsp;&nbsp; ✓ Setup in 3 days &nbsp;&nbsp; ✓ Cancel anytime
              </p>
            </motion.div>

            {/* Right: Agent Cards Grid */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
              <p style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#9CA3AF", marginBottom: "1rem", textAlign: "center" }}>
                ↓ LIVE AGENTS — TAP TO CALL NOW
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
                {[
                  { name: "SARA", role: "Patient Services Agent", color: "#a78bfa", retellId: "agent_b7aeab2c389d64e0ae9ec3d999", industry: "Healthcare" },
                  { name: "BHASKAR", role: "Banking Fraud Agent", color: "#4f8ef7", retellId: "agent_71e0327cf0a27f63144aa74f09", industry: "BFSI" },
                  { name: "NIKITA", role: "Reservations Agent", color: "#f472b6", retellId: "agent_c8ad0b041fba067ea02f6ca850", industry: "Hospitality" },
                  { name: "SAM", role: "Customer Resolution Agent", color: "#fb923c", retellId: "agent_111243055fdd3bec81dacfafbd", industry: "Ecommerce" },
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
                style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem", width: "100%" }}
              >
                {currentAgents.map((agent) => (
                  <div key={agent.name} className="agent-card">
                    <div className="agent-header">
                      <div>
                        <div className="agent-type-badge">{agent.type}</div>
                        <h3 className="agent-name">{agent.name}</h3>
                        <p className="agent-role">{agent.role}</p>
                      </div>
                    </div>
                    <p className="agent-description">{agent.description}</p>
                    <div className="agent-capabilities">
                      {agent.capabilities.map((cap) => (
                        <span key={cap} className="capability-tag">{cap}</span>
                      ))}
                    </div>
                    <button className="btn btn-primary" style={{ width: "100%", marginTop: "1rem", justifyContent: "center" }} onClick={() => startCall(agent.retellId, agent.name)}>
                      <Phone size={16} /> Try Demo
                    </button>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
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
                  <div style={{ position: "absolute", right: "-16px", top: "50%", transform: "translateY(-50%)", color: "#D1D5DB", fontSize: "1.25rem", zIndex: 1 }}>→</div>
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
              { name: "Priya M.", biz: "Healthcare Clinic", quote: "SARA handles 80% of our appointment calls. Patients love it." },
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
          <a href="https://cal.com/dhananjay-goel/30min" target="_blank" rel="noopener noreferrer" className="btn" style={{ background: "#fff", color: "#4F46E5", padding: "1rem 2rem", fontSize: "1rem" }}>
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
                    <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="footer-col-link">{l.label}</a>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="footer-bottom">
            <p className="footer-copy">Copyright 2026 Voice by Enlight Lab</p>
            <div style={{ display: "flex", gap: "1.5rem" }}>
              <a href="https://enlightlab.com/privacy" target="_blank" rel="noopener noreferrer" className="footer-col-link">Privacy Policy</a>
              <a href="https://enlightlab.com/website-service-usage-terms-conditions/" target="_blank" rel="noopener noreferrer" className="footer-col-link">Terms of Use</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
