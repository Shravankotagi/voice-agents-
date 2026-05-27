'use client';

import { useState, useEffect, useRef, useCallback, useMemo, memo } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// ENLIGHTS AI  ·  Enterprise Voice Agent Platform
// Single-file · Clean architecture · Production-grade
// ─────────────────────────────────────────────────────────────────────────────

// ── Utilities ─────────────────────────────────────────────────────────────────
const lerp = (a, b, t) => a + (b - a) * t;
const clamp = (v, lo, hi) => Math.min(Math.max(v, lo), hi);

// ── Industry data model ───────────────────────────────────────────────────────
const INDUSTRIES = [
  {
    id: 'banking',
    label: 'Banking',
    accent: '#3B82F6',
    accentSoft: 'rgba(59,130,246,0.08)',
    accentGlow: 'rgba(59,130,246,0.15)',
    headline: 'AI agents that handle every customer touchpoint — from fraud alerts to loan processing.',
    agents: [
      {
        id: 'aria',
        name: 'ARIA',
        role: 'Senior Banking Voice Agent',
        badge: 'Fraud & Disputes',
        description: 'Handles inbound fraud disputes, card blocking, transaction queries, and real-time account verification. Integrates with core banking APIs and escalates with full context.',
        channels: ['Inbound Voice', 'IVR', 'WhatsApp'],
        capabilities: ['Fraud detection alerts', 'Transaction disputes', 'Card management', 'Balance & statement queries', 'KYC verification'],
        color: '#3B82F6',
        stats: { calls: '14,820', resolution: '94%', latency: '1.4ms' },
        conversation: [
          { from: 'customer', text: 'Hi, I see a transaction of ₹45,000 to an unknown merchant. I did not make this.' },
          { from: 'agent',   text: 'I can see that transaction right now — it was flagged at 11:42 PM from an unrecognized device. I\'ve temporarily blocked your card to prevent further charges. Should I initiate a chargeback immediately?' },
          { from: 'customer', text: 'Yes please. Will I get my money back?' },
          { from: 'agent',   text: 'Yes. Provisional credit of ₹45,000 will reflect within 2 business days while we complete the dispute — case number CB-2024-77341. I\'ve also enabled transaction alerts on your account. Anything else I can help with?' },
        ],
      },
      {
        id: 'rex',
        name: 'REX',
        role: 'Loan Processing Agent',
        badge: 'Lending',
        description: 'Pre-qualifies applicants, collects documentation, answers EMI queries, and updates loan status. Reduces manual effort by 70% across the lending pipeline.',
        channels: ['Outbound Voice', 'WhatsApp', 'REST API'],
        capabilities: ['Loan pre-qualification', 'EMI calculation', 'Document collection', 'Application status', 'Credit score guidance'],
        color: '#3B82F6',
        stats: { calls: '6,340', resolution: '91%', latency: '1.6ms' },
        conversation: [
          { from: 'customer', text: 'I applied for a home loan last week. What\'s the status?' },
          { from: 'agent',   text: 'Your application HL-2024-00382 is at the technical verification stage. The property valuation report was received today. Expected sanction within 3 working days.' },
          { from: 'customer', text: 'What documents are still pending?' },
          { from: 'agent',   text: 'Just the last 6 months\' bank statements — you can upload them directly in the portal link I\'m sending to your registered number right now.' },
        ],
      },
    ],
  },
  {
    id: 'insurance',
    label: 'Insurance',
    accent: '#10B981',
    accentSoft: 'rgba(16,185,129,0.08)',
    accentGlow: 'rgba(16,185,129,0.15)',
    headline: 'From first notice of loss to claim settlement — fully automated voice workflows.',
    agents: [
      {
        id: 'nexus',
        name: 'NEXUS',
        role: 'Claims Processing Agent',
        badge: 'FNOL & Claims',
        description: 'Automates First Notice of Loss, collects incident details, assigns surveyors, and provides real-time status updates. Integrates with Guidewire and Duck Creek.',
        channels: ['Inbound Voice', 'Outbound', 'WhatsApp'],
        capabilities: ['FNOL intake', 'Surveyor assignment', 'Claim status updates', 'Policy verification', 'Document collection'],
        color: '#10B981',
        stats: { calls: '8,340', resolution: '96%', latency: '1.7ms' },
        conversation: [
          { from: 'customer', text: 'I had a car accident this morning. I need to file a claim.' },
          { from: 'agent',   text: 'I\'m sorry to hear that. I\'m opening claim CL-2024-88741 right now. Are you and the other party safe? I\'ll need your vehicle registration and a brief description of the damage.' },
          { from: 'customer', text: 'Yes we\'re fine. Registration MH12AB3456, front bumper and bonnet damage.' },
          { from: 'agent',   text: 'Got it. I\'ve assigned a surveyor for tomorrow at 10 AM near your Pune location. You\'ll receive a WhatsApp link to upload photos. Estimated processing: 48 hours. Your claim number is CL-2024-88741.' },
        ],
      },
      {
        id: 'vera',
        name: 'VERA',
        role: 'Policy Renewal Agent',
        badge: 'Renewals',
        description: 'Proactively reaches out before policy expiry, explains coverage options, processes payments, and handles endorsements — all without human intervention.',
        channels: ['Outbound Voice', 'SMS', 'WhatsApp'],
        capabilities: ['Renewal reminders', 'Coverage comparison', 'Premium payment', 'Endorsement processing', 'Lapse prevention'],
        color: '#10B981',
        stats: { calls: '11,200', resolution: '89%', latency: '1.5ms' },
        conversation: [
          { from: 'agent',   text: 'Hello Priya, this is VERA from Enlights Insurance. Your motor policy MH-2024-44231 expires in 7 days. I can renew it in under 2 minutes — shall I walk you through the options?' },
          { from: 'customer', text: 'Yes, but I want to add zero depreciation this time.' },
          { from: 'agent',   text: 'Great choice. With zero depreciation, your revised premium is ₹18,420 — an increase of ₹2,100. I can process payment right now via UPI. Shall I send the link?' },
        ],
      },
    ],
  },
  {
    id: 'healthcare',
    label: 'Healthcare',
    accent: '#8B5CF6',
    accentSoft: 'rgba(139,92,246,0.08)',
    accentGlow: 'rgba(139,92,246,0.15)',
    headline: 'HIPAA-compliant voice agents that triage patients and manage clinical workflows.',
    agents: [
      {
        id: 'pulse',
        name: 'PULSE',
        role: 'Clinical Triage Agent',
        badge: 'Triage & Intake',
        description: 'Pre-visit symptom collection, appointment scheduling, and post-visit follow-up. Fully HIPAA-compliant with zero PHI logging and end-to-end encryption.',
        channels: ['Inbound Voice', 'WhatsApp', 'Web Widget'],
        capabilities: ['Symptom triage', 'Appointment booking', 'Pre-visit intake', 'Prescription refills', 'Post-visit follow-up'],
        color: '#8B5CF6',
        stats: { calls: '6,210', resolution: '93%', latency: '1.9ms' },
        conversation: [
          { from: 'customer', text: 'I\'ve had a fever of 102°F for two days and a very sore throat.' },
          { from: 'agent',   text: 'I\'m noting that — fever at 102°F for 48 hours, sore throat. Any difficulty swallowing or white patches visible?' },
          { from: 'customer', text: 'Yes, some difficulty swallowing.' },
          { from: 'agent',   text: 'Based on your symptoms, I\'m booking you for a same-day appointment at 3:30 PM with Dr. Mehra. This may require a strep test — please avoid solid food for 2 hours prior. Confirmation sent to your registered number.' },
        ],
      },
      {
        id: 'care',
        name: 'CARE',
        role: 'Patient Follow-up Agent',
        badge: 'Post-Discharge',
        description: 'Automated post-discharge follow-ups, medication reminders, and readmission risk assessment. Reduces 30-day readmission rates by up to 22%.',
        channels: ['Outbound Voice', 'SMS', 'WhatsApp'],
        capabilities: ['Discharge follow-up', 'Medication adherence', 'Readmission risk scoring', 'Vitals collection', 'Escalation routing'],
        color: '#8B5CF6',
        stats: { calls: '3,900', resolution: '88%', latency: '2.0ms' },
        conversation: [
          { from: 'agent',   text: 'Hello Mr. Sharma, this is CARE calling from City Hospital. You were discharged 48 hours ago. How are you feeling today?' },
          { from: 'customer', text: 'I\'m okay, a little short of breath still.' },
          { from: 'agent',   text: 'I\'m flagging that for your care team — shortness of breath at 48 hours post-discharge warrants a check. I\'m scheduling a teleconsult with Dr. Patel for 5 PM today. Should I also remind you about your evening medications?' },
        ],
      },
    ],
  },
  {
    id: 'ecommerce',
    label: 'E-Commerce',
    accent: '#F59E0B',
    accentSoft: 'rgba(245,158,11,0.08)',
    accentGlow: 'rgba(245,158,11,0.15)',
    headline: 'Reduce support costs by 65% while resolving orders, returns, and queries instantly.',
    agents: [
      {
        id: 't3',
        name: 't3',
        role: 'Multilingual Support Agent',
        badge: 'Order & Returns',
        description: 'Handles order status, returns, refunds, and escalations across 62 languages. Understands code-switching (Hinglish, Spanglish) with real-time dialect adaptation.',
        channels: ['Inbound Voice', 'Live Chat', 'WhatsApp'],
        capabilities: ['Order tracking', 'Return initiation', 'Refund processing', 'Complaint handling', '62 languages'],
        color: '#F59E0B',
        stats: { calls: '22,150', resolution: '91%', latency: '2.1ms' },
        conversation: [
          { from: 'customer', text: 'Mera order abhi tak nahi aaya — it\'s been 5 days bhai.' },
          { from: 'agent',   text: 'Main dekh raha hoon — your order #ORD-994821 is currently at the Bhiwandi warehouse and will be delivered tomorrow before 6 PM. Shall I send you the live tracking link on WhatsApp?' },
          { from: 'customer', text: 'Haan please. And can you add a delivery instruction?' },
          { from: 'agent',   text: 'Done — I\'ve added "Ring doorbell twice" to your delivery note. Also applied a ₹150 voucher to your account for the delay. You\'ll receive the tracking link in 2 minutes.' },
        ],
      },
      {
        id: 'nova',
        name: 'NOVA',
        role: 'Sales & Recommendation Agent',
        badge: 'Conversational Sales',
        description: 'Proactive outbound agent that engages warm leads, recommends products based on purchase history, and converts browsing sessions into completed orders.',
        channels: ['Outbound Voice', 'WhatsApp', 'Web Widget'],
        capabilities: ['Product recommendations', 'Cart recovery', 'Upselling', 'Loyalty program', 'Wishlist reminders'],
        color: '#F59E0B',
        stats: { calls: '9,800', resolution: '78%', latency: '1.8ms' },
        conversation: [
          { from: 'agent',   text: 'Hi Sneha, you left 3 items in your cart 2 hours ago — including the running shoes you\'ve been browsing for a week. They\'re down to 4 pairs in your size.' },
          { from: 'customer', text: 'Oh! Yes I was going to buy those. Is there a discount?' },
          { from: 'agent',   text: 'I can apply your loyalty points for an extra 8% off — bringing it to ₹3,199. I can also add free express delivery. Want me to complete the order right now?' },
        ],
      },
    ],
  },
  {
    id: 'realestate',
    label: 'Real Estate',
    accent: '#EC4899',
    accentSoft: 'rgba(236,72,153,0.08)',
    accentGlow: 'rgba(236,72,153,0.15)',
    headline: 'AI agents that qualify leads, book site visits, and follow up — around the clock.',
    agents: [
      {
        id: 'sage',
        name: 'SAGE',
        role: 'Lead Qualification Agent',
        badge: 'Leads & Visits',
        description: 'Instantly qualifies inbound property inquiries, understands buyer intent, captures budget and timeline, and schedules site visits — without a single human touchpoint.',
        channels: ['Inbound Voice', 'WhatsApp', 'Web Widget'],
        capabilities: ['Lead qualification', 'Site visit booking', 'Budget assessment', 'Property matching', 'CRM sync'],
        color: '#EC4899',
        stats: { calls: '7,100', resolution: '87%', latency: '1.6ms' },
        conversation: [
          { from: 'customer', text: 'Hi, I saw your ad for 2BHK apartments in Baner. I\'m interested.' },
          { from: 'agent',   text: 'Great choice — Baner is seeing strong appreciation right now. Could I ask your approximate budget range and whether this would be for self-occupation or investment?' },
          { from: 'customer', text: 'Self-occupation, budget around ₹75 lakhs.' },
          { from: 'agent',   text: 'Perfect. We have 3 ready-possession units in your range at Skyline Residences, Baner — 2BHK, 850–940 sq ft, with RERA approval. I\'m booking a site visit for this Saturday at 11 AM. Shall I confirm that for you?' },
        ],
      },
      {
        id: 'atlas',
        name: 'ATLAS',
        role: 'Tenant Support Agent',
        badge: 'Property Management',
        description: 'Handles tenant maintenance requests, rent reminders, lease renewal negotiations, and move-out coordination — keeping occupancy rates high and tenants satisfied.',
        channels: ['Inbound Voice', 'WhatsApp', 'SMS'],
        capabilities: ['Maintenance requests', 'Rent reminders', 'Lease renewals', 'Move-in/out coordination', 'Complaint handling'],
        color: '#EC4899',
        stats: { calls: '4,200', resolution: '90%', latency: '1.7ms' },
        conversation: [
          { from: 'customer', text: 'The AC in my flat has stopped working. It\'s been 2 days.' },
          { from: 'agent',   text: 'I apologize for the inconvenience. I\'ve logged maintenance ticket MT-4481 and assigned it to our technician Ramesh, who will visit tomorrow between 10 AM–12 PM. Will that work?' },
          { from: 'customer', text: 'Yes that works. Will I get a confirmation?' },
          { from: 'agent',   text: 'Absolutely — you\'ll receive an SMS with Ramesh\'s contact number and a 30-minute arrival window tomorrow morning. The repair will be at no charge as it\'s within your lease terms.' },
        ],
      },
    ],
  },
  {
    id: 'support',
    label: 'Customer Support',
    accent: '#06B6D4',
    accentSoft: 'rgba(6,182,212,0.08)',
    accentGlow: 'rgba(6,182,212,0.15)',
    headline: 'Intelligent Tier-1 and Tier-2 support agents with seamless human escalation.',
    agents: [
      {
        id: 'max',
        name: 'MAX',
        role: 'Tier-1 Support Agent',
        badge: 'General Support',
        description: 'Handles high-volume Tier-1 queries across any product category — password resets, account issues, billing disputes, and onboarding. Average handle time: 2.1 minutes.',
        channels: ['Inbound Voice', 'Live Chat', 'Email', 'WhatsApp'],
        capabilities: ['Account management', 'Billing support', 'Technical troubleshooting', 'Password resets', 'Onboarding'],
        color: '#06B6D4',
        stats: { calls: '31,000', resolution: '88%', latency: '1.5ms' },
        conversation: [
          { from: 'customer', text: 'I can\'t log into my account. I tried resetting my password but no email came.' },
          { from: 'agent',   text: 'Let me check that for you. I can see the reset email was sent to r***a@gmail.com — it may be in spam, or the email on file may differ from what you\'re checking. Can you confirm your registered email?' },
          { from: 'customer', text: 'Oh, I think I used my work email. It\'s r.sharma@company.com.' },
          { from: 'agent',   text: 'That\'s the one on file. I\'ve just resent the reset link — it\'ll expire in 15 minutes. I\'m also adding your Gmail as a secondary email so this doesn\'t happen again. You should receive it in under a minute.' },
        ],
      },
      {
        id: 'iris',
        name: 'IRIS',
        role: 'Enterprise Escalation Agent',
        badge: 'Complex Cases',
        description: 'Handles complex, sensitive cases requiring empathy, policy knowledge, and negotiation. Routes to humans with full context when required — reducing repeat contacts by 40%.',
        channels: ['Inbound Voice', 'Outbound', 'Live Chat'],
        capabilities: ['SLA management', 'Executive escalation', 'Compensation negotiation', 'Policy exceptions', 'Sentiment detection'],
        color: '#06B6D4',
        stats: { calls: '4,600', resolution: '82%', latency: '1.8ms' },
        conversation: [
          { from: 'customer', text: 'This is the fourth time I\'m calling about the same issue. I\'m extremely frustrated.' },
          { from: 'agent',   text: 'I completely understand your frustration, and I\'m sorry you\'ve had to call four times. That should never happen. I\'m pulling up your full case history right now so I can resolve this properly — without you repeating yourself.' },
          { from: 'customer', text: 'Thank you. I just want this sorted once and for all.' },
          { from: 'agent',   text: 'I see the issue clearly now — there was a processing error on our end on 14th March that wasn\'t flagged. I\'m issuing a full refund of ₹3,200 right now and adding a goodwill credit of ₹500. You\'ll see both within 24 hours.' },
        ],
      },
    ],
  },
];

