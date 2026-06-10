"use client";

import React, { useState, useEffect, useCallback, memo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Quote,
  Download,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Users,
  DollarSign,
  Heart,
  CheckCircle2,
  Star,
  Building2,
  CreditCard,
  Hotel,
  ShoppingCart,
  GraduationCap,
  Shield,
} from "lucide-react";

// ─── DATA ────────────────────────────────────────────────────────────
type CaseStudy = {
  id: string;
  industry: "healthcare" | "bfsi" | "hospitality" | "ecommerce" | "edtech";
  clientName: string;
  clientType: string;
  metrics: { value: string; label: string }[];
  useCase: string;
  quote: { text: string; author: string; title: string };
  accentColor: string;
  bgColor: string;
};

const caseStudies: CaseStudy[] = [
  {
    id: "healthcare-major",
    industry: "healthcare",
    clientName: "Major Healthcare Provider",
    clientType: "Hospital Network",
    metrics: [
      { value: "85%", label: "Automation Rate" },
      { value: "60%", label: "Cost Reduction" },
      { value: "92%", label: "Patient Satisfaction" },
    ],
    useCase: "Patient scheduling and intake",
    quote: {
      text: "The AI voice agent transformed our call center operations. We reduced wait times by 70% while improving patient satisfaction scores.",
      author: "Dr. Priya Mehta",
      title: "Chief Technology Officer",
    },
    accentColor: "#a78bfa",
    bgColor: "#faf5ff",
  },
  {
    id: "global-bank",
    industry: "bfsi",
    clientName: "Global Bank",
    clientType: "Fortune 500 Financial Institution",
    metrics: [
      { value: "95%", label: "Fraud Resolution Rate" },
      { value: "$2.4M", label: "Saved Monthly" },
      { value: "3.2x", label: "ROI in Year One" },
    ],
    useCase: "Fraud detection and resolution",
    quote: {
      text: "We never imagined AI could handle complex fraud disputes with such nuance. The system learns from every interaction and resolves issues faster than our best agents.",
      author: "James Richardson",
      title: "VP of Operations",
    },
    accentColor: "#4f8ef7",
    bgColor: "#eff6ff",
  },
  {
    id: "hotel-chain",
    industry: "hospitality",
    clientName: "Luxury Hotel Chain",
    clientType: "Premium Hospitality Brand",
    metrics: [
      { value: "4.8/5", label: "Guest Satisfaction" },
      { value: "30%", label: "Repeat Bookings" },
      { value: "40%", label: "Concierge Time Saved" },
    ],
    useCase: "Concierge and reservations",
    quote: {
      text: "Our guests now get instant, 24/7 concierge support. The AI handles everything from spa bookings to restaurant reservations in multiple languages.",
      author: "Sofia Martinez",
      title: "Director of Digital Experience",
    },
    accentColor: "#f472b6",
    bgColor: "#fdf2f8",
  },
  {
    id: "ecommerce-platform",
    industry: "ecommerce",
    clientName: "Ecommerce Platform",
    clientType: "Multi-Brand Online Retailer",
    metrics: [
      { value: "65%", label: "Returns Auto-Resolved" },
      { value: "4.2x", label: "Faster Resolution" },
      { value: "89%", label: "CSAT Score" },
    ],
    useCase: "Customer support and returns",
    quote: {
      text: "Return requests used to take 48 hours to resolve. Now our AI handles 65% of them instantly, freeing our team to focus on complex cases.",
      author: "Michael Chen",
      title: "Head of Customer Experience",
    },
    accentColor: "#fb923c",
    bgColor: "#fff7ed",
  },
  {
    id: "edtech-company",
    industry: "edtech",
    clientName: "EdTech Company",
    clientType: "Online Learning Platform",
    metrics: [
      { value: "4x", label: "Enrollment Conversion" },
      { value: "50%", label: "Counselor Time Saved" },
      { value: "68%", label: "Lead Response Rate" },
    ],
    useCase: "Lead qualification and enrollment",
    quote: {
      text: "Our enrollment conversion tripled after implementing the AI agent. It qualifies leads, answers questions, and books counselor calls — all while we sleep.",
      author: "Sarah Williams",
      title: "Chief Executive Officer",
    },
    accentColor: "#2dd4bf",
    bgColor: "#f0fdfa",
  },
  {
    id: "insurance-company",
    industry: "bfsi",
    clientName: "Insurance Company",
    clientType: "Property & Casualty Insurer",
    metrics: [
      { value: "4 min", label: "FNOL Processing" },
      { value: "90%", label: "Straight-Through Processing" },
      { value: "$1.8M", label: "Annual Cost Savings" },
    ],
    useCase: "Claims intake and processing",
    quote: {
      text: "First Notice of Loss used to take 15 minutes per claim. Our AI completes the same intake in 4 minutes with 90% straight-through processing.",
      author: "Robert Thompson",
      title: "Claims Director",
    },
    accentColor: "#4f8ef7",
    bgColor: "#eff6ff",
  },
];

