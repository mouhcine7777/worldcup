import { Montserrat, Inter } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Public Events - Agence de Communication Événementielle",
  description: "Agence de communication événementielle globale",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={`${montserrat.variable} ${inter.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}