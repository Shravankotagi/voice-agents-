"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Brain,
  MessageSquare,
  Volume2,
  Plug,
  BarChart3,
  Shield,
  Globe,
  Server,
  Zap,
  ChevronRight,
  CheckCircle2,
  Calendar,
  Phone,
  Headphones,
  Users,
} from "lucide-react";

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Feature card component
const FeatureCard = ({
  icon: Icon,
  title,
  description,
  features,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  features: string[];
}) => (
  <motion.div
    {...fadeInUp}
    className="group relative bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:border-blue-100 transition-all duration-300"
  >
    {/* Icon container */}
    <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center mb-6 group-hover:bg-blue-100 transition-colors duration-300">
      <Icon className="w-7 h-7 text-[#2563EB]" />
    </div>

    {/* Title */}
    <h3 className="text-xl font-bold text-[#0A1F6B] mb-3">{title}</h3>

    {/* Description */}
    <p className="text-gray-600 mb-5 leading-relaxed">{description}</p>

    {/* Feature list */}
    <ul className="space-y-2">
      {features.map((feature, index) => (
        <li key={index} className="flex items-start gap-2 text-sm text-gray-500">
          <CheckCircle2 className="w-4 h-4 text-[#2563EB] mt-0.5 flex-shrink-0" />
          <span>{feature}</span>
        </li>
      ))}
    </ul>

    {/* Hover gradient overlay */}
    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-50/0 to-blue-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
  </motion.div>
);

// Integration category component
const IntegrationCategory = ({
  category,
  integrations,
  delay,
}: {
  category: { name: string; icon: React.ElementType };
  integrations: string[];
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay, ease: "easeOut" as const }}
    className="bg-white rounded-xl p-6 border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300"
  >
    <div className="flex items-center gap-3 mb-4">
      <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
        <category.icon className="w-5 h-5 text-[#2563EB]" />
      </div>
      <h4 className="font-semibold text-[#0A1F6B]">{category.name}</h4>
    </div>
    <div className="flex flex-wrap gap-2">
      {integrations.map((integration, index) => (
        <span
          key={index}
          className="px-3 py-1.5 bg-gray-50 text-gray-700 text-sm rounded-lg font-medium"
        >
          {integration}
        </span>
      ))}
    </div>
  </motion.div>
);

// Technology stat component
const TechStat = ({
  value,
  label,
  delay,
}: {
  value: string;
  label: string;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay, ease: "easeOut" as const }}
    className="text-center"
  >
    <div className="text-4xl font-bold text-[#2563EB] mb-2">{value}</div>
    <div className="text-gray-600 text-sm">{label}</div>
  </motion.div>
);

