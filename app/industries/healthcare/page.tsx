"use client";
import { motion } from "framer-motion";
import { Stethoscope, CheckCircle2, ArrowRight, Shield, Clock, Calendar, Phone, Heart, Activity } from "lucide-react";
import Link from "next/link";
import Footer from "@/components/Footer/Footer";
import { useCallStore } from "@/store/callStore";
import Image from "next/image";

async function startCall(agentId: string, agentName: string, agentRole: string) {
  try {
    const { startLiveCall } = useCallStore.getState();
    await startLiveCall({ id: agentName.toLowerCase().replace(" ", "-"), name: agentName, role: agentRole, retellAgentId: agentId } as any);
  } catch (e) { console.error(e); }
}


const features = [
  { icon: Calendar, title: "Appointment Scheduling", desc: "AI schedules, confirms, and reschedules patient appointments 24/7 with real-time calendar sync." },
  { icon: Shield, title: "HIPAA Compliant", desc: "All conversations and data handling meet strict HIPAA requirements for patient privacy." },
  { icon: Activity, title: "Symptom Triage", desc: "Pre-visit clinical screening collects symptoms and routes urgent cases appropriately." },
  { icon: Phone, title: "Patient Follow-ups", desc: "Automated post-visit follow-up calls improve outcomes and patient satisfaction scores." },
  { icon: Heart, title: "Insurance Verification", desc: "Agents verify insurance coverage and eligibility before patient appointments." },
  { icon: Clock, title: "24/7 Availability", desc: "Patients can schedule, cancel, or get information any time — even outside clinic hours." },
];

const agents = [
  { name: "SARA", role: "Patient Services Agent", desc: "Schedules appointments, recommends doctors, and handles patient inquiries.", color: "#a78bfa", retellId: "agent_b7aeab2c389d64e0ae9ec3d999" },
  { name: "RIYA", role: "Clinical Screening Agent", desc: "Performs symptom assessment and patient triage before consultation.", color: "#818cf8", retellId: "agent_cce30852caccbdd3021ef4aa01" },
];

const stats = [
  { v: "92%", l: "Call automation rate" },
  { v: "40%", l: "Admin cost reduction" },
  { v: "35%", l: "Fewer no-shows" },
  { v: "4.8/5", l: "Patient satisfaction" },
];

