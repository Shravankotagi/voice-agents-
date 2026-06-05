"use client";
import { motion } from "framer-motion";
import { Users2, CheckCircle2, ArrowRight, Hotel, Utensils, Car, Star, Phone, Globe } from "lucide-react";
import Link from "next/link";
const features = [
  { icon: Hotel, title: "Room Reservations", desc: "AI handles booking creation, modifications, cancellations, and room upgrade requests." },
  { icon: Utensils, title: "Dining Reservations", desc: "Books restaurant tables, handles dietary requirements, and manages special occasion requests." },
  { icon: Car, title: "Transportation", desc: "Arranges airport transfers, taxis, and local transportation for guests automatically." },
  { icon: Star, title: "Concierge Services", desc: "Spa bookings, activity recommendations, and local attraction information available 24/7." },
  { icon: Globe, title: "Multilingual Support", desc: "Agents communicate in multiple languages to serve international guests seamlessly." },
  { icon: Phone, title: "In-stay Requests", desc: "Handles room service, housekeeping, maintenance, and amenity requests during guest stays." },
];
const agents = [
  { name: "LUCKY", role: "Concierge Agent", desc: "Arranges dining, spa, transportation, and special occasion bookings.", color: "#f472b6" },
  { name: "NIKITA", role: "Reservations Agent", desc: "Manages hotel reservations, booking modifications, and stay requests.", color: "#ec4899" },
];
const stats = [{ v: "3.2x", l: "More bookings" }, { v: "24/7", l: "Guest support" }, { v: "4.9/5", l: "Guest satisfaction" }, { v: "45%", l: "Upsell conversion" }];
export default function HospitalityPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#fff", fontFamily: "Inter, system-ui, sans-serif" }}>
      <nav style={{ borderBottom: "1px solid #E5E7EB", padding: "1rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, background: "#fff", zIndex: 50 }}>
        <Link href="/" style={{ fontSize: "1.25rem", fontWeight: 700, color: "#4F46E5", textDecoration: "none" }}>← Back to Home</Link>
        <a href="https://cal.com/dhananjay-goel/30min" target="_blank" rel="noopener noreferrer" style={{ background: "#f472b6", color: "#fff", padding: "0.5rem 1.25rem", borderRadius: "8px", textDecoration: "none", fontWeight: 600, fontSize: "0.875rem" }}>Book Demo</a>
      </nav>
      <section style={{ padding: "5rem 2rem", background: "linear-gradient(135deg, #FDF2F8 0%, #fff 100%)", textAlign: "center" }}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ maxWidth: "760px", margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "#FDF2F8", padding: "0.4rem 1rem", borderRadius: "9999px", fontSize: "0.8rem", fontWeight: 700, color: "#f472b6", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "1.5rem" }}><Users2 size={14} /> Hospitality</div>
          <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 3.75rem)", fontWeight: 800, color: "#111827", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "1.5rem" }}>AI Voice Agents for<br /><span style={{ color: "#f472b6" }}>Hospitality</span></h1>
          <p style={{ fontSize: "1.125rem", color: "#6B7280", lineHeight: 1.7, marginBottom: "2.5rem", maxWidth: "600px", margin: "0 auto 2.5rem" }}>Elevate every guest touchpoint with AI agents that handle reservations, concierge requests, and in-stay needs — so your staff delivers unforgettable experiences.</p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="https://cal.com/dhananjay-goel/30min" target="_blank" rel="noopener noreferrer" style={{ background: "#f472b6", color: "#fff", padding: "0.875rem 2rem", borderRadius: "8px", textDecoration: "none", fontWeight: 700, fontSize: "1rem", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>Book a Demo <ArrowRight size={16} /></a>
            <Link href="/" style={{ border: "2px solid #f472b6", color: "#f472b6", padding: "0.875rem 2rem", borderRadius: "8px", textDecoration: "none", fontWeight: 700, fontSize: "1rem" }}>Try Live Agent</Link>
          </div>
        </motion.div>
      </section>
      <section style={{ padding: "3rem 2rem", background: "#f472b6" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "2rem", textAlign: "center" }}>
          {stats.map((s, i) => (<motion.div key={s.l} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}><div style={{ fontSize: "2.5rem", fontWeight: 800, color: "#fff", marginBottom: "0.25rem" }}>{s.v}</div><div style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.8)", fontWeight: 500 }}>{s.l}</div></motion.div>))}
        </div>
      </section>
      <section style={{ padding: "5rem 2rem", background: "#F9FAFB" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}><p style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#f472b6", marginBottom: "0.5rem" }}>Live Agents</p><h2 style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 800, color: "#111827", letterSpacing: "-0.025em" }}>Your hospitality AI team</h2></div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.5rem" }}>
            {agents.map((agent, i) => (<motion.div key={agent.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: "16px", padding: "2rem" }}><div style={{ width: "64px", height: "64px", borderRadius: "50%", background: `radial-gradient(circle at 35% 35%, ${agent.color}cc, ${agent.color})`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem" }}><Phone size={24} color="#fff" /></div><h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#111827", marginBottom: "0.25rem" }}>{agent.name}</h3><p style={{ fontSize: "0.875rem", fontWeight: 600, color: agent.color, marginBottom: "0.75rem" }}>{agent.role}</p><p style={{ fontSize: "0.875rem", color: "#6B7280", lineHeight: 1.6, marginBottom: "1.25rem" }}>{agent.desc}</p><Link href="/" style={{ background: agent.color, color: "#fff", padding: "0.75rem 1.5rem", borderRadius: "8px", textDecoration: "none", fontWeight: 600, fontSize: "0.875rem", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}><Phone size={14} /> Try Demo</Link></motion.div>))}
          </div>
        </div>
      </section>
      <section style={{ padding: "5rem 2rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}><p style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#f472b6", marginBottom: "0.5rem" }}>Features</p><h2 style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 800, color: "#111827", letterSpacing: "-0.025em" }}>Built for exceptional guest experiences</h2></div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
            {features.map((f, i) => (<motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} style={{ background: "#F9FAFB", border: "1px solid #E5E7EB", borderRadius: "16px", padding: "1.75rem" }}><div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "#FDF2F8", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}><f.icon size={22} color="#f472b6" strokeWidth={1.75} /></div><h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#111827", marginBottom: "0.5rem" }}>{f.title}</h3><p style={{ fontSize: "0.875rem", color: "#6B7280", lineHeight: 1.6 }}>{f.desc}</p></motion.div>))}
          </div>
        </div>
      </section>
      <section style={{ padding: "5rem 2rem", background: "#f472b6", textAlign: "center" }}>
        <h2 style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 800, color: "#fff", marginBottom: "1rem", letterSpacing: "-0.025em" }}>Deliver 5-star experiences at scale</h2>
        <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "1.125rem", marginBottom: "2rem" }}>Book a demo and see NIKITA and LUCKY in action.</p>
        <a href="https://cal.com/dhananjay-goel/30min" target="_blank" rel="noopener noreferrer" style={{ background: "#fff", color: "#f472b6", padding: "1rem 2.5rem", borderRadius: "8px", textDecoration: "none", fontWeight: 700, fontSize: "1rem", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>Book a Free Demo <ArrowRight size={16} /></a>
      </section>
    </div>
  );
}