// Navigation
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
        <Image
          src="/Layer_1.png"
          alt="Enlight AI"
          width={160}
          height={40}
          style={{ objectFit: "contain", height: "36px", width: "auto" }}
          priority
        />
        <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
          {[
            { label: "Home", href: "/" },
            { label: "Features", href: "/features" },
            { label: "Agents", href: "/" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "0.9375rem",
                fontWeight: 500,
                color:
                  item.label === "Features" ? "#2563EB" : "#374151",
                padding: "0.5rem 0.875rem",
                borderRadius: "6px",
                transition: "color 0.15s, background 0.15s",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#2563EB";
                e.currentTarget.style.background = "#EFF6FF";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color =
                  item.label === "Features" ? "#2563EB" : "#374151";
                e.currentTarget.style.background = "none";
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
        <a
          href="#contact"
          style={{
            background: "#2563EB",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            padding: "0.625rem 1.5rem",
            fontSize: "0.9375rem",
            fontWeight: 700,
            cursor: "pointer",
            transition: "background 0.15s",
            whiteSpace: "nowrap",
            textDecoration: "none",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#1D4ED8";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#2563EB";
          }}
        >
          Book a Demo
        </a>
      </div>
    </nav>
  );
}

// Footer component
function Footer() {
  const footerCols = [
    {
      title: "Services",
      links: [
        "AI Voice Agents",
        "AI Consulting",
        "Automation Solutions",
        "Enterprise Integrations",
      ],
    },
    {
      title: "Industries",
      links: ["Healthcare", "BFSI", "Hospitality", "Ecommerce", "EdTech"],
    },
    {
      title: "Technologies",
      links: [
        "Retell AI",
        "Voice Synthesis",
        "Real-time STT",
        "LLM Orchestration",
      ],
    },
    {
      title: "Company",
      links: ["About Us", "Case Studies", "Blogs", "Careers", "Contact"],
    },
  ];

  const trustLogos = [
    "Mozilla Foundation",
    "Emblazer",
    "Go2Andaman",
    "Homeloft",
    "HUMA",
  ];

  return (
    <footer>
      <div
        style={{
          background: "#1A2AB8",
          padding: "1.5rem 0",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 1.5rem",
            display: "flex",
            alignItems: "center",
            gap: "2rem",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontSize: "0.8125rem",
              fontWeight: 500,
              color: "rgba(255,255,255,0.7)",
              whiteSpace: "nowrap",
            }}
          >
            Trusted by Fortune-Grade Global Leaders
          </span>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "2rem",
              flexWrap: "wrap",
            }}
          >
            {trustLogos.map((logo) => (
              <span
                key={logo}
                style={{
                  fontSize: "0.8125rem",
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.8)",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                {logo}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div
        style={{
          background: "#fff",
          borderTop: "1px solid #E5E7EB",
          padding: "3.5rem 0 0",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 1.5rem 3rem",
            display: "grid",
            gridTemplateColumns: "220px repeat(4, 1fr)",
            gap: "2.5rem",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <Image
              src="/Layer_1.png"
              alt="Enlight AI"
              width={140}
              height={36}
              style={{ objectFit: "contain", height: "32px", width: "auto" }}
            />
            <p
              style={{
                fontSize: "0.875rem",
                color: "#6B7280",
                lineHeight: 1.6,
              }}
            >
              Enterprise AI Voice Agents for healthcare, BFSI, hospitality,
              ecommerce, and education.
            </p>
            <a
              href="mailto:contact@enlightai.com"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#2563EB",
                fontSize: "0.875rem",
                fontWeight: 600,
                padding: 0,
                textAlign: "left",
                textDecoration: "underline",
              }}
            >
              contact@enlightai.com
            </a>
          </div>
          {footerCols.map((col) => (
            <div key={col.title}>
              <div
                style={{
                  fontSize: "0.875rem",
                  fontWeight: 700,
                  color: "#2563EB",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  marginBottom: "1.25rem",
                }}
              >
                {col.title}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {col.links.map((link) => (
                  <a
                    key={link}
                    href="#"
                    style={{
                      fontSize: "0.875rem",
                      color: "#374151",
                      textDecoration: "none",
                      transition: "color 0.15s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#2563EB";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "#374151";
                    }}
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "1.25rem 1.5rem",
            borderTop: "1px solid #E5E7EB",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <p style={{ fontSize: "0.8125rem", color: "#6B7280" }}>
            Copyright 2026 Enlight AI. All Rights Reserved.
          </p>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {["Privacy Policy", "Terms of Use"].map((link) => (
              <a
                key={link}
                href="#"
                style={{
                  fontSize: "0.8125rem",
                  color: "#6B7280",
                  textDecoration: "none",
                  transition: "color 0.15s",
                }}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// Main page component
export default function FeaturesPage() {
  const features = [
    {
      icon: Brain,
      title: "Natural Language Understanding",
      description:
        "Advanced NLU engine that comprehends context, detects intent, and extracts entities in real-time for human-like understanding.",
      features: [
        "Advanced NLU for context comprehension",
        "Multi-intent detection",
        "Entity extraction and routing",
      ],
    },
    {
      icon: MessageSquare,
      title: "Multi-Turn Conversation",
      description:
        "Sophisticated dialogue management that maintains context across complex conversations and handles graceful handoffs.",
      features: [
        "Handle complex dialogues",
        "Remember context across calls",
        "Graceful handoffs when needed",
      ],
    },
    {
      icon: Volume2,
      title: "Real-Time Voice Synthesis",
      description:
        "Human-like speech generation with emotion detection and response modulation for natural conversations.",
      features: [
        "Human-like speech generation",
        "Emotion detection and response",
        "Sub-second latency",
      ],
    },
    {
      icon: Plug,
      title: "Enterprise Integrations",
      description:
        "Seamless connections to your existing enterprise stack including CRMs, telephony systems, and custom APIs.",
      features: [
        "Salesforce, HubSpot, Zendesk",
        "Twilio, Genesys, NICE",
        "Custom API webhooks",
      ],
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description:
        "Comprehensive insights including call transcripts, sentiment analysis, and performance metrics in real-time.",
      features: [
        "Call transcripts and insights",
        "Sentiment analysis",
        "Performance metrics",
      ],
    },
    {
      icon: Shield,
      title: "Security & Compliance",
      description:
        "Enterprise-grade security with SOC2 Type II certification, HIPAA compliance, and GDPR readiness.",
      features: [
        "SOC2 Type II certified",
        "HIPAA compliant",
        "GDPR ready",
        "Data encryption",
      ],
    },
  ];

  const integrationCategories = [
    {
      name: "CRM",
      icon: Users,
      integrations: ["Salesforce", "HubSpot", "Pipedrive", "Zoho"],
    },
    {
      name: "Telephony",
      icon: Phone,
      integrations: ["Twilio", "Genesys", "NICE", "Asterisk"],
    },
    {
      name: "Helpdesk",
      icon: Headphones,
      integrations: ["Zendesk", "Freshdesk", "Intercom"],
    },
    {
      name: "Calendar",
      icon: Calendar,
      integrations: ["Google Calendar", "Outlook"],
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            observer.unobserve(e.target);
          }
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
      <section
        style={{
          position: "relative",
          padding: "7rem 0 5rem",
          background: "linear-gradient(180deg, #ffffff 0%, #F8F9FC 100%)",
          overflow: "hidden",
        }}
      >
        {/* Background decoration */}
        <div
          style={{
            position: "absolute",
            top: "-20%",
            right: "-10%",
            width: "600px",
            height: "600px",
            background:
              "radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%)",
            borderRadius: "50%",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-10%",
            left: "-5%",
            width: "400px",
            height: "400px",
            background:
              "radial-gradient(circle, rgba(37,99,235,0.06) 0%, transparent 70%)",
            borderRadius: "50%",
            pointerEvents: "none",
          }}
        />

        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem", position: "relative" }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" as const }}
          >
            {/* Eyebrow */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "#EFF6FF",
                padding: "0.5rem 1rem",
                borderRadius: "9999px",
                marginBottom: "1.5rem",
                border: "1px solid #DBEAFE",
              }}
            >
              <Zap className="w-4 h-4 text-[#2563EB]" />
              <span
                style={{
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: "#2563EB",
                }}
              >
                Enterprise-Grade Voice AI
              </span>
            </div>

            {/* Headline */}
            <h1
              style={{
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
                color: "#0A1F6B",
                marginBottom: "1.5rem",
                maxWidth: "800px",
              }}
            >
              Powerful AI Voice Technology
            </h1>

            {/* Subheadline */}
            <p
              style={{
                fontSize: "1.25rem",
                color: "#374151",
                maxWidth: "600px",
                lineHeight: 1.7,
                marginBottom: "2.5rem",
              }}
            >
              Build intelligent voice agents that understand, respond, and
              resolve — powered by state-of-the-art speech recognition and
              synthesis.
            </p>

            {/* CTA buttons */}
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <a
                href="#contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.875rem 1.75rem",
                  background: "#2563EB",
                  color: "#fff",
                  borderRadius: "8px",
                  fontSize: "0.9375rem",
                  fontWeight: 700,
                  textDecoration: "none",
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#1D4ED8";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#2563EB";
                }}
              >
                Book a Demo <ChevronRight className="w-4 h-4" />
              </a>
              <a
                href="#capabilities"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.875rem 1.75rem",
                  background: "transparent",
                  color: "#2563EB",
                  border: "2px solid #2563EB",
                  borderRadius: "8px",
                  fontSize: "0.9375rem",
                  fontWeight: 700,
                  textDecoration: "none",
                  transition: "all 0.15s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#2563EB";
                  e.currentTarget.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#2563EB";
                }}
              >
                Explore Features
              </a>
            </div>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2, ease: "easeOut" as const }}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "2rem",
              marginTop: "4rem",
              padding: "2rem",
              background: "#fff",
              borderRadius: "16px",
              border: "1px solid #E5E7EB",
              boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
            }}
          >
            {[
              { value: "99.99%", label: "Uptime SLA" },
              { value: "<300ms", label: "Avg. Latency" },
              { value: "50M+", label: "Calls Processed" },
              { value: "150+", label: "Countries" },
            ].map((stat, index) => (
              <TechStat key={index} {...stat} delay={index * 0.1} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Core Capabilities Section */}
      <section
        id="capabilities"
        style={{ padding: "6rem 0", background: "#fff" }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem" }}>
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" as const }}
            style={{ textAlign: "center", marginBottom: "4rem" }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                fontSize: "0.75rem",
                fontWeight: 700,
                color: "#2563EB",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: "0.75rem",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: "18px",
                  height: "2px",
                  background: "#2563EB",
                  borderRadius: "2px",
                }}
              />
              Core Capabilities
            </div>
            <h2
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: "#0A1F6B",
                marginBottom: "1rem",
              }}
            >
              Everything you need to build
              <br />
              <span style={{ color: "#2563EB" }}>intelligent voice agents</span>
            </h2>
            <p
              style={{
                fontSize: "1.125rem",
                color: "#6B7280",
                maxWidth: "600px",
                margin: "0 auto",
                lineHeight: 1.7,
              }}
            >
              From speech recognition to enterprise integrations, our platform
              provides all the building blocks for production-grade voice AI.
            </p>
          </motion.div>

          {/* Features grid */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1.5rem",
            }}
          >
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Technology Section */}
      <section style={{ padding: "6rem 0", background: "#F8F9FC" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "4rem",
              alignItems: "center",
            }}
          >
            {/* Left content */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" as const }}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: "#2563EB",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  marginBottom: "0.75rem",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    width: "18px",
                    height: "2px",
                    background: "#2563EB",
                    borderRadius: "2px",
                  }}
                />
                Technology
              </div>
              <h2
                style={{
                  fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                  color: "#0A1F6B",
                  marginBottom: "1.5rem",
                  lineHeight: 1.2,
                }}
              >
                Built for enterprise scale
                <br />
                <span style={{ color: "#2563EB" }}>from day one</span>
              </h2>
              <p
                style={{
                  fontSize: "1rem",
                  color: "#374151",
                  lineHeight: 1.7,
                  marginBottom: "2rem",
                }}
              >
                Our architecture is designed for mission-critical applications,
                delivering 99.99% uptime with global redundancy and
                sub-300ms latency worldwide.
              </p>

              {/* Feature list */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {[
                  {
                    icon: Server,
                    title: "99.99% Uptime SLA",
                    description:
                      "Multi-region deployment with automatic failover ensures your voice agents never go down.",
                  },
                  {
                    icon: Globe,
                    title: "Global CDN",
                    description:
                      "Edge nodes across 150+ countries for lightning-fast responses anywhere in the world.",
                  },
                  {
                    icon: Zap,
                    title: "Sub-300ms Latency",
                    description:
                      "Optimized speech processing pipeline delivers human-like response times.",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      gap: "1rem",
                      padding: "1rem",
                      background: "#fff",
                      borderRadius: "12px",
                      border: "1px solid #E5E7EB",
                    }}
                  >
                    <div
                      style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "10px",
                        background: "#EFF6FF",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <item.icon className="w-5 h-5 text-[#2563EB]" />
                    </div>
                    <div>
                      <h4
                        style={{
                          fontSize: "0.9375rem",
                          fontWeight: 700,
                          color: "#0A1F6B",
                          marginBottom: "0.25rem",
                        }}
                      >
                        {item.title}
                      </h4>
                      <p
                        style={{
                          fontSize: "0.875rem",
                          color: "#6B7280",
                          lineHeight: 1.5,
                        }}
                      >
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right visual - Architecture diagram */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" as const }}
              style={{
                position: "relative",
                padding: "3rem",
                background: "#fff",
                borderRadius: "20px",
                border: "1px solid #E5E7EB",
                boxShadow: "0 8px 32px rgba(0,0,0,0.04)",
              }}
            >
              {/* Architecture diagram visual */}
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                {/* Top layer - User */}
                <div
                  style={{
                    padding: "1rem 2rem",
                    background: "#2563EB",
                    color: "#fff",
                    borderRadius: "12px",
                    fontSize: "0.875rem",
                    fontWeight: 700,
                    boxShadow: "0 4px 12px rgba(37,99,235,0.3)",
                  }}
                >
                  Voice User
                </div>

                {/* Arrow */}
                <div
                  style={{
                    width: "2px",
                    height: "24px",
                    background: "#E5E7EB",
                  }}
                />

                {/* Edge layer */}
                <div
                  style={{
                    display: "flex",
                    gap: "0.75rem",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      padding: "0.75rem 1.25rem",
                      background: "#EFF6FF",
                      border: "1px solid #DBEAFE",
                      borderRadius: "8px",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      color: "#2563EB",
                    }}
                  >
                    STT Engine
                  </div>
                  <div
                    style={{
                      width: "24px",
                      height: "2px",
                      background: "#E5E7EB",
                    }}
                  />
                  <div
                    style={{
                      padding: "0.75rem 1.25rem",
                      background: "#EFF6FF",
                      border: "1px solid #DBEAFE",
                      borderRadius: "8px",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      color: "#2563EB",
                    }}
                  >
                    NLU Engine
                  </div>
                </div>

                {/* Arrow */}
                <div
                  style={{
                    width: "2px",
                    height: "24px",
                    background: "#E5E7EB",
                  }}
                />

                {/* LLM layer */}
                <div
                  style={{
                    padding: "1rem 2rem",
                    background: "#0A1F6B",
                    color: "#fff",
                    borderRadius: "12px",
                    fontSize: "0.875rem",
                    fontWeight: 700,
                    boxShadow: "0 4px 12px rgba(10,31,107,0.3)",
                  }}
                >
                  LLM Orchestrator
                </div>

                {/* Arrow */}
                <div
                  style={{
                    width: "2px",
                    height: "24px",
                    background: "#E5E7EB",
                  }}
                />

                {/* Integrations */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "0.5rem",
                    width: "100%",
                  }}
                >
                  {["CRM", "Telephony", "Database"].map((item, i) => (
                    <div
                      key={i}
                      style={{
                        padding: "0.75rem",
                        background: "#F8F9FC",
                        border: "1px solid #E5E7EB",
                        borderRadius: "8px",
                        fontSize: "0.6875rem",
                        fontWeight: 600,
                        color: "#6B7280",
                        textAlign: "center",
                      }}
                    >
                      {item}
                    </div>
                  ))}
                </div>

                {/* Bottom layer - TTS */}
                <div
                  style={{
                    display: "flex",
                    gap: "0.75rem",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      padding: "0.75rem 1.25rem",
                      background: "#EFF6FF",
                      border: "1px solid #DBEAFE",
                      borderRadius: "8px",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      color: "#2563EB",
                    }}
                  >
                    Response
                  </div>
                  <div
                    style={{
                      width: "24px",
                      height: "2px",
                      background: "#E5E7EB",
                    }}
                  />
                  <div
                    style={{
                      padding: "0.75rem 1.25rem",
                      background: "#EFF6FF",
                      border: "1px solid #DBEAFE",
                      borderRadius: "8px",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      color: "#2563EB",
                    }}
                  >
                    TTS Engine
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div
                style={{
                  position: "absolute",
                  top: "-12px",
                  right: "-12px",
                  width: "48px",
                  height: "48px",
                  background: "#2563EB",
                  borderRadius: "12px",
                  opacity: 0.1,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "-12px",
                  left: "-12px",
                  width: "32px",
                  height: "32px",
                  background: "#2563EB",
                  borderRadius: "8px",
                  opacity: 0.1,
                }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section style={{ padding: "6rem 0", background: "#fff" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem" }}>
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" as const }}
            style={{ textAlign: "center", marginBottom: "4rem" }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                fontSize: "0.75rem",
                fontWeight: 700,
                color: "#2563EB",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: "0.75rem",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: "18px",
                  height: "2px",
                  background: "#2563EB",
                  borderRadius: "2px",
                }}
              />
              Integrations
            </div>
            <h2
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: "#0A1F6B",
                marginBottom: "1rem",
              }}
            >
              Connect with your
              <br />
              <span style={{ color: "#2563EB" }}>existing tools</span>
            </h2>
            <p
              style={{
                fontSize: "1.125rem",
                color: "#6B7280",
                maxWidth: "600px",
                margin: "0 auto",
                lineHeight: 1.7,
              }}
            >
              Seamlessly integrate with the tools you already use. Our platform
              connects to 100+ enterprise applications out of the box.
            </p>
          </motion.div>

          {/* Integration categories */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "1rem",
            }}
          >
            {integrationCategories.map((category, index) => (
              <IntegrationCategory
                key={index}
                category={category}
                integrations={category.integrations}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        id="contact"
        style={{
          padding: "6rem 0",
          background: "#1A2AB8",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background decoration */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.04) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(255,255,255,0.04) 0%, transparent 50%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            padding: "0 2rem",
            textAlign: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" as const }}
          >
            <h2
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: "#fff",
                marginBottom: "1.5rem",
                lineHeight: 1.1,
              }}
            >
              Ready to see it in action?
            </h2>
            <p
              style={{
                fontSize: "1.125rem",
                color: "rgba(255,255,255,0.82)",
                lineHeight: 1.7,
                marginBottom: "2.5rem",
                maxWidth: "500px",
                margin: "0 auto 2.5rem",
              }}
            >
              Book a demo with our solutions team and see how AI voice agents
              can transform your customer experience.
            </p>

            {/* CTA button */}
            <a
              href="mailto:contact@enlightai.com"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "1rem 2rem",
                background: "#fff",
                color: "#2563EB",
                borderRadius: "12px",
                fontSize: "1.125rem",
                fontWeight: 700,
                textDecoration: "none",
                transition: "all 0.2s",
                boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 8px 32px rgba(0,0,0,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.15)";
              }}
            >
              Book a Demo
              <ChevronRight className="w-5 h-5" />
            </a>

            {/* Trust indicators */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "2rem",
                marginTop: "3rem",
                flexWrap: "wrap",
              }}
            >
              {[
                "SOC2 Type II",
                "HIPAA Compliant",
                "GDPR Ready",
              ].map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    color: "rgba(255,255,255,0.7)",
                    fontSize: "0.875rem",
                  }}
                >
                  <Shield className="w-4 h-4" />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />

      {/* CSS for animations */}
      <style jsx global>{`
        .reveal {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal.visible {
          opacity: 1;
          transform: none;
        }

        @media (max-width: 1024px) {
          .tech-grid {
            grid-template-columns: 1fr !important;
          }
          .integration-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        @media (max-width: 768px) {
          .features-grid {
            grid-template-columns: 1fr !important;
          }
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        @media (max-width: 640px) {
          .integration-grid {
            grid-template-columns: 1fr !important;
          }
          .stats-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}