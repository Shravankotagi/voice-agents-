"use client";
import { motion } from "framer-motion";
import { Building, CheckCircle2, ArrowRight, Shield, Lock, FileText, Phone, AlertTriangle, CreditCard } from "lucide-react";
import Link from "next/link";
const features = [
  { icon: AlertTriangle, title: "Fraud Detection & Resolution", desc: "AI identifies suspicious patterns, alerts customers, and initiates dispute resolution instantly." },
  { icon: Lock, title: "Card Blocking", desc: "Customers can block compromised cards via voice — verified and processed in real-time." },
  { icon: FileText, title: "FNOL Filing", desc: "First Notice of Loss filed in under 4 minutes with full documentation collected automatically." },
  { icon: CreditCard, title: "Account Management", desc: "Balance inquiries, transaction history, and account updates handled without agent involvement." },
  { icon: Shield, title: "Compliance Ready", desc: "All interactions meet RBI, SEBI, IRDAI, and international banking compliance requirements." },
  { icon: Building, title: "Loan Inquiry Handling", desc: "AI qualifies loan applicants, collects documents, and schedules advisor callbacks." },
];
const agents = [
  { name: "BHASKAR", role: "Banking Fraud Agent", desc: "Handles fraud disputes, blocks cards, and initiates dispute resolution.", color: "#4f8ef7" },
  { name: "ARYAN", role: "Insurance Claims Agent", desc: "Files FNOL, verifies coverage, and assigns surveyors for claims processing.", color: "#3b82f6" },
];
const stats = [{ v: "4 min", l: "FNOL filing time" }, { v: "95%", l: "Fraud resolution rate" }, { v: "60%", l: "Cost per interaction saved" }, { v: "24/7", l: "Coverage" }];
export default function BFSIPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#fff", fontFamily: "Inter, system-ui, sans-serif" }}>
      <nav style={{ borderBottom: "1px solid #E5E7EB", padding: "1rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, background: "#fff", zIndex: 50 }}>
        <Link href="/" style={{ fontSize: "1.25rem", fontWeight: 700, color: "#4F46E5", textDecoration: "none" }}>← Back to Home</Link>
        <a href="https://cal.com/dhananjay-goel/30min" target="_blank" rel="noopener noreferrer" style={{ background: "#4f8ef7", color: "#fff", padding: "0.5rem 1.25rem", borderRadius: "8px", textDecoration: "none", fontWeight: 600, fontSize: "0.875rem" }}>Book Demo</a>
      </nav>
      <section style={{ padding: "5rem 2rem", background: "linear-gradient(135deg, #EFF6FF 0%, #fff 100%)", textAlign: "center" }}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ maxWidth: "760px", margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "#EFF6FF", padding: "0.4rem 1rem", borderRadius: "9999px", fontSize: "0.8rem", fontWeight: 700, color: "#4f8ef7", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "1.5rem" }}><Building size={14} /> BFSI</div>
          <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 3.75rem)", fontWeight: 800, color: "#111827", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "1.5rem" }}>AI Voice Agents for<br /><span style={{ color: "#4f8ef7" }}>Banking & Finance</span></h1>
          <p style={{ fontSize: "1.125rem", color: "#6B7280", lineHeight: 1.7, marginBottom: "2.5rem", maxWidth: "600px", margin: "0 auto 2.5rem" }}>Enterprise-grade AI agents for fraud resolution, insurance claims, account management, and loan processing — built for the compliance demands of financial services.</p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="https://cal.com/dhananjay-goel/30min" target="_blank" rel="noopener noreferrer" style={{ background: "#4f8ef7", color: "#fff", padding: "0.875rem 2rem", borderRadius: "8px", textDecoration: "none", fontWeight: 700, fontSize: "1rem", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>Book a Demo <ArrowRight size={16} /></a>
            <Link href="/" style={{ border: "2px solid #4f8ef7", color: "#4f8ef7", padding: "0.875rem 2rem", borderRadius: "8px", textDecoration: "none", fontWeight: 700, fontSize: "1rem" }}>Try Live Agent</Link>
          </div>
        </motion.div>
      </section>
      <section style={{ padding: "3rem 2rem", background: "#4f8ef7" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "2rem", textAlign: "center" }}>
          {stats.map((s, i) => (<motion.div key={s.l} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}><div style={{ fontSize: "2.5rem", fontWeight: 800, color: "#fff", marginBottom: "0.25rem" }}>{s.v}</div><div style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.8)", fontWeight: 500 }}>{s.l}</div></motion.div>))}
        </div>
      </section>
      <section style={{ padding: "5rem 2rem", background: "#F9FAFB" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}><p style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#4f8ef7", marginBottom: "0.5rem" }}>Live Agents</p><h2 style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 800, color: "#111827", letterSpacing: "-0.025em" }}>Your BFSI AI team</h2></div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.5rem" }}>
            {agents.map((agent, i) => (<motion.div key={agent.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: "16px", padding: "2rem" }}><div style={{ width: "64px", height: "64px", borderRadius: "50%", background: `radial-gradient(circle at 35% 35%, ${agent.color}cc, ${agent.color})`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem" }}><Phone size={24} color="#fff" /></div><h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#111827", marginBottom: "0.25rem" }}>{agent.name}</h3><p style={{ fontSize: "0.875rem", fontWeight: 600, color: agent.color, marginBottom: "0.75rem" }}>{agent.role}</p><p style={{ fontSize: "0.875rem", color: "#6B7280", lineHeight: 1.6, marginBottom: "1.25rem" }}>{agent.desc}</p><Link href="/" style={{ background: agent.color, color: "#fff", padding: "0.75rem 1.5rem", borderRadius: "8px", textDecoration: "none", fontWeight: 600, fontSize: "0.875rem", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}><Phone size={14} /> Try Demo</Link></motion.div>))}
          </div>
        </div>
      </section>
      <section style={{ padding: "5rem 2rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}><p style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#4f8ef7", marginBottom: "0.5rem" }}>Features</p><h2 style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 800, color: "#111827", letterSpacing: "-0.025em" }}>Enterprise-grade for financial services</h2></div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
            {features.map((f, i) => (<motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} style={{ background: "#F9FAFB", border: "1px solid #E5E7EB", borderRadius: "16px", padding: "1.75rem" }}><div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "#EFF6FF", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}><f.icon size={22} color="#4f8ef7" strokeWidth={1.75} /></div><h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#111827", marginBottom: "0.5rem" }}>{f.title}</h3><p style={{ fontSize: "0.875rem", color: "#6B7280", lineHeight: 1.6 }}>{f.desc}</p></motion.div>))}
          </div>
        </div>
      </section>
      <section style={{ padding: "5rem 2rem", background: "#4f8ef7", textAlign: "center" }}>
        <h2 style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 800, color: "#fff", marginBottom: "1rem", letterSpacing: "-0.025em" }}>Modernize your financial services operations</h2>
        <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "1.125rem", marginBottom: "2rem" }}>Book a demo and see compliance-ready AI agents in action.</p>
        <a href="https://cal.com/dhananjay-goel/30min" target="_blank" rel="noopener noreferrer" style={{ background: "#fff", color: "#4f8ef7", padding: "1rem 2.5rem", borderRadius: "8px", textDecoration: "none", fontWeight: 700, fontSize: "1rem", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>Book a Free Demo <ArrowRight size={16} /></a>
      </section>
    </div>
  );
}
