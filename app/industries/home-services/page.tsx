"use client";
import { motion } from "framer-motion";
import { Home, ArrowRight, Wrench, Calendar, Phone, Clock, MapPin, Star } from "lucide-react";
import Link from "next/link";
import Footer from "@/components/Footer/Footer";
import Image from "next/image";

async function startCall(agentId: string, agentName: string, agentRole: string) {
  try {
    const { useCallStore } = await import("@/store/callStore");
    const { startLiveCall } = useCallStore.getState();
    await startLiveCall({ id: agentName.toLowerCase().replace(" ", "-"), name: agentName, role: agentRole, retellAgentId: agentId } as any);
  } catch (e) { console.error(e); }
}

const features = [
  { icon: Wrench, title: "Emergency Detection", desc: "AI identifies urgent situations like burst pipes or gas leaks and routes them to on-call technicians immediately." },
  { icon: Calendar, title: "Service Scheduling", desc: "Books appointments based on technician availability, location, and job type in real-time." },
  { icon: MapPin, title: "Job Dispatching", desc: "Integrates with ServiceTitan and Jobber to dispatch the nearest available technician." },
  { icon: Clock, title: "Arrival Updates", desc: "Proactively calls customers with technician ETA and any schedule changes." },
  { icon: Star, title: "Review Collection", desc: "Post-service calls collect Google reviews and satisfaction scores automatically." },
  { icon: Phone, title: "Quote Requests", desc: "AI collects project details and schedules on-site estimates for qualified jobs." },
];

const agents = [
  { name: "Mike Thompson", role: "Plumbing Intake Agent", desc: "Handles incoming plumbing requests, identifies emergencies, and schedules visits.", color: "#06b6d4", retellId: "agent_7a2e179e5304e28672360a15ee" },
  { name: "Sarah Johnson", role: "HVAC Scheduling Agent", desc: "Manages HVAC appointments, maintenance scheduling, and urgent service prioritization.", color: "#8b5cf6", retellId: "agent_015cf5b6284d3bb41708fcc29e" },
  { name: "David Miller", role: "Electrician Quote Agent", desc: "Qualifies electrical requests and schedules on-site estimates.", color: "#f43f5e", retellId: "agent_8821bb64745c21c48f2526b2b5" },
];

const stats = [
  { v: "35%", l: "Fewer no-shows" },
  { v: "15+", l: "Jobs booked/week" },
  { v: "40%", l: "Admin time saved" },
  { v: "4.9/5", l: "Customer rating" },
];

export default function HomeServicesPage() {
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

      <section style={{ padding: "5rem 2rem", background: "linear-gradient(135deg, #ECFDF5 0%, #fff 100%)", textAlign: "center" }}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ maxWidth: "760px", margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "#ECFDF5", padding: "0.4rem 1rem", borderRadius: "9999px", fontSize: "0.8rem", fontWeight: 700, color: "#10b981", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "1.5rem" }}>
            <Home size={14} /> Home Services
          </div>
          <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 3.75rem)", fontWeight: 800, color: "#111827", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "1.5rem" }}>
            AI Voice Agents for<br /><span style={{ color: "#10b981" }}>Home Services</span>
          </h1>
          <p style={{ fontSize: "1.125rem", color: "#6B7280", lineHeight: 1.7, maxWidth: "600px", margin: "0 auto 2.5rem" }}>
            Never miss a job again. AI agents answer every call, book every appointment, and dispatch your team — even while you're on the job site.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="https://cal.com/dhananjay-goel/30min" target="_blank" rel="noopener noreferrer" style={{ background: "#10b981", color: "#fff", padding: "0.875rem 2rem", borderRadius: "8px", textDecoration: "none", fontWeight: 700, fontSize: "1rem", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
              Book a Demo <ArrowRight size={16} />
            </a>
            <button onClick={() => startCall("agent_7a2e179e5304e28672360a15ee", "Mike Thompson", "Plumbing Intake Agent")} style={{ border: "2px solid #10b981", color: "#10b981", padding: "0.875rem 2rem", borderRadius: "8px", background: "transparent", cursor: "pointer", fontWeight: 700, fontSize: "1rem" }}>
              Try Live Agent
            </button>
          </div>
        </motion.div>
      </section>

      <section style={{ padding: "3rem 2rem", background: "#10b981" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "2rem", textAlign: "center" }}>
          {stats.map((s, i) => (
            <motion.div key={s.l} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <div style={{ fontSize: "2.5rem", fontWeight: 800, color: "#fff", marginBottom: "0.25rem" }}>{s.v}</div>
              <div style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.8)", fontWeight: 500 }}>{s.l}</div>
            </motion.div>
          ))}
        </div>
      </section>

      <section style={{ padding: "5rem 2rem", background: "#F9FAFB" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <p style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#10b981", marginBottom: "0.5rem" }}>Live Agents</p>
            <h2 style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 800, color: "#111827", letterSpacing: "-0.025em" }}>Your home services AI team</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
            {agents.map((agent, i) => (
              <motion.div key={agent.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: "16px", padding: "2rem" }}>
                <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: `radial-gradient(circle at 35% 35%, ${agent.color}cc, ${agent.color})`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem" }}>
                  <Phone size={24} color="#fff" />
                </div>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#111827", marginBottom: "0.25rem" }}>{agent.name}</h3>
                <p style={{ fontSize: "0.8rem", fontWeight: 600, color: agent.color, marginBottom: "0.75rem" }}>{agent.role}</p>
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
            <p style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#10b981", marginBottom: "0.5rem" }}>Features</p>
            <h2 style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 800, color: "#111827", letterSpacing: "-0.025em" }}>Built for field service businesses</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
            {features.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                style={{ background: "#F9FAFB", border: "1px solid #E5E7EB", borderRadius: "16px", padding: "1.75rem" }}>
                <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "#ECFDF5", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
                  <f.icon size={22} color="#10b981" strokeWidth={1.75} />
                </div>
                <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#111827", marginBottom: "0.5rem" }}>{f.title}</h3>
                <p style={{ fontSize: "0.875rem", color: "#6B7280", lineHeight: 1.6 }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "5rem 2rem", background: "#10b981", textAlign: "center" }}>
        <h2 style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 800, color: "#fff", marginBottom: "1rem", letterSpacing: "-0.025em" }}>Never miss another job opportunity</h2>
        <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "1.125rem", marginBottom: "2rem" }}>Book a demo and see how AI books 15+ jobs a week on autopilot.</p>
        <a href="https://cal.com/dhananjay-goel/30min" target="_blank" rel="noopener noreferrer" style={{ background: "#fff", color: "#10b981", padding: "1rem 2.5rem", borderRadius: "8px", textDecoration: "none", fontWeight: 700, fontSize: "1rem", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
          Book a Free Demo <ArrowRight size={16} />
        </a>
      </section>
      <Footer />
    </div>
  );
}