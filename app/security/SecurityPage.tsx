"use client";

import React, { useEffect, useState, memo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Shield,
  Lock,
  KeyRound,
  Users,
  FileCheck,
  Building2,
  Server,
  Bug,
  ShieldCheck,
  Download,
  Mail,
  ChevronRight,
  CheckCircle2,
  Globe,
  Database,
  RefreshCw,
  AlertTriangle,
} from "lucide-react";

// ─── DATA ────────────────────────────────────────────────────────────
const trustBadges = [
  { label: "SOC 2 Type II", icon: ShieldCheck, color: "#059669" },
  { label: "HIPAA Compliant", icon: Shield, color: "#7C3AED" },
  { label: "GDPR Ready", icon: Lock, color: "#2563EB" },
  { label: "ISO 27001", icon: KeyRound, color: "#DC2626" },
];

const securityFeatures = [
  {
    icon: Lock,
    title: "Data Encryption",
    color: "#059669",
    items: ["AES-256 encryption at rest", "TLS 1.3 for data in transit", "End-to-end encryption"],
  },
  {
    icon: Users,
    title: "Access Control",
    color: "#7C3AED",
    items: ["Role-based access control (RBAC)", "SSO integration (Okta, Azure AD)", "Multi-factor authentication"],
  },
  {
    icon: FileCheck,
    title: "Audit & Compliance",
    color: "#2563EB",
    items: ["Complete audit logs", "Compliance reporting", "Data retention policies"],
  },
  {
    icon: Building2,
    title: "Data Residency",
    color: "#0891B2",
    items: ["US, EU, APAC data centers", "Custom data residency requirements", "Data sovereignty compliance"],
  },
  {
    icon: Server,
    title: "Disaster Recovery",
    color: "#EA580C",
    items: ["99.99% uptime SLA", "Automated backups", "Failover architecture"],
  },
  {
    icon: Bug,
    title: "Penetration Testing",
    color: "#DC2626",
    items: ["Regular security audits", "Third-party penetration testing", "Bug bounty program"],
  },
];

const complianceDeepDives = [
  {
    icon: Shield,
    color: "#7C3AED",
    badge: "Healthcare",
    title: "HIPAA Compliance",
    description: "Full compliance with the Health Insurance Portability and Accountability Act for handling protected health information.",
    items: [
      { icon: FileCheck, text: "Business Associate Agreement (BAA) available" },
      { icon: Users, text: "PHI handling procedures with strict access controls" },
      { icon: ShieldCheck, text: "Healthcare-specific security controls" },
      { icon: FileCheck, text: "Patient data encryption at rest and in transit" },
      { icon: Lock, text: "Audit logging for all PHI access" },
    ],
  },
  {
    icon: Lock,
    color: "#2563EB",
    badge: "European Union",
    title: "GDPR Compliance",
    description: "Comprehensive compliance with the General Data Protection Regulation for organizations operating in or serving EU citizens.",
    items: [
      { icon: Users, text: "Data subject rights (access, rectification, erasure)" },
      { icon: Globe, text: "Cross-border transfer safeguards (SCCs, adequacy decisions)" },
      { icon: Shield, text: "Privacy by design and default principles" },
      { icon: FileCheck, text: "Data Protection Impact Assessments (DPIAs)" },
      { icon: CheckCircle2, text: "GDPR-compliant data processing agreements" },
    ],
  },
  {
    icon: ShieldCheck,
    color: "#059669",
    badge: "Security & Availability",
    title: "SOC 2 Type II",
    description: "Annual audits by independent third parties verifying our security controls, availability commitments, and confidentiality practices.",
    items: [
      { icon: FileCheck, text: "Annual third-party security audits" },
      { icon: Shield, text: "Security controls continuously monitored" },
      { icon: Server, text: "Availability monitoring and alerting" },
      { icon: CheckCircle2, text: "Confidentiality commitments enforced" },
      { icon: RefreshCw, text: "Incident response procedures tested quarterly" },
    ],
  },
];

const securityLayers = [
  { label: "Client Application", desc: "TLS 1.3 encrypted connections" },
  { label: "API Gateway", desc: "Request validation & rate limiting" },
  { label: "Application Layer", desc: "RBAC, MFA, session management" },
  { label: "Data Layer", desc: "AES-256 at rest, field-level encryption" },
  { label: "Infrastructure", desc: "VPC isolation, WAF, DDoS protection" },
];

