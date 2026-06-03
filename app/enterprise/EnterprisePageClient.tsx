"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Shield,
  Server,
  Lock,
  Zap,
  CheckCircle,
  ArrowRight,
  Calendar,
  Download,
  Users,
  Globe,
  Headphones,
  Building2,
  Database,
  FileText,
} from "lucide-react";

// ─── CONSTANTS ─────────────────────────────────────────────────────────
const enterpriseValueProps = [
  {
    icon: Headphones,
    title: "Dedicated Support",
    color: "#2563EB",
    items: [
      "24/7 premium support",
      "Dedicated account manager",
      "SLA guarantees",
      "Priority bug resolution",
    ],
  },
  {
    icon: Server,
    title: "Custom Deployment",
    color: "#7C3AED",
    items: [
      "On-premise options",
      "Private cloud deployment",
      "White-label solutions",
      "Custom integrations",
    ],
  },
  {
    icon: Lock,
    title: "Advanced Security",
    color: "#059669",
    items: [
      "SOC 2 Type II certified",
      "Custom security reviews",
      "Private data residency",
      "Enterprise SSO",
    ],
  },
  {
    icon: Zap,
    title: "Unlimited Scale",
    color: "#DC2626",
    items: [
      "Unlimited agents",
      "Unlimited calls",
      "Global infrastructure",
      "Auto-scaling",
    ],
  },
];

const successMetrics = [
  { value: "99.99%", label: "Uptime SLA" },
  { value: "<200ms", label: "Voice Response Time" },
  { value: "100+", label: "Concurrent Integrations" },
  { value: "500M+", label: "Calls Handled" },
];

const enterpriseOnlyFeatures = [
  "Custom agent training",
  "Bespoke workflows",
  "Dedicated infrastructure",
  "White-label options",
  "Multi-tenant architecture",
];

const onboardingPhases = [
  {
    week: "Week 1-2",
    title: "Discovery & Planning",
    description:
      "Deep-dive into your requirements, existing systems, and success metrics. We build a comprehensive roadmap tailored to your organization.",
  },
  {
    week: "Week 3-4",
    title: "Integration Setup",
    description:
      "Seamlessly connect with your CRM, telephony, and backend systems. Our engineers ensure zero disruption to your existing operations.",
  },
  {
    week: "Week 5-6",
    title: "Agent Training",
    description:
      "Train AI agents on your specific workflows, terminology, and business logic. Quality assurance at every step before going live.",
  },
  {
    week: "Week 7-8",
    title: "Go-Live & Monitoring",
    description:
      "Phased rollout with 24/7 support. Real-time monitoring, performance dashboards, and iterative optimization from day one.",
  },
];

const clientLogos = [
  "Fortune 500 Financial",
  "Global Healthcare",
  "Enterprise SaaS",
  "Retail Conglomerate",
  "Tech Unicorn",
];

const resources = [
  {
    icon: FileText,
    title: "Enterprise Datasheet",
    description: "Comprehensive overview of enterprise features, pricing, and capabilities",
    type: "PDF",
  },
  {
    icon: Shield,
    title: "Security Whitepaper",
    description: "Detailed security architecture, compliance certifications, and data handling",
    type: "PDF",
  },
  {
    icon: Database,
    title: "Integration Guide",
    description: "Technical documentation for CRM, telephony, and custom integrations",
    type: "Docs",
  },
];

// ─── ANIMATIONS ────────────────────────────────────────────────────────
const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