const keyMetrics = [
  { value: "500+", label: "Enterprise Deployments", icon: Building2 },
  { value: "40%", label: "Average Cost Reduction", icon: DollarSign },
  { value: "3.2x", label: "ROI in Year One", icon: TrendingUp },
  { value: "92%", label: "Customer Satisfaction", icon: Heart },
];

const testimonials = [
  {
    id: "testimonial-1",
    quote: "Implementing Enlight Lab's AI voice agents was the single best technology decision we made this year. The ROI was evident within the first quarter.",
    author: "Jennifer Walsh",
    title: "COO, Nexus Financial Services",
    company: "BFSI",
    accentColor: "#4f8ef7",
  },
  {
    id: "testimonial-2",
    quote: "Our patient intake process went from hours of manual work to instant automation. The AI handles complexity with remarkable accuracy.",
    author: "Dr. Ananya Krishnan",
    title: "VP of Patient Experience, MediCare Plus",
    company: "Healthcare",
    accentColor: "#a78bfa",
  },
  {
    id: "testimonial-3",
    quote: "The multilingual support alone justified the investment. We now serve guests in 12 languages without expanding our team.",
    author: "Marcus Chen",
    title: "GM, Grand Azure Hotels",
    company: "Hospitality",
    accentColor: "#f472b6",
  },
  {
    id: "testimonial-4",
    quote: "From lead to enrollment, the AI guides prospective students through every step. Our conversion rates speak for themselves.",
    author: "Lisa Park",
    title: "Founder, EduPath Academy",
    company: "EdTech",
    accentColor: "#2dd4bf",
  },
];

const industries = [
  { id: "all", name: "All Industries", icon: Star },
  { id: "healthcare", name: "Healthcare", icon: Heart },
  { id: "bfsi", name: "BFSI", icon: Shield },
  { id: "hospitality", name: "Hospitality", icon: Hotel },
  { id: "ecommerce", name: "Ecommerce", icon: ShoppingCart },
  { id: "edtech", name: "EdTech", icon: GraduationCap },
];

// ─── COMPONENTS ──────────────────────────────────────────────────────
const IndustryBadge = memo(function IndustryBadge({
  industry,
  color,
}: {
  industry: string;
  color: string;
}) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.375rem",
        fontSize: "0.6875rem",
        fontWeight: 700,
        padding: "0.25rem 0.625rem",
        borderRadius: "9999px",
        background: `${color}15`,
        color: color,
        textTransform: "uppercase",
        letterSpacing: "0.05em",
      }}
    >
      {industry}
    </span>
  );
});

