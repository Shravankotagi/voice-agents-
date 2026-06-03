"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

// ─── DATA ────────────────────────────────────────────────────────────
const trustLogos = ["Mozilla Foundation", "Emblazer", "Go2Andaman", "Homeloft", "HUMA"];

const footerColumns = [
  {
    title: "Product",
    links: [
      { label: "AI Voice Agents", href: "#" },
      { label: "Features", href: "#" },
      { label: "Integrations", href: "#" },
      { label: "Security", href: "#" },
      { label: "Pricing", href: "#" },
      { label: "Enterprise", href: "#" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Healthcare", href: "#" },
      { label: "BFSI", href: "#" },
      { label: "Hospitality", href: "#" },
      { label: "Ecommerce", href: "#" },
      { label: "EdTech", href: "#" },
      { label: "Logistics", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Press", href: "#" },
      { label: "Contact", href: "#" },
      { label: "Blog", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "#" },
      { label: "API Reference", href: "#" },
      { label: "Case Studies", href: "#" },
      { label: "Webinars", href: "#" },
      { label: "Community", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Cookie Policy", href: "#" },
      { label: "GDPR", href: "#" },
    ],
  },
];

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/enlightai",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Twitter",
    href: "https://twitter.com/enlightai",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

// ─── STYLES ──────────────────────────────────────────────────────────
const styles = {
  trustBar: {
    background: "#1A2AB8",
    padding: "1.25rem 2rem",
  },
  trustInner: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    gap: "1rem",
  },
  trustLabel: {
    fontSize: "0.8125rem",
    fontWeight: 600,
    color: "#FFFFFF",
    letterSpacing: "0.05em",
    textTransform: "uppercase" as const,
    opacity: 0.9,
  },
  trustLogos: {
    display: "flex",
    alignItems: "center",
    gap: "2.5rem",
    flexWrap: "wrap" as const,
    justifyContent: "center",
  },
  trustLogo: {
    fontSize: "0.875rem",
    fontWeight: 700,
    color: "#FFFFFF",
    opacity: 0.7,
    letterSpacing: "0.02em",
    transition: "opacity 0.2s ease",
  },
  footer: {
    background: "#FFFFFF",
    borderTop: "1px solid #E5E7EB",
  },
  footerMain: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "3.5rem 2rem 2.5rem",
    display: "grid",
    gridTemplateColumns: "1.5fr repeat(5, 1fr)",
    gap: "2rem",
    "@media (maxWidth: 1024px)": {
      gridTemplateColumns: "repeat(3, 1fr)",
    },
    "@media (maxWidth: 640px)": {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
  },
  brand: {
    paddingRight: "2rem",
  },
  brandLogo: {
    marginBottom: "1rem",
  },
  brandTagline: {
    fontSize: "0.875rem",
    color: "#374151",
    lineHeight: 1.6,
    marginBottom: "1rem",
  },
  brandContact: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "0.75rem",
  },
  contactEmail: {
    fontSize: "0.875rem",
    fontWeight: 600,
    color: "#2563EB",
    textDecoration: "none",
    transition: "color 0.15s ease",
  },
  socialLinks: {
    display: "flex",
    gap: "0.5rem",
    marginTop: "1rem",
  },
  socialButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0.5rem",
    borderRadius: "8px",
    background: "#2563EB",
    color: "#FFFFFF",
    border: "none",
    cursor: "pointer",
    transition: "background 0.15s ease, transform 0.15s ease",
  },
  column: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "0.5rem",
  },
  columnTitle: {
    fontSize: "0.75rem",
    fontWeight: 700,
    color: "#2563EB",
    textTransform: "uppercase" as const,
    letterSpacing: "0.08em",
    marginBottom: "0.5rem",
  },
  columnLinks: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "0.625rem",
  },
  columnLink: {
    fontSize: "0.875rem",
    color: "#374151",
    textDecoration: "none",
    transition: "color 0.15s ease",
    cursor: "pointer",
  },
  footerBottom: {
    borderTop: "1px solid #E5E7EB",
    padding: "1.5rem 2rem",
  },
  footerBottomInner: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap" as const,
    gap: "1rem",
  },
  copyright: {
    fontSize: "0.875rem",
    color: "#374151",
  },
  bottomLinks: {
    display: "flex",
    gap: "1.5rem",
  },
  bottomLink: {
    fontSize: "0.875rem",
    color: "#374151",
    textDecoration: "none",
    transition: "color 0.15s ease",
    cursor: "pointer",
  },
};

// ─── COMPONENT ───────────────────────────────────────────────────────
export default function Footer() {
  return (
    <footer style={styles.footer}>
      {/* Trust Bar */}
      <div style={styles.trustBar}>
        <div style={styles.trustInner}>
          <span style={styles.trustLabel}>Trusted by Fortune-Grade Global Leaders</span>
          <div style={styles.trustLogos}>
            {trustLogos.map((logo) => (
              <span
                key={logo}
                style={styles.trustLogo}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.opacity = "1")}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.opacity = "0.7")}
              >
                {logo}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "3.5rem 2rem 2.5rem" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: "2rem",
          }}
          className="footer-grid"
        >
          {/* Brand Column */}
          <div style={styles.brand}>
            <div style={styles.brandLogo}>
              <Image src="/Layer_1.png" alt="Voice by Enlight Lab" width={140} height={36} style={{ objectFit: "contain", height: "32px", width: "auto" }} />
            </div>
            <p style={styles.brandTagline}>
              Enterprise AI Voice Agents for healthcare, BFSI, hospitality, ecommerce, and education.
            </p>
            <div style={styles.brandContact}>
              <a href="mailto:contact@enlightai.com" style={styles.contactEmail}>
                contact@enlightai.com
              </a>
              <div style={styles.socialLinks}>
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    style={styles.socialButton}
                    onMouseEnter={(e) => {
                      const btn = e.currentTarget as HTMLElement;
                      btn.style.background = "#1D4ED8";
                      btn.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      const btn = e.currentTarget as HTMLElement;
                      btn.style.background = "#2563EB";
                      btn.style.transform = "translateY(0)";
                    }}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Link Columns */}
          {footerColumns.map((col) => (
            <div key={col.title} style={styles.column}>
              <h3 style={styles.columnTitle}>{col.title}</h3>
              <div style={styles.columnLinks}>
                {col.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    style={styles.columnLink}
                    onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#2563EB")}
                    onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#374151")}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Bottom */}
      <div style={styles.footerBottom}>
        <div style={styles.footerBottomInner}>
          <p style={styles.copyright}>
            Copyright &copy; 2026 Voice by Enlight Lab. All Rights Reserved.
          </p>
          <div style={styles.bottomLinks}>
            <a href="#" style={styles.bottomLink}>Privacy Policy</a>
            <a href="#" style={styles.bottomLink}>Terms of Service</a>
            <a href="#" style={styles.bottomLink}>Cookie Policy</a>
            <a href="#" style={styles.bottomLink}>GDPR</a>
          </div>
        </div>
      </div>

      {/* Responsive Styles via CSS */}
      <style jsx>{`
        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 480px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
          .footer-bottom-inner {
            flex-direction: column;
            text-align: center;
          }
          .bottom-links {
            flex-wrap: wrap;
            justify-content: center;
          }
        }
      `}</style>
    </footer>
  );
}