(function () {
  const VOICE_PLATFORM_URL = "https://voice.enlightlab.com";

  const scriptTag = document.currentScript || (function () {
    const scripts = document.getElementsByTagName("script");
    return scripts[scripts.length - 1];
  })();

  const agentId = scriptTag.getAttribute("data-agent");
  const agentName = scriptTag.getAttribute("data-name") || "AI Agent";
  const agentRole = scriptTag.getAttribute("data-role") || "Voice Assistant";

  if (!agentId) {
    console.warn("[Enlight Voice] No data-agent provided.");
    return;
  }

  const uid = agentId.slice(-8);

  const style = document.createElement("style");
  style.textContent = `
    #enlight-voice-widget-${uid} * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
    #enlight-fab-${uid} {
      position: fixed;
      bottom: 28px;
      right: 28px;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: linear-gradient(135deg, #818cf8, #4F46E5);
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 20px rgba(79,70,229,0.45);
      z-index: 999998;
      transition: transform 0.2s;
    }
    #enlight-fab-${uid}:hover { transform: scale(1.08); }
    #enlight-fab-${uid} svg { width: 26px; height: 26px; fill: none; stroke: #fff; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
    #enlight-overlay-${uid} {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.55);
      z-index: 999999;
      align-items: center;
      justify-content: center;
      padding: 1rem;
    }
    #enlight-overlay-${uid}.open { display: flex; }
    #enlight-modal-${uid} {
      background: #fff;
      border-radius: 24px;
      padding: 2rem 1.5rem;
      width: 100%;
      max-width: 360px;
      box-shadow: 0 24px 80px rgba(0,0,0,0.3);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.25rem;
    }
    #enlight-avatar-${uid} {
      width: 80px; height: 80px; border-radius: 50%;
      background: linear-gradient(135deg, #818cf8, #4F46E5);
      display: flex; align-items: center; justify-content: center;
      transition: box-shadow 0.3s;
    }
    #enlight-avatar-${uid} svg { width: 32px; height: 32px; fill: none; stroke: #fff; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
    #enlight-agent-name-${uid} { font-size: 1.1rem; font-weight: 700; color: #111827; text-align: center; }
    #enlight-agent-role-${uid} { font-size: 0.8rem; color: #6B7280; text-align: center; margin-top: 2px; }
    #enlight-status-pill-${uid} {
      display: flex; align-items: center; gap: 0.5rem;
      padding: 0.4rem 1rem; border-radius: 9999px;
      background: #F9FAFB;
    }
    #enlight-status-dot-${uid} { width: 8px; height: 8px; border-radius: 50%; background: #9CA3AF; flex-shrink: 0; }
    #enlight-status-text-${uid} { font-size: 0.8rem; font-weight: 600; color: #6B7280; }
    #enlight-transcript-${uid} {
      width: 100%; max-height: 180px; overflow-y: auto;
      background: #F9FAFB; border-radius: 12px; padding: 0.75rem;
      display: none; flex-direction: column; gap: 0.5rem;
    }
    .enlight-msg-${uid} { display: flex; }
    .enlight-msg-${uid}.user { justify-content: flex-end; }
    .enlight-msg-${uid}.agent { justify-content: flex-start; }
    .enlight-bubble-${uid} {
      padding: 0.4rem 0.75rem; border-radius: 12px;
      font-size: 0.8rem; max-width: 80%; line-height: 1.4;
    }
    .enlight-msg-${uid}.user .enlight-bubble-${uid} { background: #4F46E5; color: #fff; }
    .enlight-msg-${uid}.agent .enlight-bubble-${uid} { background: #E5E7EB; color: #111827; }
    #enlight-hangup-${uid} {
      width: 64px; height: 64px; border-radius: 50%;
      background: #EF4444; border: none; cursor: pointer;
      display: none; align-items: center; justify-content: center;
      box-shadow: 0 4px 16px rgba(239,68,68,0.4);
    }
    #enlight-hangup-${uid} svg { width: 24px; height: 24px; fill: none; stroke: #fff; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
    #enlight-start-btn-${uid} {
      padding: 0.65rem 2rem; border-radius: 9999px;
      background: linear-gradient(135deg, #818cf8, #4F46E5);
      color: #fff; border: none; cursor: pointer;
      font-size: 0.9rem; font-weight: 600;
      box-shadow: 0 4px 14px rgba(79,70,229,0.35);
    }
    #enlight-start-btn-${uid}:hover { opacity: 0.9; }
    #enlight-hint-${uid} { font-size: 0.75rem; color: #9CA3AF; text-align: center; }
    @keyframes enlight-pulse-${uid} { 0%,100%{opacity:1} 50%{opacity:0.3} }
  `;
  document.head.appendChild(style);

  const wrapper = document.createElement("div");
  wrapper.id = `enlight-voice-widget-${uid}`;

  wrapper.innerHTML = `
    <button id="enlight-fab-${uid}" title="Talk to ${agentName}">
      <svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
    </button>
    <div id="enlight-overlay-${uid}">
      <div id="enlight-modal-${uid}">
        <div id="enlight-avatar-${uid}">
          <svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
        </div>
        <div>
          <div id="enlight-agent-name-${uid}">${agentName}</div>
          <div id="enlight-agent-role-${uid}">${agentRole}</div>
        </div>
        <div id="enlight-status-pill-${uid}">
          <div id="enlight-status-dot-${uid}"></div>
          <span id="enlight-status-text-${uid}">Ready</span>
        </div>
        <div id="enlight-transcript-${uid}"></div>
        <button id="enlight-start-btn-${uid}">Start Call</button>
        <button id="enlight-hangup-${uid}">
          <svg viewBox="0 0 24 24"><path d="M10.68 13.31a16 16 0 006.01 6.01l2.2-2.2a2 2 0 012.12-.45c1.34.5 2.8.77 4.29.77A2 2 0 0127 19.5v4a2 2 0 01-2 2A22 22 0 013 3a2 2 0 012-2h4a2 2 0 012 2c0 1.5.27 2.95.77 4.29a2 2 0 01-.45 2.11l-2.2 2.2z" transform="rotate(135 12 12)"/></svg>
        </button>
        <p id="enlight-hint-${uid}"></p>
      </div>
    </div>
  `;
  document.body.appendChild(wrapper);

  const fab = document.getElementById(`enlight-fab-${uid}`);
  const overlay = document.getElementById(`enlight-overlay-${uid}`);
  const avatar = document.getElementById(`enlight-avatar-${uid}`);
  const statusDot = document.getElementById(`enlight-status-dot-${uid}`);
  const statusText = document.getElementById(`enlight-status-text-${uid}`);
  const transcriptEl = document.getElementById(`enlight-transcript-${uid}`);
  const startBtn = document.getElementById(`enlight-start-btn-${uid}`);
  const hangupBtn = document.getElementById(`enlight-hangup-${uid}`);
  const hint = document.getElementById(`enlight-hint-${uid}`);

  let retellClient = null;
  let phase = "idle";

  fab.addEventListener("click", () => overlay.classList.add("open"));
  overlay.addEventListener("click", (e) => { if (e.target === overlay) closeModal(); });

  function closeModal() {
    if (phase === "active" || phase === "connecting") return;
    overlay.classList.remove("open");
  }

  function setPhase(p) {
    phase = p;
    if (p === "connecting") {
      setStatus("Connecting...", "#F59E0B", "#FFF7ED", true);
      startBtn.style.display = "none";
      hangupBtn.style.display = "flex";
      hint.textContent = "Tap to end call";
      avatar.style.boxShadow = "none";
    } else if (p === "active") {
      setStatus("Connected", "#10B981", "#F0FDF4", false);
      avatar.style.boxShadow = "0 0 0 12px rgba(79,70,229,0.15)";
      transcriptEl.style.display = "flex";
    } else if (p === "ended") {
      setStatus("Call ended", "#9CA3AF", "#F9FAFB", false);
      hangupBtn.style.display = "none";
      startBtn.style.display = "block";
      startBtn.textContent = "Call Again";
      hint.textContent = "Call ended";
      avatar.style.boxShadow = "none";
    } else {
      setStatus("Ready", "#9CA3AF", "#F9FAFB", false);
      startBtn.style.display = "block";
      hangupBtn.style.display = "none";
      transcriptEl.style.display = "none";
      transcriptEl.innerHTML = "";
      hint.textContent = "";
      avatar.style.boxShadow = "none";
    }
  }

  function setStatus(text, dotColor, pillBg, pulse) {
    statusText.textContent = text;
    statusText.style.color = dotColor;
    statusDot.style.background = dotColor;
    statusDot.style.animation = pulse ? `enlight-pulse-${uid} 1s infinite` : "none";
    document.getElementById(`enlight-status-pill-${uid}`).style.background = pillBg;
  }

  function appendTranscript(role, text) {
    transcriptEl.style.display = "flex";
    const div = document.createElement("div");
    div.className = `enlight-msg-${uid} ${role}`;
    div.innerHTML = `<div class="enlight-bubble-${uid}">${text}</div>`;
    transcriptEl.appendChild(div);
    transcriptEl.scrollTop = transcriptEl.scrollHeight;
  }

  startBtn.addEventListener("click", async () => {
    setPhase("connecting");

    try {
      const now = new Date();
      const hour = parseInt(new Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata", hour: "numeric", hour12: false }).format(now));
      const timeOfDay = hour < 12 ? "morning" : hour < 17 ? "afternoon" : "evening";
      const currentDatetime = now.toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "full", timeStyle: "short" });

      const res = await fetch(`${VOICE_PLATFORM_URL}/api/retell/create-web-call`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agentId: agentId,
          dynamicVariables: { current_datetime: currentDatetime, time_of_day: timeOfDay }
        })
      });

      const data = await res.json();

      if (!data.access_token) {
        setPhase("ended");
        statusText.textContent = "Failed to connect";
        return;
      }

      if (typeof RetellWebClient === "undefined") {
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/retell-client-js-sdk/dist/index.umd.js";
        script.onload = () => initCall(data.access_token);
        document.head.appendChild(script);
      } else {
        initCall(data.access_token);
      }

    } catch (e) {
      console.error("[Enlight Voice] Error:", e);
      setPhase("ended");
      statusText.textContent = "Failed to connect";
    }
  });

  function initCall(accessToken) {
    retellClient = new RetellWebClient();
    retellClient.on("call_started", () => setPhase("active"));
    retellClient.on("call_ended", () => { retellClient = null; setPhase("ended"); });
    retellClient.on("error", () => { retellClient = null; setPhase("ended"); statusText.textContent = "Error"; });
    retellClient.on("update", (update) => {
      if (update.transcript) {
        transcriptEl.innerHTML = "";
        update.transcript.forEach(msg => appendTranscript(msg.role, msg.content));
      }
    });
    retellClient.startCall({ accessToken });
  }

  hangupBtn.addEventListener("click", () => {
    if (retellClient) { try { retellClient.stopCall(); } catch (e) {} retellClient = null; }
    setPhase("ended");
  });

  setPhase("idle");
})();