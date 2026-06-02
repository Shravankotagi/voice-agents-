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
  description: string;
  capabilities: string[];
  channels: string[];
  retellAgentId: string;
}