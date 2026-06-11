"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Stethoscope,
  Building2,
  Hotel,
  ShoppingBag,
  GraduationCap,
  Wrench,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

// ─── INDUSTRY DATA ─────────────────────────────────────────────────
const industries = [
  {
    id: "healthcare",
    name: "Healthcare",
    icon: Stethoscope,
    color: "#a78bfa",
    colorLight: "rgba(167, 139, 250, 0.1)",
    colorBorder: "rgba(167, 139, 250, 0.25)",
    description: "Purpose-built for patient engagement and clinical workflows",
    useCases: [
      "Patient appointment scheduling",
      "Insurance verification",
      "Pre-visit intake",
      "Follow-up coordination",
      "Emergency routing",
      "HIPAA compliant",
    ],
    roiMetric: "92% automation rate",
    roiDetail: "For appointment-related calls",
  },
  {
    id: "banking",
    name: "Banking & Financial Services",
    icon: Building2,
    color: "#4f8ef7",
    colorLight: "rgba(79, 142, 247, 0.1)",
    colorBorder: "rgba(79, 142, 247, 0.25)",
    description: "Enterprise-grade security for high-stakes financial conversations",
    useCases: [
      "Fraud resolution",
      "Claims processing (FNOL)",
      "Account management",
      "Loan inquiry handling",
      "Compliance ready",
    ],
    roiMetric: "4 min FNOL filing",
    roiDetail: "Average call resolution time",
  },
  {
    id: "hospitality",
    name: "Hospitality",
    icon: Hotel,
    color: "#f472b6",
    colorLight: "rgba(244, 114, 182, 0.1)",
    colorBorder: "rgba(244, 114, 182, 0.25)",
    description: "Elevate guest experiences across every touchpoint",
    useCases: [
      "Guest reservations",
      "Concierge services",
      "Booking modifications",
      "Multilingual support",
      "In-stay requests",
    ],
    roiMetric: "3.2x more bookings",
    roiDetail: "Via proactive voice outreach",
  },
  {
    id: "ecommerce",
    name: "Ecommerce & Retail",
    icon: ShoppingBag,
    color: "#fb923c",
    colorLight: "rgba(251, 146, 60, 0.1)",
    colorBorder: "rgba(251, 146, 60, 0.25)",
    description: "Drive conversions and reduce support overhead",
    useCases: [
      "Order tracking",
      "Return authorizations",
      "Cart recovery",
      "Customer support",
      "Product recommendations",
    ],
    roiMetric: "23% cart recovery",
    roiDetail: "Via AI-powered follow-ups",
  },
  {
    id: "education",
    name: "Education",
    icon: GraduationCap,
    color: "#2dd4bf",
    colorLight: "rgba(45, 212, 191, 0.1)",
    colorBorder: "rgba(45, 212, 191, 0.25)",
    description: "Streamline enrollment and student communications",
    useCases: [
      "Student enrollment",
      "Course advising",
      "Appointment booking",
      "Lead qualification",
      "LMS integration",
    ],
    roiMetric: "40% cost reduction",
    roiDetail: "In admissions operations",
  },
  {
    id: "professional",
    name: "Professional Services",
    icon: Wrench,
    color: "#fbbf24",
    colorLight: "rgba(251, 191, 36, 0.1)",
    colorBorder: "rgba(251, 191, 36, 0.25)",
    description: "Optimize field service operations and client booking",
    useCases: [
      "Service scheduling",
      "Quote generation",
      "Appointment reminders",
      "Customer follow-up",
      "Lead capture",
    ],
    roiMetric: "35% no-show reduction",
    roiDetail: "Via automated reminders",
  },
];

// ─── ANIMATION VARIANTS ──────────────────────────────────────────
const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" as const },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

