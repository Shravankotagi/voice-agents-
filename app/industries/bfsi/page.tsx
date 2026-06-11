"use client";
import { motion } from "framer-motion";
import { Building, ArrowRight, Shield, Lock, FileText, Phone, AlertTriangle, CreditCard } from "lucide-react";
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
  { icon: AlertTriangle, title: "Fraud Detection & Resolution", desc: "AI identifies suspicious patterns, alerts customers, and initiates dispute resolution instantly." },
  { icon: Lock, title: "Card Blocking", desc: "Customers can block compromised cards via voice — verified and processed in real-time." },
  { icon: FileText, title: "FNOL Filing", desc: "First Notice of Loss filed in under 4 minutes with full documentation collected automatically." },
  { icon: CreditCard, title: "Account Management", desc: "Balance inquiries, transaction history, and account updates handled without agent involvement." },
  { icon: Shield, title: "Compliance Ready", desc: "All interactions meet RBI, SEBI, IRDAI, and international banking compliance requirements." },
  { icon: Building, title: "Loan Inquiry Handling", desc: "AI qualifies loan applicants, collects documents, and schedules advisor callbacks." },
];

const agents = [
  { name: "BRANDON", role: "Banking Fraud Agent", desc: "Handles fraud disputes, blocks cards, and initiates dispute resolution.", color: "#4f8ef7", retellId: "agent_dfe1866c6e0c9ac883546b48ca" },
  { name: "VICTOR", role: "Insurance Claims Agent", desc: "Files FNOL, verifies coverage, and assigns surveyors for claims processing.", color: "#3b82f6", retellId: "agent_8729165b472337b00fa205b921" },
];

const stats = [
  { v: "4 min", l: "FNOL filing time" },
  { v: "95%", l: "Fraud resolution rate" },
  { v: "60%", l: "Cost per interaction saved" },
  { v: "24/7", l: "Coverage" },
];

