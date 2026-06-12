"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Platform", href: "/platform" },
  { label: "Solutions", href: "/industries", hasDropdown: true },
  { label: "Resources", href: "/docs" },
  { label: "Pricing", href: "/pricing" },
  { label: "Company", href: "/about" },
];

const industryOptions = [
  { name: "Healthcare", description: "Patient intake, appointment scheduling, and care coordination", icon: "🏥" },
  { name: "BFSI", description: "Lead qualification, account services, and fraud resolution", icon: "🏦" },
  { name: "Hospitality", description: "Booking assistance, concierge services, and guest relations", icon: "🏨" },
  { name: "Ecommerce", description: "Order tracking, returns processing, and product recommendations", icon: "🛒" },
  { name: "EdTech", description: "Enrollment support, student onboarding, and course guidance", icon: "🎓" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsSolutionsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          height: "68px",
          background: "#ffffff",
          borderBottom: "1px solid #E5E7EB",
          boxShadow: isScrolled ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
          transition: "box-shadow 0.2s ease",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 1.5rem",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              textDecoration: "none",
            }}
          >
            <div
              style={{
                width: "34px",
                height: "34px",
                borderRadius: "8px",
                background: "#2563EB",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: "#fff",
                }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
            <span
              style={{
                fontSize: "1rem",
                fontWeight: 700,
                color: "#0A1F6B",
                letterSpacing: "-0.02em",
              }}
            >
              Voice by Enlight Lab
            </span>
            <span
              style={{
                fontSize: "0.625rem",
                fontWeight: 700,
                color: "#6B7280",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              AI Voice Agents
            </span>
          </div>
          </Link>

          {/* Desktop Navigation */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.25rem",
            }}
            className="hidden md:flex"
          >
            {navItems.map((item) =>
              item.hasDropdown ? (
                <div key={item.label} ref={dropdownRef} style={{ position: "relative" }}>
                  <button
                    onClick={() => setIsSolutionsOpen(!isSolutionsOpen)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.25rem",
                      padding: "0.5rem 0.875rem",
                      fontSize: "0.9375rem",
                      fontWeight: 500,
                      color: isSolutionsOpen ? "#2563EB" : "#374151",
                      background: "none",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                      transition: "color 150ms, background 150ms",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#2563EB";
                      e.currentTarget.style.background = "#EFF6FF";
                    }}
                    onMouseLeave={(e) => {
                      if (!isSolutionsOpen) {
                        e.currentTarget.style.color = "#374151";
                        e.currentTarget.style.background = "none";
                      }
                    }}
                  >
                    {item.label}
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      style={{
                        transition: "transform 150ms",
                        transform: isSolutionsOpen ? "rotate(180deg)" : "rotate(0deg)",
                      }}
                    >
                      <path
                        d="M2 4L6 8L10 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  {/* Mega Menu */}
                  {isSolutionsOpen && (
                    <div
                      style={{
                        position: "absolute",
                        top: "calc(100% + 0.5rem)",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "520px",
                        background: "#fff",
                        border: "1px solid #E5E7EB",
                        borderRadius: "12px",
                        boxShadow: "0 20px 40px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.06)",
                        padding: "1rem",
                        display: "grid",
                        gridTemplateColumns: "repeat(2, 1fr)",
                        gap: "0.5rem",
                      }}
                    >
                      {industryOptions.map((industry) => (
                        <Link
                          key={industry.name}
                          href="/industries"
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "0.875rem",
                            padding: "0.875rem",
                            borderRadius: "8px",
                            textDecoration: "none",
                            transition: "background 150ms",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = "#F5F7FF";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "none";
                          }}
                          onClick={() => setIsSolutionsOpen(false)}
                        >
                          <span style={{ fontSize: "1.5rem", lineHeight: 1 }}>{industry.icon}</span>
                          <div>
                            <div
                              style={{
                                fontSize: "0.875rem",
                                fontWeight: 600,
                                color: "#0A1F6B",
                                marginBottom: "0.25rem",
                              }}
                            >
                              {industry.name}
                            </div>
                            <div
                              style={{
                                fontSize: "0.75rem",
                                color: "#6B7280",
                                lineHeight: 1.4,
                              }}
                            >
                              {industry.description}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  style={{
                    padding: "0.5rem 0.875rem",
                    fontSize: "0.9375rem",
                    fontWeight: 500,
                    color: "#374151",
                    textDecoration: "none",
                    borderRadius: "6px",
                    transition: "color 150ms, background 150ms",
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
                </Link>
              )
            )}
          </div>

          {/* CTAs */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <Link
              href="/contact"
              style={{
                padding: "0.625rem 1.25rem",
                fontSize: "0.9375rem",
                fontWeight: 600,
                color: "#2563EB",
                textDecoration: "none",
                border: "2px solid #2563EB",
                borderRadius: "8px",
                transition: "all 150ms",
              }}
              className="hidden md:inline-flex"
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#2563EB";
                e.currentTarget.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "none";
                e.currentTarget.style.color = "#2563EB";
              }}
            >
              Talk to Sales
            </Link>
            <Link
              href="/demo"
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "0.625rem 1.5rem",
                fontSize: "0.9375rem",
                fontWeight: 700,
                color: "#fff",
                background: "#2563EB",
                border: "none",
                borderRadius: "8px",
                textDecoration: "none",
                transition: "background 150ms",
              }}
              className="hidden md:inline-flex"
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#1D4ED8";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#2563EB";
              }}
            >
              Book Demo
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "44px",
                height: "44px",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "10px",
              }}
              className="md:hidden"
              aria-label="Toggle menu"
            >
              <div
                style={{
                  width: "22px",
                  height: "2px",
                  background: "#374151",
                  borderRadius: "2px",
                  transition: "all 200ms",
                  transform: isMobileMenuOpen ? "rotate(45deg) translate(5px, 5px)" : "none",
                }}
              />
              <div
                style={{
                  width: "22px",
                  height: "2px",
                  background: "#374151",
                  borderRadius: "2px",
                  marginTop: "5px",
                  transition: "all 200ms",
                  opacity: isMobileMenuOpen ? 0 : 1,
                }}
              />
              <div
                style={{
                  width: "22px",
                  height: "2px",
                  background: "#374151",
                  borderRadius: "2px",
                  marginTop: "5px",
                  transition: "all 200ms",
                  transform: isMobileMenuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none",
                }}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 40,
          background: "#fff",
          paddingTop: "68px",
          overflowY: "auto",
          transform: isMobileMenuOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 300ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        className="md:hidden"
      >
        <div
          style={{
            padding: "1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              style={{
                display: "block",
                padding: "1rem",
                fontSize: "1.125rem",
                fontWeight: 500,
                color: "#374151",
                textDecoration: "none",
                borderRadius: "8px",
                transition: "background 150ms",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#F5F7FF";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "none";
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Mobile CTAs */}
        <div
          style={{
            padding: "1.5rem",
            borderTop: "1px solid #E5E7EB",
            marginTop: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
          }}
        >
          <Link
            href="/contact"
            onClick={() => setIsMobileMenuOpen(false)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "1rem",
              fontSize: "1rem",
              fontWeight: 600,
              color: "#2563EB",
              background: "transparent",
              border: "2px solid #2563EB",
              borderRadius: "8px",
              textDecoration: "none",
              transition: "all 150ms",
            }}
          >
            Talk to Sales
          </Link>
          <Link
            href="/demo"
            onClick={() => setIsMobileMenuOpen(false)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "1rem",
              fontSize: "1rem",
              fontWeight: 700,
              color: "#fff",
              background: "#2563EB",
              border: "none",
              borderRadius: "8px",
              textDecoration: "none",
              transition: "background 150ms",
            }}
          >
            Book Demo
          </Link>
        </div>
      </div>
    </>
  );
}