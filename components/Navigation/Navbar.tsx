"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

const navItems = [
  { label: "About",        id: "about-section" },
  { label: "Services",     id: "agents-section" },
  { label: "Industries",   id: "industries-section" },
  { label: "Case Studies", id: "cases-section" },
  { label: "Blogs",        id: "contact-section" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "#ffffff",
        borderBottom: "1px solid #e5e7eb",
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
        {/* ── Logo ── */}
        <div style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
          <Image
            src="/Layer_1.png"
            alt="Enlight AI"
            width={160}
            height={40}
            style={{ objectFit: "contain", height: "36px", width: "auto" }}
            priority
          />
        </div>

        {/* ── Center Nav ── */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
          {navItems.map((item) => (
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
              onMouseEnter={e => {
                const b = e.currentTarget;
                b.style.color = "#2563EB";
                b.style.background = "#EFF6FF";
              }}
              onMouseLeave={e => {
                const b = e.currentTarget;
                b.style.color = "#374151";
                b.style.background = "none";
              }}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* ── CTA ── */}
        <button
          onClick={() => scrollTo("contact-section")}
          style={{
            background: "#2563EB",
            color: "#ffffff",
            border: "none",
            borderRadius: "8px",
            padding: "0.625rem 1.5rem",
            fontSize: "0.9375rem",
            fontWeight: 700,
            cursor: "pointer",
            transition: "background 0.15s",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={e => { (e.currentTarget).style.background = "#1D4ED8"; }}
          onMouseLeave={e => { (e.currentTarget).style.background = "#2563EB"; }}
        >
          Get a Proposal
        </button>
      </div>
    </nav>
  );
};