// ── CSS ───────────────────────────────────────────────────────────────────────
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600&family=Geist+Mono:wght@300;400;500&display=swap');

:root {
  --bg: #0A0A0B;
  --surface: #111114;
  --surface2: #18181C;
  --border: rgba(255,255,255,0.07);
  --border-hover: rgba(255,255,255,0.13);
  --text: #F4F4F5;
  --text-2: #A1A1AA;
  --text-3: #71717A;
  --accent: #3B82F6;
  --accent-soft: rgba(59,130,246,0.08);
  --accent-glow: rgba(59,130,246,0.15);
  --ease: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-out: cubic-bezier(0.0, 0, 0.2, 1);
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { color-scheme: dark; scroll-behavior: smooth; }

body {
  background: var(--bg);
  color: var(--text);
  font-family: 'Geist', system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
  cursor: none;
}

::selection { background: rgba(59,130,246,0.25); }

/* ─── Cursor ─── */
.cursor {
  position: fixed;
  pointer-events: none;
  z-index: 9999;
  top: 0; left: 0;
  width: 8px; height: 8px;
  border-radius: 50%;
  background: var(--accent);
  transform: translate(-50%, -50%);
  transition: width 0.2s var(--ease), height 0.2s var(--ease), opacity 0.2s;
  mix-blend-mode: difference;
}
.cursor-ring {
  position: fixed;
  pointer-events: none;
  z-index: 9998;
  top: 0; left: 0;
  width: 36px; height: 36px;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.2);
  transform: translate(-50%, -50%);
}

