import type { Metadata } from "next";
import SecurityPage from "./SecurityPage";

export const metadata: Metadata = {
  title: "Security & Compliance — Enlight AI",
  description:
    "Enterprise-grade security with SOC 2 Type II, HIPAA, GDPR, and ISO 27001 compliance. AES-256 encryption, RBAC, SSO, and 99.99% uptime SLA.",
};

export default function Page() {
  return <SecurityPage />;
}