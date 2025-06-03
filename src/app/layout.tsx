import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import Link from "next/link";
import Image from "next/image";




// Font config
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
  description:
    "Generate professional emails, replies, newsletters, and social posts instantly with AI. EmailAI helps you save time and write better content in any style or language.",
  metadataBase: new URL("https://www.emailai.nl"),
  openGraph: {
    title: "EmailAI – Your AI Email Assistant",
    description:
      "Generate professional emails, replies, newsletters, and social posts instantly with AI. EmailAI helps you save time and write better content in any style or language.",
    url: "https://www.emailai.nl",
    siteName: "EmailAI",
    images: [
      {
        url: "https://www.emailai.nl/og-image.png",
        width: 1200,
        height: 630,
        alt: "EmailAI – Example of generated content",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EmailAI – Your AI Email Assistant",
    description:
      "Generate professional emails, replies, newsletters, and social posts instantly with AI. EmailAI helps you save time and write better content in any style or language.",
    images: ["https://www.emailai.nl/og-image.png"],
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
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body
        className="antialiased min-h-screen flex flex-col bg-[#181929]"
        style={{ backgroundAttachment: "fixed" }}
      >
        {/* HEADER */}
        <header className="sticky top-0 z-40 w-full backdrop-blur-2xl bg-white/10 border-b border-indigo-100/10 shadow-xl transition-all duration-300">
          <div className="max-w-5xl mx-auto flex items-center justify-between px-2 sm:px-8 py-2 sm:py-3">
            {/* Logo en naam */}
            <Link
              href="/"
              className="flex items-center gap-2 sm:gap-3 group min-w-0"
            >
              <Image
                src="/logo-icon.png"
                alt="EmailAI Logo"
                width={48}
                height={48}
                className="h-9 sm:h-12 w-auto rounded-2xl shadow-lg border border-white/40 group-hover:scale-105 transition-transform duration-200"
                draggable={false}
                priority
              />
              <span className="text-xl sm:text-3xl font-black bg-gradient-to-r from-indigo-300 to-purple-400 bg-clip-text text-transparent tracking-tight group-hover:brightness-125 transition-colors select-none">
                EmailAI
              </span>
            </Link>
            {/* NAVIGATION + TAAL */}
            <nav className="flex items-center gap-2 sm:gap-4 ml-auto">
              <Link
                href="/blog"
                className="px-4 py-2 rounded-2xl bg-white/80 text-indigo-800 font-semibold border border-indigo-100/30 shadow hover:bg-indigo-50 hover:text-purple-700 transition-all text-base sm:text-lg tracking-tight"
              >
                Blog
              </Link>
              <Link
                href="/contact"
                className="px-4 py-2 rounded-2xl bg-white/80 text-indigo-800 font-semibold border border-indigo-100/30 shadow hover:bg-indigo-50 hover:text-purple-700 transition-all text-base sm:text-lg tracking-tight"
              >
                Contact & Support
              </Link>
          


            </nav>
          </div>
        </header>

        {/* MAIN CONTENT */}
        <main className="flex-1 w-full flex flex-col items-center justify-center relative z-10">
          <div
            className="
              w-full
              max-w-4xl
              lg:max-w-5xl
              2xl:max-w-6xl
              mx-auto
              my-8 sm:my-16
              bg-gradient-to-br from-[#fafbff] via-[#f1f2fb] to-[#ede6fa] dark:from-[#232347] dark:via-[#21213b] dark:to-[#232347]
              rounded-3xl
              shadow-2xl
              border border-white/30
              px-4 sm:px-10 md:px-16 lg:px-24
              py-6 sm:py-12 lg:py-14
              space-y-7 sm:space-y-10
              backdrop-blur-2xl
              transition-all
              duration-300
            "
            style={{
              fontFamily: "Inter, Arial, sans-serif",
              boxShadow:
                "0 4px 64px 0 rgba(70,50,200,0.09), 0 1.5px 6px 0 rgba(70,50,200,0.03)",
            }}
          >
            {children}
          </div>
        </main>

        {/* FOOTER */}
        <footer className="w-full bg-transparent flex justify-center py-8 text-gray-400 text-xs font-medium tracking-tight">
          <div className="max-w-5xl w-full flex justify-center items-center">
            <Link
              href="/privacy"
              className="hover:text-purple-400 underline underline-offset-4 transition-colors"
            >
              Privacy Policy
            </Link>
            <span className="mx-2">•</span>
            <span>© {new Date().getFullYear()} EmailAI</span>
          </div>
        </footer>

        <Analytics />
        {/* Animation keyframes */}
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