/* ─── Keyframes ─── */
@keyframes fade-up {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes fade-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}
@keyframes scale-in {
  from { opacity: 0; transform: scale(0.96); }
  to   { opacity: 1; transform: scale(1); }
}
@keyframes pulse-ring {
  0%   { transform: scale(1); opacity: 0.6; }
  100% { transform: scale(2.4); opacity: 0; }
}
@keyframes breathe {
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50%       { opacity: 1; transform: scale(1.04); }
}
@keyframes slide-in-msg {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes typing-bounce {
  0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
  40%            { transform: translateY(-4px); opacity: 1; }
}
@keyframes sweep {
  0%   { background-position: 200% center; }
  100% { background-position: -200% center; }
}
@keyframes glow-shift {
  0%, 100% { opacity: 0.4; }
  50%       { opacity: 0.7; }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0ms !important; transition-duration: 0ms !important; }
}

/* ─── Layout ─── */
.page { position: relative; min-height: 100vh; }

.container {
  width: 100%;
  max-width: 1160px;
  margin: 0 auto;
  padding: 0 40px;
}

/* ─── Nav ─── */
.nav {
  position: fixed; top: 0; left: 0; right: 0;
  z-index: 100;
  padding: 0 40px;
  height: 64px;
  display: flex; align-items: center; justify-content: space-between;
  background: rgba(10,10,11,0.8);
  backdrop-filter: blur(20px) saturate(1.2);
  border-bottom: 1px solid var(--border);
}
.nav-brand {
  display: flex; align-items: center; gap: 10px;
  font-size: 15px; font-weight: 600; letter-spacing: -0.01em; color: var(--text);
  text-decoration: none;
}
.nav-logo {
  width: 28px; height: 28px; border-radius: 7px;
  background: var(--accent);
  display: flex; align-items: center; justify-content: center;
  font-size: 12px; font-weight: 700; color: white;
  position: relative; overflow: hidden;
}
.nav-logo::after {
  content: '';
  position: absolute; inset: 0;
  background: linear-gradient(135deg, rgba(255,255,255,0.2), transparent);
}
.nav-links {
  display: flex; align-items: center; gap: 2px;
}
.nav-link {
  padding: 6px 14px;
  font-size: 13px; font-weight: 400;
  color: var(--text-2);
  background: transparent; border: none; cursor: none;
  border-radius: 6px;
  transition: color 0.15s, background 0.15s;
  letter-spacing: -0.01em;
}
.nav-link:hover { color: var(--text); background: rgba(255,255,255,0.04); }
.nav-actions { display: flex; align-items: center; gap: 10px; }
.nav-btn-ghost {
  padding: 7px 16px;
  font-size: 13px; font-weight: 500; letter-spacing: -0.01em;
  color: var(--text-2); background: transparent;
  border: 1px solid var(--border); border-radius: 8px; cursor: none;
  transition: all 0.15s;
}
.nav-btn-ghost:hover { color: var(--text); border-color: var(--border-hover); }
.nav-btn-primary {
  padding: 7px 16px;
  font-size: 13px; font-weight: 500; letter-spacing: -0.01em;
  color: #fff; background: var(--accent);
  border: none; border-radius: 8px; cursor: none;
  transition: all 0.15s;
}
.nav-btn-primary:hover { filter: brightness(1.1); }

