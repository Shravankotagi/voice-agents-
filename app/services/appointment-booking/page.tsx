"use client";
import { motion } from "framer-motion";
import { Calendar, CheckCircle2, ArrowRight, Bell, RefreshCw, Globe, Link2, Clock, UserCheck } from "lucide-react";
import Link from "next/link";

const features = [
  { icon: Calendar, title: "Real-time Availability", desc: "Syncs with your calendar live — agents only offer slots that are actually available." },
  { icon: Bell, title: "Automated Reminders", desc: "Voice and SMS reminders reduce no-shows by up to 35% without any manual effort." },
  { icon: RefreshCw, title: "Easy Rescheduling", desc: "Customers can call back to reschedule — the agent handles it instantly." },
  { icon: Globe, title: "Multi-timezone Support", desc: "Automatically handles timezone conversions for businesses with distributed customers." },
  { icon: Link2, title: "CRM Integration", desc: "Every booking is logged automatically in HubSpot, Salesforce, or your preferred CRM." },
  { icon: UserCheck, title: "Smart Qualification", desc: "Agents collect intake info before booking so you're always prepared for the appointment." },
];

const useCases = [
  "Medical appointments",
  "Salon & spa bookings",
  "Home service visits",
  "Real estate tours",
  "Financial consultations",
  "Restaurant reservations",
  "Demo & sales calls",
  "Follow-up appointments",
];

const stats = [
  { v: "35%", l: "Fewer no-shows" },
  { v: "24/7", l: "Booking availability" },
  { v: "3 min", l: "Average booking time" },
  { v: "98%", l: "Booking accuracy" },
];

export default function AppointmentBookingPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#fff", fontFamily: "Inter, system-ui, sans-serif" }}>
      <nav style={{ borderBottom: "1px solid #E5E7EB", padding: "1rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, background: "#fff", zIndex: 50 }}>
        <Link href="/" style={{ fontSize: "1.25rem", fontWeight: 700, color: "#4F46E5", textDecoration: "none" }}>← Back to Home</Link>
        <a href="https://cal.com/dhananjay-goel/30min" target="_blank" rel="noopener noreferrer" style={{ background: "#4F46E5", color: "#fff", padding: "0.5rem 1.25rem", borderRadius: "8px", textDecoration: "none", fontWeight: 600, fontSize: "0.875rem" }}>Book Demo</a>
      </nav>

      <section style={{ padding: "5rem 2rem", background: "linear-gradient(135deg, #F0F4FF 0%, #fff 100%)", textAlign: "center" }}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ maxWidth: "760px", margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "#EEF2FF", padding: "0.4rem 1rem", borderRadius: "9999px", fontSize: "0.8rem", fontWeight: 700, color: "#4F46E5", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "1.5rem" }}>
            <Calendar size={14} /> Services
          </div>
          <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 3.75rem)", fontWeight: 800, color: "#111827", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "1.5rem" }}>
            AI Appointment Booking<br />
            <span style={{ color: "#4F46E5" }}>Zero No-Shows</span>
          </h1>
          <p style={{ fontSize: "1.125rem", color: "#6B7280", lineHeight: 1.7, marginBottom: "2.5rem", maxWidth: "600px", margin: "0 auto 2.5rem" }}>
            Let AI handle your entire booking workflow — from scheduling to reminders to rescheduling — so your team focuses on delivering great service, not managing calendars.
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

      <section style={{ padding: "5rem 2rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <p style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#4F46E5", marginBottom: "0.5rem" }}>Features</p>
            <h2 style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 800, color: "#111827", letterSpacing: "-0.025em" }}>The complete booking automation stack</h2>
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

      <section style={{ padding: "5rem 2rem", background: "#F9FAFB" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <p style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#4F46E5", marginBottom: "0.5rem" }}>Use Cases</p>
            <h2 style={{ fontSize: "clamp(1.75rem, 3vw, 2.25rem)", fontWeight: 800, color: "#111827", letterSpacing: "-0.025em", marginBottom: "1rem" }}>Works for any appointment-based business</h2>
            <p style={{ color: "#6B7280", lineHeight: 1.7, marginBottom: "2rem" }}>Whether you're a healthcare clinic, real estate agency, or home services company — our booking agents handle the entire scheduling lifecycle.</p>
            <a href="https://cal.com/dhananjay-goel/30min" target="_blank" rel="noopener noreferrer" style={{ background: "#4F46E5", color: "#fff", padding: "0.875rem 2rem", borderRadius: "8px", textDecoration: "none", fontWeight: 700, fontSize: "0.9375rem", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
              Get Started <ArrowRight size={16} />
            </a>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
              {useCases.map((uc) => (
                <div key={uc} style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "#fff", border: "1px solid #E5E7EB", borderRadius: "10px", padding: "0.75rem 1rem" }}>
                  <CheckCircle2 size={16} color="#4F46E5" strokeWidth={2.5} style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: "0.875rem", fontWeight: 500, color: "#374151" }}>{uc}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section style={{ padding: "5rem 2rem", background: "#4F46E5", textAlign: "center" }}>
        <h2 style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 800, color: "#fff", marginBottom: "1rem", letterSpacing: "-0.025em" }}>Fill your calendar on autopilot</h2>
        <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1.125rem", marginBottom: "2rem" }}>Book a demo to see how AI handles your entire appointment workflow.</p>
        <a href="https://cal.com/dhananjay-goel/30min" target="_blank" rel="noopener noreferrer" style={{ background: "#fff", color: "#4F46E5", padding: "1rem 2.5rem", borderRadius: "8px", textDecoration: "none", fontWeight: 700, fontSize: "1rem", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
          Book a Free Demo <ArrowRight size={16} />
        </a>
      </section>
    </div>
  );
}
