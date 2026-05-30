<div align="center">

<br />

```
███████╗███╗   ██╗██╗     ██╗ ██████╗ ██╗  ██╗████████╗███████╗     █████╗ ██╗
██╔════╝████╗  ██║██║     ██║██╔════╝ ██║  ██║╚══██╔══╝██╔════╝    ██╔══██╗██║
█████╗  ██╔██╗ ██║██║     ██║██║  ███╗███████║   ██║   ███████╗    ███████║██║
██╔══╝  ██║╚██╗██║██║     ██║██║   ██║██╔══██║   ██║   ╚════██║    ██╔══██║██║
███████╗██║ ╚████║███████╗██║╚██████╔╝██║  ██║   ██║   ███████║    ██║  ██║██║
╚══════╝╚═╝  ╚═══╝╚══════╝╚═╝ ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚══════╝    ╚═╝  ╚═╝╚═╝
```

### **10 Autonomous Voice Agents. Real Workflows. Zero Human Intervention.**

<br />

[![Next.js](https://img.shields.io/badge/Next.js_14-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Retell AI](https://img.shields.io/badge/Retell_AI-WebRTC-6C63FF?style=for-the-badge)](https://retell.ai/)
[![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=black)](https://your-render-url.onrender.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-22C55E?style=for-the-badge)](./LICENSE)

<br />

> *No scripts. No transfers. No wait times.*
> *Just voice — fully autonomous, end-to-end.*

<br />

[**🎙 Try Live Demo**](https://enlights.ai) · [**📖 Documentation**](#getting-started) · [**🤝 Enterprise Pilots**](mailto:hello@enlights.ai)

<br />

---

</div>

<br />

## ✦ What Is Enlights AI?

**Enlights AI** is a production-grade voice agent demonstration platform powered by Retell AI and WebRTC. Each of the 10 agents handles a *complete, real-world business workflow* — from fraud resolution and patient triage to hotel concierge and cart recovery — entirely through voice, with no human in the loop.

Built by **Enlights Lab** to showcase what autonomous voice AI looks like across industries — today, not hypothetically.

<br />

---

<br />

## ✦ Live Agents

<br />

### 🛒 Ecommerce

| Agent | Role | Capability |
|:-----:|:-----|:-----------|
| **SAM** | Support Agent | Resolves delivery issues, processes refunds & returns autonomously |
| **MAX** | Sales Agent | Recovers abandoned carts and closes the checkout in real time |

<br />

### 🎓 EdTech

| Agent | Role | Capability |
|:-----:|:-----|:-----------|
| **ISHA** | Lead Qualifier | Qualifies leads, matches programs, books counsellor sessions |
| **KIRAN** | Onboarding Agent | Onboards newly enrolled students end-to-end |

<br />

### 🏥 HealthTech

| Agent | Role | Capability |
|:-----:|:-----|:-----------|
| **SARA** | Scheduling Agent | Schedules appointments and verifies insurance |
| **RIYA** | Triage Agent | Triages symptoms and classifies urgency for clinical routing |

<br />

### 🏦 BFSI

| Agent | Role | Capability |
|:-----:|:-----|:-----------|
| **BHASKAR** | Fraud Resolution | Resolves disputes and issues provisional credits |
| **ARYAN** | Claims Agent | Files FNOL (First Notice of Loss) and assigns adjusters |

<br />

### 🏨 Hospitality

| Agent | Role | Capability |
|:-----:|:-----|:-----------|
| **LUCKY** | Concierge | Handles spa, dining, and local experience bookings |
| **NIKITA** | Reservations | Manages reservations and processes checkout extensions |

<br />

---

<br />

## ✦ Tech Stack

<br />

```
┌─────────────────────────────────────────────────────────────────┐
│                        ENLIGHTS AI STACK                        │
├──────────────────────┬──────────────────────────────────────────┤
│  Framework           │  Next.js 14 (App Router)                 │
│  Language            │  TypeScript                              │
│  Voice AI            │  Retell AI (WebRTC)                      │
│  Animation           │  Framer Motion                           │
│  State Management    │  Zustand                                  │
│  Styling             │  CSS Variables + Tailwind CSS            │
│  Icons               │  Lucide React                            │
│  Deployment          │  Vercel                                  │
└──────────────────────┴──────────────────────────────────────────┘
```

<br />

---

<br />

## ✦ Getting Started

<br />

### Prerequisites

- Node.js `18+`
- A [Retell AI](https://retell.ai) account (or use the built-in fallback simulation)
- `npm`, `yarn`, or `pnpm`

<br />

### 1 · Clone the Repository

```bash
git clone https://github.com/your-org/enlights-ai.git
cd enlights-ai
```

<br />

### 2 · Install Dependencies

```bash
# npm
npm install

# yarn
yarn install

# pnpm
pnpm install
```

<br />

### 3 · Configure Environment Variables

Create a `.env.local` file at the project root:

```env
# ─── Retell Agent IDs ────────────────────────────────────────────
NEXT_PUBLIC_RETELL_SAM_ID=your_sam_agent_id
NEXT_PUBLIC_RETELL_MAX_ID=your_max_agent_id
NEXT_PUBLIC_RETELL_ISHA_ID=your_isha_agent_id
NEXT_PUBLIC_RETELL_KIRAN_ID=your_kiran_agent_id
NEXT_PUBLIC_RETELL_SARA_ID=your_sara_agent_id
NEXT_PUBLIC_RETELL_RIYA_ID=your_riya_agent_id
NEXT_PUBLIC_RETELL_BHASKAR_ID=your_bhaskar_agent_id
NEXT_PUBLIC_RETELL_ARYAN_ID=your_aryan_agent_id
NEXT_PUBLIC_RETELL_LUCKY_ID=your_lucky_agent_id
NEXT_PUBLIC_RETELL_NIKITA_ID=your_nikita_agent_id

# ─── Retell API Key (server-side only) ───────────────────────────
RETELL_API_KEY=your_retell_api_key
```

> 💡 **No credentials?** The platform includes a built-in fallback simulation — the full UI and demo flow works without any Retell configuration.

<br />

### 4 · Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

<br />

---

<br />

## ✦ Project Structure

```
enlights-ai/
│
├── app/
│   ├── page.tsx                        # Main page — agents, UI & call logic
│   ├── layout.tsx                      # Root layout
│   └── api/
│       └── retell/
│           └── create-web-call/
│               └── route.ts            # Server route — Retell session creation
│
├── store/
│   └── callStore.ts                    # Zustand — global call state
│
├── types/
│   └── index.ts                        # Shared TypeScript types
│
├── components/
│   └── UI/
│       └── Button.tsx                  # Shared button component
│
└── public/                             # Static assets
```

<br />

---

<br />

## ✦ How a Call Works

```
  ┌─────────────────────────────────────────────────────────────┐
  │                     CALL LIFECYCLE                          │
  └─────────────────────────────────────────────────────────────┘

  User clicks "Try Live"
          │
          ▼
  🎙  Microphone permission requested
          │
          ▼
  📡  POST /api/retell/create-web-call  {agentId}
          │
          ▼
  🔑  Retell returns  access_token + call_id
          │
          ▼
  🔗  RetellWebClient.startCall()
          │
          ▼
  📶  WebRTC audio stream established
          │
          ▼
  📝  Transcript streamed via "update" event (partial chunks merged)
          │
          ▼
  ✋  User clicks "End Call"  →  stopCall()  →  modal closes
```

<br />

---

<br />

## ✦ API Reference

<br />

### `POST /api/retell/create-web-call`

Creates a Retell web call session server-side and returns an access token for WebRTC.

**Request**

```json
{
  "agentId": "your_retell_agent_id"
}
```

**Response**

```json
{
  "access_token": "...",
  "call_id": "..."
}
```

<br />

---

<br />

## ✦ Key Features

<br />

| Feature | Description |
|:--------|:------------|
| 🎙 **Live Voice Calls** | Real WebRTC audio via Retell AI — no phone lines, no SIP |
| 📝 **Streaming Transcript** | Partial chunks merged in real time, no duplicate rows |
| 🔒 **Overlap Prevention** | Only one active call at a time across the entire platform |
| 🧪 **Fallback Simulation** | Full demo mode works without Retell credentials |
| 🎤 **Mic Permission Handling** | Explicit browser permission flow with live status feedback |
| 🧹 **Page Cleanup** | All calls, timers, and listeners torn down on unmount |
| 🌗 **Dark / Light Mode** | System-aware theme toggle |
| 〰️ **Animated Waveform** | Real-time audio visualisation during calls |
| 🏷️ **Industry Tabs** | Filter agents by vertical (Ecommerce, Health, BFSI…) |
| 🗺️ **Workflow Pipeline** | End-to-end process visualisation per industry |

<br />

---

<br />

## ✦ Retell AI Setup

1. Sign up at [retell.ai](https://retell.ai)
2. Create an agent for each use case
3. Copy the Agent ID for each agent
4. Paste into `.env.local` as shown in the [configuration step](#3--configure-environment-variables)
5. Add your Retell API key to `RETELL_API_KEY`

<br />

---

<br />

## ✦ Scripts

```bash
npm run dev        # Start development server (hot reload)
npm run build      # Production build
npm run start      # Serve production build
npm run lint       # Run ESLint
```

<br />

---

<br />

## ✨ Deployment

### Render

1. Connect the repository to Render
2. Set the build command:

```bash
npm install && npm run build
```

3. Set the start command:

```bash
npm start
```

4. Add all environment variables from `.env.local` in:

Dashboard → Environment → Environment Variables

5. Deploy the service

### Live Application

https://YOUR-APP.onrender.com

### Self-Hosted

```bash
npm run build
npm run start
```

<br />

---

<br />

## ✦ Browser Requirements

| Requirement | Detail |
|:------------|:-------|
| 🎤 Microphone | Required for live calls |
| 📡 WebRTC | Chrome, Edge, Firefox, Safari 15+ |
| ⚡ JavaScript | Must be enabled |

<br />

---

<br />

## ✦ Contributing

Contributions are welcome! Please follow this workflow:

```bash
# 1. Fork the repo and create your branch
git checkout -b feature/your-feature-name

# 2. Make your changes and commit
git commit -m "feat: add your feature description"

# 3. Push and open a Pull Request
git push origin feature/your-feature-name
```

Please ensure your code passes `npm run lint` before submitting a PR.

<br />

---

<br />

## ✦ License

This project is licensed under the **MIT License** — see the [`LICENSE`](./LICENSE) file for details.

<br />

---

<br />

<div align="center">

## ✦ Built by Enlights Lab

*For enterprise pilots, custom agent configuration, or integration support:*

<br />
---

*Enlights AI — Powered by Enlights Lab*

</div>
