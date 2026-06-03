import type { Metadata } from "next";
import EnterprisePageClient from "./EnterprisePageClient";

export const metadata: Metadata = {
  title: "Enterprise — Voice by Enlight Lab",
  description:
    "Enterprise AI voice solutions built for mission-critical operations. Dedicated support, custom deployment, advanced security, and unlimited scale.",
  keywords: [
    "enterprise AI voice agents",
    "enterprise voice solutions",
    "AI voice platform",
    "dedicated support",
    "enterprise security",
    "custom deployment",
    "SOC 2 certified",
    "white-label solutions",
  ],
  openGraph: {
    title: "Enterprise — Voice by Enlight Lab",
    description:
      "Enterprise AI voice solutions built for mission-critical operations.",
    type: "website",
  },
};

export default function EnterprisePage() {
  return <EnterprisePageClient />;
}