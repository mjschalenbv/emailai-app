"use client";
import React, { useState } from "react";

// Types
type LanguageKey = "en" | "nl" | "de" | "es" | "uk" | "fr";
interface Translation {
  name: string;
  platform: string;
  goal: string;
  goalPlaceholder: string;
  tone: string;
  emotion: string;
  length: string;
  hashtags: string;
  callToAction: string;
  generatePost: string;
  noHashtags: string;
  viral: string;
  few: string;
  many: string;
  custom: string;
  platforms: Record<string, string>;
  tones: string[];
  emotions: string[];
  lengths: string[];
  copySuccess: string;
}


const translations: Record<LanguageKey, Translation> = {
  en: {
    name: "English",
    platform: "Platform",
    goal: "Goal of the post",
    goalPlaceholder: "Describe the purpose or topic...",
    tone: "Tone of Voice",
    emotion: "Emotion Level",
    length: "Length Preference",
    hashtags: "Hashtags",
    callToAction: "Call to Action (optional)",
    generatePost: "Generate Post",
    noHashtags: "No hashtags",
    viral: "Viral/Trending hashtags",
    few: "Few (3-5) hashtags",
    many: "Many (8-12) hashtags",
    custom: "Custom hashtags",
    platforms: {
      facebook: "Facebook",
      instagram: "Instagram",
      x: "X (Twitter)",
      linkedin: "LinkedIn",
      blog: "Blog Post",
    },
    tones: [
      "Formal",
      "Friendly",
      "Enthusiastic",
      "Inspirational",
      "Casual",
      "Professional",
      "Humorous",
    ],
    emotions: ["Low", "Medium", "High"],
    lengths: ["Short", "Medium", "Long"],
    copySuccess: "Copied to clipboard!",
  },
  nl: {
    name: "Nederlands",
    platform: "Platform",
    goal: "Doel van de post",
    goalPlaceholder: "Beschrijf het doel of onderwerp...",
    tone: "Toon",
    emotion: "Emotieniveau",
    length: "Lengte voorkeur",
    hashtags: "Hashtags",
    callToAction: "Call to Action (optioneel)",
    generatePost: "Genereer Post",
    noHashtags: "Geen hashtags",
    viral: "Virale/populaire hashtags",
    few: "Weinig (3-5) hashtags",
    many: "Veel (8-12) hashtags",
    custom: "Eigen hashtags",
    platforms: {
      facebook: "Facebook",
      instagram: "Instagram",
      x: "X (Twitter)",
      linkedin: "LinkedIn",
      blog: "Blog Post",
    },
    tones: [
      "Formeel",
      "Vriendelijk",
      "Enthousiast",
      "Inspirerend",
      "Casual",
      "Professioneel",
      "Humoristisch",
    ],
    emotions: ["Laag", "Midden", "Hoog"],
    lengths: ["Kort", "Midden", "Lang"],
    copySuccess: "Gekopieerd naar klembord!",
  },
  de: {
    name: "Deutsch",
    platform: "Plattform",
    goal: "Ziel des Beitrags",
    goalPlaceholder: "Beschreiben Sie Zweck oder Thema...",
    tone: "Tonfall",
    emotion: "Emotionsstufe",
    length: "Längenpräferenz",
    hashtags: "Hashtags",
    callToAction: "Handlungsaufforderung (optional)",
    generatePost: "Beitrag generieren",
    noHashtags: "Keine Hashtags",
    viral: "Virale/trendige Hashtags",
    few: "Wenige (3-5) Hashtags",
    many: "Viele (8-12) Hashtags",
    custom: "Eigene Hashtags",
    platforms: {
      facebook: "Facebook",
      instagram: "Instagram",
      x: "X (Twitter)",
      linkedin: "LinkedIn",
      blog: "Blogbeitrag",
    },
    tones: [
      "Formal",
      "Freundlich",
      "Begeistert",
      "Inspirierend",
      "Locker",
      "Professionell",
      "Humorvoll",
    ],
    emotions: ["Niedrig", "Mittel", "Hoch"],
    lengths: ["Kurz", "Mittel", "Lang"],
    copySuccess: "In die Zwischenablage kopiert!",
  },
  es: {
    name: "Español",
    platform: "Plataforma",
    goal: "Objetivo de la publicación",
    goalPlaceholder: "Describe el propósito o tema...",
    tone: "Tono de voz",
    emotion: "Nivel de emoción",
    length: "Preferencia de longitud",
    hashtags: "Hashtags",
    callToAction: "Llamado a la acción (opcional)",
    generatePost: "Generar publicación",
    noHashtags: "Sin hashtags",
    viral: "Hashtags virales/tendencia",
    few: "Pocos (3-5) hashtags",
    many: "Muchos (8-12) hashtags",
    custom: "Hashtags personalizados",
    platforms: {
      facebook: "Facebook",
      instagram: "Instagram",
      x: "X (Twitter)",
      linkedin: "LinkedIn",
      blog: "Publicación de blog",
    },
    tones: [
      "Formal",
      "Amigable",
      "Entusiasta",
      "Inspirador",
      "Casual",
      "Profesional",
      "Humorístico",
    ],
    emotions: ["Bajo", "Medio", "Alto"],
    lengths: ["Corto", "Medio", "Largo"],
    copySuccess: "¡Copiado al portapapeles!",
  },
  uk: {
    name: "Українська",
    platform: "Платформа",
    goal: "Мета допису",
    goalPlaceholder: "Опишіть мету або тему...",
    tone: "Тон голосу",
    emotion: "Рівень емоційності",
    length: "Бажана довжина",
    hashtags: "Хештеги",
    callToAction: "Заклик до дії (за бажанням)",
    generatePost: "Згенерувати допис",
    noHashtags: "Без хештегів",
    viral: "Популярні хештеги",
    few: "Мало (3-5) хештегів",
    many: "Багато (8-12) хештегів",
    custom: "Власні хештеги",
    platforms: {
      facebook: "Facebook",
      instagram: "Instagram",
      x: "X (Twitter)",
      linkedin: "LinkedIn",
      blog: "Публікація в блозі",
    },
    tones: [
      "Формальний",
      "Дружній",
      "Ентузіазм",
      "Натхненний",
      "Неофіційний",
      "Професійний",
      "Гумористичний",
    ],
    emotions: ["Низький", "Середній", "Високий"],
    lengths: ["Короткий", "Середній", "Довгий"],
    copySuccess: "Скопійовано в буфер обміну!",
  },
  fr: {
    name: "Français",
    platform: "Plateforme",
    goal: "Objectif du post",
    goalPlaceholder: "Décrivez le but ou le sujet...",
    tone: "Ton de voix",
    emotion: "Niveau d'émotion",
    length: "Préférence de longueur",
    hashtags: "Hashtags",
    callToAction: "Appel à l'action (optionnel)",
    generatePost: "Générer le post",
    noHashtags: "Pas de hashtags",
    viral: "Hashtags viraux/tendance",
    few: "Peu (3-5) hashtags",
    many: "Beaucoup (8-12) hashtags",
    custom: "Hashtags personnalisés",
    platforms: {
      facebook: "Facebook",
      instagram: "Instagram",
      x: "X (Twitter)",
      linkedin: "LinkedIn",
      blog: "Article de blog",
    },
    tones: [
      "Formel",
      "Amical",
      "Enthousiaste",
      "Inspirant",
      "Décontracté",
      "Professionnel",
      "Humoristique",
    ],
    emotions: ["Faible", "Moyen", "Élevé"],
    lengths: ["Court", "Moyen", "Long"],
    copySuccess: "Copié dans le presse-papiers!",
  },
};

