<div align="center">

<br />

```
███████╗███╗   ██╗██╗     ██╗ ██████╗ ██╗  ██╗████████╗     █████╗ ██╗
██╔════╝████╗  ██║██║     ██║██╔════╝ ██║  ██║╚══██╔══╝    ██╔══██╗██║
█████╗  ██╔██╗ ██║██║     ██║██║  ███╗███████║   ██║       ███████║██║
██╔══╝  ██║╚██╗██║██║     ██║██║   ██║██╔══██║   ██║       ██╔══██║██║
███████╗██║ ╚████║███████╗██║╚██████╔╝██║  ██║   ██║       ██║  ██║██║
╚══════╝╚═╝  ╚═══╝╚══════╝╚═╝ ╚═════╝ ╚═╝  ╚═╝   ╚═╝       ╚═╝  ╚═╝╚═╝
```

**10 Autonomous Voice Agents · Real Workflows · Zero Human Intervention**

<br />

[![Next.js](https://img.shields.io/badge/Next.js_14-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Retell AI](https://img.shields.io/badge/Retell_AI-WebRTC-6C63FF?style=for-the-badge)](https://retell.ai/)
[![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=black)](https://render.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-22C55E?style=for-the-badge)](./LICENSE)

<br />

> *No scripts. No transfers. No wait times.*
> *Just voice — fully autonomous, end-to-end.*

<br />

[**🎙 Live Demo**](https://enlights.ai) &nbsp;·&nbsp; [**📖 Docs**](#getting-started) &nbsp;·&nbsp; [**🤝 Enterprise**](mailto:hello@enlight.ai)

</div>

---

## Overview

**Enlight AI** is a production-grade voice agent platform built on [Retell AI](https://retell.ai) and WebRTC. Ten purpose-built agents each own a complete, real-world business workflow — from fraud resolution and patient triage to hotel concierge and abandoned cart recovery — with no human in the loop at any step.

Built by **Enlight Lab** to demonstrate what truly autonomous voice AI looks like across verticals, today.

---

## Agents

### 🛒 Ecommerce

| Agent | Role | What It Does |
|:---:|:---|:---|
| **Sam Altman** | Support Agent | Resolves delivery issues, processes refunds and returns end-to-end |
| **Andrew Collins** | Sales Agent | Re-engages abandoned carts and closes checkout in real time |

### 🎓 EdTech

| Agent | Role | What It Does |
|:---:|:---|:---|
| **Natalie Parker** | Lead Qualifier | Qualifies inbound leads, matches programs, books counsellor sessions |
| **KIRAN** | Onboarding Agent | Guides newly enrolled students through the full onboarding flow |

### 🏥 HealthTech

| Agent | Role | What It Does |
|:---:|:---|:---|
| **Emily Parker** | Scheduling Agent | Books appointments and verifies insurance without human involvement |
| **Nicole Turner** | Triage Agent | Assesses symptoms and classifies urgency for clinical routing |

### 🏦 BFSI

| Agent | Role | What It Does |
|:---:|:---|:---|
| **Brandon Cooper** | Fraud Resolution | Resolves disputes and issues provisional credits autonomously |
| **Victor Reed** | Claims Agent | Files FNOL (First Notice of Loss) and assigns adjusters in one call |

### 🏨 Hospitality

| Agent | Role | What It Does |
|:---:|:---|:---|
| **Daniel Walker** | Concierge | Manages spa, dining, and local experience bookings |
| **Lauren Brooks** | Reservations | Handles room reservations and checkout extension requests |

---

## Tech Stack

| Layer | Technology |
|:---|:---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Voice AI | Retell AI (WebRTC) |
| Animation | Framer Motion |
| State Management | Zustand |
| Styling | Tailwind CSS + CSS Variables |
| Icons | Lucide React |
| Deployment | Render |

---

## Getting Started

### Prerequisites

- Node.js `18+`
- A [Retell AI](https://retell.ai) account *(optional — the platform includes a built-in fallback simulation)*
- `npm`, `yarn`, or `pnpm`

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/enlight-ai.git
cd enlight-ai
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Configure Environment Variables

Create a `.env.local` file at the project root:

```env
# Retell Agent IDs
NEXT_PUBLIC_RETELL_Sam Altman_ID=your_Sam Altman_agent_id
NEXT_PUBLIC_RETELL_Andrew Collins_ID=your_Andrew Collins_agent_id
NEXT_PUBLIC_RETELL_Natalie Parker_ID=your_Natalie Parker_agent_id
NEXT_PUBLIC_RETELL_KIRAN_ID=your_kiran_agent_id
NEXT_PUBLIC_RETELL_Emily Parker_ID=your_Emily Parker_agent_id
NEXT_PUBLIC_RETELL_Nicole Turner_ID=your_Nicole Turner_agent_id
NEXT_PUBLIC_RETELL_Brandon Cooper_ID=your_Brandon Cooper_agent_id
NEXT_PUBLIC_RETELL_Victor Reed_ID=your_Victor Reed_agent_id
NEXT_PUBLIC_RETELL_Daniel Walker_ID=your_Daniel Walker_agent_id
NEXT_PUBLIC_RETELL_Lauren Brooks_ID=your_Lauren Brooks_agent_id

# Retell API Key (server-side only — never expose to the client)
RETELL_API_KEY=your_retell_api_key
```

> **No credentials?** The platform ships with a full fallback simulation — the entire UI and demo flow works without any Retell configuration.

### 4. Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
enlight-ai/
├── app/
│   ├── page.tsx                          # Main page — agents, UI & call logic
│   ├── layout.tsx                        # Root layout
│   └── api/
│       └── retell/
│           └── create-web-call/
│               └── route.ts              # Server route — Retell session creation
├── store/
│   └── callStore.ts                      # Zustand — global call state
├── types/
│   └── index.ts                          # Shared TypeScript types
├── components/
│   └── UI/
│       └── Button.tsx                    # Shared button component
└── public/                               # Static assets
```

---

## Call Lifecycle

```
User clicks "Try Live"
        │
        ▼
Microphone permission requested
        │
        ▼
POST /api/retell/create-web-call  { agentId }
        │
        ▼
Retell returns  access_token  +  call_id
        │
        ▼
RetellWebClient.startCall()
        │
        ▼
WebRTC audio stream established
        │
        ▼
Transcript streamed via "update" event  (partial chunks merged)
        │
        ▼
User clicks "End Call"  →  stopCall()  →  modal closes
```

---

## API Reference

### `POST /api/retell/create-web-call`

Creates a Retell web call session server-side and returns an access token for WebRTC.

**Request body**

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

---

## Features

| Feature | Description |
|:---|:---|
| 🎙 Live Voice Calls | Real WebRTC audio via Retell AI — no phone lines, no SIP trunks |
| 📝 Streaming Transcript | Partial chunks merged in real time with no duplicate rows |
| 🔒 Overlap Prevention | Exactly one active call at a time across the entire platform |
| 🧪 Fallback Simulation | Full demo mode runs without any Retell credentials |
| 🎤 Mic Permission Handling | Explicit browser permission flow with live status feedback |
| 🧹 Page Cleanup | All calls, timers, and listeners torn down cleanly on unmount |
| 🌗 Dark / Light Mode | System-aware theme toggle |
| 〰️ Animated Waveform | Real-time audio visualisation during active calls |
| 🏷️ Industry Tabs | Filter agents by vertical — Ecommerce, EdTech, Health, BFSI, Hospitality |
| 🗺️ Workflow Pipeline | End-to-end process visualisation per industry |

---

## Retell AI Setup

1. Sign up at [retell.ai](https://retell.ai)
2. Create one agent per use case
3. Copy each Agent ID from the Retell dashboard
4. Add them to `.env.local` as shown in the [configuration step](#3-configure-environment-variables)
5. Add your Retell API key to `RETELL_API_KEY`

---

## Scripts

```bash
npm run dev      # Start development server with hot reload
npm run build    # Create a production build
npm run start    # Serve the production build
npm run lint     # Run ESLint
```

---

## Deployment

### Render (Recommended)

1. Connect the repository to [Render](https://render.com)
2. Set the **build command**:
   ```bash
   npm install && npm run build
   ```
3. Set the **start command**:
   ```bash
   npm start
   ```
4. Add all environment variables from `.env.local` under **Dashboard → Environment → Environment Variables**
5. Deploy the service

### Self-Hosted

```bash
npm run build
npm run start
```

---

## Browser Requirements

| Requirement | Detail |
|:---|:---|
| Microphone | Required for live voice calls |
| WebRTC | Chrome 80+, Edge 80+, Firefox 78+, Safari 15+ |
| JavaScript | Must be enabled |

---

## Contributing

Contributions are welcome. Please follow this workflow:

```bash
# 1. Fork the repo and create a feature branch
git checkout -b feature/your-feature-name

# 2. Commit your changes with a descriptive message
git commit -m "feat: describe your change"

# 3. Push and open a Pull Request
git push origin feature/your-feature-name
```

Ensure `npm run lint` passes before submitting a PR.

---

## License

Licensed under the **MIT License** — see [`LICENSE`](./LICENSE) for details.

---

<div align="center">

Built by **Enlight Lab**