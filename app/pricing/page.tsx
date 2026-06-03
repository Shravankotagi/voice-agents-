"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check, X, ChevronDown, ChevronUp, Calculator,
  ArrowRight, Users, Phone, Zap, Shield, BarChart3,
  Headphones, Globe, Clock, TrendingUp
} from "lucide-react";

// ─── DATA ────────────────────────────────────────────────────────────
const plans = [
  {
    id: "starter",
    name: "Starter",
    price: "$499",
    period: "/month",
    description: "For small businesses getting started",
    highlight: false,
    dark: false,
    features: [
      { label: "Up to 1,000 calls/month", included: true },
      { label: "3 AI agents", included: true },
      { label: "Basic integrations", included: true },
      { label: "Email support", included: true },
      { label: "Standard analytics", included: true },
      { label: "Custom workflows", included: false },
      { label: "SLA guarantee", included: false },
      { label: "API access", included: false },
    ],
  },
  {
    id: "professional",
    name: "Professional",
    price: "$1,499",
    period: "/month",
    description: "For growing companies",
    highlight: true,
    dark: false,
    badge: "Most Popular",
    features: [
      { label: "Up to 10,000 calls/month", included: true },
      { label: "10 AI agents", included: true },
      { label: "All integrations", included: true },
      { label: "Priority support", included: true },
      { label: "Advanced analytics", included: true },
      { label: "Custom workflows", included: true },
      { label: "SLA guarantee", included: false },
      { label: "API access", included: false },
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Custom",
    period: "pricing",
    description: "For large enterprises",
    highlight: false,
    dark: true,
    features: [
      { label: "Unlimited calls", included: true },
      { label: "Unlimited agents", included: true },
      { label: "All integrations", included: true },
      { label: "Dedicated account manager", included: true },
      { label: "Advanced analytics", included: true },
      { label: "Custom workflows", included: true },
      { label: "SLA guarantee", included: true },
      { label: "API access", included: true },
    ],
  },
];

const featureComparison = [
  {
    category: "Capacity",
    features: [
      { name: "Calls per month", starter: "1,000", professional: "10,000", enterprise: "Unlimited" },
      { name: "AI agents", starter: "3", professional: "10", enterprise: "Unlimited" },
    ],
  },
  {
    category: "Integrations & Support",
    features: [
      { name: "Integrations", starter: "Basic", professional: "All", enterprise: "All + Custom" },
      { name: "Support level", starter: "Email", professional: "Priority", enterprise: "Dedicated manager" },
    ],
  },
  {
    category: "Features",
    features: [
      { name: "Analytics", starter: "Standard", professional: "Advanced", enterprise: "Advanced + Custom" },
      { name: "Custom workflows", starter: false, professional: true, enterprise: true },
      { name: "SLA guarantee", starter: false, professional: false, enterprise: true },
    ],
  },
  {
    category: "Enterprise",
    features: [
      { name: "Security certifications", starter: false, professional: false, enterprise: true },
      { name: "On-premise option", starter: false, professional: false, enterprise: true },
      { name: "White-label", starter: false, professional: false, enterprise: true },
    ],
  },
];

const faqs = [
  {
    question: "How does billing work?",
    answer: "Billing is monthly based on your selected plan. You're charged at the beginning of each billing cycle. Overage calls beyond your plan limit are billed at a per-call rate.",
  },
  {
    question: "Can I change plans?",
    answer: "Yes, you can upgrade or downgrade your plan at any time. Upgrades take effect immediately with prorated billing. Downgrades take effect at the start of your next billing cycle.",
  },
  {
    question: "What integrations are included?",
    answer: "Starter includes basic integrations with popular CRM and helpdesk tools. Professional and Enterprise include all standard integrations plus custom API connections for your specific systems.",
  },
  {
    question: "Is there a free trial?",
    answer: "Yes, we offer a 14-day free trial with full access to Professional features. No credit card required. You can explore all capabilities before committing.",
  },
  {
    question: "What happens if I exceed my call limit?",
    answer: "We'll notify you when you're approaching your limit. Overage calls are billed at competitive per-call rates. You can upgrade your plan anytime to avoid overage charges.",
  },
  {
    question: "Do you offer annual discounts?",
    answer: "Yes, annual billing saves 20% compared to monthly. Contact our sales team for custom enterprise pricing and volume discounts.",
  },
];

// ─── COMPONENTS ──────────────────────────────────────────────────────
function PricingCard({ plan }: { plan: typeof plans[0] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" as const }}
      className="pricing-card"
      style={{
        background: plan.dark ? "var(--bg-blue-section)" : "var(--bg-card)",
        borderRadius: "var(--r-xl)",
        padding: plan.highlight ? "2.5rem" : "2rem",
        boxShadow: plan.highlight ? "0 12px 48px rgba(37,99,235,0.15), 0 4px 16px rgba(0,0,0,0.08)" : "var(--shadow-card)",
        border: plan.highlight ? "2px solid var(--blue)" : plan.dark ? "none" : "1.5px solid var(--border-card)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {plan.badge && (
        <div style={{
          position: "absolute",
          top: "1.25rem",
          right: "1.25rem",
          background: "var(--blue)",
          color: "#fff",
          fontSize: "0.6875rem",
          fontWeight: 700,
          padding: "0.375rem 0.875rem",
          borderRadius: "var(--r-full)",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}>
          {plan.badge}
        </div>
      )}

      {plan.highlight && (
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          background: "var(--blue)",
        }} />
      )}

      <div style={{ marginBottom: "1.5rem" }}>
        <h3 style={{
          fontSize: "1.375rem",
          fontWeight: 800,
          color: plan.dark ? "#fff" : "var(--text-heading)",
          marginBottom: "0.5rem",
          letterSpacing: "-0.02em",
        }}>
          {plan.name}
        </h3>
        <p style={{
          fontSize: "0.875rem",
          color: plan.dark ? "rgba(255,255,255,0.7)" : "var(--text-muted)",
          marginBottom: "1.25rem",
        }}>
          {plan.description}
        </p>
        <div style={{ display: "flex", alignItems: "baseline", gap: "0.25rem" }}>
          <span style={{
            fontSize: "2.5rem",
            fontWeight: 800,
            color: plan.dark ? "#fff" : "var(--text-heading)",
            letterSpacing: "-0.04em",
          }}>
            {plan.price}
          </span>
          <span style={{
            fontSize: "0.875rem",
            color: plan.dark ? "rgba(255,255,255,0.6)" : "var(--text-muted)",
          }}>
            {plan.period}
          </span>
        </div>
      </div>

      <ul style={{ listStyle: "none", padding: 0, margin: "0 0 2rem 0", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {plan.features.map((feature, i) => (
          <li key={i} style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            fontSize: "0.9375rem",
            color: plan.dark ? "rgba(255,255,255,0.85)" : "var(--text-body)",
          }}>
            {feature.included ? (
              <Check size={18} style={{ color: plan.dark ? "#86efac" : "var(--blue)", flexShrink: 0 }} />
            ) : (
              <X size={18} style={{ color: plan.dark ? "rgba(255,255,255,0.3)" : "var(--text-faint)", flexShrink: 0 }} />
            )}
            <span style={{ opacity: feature.included ? 1 : 0.5 }}>{feature.label}</span>
          </li>
        ))}
      </ul>

      <button
        style={{
          width: "100%",
          padding: "0.875rem 1.75rem",
          borderRadius: "var(--btn-radius)",
          fontSize: "0.9375rem",
          fontWeight: 700,
          cursor: "pointer",
          transition: "all var(--dur-fast)",
          background: plan.dark ? "#fff" : plan.highlight ? "var(--blue)" : "transparent",
          color: plan.dark ? "var(--blue)" : plan.highlight ? "#fff" : "var(--blue)",
          border: plan.dark ? "none" : plan.highlight ? "none" : "2px solid var(--blue)",
          minHeight: "48px",
        }}
        onMouseEnter={e => {
          if (plan.highlight) e.currentTarget.style.background = "var(--blue-hover)";
          else if (!plan.dark) {
            e.currentTarget.style.background = "var(--blue)";
            e.currentTarget.style.color = "#fff";
          } else {
            e.currentTarget.style.background = "var(--blue-pale)";
          }
        }}
        onMouseLeave={e => {
          if (plan.highlight) e.currentTarget.style.background = "var(--blue)";
          else if (!plan.dark) {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "var(--blue)";
          } else {
            e.currentTarget.style.background = "#fff";
          }
        }}
      >
        {plan.id === "enterprise" ? "Contact Sales" : "Get Started"}
      </button>
    </motion.div>
  );
}