/* ─── Hero ─── */
.hero {
  position: relative;
  min-height: 100vh;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  padding: 120px 40px 80px;
  text-align: center;
  overflow: hidden;
}
.hero-glow {
  position: absolute;
  top: 0; left: 50%; transform: translateX(-50%);
  width: 800px; height: 500px;
  background: radial-gradient(ellipse at center top, var(--accent-glow), transparent 65%);
  pointer-events: none; z-index: 0;
  transition: background 0.8s var(--ease);
}
.hero-noise {
  position: absolute; inset: 0; z-index: 0; pointer-events: none; opacity: 0.03;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 256px;
}
.hero-content {
  position: relative; z-index: 1;
  max-width: 800px;
  display: flex; flex-direction: column; align-items: center; gap: 24px;
}
.hero-badge {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 6px 14px; border-radius: 100px;
  background: var(--surface); border: 1px solid var(--border);
  font-size: 12px; font-weight: 500; color: var(--text-2);
  letter-spacing: -0.01em;
  animation: fade-in 0.8s var(--ease) both;
}
.hero-badge-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 8px var(--accent);
  animation: breathe 2s ease-in-out infinite;
}
.hero-h1 {
  font-size: clamp(40px, 6vw, 72px);
  font-weight: 600;
  line-height: 1.05;
  letter-spacing: -0.04em;
  color: var(--text);
  animation: fade-up 0.9s var(--ease) 0.1s both;
}
.hero-h1 span {
  background: linear-gradient(135deg, var(--accent), #818CF8);
  background-size: 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: sweep 4s linear infinite;
}
.hero-sub {
  max-width: 520px;
  font-size: 17px; font-weight: 300; line-height: 1.7;
  color: var(--text-2); letter-spacing: -0.01em;
  animation: fade-up 0.9s var(--ease) 0.2s both;
  transition: color 0.5s;
}
.hero-actions {
  display: flex; align-items: center; gap: 12px;
  animation: fade-up 0.9s var(--ease) 0.3s both;
}
.btn-primary {
  position: relative; overflow: hidden;
  padding: 12px 28px; border-radius: 10px;
  font-size: 14px; font-weight: 500; letter-spacing: -0.01em;
  color: #fff; background: var(--accent);
  border: none; cursor: none;
  transition: transform 0.2s var(--ease), box-shadow 0.2s;
}
.btn-primary::before {
  content: '';
  position: absolute; inset: 0;
  background: linear-gradient(135deg, rgba(255,255,255,0.15), transparent 60%);
  pointer-events: none;
}
.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 24px var(--accent-glow);
}
.btn-secondary {
  padding: 11px 24px; border-radius: 10px;
  font-size: 14px; font-weight: 500; letter-spacing: -0.01em;
  color: var(--text-2); background: var(--surface);
  border: 1px solid var(--border); cursor: none;
  transition: all 0.2s;
}
.btn-secondary:hover { color: var(--text); border-color: var(--border-hover); }
.hero-social-proof {
  display: flex; align-items: center; gap: 16px;
  font-size: 12px; color: var(--text-3); letter-spacing: -0.01em;
  animation: fade-up 0.9s var(--ease) 0.4s both;
}
.hero-proof-item { display: flex; align-items: center; gap: 6px; }
.hero-proof-item strong { color: var(--text-2); font-weight: 500; }
.hero-proof-sep { width: 1px; height: 14px; background: var(--border); }

/* ─── Industry Switcher ─── */
.industry-section { padding: 0 0 80px; }
.industry-label {
  text-align: center;
  font-size: 12px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase;
  color: var(--text-3); margin-bottom: 20px;
  font-family: 'Geist Mono', monospace;
}
.industry-tabs {
  display: flex; align-items: center; justify-content: center;
  gap: 6px; flex-wrap: wrap; padding: 0 40px;
}
.industry-tab {
  position: relative;
  padding: 9px 20px; border-radius: 100px;
  font-size: 13px; font-weight: 500; letter-spacing: -0.01em;
  background: var(--surface); border: 1px solid var(--border);
  cursor: none; transition: all 0.25s var(--ease);
  color: var(--text-2);
}
.industry-tab:hover { border-color: var(--border-hover); color: var(--text); }
.industry-tab.active {
  color: #fff;
  border-color: transparent;
}
.industry-tab.active::before {
  content: '';
  position: absolute; inset: 0; border-radius: 100px;
  background: var(--accent);
  z-index: -1;
}

/* ─── Section Headers ─── */
.section-eyebrow {
  font-family: 'Geist Mono', monospace;
  font-size: 11px; font-weight: 500; letter-spacing: 0.1em;
  text-transform: uppercase; color: var(--text-3);
  margin-bottom: 12px;
}
.section-headline {
  font-size: clamp(28px, 4vw, 40px);
  font-weight: 600; letter-spacing: -0.04em;
  line-height: 1.1; color: var(--text); margin-bottom: 14px;
}
.section-sub {
  font-size: 16px; font-weight: 300;
  color: var(--text-2); line-height: 1.7;
  letter-spacing: -0.01em; max-width: 480px;
}

