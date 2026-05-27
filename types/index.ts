export type IndustryId = "ecommerce" | "edtech" | "healthtech" | "bfsi" | "hospitality";

export interface Industry {
  id: IndustryId;
  name: string;
  color: string;
}

export interface Message {
  role: string;
  text: string;
  timestamp?: number;
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
  demoTranscript: Message[];
  workflowTags?: string[];
  tagline?: string;
  latency?: string;
  accuracy?: string;
  callsToday?: string;
  demoScript?: Message[];
}

export const statusConfig = {
  live: "Live",
  beta: "Beta",
  coming_soon: "Coming Soon"
};