export default function HealthcarePage() {
  return (
    <div style={{ minHeight: "100vh", background: "#fff", fontFamily: "Inter, system-ui, sans-serif" }}>
      <nav className="navbar">
        <div className="container">
          <div className="nav-brand">
            <Image src="/enlight-lab-logo.png" alt="Enlight Lab" width={200} height={42} style={{ objectFit: "contain" }} />
          </div>
          <div className="nav-links">
            <button className="nav-link" onClick={() => document.getElementById('solutions')?.scrollIntoView({ behavior: 'smooth' })}>Solutions</button>
            <button className="nav-link" onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}>Features</button>
            <button className="nav-link" onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}>How It Works</button>
            <button className="nav-link" onClick={() => document.getElementById('industries')?.scrollIntoView({ behavior: 'smooth' })}>Industries</button>
            <button className="nav-link" onClick={() => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' })}>FAQ</button>
          </div>
          <a href="https://cal.com/dhananjay-goel/30min" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: "0.5rem 1.25rem", fontSize: "0.875rem" }}>
            Book Demo
          </a>
        </div>
      </nav>

      <section style={{ padding: "5rem 2rem", background: "linear-gradient(135deg, #FAF5FF 0%, #fff 100%)", textAlign: "center" }}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ maxWidth: "760px", margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "#F3E8FF", padding: "0.4rem 1rem", borderRadius: "9999px", fontSize: "0.8rem", fontWeight: 700, color: "#a78bfa", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "1.5rem" }}>
            <Stethoscope size={14} /> Healthcare
          </div>
          <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 3.75rem)", fontWeight: 800, color: "#111827", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "1.5rem" }}>
            AI Voice Agents for<br />
            <span style={{ color: "#a78bfa" }}>Healthcare & Clinics</span>
          </h1>
          <p style={{ fontSize: "1.125rem", color: "#6B7280", lineHeight: 1.7, marginBottom: "2.5rem", maxWidth: "600px", margin: "0 auto 2.5rem" }}>
            HIPAA-compliant AI agents that handle patient scheduling, clinical screening, insurance verification, and follow-ups — so your staff focuses on care, not calls.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="https://cal.com/dhananjay-goel/30min" target="_blank" rel="noopener noreferrer" style={{ background: "#a78bfa", color: "#fff", padding: "0.875rem 2rem", borderRadius: "8px", textDecoration: "none", fontWeight: 700, fontSize: "1rem", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
              Book a Demo <ArrowRight size={16} />
            </a>
            <button onClick={() => startCall("agent_b7aeab2c389d64e0ae9ec3d999", "SARA", "Patient Services Agent")} style={{ border: "2px solid #a78bfa", color: "#a78bfa", padding: "0.875rem 2rem", borderRadius: "8px", background: "transparent", cursor: "pointer", fontWeight: 700, fontSize: "1rem" }}>
              Try Live Agent
            </button>
          </div>
        </motion.div>
      </section>

      <section style={{ padding: "3rem 2rem", background: "#a78bfa" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "2rem", textAlign: "center" }}>
          {stats.map((s, i) => (
            <motion.div key={s.l} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <div style={{ fontSize: "2.5rem", fontWeight: 800, color: "#fff", marginBottom: "0.25rem" }}>{s.v}</div>
              <div style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.8)", fontWeight: 500 }}>{s.l}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Meet the Agents */}
      <section style={{ padding: "5rem 2rem", background: "#F9FAFB" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <p style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#a78bfa", marginBottom: "0.5rem" }}>Live Agents</p>
            <h2 style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 800, color: "#111827", letterSpacing: "-0.025em" }}>Meet your healthcare AI team</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.5rem" }}>
            {agents.map((agent, i) => (
              <motion.div key={agent.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: "16px", padding: "2rem" }}>
                <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: `radial-gradient(circle at 35% 35%, ${agent.color}cc, ${agent.color})`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem" }}>
                  <Phone size={24} color="#fff" />
                </div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#111827", marginBottom: "0.25rem" }}>{agent.name}</h3>
                <p style={{ fontSize: "0.875rem", fontWeight: 600, color: agent.color, marginBottom: "0.75rem" }}>{agent.role}</p>
                <p style={{ fontSize: "0.875rem", color: "#6B7280", lineHeight: 1.6, marginBottom: "1.25rem" }}>{agent.desc}</p>
                <button onClick={() => startCall(agent.retellId, agent.name, agent.role)} style={{ background: agent.color, color: "#fff", padding: "0.75rem 1.5rem", borderRadius: "8px", border: "none", cursor: "pointer", fontWeight: 600, fontSize: "0.875rem", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                  <Phone size={14} /> Try Demo
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "5rem 2rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <p style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#a78bfa", marginBottom: "0.5rem" }}>Features</p>
            <h2 style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 800, color: "#111827", letterSpacing: "-0.025em" }}>Built for healthcare workflows</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
            {features.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                style={{ background: "#F9FAFB", border: "1px solid #E5E7EB", borderRadius: "16px", padding: "1.75rem" }}>
                <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "#F3E8FF", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
                  <f.icon size={22} color="#a78bfa" strokeWidth={1.75} />
                </div>
                <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#111827", marginBottom: "0.5rem" }}>{f.title}</h3>
                <p style={{ fontSize: "0.875rem", color: "#6B7280", lineHeight: 1.6 }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "5rem 2rem", background: "#a78bfa", textAlign: "center" }}>
        <h2 style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 800, color: "#fff", marginBottom: "1rem", letterSpacing: "-0.025em" }}>Transform your patient communication</h2>
        <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "1.125rem", marginBottom: "2rem" }}>Book a free demo and see SARA in action.</p>
        <a href="https://cal.com/dhananjay-goel/30min" target="_blank" rel="noopener noreferrer" style={{ background: "#fff", color: "#a78bfa", padding: "1rem 2.5rem", borderRadius: "8px", textDecoration: "none", fontWeight: 700, fontSize: "1rem", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
          Book a Free Demo <ArrowRight size={16} />
        </a>
      </section>
      <Footer />
    </div>
  );
}
