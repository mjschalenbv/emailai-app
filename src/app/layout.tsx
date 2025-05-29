import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

// Fonts config
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EmailAI – Your AI Email Assistant",
  description: "Generate professional emails and replies instantly with AI. EmailAI helps you save time and write better emails in any style or language.",
  metadataBase: new URL("https://www.emailai.nl"),
  openGraph: {
    title: "EmailAI – Your AI Email Assistant",
    description: "Generate professional emails and replies instantly with AI. EmailAI helps you save time and write better emails in any style or language.",
    url: "https://www.emailai.nl",
    siteName: "EmailAI",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Example of a generated email with EmailAI",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EmailAI – Your AI Email Assistant",
    description: "Generate professional emails and replies instantly with AI. EmailAI helps you save time and write better emails in any style or language.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: ["/favicon.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`
          ${geistSans.variable} ${geistMono.variable} antialiased
          min-h-screen flex flex-col bg-[#181929]
        `}
        style={{
          backgroundAttachment: "fixed",
        }}
      >
        {/* HEADER - ONLY LOGO ICON + TEXT + CONTACT */}
        <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-white/10 border-b border-indigo-100/10 shadow-lg transition-all duration-300">
          <div className="max-w-7xl mx-auto flex items-center justify-between px-3 md:px-8 py-2 sm:py-3">
            <a href="/" className="flex items-center gap-2 sm:gap-3 group min-w-0">
              <img
                src="/logo-icon.png" // <-- Gebruik alleen het icoon (dus zonder "EmailAI" tekst eronder in het logo)
                alt="EmailAI Logo"
                className="h-8 sm:h-10 w-auto rounded-xl shadow-md border border-white/40 group-hover:scale-105 transition-transform duration-200"
                draggable={false}
              />
              <span className="text-lg sm:text-2xl font-black bg-gradient-to-r from-indigo-300 to-purple-400 bg-clip-text text-transparent tracking-tight group-hover:brightness-125 transition-colors select-none">
                EmailAI
              </span>
            </a>
            <nav className="flex items-center gap-3 md:gap-5">
              <a
                href="/contact"
                className="px-4 py-2 rounded-2xl bg-white/70 text-indigo-800 font-semibold border border-indigo-100/30 shadow hover:bg-indigo-50 hover:text-purple-700 transition-all text-base sm:text-lg tracking-tight"
              >
                Contact & Support
              </a>
            </nav>
          </div>
        </header>
        <main className="flex-1 w-full flex flex-col items-center justify-center relative z-10">
          {children}
        </main>
        <footer className="w-full mt-auto bg-transparent flex justify-center py-8 text-gray-400 text-xs font-medium tracking-tight">
          <a href="/privacy" className="hover:text-purple-400 underline underline-offset-4 transition-colors">Privacy Policy</a>
          <span className="mx-2">•</span>
          <span>© {new Date().getFullYear()} EmailAI</span>
        </footer>
        <Analytics />
        {/* Animatie keyframes */}
        <style>{`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(18px);}
            to { opacity: 1; transform: none;}
          }
          .animate-fade-in { animation: fade-in 1.1s cubic-bezier(.33,1.2,.33,1) 0.1s 1 both;}
          @keyframes pulse-slow { 0%, 100% { opacity: 0.7; } 50% { opacity: 1; } }
          .animate-pulse-slow { animation: pulse-slow 8s ease-in-out infinite alternate; }
          @keyframes pulse-slower { 0%, 100% { opacity: 0.45; } 50% { opacity: 0.9; } }
          .animate-pulse-slower { animation: pulse-slower 18s ease-in-out infinite alternate; }
        `}</style>
      </body>
    </html>
  );
}