function FeatureComparisonTable() {
  return (
    <div style={{ overflowX: "auto", marginTop: "2rem" }}>
      <table style={{
        width: "100%",
        borderCollapse: "collapse",
        background: "#fff",
        borderRadius: "var(--r-lg)",
        overflow: "hidden",
        boxShadow: "var(--shadow-card)",
        minWidth: "600px",
      }}>
        <thead>
          <tr style={{ background: "var(--bg-section-alt)" }}>
            <th style={{
              padding: "1rem 1.5rem",
              textAlign: "left",
              fontSize: "0.75rem",
              fontWeight: 700,
              color: "var(--text-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              borderBottom: "1px solid var(--border-subtle)",
            }}>
              Feature
            </th>
            {plans.map(plan => (
              <th key={plan.id} style={{
                padding: "1rem 1.5rem",
                textAlign: "center",
                fontSize: "0.875rem",
                fontWeight: 700,
                color: plan.highlight ? "var(--blue)" : "var(--text-heading)",
                borderBottom: "1px solid var(--border-subtle)",
              }}>
                {plan.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {featureComparison.map((section, sIdx) => (
            <React.Fragment key={section.category}>
              <tr>
                <td colSpan={4} style={{
                  padding: "1rem 1.5rem 0.5rem",
                  fontSize: "0.6875rem",
                  fontWeight: 700,
                  color: "var(--blue)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  background: "var(--blue-pale)",
                }}>
                  {section.category}
                </td>
              </tr>
              {section.features.map((feature, fIdx) => (
                <tr key={`${sIdx}-${fIdx}`} style={{
                  borderBottom: fIdx === section.features.length - 1 ? "1px solid var(--border-subtle)" : "none",
                }}>
                  <td style={{
                    padding: "1rem 1.5rem",
                    fontSize: "0.9375rem",
                    color: "var(--text-body)",
                    borderBottom: "1px solid var(--border-subtle)",
                  }}>
                    {feature.name}
                  </td>
                  {["starter", "professional", "enterprise"].map(planId => (
                    <td key={planId} style={{
                      padding: "1rem 1.5rem",
                      textAlign: "center",
                      fontSize: "0.875rem",
                      fontWeight: 500,
                      color: planId === "professional" ? "var(--blue)" : "var(--text-body)",
                      borderBottom: "1px solid var(--border-subtle)",
                    }}>
                      {typeof feature[planId as keyof typeof feature] === "boolean" ? (
                        feature[planId as keyof typeof feature] ? (
                          <Check size={18} style={{ color: "var(--blue)", display: "inline" }} />
                        ) : (
                          <X size={18} style={{ color: "var(--text-faint)", display: "inline" }} />
                        )
                      ) : (
                        <span style={{
                          fontWeight: planId === "professional" ? 700 : 400,
                        }}>
                          {feature[planId as keyof typeof feature] as string}
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ROICalculator() {
  const [callDuration, setCallDuration] = useState(5);
  const [dailyCalls, setDailyCalls] = useState(100);
  const [costPerCall, setCostPerCall] = useState(15);

  const monthlyCalls = dailyCalls * 30;
  const currentMonthlyCost = monthlyCalls * costPerCall;
  const aiCostPerCall = 0.15;
  const aiMonthlyCost = monthlyCalls * aiCostPerCall;
  const monthlySavings = currentMonthlyCost - aiMonthlyCost;
  const annualSavings = monthlySavings * 12;
  const roiPercentage = Math.round((annualSavings / (annualSavings + aiMonthlyCost * 12)) * 100);

  return (
    <div style={{
      background: "#fff",
      borderRadius: "var(--r-xl)",
      padding: "2.5rem",
      boxShadow: "var(--shadow-card)",
      border: "1.5px solid var(--border-card)",
    }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        marginBottom: "2rem",
      }}>
        <div style={{
          width: "48px",
          height: "48px",
          borderRadius: "var(--r-md)",
          background: "var(--blue-pale)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <Calculator size={24} style={{ color: "var(--blue)" }} />
        </div>
        <div>
          <h3 style={{
            fontSize: "1.25rem",
            fontWeight: 800,
            color: "var(--text-heading)",
            letterSpacing: "-0.02em",
          }}>
            ROI Calculator
          </h3>
          <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>
            Estimate your savings with AI voice agents
          </p>
        </div>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "2rem",
      }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div>
            <label style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "0.875rem",
              fontWeight: 600,
              color: "var(--text-heading)",
              marginBottom: "0.5rem",
            }}>
              <span>Average call duration (minutes)</span>
              <span style={{ color: "var(--blue)", fontWeight: 700 }}>{callDuration} min</span>
            </label>
            <input
              type="range"
              min="1"
              max="30"
              value={callDuration}
              onChange={(e) => setCallDuration(Number(e.target.value))}
              style={{
                width: "100%",
                accentColor: "var(--blue)",
                height: "6px",
                cursor: "pointer",
              }}
            />
          </div>

          <div>
            <label style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "0.875rem",
              fontWeight: 600,
              color: "var(--text-heading)",
              marginBottom: "0.5rem",
            }}>
              <span>Daily call volume</span>
              <span style={{ color: "var(--blue)", fontWeight: 700 }}>{dailyCalls}</span>
            </label>
            <input
              type="range"
              min="10"
              max="1000"
              step="10"
              value={dailyCalls}
              onChange={(e) => setDailyCalls(Number(e.target.value))}
              style={{
                width: "100%",
                accentColor: "var(--blue)",
                height: "6px",
                cursor: "pointer",
              }}
            />
          </div>

          <div>
            <label style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "0.875rem",
              fontWeight: 600,
              color: "var(--text-heading)",
              marginBottom: "0.5rem",
            }}>
              <span>Current cost per call ($)</span>
              <span style={{ color: "var(--blue)", fontWeight: 700 }}>${costPerCall}</span>
            </label>
            <input
              type="range"
              min="1"
              max="100"
              value={costPerCall}
              onChange={(e) => setCostPerCall(Number(e.target.value))}
              style={{
                width: "100%",
                accentColor: "var(--blue)",
                height: "6px",
                cursor: "pointer",
              }}
            />
          </div>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1rem",
        }}>
          <div style={{
            background: "var(--blue-pale)",
            borderRadius: "var(--r-lg)",
            padding: "1.25rem",
            textAlign: "center",
          }}>
            <TrendingUp size={20} style={{ color: "var(--blue)", marginBottom: "0.5rem" }} />
            <div style={{
              fontSize: "1.5rem",
              fontWeight: 800,
              color: "var(--blue)",
              letterSpacing: "-0.03em",
            }}>
              ${monthlySavings.toLocaleString()}
            </div>
            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600 }}>
              Monthly Savings
            </div>
          </div>

          <div style={{
            background: "var(--live-bg)",
            borderRadius: "var(--r-lg)",
            padding: "1.25rem",
            textAlign: "center",
          }}>
            <BarChart3 size={20} style={{ color: "var(--live-text)", marginBottom: "0.5rem" }} />
            <div style={{
              fontSize: "1.5rem",
              fontWeight: 800,
              color: "var(--live-text)",
              letterSpacing: "-0.03em",
            }}>
              ${annualSavings.toLocaleString()}
            </div>
            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600 }}>
              Annual Savings
            </div>
          </div>

          <div style={{
            background: "linear-gradient(135deg, #0A1F6B 0%, #2563EB 100%)",
            borderRadius: "var(--r-lg)",
            padding: "1.25rem",
            textAlign: "center",
          }}>
            <Zap size={20} style={{ color: "#fff", marginBottom: "0.5rem" }} />
            <div style={{
              fontSize: "1.5rem",
              fontWeight: 800,
              color: "#fff",
              letterSpacing: "-0.03em",
            }}>
              {roiPercentage}%
            </div>
            <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.7)", fontWeight: 600 }}>
              ROI
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FAQItem({ faq, isOpen, onToggle }: { faq: typeof faqs[0]; isOpen: boolean; onToggle: () => void }) {
  return (
    <div style={{
      borderBottom: "1px solid var(--border-subtle)",
    }}>
      <button
        onClick={onToggle}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1.25rem 0",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          gap: "1rem",
        }}
      >
        <span style={{
          fontSize: "1rem",
          fontWeight: 600,
          color: "var(--text-heading)",
        }}>
          {faq.question}
        </span>
        {isOpen ? (
          <ChevronUp size={20} style={{ color: "var(--blue)", flexShrink: 0 }} />
        ) : (
          <ChevronDown size={20} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
        )}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" as const }}
            style={{ overflow: "hidden" }}
          >
            <p style={{
              paddingBottom: "1.25rem",
              fontSize: "0.9375rem",
              color: "var(--text-body)",
              lineHeight: 1.7,
            }}>
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div style={{
      background: "#fff",
      borderRadius: "var(--r-xl)",
      padding: "2.5rem",
      boxShadow: "var(--shadow-card)",
      border: "1.5px solid var(--border-card)",
    }}>
      <h3 style={{
        fontSize: "1.5rem",
        fontWeight: 800,
        color: "var(--text-heading)",
        letterSpacing: "-0.025em",
        marginBottom: "1.5rem",
      }}>
        Frequently Asked Questions
      </h3>
      <div>
        {faqs.map((faq, i) => (
          <FAQItem
            key={i}
            faq={faq}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          />
        ))}
      </div>
    </div>
  );
}

// ─── NAVBAR ──────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav aria-label="Main navigation" style={{
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
    }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 2rem",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: "0.75rem", textDecoration: "none" }}>
          <div style={{
            width: "34px",
            height: "34px",
            borderRadius: "8px",
            background: "var(--blue)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#fff" }} />
          </div>
          <span style={{ fontSize: "1.125rem", fontWeight: 700, color: "var(--text-heading)" }}>
            Voice by Enlight Lab
          </span>
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <a href="/" style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "0.9375rem",
            fontWeight: 500,
            color: "var(--text-body)",
            padding: "0.5rem 0.875rem",
            borderRadius: "6px",
            textDecoration: "none",
            transition: "color 0.15s, background 0.15s",
          }}>
            Home
          </a>
          <span style={{
            fontSize: "0.9375rem",
            fontWeight: 600,
            color: "var(--blue)",
            padding: "0.5rem 0.875rem",
          }}>
            Pricing
          </span>
        </div>
        <a href="/#contact" style={{
          background: "var(--blue)",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          padding: "0.625rem 1.5rem",
          fontSize: "0.9375rem",
          fontWeight: 700,
          cursor: "pointer",
          textDecoration: "none",
          transition: "background 0.15s",
        }}>
          Get Started
        </a>
      </div>
    </nav>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{
      background: "var(--bg-blue-section)",
      padding: "3rem 0 1.5rem",
      marginTop: "6rem",
    }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 2rem",
      }}>
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1.5rem",
          paddingBottom: "2rem",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          marginBottom: "1.5rem",
        }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
              <div style={{
                width: "34px",
                height: "34px",
                borderRadius: "8px",
                background: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "var(--blue)" }} />
              </div>
              <span style={{ fontSize: "1.125rem", fontWeight: 700, color: "#fff" }}>
                Voice by Enlight Lab
              </span>
            </div>
            <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.7)", maxWidth: "300px" }}>
              Enterprise AI voice agents that scale operations and reduce costs.
            </p>
          </div>
          <div style={{ display: "flex", gap: "1rem" }}>
            <a href="/#contact" style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.875rem 1.75rem",
              background: "#fff",
              color: "var(--blue)",
              borderRadius: "8px",
              fontSize: "0.9375rem",
              fontWeight: 700,
              textDecoration: "none",
              transition: "background 0.15s",
            }}>
              Contact Sales <ArrowRight size={16} />
            </a>
          </div>
        </div>
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1rem",
        }}>
          <p style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.5)" }}>
            Copyright © 2026 Enlight Lab. All Rights Reserved.
          </p>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            <a href="#" style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>Privacy Policy</a>
            <a href="#" style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── PAGE ────────────────────────────────────────────────────────────
