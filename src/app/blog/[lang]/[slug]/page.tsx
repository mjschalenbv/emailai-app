// src/app/blog/[lang]/[slug]/page.tsx

import { notFound } from "next/navigation";
import { Metadata } from "next";
import type { JSX } from "react";

type LanguageCode = "en" | "nl" | "fr" | "es" | "de" | "uk";
type Blog = {
  slug: string;
  title: Record<LanguageCode, string>;
  body: Record<LanguageCode, JSX.Element>;
};

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
    body: {
      en: <p>Test Engels</p>,
      nl: <p>Test NL</p>,
      fr: <p>Test FR</p>,
      es: <p>Test ES</p>,
      de: <p>Test DE</p>,
      uk: <p>Test UK</p>,
    },
  },
];

// GENEREER STATIC PARAMS
export async function generateStaticParams() {
  return BLOGS.flatMap(blog =>
    Object.keys(blog.title).map(lang => ({
      lang,
      slug: blog.slug,
    }))
  );
}

// METADATA
export async function generateMetadata(
  { params }: { params: { lang: string; slug: string } }
): Promise<Metadata> {
  const blog = BLOGS.find(b => b.slug === params.slug);
  const title = blog?.title[params.lang as LanguageCode] || blog?.title.en || "Blog";
  return { title, description: "Blog artikel" };
}

// PAGE COMPONENT -- DIT IS CRUCIAAL
export default function Page(
  { params }: { params: { lang: string; slug: string } }
) {
  const blog = BLOGS.find(b => b.slug === params.slug);
  if (!blog) return notFound();

  const body = blog.body[params.lang as LanguageCode] || blog.body.en;

  return (
    <main className="max-w-2xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">
        {blog.title[params.lang as LanguageCode] || blog.title.en}
      </h1>
      <article className="prose">{body}</article>
    </main>
  );
}
