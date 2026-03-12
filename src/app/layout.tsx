import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Footer from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zooch IG Analyzer — Instagram Follower Insights",
  description:
    "Analyze your Instagram followers and following. Discover who follows you back, find mutual connections, and get insights into your network. 100% private — all processing happens locally.",
  keywords: ["instagram", "followers", "analyzer", "social media", "privacy", "follower tracker"],
  authors: [{ name: "Zooch" }],
  creator: "Zooch",
  publisher: "Zooch",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    title: "Zooch IG Analyzer",
    description:
      "Privacy-focused Instagram follower analysis. All processing done locally in your browser.",
  },
  twitter: {
    card: "summary",
    title: "Zooch IG Analyzer",
    description:
      "Privacy-focused Instagram follower analysis. All processing done locally in your browser.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-[#09090b]">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#09090b] text-white`}
      >
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