/* ─── Agent Showcase ─── */
.agents-section { padding: 80px 0; }
.agents-header { margin-bottom: 48px; }
.agents-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}
.agent-card {
  position: relative;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  overflow: hidden;
  cursor: none;
  transition: border-color 0.3s, transform 0.4s var(--ease), box-shadow 0.4s;
  transform-style: preserve-3d;
  will-change: transform;
}
.agent-card:hover {
  border-color: var(--border-hover);
  box-shadow: 0 20px 60px rgba(0,0,0,0.4);
}
.agent-card-top-line {
  position: absolute; top: 0; left: 0; right: 0; height: 1px;
  opacity: 0.6; transition: opacity 0.3s;
}
.agent-card:hover .agent-card-top-line { opacity: 1; }
.agent-card-glow {
  position: absolute; inset: 0; border-radius: 16px;
  pointer-events: none; opacity: 0;
  transition: opacity 0.4s;
}
.agent-card:hover .agent-card-glow { opacity: 1; }
.agent-card-inner { padding: 24px; position: relative; z-index: 1; }
.agent-card-header {
  display: flex; align-items: flex-start;
  justify-content: space-between; margin-bottom: 16px;
}
.agent-card-identity { display: flex; flex-direction: column; gap: 4px; }
.agent-card-name {
  font-size: 22px; font-weight: 600; letter-spacing: -0.03em;
}
.agent-card-role {
  font-size: 13px; font-weight: 400; color: var(--text-2); letter-spacing: -0.01em;
}
.agent-badge {
  padding: 4px 10px; border-radius: 100px;
  font-family: 'Geist Mono', monospace;
  font-size: 10px; font-weight: 500; letter-spacing: 0.05em;
  white-space: nowrap;
}
.agent-desc {
  font-size: 13px; font-weight: 300; line-height: 1.7;
  color: var(--text-2); letter-spacing: -0.01em;
  margin-bottom: 16px;
}
.agent-caps {
  display: flex; flex-direction: column; gap: 6px;
  margin-bottom: 20px;
}
.agent-cap-item {
  display: flex; align-items: center; gap: 8px;
  font-size: 12px; font-weight: 400; color: var(--text-2);
  letter-spacing: -0.01em;
}
.agent-cap-check {
  width: 14px; height: 14px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 8px; color: #fff; flex-shrink: 0;
}
.agent-channels {
  display: flex; gap: 6px; flex-wrap: wrap;
  margin-bottom: 20px;
}
.agent-channel {
  padding: 3px 10px; border-radius: 6px;
  font-size: 11px; font-weight: 400; letter-spacing: -0.01em;
  background: var(--surface2); border: 1px solid var(--border);
  color: var(--text-3);
  font-family: 'Geist Mono', monospace;
}
.agent-stats {
  display: flex; gap: 0;
  border: 1px solid var(--border); border-radius: 10px;
  overflow: hidden; margin-bottom: 20px;
}
.agent-stat {
  flex: 1; padding: 10px 14px; text-align: center;
  border-right: 1px solid var(--border);
}
.agent-stat:last-child { border-right: none; }
.agent-stat-val {
  font-size: 16px; font-weight: 600;
  letter-spacing: -0.03em; font-variant-numeric: tabular-nums;
  margin-bottom: 2px;
}
.agent-stat-label {
  font-family: 'Geist Mono', monospace;
  font-size: 9px; letter-spacing: 0.06em; text-transform: uppercase;
  color: var(--text-3);
}
.agent-card-actions { display: flex; gap: 8px; }
.agent-btn-demo {
  flex: 1; padding: 10px; border-radius: 8px;
  font-size: 13px; font-weight: 500; letter-spacing: -0.01em;
  cursor: none; transition: all 0.2s; border: none;
}
.agent-btn-deploy {
  padding: 10px 18px; border-radius: 8px;
  font-size: 13px; font-weight: 500; letter-spacing: -0.01em;
  background: var(--surface2); border: 1px solid var(--border);
  color: var(--text-2); cursor: none; transition: all 0.2s;
}
.agent-btn-deploy:hover { color: var(--text); border-color: var(--border-hover); }

/* ─── Conversation Panel ─── */
.conv-section { padding: 80px 0; }
.conv-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px; align-items: start;
}
.conv-left { position: sticky; top: 100px; }
.conv-panel {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  overflow: hidden;
}
.conv-panel-header {
  padding: 16px 20px;
  border-bottom: 1px solid var(--border);
  display: flex; align-items: center; justify-content: space-between;
}
.conv-panel-agent {
  display: flex; align-items: center; gap: 10px;
}
.conv-agent-avatar {
  width: 32px; height: 32px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 11px; font-weight: 600; color: #fff;
  flex-shrink: 0;
}
.conv-agent-name {
  font-size: 13px; font-weight: 500; letter-spacing: -0.01em;
}
.conv-agent-role {
  font-size: 11px; color: var(--text-3); letter-spacing: -0.01em;
}
.conv-status {
  display: flex; align-items: center; gap: 6px;
  font-family: 'Geist Mono', monospace;
  font-size: 10px; letter-spacing: 0.06em; text-transform: uppercase;
  color: var(--text-3);
}
.conv-status-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: #10B981;
  box-shadow: 0 0 8px rgba(16,185,129,0.6);
  animation: breathe 2s ease-in-out infinite;
}
.conv-messages {
  padding: 20px;
  min-height: 320px; max-height: 380px;
  overflow-y: auto;
  display: flex; flex-direction: column; gap: 12px;
  scroll-behavior: smooth;
}
.conv-messages::-webkit-scrollbar { width: 4px; }
.conv-messages::-webkit-scrollbar-track { background: transparent; }
.conv-messages::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }
.conv-msg { display: flex; gap: 10px; animation: slide-in-msg 0.3s var(--ease) both; }
.conv-msg.customer { flex-direction: row-reverse; }
.conv-msg-avatar {
  width: 26px; height: 26px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 9px; font-weight: 600; flex-shrink: 0;
  background: var(--surface2); color: var(--text-2);
  border: 1px solid var(--border);
}
.conv-bubble {
  max-width: 75%;
  padding: 10px 14px; border-radius: 12px;
  font-size: 13px; font-weight: 300; line-height: 1.6;
  letter-spacing: -0.01em;
}
.conv-msg.agent .conv-bubble {
  background: var(--surface2);
  border: 1px solid var(--border);
  color: var(--text);
  border-radius: 4px 12px 12px 12px;
}
.conv-msg.customer .conv-bubble {
  color: #fff;
  border-radius: 12px 4px 12px 12px;
}
.conv-typing {
  display: flex; align-items: center; gap: 4px;
  padding: 12px 16px; border-radius: 12px;
  background: var(--surface2); border: 1px solid var(--border);
  width: fit-content; margin-left: 36px;
  animation: slide-in-msg 0.3s var(--ease) both;
}
.conv-typing-dot {
  width: 5px; height: 5px; border-radius: 50%;
  background: var(--text-3);
}
.conv-typing-dot:nth-child(1) { animation: typing-bounce 1.2s 0.0s ease-in-out infinite; }
.conv-typing-dot:nth-child(2) { animation: typing-bounce 1.2s 0.15s ease-in-out infinite; }
.conv-typing-dot:nth-child(3) { animation: typing-bounce 1.2s 0.3s ease-in-out infinite; }
.conv-panel-footer {
  padding: 12px 20px;
  border-top: 1px solid var(--border);
  display: flex; align-items: center; justify-content: space-between;
}
.conv-footer-meta {
  font-family: 'Geist Mono', monospace;
  font-size: 10px; letter-spacing: 0.04em; color: var(--text-3);
}
.conv-replay-btn {
  padding: 6px 14px; border-radius: 6px;
  font-size: 11px; font-weight: 500; letter-spacing: -0.01em;
  background: var(--surface2); border: 1px solid var(--border);
  color: var(--text-2); cursor: none; transition: all 0.15s;
}
.conv-replay-btn:hover { color: var(--text); border-color: var(--border-hover); }

