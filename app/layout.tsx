import type { Metadata } from "next";
import { Inter, Poppins, Instrument_Serif } from "next/font/google";
import "../styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-display-sans",
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Enlights AI — Enterprise AI Voice Agents",
  description:
    "Deploy production-grade AI voice agents for Healthcare, BFSI, Hospitality, Ecommerce, and EdTech. Automate customer support, appointment booking, fraud resolution, and more.",
  keywords: [
    "AI voice agents",
    "enterprise AI",
    "voice automation",
    "customer support AI",
    "healthcare AI",
    "BFSI AI",
  ],
  openGraph: {
    title: "Enlights AI — Enterprise AI Voice Agents",
    description:
      "Production-grade AI voice agents that handle real end-to-end workflows without a human in the loop.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${inter.variable} ${poppins.variable} ${instrument.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}