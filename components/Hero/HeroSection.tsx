"use client";
import React from "react";
import { ArrowRight, Phone } from "lucide-react";

export const HeroSection: React.FC = () => {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <section
      style={{
        background: "#F8F9FC",
        padding: "6rem 0 5rem",
        minHeight: "calc(100vh - 68px)",
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
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "4rem",
          alignItems: "center",
        }}
      >
        {/* ── LEFT: Copy ── */}
        <div>
          {/* Eyebrow line */}
          <p
            style={{
              fontSize: "1.0625rem",
              fontWeight: 400,
              color: "#374151",
              marginBottom: "0.75rem",
              lineHeight: 1.5,
            }}
          >
            Your Award-Winning AI Voice Technology Partner Delivering
          </p>

          {/* Main headline — dark navy, heavy */}
          <h1
            style={{
              fontSize: "clamp(2.5rem, 4.5vw, 3.5rem)",
              fontWeight: 800,
              color: "#0A1F6B",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              marginBottom: "1.5rem",
            }}
          >
            Enterprise AI Voice Agents That Scale Operations
          </h1>

          {/* Sub-copy */}
          <p
            style={{
              fontSize: "1rem",
              color: "#4B5563",
              lineHeight: 1.7,
              marginBottom: "0.875rem",
              maxWidth: "520px",
            }}
          >
            Deploy AI voice agents for customer support, appointment booking, lead
            qualification, collections, hospitality, healthcare, and banking.
          </p>

          {/* Bold tagline */}
          <p
            style={{
              fontSize: "0.9375rem",
              fontWeight: 700,
              color: "#111827",
              marginBottom: "2rem",
            }}
          >
            Scale Faster. Automate Smarter. Operate Confidently.
          </p>

          {/* CTA buttons */}
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <button
              onClick={() => scrollTo("contact-section")}
              style={{
                background: "#2563EB",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                padding: "0.875rem 1.75rem",
                fontSize: "0.9375rem",
                fontWeight: 700,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                transition: "background 0.15s",
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.background = "#1D4ED8")}
              onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = "#2563EB")}
            >
              Book Consultation
            </button>
            <button
              onClick={() => scrollTo("agents-section")}
              style={{
                background: "transparent",
                color: "#2563EB",
                border: "2px solid #2563EB",
                borderRadius: "8px",
                padding: "0.875rem 1.75rem",
                fontSize: "0.9375rem",
                fontWeight: 700,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                transition: "all 0.15s",
              }}
              onMouseEnter={e => {
                const b = e.currentTarget as HTMLButtonElement;
                b.style.background = "#2563EB";
                b.style.color = "#fff";
              }}
              onMouseLeave={e => {
                const b = e.currentTarget as HTMLButtonElement;
                b.style.background = "transparent";
                b.style.color = "#2563EB";
              }}
            >
              <Phone size={15} />
              Talk to an AI Agent
            </button>
          </div>
        </div>

        {/* ── RIGHT: SVG Illustration ── */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <HeroIllustration />
        </div>
      </div>
    </section>
  );
};

/* ─── inline SVG illustration matching EnlightLab style (robot + human speech bubbles) ─── */
function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 480 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", maxWidth: "460px" }}
    >
      {/* Background speech bubble (bot) */}
      <rect x="140" y="20" width="280" height="160" rx="24" fill="white" stroke="#BFDBFE" strokeWidth="2"/>
      <polygon points="180,180 160,210 210,180" fill="white" stroke="#BFDBFE" strokeWidth="2"/>

      {/* Lines inside bot bubble */}
      <rect x="168" y="55" width="160" height="10" rx="5" fill="#BFDBFE"/>
      <rect x="168" y="75" width="200" height="10" rx="5" fill="#BFDBFE"/>
      <rect x="168" y="95" width="130" height="10" rx="5" fill="#BFDBFE"/>
      <rect x="168" y="115" width="180" height="10" rx="5" fill="#BFDBFE"/>

      {/* Bot face */}
      <circle cx="168" cy="85" r="42" fill="#1E293B"/>
      <circle cx="168" cy="85" r="36" fill="#334155"/>
      {/* Eyes */}
      <ellipse cx="156" cy="80" rx="7" ry="8" fill="white"/>
      <ellipse cx="180" cy="80" rx="7" ry="8" fill="white"/>
      <circle cx="158" cy="82" r="4" fill="#1E293B"/>
      <circle cx="182" cy="82" r="4" fill="#1E293B"/>
      {/* Smile */}
      <path d="M155 95 Q168 106 181 95" stroke="white" strokeWidth="3" strokeLinecap="round" fill="none"/>
      {/* Antenna */}
      <line x1="168" y1="43" x2="168" y2="30" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round"/>
      <circle cx="168" cy="27" r="5" fill="#2563EB"/>

      {/* Human speech bubble */}
      <rect x="60" y="200" width="260" height="140" rx="24" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="2"/>
      <polygon points="280,340 310,370 290,340" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="2"/>

      {/* Chat input bar inside bubble */}
      <rect x="80" y="290" width="220" height="36" rx="18" fill="white" stroke="#DBEAFE" strokeWidth="1.5"/>
      {/* Smiley icon */}
      <circle cx="100" cy="308" r="10" stroke="#9CA3AF" strokeWidth="1.5" fill="none"/>
      <circle cx="96" cy="305" r="1.5" fill="#9CA3AF"/>
      <circle cx="104" cy="305" r="1.5" fill="#9CA3AF"/>
      <path d="M96 311 Q100 315 104 311" stroke="#9CA3AF" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      {/* Dots */}
      <circle cx="130" cy="308" r="2.5" fill="#9CA3AF"/>
      <circle cx="140" cy="308" r="2.5" fill="#9CA3AF"/>
      <circle cx="150" cy="308" r="2.5" fill="#9CA3AF"/>
      {/* Mic icon */}
      <rect x="260" y="298" width="20" height="24" rx="10" fill="none" stroke="#2563EB" strokeWidth="1.5"/>
      <path d="M255 316 Q255 328 270 328 Q285 328 285 316" stroke="#2563EB" strokeWidth="1.5" fill="none"/>
      <line x1="270" y1="328" x2="270" y2="336" stroke="#2563EB" strokeWidth="1.5"/>

      {/* Lines inside human bubble */}
      <rect x="80" y="228" width="140" height="10" rx="5" fill="#BFDBFE"/>
      <rect x="80" y="248" width="200" height="10" rx="5" fill="#BFDBFE"/>
      <rect x="80" y="268" width="160" height="10" rx="5" fill="#BFDBFE"/>

      {/* Human figure */}
      <circle cx="330" cy="330" r="38" fill="#E0E7FF"/>
      {/* Head */}
      <circle cx="330" cy="305" r="22" fill="#F3D9C2"/>
      {/* Hair */}
      <path d="M308 300 Q315 275 330 278 Q345 275 352 300" fill="#1E293B"/>
      {/* Body */}
      <path d="M300 370 Q305 340 330 338 Q355 340 360 370" fill="#6B7280"/>
      {/* Collar */}
      <path d="M318 338 L330 350 L342 338" stroke="#9CA3AF" strokeWidth="2" fill="none"/>
    </svg>
  );
}