export default function BFSIPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#fff", fontFamily: "Inter, system-ui, sans-serif" }}>
      
      <nav className="navbar">
              <div className="container">
                <div className="nav-brand">
                  <Image src="/enlight-lab-logo.png" alt="Enlight Lab" width={200} height={42} style={{ objectFit: "contain" }} />
                </div>
                <div className="nav-links">
                  <Link href="/#solutions" className="nav-link">
                    Solutions
                  </Link>

                  <Link href="/#features" className="nav-link">
                    Features
                  </Link>

                  <Link href="/#how-it-works" className="nav-link">
                    How It Works
                  </Link>

                  <Link href="/#industries" className="nav-link">
                    Industries
                  </Link>

                  <Link href="/#faq" className="nav-link">
                    FAQ
                  </Link>
                </div>
                <a href="https://cal.com/dhananjay-goel/30min" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: "0.5rem 1.25rem", fontSize: "0.875rem" }}>
                  Book Demo
                </a>
              </div>
            </nav>

      <section style={{ padding: "5rem 2rem", background: "linear-gradient(135deg, #EFF6FF 0%, #fff 100%)", textAlign: "center" }}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ maxWidth: "760px", margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "#EFF6FF", padding: "0.4rem 1rem", borderRadius: "9999px", fontSize: "0.8rem", fontWeight: 700, color: "#4f8ef7", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "1.5rem" }}>
            <Building size={14} /> BFSI
          </div>
          <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 3.75rem)", fontWeight: 800, color: "#111827", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "1.5rem" }}>
            AI Voice Agents for<br /><span style={{ color: "#4f8ef7" }}>Banking & Finance</span>
          </h1>
          <p style={{ fontSize: "1.125rem", color: "#6B7280", lineHeight: 1.7, maxWidth: "600px", margin: "0 auto 2.5rem" }}>
            Enterprise-grade AI agents for fraud resolution, insurance claims, account management, and loan processing — built for the compliance demands of financial services.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="https://cal.com/dhananjay-goel/30min" target="_blank" rel="noopener noreferrer" style={{ background: "#4f8ef7", color: "#fff", padding: "0.875rem 2rem", borderRadius: "8px", textDecoration: "none", fontWeight: 700, fontSize: "1rem", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
              Book a Demo <ArrowRight size={16} />
            </a>
            <button onClick={() => startCall("agent_dfe1866c6e0c9ac883546b48ca", "BRANDON", "Banking Fraud Agent")} style={{ border: "2px solid #4f8ef7", color: "#4f8ef7", padding: "0.875rem 2rem", borderRadius: "8px", background: "transparent", cursor: "pointer", fontWeight: 700, fontSize: "1rem" }}>
              Try Live Agent
            </button>
          </div>
        </motion.div>
      </section>

      <section style={{ padding: "3rem 2rem", background: "#4f8ef7" }}>
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
            <p style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#4f8ef7", marginBottom: "0.5rem" }}>Live Agents</p>
            <h2 style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 800, color: "#111827", letterSpacing: "-0.025em" }}>Your BFSI AI team</h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "1.5rem",
              maxWidth: "900px",
              margin: "0 auto",
            }}
          >
            {agents.map((agent, i) => (
              <motion.div
                key={agent.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
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
                <div style={{ position: "relative" }}>
                  <div
                    style={{
                      position: "absolute",
                      inset: "-6px",
                      borderRadius: "50%",
                      background: `radial-gradient(circle, ${agent.color}30 0%, transparent 70%)`,
                    }}
                  />

                  <div
                    style={{
                      width: "90px",
                      height: "90px",
                      borderRadius: "50%",
                      background: `radial-gradient(circle at 35% 30%, ${agent.color}ee, ${agent.color})`,
                      boxShadow: `0 8px 24px ${agent.color}66, inset 0 -4px 8px rgba(0,0,0,0.15), inset 0 4px 8px rgba(255,255,255,0.3)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                    }}
                  >
                    <Phone size={28} color="#fff" strokeWidth={1.75} />
                  </div>
                </div>

                <div>
                  <p
                    style={{
                      fontSize: "0.6875rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      color: "#9CA3AF",
                      marginBottom: "0.3rem",
                    }}
                  >
                    BFSI
                  </p>

                  <p
                    style={{
                      fontSize: "1.0625rem",
                      fontWeight: 800,
                      color: "#111827",
                      marginBottom: "0.2rem",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {agent.name}
                  </p>

                  <p
                    style={{
                      fontSize: "0.75rem",
                      color: "#6B7280",
                      lineHeight: 1.4,
                    }}
                  >
                    {agent.role}
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.375rem",
                    background: "#F0FDF4",
                    border: "1px solid #BBF7D0",
                    padding: "0.35rem 0.875rem",
                    borderRadius: "9999px",
                  }}
                >
                  <div
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      background: "#10B981",
                    }}
                  />

                  <span
                    style={{
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      color: "#10B981",
                      letterSpacing: "0.02em",
                    }}
                  >
                    Tap to call
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "5rem 2rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <p style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#4f8ef7", marginBottom: "0.5rem" }}>Features</p>
            <h2 style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 800, color: "#111827", letterSpacing: "-0.025em" }}>Enterprise-grade for financial services</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
            {features.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                style={{ background: "#F9FAFB", border: "1px solid #E5E7EB", borderRadius: "16px", padding: "1.75rem" }}>
                <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "#EFF6FF", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
                  <f.icon size={22} color="#4f8ef7" strokeWidth={1.75} />
                </div>
                <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#111827", marginBottom: "0.5rem" }}>{f.title}</h3>
                <p style={{ fontSize: "0.875rem", color: "#6B7280", lineHeight: 1.6 }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "5rem 2rem", background: "#4f8ef7", textAlign: "center" }}>
        <h2 style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 800, color: "#fff", marginBottom: "1rem", letterSpacing: "-0.025em" }}>Modernize your financial services operations</h2>
        <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "1.125rem", marginBottom: "2rem" }}>Book a demo and see compliance-ready AI agents in action.</p>
        <a href="https://cal.com/dhananjay-goel/30min" target="_blank" rel="noopener noreferrer" style={{ background: "#fff", color: "#4f8ef7", padding: "1rem 2.5rem", borderRadius: "8px", textDecoration: "none", fontWeight: 700, fontSize: "1rem", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
          Book a Free Demo <ArrowRight size={16} />
        </a>
      </section>
      <Footer />
    </div>
  );
}