// CTA en GOAL opties per taal
const CTA_OPTIONS: Record<LanguageKey, string[]> = {
  en: [
    "Visit website",
    "Contact us",
    "Like & Share",
    "Follow for more",
    "Download now",
    "Register/Sign up",
    "Learn more",
    "Custom"
  ],
  nl: [
    "Bezoek website",
    "Neem contact op",
    "Like & Deel",
    "Volg voor meer",
    "Download nu",
    "Aanmelden/Inschrijven",
    "Lees meer",
    "Zelf invullen"
  ],
  de: [
    "Website besuchen",
    "Kontakt aufnehmen",
    "Gefällt mir & Teilen",
    "Folgen für mehr",
    "Jetzt herunterladen",
    "Registrieren/Anmelden",
    "Mehr erfahren",
    "Eigene Aktion"
  ],
  es: [
    "Visitar sitio web",
    "Contactar",
    "Me gusta & Compartir",
    "Sigue para más",
    "Descargar ahora",
    "Regístrate/Inscríbete",
    "Más información",
    "Personalizar"
  ],
  uk: [
    "Відвідати сайт",
    "Зв'язатися з нами",
    "Лайкнути та поділитися",
    "Стежити за оновленнями",
    "Завантажити зараз",
    "Зареєструватися",
    "Дізнатися більше",
    "Власний варіант"
  ],
  fr: [
    "Visiter le site web",
    "Contactez-nous",
    "Aimer & Partager",
    "Suivre pour plus",
    "Télécharger maintenant",
    "S'inscrire",
    "En savoir plus",
    "Personnaliser"
  ]
};