// ─── COMPONENTS ───────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      aria-label="Main navigation"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "#ffffff",
        borderBottom: "1px solid #E5E7EB",
        boxShadow: scrolled ? "0 2px 16px rgba(0,0,0,0.08)" : "none",
        transition: "box-shadow 0.2s ease",
        height: "68px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 2rem",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <a href="/" style={{ display: "flex", alignItems: "center", gap: "0.75rem", textDecoration: "none" }}>
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "8px",
              background: "linear-gradient(135deg, #1A2AB8 0%, #2563EB 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Building2 size={18} color="#fff" />
          </div>
          <span style={{ fontWeight: 700, fontSize: "1rem", color: "#0A1F6B" }}>
            Voice by Enlight Lab
          </span>
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <a
            href="/"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "0.9375rem",
              fontWeight: 500,
              color: "#374151",
              padding: "0.5rem 0.875rem",
              borderRadius: "6px",
              textDecoration: "none",
              transition: "color 0.15s, background 0.15s",
            }}
          >
            Home
          </a>
        </div>
        <a
          href="#contact"
          style={{
            background: "#1A2AB8",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            padding: "0.625rem 1.5rem",
            fontSize: "0.9375rem",
            fontWeight: 700,
            cursor: "pointer",
            textDecoration: "none",
            transition: "background 0.15s",
            whiteSpace: "nowrap",
          }}
        >
          Contact Enterprise Team
        </a>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <header className="enterprise-hero">
      <div className="enterprise-hero-bg" />
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem", position: "relative", zIndex: 1 }}>
        <motion.div {...fadeUp}>
          <div className="enterprise-badge">
            <Shield size={14} />
            <span>Enterprise Solutions</span>
          </div>
          <h1 className="enterprise-hero-title">
            Enterprise Solutions for
            <br />
            <span className="enterprise-hero-highlight">Mission-Critical Operations</span>
          </h1>
          <p className="enterprise-hero-subtitle">
            Purpose-built for scale, security, and success. Deploy enterprise-grade AI
            voice agents across your organization with dedicated support and unlimited
            scale.
          </p>
          <div className="enterprise-hero-cta">
            <a href="#contact" className="btn-primary-enterprise">
              Schedule a Technical Deep-Dive
              <ArrowRight size={16} />
            </a>
            <a href="#features" className="btn-secondary-enterprise">
              Explore Enterprise Features
            </a>
          </div>
        </motion.div>
      </div>
    </header>
  );
}

