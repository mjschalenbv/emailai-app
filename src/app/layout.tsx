import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from '@vercel/analytics/react';

// Fonts config
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadata for SEO, social sharing & favicon
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 min-h-screen flex flex-col`}>
        <main className="flex-grow flex flex-col">{children}</main>
        {/* Global footer */}
        <footer className="w-full flex justify-center py-6 bg-transparent text-gray-400 text-sm">
          <a
            href="/privacy"
            className="hover:underline"
            target="_self"
            rel="noopener noreferrer"
          >
            Privacy Policy
          </a>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
