"use client";

import { useState } from "react";

// --- Types
type LanguageCode = "en" | "nl" | "fr" | "es" | "de" | "uk";

interface Blog {
  slug: string;
  title: Record<LanguageCode, string>;
  excerpt: Record<LanguageCode, string>;
  date: string;
}

// --- Blog Data
const BLOGS: Blog[] = [
  {
    slug: "top-10-free-ai-tools",
    title: {
      en: "Top 10 Free AI Tools",
      nl: "Top 10 gratis AI-tools",
      fr: "Top 10 des outils IA gratuits",
      es: "Top 10 de herramientas de IA gratis",
      de: "Top 10 kostenlose KI-Tools",
      uk: "Топ-10 безкоштовних AI-інструментів",
    },
    excerpt: {
      en: "Discover the best free AI tools you can use today, from writing to design and productivity.",
      nl: "Ontdek de beste gratis AI-tools van dit moment, van schrijven tot design en productiviteit.",
      fr: "Découvrez les meilleurs outils IA gratuits du moment, pour écrire, créer et gagner du temps.",
      es: "Descubre las mejores herramientas de IA gratuitas para escribir, diseñar y más.",
      de: "Entdecke die besten kostenlosen KI-Tools für Text, Design und Produktivität.",
      uk: "Дізнайтеся про найкращі безкоштовні AI-інструменти для тексту, дизайну та продуктивності.",
    },
    date: "2025-06-03",
  },
  {
    slug: "how-to-write-a-good-email",
    title: {
      en: "How to Write a Good Email",
      nl: "Hoe schrijf je een goede e-mail",
      fr: "Comment écrire un bon email",
      es: "Cómo escribir un buen correo electrónico",
      de: "Wie man eine gute E-Mail schreibt",
      uk: "Як написати хороший лист",
    },
    excerpt: {
      en: "Tips and best practices for writing clear, professional emails.",
      nl: "Tips en beste praktijken voor het schrijven van duidelijke, professionele e-mails.",
      fr: "Conseils et meilleures pratiques pour rédiger des e-mails clairs et professionnels.",
      es: "Consejos y mejores prácticas para escribir correos electrónicos claros y profesionales.",
      de: "Tipps und Best Practices zum Verfassen klarer, professioneller E-Mails.",
      uk: "Поради та найкращі практики щодо написання чітких, професійних листів.",
    },
    date: "2024-06-03",
  },
];

// --- Talen
const LANGUAGES: { code: LanguageCode; label: string }[] = [
  { code: "en", label: "English" },
  { code: "nl", label: "Nederlands" },
  { code: "fr", label: "Français" },
  { code: "es", label: "Español" },
  { code: "de", label: "Deutsch" },
  { code: "uk", label: "Українська" },
];

export default function BlogOverview() {
  // Standaard taal (bijv. uit browser halen of cookies in de toekomst)
  const [lang, setLang] = useState<LanguageCode>("en");

  return (
    <main className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-[#181834] to-[#292968] py-8">
      <div className="w-full max-w-2xl px-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-4xl font-bold text-white">Blog</h1>
          {/* Taal wisselaar */}
          <select
            className="rounded-xl py-2 px-4 bg-[#ececff] text-[#292968] font-semibold shadow focus:outline-none"
            value={lang}
            onChange={e => setLang(e.target.value as LanguageCode)}
          >
            {LANGUAGES.map(l => (
              <option key={l.code} value={l.code}>
                {l.label}
              </option>
            ))}
          </select>
        </div>
        {/* Blog lijst */}
        <div className="grid gap-6">
          {BLOGS.map(blog => (
            <a
              key={blog.slug}
              href={`/blog/${lang}/${blog.slug}`}
              className="block bg-white/90 rounded-2xl shadow-xl p-6 hover:scale-[1.025] hover:shadow-2xl transition cursor-pointer border border-transparent hover:border-[#884fff]"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-[#292968]">
                  {/* Fallback naar Engels als vertaling mist */}
                  {blog.title[lang] || blog.title.en}
                </h2>
                <span className="text-xs text-gray-500">{blog.date}</span>
              </div>
              <p className="mt-2 text-[#555575]">
                {blog.excerpt[lang] || blog.excerpt.en}
              </p>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