export default function PricingPage() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
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
    <div style={{ minHeight: "100vh", background: "var(--bg-page)" }}>
      <Navbar />

      {/* ── HERO ── */}
      <header style={{
        position: "relative",
        zIndex: 1,
        padding: "5rem 0 4rem",
        background: "var(--bg-page)",
        textAlign: "center",
      }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 2rem" }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" as const }}
          >
            <p style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              fontSize: "0.75rem",
              fontWeight: 700,
              color: "var(--blue)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: "1rem",
              padding: "0.375rem 1rem",
              background: "var(--blue-pale)",
              borderRadius: "var(--r-full)",
            }}>
              <Zap size={14} />
              Pricing
            </p>
            <h1 style={{
              fontSize: "clamp(2rem, 5vw, 3.25rem)",
              fontWeight: 800,
              letterSpacing: "-0.035em",
              lineHeight: 1.1,
              color: "var(--text-heading)",
              marginBottom: "1.25rem",
            }}>
              Transparent, Scalable Pricing
            </h1>
            <p style={{
              fontSize: "1.125rem",
              color: "var(--text-body)",
              maxWidth: "520px",
              margin: "0 auto",
              lineHeight: 1.7,
            }}>
              Choose the plan that fits your business. No hidden fees, no surprises.
            </p>
          </motion.div>
        </div>
      </header>

      {/* ── PRICING CARDS ── */}
      <section className="max-w-7xl mx-auto px-6" style={{ paddingBottom: "5rem" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "2rem",
          alignItems: "stretch",
        }}>
          {plans.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" as const }}
              style={{ display: "flex" }}
            >
              <PricingCard plan={plan} />
            </motion.div>
          ))}
        </div>
        <p style={{
          textAlign: "center",
          marginTop: "2rem",
          fontSize: "0.875rem",
          color: "var(--text-muted)",
        }}>
          All plans include a 14-day free trial. No credit card required.
        </p>
      </section>

      {/* ── FEATURE COMPARISON TABLE ── */}
      <section className="max-w-7xl mx-auto px-6 reveal" style={{ paddingBottom: "5rem" }}>
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <h2 style={{
            fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            color: "var(--text-heading)",
            marginBottom: "0.75rem",
          }}>
            Compare Plans
          </h2>
          <p style={{ fontSize: "1rem", color: "var(--text-muted)", maxWidth: "500px", margin: "0 auto" }}>
            See what's included in each plan to find the right fit for your needs.
          </p>
        </div>
        <FeatureComparisonTable />
      </section>

      {/* ── ROI CALCULATOR ── */}
      <section className="max-w-7xl mx-auto px-6 reveal" style={{ paddingBottom: "5rem" }}>
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <h2 style={{
            fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            color: "var(--text-heading)",
            marginBottom: "0.75rem",
          }}>
            Calculate Your ROI
          </h2>
          <p style={{ fontSize: "1rem", color: "var(--text-muted)", maxWidth: "500px", margin: "0 auto" }}>
            See how much you can save by automating your call operations with AI.
          </p>
        </div>
        <ROICalculator />
      </section>

      {/* ── ENTERPRISE CTA ── */}
      <section className="max-w-7xl mx-auto px-6 reveal" style={{ paddingBottom: "5rem" }}>
        <div style={{
          background: "linear-gradient(135deg, #0A1F6B 0%, #1A2AB8 100%)",
          borderRadius: "var(--r-xl)",
          padding: "4rem 3rem",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.04) 0%, transparent 60%), radial-gradient(circle at 80% 50%, rgba(255,255,255,0.04) 0%, transparent 60%)",
            pointerEvents: "none",
          }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <h2 style={{
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              fontWeight: 800,
              letterSpacing: "-0.035em",
              color: "#fff",
              marginBottom: "1rem",
            }}>
              Need a custom solution?
            </h2>
            <p style={{
              fontSize: "1.125rem",
              color: "rgba(255,255,255,0.82)",
              marginBottom: "2rem",
              maxWidth: "500px",
              margin: "0 auto 2rem",
            }}>
              We offer tailored pricing for enterprise deployments with dedicated support and custom SLAs.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center", marginBottom: "1.5rem" }}>
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.5rem 1rem",
                background: "rgba(255,255,255,0.1)",
                borderRadius: "var(--r-full)",
                fontSize: "0.875rem",
                color: "rgba(255,255,255,0.9)",
              }}>
                <Check size={14} style={{ color: "#86efac" }} />
                Annual discounts available
              </div>
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.5rem 1rem",
                background: "rgba(255,255,255,0.1)",
                borderRadius: "var(--r-full)",
                fontSize: "0.875rem",
                color: "rgba(255,255,255,0.9)",
              }}>
                <Check size={14} style={{ color: "#86efac" }} />
                Volume pricing
              </div>
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.5rem 1rem",
                background: "rgba(255,255,255,0.1)",
                borderRadius: "var(--r-full)",
                fontSize: "0.875rem",
                color: "rgba(255,255,255,0.9)",
              }}>
                <Check size={14} style={{ color: "#86efac" }} />
                Custom integrations
              </div>
            </div>
            <button style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.875rem 2rem",
              background: "#fff",
              color: "var(--blue)",
              border: "none",
              borderRadius: "8px",
              fontSize: "1rem",
              fontWeight: 700,
              cursor: "pointer",
              transition: "background 0.15s",
            }}>
              Contact Sales <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="max-w-3xl mx-auto px-6 reveal" style={{ paddingBottom: "5rem" }}>
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <h2 style={{
            fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            color: "var(--text-heading)",
            marginBottom: "0.75rem",
          }}>
            Common Questions
          </h2>
          <p style={{ fontSize: "1rem", color: "var(--text-muted)" }}>
            Everything you need to know about our pricing and plans.
          </p>
        </div>
        <FAQSection />
      </section>

      <Footer />
    </div>
  );
}