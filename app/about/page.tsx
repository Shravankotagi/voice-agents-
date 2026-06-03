"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Globe, Users, Building2, Award, Target, Shield,
  Heart, Lightbulb, TrendingUp, Star, Mail, Phone,
  MapPin,   ChevronRight, Briefcase,
  Sparkles, Zap, Clock, Globe2
} from "lucide-react";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

// Leadership team data
const leadershipTeam = [
  {
    name: "Priya Sharma",
    role: "CEO & Founder",
    background: "Former AI Research Director at Google, Stanford MBA. 15+ years building enterprise AI solutions.",
    image: "/placeholder-avatar-1.jpg"
  },
  {
    name: "Michael Chen",
    role: "Chief Technology Officer",
    background: "Ex-Microsoft Azure AI Platform Lead. Built systems serving 100M+ daily requests.",
    image: "/placeholder-avatar-2.jpg"
  },
  {
    name: "Sarah Mitchell",
    role: "VP of Product",
    background: "15+ years at Salesforce and ServiceNow. Led product teams delivering $500M+ ARR.",
    image: "/placeholder-avatar-3.jpg"
  },
  {
    name: "David Okonkwo",
    role: "VP of Sales",
    background: "Enterprise SaaS leader from Twilio and Zendesk. Built teams scaling to $100M+ revenue.",
    image: "/placeholder-avatar-4.jpg"
  },
  {
    name: "Emily Rodriguez",
    role: "Head of Customer Success",
    background: "Customer experience expert from HubSpot. Pioneered CS frameworks for enterprise AI.",
    image: "/placeholder-avatar-5.jpg"
  }
];

// Values data
const values = [
  { icon: Heart, title: "Customer-First", description: "Every decision starts with understanding our customers' needs and measuring their success." },
  { icon: Lightbulb, title: "Innovation at Core", description: "We push boundaries constantly, shipping features that reshape how enterprises interact with AI." },
  { icon: Shield, title: "Transparency & Trust", description: "Open communication, clear pricing, honest timelines. We do what we say." },
  { icon: Target, title: "Excellence", description: "We hold ourselves to the highest standards in everything we build and deliver." }
];

// Stats data
const stats = [
  { value: "50+", label: "Employees" },
  { value: "3", label: "Global Offices" },
  { value: "500+", label: "Enterprise Customers" },
  { value: "$10M+", label: "ARR" }
];

// Press mentions
const pressMentions = [
  { name: "TechCrunch", title: "Top 10 AI Startups to Watch", year: "2025" },
  { name: "Forbes", title: "Most Innovative AI Companies", year: "2025" },
  { name: "VentureBeat", title: "AI Innovation Award", year: "2024" }
];

// Open positions
const openPositions = [
  "Senior AI Engineer",
  "Product Manager - Enterprise",
  "Enterprise Account Executive",
  "Customer Success Manager",
  "Solutions Architect"
];

// Benefits
const benefits = [
  { icon: Globe, title: "Remote-First", description: "Work from anywhere in the world" },
  { icon: Sparkles, title: "Equity & Compensation", description: "Competitive salary with equity stake" },
  { icon: Zap, title: "Cutting-Edge Tech", description: "Access to latest AI tools and infrastructure" },
  { icon: Clock, title: "Flexible Hours", description: "Async-friendly with flexible schedules" },
  { icon: TrendingUp, title: "Growth Path", description: "Clear progression and learning budget" },
  { icon: Star, title: "Premium Benefits", description: "Health, dental, vision for you and family" }
];