.conv-right { display: flex; flex-direction: column; gap: 12px; }
.conv-agent-selector {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  overflow: hidden;
}
.conv-selector-header {
  padding: 14px 18px;
  border-bottom: 1px solid var(--border);
  font-size: 11px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase;
  color: var(--text-3); font-family: 'Geist Mono', monospace;
}
.conv-selector-list { padding: 8px; display: flex; flex-direction: column; gap: 4px; }
.conv-selector-item {
  display: flex; align-items: center; gap: 12px;
  padding: 10px 12px; border-radius: 8px;
  cursor: none; transition: background 0.15s;
  border: 1px solid transparent;
}
.conv-selector-item:hover { background: var(--surface2); }
.conv-selector-item.active {
  background: var(--surface2);
  border-color: var(--border);
}
.conv-sel-avatar {
  width: 30px; height: 30px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 11px; font-weight: 600; color: #fff; flex-shrink: 0;
}
.conv-sel-info { flex: 1; }
.conv-sel-name { font-size: 13px; font-weight: 500; letter-spacing: -0.01em; }
.conv-sel-role { font-size: 11px; color: var(--text-3); letter-spacing: -0.01em; }
.conv-sel-industry {
  font-family: 'Geist Mono', monospace;
  font-size: 9px; letter-spacing: 0.06em; text-transform: uppercase;
  padding: 2px 7px; border-radius: 4px; white-space: nowrap;
}

/* ─── CTA ─── */
.cta-section { padding: 80px 0 120px; }
.cta-box {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 64px;
  text-align: center;
  position: relative; overflow: hidden;
}
.cta-box-glow {
  position: absolute; top: -1px; left: 50%; transform: translateX(-50%);
  width: 400px; height: 2px;
  transition: background 0.6s var(--ease);
}
.cta-box-glow::after {
  content: '';
  position: absolute; inset: 0;
  filter: blur(12px);
  background: inherit;
}
.cta-h2 {
  font-size: clamp(28px, 4vw, 42px);
  font-weight: 600; letter-spacing: -0.04em;
  line-height: 1.1; color: var(--text); margin-bottom: 16px;
}
.cta-sub {
  font-size: 16px; font-weight: 300;
  color: var(--text-2); line-height: 1.7; letter-spacing: -0.01em;
  max-width: 460px; margin: 0 auto 36px;
}
.cta-actions { display: flex; align-items: center; justify-content: center; gap: 12px; }
.cta-trust {
  display: flex; align-items: center; justify-content: center; gap: 24px;
  margin-top: 28px; font-size: 12px; color: var(--text-3); letter-spacing: -0.01em;
}
.cta-trust-item { display: flex; align-items: center; gap: 6px; }

/* ─── Footer ─── */
.footer {
  border-top: 1px solid var(--border);
  padding: 28px 40px;
  display: flex; align-items: center; justify-content: space-between;
}
.footer-brand {
  font-size: 14px; font-weight: 600; letter-spacing: -0.01em; color: var(--text-2);
}
.footer-brand span { color: var(--accent); }
.footer-links { display: flex; gap: 24px; }
.footer-link {
  font-size: 12px; color: var(--text-3); letter-spacing: -0.01em;
  text-decoration: none; transition: color 0.15s;
}
.footer-link:hover { color: var(--text-2); }
.footer-copy { font-size: 12px; color: var(--text-3); letter-spacing: -0.01em; }

