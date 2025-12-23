// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import BackgroundShell from "@/components/site/BackgroundShell";
import Navbar from "@/components/navbar/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Quick Vibe",
  description: "Deploy-first learning",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <BackgroundShell>
          <Navbar active="home" />

          {/* content stage (keeps navbar + content aligned) */}
          <div
            style={{
              paddingTop: 96, // leave room for fixed navbar
              paddingLeft: 14,
              paddingRight: 14,
              paddingBottom: 48,
            }}
          >
            <div style={{ maxWidth: 1280, margin: "0 auto" }}>{children}</div>
          </div>
        </BackgroundShell>
      </body>
    </html>
  );
}