// Navbar component
function Navbar() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <nav style={{ position: "sticky", top: 0, zIndex: 50, background: "#ffffff", borderBottom: "1px solid #E5E7EB", height: "68px", display: "flex", alignItems: "center" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem", width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", cursor: "pointer" }} onClick={() => window.location.href = "/"}>
          <div style={{ width: "34px", height: "34px", borderRadius: "8px", background: "#2563EB", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#fff" }} />
          </div>
          <span style={{ fontSize: "1.125rem", fontWeight: 700, color: "#0A1F6B" }}>Voice by Enlight Lab</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
          {[
            { label: "About", id: "hero" },
            { label: "Team", id: "leadership" },
            { label: "Careers", id: "careers" },
            { label: "Contact", id: "contact" },
          ].map((item) => (
            <button key={item.label} onClick={() => scrollTo(item.id)}
              style={{ background: "none", border: "none", cursor: "pointer", fontSize: "0.9375rem", fontWeight: 500, color: "#374151", padding: "0.5rem 0.875rem", borderRadius: "6px", transition: "color 0.15s, background 0.15s" }}
              onMouseEnter={e => { e.currentTarget.style.color = "#2563EB"; e.currentTarget.style.background = "#EFF6FF"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "#374151"; e.currentTarget.style.background = "none"; }}
            >{item.label}</button>
          ))}
          <button onClick={() => scrollTo("contact")}
            style={{ marginLeft: "0.5rem", background: "#2563EB", color: "#fff", border: "none", borderRadius: "8px", padding: "0.625rem 1.5rem", fontSize: "0.9375rem", fontWeight: 700, cursor: "pointer", transition: "background 0.15s" }}
            onMouseEnter={e => { e.currentTarget.style.background = "#1D4ED8"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#2563EB"; }}
          >Get in Touch</button>
        </div>
      </div>
    </nav>
  );
}

// Footer component
function Footer() {
  return (
    <footer style={{ background: "#0A1F6B", padding: "3rem 0 2rem" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem" }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "2rem", marginBottom: "2rem" }}>
          <div style={{ maxWidth: "320px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
              <div style={{ width: "34px", height: "34px", borderRadius: "8px", background: "#2563EB", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#fff" }} />
              </div>
              <span style={{ fontSize: "1.125rem", fontWeight: 700, color: "#fff" }}>Voice by Enlight Lab</span>
            </div>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.875rem", lineHeight: 1.6 }}>
              Transforming enterprise customer operations with AI voice technology.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.25rem" }}>
              <button style={{ padding: "0.5rem", borderRadius: "6px", background: "rgba(255,255,255,0.1)", border: "none", cursor: "pointer" }}>
                <Globe size={18} color="#fff" />
              </button>
              <button style={{ padding: "0.5rem", borderRadius: "6px", background: "rgba(255,255,255,0.1)", border: "none", cursor: "pointer" }}>
                <Globe size={18} color="#fff" />
              </button>
            </div>
          </div>
          <div style={{ display: "flex", gap: "4rem", flexWrap: "wrap" }}>
            <div>
              <h4 style={{ color: "#fff", fontSize: "0.875rem", fontWeight: 700, marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>Company</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                {["About", "Careers", "Press", "Contact"].map(link => (
                  <button key={link} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.7)", fontSize: "0.875rem", cursor: "pointer", textAlign: "left", padding: 0 }}>{link}</button>
                ))}
              </div>
            </div>
            <div>
              <h4 style={{ color: "#fff", fontSize: "0.875rem", fontWeight: 700, marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>Contact</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.875rem" }}>hello@enlightai.com</span>
                <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.875rem" }}>+1 (415) 555-0123</span>
                <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.875rem" }}>San Francisco, CA</span>
              </div>
            </div>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8125rem" }}>© 2024 Voice by Enlight Lab. All rights reserved.</p>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {["Privacy Policy", "Terms of Service"].map(link => (
              <button key={link} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.5)", fontSize: "0.8125rem", cursor: "pointer" }}>{link}</button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// Stat card component
function StatCard({ value, label, delay = 0 }: { value: string; label: string; delay?: number }) {
  return (
    <motion.div
      variants={fadeInUp}
      style={{ textAlign: "center", padding: "1.5rem" }}
    >
      <div style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: "#2563EB", marginBottom: "0.5rem", letterSpacing: "-0.03em" }}>
        {value}
      </div>
      <div style={{ fontSize: "0.9375rem", color: "#6B7280", fontWeight: 500 }}>{label}</div>
    </motion.div>
  );
}

// Value card component
function ValueCard({ icon: Icon, title, description, delay = 0 }: { icon: React.ElementType; title: string; description: string; delay?: number }) {
  return (
    <motion.div
      variants={fadeInUp}
      style={{
        padding: "1.75rem",
        background: "#fff",
        borderRadius: "14px",
        border: "1.5px solid #E5E7EB",
        boxShadow: "0 1px 3px rgba(0,0,0,0.06)"
      }}
    >
      <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "#EFF6FF", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem" }}>
        <Icon size={24} color="#2563EB" />
      </div>
      <h3 style={{ fontSize: "1.125rem", fontWeight: 700, color: "#0A1F6B", marginBottom: "0.625rem" }}>{title}</h3>
      <p style={{ fontSize: "0.9rem", color: "#6B7280", lineHeight: 1.6 }}>{description}</p>
    </motion.div>
  );
}

// Leadership card component
function LeadershipCard({ name, role, background }: { name: string; role: string; background: string }) {
  return (
    <motion.div
      variants={fadeInUp}
      style={{
        background: "#fff",
        borderRadius: "14px",
        overflow: "hidden",
        border: "1.5px solid #E5E7EB",
        boxShadow: "0 1px 3px rgba(0,0,0,0.06)"
      }}
    >
      <div style={{ height: "180px", background: "linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "#2563EB", display: "flex", alignItems: "center", justifyContent: "center", border: "3px solid #fff", boxShadow: "0 4px 12px rgba(37,99,235,0.3)" }}>
          <span style={{ fontSize: "1.5rem", fontWeight: 700, color: "#fff" }}>{name.split(" ").map(n => n[0]).join("")}</span>
        </div>
      </div>
      <div style={{ padding: "1.5rem" }}>
        <h3 style={{ fontSize: "1.125rem", fontWeight: 700, color: "#0A1F6B", marginBottom: "0.25rem" }}>{name}</h3>
        <p style={{ fontSize: "0.875rem", color: "#2563EB", fontWeight: 600, marginBottom: "0.875rem" }}>{role}</p>
        <p style={{ fontSize: "0.8125rem", color: "#6B7280", lineHeight: 1.6 }}>{background}</p>
      </div>
    </motion.div>
  );
}

// Benefit card component
function BenefitCard({ icon: Icon, title, description }: { icon: React.ElementType; title: string; description: string }) {
  return (
    <div style={{ display: "flex", gap: "1rem", padding: "1.25rem", background: "#fff", borderRadius: "10px", border: "1px solid #E5E7EB" }}>
      <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "#EFF6FF", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Icon size={20} color="#2563EB" />
      </div>
      <div>
        <h4 style={{ fontSize: "0.9375rem", fontWeight: 700, color: "#0A1F6B", marginBottom: "0.25rem" }}>{title}</h4>
        <p style={{ fontSize: "0.8125rem", color: "#6B7280" }}>{description}</p>
      </div>
    </div>
  );
}

// Main About Page
export default function AboutPage() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("visible"); observer.unobserve(e.target); }
      }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#F8F9FC" }}>
      <Navbar />

      {/* Hero Section */}
      <section id="hero" style={{ padding: "5rem 0 4rem", background: "linear-gradient(180deg, #EFF6FF 0%, #F8F9FC 100%)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem", textAlign: "center" }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" as const }}
          >
            <span style={{ display: "inline-block", padding: "0.375rem 1rem", borderRadius: "9999px", background: "#DBEAFE", color: "#2563EB", fontSize: "0.8125rem", fontWeight: 700, marginBottom: "1.5rem" }}>
              About Voice by Enlight Lab
            </span>
            <h1 style={{ fontSize: "clamp(2.25rem, 5vw, 3.5rem)", fontWeight: 800, color: "#0A1F6B", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "1.5rem" }}>
              Transforming Enterprise Customer Operations with AI Voice
            </h1>
            <p style={{ fontSize: "1.125rem", color: "#4B5563", maxWidth: "720px", margin: "0 auto 2rem", lineHeight: 1.7 }}>
              We're on a mission to make enterprise AI accessible, reliable, and impactful.
              From healthcare to banking, we help organizations automate customer interactions
              without sacrificing the human touch.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section style={{ padding: "5rem 0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "4rem", alignItems: "center" }}>
          <motion.div
            className="reveal"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" as const }}
          >
            <span style={{ display: "inline-block", fontSize: "0.75rem", fontWeight: 700, color: "#2563EB", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.75rem" }}>Our Story</span>
            <h2 style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 800, color: "#0A1F6B", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "1.25rem" }}>
              Founded in 2022 with a vision to democratize enterprise AI
            </h2>
            <p style={{ fontSize: "1rem", color: "#4B5563", lineHeight: 1.7, marginBottom: "1.25rem" }}>
              We started with a simple observation: while AI was transforming consumer experiences,
              enterprise customers were still stuck with outdated, expensive customer service solutions.
            </p>
            <p style={{ fontSize: "1rem", color: "#4B5563", lineHeight: 1.7 }}>
              Our founders — veterans from Google, Microsoft, and Salesforce — set out to change that.
              Today, our growing team spans San Francisco, London, and Singapore, united by the belief
              that enterprise AI should be powerful, affordable, and trustworthy.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" as const }}
            style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", justifyContent: "center" }}
          >
            {[
              { icon: Building2, label: "San Francisco", detail: "HQ" },
              { icon: Globe, label: "London", detail: "EMEA" },
              { icon: Globe, label: "Singapore", detail: "APAC" }
            ].map((loc) => (
              <div key={loc.label} style={{ flex: "1 1 200px", padding: "1.5rem", background: "#fff", borderRadius: "12px", border: "1.5px solid #E5E7EB", textAlign: "center" }}>
                <loc.icon size={28} color="#2563EB" style={{ marginBottom: "0.75rem" }} />
                <div style={{ fontSize: "1rem", fontWeight: 700, color: "#0A1F6B" }}>{loc.label}</div>
                <div style={{ fontSize: "0.8125rem", color: "#2563EB" }}>{loc.detail}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ padding: "4rem 0", background: "#0A1F6B" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 2rem" }}>
          <motion.div
            className="reveal"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "2rem" }}
          >
            {stats.map((stat, i) => (
              <StatCard key={i} value={stat.value} label={stat.label} delay={i * 0.1} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission & Values Section */}
      <section style={{ padding: "5rem 0", background: "#fff" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem" }}>
          <motion.div
            className="reveal"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: "center", marginBottom: "3rem" }}
          >
            <span style={{ display: "inline-block", fontSize: "0.75rem", fontWeight: 700, color: "#2563EB", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.75rem" }}>What We Believe</span>
            <h2 style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 800, color: "#0A1F6B", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
              Our Mission & Values
            </h2>
          </motion.div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" }}
          >
            {values.map((value, i) => (
              <ValueCard key={i} icon={value.icon} title={value.title} description={value.description} delay={i * 0.1} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Leadership Team Section */}
      <section id="leadership" style={{ padding: "5rem 0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem" }}>
          <motion.div
            className="reveal"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: "center", marginBottom: "3rem" }}
          >
            <span style={{ display: "inline-block", fontSize: "0.75rem", fontWeight: 700, color: "#2563EB", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.75rem" }}>The People Behind the Platform</span>
            <h2 style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 800, color: "#0A1F6B", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
              Leadership Team
            </h2>
          </motion.div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}
          >
            {leadershipTeam.map((member, i) => (
              <LeadershipCard key={i} name={member.name} role={member.role} background={member.background} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Culture Section */}
      <section style={{ padding: "5rem 0", background: "#fff" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "4rem", alignItems: "center" }}>
            <motion.div
              className="reveal"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span style={{ display: "inline-block", fontSize: "0.75rem", fontWeight: 700, color: "#2563EB", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.75rem" }}>How We Work</span>
              <h2 style={{ fontSize: "clamp(1.75rem, 3vw, 2.25rem)", fontWeight: 800, color: "#0A1F6B", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "1.25rem" }}>
                Our Culture
              </h2>
              <p style={{ fontSize: "1rem", color: "#4B5563", lineHeight: 1.7, marginBottom: "1rem" }}>
                We're a remote-first company with team members across 12 countries.
                We believe in flat hierarchies, async communication, and trusting our people.
              </p>
              <p style={{ fontSize: "1rem", color: "#4B5563", lineHeight: 1.7 }}>
                Work-life balance isn't just a buzzword — it's how we build sustainable,
                innovative products. Whether you're an early bird or a night owl,
                we measure outcomes, not hours.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              {[
                { emoji: "🌍", text: "Remote-first: work from anywhere" },
                { emoji: "🌈", text: "Diverse team across 12 countries" },
                { emoji: "👥", text: "Flat hierarchy, big impact" },
                { emoji: "⚖️", text: "Focus on work-life balance" },
                { emoji: "📈", text: "Clear growth paths" }
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1rem", background: "#F8F9FC", borderRadius: "8px" }}>
                  <span style={{ fontSize: "1.25rem" }}>{item.emoji}</span>
                  <span style={{ fontSize: "0.9375rem", fontWeight: 500, color: "#374151" }}>{item.text}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Press & Media Section */}
      <section style={{ padding: "5rem 0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem" }}>
          <motion.div
            className="reveal"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: "center", marginBottom: "3rem" }}
          >
            <span style={{ display: "inline-block", fontSize: "0.75rem", fontWeight: 700, color: "#2563EB", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.75rem" }}>Recognition</span>
            <h2 style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 800, color: "#0A1F6B", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
              Press & Awards
            </h2>
          </motion.div>
          <motion.div
            className="reveal"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "1.5rem" }}
          >
            {pressMentions.map((press, i) => (
              <div key={i} style={{ padding: "1.5rem 2rem", background: "#fff", borderRadius: "12px", border: "1.5px solid #E5E7EB", textAlign: "center", minWidth: "220px" }}>
                <Award size={32} color="#2563EB" style={{ marginBottom: "0.75rem" }} />
                <div style={{ fontSize: "1rem", fontWeight: 700, color: "#0A1F6B", marginBottom: "0.25rem" }}>{press.name}</div>
                <div style={{ fontSize: "0.875rem", color: "#374151", marginBottom: "0.375rem" }}>{press.title}</div>
                <div style={{ fontSize: "0.75rem", color: "#9CA3AF" }}>{press.year}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Careers Section */}
      <section id="careers" style={{ padding: "5rem 0", background: "linear-gradient(180deg, #F8F9FC 0%, #EFF6FF 100%)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem" }}>
          <motion.div
            className="reveal"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: "center", marginBottom: "3rem" }}
          >
            <span style={{ display: "inline-block", fontSize: "0.75rem", fontWeight: 700, color: "#2563EB", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.75rem" }}>Join Our Team</span>
            <h2 style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 800, color: "#0A1F6B", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
              Build the Future of Enterprise AI
            </h2>
            <p style={{ fontSize: "1rem", color: "#6B7280", maxWidth: "600px", margin: "1rem auto 2rem", lineHeight: 1.7 }}>
              We're growing fast and looking for talented people who want to make an impact.
              Explore our open positions and join us on this journey.
            </p>
          </motion.div>

          {/* Open Positions */}
          <motion.div
            className="reveal"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem", marginBottom: "3rem" }}
          >
            {openPositions.map((position, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.25rem 1.5rem", background: "#fff", borderRadius: "10px", border: "1.5px solid #E5E7EB", cursor: "pointer", transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#2563EB"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(37,99,235,0.1)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#E5E7EB"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
                  <Briefcase size={20} color="#2563EB" />
                  <span style={{ fontSize: "0.9375rem", fontWeight: 600, color: "#0A1F6B" }}>{position}</span>
                </div>
                <ChevronRight size={18} color="#9CA3AF" />
              </div>
            ))}
          </motion.div>

          {/* Benefits */}
          <motion.div
            className="reveal"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#0A1F6B", textAlign: "center", marginBottom: "1.5rem" }}>Why Join Us</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem" }}>
              {benefits.map((benefit, i) => (
                <BenefitCard key={i} icon={benefit.icon} title={benefit.title} description={benefit.description} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" style={{ padding: "5rem 0", background: "#0A1F6B" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 2rem", textAlign: "center" }}>
          <motion.div
            className="reveal"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span style={{ display: "inline-block", fontSize: "0.75rem", fontWeight: 700, color: "#60A5FA", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.75rem" }}>Get in Touch</span>
            <h2 style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "1rem" }}>
              Let's Talk
            </h2>
            <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.7, marginBottom: "2.5rem" }}>
              Whether you have questions about our platform, want to discuss partnership opportunities,
              or have a press inquiry, we'd love to hear from you.
            </p>
            <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "1.5rem", marginBottom: "2.5rem" }}>
              {[
                { icon: Mail, title: "General Inquiries", email: "hello@enlightai.com" },
                { icon: Globe, title: "Press Inquiries", email: "press@enlightai.com" },
                { icon: Building2, title: "Partnerships", email: "partners@enlightai.com" }
              ].map((contact, i) => (
                <div key={i} style={{ padding: "1.5rem 2rem", background: "rgba(255,255,255,0.08)", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.15)", textAlign: "center", minWidth: "240px" }}>
                  <contact.icon size={24} color="#60A5FA" style={{ marginBottom: "0.75rem" }} />
                  <div style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.6)", marginBottom: "0.375rem" }}>{contact.title}</div>
                  <div style={{ fontSize: "0.9375rem", color: "#fff", fontWeight: 600 }}>{contact.email}</div>
                </div>
              ))}
            </div>
            <button
              style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.875rem 2rem", background: "#fff", color: "#0A1F6B", border: "none", borderRadius: "8px", fontSize: "0.9375rem", fontWeight: 700, cursor: "pointer", transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "#F0F0FF"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#fff"; }}
            >
              <Phone size={16} /> Contact Us
            </button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}