const downloads = [
  {
    title: "Security Whitepaper",
    description: "Comprehensive overview of our security architecture, encryption standards, and compliance framework.",
    icon: Shield,
    color: "#2563EB",
  },
  {
    title: "Compliance Documentation",
    description: "Detailed compliance reports, attestations, and audit summaries for enterprise procurement.",
    icon: FileCheck,
    color: "#059669",
  },
  {
    title: "Architecture Overview",
    description: "Technical documentation of our infrastructure, data flow, and disaster recovery mechanisms.",
    icon: Server,
    color: "#7C3AED",
  },
];

// ─── ANIMATION VARIANTS ─────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" as const },
  }),
};

// ─── COMPONENTS ─────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      style={{
        position: "relative",
        padding: "7rem 0 5rem",
        background: "linear-gradient(135deg, #0A1628 0%, #1A2A4A 50%, #0F1F3A 100%)",
        overflow: "hidden",
      }}
    >
      {/* Background pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(37,99,235,0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(16,185,129,0.1) 0%, transparent 50%)
          `,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem", position: "relative", zIndex: 1 }}>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.div variants={fadeUp} custom={0}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.5rem 1rem",
                background: "rgba(37,99,235,0.15)",
                border: "1px solid rgba(37,99,235,0.3)",
                borderRadius: "9999px",
                marginBottom: "1.5rem",
              }}
            >
              <Shield size={14} color="#60A5FA" />
              <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: "#93C5FD" }}>
                Enterprise-Grade Protection
              </span>
            </div>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            custom={1}
            style={{
              fontSize: "clamp(2.25rem, 5vw, 3.75rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              color: "#ffffff",
              marginBottom: "1.25rem",
              maxWidth: "700px",
            }}
          >
            Enterprise-Grade Security & Compliance
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={2}
            style={{
              fontSize: "1.125rem",
              color: "rgba(255,255,255,0.7)",
              maxWidth: "560px",
              lineHeight: 1.7,
              marginBottom: "2.5rem",
            }}
          >
            Your data, protected by industry-leading security practices. We maintain the highest standards
            of security, privacy, and compliance to earn your trust.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

const TrustBadgeCard = memo(function TrustBadgeCard({
  badge,
  index,
}: {
  badge: (typeof trustBadges)[0];
  index: number;
}) {
  const Icon = badge.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" as const }}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.75rem",
        padding: "1.75rem 1.5rem",
        background: "#ffffff",
        border: "1.5px solid #E5E7EB",
        borderRadius: "12px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
        textAlign: "center",
        flex: 1,
        minWidth: "140px",
      }}
    >
      <div
        style={{
          width: "56px",
          height: "56px",
          borderRadius: "12px",
          background: `${badge.color}15`,
          border: `1.5px solid ${badge.color}30`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon size={24} color={badge.color} />
      </div>
      <span
        style={{
          fontSize: "0.875rem",
          fontWeight: 700,
          color: "#0A1F6B",
          lineHeight: 1.3,
        }}
      >
        {badge.label}
      </span>
    </motion.div>
  );
});

function TrustBadgesSection() {
  return (
    <section style={{ background: "#F8F9FC", padding: "4rem 0", marginTop: "-2rem" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" as const }}
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            justifyContent: "center",
            maxWidth: "900px",
            margin: "0 auto",
          }}
        >
          {trustBadges.map((badge, i) => (
            <TrustBadgeCard key={badge.label} badge={badge} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

const FeatureCard = memo(function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof securityFeatures)[0];
  index: number;
}) {
  const Icon = feature.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" as const }}
      style={{
        background: "#ffffff",
        border: "1.5px solid #E5E7EB",
        borderRadius: "14px",
        padding: "1.75rem",
        boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
        transition: "all 0.2s ease",
      }}
      whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(0,0,0,0.1)" }}
    >
      <div
        style={{
          width: "48px",
          height: "48px",
          borderRadius: "10px",
          background: `${feature.color}12`,
          border: `1.5px solid ${feature.color}25`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "1.25rem",
        }}
      >
        <Icon size={22} color={feature.color} />
      </div>
      <h3
        style={{
          fontSize: "1.0625rem",
          fontWeight: 700,
          color: "#0A1F6B",
          marginBottom: "1rem",
          letterSpacing: "-0.01em",
        }}
      >
        {feature.title}
      </h3>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.625rem" }}>
        {feature.items.map((item, i) => (
          <li
            key={i}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "0.5rem",
              fontSize: "0.875rem",
              color: "#374151",
              lineHeight: 1.5,
            }}
          >
            <CheckCircle2 size={14} color={feature.color} style={{ flexShrink: 0, marginTop: "2px" }} />
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  );
});

function SecurityFeaturesSection() {
  return (
    <section style={{ padding: "5rem 0", background: "#F8F9FC" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" as const }}
          style={{ textAlign: "center", marginBottom: "3.5rem" }}
        >
          <div className="section-eyebrow" style={{ justifyContent: "center" }}>Security Infrastructure</div>
          <h2 className="section-title" style={{ margin: "0 auto" }}>
            Comprehensive Protection at Every Layer
          </h2>
          <p style={{ fontSize: "1rem", color: "#6B7280", maxWidth: "560px", margin: "1rem auto 0", lineHeight: 1.6 }}>
            Multi-layered security architecture designed to protect your data from access to storage.
          </p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {securityFeatures.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

const ComplianceCard = memo(function ComplianceCard({
  compliance,
  index,
}: {
  compliance: (typeof complianceDeepDives)[0];
  index: number;
}) {
  const Icon = compliance.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.12, ease: "easeOut" as const }}
      style={{
        background: "#ffffff",
        border: "1.5px solid #E5E7EB",
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "1.75rem 2rem",
          borderBottom: "1px solid #F3F4F6",
          display: "flex",
          alignItems: "flex-start",
          gap: "1rem",
        }}
      >
        <div
          style={{
            width: "52px",
            height: "52px",
            borderRadius: "12px",
            background: `${compliance.color}12`,
            border: `1.5px solid ${compliance.color}25`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Icon size={24} color={compliance.color} />
        </div>
        <div>
          <div
            style={{
              display: "inline-block",
              padding: "0.25rem 0.625rem",
              background: `${compliance.color}12`,
              border: `1px solid ${compliance.color}25`,
              borderRadius: "6px",
              fontSize: "0.6875rem",
              fontWeight: 700,
              color: compliance.color,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              marginBottom: "0.5rem",
            }}
          >
            {compliance.badge}
          </div>
          <h3 style={{ fontSize: "1.375rem", fontWeight: 700, color: "#0A1F6B", margin: 0 }}>
            {compliance.title}
          </h3>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "1.5rem 2rem 2rem" }}>
        <p style={{ fontSize: "0.9375rem", color: "#6B7280", lineHeight: 1.6, marginBottom: "1.5rem" }}>
          {compliance.description}
        </p>
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.875rem" }}>
          {compliance.items.map((item, i) => {
            const ItemIcon = item.icon;
            return (
              <li
                key={i}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.75rem",
                  fontSize: "0.9375rem",
                  color: "#374151",
                  lineHeight: 1.5,
                }}
              >
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "8px",
                    background: `${compliance.color}10`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <ItemIcon size={14} color={compliance.color} />
                </div>
                {item.text}
              </li>
            );
          })}
        </ul>
      </div>
    </motion.div>
  );
});

function ComplianceSection() {
  return (
    <section style={{ padding: "5rem 0", background: "#ffffff" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" as const }}
          style={{ textAlign: "center", marginBottom: "3.5rem" }}
        >
          <div className="section-eyebrow" style={{ justifyContent: "center" }}>Compliance Deep Dives</div>
          <h2 className="section-title" style={{ margin: "0 auto" }}>
            Certified & Compliant
          </h2>
          <p style={{ fontSize: "1rem", color: "#6B7280", maxWidth: "560px", margin: "1rem auto 0", lineHeight: 1.6 }}>
            We maintain rigorous compliance standards to meet the most demanding regulatory requirements.
          </p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {complianceDeepDives.map((compliance, i) => (
            <ComplianceCard key={compliance.title} compliance={compliance} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ArchitectureSection() {
  return (
    <section style={{ padding: "5rem 0", background: "linear-gradient(180deg, #F8F9FC 0%, #F0F2F8 100%)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" as const }}
          style={{ textAlign: "center", marginBottom: "3.5rem" }}
        >
          <div className="section-eyebrow" style={{ justifyContent: "center" }}>Security Architecture</div>
          <h2 className="section-title" style={{ margin: "0 auto" }}>
            Defense in Depth
          </h2>
          <p style={{ fontSize: "1rem", color: "#6B7280", maxWidth: "560px", margin: "1rem auto 0", lineHeight: 1.6 }}>
            Multiple layers of security working together to protect your data at every point in the system.
          </p>
        </motion.div>

        {/* Architecture diagram */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
          style={{
            background: "#ffffff",
            border: "1.5px solid #E5E7EB",
            borderRadius: "16px",
            padding: "2.5rem",
            boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
            overflow: "hidden",
          }}
        >
          {/* Top label */}
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.5rem 1rem",
                background: "#EFF6FF",
                border: "1px solid #BFDBFE",
                borderRadius: "8px",
              }}
            >
              <Shield size={14} color="#2563EB" />
              <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: "#2563EB" }}>
                Security Layers Overview
              </span>
            </div>
          </div>

          {/* Layer visualization */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "600px", margin: "0 auto" }}>
            {securityLayers.map((layer, i) => (
              <motion.div
                key={layer.label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1, ease: "easeOut" as const }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    padding: "1rem 1.25rem",
                    background: `linear-gradient(135deg, ${
                      ["#EFF6FF", "#F0FDF4", "#FEF3C7", "#FDF2F8", "#F5F3FF"][i]
                    } 0%, #ffffff 100%)`,
                    border: "1px solid",
                    borderColor: ["#BFDBFE", "#BBF7D0", "#FDE68A", "#FBCFE8", "#DDD6FE"][i],
                    borderRadius: "10px",
                  }}
                >
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "8px",
                      background: ["#2563EB", "#059669", "#D97706", "#DB2777", "#7C3AED"][i],
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <span style={{ fontSize: "0.8125rem", fontWeight: 800, color: "#ffffff" }}>
                      {i + 1}
                    </span>
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "0.9375rem",
                        fontWeight: 700,
                        color: "#0A1F6B",
                        marginBottom: "2px",
                      }}
                    >
                      {layer.label}
                    </div>
                    <div style={{ fontSize: "0.8125rem", color: "#6B7280" }}>{layer.desc}</div>
                  </div>
                </div>
                {i < securityLayers.length - 1 && (
                  <div
                    style={{
                      position: "absolute",
                      left: "50%",
                      transform: "translateX(-50%)",
                      color: "#D1D5DB",
                    }}
                  >
                    <ChevronRight size={16} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Bottom note */}
          <div
            style={{
              marginTop: "2rem",
              paddingTop: "1.5rem",
              borderTop: "1px solid #F3F4F6",
              display: "flex",
              justifyContent: "center",
              gap: "2rem",
              flexWrap: "wrap",
            }}
          >
            {[
              { icon: Lock, label: "End-to-End Encryption", color: "#059669" },
              { icon: Shield, label: "Zero Trust Architecture", color: "#2563EB" },
              { icon: Server, label: "SOC 2 Certified", color: "#7C3AED" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    fontSize: "0.8125rem",
                    fontWeight: 600,
                    color: item.color,
                  }}
                >
                  <Icon size={14} />
                  {item.label}
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const DownloadCard = memo(function DownloadCard({
  download,
  index,
}: {
  download: (typeof downloads)[0];
  index: number;
}) {
  const Icon = download.icon;
  return (
    <motion.a
      href="#"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" as const }}
      style={{
        display: "block",
        background: "#ffffff",
        border: "1.5px solid #E5E7EB",
        borderRadius: "14px",
        padding: "1.75rem",
        textDecoration: "none",
        boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
        transition: "all 0.2s ease",
        cursor: "pointer",
      }}
      whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(0,0,0,0.1)" }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
        <div
          style={{
            width: "52px",
            height: "52px",
            borderRadius: "12px",
            background: `${download.color}12`,
            border: `1.5px solid ${download.color}25`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Icon size={22} color={download.color} />
        </div>
        <div style={{ flex: 1 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "0.375rem",
            }}
          >
            <h3
              style={{
                fontSize: "1rem",
                fontWeight: 700,
                color: "#0A1F6B",
                margin: 0,
              }}
            >
              {download.title}
            </h3>
            <Download size={16} color={download.color} />
          </div>
          <p style={{ fontSize: "0.875rem", color: "#6B7280", lineHeight: 1.5, margin: 0 }}>
            {download.description}
          </p>
        </div>
      </div>
    </motion.a>
  );
});

function DownloadsSection() {
  return (
    <section style={{ padding: "5rem 0", background: "#ffffff" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" as const }}
          style={{ textAlign: "center", marginBottom: "3rem" }}
        >
          <div className="section-eyebrow" style={{ justifyContent: "center" }}>Resources</div>
          <h2 className="section-title" style={{ margin: "0 auto" }}>
            Security Documentation
          </h2>
          <p style={{ fontSize: "1rem", color: "#6B7280", maxWidth: "560px", margin: "1rem auto 0", lineHeight: 1.6 }}>
            Access our comprehensive security documentation to share with your team and procurement department.
          </p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.25rem",
            maxWidth: "900px",
            margin: "0 auto",
          }}
        >
          {downloads.map((download, i) => (
            <DownloadCard key={download.title} download={download} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section
      style={{
        padding: "5rem 0",
        background: "linear-gradient(135deg, #0A1628 0%, #1A2A4A 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            radial-gradient(circle at 30% 50%, rgba(37,99,235,0.2) 0%, transparent 50%),
            radial-gradient(circle at 70% 50%, rgba(16,185,129,0.15) 0%, transparent 50%)
          `,
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 2rem", textAlign: "center", position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" as const }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.5rem 1rem",
              background: "rgba(37,99,235,0.15)",
              border: "1px solid rgba(37,99,235,0.3)",
              borderRadius: "9999px",
              marginBottom: "1.5rem",
            }}
          >
            <Shield size={14} color="#60A5FA" />
            <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: "#93C5FD" }}>
              Get in Touch
            </span>
          </div>

          <h2
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "#ffffff",
              marginBottom: "1rem",
            }}
          >
            Have questions about our security?
          </h2>

          <p
            style={{
              fontSize: "1.0625rem",
              color: "rgba(255,255,255,0.7)",
              marginBottom: "2rem",
              lineHeight: 1.6,
            }}
          >
            Our security team is available to answer your questions, provide documentation, and help you
            complete your vendor assessment process.
          </p>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.625rem",
              padding: "1rem 2rem",
              background: "#2563EB",
              color: "#ffffff",
              border: "none",
              borderRadius: "10px",
              fontSize: "1rem",
              fontWeight: 700,
              cursor: "pointer",
              transition: "background 0.15s ease",
              minHeight: "52px",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#1D4ED8")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#2563EB")}
          >
            <Mail size={18} />
            Contact Our Security Team
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: "#ffffff", borderTop: "1px solid #E5E7EB", padding: "2.5rem 0" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <Image src="/Layer_1.png" alt="Enlight AI" width={120} height={32} style={{ objectFit: "contain", height: "28px", width: "auto" }} />
            <span style={{ fontSize: "0.8125rem", color: "#9CA3AF" }}>|</span>
            <span style={{ fontSize: "0.8125rem", color: "#6B7280" }}>
              Enterprise AI Voice Agents
            </span>
          </div>
          <div
            style={{
              display: "flex",
              gap: "1.5rem",
            }}
          >
            {["Privacy Policy", "Terms of Service", "Security"].map((link) => (
              <a
                key={link}
                href="#"
                style={{
                  fontSize: "0.8125rem",
                  color: "#6B7280",
                  textDecoration: "none",
                  transition: "color 0.15s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#2563EB")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#6B7280")}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
        <div
          style={{
            marginTop: "1.5rem",
            paddingTop: "1.5rem",
            borderTop: "1px solid #F3F4F6",
            textAlign: "center",
          }}
        >
          <p style={{ fontSize: "0.8125rem", color: "#9CA3AF", margin: 0 }}>
            Copyright 2026 Enlight AI. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── PAGE ────────────────────────────────────────────────────────────
export default function SecurityPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
    <div style={{ minHeight: "100vh", background: "#F8F9FC" }}>
      {/* Navbar */}
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
              { label: "Agents", href: "/" },
              { label: "Security", href: "#", active: true },
              { label: "Contact", href: "/#contact" },
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
                  color: item.active ? "#2563EB" : "#374151",
                  padding: "0.5rem 0.875rem",
                  borderRadius: "6px",
                  textDecoration: "none",
                  transition: "color 0.15s, background 0.15s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#2563EB";
                  e.currentTarget.style.background = "#EFF6FF";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = item.active ? "#2563EB" : "#374151";
                  e.currentTarget.style.background = "none";
                }}
              >
                {item.label}
              </a>
            ))}
          </div>
          <a
            href="/"
            style={{
              background: "#2563EB",
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
            onMouseEnter={(e) => (e.currentTarget.style.background = "#1D4ED8")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#2563EB")}
          >
            Back to Home
          </a>
        </div>
      </nav>

      <Hero />
      <TrustBadgesSection />
      <SecurityFeaturesSection />
      <ComplianceSection />
      <ArchitectureSection />
      <DownloadsSection />
      <CTASection />
      <Footer />
    </div>
  );
}