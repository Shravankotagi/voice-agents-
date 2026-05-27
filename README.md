```markdown
# Enlights AI — Voice Agent Platform

> **10 autonomous voice agents. Real workflows. No humans in the loop.**
> Built on Next.js 14 + Retell AI. Production ready.

---

## What This Is

Enlights AI is a live voice agent demonstration platform. Each agent handles a complete, real-world workflow — fraud resolution, patient triage, student enrollment, hotel concierge, cart recovery — entirely autonomously via voice.

No scripts. No transfers. No wait times.

---

## Live Agents

| Agent | Industry | What It Does |
|---|---|---|
| **SAM** | Ecommerce | Resolves delivery issues, refunds, returns |
| **MAX** | Ecommerce | Recovers abandoned carts, closes checkout |
| **ISHA** | EdTech | Qualifies leads, matches programs, books counsellors |
| **KIRAN** | EdTech | Onboards enrolled students end-to-end |
| **SARA** | HealthTech | Schedules appointments, verifies insurance |
| **RIYA** | HealthTech | Triages symptoms, classifies urgency |
| **BHASKAR** | BFSI | Resolves fraud disputes, issues provisional credits |
| **ARYAN** | BFSI | Files FNOL, assigns adjusters for claims |
| **LUCKY** | Hospitality | Concierge — spa, dining, local bookings |
| **NIKITA** | Hospitality | Manages reservations, checkout extensions |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Voice AI | Retell AI (WebRTC) |
| Animation | Framer Motion |
| State | Zustand |
| Styling | CSS Variables + Tailwind |
| Icons | Lucide React |
| Deployment | Vercel |

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-org/enlights-ai.git
cd enlights-ai
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root:

```env
# Retell Agent IDs
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

# Retell API Key (server-side only)
RETELL_API_KEY=your_retell_api_key
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Project Structure

```
enlights-ai/
├── app/
│   ├── page.tsx                  # Main page — all agents, UI, call logic
│   ├── layout.tsx                # Root layout
│   └── api/
│       └── retell/
│           └── create-web-call/
│               └── route.ts      # Server route — creates Retell web call session
├── store/
│   └── callStore.ts              # Zustand store — call state management
├── types/
│   └── index.ts                  # Shared TypeScript types
├── components/
│   └── UI/
│       └── Button.tsx            # Shared button component
└── public/                       # Static assets
```

---

## How a Call Works

```
User clicks "Try Live"
        │
        ▼
Microphone permission requested
        │
        ▼
POST /api/retell/create-web-call
        │
        ▼
Retell returns access_token
        │
        ▼
RetellWebClient.startCall()
        │
        ▼
WebRTC audio stream established
        │
        ▼
Transcript streamed via "update" event
        │
        ▼
User clicks "End Call" → stopCall() → modal closes
```

---

## Environment Setup — Retell

1. Sign up at [retell.ai](https://retell.ai)
2. Create an agent for each use case
3. Copy the Agent ID for each agent
4. Paste into `.env.local` as shown above
5. Add your API key to `RETELL_API_KEY`

> If no Agent ID is configured, the platform automatically falls back to a simulated conversation so the UI is always demonstrable.

---

## Key Features

- **Live voice calls** — real WebRTC audio via Retell AI
- **Streaming transcript** — partial chunks merged in real time, no duplicate rows
- **Overlap prevention** — only one call active at a time
- **Fallback simulation** — works without Retell credentials for demos
- **Microphone permission handling** — explicit browser permission flow with status feedback
- **Page cleanup** — all calls, timers, and listeners cleaned up on unmount
- **Dark / light mode** — system-aware theme toggle
- **Animated waveform** — real-time audio visualisation
- **Industry tabs** — filter agents by vertical
- **Workflow pipeline** — end-to-end process visualisation per industry

---

## API Route

### `POST /api/retell/create-web-call`

Creates a Retell web call session server-side.

**Request body:**
```json
{
  "agentId": "your_retell_agent_id"
}
```

**Response:**
```json
{
  "access_token": "...",
  "call_id": "..."
}
```

---

## Scripts

```bash
npm run dev        # Start development server
npm run build      # Production build
npm run start      # Start production server
npm run lint       # Run ESLint
```

---

## Deployment

### Vercel (recommended)

```bash
npx vercel
```

Add all environment variables from `.env.local` to your Vercel project settings under **Settings → Environment Variables**.

### Self-hosted

```bash
npm run build
npm run start
```

---

## Browser Requirements

| Requirement | Detail |
|---|---|
| Microphone access | Required for live calls |
| WebRTC support | Chrome, Edge, Firefox, Safari 15+ |
| JavaScript | Must be enabled |

---

## Contributing

1. Fork the repository
2. Create a feature branch — `git checkout -b feature/your-feature`
3. Commit your changes — `git commit -m 'Add your feature'`
4. Push to the branch — `git push origin feature/your-feature`
5. Open a Pull Request

---

## License

MIT License. See `LICENSE` for details.



---

*Enlights AI — Powered by Enlights Lab*
```
