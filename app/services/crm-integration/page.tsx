"use client";
import { motion } from "framer-motion";
import { Database, CheckCircle2, ArrowRight, RefreshCw, Zap, Shield, BarChart2, Link2, Settings } from "lucide-react";
import Link from "next/link";
import Footer from "@/components/Footer/Footer";
const integrations = [
  { name: "HubSpot", color: "#FF7A59" },
  { name: "Salesforce", color: "#00A1E0" },
  { name: "Zapier", color: "#FF4A00" },
  { name: "Jobber", color: "#00B67A" },
  { name: "ServiceTitan", color: "#0066CC" },
  { name: "Housecall Pro", color: "#25A244" },
  { name: "Pipedrive", color: "#3F3B38" },
  { name: "Zoho CRM", color: "#E42527" },
];

const features = [
  { icon: RefreshCw, title: "Bi-directional Sync", desc: "Call data flows both ways — AI reads from your CRM and writes back after every interaction." },
  { icon: Zap, title: "Real-time Updates", desc: "Contact records, notes, and deal stages update instantly after every AI-handled call." },
  { icon: Shield, title: "Data Security", desc: "All integrations use OAuth and encrypted connections — your data is always protected." },
  { icon: BarChart2, title: "Unified Reporting", desc: "See AI call performance alongside your existing CRM reporting and pipeline metrics." },
  { icon: Link2, title: "Webhook Support", desc: "Connect to any tool via webhooks — if it has an API, we can integrate with it." },
  { icon: Settings, title: "Custom Field Mapping", desc: "Map call data to any custom field in your CRM — fully flexible to your workflow." },
];

const stats = [
  { v: "5000+", l: "Apps via Zapier" },
  { v: "0", l: "Manual data entry" },
  { v: "Real-time", l: "Data sync speed" },
  { v: "99.9%", l: "Sync reliability" },
];

export default function CRMIntegrationPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#fff", fontFamily: "Inter, system-ui, sans-serif" }}>
      <nav style={{ borderBottom: "1px solid #E5E7EB", padding: "1rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, background: "#fff", zIndex: 50 }}>
        <Link href="/" style={{ fontSize: "1.25rem", fontWeight: 700, color: "#4F46E5", textDecoration: "none" }}>← Back to Home</Link>
        <a href="https://cal.com/dhananjay-goel/30min" target="_blank" rel="noopener noreferrer" style={{ background: "#4F46E5", color: "#fff", padding: "0.5rem 1.25rem", borderRadius: "8px", textDecoration: "none", fontWeight: 600, fontSize: "0.875rem" }}>Book Demo</a>
      </nav>

      <section style={{ padding: "5rem 2rem", background: "linear-gradient(135deg, #F0F4FF 0%, #fff 100%)", textAlign: "center" }}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ maxWidth: "760px", margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "#EEF2FF", padding: "0.4rem 1rem", borderRadius: "9999px", fontSize: "0.8rem", fontWeight: 700, color: "#4F46E5", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "1.5rem" }}>
            <Database size={14} /> Services
          </div>
          <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 3.75rem)", fontWeight: 800, color: "#111827", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "1.5rem" }}>
            CRM Integration<br />
            <span style={{ color: "#4F46E5" }}>Zero Manual Entry</span>
          </h1>
          <p style={{ fontSize: "1.125rem", color: "#6B7280", lineHeight: 1.7, marginBottom: "2.5rem", maxWidth: "600px", margin: "0 auto 2.5rem" }}>
            Every AI call automatically syncs to your CRM. Contact records, call notes, deal stages, and outcomes — all updated in real-time without anyone lifting a finger.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="https://cal.com/dhananjay-goel/30min" target="_blank" rel="noopener noreferrer" style={{ background: "#4F46E5", color: "#fff", padding: "0.875rem 2rem", borderRadius: "8px", textDecoration: "none", fontWeight: 700, fontSize: "1rem", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
              Book a Demo <ArrowRight size={16} />
            </a>
            <Link href="/" style={{ border: "2px solid #4F46E5", color: "#4F46E5", padding: "0.875rem 2rem", borderRadius: "8px", textDecoration: "none", fontWeight: 700, fontSize: "1rem" }}>
              See Live Demo
            </Link>
          </div>
        </motion.div>
      </section>

      <section style={{ padding: "3rem 2rem", background: "#4F46E5" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "2rem", textAlign: "center" }}>
          {stats.map((s, i) => (
            <motion.div key={s.l} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <div style={{ fontSize: "2.5rem", fontWeight: 800, color: "#fff", marginBottom: "0.25rem" }}>{s.v}</div>
              <div style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.75)", fontWeight: 500 }}>{s.l}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Integrations Grid */}
      <section style={{ padding: "5rem 2rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <p style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#4F46E5", marginBottom: "0.5rem" }}>Integrations</p>
            <h2 style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 800, color: "#111827", letterSpacing: "-0.025em" }}>Works with your existing stack</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem", marginBottom: "4rem" }}>
            {integrations.map((int, i) => (
              <motion.div key={int.name} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                style={{ background: "#F9FAFB", border: "1px solid #E5E7EB", borderRadius: "12px", padding: "1.5rem", textAlign: "center" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: int.color, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 0.75rem", color: "#fff", fontWeight: 800, fontSize: "1rem" }}>
                  {int.name.charAt(0)}
                </div>
                <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "#111827" }}>{int.name}</p>
              </motion.div>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
            {features.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                style={{ background: "#F9FAFB", border: "1px solid #E5E7EB", borderRadius: "16px", padding: "1.75rem" }}>
                <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "#EEF2FF", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
                  <f.icon size={22} color="#4F46E5" strokeWidth={1.75} />
                </div>
                <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#111827", marginBottom: "0.5rem" }}>{f.title}</h3>
                <p style={{ fontSize: "0.875rem", color: "#6B7280", lineHeight: 1.6 }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "5rem 2rem", background: "#4F46E5", textAlign: "center" }}>
        <h2 style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 800, color: "#fff", marginBottom: "1rem", letterSpacing: "-0.025em" }}>Connect your CRM in days, not months</h2>
        <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1.125rem", marginBottom: "2rem" }}>Our team handles the entire integration setup for you.</p>
        <a href="https://cal.com/dhananjay-goel/30min" target="_blank" rel="noopener noreferrer" style={{ background: "#fff", color: "#4F46E5", padding: "1rem 2.5rem", borderRadius: "8px", textDecoration: "none", fontWeight: 700, fontSize: "1rem", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
          Book a Free Demo <ArrowRight size={16} />
        </a>
      </section>
      <Footer />
    </div>
  );
}