// Doel-opties per taal
const GOAL_OPTIONS: Record<LanguageKey, string[]> = {
  en: [
    "Promote product",
    "Announce event",
    "Share knowledge",
    "Recruitment/Vacancy",
    "Motivate/Inspire",
    "Explain a service",
    "Custom"
  ],
  nl: [
    "Product promoten",
    "Evenement aankondigen",
    "Kennis delen",
    "Vacature delen",
    "Inspireren/Motiveren",
    "Dienst uitleggen",
    "Zelf invullen"
  ],
  de: [
    "Produkt bewerben",
    "Veranstaltung ankündigen",
    "Wissen teilen",
    "Stellenangebot",
    "Motivieren/Inspirieren",
    "Dienstleistung erklären",
    "Eigene Eingabe"
  ],
  es: [
    "Promocionar producto",
    "Anunciar evento",
    "Compartir conocimiento",
    "Ofrecer vacante",
    "Motivar/Inspirar",
    "Explicar servicio",
    "Personalizar"
  ],
  uk: [
    "Просування продукту",
    "Анонс події",
    "Поділитися знаннями",
    "Вакансія/Рекрутинг",
    "Мотивувати/Надихати",
    "Пояснити послугу",
    "Власний варіант"
  ],
  fr: [
    "Promouvoir un produit",
    "Annoncer un événement",
    "Partager des connaissances",
    "Publier une offre d'emploi",
    "Motiver/Inspirer",
    "Expliquer un service",
    "Personnaliser"
  ]
};

// --- je translations object gewoon overnemen zoals jij had (niet opnieuw geplakt voor de lengte) ---

// Plaats je translations object hier zoals je nu hebt!

// const translations: Record<LanguageKey, Translation> = { ... };

