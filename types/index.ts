// /types/index.ts

export type IndustryId =
  | "ecommerce"
  | "edtech"
  | "healthtech"
  | "bfsi"
  | "hospitality";

export interface Industry {
  id: IndustryId;
  name: string;
  color: string;
}

export interface TranscriptMessage {
  id?: string;
  role: "agent" | "user";
  text: string;
  timestamp: number;
}

export interface Agent {
  id: string;
  industry: IndustryId;
  name: string;
  role: string;
  color: string;
  currentStatus: string;
  description: string;
  capabilities: string[];
  useCases: string[];
  channels: string[];
  status: "live" | "beta" | "coming-soon";
  metric: string;
  retellAgentId: string;
  tagline?: string;
  latency?: string;
  accuracy?: string;
  callsToday?: string;
  workflowTags?: string[];
  demoScript?: TranscriptMessage[];
  demoTranscript?: TranscriptMessage[];
}