function ValuePropositions() {
  return (
    <section className="enterprise-section">
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem" }}>
        <motion.div
          className="reveal"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
        >
          <div className="section-eyebrow-dark">Why Enterprise</div>
          <h2 className="enterprise-section-title">
            Everything you need to run
            <br />
            mission-critical voice operations
          </h2>
        </motion.div>
        <div className="value-prop-grid">
          {enterpriseValueProps.map((prop, i) => (
            <motion.div
              key={prop.title}
              className="value-prop-card reveal"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" as const }}
              style={{ "--prop-color": prop.color } as React.CSSProperties}
            >
              <div className="value-prop-icon" style={{ background: `${prop.color}15`, color: prop.color }}>
                <prop.icon size={24} />
              </div>
              <h3 className="value-prop-title">{prop.title}</h3>
              <ul className="value-prop-list">
                {prop.items.map((item) => (
                  <li key={item} className="value-prop-item">
                    <CheckCircle size={14} style={{ color: prop.color, flexShrink: 0 }} />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SuccessMetrics() {
  return (
    <section className="metrics-section">
      <div className="metrics-bg" />
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem", position: "relative", zIndex: 1 }}>
        <motion.div
          className="reveal"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
        >
          <div className="section-eyebrow-light">Performance</div>
          <h2 className="enterprise-section-title-light">
            Enterprise-grade reliability
            <br />& performance
          </h2>
        </motion.div>
        <div className="metrics-grid">
          {successMetrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              className="metric-card reveal"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" as const }}
            >
              <div className="metric-value">{metric.value}</div>
              <div className="metric-label">{metric.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EnterpriseFeatures() {
  return (
    <section id="features" className="enterprise-section features-section">
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem" }}>
        <motion.div
          className="reveal"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
        >
          <div className="section-eyebrow-dark">Exclusive Features</div>
          <h2 className="enterprise-section-title">
            Capabilities only available
            <br />at the enterprise tier
          </h2>
        </motion.div>
        <div className="features-grid">
          {enterpriseOnlyFeatures.map((feature, i) => (
            <motion.div
              key={feature}
              className="feature-card reveal"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" as const }}
            >
              <div className="feature-check">
                <CheckCircle size={20} />
              </div>
              <span className="feature-text">{feature}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function OnboardingProgram() {
  return (
    <section className="onboarding-section">
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem" }}>
        <motion.div
          className="reveal"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
        >
          <div className="section-eyebrow-dark">Onboarding</div>
          <h2 className="enterprise-section-title">
            Guided enterprise
            <br />onboarding program
          </h2>
          <p className="onboarding-intro">
            From discovery to deployment in 8 weeks. Our dedicated team ensures a
            smooth transition with comprehensive support at every step.
          </p>
        </motion.div>
        <div className="onboarding-grid">
          {onboardingPhases.map((phase, i) => (
            <motion.div
              key={phase.week}
              className="onboarding-card reveal"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" as const }}
            >
              <div className="onboarding-week">{phase.week}</div>
              <div className="onboarding-connector" />
              <h3 className="onboarding-title">{phase.title}</h3>
              <p className="onboarding-description">{phase.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ClientLogos() {
  return (
    <section className="logos-section">
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem" }}>
        <motion.div
          className="reveal"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
        >
          <div className="logos-header">Trusted by Industry Leaders</div>
          <div className="logos-grid">
            {clientLogos.map((logo) => (
              <div key={logo} className="logo-item">
                <Building2 size={28} style={{ color: "#1A2AB8" }} />
                <span className="logo-text">{logo}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Resources() {
  return (
    <section className="enterprise-section resources-section">
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem" }}>
        <motion.div
          className="reveal"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
        >
          <div className="section-eyebrow-dark">Resources</div>
          <h2 className="enterprise-section-title">
            Enterprise documentation
            <br />& resources
          </h2>
        </motion.div>
        <div className="resources-grid">
          {resources.map((resource, i) => (
            <motion.div
              key={resource.title}
              className="resource-card reveal"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" as const }}
            >
              <div className="resource-icon">
                <resource.icon size={24} />
              </div>
              <div className="resource-content">
                <div className="resource-header">
                  <h3 className="resource-title">{resource.title}</h3>
                  <span className="resource-type">{resource.type}</span>
                </div>
                <p className="resource-description">{resource.description}</p>
              </div>
              <button className="resource-download">
                <Download size={16} />
                Download
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EnterpriseCTA() {
  return (
    <section id="contact" className="cta-section">
      <div className="cta-bg" />
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 2rem", position: "relative", zIndex: 1 }}>
        <motion.div
          className="reveal"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
        >
          <div className="enterprise-badge" style={{ marginBottom: "1.5rem" }}>
            <Users size={14} />
            <span>Enterprise Team</span>
          </div>
          <h2 className="cta-title">Ready for enterprise?</h2>
          <p className="cta-subtitle">
            Connect with our enterprise team for a technical deep-dive into our
            platform. Get a customized solution designed for your organization.
          </p>
          <div className="cta-buttons">
            <button className="btn-cta-primary">
              <Calendar size={18} />
              Schedule a Technical Deep-Dive
            </button>
            <button className="btn-cta-secondary">
              Contact Enterprise Team
              <ArrowRight size={18} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="enterprise-footer">
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo">
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "8px",
                  background: "linear-gradient(135deg, #1A2AB8 0%, #2563EB 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Building2 size={18} color="#fff" />
              </div>
              <span style={{ fontWeight: 700, fontSize: "1rem", color: "#fff" }}>
                Voice by Enlight Lab
              </span>
            </div>
            <p className="footer-tagline">
              Enterprise AI Voice Agents for mission-critical operations.
            </p>
          </div>
          <div className="footer-links">
            <a href="/" className="footer-link">Home</a>
            <a href="#features" className="footer-link">Features</a>
            <a href="#contact" className="footer-link">Contact</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-copyright">Copyright 2026 Enlight Lab. All Rights Reserved.</p>
          <div className="footer-legal">
            <a href="#" className="footer-legal-link">Privacy Policy</a>
            <a href="#" className="footer-legal-link">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── PAGE ──────────────────────────────────────────────────────────────
export default function EnterprisePageClient() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            observer.unobserve(e.target);
          }
        }),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#ffffff" }}>
      <Navbar />
      <Hero />
      <ValuePropositions />
      <SuccessMetrics />
      <EnterpriseFeatures />
      <OnboardingProgram />
      <ClientLogos />
      <Resources />
      <EnterpriseCTA />
      <Footer />
    </div>
  );
}