// ─── COMPONENTS ───────────────────────────────────────────────────
function IndustryCard({ industry, index }: { industry: typeof industries[0]; index: number }) {
  const Icon = industry.icon;

  return (
    <motion.article
      {...fadeInUp}
      transition={{ ...fadeInUp.transition, delay: index * 0.08 }}
      className="industry-card"
      style={
        {
          "--industry-color": industry.color,
          "--industry-color-light": industry.colorLight,
          "--industry-color-border": industry.colorBorder,
        } as React.CSSProperties
      }
    >
      {/* Accent bar */}
      <div className="industry-card__accent" />

      {/* Header */}
      <div className="industry-card__header">
        <div
          className="industry-card__icon-wrapper"
          style={{
            background: industry.colorLight,
            border: `1.5px solid ${industry.colorBorder}`,
          }}
        >
          <Icon size={24} color={industry.color} strokeWidth={1.75} />
        </div>
        <div>
          <h3 className="industry-card__title">{industry.name}</h3>
          <p className="industry-card__description">{industry.description}</p>
        </div>
      </div>

      {/* Use cases */}
      <ul className="industry-card__use-cases">
        {industry.useCases.map((useCase) => (
          <li key={useCase} className="industry-card__use-case">
            <CheckCircle2
              size={14}
              color={industry.color}
              strokeWidth={2.5}
              style={{ flexShrink: 0 }}
            />
            <span>{useCase}</span>
          </li>
        ))}
      </ul>

      {/* ROI metric */}
      <div
        className="industry-card__roi"
        style={{
          background: industry.colorLight,
          border: `1px solid ${industry.colorBorder}`,
        }}
      >
        <span className="industry-card__roi-value" style={{ color: industry.color }}>
          {industry.roiMetric}
        </span>
        <span className="industry-card__roi-detail">{industry.roiDetail}</span>
      </div>

      {/* Link */}
      <a href="#" className="industry-card__link" style={{ color: industry.color }}>
        <span>Learn more</span>
        <ArrowRight size={14} strokeWidth={2} />
      </a>
    </motion.article>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────
export default function IndustriesPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#F8F9FC" }}>
      {/* ── HERO ── */}
      <header className="industries-hero">
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem" }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" as const }}
          >
            <div className="industries-hero__eyebrow">
              <span className="industries-hero__eyebrow-dot" />
              Industry Solutions
            </div>
            <h1 className="industries-hero__title">
              AI Voice Agents<br />
              <span className="industries-hero__title-accent">for Every Industry</span>
            </h1>
            <p className="industries-hero__subtitle">
              Purpose-built for enterprise workflows. From patient scheduling to fraud
              resolution, our AI agents handle complex conversations with the nuance your
              industry demands.
            </p>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="industries-hero__bg-grid" />
        <div
          className="industries-hero__bg-circle"
          style={{ background: "radial-gradient(circle, rgba(37,99,235,0.06) 0%, transparent 70%)" }}
        />
      </header>

      {/* ── INDUSTRY CARDS GRID ── */}
      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem 5rem" }}>
        <motion.div
          className="industries-grid"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {industries.map((industry, index) => (
            <IndustryCard key={industry.id} industry={industry} index={index} />
          ))}
        </motion.div>
      </main>

      {/* ── CTA SECTION ── */}
      <section className="industries-cta">
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 2rem" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: "easeOut" as const }}
            className="industries-cta__content"
          >
            <div className="industries-cta__badge">Custom Solutions</div>
            <h2 className="industries-cta__title">
              Need a custom solution<br />for your industry?
            </h2>
            <p className="industries-cta__subtitle">
              We specialize in building domain-specific voice agents with deep industry
              knowledge. Tell us about your workflows and we'll design a solution around
              your unique requirements.
            </p>
            <a href="/contact" className="industries-cta__button">
              <span>Contact us</span>
              <ArrowRight size={16} strokeWidth={2.5} />
            </a>
          </motion.div>
        </div>

        {/* Decorative background */}
        <div className="industries-cta__bg-pattern" />
      </section>
    </div>
  );
}
