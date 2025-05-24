import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Fonts instellen
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadata voor SEO, socials & favicon
export const metadata: Metadata = {
  title: "EmailAI – Jouw AI e-mailassistent",
  description: "Snel e-mails of antwoorden genereren met AI!",
  metadataBase: new URL("https://www.emailai.nl"),
  openGraph: {
    title: "EmailAI – Jouw AI e-mailassistent",
    description: "Snel e-mails of antwoorden genereren met AI!",
    url: "https://www.emailai.nl",
    siteName: "EmailAI",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Voorbeeld van een gegenereerde e-mail met EmailAI",
      },
    ],
    locale: "nl_NL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EmailAI – Jouw AI e-mailassistent",
    description: "Snel e-mails of antwoorden genereren met AI!",
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
    <html lang="nl">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
