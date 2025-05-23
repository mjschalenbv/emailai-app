import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✨ Hier staat nu jouw professionele metadata
export const metadata: Metadata = {
  title: "EmailAI – Jouw AI e-mailassistent",
  description:
    "Genereer e-mails en antwoorden razendsnel met AI!",
  metadataBase: new URL("https://www.emailai.nl"),
  openGraph: {
    title: "EmailAI – Jouw AI e-mailassistent",
    description:
      "Snel e-mails of antwoorden genereren met AI!",
    url: "https://www.emailai.nl",
    siteName: "EmailAI",
    images: [
      {
        url: "/og-image.png", // Zet hier jouw eigen og-image neer in /public
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
    description:
      "Snel e-mails of antwoorden genereren met AI!",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
