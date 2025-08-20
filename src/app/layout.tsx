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
  title: "Instagram Follower Analyzer - Track Your Followers",
  description:
    "Analyze your Instagram followers and following. Discover who follows you back, find mutual connections, and get insights into your Instagram network.",
  keywords: ["instagram", "followers", "analyzer", "social media", "privacy", "follower tracker"],
  authors: [{ name: "Zooch" }],
  creator: "Zooch",
  publisher: "Zooch",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    title: "Instagram Follower Analyzer",
    description:
      "Privacy-focused Instagram follower analysis tool. All processing done locally in your browser.",
  },
  twitter: {
    card: "summary",
    title: "Instagram Follower Analyzer",
    description:
      "Privacy-focused Instagram follower analysis tool. All processing done locally in your browser.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