/* ─── Divider ─── */
.section-divider {
  height: 1px; background: var(--border);
  max-width: 1160px; margin: 0 auto; padding: 0 40px;
}
.section-divider-line { height: 1px; background: var(--border); }
`;

// ── Hooks ─────────────────────────────────────────────────────────────────────

function useCursor() {
  const cursorRef = useRef(null);
  const ringRef   = useRef(null);

  useEffect(() => {
    let raf = 0;
    let cx = 0, cy = 0, rx = 0, ry = 0;

    const onMove = (e) => { cx = e.clientX; cy = e.clientY; };
    window.addEventListener('mousemove', onMove, { passive: true });

    const tick = () => {
      rx = lerp(rx, cx, 0.14);
      ry = lerp(ry, cy, 0.14);
      if (cursorRef.current) {
        cursorRef.current.style.left = `${cx}px`;
        cursorRef.current.style.top  = `${cy}px`;
      }
      if (ringRef.current) {
        ringRef.current.style.left = `${rx}px`;
        ringRef.current.style.top  = `${ry}px`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('mousemove', onMove); };
  }, []);

  return { cursorRef, ringRef };
}

function use3DTilt(strength = 8) {
  const ref = useRef(null);
  const onMove = useCallback((e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    ref.current.style.transform =
      `perspective(1000px) rotateY(${x * strength}deg) rotateX(${-y * strength}deg)`;
  }, [strength]);

  const onLeave = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.transform =
      'perspective(1000px) rotateY(0deg) rotateX(0deg)';
    ref.current.style.transition = 'transform 0.6s cubic-bezier(0.16,1,0.3,1)';
    setTimeout(() => { if (ref.current) ref.current.style.transition = ''; }, 600);
  }, []);

  return { ref, onMove, onLeave };
}

// ── Conversation playback ─────────────────────────────────────────────────────

function useConversation(script) {
  const [messages, setMessages]  = useState([]);
  const [typing,   setTyping]    = useState(false);
  const [playing,  setPlaying]   = useState(false);
  const timeoutsRef = useRef([]);

  const clear = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  };

  const play = useCallback(() => {
    clear();
    setMessages([]);
    setTyping(false);
    setPlaying(true);

    let delay = 300;
    script.forEach((msg, i) => {
      if (msg.from === 'agent') {
        // Show typing indicator first
        const t1 = setTimeout(() => setTyping(true), delay);
        timeoutsRef.current.push(t1);
        delay += 900 + msg.text.length * 14;
        const t2 = setTimeout(() => {
          setTyping(false);
          setMessages(p => [...p, msg]);
          if (i === script.length - 1) setPlaying(false);
        }, delay);
        timeoutsRef.current.push(t2);
        delay += 400;
      } else {
        const t = setTimeout(() => {
          setMessages(p => [...p, msg]);
        }, delay);
        timeoutsRef.current.push(t);
        delay += 600 + msg.text.length * 8;
      }
    });
  }, [script]);

  useEffect(() => {
    play();
    return clear;
  }, [script]); // eslint-disable-line

  const messagesEndRef = useRef(null);
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, typing]);

  return { messages, typing, playing, replay: play, messagesEndRef };
}

// ── Components ────────────────────────────────────────────────────────────────

const AgentCard = memo(({ agent, accent, accentSoft, accentGlow, onWatchDemo, isActive }) => {
  const { ref, onMove, onLeave } = use3DTilt(5);

  return (
    <div
      ref={ref}
      className="agent-card"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ boxShadow: isActive ? `0 0 0 1px ${accent}40` : undefined }}
    >
      {/* Top accent line */}
      <div className="agent-card-top-line"
        style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }} />
      {/* Ambient glow on hover */}
      <div className="agent-card-glow"
        style={{ background: `radial-gradient(ellipse at 50% 0%, ${accentGlow}, transparent 65%)` }} />

      <div className="agent-card-inner">
        <div className="agent-card-header">
          <div className="agent-card-identity">
            <div className="agent-card-name" style={{ color: accent }}>{agent.name}</div>
            <div className="agent-card-role">{agent.role}</div>
          </div>
          <div className="agent-badge"
            style={{ background: accentSoft, color: accent, border: `1px solid ${accent}30` }}>
            {agent.badge}
          </div>
        </div>

        <p className="agent-desc">{agent.description}</p>

        <div className="agent-caps">
          {agent.capabilities.map((cap) => (
            <div key={cap} className="agent-cap-item">
              <div className="agent-cap-check" style={{ background: accent }}>✓</div>
              {cap}
            </div>
          ))}
        </div>

        <div className="agent-channels">
          {agent.channels.map((ch) => (
            <span key={ch} className="agent-channel">{ch}</span>
          ))}
        </div>

        <div className="agent-stats">
          <div className="agent-stat">
            <div className="agent-stat-val" style={{ color: accent }}>{agent.stats.calls}</div>
            <div className="agent-stat-label">Calls / Day</div>
          </div>
          <div className="agent-stat">
            <div className="agent-stat-val">{agent.stats.resolution}</div>
            <div className="agent-stat-label">Resolution</div>
          </div>
          <div className="agent-stat">
            <div className="agent-stat-val">{agent.stats.latency}</div>
            <div className="agent-stat-label">Latency</div>
          </div>
        </div>

        <div className="agent-card-actions">
          <button
            className="agent-btn-demo"
            style={{ background: accent, color: '#fff' }}
            onClick={() => onWatchDemo(agent)}
          >
            Watch Live Demo
          </button>
          <button className="agent-btn-deploy">Deploy Agent</button>
        </div>
      </div>
    </div>
  );
});
AgentCard.displayName = 'AgentCard';

// ── Conversation panel (standalone, re-used inside showcase) ──────────────────

const ConvPanel = memo(({ agent, accent, accentSoft }) => {
  const { messages, typing, playing, replay, messagesEndRef } =
    useConversation(agent.conversation);

  return (
    <div className="conv-panel">
      <div className="conv-panel-header">
        <div className="conv-panel-agent">
          <div className="conv-agent-avatar" style={{ background: accent }}>
            {agent.name.slice(0, 2)}
          </div>
          <div>
            <div className="conv-agent-name">{agent.name}</div>
            <div className="conv-agent-role">{agent.role}</div>
          </div>
        </div>
        <div className="conv-status">
          <div className="conv-status-dot" />
          {playing ? 'Live' : 'Connected'}
        </div>
      </div>

      <div className="conv-messages">
        {messages.map((msg, i) => (
          <div key={i} className={`conv-msg ${msg.from}`}
            style={{ animationDelay: `${i * 0.04}s` }}>
            <div className="conv-msg-avatar"
              style={msg.from === 'agent'
                ? { background: accentSoft, color: accent, border: `1px solid ${accent}30` }
                : {}}>
              {msg.from === 'agent' ? agent.name.slice(0, 2) : 'YOU'}
            </div>
            <div className="conv-bubble"
              style={msg.from === 'customer'
                ? { background: accent }
                : {}}>
              {msg.text}
            </div>
          </div>
        ))}

        {typing && (
          <div className="conv-typing">
            <div className="conv-typing-dot" />
            <div className="conv-typing-dot" />
            <div className="conv-typing-dot" />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="conv-panel-footer">
        <div className="conv-footer-meta">
          Latency {agent.stats.latency} · {agent.stats.resolution} resolution
        </div>
        <button className="conv-replay-btn" onClick={replay}>↺ Replay</button>
      </div>
    </div>
  );
});
ConvPanel.displayName = 'ConvPanel';

// ── Root Page ─────────────────────────────────────────────────────────────────

export default function Home() {
  const { cursorRef, ringRef } = useCursor();

  const [activeIndustryId, setActiveIndustryId] = useState('banking');
  const [selectedAgentId,  setSelectedAgentId]  = useState('aria');

  // All agents flat-mapped for the conversation selector
  const allAgents = useMemo(() => INDUSTRIES.flatMap(ind =>
    ind.agents.map(a => ({ ...a, industryId: ind.id, industryLabel: ind.label, accent: ind.accent, accentSoft: ind.accentSoft }))
  ), []);

  const activeIndustry = useMemo(() =>
    INDUSTRIES.find(i => i.id === activeIndustryId) || INDUSTRIES[0],
  [activeIndustryId]);

  const selectedAgent = useMemo(() =>
    allAgents.find(a => a.id === selectedAgentId) || allAgents[0],
  [selectedAgentId, allAgents]);

  // Switch to first agent of industry when industry changes
  useEffect(() => {
    setSelectedAgentId(activeIndustry.agents[0].id);
  }, [activeIndustryId]); // eslint-disable-line

  const accent     = activeIndustry.accent;
  const accentSoft = activeIndustry.accentSoft;
  const accentGlow = activeIndustry.accentGlow;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      {/* Custom cursor */}
      <div ref={cursorRef} className="cursor"
        style={{ '--accent': accent } as any} />
      <div ref={ringRef} className="cursor-ring" />

      <div className="page">

        {/* ── Navigation ── */}
        <nav className="nav">
          <a href="#" className="nav-brand">
            <div className="nav-logo">E</div>
            ENLIGHTS
          </a>
          <div className="nav-links">
            {['Platform', 'Agents', 'Enterprise', 'Docs'].map(l => (
              <button key={l} className="nav-link">{l}</button>
            ))}
          </div>
          <div className="nav-actions">
            <button className="nav-btn-ghost">Sign In</button>
            <button className="nav-btn-primary"
              style={{ background: accent }}>
              Book a Demo
            </button>
          </div>
        </nav>

        {/* ── Hero ── */}
        <section className="hero">
          <div className="hero-glow"
            style={{ background: `radial-gradient(ellipse at center top, ${accentGlow}, transparent 65%)`,
                     transition: 'background 0.8s cubic-bezier(0.16,1,0.3,1)' }} />
          <div className="hero-noise" />
          <div className="hero-content">
            <div className="hero-badge">
              <div className="hero-badge-dot"
                style={{ background: accent, boxShadow: `0 0 8px ${accent}` }} />
              Now in General Availability · SOC 2 Type II Certified
            </div>

            <h1 className="hero-h1">
              AI Voice Agents That<br />
              <span style={{
                background: `linear-gradient(135deg, ${accent}, #818CF8)`,
                backgroundSize: '200%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Run Your Business
              </span>
            </h1>

            <p className="hero-sub" style={{ transition: 'opacity 0.4s' }}>
              {activeIndustry.headline}
            </p>

            <div className="hero-actions">
              <button className="btn-primary" style={{ background: accent }}>
                Start Building Free
              </button>
              <button className="btn-secondary">Watch Live Demo</button>
            </div>

            <div className="hero-social-proof">
              <div className="hero-proof-item">
                <strong>200+</strong> enterprises deployed
              </div>
              <div className="hero-proof-sep" />
              <div className="hero-proof-item">
                <strong>62</strong> languages supported
              </div>
              <div className="hero-proof-sep" />
              <div className="hero-proof-item">
                <strong>&lt;2ms</strong> inference latency
              </div>
              <div className="hero-proof-sep" />
              <div className="hero-proof-item">
                <strong>99.97%</strong> uptime SLA
              </div>
            </div>
          </div>
        </section>

        {/* ── Industry Switcher ── */}
        <section className="industry-section">
          <div className="industry-label">Choose your industry</div>
          <div className="industry-tabs">
            {INDUSTRIES.map(ind => (
              <button
                key={ind.id}
                className={`industry-tab${activeIndustryId === ind.id ? ' active' : ''}`}
                onClick={() => setActiveIndustryId(ind.id)}
                style={activeIndustryId === ind.id
                  ? { '--accent': ind.accent, background: ind.accent } as any
                  : {}}
              >
                {ind.label}
              </button>
            ))}
          </div>
        </section>

        <div className="section-divider"><div className="section-divider-line" /></div>

        {/* ── Agent Showcase ── */}
        <section className="agents-section">
          <div className="container">   
            <div className="agents-header">
              <div className="section-eyebrow">Agent Catalogue — {activeIndustry.label}</div>
              <h2 className="section-headline">
                Meet Your AI Workforce
              </h2>
              <p className="section-sub">
                Purpose-trained agents ready to deploy in your environment today.
                Each agent handles real workflows, integrates with your stack, and escalates intelligently.
              </p>
            </div>

            <div className="agents-grid">
              {activeIndustry.agents.map(agent => (
                <AgentCard
                  key={agent.id}
                  agent={agent}
                  accent={accent}
                  accentSoft={accentSoft}
                  accentGlow={accentGlow}
                  isActive={selectedAgentId === agent.id}
                  onWatchDemo={(a) => {
                    setSelectedAgentId(a.id);
                    document.getElementById('conv-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                />
              ))}
            </div>
          </div>
        </section>

        <div className="section-divider"><div className="section-divider-line" /></div>

        {/* ── Live Conversation Experience ── */}
        <section className="conv-section" id="conv-section">
          <div className="container">
            <div style={{ marginBottom: 48 }}>
              <div className="section-eyebrow">Live Conversation Experience</div>
              <h2 className="section-headline">
                Watch Them Work
              </h2>
              <p className="section-sub">
                Every conversation below is a real script from a production deployment.
                Select an agent to watch it handle a live customer interaction.
              </p>
            </div>

            <div className="conv-layout">
              {/* Left: conversation panel */}
              <div className="conv-left">
                <ConvPanel
                  key={selectedAgent.id}
                  agent={selectedAgent}
                  accent={selectedAgent.accent || accent}
                  accentSoft={selectedAgent.accentSoft || accentSoft}
                />
              </div>

              {/* Right: agent selector */}
              <div className="conv-right">
                <div className="conv-agent-selector">
                  <div className="conv-selector-header">Select Agent</div>
                  <div className="conv-selector-list">
                    {allAgents.map(a => (
                      <div
                        key={a.id}
                        className={`conv-selector-item${selectedAgentId === a.id ? ' active' : ''}`}
                        onClick={() => setSelectedAgentId(a.id)}
                      >
                        <div className="conv-sel-avatar"
                          style={{ background: a.accent }}>
                          {a.name.slice(0, 2)}
                        </div>
                        <div className="conv-sel-info">
                          <div className="conv-sel-name"
                            style={{ color: selectedAgentId === a.id ? a.accent : undefined }}>
                            {a.name}
                          </div>
                          <div className="conv-sel-role">{a.role}</div>
                        </div>
                        <div className="conv-sel-industry"
                          style={{ background: a.accentSoft, color: a.accent }}>
                          {a.industryLabel}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Capabilities callout */}
                <div style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 12, padding: 20,
                }}>
                  <div style={{
                    fontSize: 11, fontWeight: 500, letterSpacing: '0.08em',
                    textTransform: 'uppercase', color: 'var(--text-3)',
                    fontFamily: "'Geist Mono', monospace", marginBottom: 14,
                  }}>
                    Platform Capabilities
                  </div>
                  {[
                    ['Sub-2ms inference latency',     '1.4 – 2.1ms'],
                    ['Episodic memory across sessions','Per-caller context'],
                    ['Human handoff with context',    'Warm transfer + summary'],
                    ['RAG from your knowledge base',  'Real-time retrieval'],
                    ['62 languages + code-switching', 'Hinglish, Spanglish…'],
                    ['SOC 2 / HIPAA / PCI-DSS',       'Compliance-native'],
                  ].map(([label, value]) => (
                    <div key={label} style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      padding: '8px 0', borderBottom: '1px solid var(--border)',
                    }}>
                      <span style={{ fontSize: 12, color: 'var(--text-2)', letterSpacing: '-0.01em' }}>
                        {label}
                      </span>
                      <span style={{
                        fontSize: 11, fontFamily: "'Geist Mono', monospace",
                        color: accent, letterSpacing: '0.02em',
                      }}>
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="section-divider"><div className="section-divider-line" /></div>

        {/* ── Enterprise CTA ── */}
        <section className="cta-section">
          <div className="container">
            <div className="cta-box">
              <div className="cta-box-glow"
                style={{ background: accent }} />
              <h2 className="cta-h2">
                Deploy Your First Agent<br />in Under 10 Minutes
              </h2>
              <p className="cta-sub">
                No infrastructure to manage. Connect your knowledge base, configure your workflows,
                and go live — with a dedicated solution engineer on your first deployment.
              </p>
              <div className="cta-actions">
                <button className="btn-primary"
                  style={{ background: accent, fontSize: 15, padding: '13px 32px' }}>
                  Get Started Free
                </button>
                <button className="btn-secondary"
                  style={{ fontSize: 15, padding: '12px 28px' }}>
                  Talk to Sales
                </button>
              </div>
              <div className="cta-trust">
                {['No credit card required', 'SOC 2 Type II', '99.97% uptime SLA', '24/7 support'].map((t, i) => (
                  <div key={t} className="cta-trust-item">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <circle cx="6" cy="6" r="6" fill={`${accent}25`} />
                      <path d="M3.5 6L5.5 8L8.5 4.5" stroke={accent} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {t}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="footer">
          <div className="footer-brand">
            <span>ENLIGHTS</span> AI
          </div>
          <div className="footer-links">
            {['Privacy', 'Security', 'Compliance', 'Documentation', 'Status'].map(l => (
              <a key={l} href="#" className="footer-link">{l}</a>
            ))}
          </div>
          <div className="footer-copy">© 2025 Enlights Intelligence Inc.</div>
        </footer>
      </div>
    </>
  );
}