const CaseStudyCard = memo(function CaseStudyCard({
  study,
  index,
}: {
  study: CaseStudy;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" as const }}
      style={{
        position: "relative",
        background: "#fff",
        borderRadius: "16px",
        border: "1.5px solid #E5E7EB",
        overflow: "hidden",
        boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
        transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 12px 40px rgba(37,99,235,0.12), 0 4px 12px rgba(0,0,0,0.06)";
        e.currentTarget.style.borderColor = `${study.accentColor}40`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)";
        e.currentTarget.style.borderColor = "#E5E7EB";
      }}
    >
      {/* Top accent bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",
          background: `linear-gradient(90deg, ${study.accentColor}, ${study.accentColor}80)`,
        }}
      />

      <div style={{ padding: "1.75rem" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", marginBottom: "1.5rem" }}>
          {/* Logo placeholder */}
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "12px",
              background: study.bgColor,
              border: `1.5px solid ${study.accentColor}30`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <span style={{ fontSize: "1.5rem", fontWeight: 800, color: study.accentColor }}>
              {study.clientName.charAt(0)}
            </span>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <IndustryBadge industry={study.clientType} color={study.accentColor} />
            <h3
              style={{
                fontSize: "1.125rem",
                fontWeight: 800,
                color: "#0A1F6B",
                marginTop: "0.5rem",
                letterSpacing: "-0.02em",
              }}
            >
              {study.clientName}
            </h3>
          </div>
        </div>

        {/* Metrics */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${study.metrics.length}, 1fr)`,
            gap: "0.75rem",
            marginBottom: "1.5rem",
            padding: "1rem",
            background: study.bgColor,
            borderRadius: "12px",
          }}
        >
          {study.metrics.map((metric, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 800,
                  color: study.accentColor,
                  letterSpacing: "-0.02em",
                }}
              >
                {metric.value}
              </div>
              <div
                style={{
                  fontSize: "0.6875rem",
                  fontWeight: 600,
                  color: "#6B7280",
                  textTransform: "uppercase",
                  letterSpacing: "0.03em",
                  marginTop: "0.125rem",
                }}
              >
                {metric.label}
              </div>
            </div>
          ))}
        </div>

        {/* Use case */}
        <div style={{ marginBottom: "1.25rem" }}>
          <span
            style={{
              fontSize: "0.75rem",
              fontWeight: 700,
              color: "#374151",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Use Case
          </span>
          <p style={{ fontSize: "0.9375rem", color: "#374151", marginTop: "0.25rem", fontWeight: 500 }}>
            {study.useCase}
          </p>
        </div>

        {/* Quote */}
        <div
          style={{
            padding: "1rem",
            background: "#F8F9FC",
            borderRadius: "10px",
            borderLeft: `3px solid ${study.accentColor}`,
            marginBottom: "1.5rem",
          }}
        >
          <Quote size={16} color={study.accentColor} style={{ marginBottom: "0.5rem" }} />
          <p
            style={{
              fontSize: "0.875rem",
              color: "#374151",
              lineHeight: 1.6,
              fontStyle: "italic",
              marginBottom: "0.75rem",
            }}
          >
            "{study.quote.text}"
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.125rem" }}>
            <span style={{ fontSize: "0.8125rem", fontWeight: 700, color: "#0A1F6B" }}>
              {study.quote.author}
            </span>
            <span style={{ fontSize: "0.75rem", color: "#6B7280" }}>{study.quote.title}</span>
          </div>
        </div>

        {/* Link */}
        <a
          href="#"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            fontSize: "0.875rem",
            fontWeight: 700,
            color: study.accentColor,
            textDecoration: "none",
            transition: "gap 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.gap = "0.75rem")}
          onMouseLeave={(e) => (e.currentTarget.style.gap = "0.5rem")}
        >
          Read full case study <ArrowRight size={14} />
        </a>
      </div>
    </motion.article>
  );
});

const TestimonialSlider = memo(function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, [next]);

  const current = testimonials[currentIndex];

  return (
    <div
      style={{
        position: "relative",
        background: "linear-gradient(135deg, #1A2AB8 0%, #2563EB 100%)",
        borderRadius: "20px",
        padding: "3rem",
        overflow: "hidden",
      }}
    >
      {/* Background decoration */}
      <div
        style={{
          position: "absolute",
          top: "-50%",
          right: "-10%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.03)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-30%",
          left: "-5%",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.03)",
        }}
      />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "800px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "0.75rem",
              fontWeight: 700,
              color: "rgba(255,255,255,0.7)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            <Quote size={14} /> Video Testimonials
          </span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{ textAlign: "center" }}
          >
            {/* Video placeholder */}
            <div
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                background: `${current.accentColor}20`,
                border: `2px solid ${current.accentColor}40`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1.5rem",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  background: current.accentColor,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>

            <p
              style={{
                fontSize: "1.25rem",
                color: "#fff",
                lineHeight: 1.6,
                fontStyle: "italic",
                marginBottom: "2rem",
                fontWeight: 400,
              }}
            >
              "{current.quote}"
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem", alignItems: "center" }}>
              <span style={{ fontSize: "1rem", fontWeight: 700, color: "#fff" }}>{current.author}</span>
              <span style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.7)" }}>{current.title}</span>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.375rem",
                  marginTop: "0.5rem",
                  fontSize: "0.6875rem",
                  fontWeight: 700,
                  color: current.accentColor,
                  background: "rgba(255,255,255,0.1)",
                  padding: "0.25rem 0.75rem",
                  borderRadius: "9999px",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                {current.company}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginTop: "2rem" }}>
          <button
            onClick={prev}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "#fff",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.2)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
          >
            <ChevronLeft size={18} />
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                style={{
                  width: i === currentIndex ? "24px" : "8px",
                  height: "8px",
                  borderRadius: "4px",
                  background: i === currentIndex ? "#fff" : "rgba(255,255,255,0.3)",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </div>
          <button
            onClick={next}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "#fff",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.2)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
});

// ─── NAVBAR ──────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

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
            { label: "Agents", id: "agents-section" },
            { label: "How It Works", id: "workflow-section" },
            { label: "Case Studies", id: "case-studies" },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => scrollTo(item.id)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "0.9375rem",
                fontWeight: 500,
                color: "#374151",
                padding: "0.5rem 0.875rem",
                borderRadius: "6px",
                transition: "color 0.15s, background 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#2563EB";
                e.currentTarget.style.background = "#EFF6FF";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#374151";
                e.currentTarget.style.background = "none";
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
        <button
          onClick={() => scrollTo("contact-section")}
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
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#1D4ED8")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#2563EB")}
        >
          Get a Proposal
        </button>
      </div>
    </nav>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────
function Footer() {
  const footerCols = [
    { title: "Services", links: ["AI Voice Agents", "AI Consulting", "Automation Solutions", "Enterprise Integrations"] },
    { title: "Industries", links: ["Healthcare", "BFSI", "Hospitality", "Ecommerce", "EdTech"] },
    { title: "Company", links: ["About Us", "Case Studies", "Blogs", "Careers", "Contact"] },
    { title: "Legal", links: ["Privacy Policy", "Terms of Use", "Cookie Policy"] },
  ];

  return (
    <footer id="contact-section">
      <div
        style={{
          background: "#fff",
          borderTop: "1px solid #E5E7EB",
          padding: "4rem 0 0",
        }}
      >
        <div className="footer-main">
          <div className="footer-brand">
            <div style={{ marginBottom: "0.75rem" }}>
              <Image
                src="/Layer_1.png"
                alt="Enlight AI"
                width={140}
                height={36}
                style={{ objectFit: "contain", height: "32px", width: "auto" }}
              />
            </div>
            <p className="footer-brand-tagline">
              Enterprise AI Voice Agents for healthcare, BFSI, hospitality, ecommerce, and education.
            </p>
            <button
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
                marginTop: "0.5rem",
              }}
            >
              contact@enlightlab.com
            </button>
          </div>
          {footerCols.map((col) => (
            <div key={col.title}>
              <div className="footer-col-title">{col.title}</div>
              <div className="footer-col-links">
                {col.links.map((link) => (
                  <button key={link} className="footer-col-link">
                    {link}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <p className="footer-copy">Copyright 2026 Enlight AI. All Rights Reserved.</p>
          <div className="footer-bottom-links">
            <button className="footer-bottom-link">Privacy Policy</button>
            <button className="footer-bottom-link">Terms of Use</button>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── PAGE ────────────────────────────────────────────────────────────
export default function CaseStudiesPage() {
  const [activeIndustry, setActiveIndustry] = useState("all");

  const filteredStudies = activeIndustry === "all"
    ? caseStudies
    : caseStudies.filter((s) => s.industry === activeIndustry);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

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
      <Navbar />

      {/* ── HERO ── */}
      <header
        style={{
          position: "relative",
          padding: "6rem 0 4rem",
          background: "linear-gradient(180deg, #fff 0%, #F8F9FC 100%)",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 2rem",
            textAlign: "center",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" as const }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: "0.75rem",
                fontWeight: 700,
                color: "#2563EB",
                background: "#EFF6FF",
                padding: "0.375rem 1rem",
                borderRadius: "9999px",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: "1.5rem",
              }}
            >
              <CheckCircle2 size={12} /> Case Studies
            </span>
            <h1
              style={{
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
                color: "#0A1F6B",
                marginBottom: "1.5rem",
              }}
            >
              Success Stories from<br />
              <span style={{ color: "#2563EB" }}>Industry Leaders</span>
            </h1>
            <p
              style={{
                fontSize: "1.125rem",
                color: "#374151",
                maxWidth: "560px",
                margin: "0 auto",
                lineHeight: 1.7,
              }}
            >
              See how enterprises transform operations with AI voice agents. Real results, real impact.
            </p>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div
          style={{
            position: "absolute",
            top: "20%",
            left: "5%",
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            right: "8%",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(37,99,235,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
      </header>

      {/* ── KEY METRICS BAR ── */}
      <section
        className="reveal"
        style={{
          background: "#fff",
          borderTop: "1px solid #E5E7EB",
          borderBottom: "1px solid #E5E7EB",
          padding: "2.5rem 0",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 2rem",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "2rem",
          }}
        >
          {keyMetrics.map((metric, i) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  padding: "1rem",
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    background: "#EFF6FF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1rem",
                  }}
                >
                  <Icon size={22} color="#2563EB" />
                </div>
                <span
                  style={{
                    fontSize: "2rem",
                    fontWeight: 800,
                    color: "#0A1F6B",
                    letterSpacing: "-0.03em",
                    lineHeight: 1,
                  }}
                >
                  {metric.value}
                </span>
                <span
                  style={{
                    fontSize: "0.8125rem",
                    color: "#6B7280",
                    marginTop: "0.5rem",
                    fontWeight: 500,
                  }}
                >
                  {metric.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── CASE STUDIES GRID ── */}
      <section id="case-studies" style={{ padding: "5rem 0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem" }}>
          {/* Section header */}
          <div className="section-header reveal">
            <div>
              <div className="section-eyebrow">Our Work</div>
              <h2 className="section-title">
                Real Results from<br />
                <span className="section-title-italic">Real Enterprises</span>
              </h2>
            </div>
          </div>

          {/* Industry filter */}
          <div className="reveal" style={{ marginBottom: "3rem" }}>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.5rem",
                padding: "0.375rem",
                background: "#fff",
                border: "1.5px solid #E5E7EB",
                borderRadius: "12px",
                width: "fit-content",
              }}
            >
              {industries.map((ind) => {
                const Icon = ind.icon;
                return (
                  <button
                    key={ind.id}
                    onClick={() => setActiveIndustry(ind.id)}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      padding: "0.625rem 1.25rem",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      border: "none",
                      borderRadius: "8px",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      background: activeIndustry === ind.id ? "#2563EB" : "transparent",
                      color: activeIndustry === ind.id ? "#fff" : "#6B7280",
                    }}
                    onMouseEnter={(e) => {
                      if (activeIndustry !== ind.id) {
                        e.currentTarget.style.background = "#F3F4F6";
                        e.currentTarget.style.color = "#374151";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (activeIndustry !== ind.id) {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.color = "#6B7280";
                      }
                    }}
                  >
                    <Icon size={14} />
                    {ind.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Case study cards */}
          <motion.div
            layout
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
              gap: "1.5rem",
            }}
          >
            <AnimatePresence mode="popLayout">
              {filteredStudies.map((study, i) => (
                <CaseStudyCard key={study.id} study={study} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ── TESTIMONIAL SLIDER ── */}
      <section style={{ padding: "0 0 5rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem" }}>
          <div className="reveal">
            <TestimonialSlider />
          </div>
        </div>
      </section>

      {/* ── DOWNLOAD SECTION ── */}
      <section className="reveal" style={{ padding: "3rem 0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem" }}>
          <div
            style={{
              background: "#fff",
              border: "1.5px solid #E5E7EB",
              borderRadius: "16px",
              padding: "2.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1.5rem",
            }}
          >
            <div>
              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 800,
                  color: "#0A1F6B",
                  marginBottom: "0.5rem",
                  letterSpacing: "-0.02em",
                }}
              >
                Download Case Study PDFs
              </h3>
              <p style={{ fontSize: "0.9375rem", color: "#6B7280" }}>
                Get detailed case studies with full metrics and implementation details.
              </p>
            </div>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <button
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.875rem 1.5rem",
                  background: "#2563EB",
                  color: "#fff",
                  borderRadius: "8px",
                  fontSize: "0.9375rem",
                  fontWeight: 700,
                  border: "none",
                  cursor: "pointer",
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#1D4ED8")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#2563EB")}
              >
                <Download size={16} />
                Download All PDFs
              </button>
              <button
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.875rem 1.5rem",
                  background: "transparent",
                  color: "#2563EB",
                  border: "2px solid #2563EB",
                  borderRadius: "8px",
                  fontSize: "0.9375rem",
                  fontWeight: 700,
                  cursor: "pointer",
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
                View All Case Studies
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section style={{ padding: "0 0 5rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem" }}>
          <div
            className="reveal"
            style={{
              position: "relative",
              background: "linear-gradient(135deg, #1A2AB8 0%, #2563EB 100%)",
              borderRadius: "20px",
              padding: "4rem 3rem",
              textAlign: "center",
              overflow: "hidden",
            }}
          >
            {/* Background decoration */}
            <div
              style={{
                position: "absolute",
                top: "-50%",
                right: "-10%",
                width: "400px",
                height: "400px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.03)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "-30%",
                left: "-5%",
                width: "300px",
                height: "300px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.03)",
              }}
            />

            <div style={{ position: "relative", zIndex: 1 }}>
              <h2
                style={{
                  fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                  fontWeight: 800,
                  color: "#fff",
                  marginBottom: "1rem",
                  letterSpacing: "-0.03em",
                }}
              >
                Want results like these?
              </h2>
              <p
                style={{
                  fontSize: "1.0625rem",
                  color: "rgba(255,255,255,0.85)",
                  marginBottom: "2rem",
                  maxWidth: "500px",
                  margin: "0 auto 2rem",
                  lineHeight: 1.6,
                }}
              >
                <button className="btn btn-outline" style={{ color: "#fff", borderColor: "rgba(255,255,255,0.4)" }}>
                  See Live Demo
                </button>
              </p>
              <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                <button
                  onClick={() => scrollTo("contact-section")}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.875rem 2rem",
                    background: "#fff",
                    color: "#2563EB",
                    borderRadius: "8px",
                    fontSize: "1rem",
                    fontWeight: 700,
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#F0F0FF")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}
                >
                  Schedule a Consultation <ArrowRight size={16} />
                </button>
                <button
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.875rem 2rem",
                    background: "rgba(255,255,255,0.12)",
                    color: "#fff",
                    borderRadius: "8px",
                    fontSize: "1rem",
                    fontWeight: 700,
                    border: "1.5px solid rgba(255,255,255,0.3)",
                    cursor: "pointer",
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.22)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.12)")}
                >
                  View Live Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}