// Geen HASHTAG_OPTIONS meer declareren als type, gewoon direct string!
export default function SocialPostPage() {
  // State
  const [language, setLanguage] = useState<LanguageKey>("en");
  const [platform, setPlatform] = useState<string>("facebook");
  const [goal, setGoal] = useState<string>(GOAL_OPTIONS["en"][0]);
  const [customGoal, setCustomGoal] = useState<string>("");
  const [tone, setTone] = useState<string>(translations["en"].tones[0]);
  const [emotion, setEmotion] = useState<string>(translations["en"].emotions[1]);
  const [length, setLength] = useState<string>(translations["en"].lengths[1]);
  const [hashtagOption, setHashtagOption] = useState<string>("noHashtags");
  const [customHashtags, setCustomHashtags] = useState<string>("");
  const [postContent, setPostContent] = useState<string>("");
  const [callToAction, setCallToAction] = useState<string>(CTA_OPTIONS["en"][0]);
  const [customCTA, setCustomCTA] = useState<string>("");
  const [generatedPost, setGeneratedPost] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // Voor dynamisch vertalen
  const t = translations[language];

  // Update velden bij taal-wissel
  React.useEffect(() => {
    setGoal(GOAL_OPTIONS[language][0]);
    setCallToAction(CTA_OPTIONS[language][0]);
    setTone(translations[language].tones[0]);
    setEmotion(translations[language].emotions[1]);
    setLength(translations[language].lengths[1]);
  }, [language]);

  async function generatePost() {
    setLoading(true);
    setGeneratedPost("");

    // Zet hashtags als tekst, precies zoals backend verwacht
    let hashtagsText = "";
    switch (hashtagOption) {
      case "viral":
        hashtagsText = "#viral #trending #AI #emailai";
        break;
      case "few":
        hashtagsText = "#social #email #ai";
        break;
      case "many":
        hashtagsText = "#socialmedia #content #marketing #emailai #viral #ai #trending #digital";
        break;
      case "custom":
        hashtagsText = customHashtags
          .split(",")
          .map((h) => (h.trim().startsWith("#") ? h.trim() : "#" + h.trim()))
          .join(" ");
        break;
      default:
        hashtagsText = "";
    }

    // Logica voor custom fields
    const goalText = [
      "Custom", "Zelf invullen", "Eigene Eingabe", "Personalizar", "Власний варіант", "Personnaliser"
    ].includes(goal)
      ? customGoal
      : goal;

    const ctaText = [
      "Custom", "Zelf invullen", "Eigene Aktion", "Personalizar", "Власний варіант", "Personnaliser"
    ].includes(callToAction)
      ? customCTA
      : callToAction;

    try {
      const response = await fetch("/api/genereer/social", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language,
          platform,
          hashtagOption,
          customHashtags: hashtagsText,
          goal: goalText,
          customGoal,
          tone,
          emotion,
          length,
          callToAction,
          customCTA: ctaText,
          postContent,
        }),
      });
      const data = await response.json();
      if (data.error) {
        setGeneratedPost("Er ging iets mis: " + data.error);
      } else {
        setGeneratedPost(data.post || "");
      }
    } catch {
      setGeneratedPost("Er is een technische fout opgetreden.");
    }
    setLoading(false);
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(generatedPost);
    alert(t.copySuccess);
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-6 flex flex-col items-center">
      <div className="bg-white rounded-xl shadow-lg max-w-3xl w-full p-8 md:p-12">
        {/* Language selector */}
        <div className="mb-8 flex justify-end">
          <select
            className="border border-indigo-300 rounded-md px-3 py-2 text-indigo-900 font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={language}
            onChange={(e) => setLanguage(e.target.value as LanguageKey)}
            aria-label="Select language"
          >
            {Object.keys(translations).map((key) => (
              <option key={key} value={key}>
                {(translations as Record<string, Translation>)[key].name}
              </option>
            ))}
          </select>
        </div>

        <h1 className="text-4xl font-extrabold mb-10 text-center text-indigo-900 drop-shadow-sm">
          Social Post Generator
        </h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            generatePost();
          }}
          className="space-y-8"
        >
          {/* Platform, hashtags, doel */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Platform */}
            <div>
              <label htmlFor="platform" className="block font-semibold mb-2 text-indigo-800">
                {t.platform}
              </label>
              <select
                id="platform"
                className="w-full rounded-md border border-indigo-300 px-4 py-2 text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
              >
                {Object.entries(t.platforms).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
            {/* Hashtags */}
            <div>
              <label htmlFor="hashtags" className="block font-semibold mb-2 text-indigo-800">
                {t.hashtags}
              </label>
              <select
                id="hashtags"
                className="w-full rounded-md border border-indigo-300 px-4 py-2 text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={hashtagOption}
                onChange={(e) => setHashtagOption(e.target.value)}
              >
                <option value="noHashtags">{t.noHashtags}</option>
                <option value="viral">{t.viral}</option>
                <option value="few">{t.few}</option>
                <option value="many">{t.many}</option>
                <option value="custom">{t.custom}</option>
              </select>
              {hashtagOption === "custom" && (
                <textarea
                  className="mt-2 w-full rounded-md border border-indigo-300 p-3 text-indigo-900 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  rows={2}
                  placeholder={t.custom}
                  value={customHashtags}
                  onChange={(e) => setCustomHashtags(e.target.value)}
                />
              )}
            </div>
            {/* Doel */}
            <div>
              <label htmlFor="goal" className="block font-semibold mb-2 text-indigo-800">
                {t.goal}
              </label>
              <select
                id="goal"
                className="w-full rounded-md border border-indigo-300 px-4 py-2 text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
              >
                {GOAL_OPTIONS[language].map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              {(goal === "Custom" || goal === "Zelf invullen" || goal === "Eigene Eingabe" || goal === "Personalizar" || goal === "Власний варіант" || goal === "Personnaliser") && (
                <input
                  type="text"
                  className="mt-2 w-full rounded-md border border-indigo-300 px-4 py-2 text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder={t.goalPlaceholder}
                  value={customGoal}
                  onChange={(e) => setCustomGoal(e.target.value)}
                />
              )}
            </div>
          </div>
          {/* Tweede regel: toon, emotie, lengte */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="tone" className="block font-semibold mb-2 text-indigo-800">
                {t.tone}
              </label>
              <select
                id="tone"
                className="w-full rounded-md border border-indigo-300 px-4 py-2 text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={tone}
                onChange={(e) => setTone(e.target.value)}
              >
                {t.tones.map((toneOption) => (
                  <option key={toneOption} value={toneOption}>
                    {toneOption}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="emotion" className="block font-semibold mb-2 text-indigo-800">
                {t.emotion}
              </label>
              <select
                id="emotion"
                className="w-full rounded-md border border-indigo-300 px-4 py-2 text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={emotion}
                onChange={(e) => setEmotion(e.target.value)}
              >
                {t.emotions.map((emotionOption) => (
                  <option key={emotionOption} value={emotionOption}>
                    {emotionOption}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="length" className="block font-semibold mb-2 text-indigo-800">
                {t.length}
              </label>
              <select
                id="length"
                className="w-full rounded-md border border-indigo-300 px-4 py-2 text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={length}
                onChange={(e) => setLength(e.target.value)}
              >
                {t.lengths.map((lengthOption) => (
                  <option key={lengthOption} value={lengthOption}>
                    {lengthOption}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* Derde regel: uitleg/content */}
          <div>
            <label htmlFor="postContent" className="block font-semibold mb-2 text-indigo-800">
              {language === "en" ? "What should the post be about?" : language === "nl" ? "Waar moet je post over gaan?" : t.goalPlaceholder}
            </label>
            <textarea
              id="postContent"
              placeholder={
                language === "en"
                  ? "Describe what the post should be about, the key message, or any details you want included."
                  : language === "nl"
                  ? "Omschrijf waar je post over moet gaan, of wat de belangrijkste boodschap is."
                  : t.goalPlaceholder
              }
              className="w-full rounded-md border border-indigo-300 p-3 text-indigo-900 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows={4}
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              required
            />
          </div>
          {/* Vierde regel: Call to Action */}
          <div>
            <label htmlFor="callToAction" className="block font-semibold mb-2 text-indigo-800">
              {t.callToAction}
            </label>
            <select
              id="callToAction"
              className="w-full rounded-md border border-indigo-300 px-4 py-2 text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={callToAction}
              onChange={(e) => setCallToAction(e.target.value)}
            >
              {CTA_OPTIONS[language].map((cta) => (
                <option key={cta} value={cta}>
                  {cta}
                </option>
              ))}
            </select>
            {(callToAction === "Custom" || callToAction === "Zelf invullen" || callToAction === "Eigene Aktion" || callToAction === "Personalizar" || callToAction === "Власний варіант" || callToAction === "Personnaliser") && (
              <input
                type="text"
                className="mt-2 w-full rounded-md border border-indigo-300 px-4 py-2 text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder={
                  language === "en"
                    ? "Custom call to action..."
                    : language === "nl"
                    ? "Eigen call to action..."
                    : t.callToAction
                }
                value={customCTA}
                onChange={(e) => setCustomCTA(e.target.value)}
              />
            )}
          </div>
          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className={`mt-6 w-full rounded-md bg-indigo-600 py-3 text-white font-semibold shadow-md transition-colors ${
              loading ? "cursor-not-allowed bg-indigo-400" : "hover:bg-indigo-700"
            }`}
          >
            {loading ? "Loading..." : t.generatePost}
          </button>
        </form>
        {generatedPost && (
          <section className="mt-10 bg-indigo-50 rounded-md p-6 text-indigo-900 whitespace-pre-wrap shadow-inner">
            <h2 className="text-xl font-semibold mb-4">{t.generatePost}</h2>
            <pre className="mb-4 break-words whitespace-pre-wrap">{generatedPost}</pre>
            <button
              onClick={copyToClipboard}
              className="rounded-md bg-indigo-600 px-5 py-2 text-white font-semibold hover:bg-indigo-700 transition-colors"
            >
              Copy
            </button>
          </section>
        )}
      </div>
    </main>
  );
}
