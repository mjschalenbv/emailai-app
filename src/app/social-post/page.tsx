"use client";
import React, { useState, useEffect } from "react";

// --- TRANSLATIONS ---
type Translations = {
  name: string;
  heroTitle: string;
  heroSubtitle: string;
  typeLabel: string;
  typeOptions: string[];
  ticker: string;
  ca: string;
  whybuy: string;
  memeGoal: string;
  memeGoalOptions: string[];
  tone: string;
  toneOptions: string[];
  length: string;
  lengthOptions: string[];
  hashtags: string;
  hashtagsOptions: string[];
  customHashtags: string;
  description: string;
  descriptionPlaceholder: string;
  generate: string;
  loading: string;
  copy: string;
  copySuccess: string;
  normalGoal: string;
  normalGoalOptions: string[];
  postContent: string;
  postContentPlaceholder: string;
  custom: string;
};

type LanguageKey = "en" | "fr";

const translations: Record<LanguageKey, Translations> = {
  en: {
    name: "English",
    heroTitle: "Meme Coin Tweet Generator",
    heroSubtitle: "Generate viral meme coin tweets or X posts in seconds.",
    typeLabel: "What do you want to generate?",
    typeOptions: [
      "Meme coin tweet",
      "Normal X post",
    ],
    ticker: "Coin Ticker",
    ca: "Contract Address",
    whybuy: "Why should people buy this coin?",
    memeGoal: "What is the main goal of your tweet?",
    memeGoalOptions: [
      "Launch/Pump",
      "Community Hype",
      "Alpha Leak",
      "Meme/Joke",
      "Airdrop/Giveaway",
      "Shill",
      "Custom"
    ],
    tone: "Tone of Voice",
    toneOptions: [
      "Degen",
      "Meme",
      "Hyped",
      "Witty",
      "Informative",
      "Chill",
      "Friendly"
    ],
    length: "Tweet length",
    lengthOptions: [
      "Short (150-190 cl)",
      "Medium (240-275 cl)",
      "Long (300-350 cl)"
    ],
    hashtags: "Hashtags",
    hashtagsOptions: [
      "None",
      "Few (2-3)",
      "Many (4-6)",
      "Custom"
    ],
    customHashtags: "Custom hashtags (comma-separated)",
    description: "What's your message?",
    descriptionPlaceholder: "Drop your alpha, meme, or key message here.",
    generate: "Generate Tweet",
    loading: "Generating...",
    copy: "Copy",
    copySuccess: "Copied!",
    normalGoal: "Goal of your post",
    normalGoalOptions: [
      "Promote",
      "Announce event",
      "Share knowledge",
      "Share job",
      "Motivate/Inspire",
      "Explain a service",
      "Custom"
    ],
    postContent: "What is your post about?",
    postContentPlaceholder: "Describe your topic, message or details...",
    custom: "Custom"
  },

  fr: {
    name: "Français",
    heroTitle: "Générateur de Tweets Meme Coin",
    heroSubtitle: "Générez des tweets viraux ou posts X sur les meme coins en quelques secondes.",
    typeLabel: "Que voulez-vous générer ?",
    typeOptions: [
      "Tweet de meme coin",
      "Post X classique",
    ],
    ticker: "Ticker de la coin",
    ca: "Adresse du contrat",
    whybuy: "Pourquoi acheter cette coin ?",
    memeGoal: "Quel est le but principal de votre tweet ?",
    memeGoalOptions: [
      "Lancement/Pump",
      "Communauté/Hype",
      "Alpha Leak",
      "Mème/Blague",
      "Airdrop/Concours",
      "Shill",
      "Personnalisé"
    ],
    tone: "Ton",
    toneOptions: [
      "Degen",
      "Mème",
      "Hype",
      "Spirituel",
      "Informatif",
      "Chill",
      "Sympathique"
    ],
    length: "Longueur du tweet",
    lengthOptions: [
      "Court (150-190 cl)",
      "Moyen (240-275 cl)",
      "Long (300-350 cl)"
    ],
    hashtags: "Hashtags",
    hashtagsOptions: [
      "Aucun",
      "Peu (2-3)",
      "Beaucoup (4-6)",
      "Personnalisé"
    ],
    customHashtags: "Hashtags personnalisés (séparés par des virgules)",
    description: "Quel est votre message ?",
    descriptionPlaceholder: "Déposez votre alpha, mème ou message principal ici.",
    generate: "Générer le tweet",
    loading: "Génération...",
    copy: "Copier",
    copySuccess: "Copié !",
    normalGoal: "But de votre post",
    normalGoalOptions: [
      "Promouvoir",
      "Annoncer un événement",
      "Partager des connaissances",
      "Partager une offre d’emploi",
      "Motiver/Inspirer",
      "Expliquer un service",
      "Personnalisé"
    ],
    postContent: "Quel est le sujet de votre post ?",
    postContentPlaceholder: "Décrivez le sujet, le message ou les détails...",
    custom: "Personnalisé"
  }
};


export default function MemeCoinTweetGenerator() {
  // State
  const [language, setLanguage] = useState<LanguageKey>("en");
  const t = translations[language];
  const [type, setType] = useState<string>(t.typeOptions[0]);
  // Meme coin states
  const [ticker, setTicker] = useState<string>("");
  const [ca, setCa] = useState<string>("");
  const [whybuy, setWhybuy] = useState<string>("");
  const [memeGoal, setMemeGoal] = useState<string>(t.memeGoalOptions[0]);
  const [customMemeGoal, setCustomMemeGoal] = useState<string>("");
  // Shared states
  const [tone, setTone] = useState<string>(t.toneOptions[0]);
  const [length, setLength] = useState<string>(t.lengthOptions[0]);
  const [hashtags, setHashtags] = useState<string>(t.hashtagsOptions[0]);
  const [customHashtags, setCustomHashtags] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  // Normal post states
  const [normalGoal, setNormalGoal] = useState<string>(t.normalGoalOptions[0]);
  const [customNormalGoal, setCustomNormalGoal] = useState<string>("");
  // Result
  const [generated, setGenerated] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Language switch update
  useEffect(() => {
    setType(translations[language].typeOptions[0]);
    setMemeGoal(translations[language].memeGoalOptions[0]);
    setNormalGoal(translations[language].normalGoalOptions[0]);
    setTone(translations[language].toneOptions[0]);
    setLength(translations[language].lengthOptions[0]);
    setHashtags(translations[language].hashtagsOptions[0]);
  }, [language]);

  // Generate Handler
  async function generateTweet(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setGenerated("");
    // Format hashtags
    let hashtagsText = "";
    if (hashtags === t.hashtagsOptions[1]) hashtagsText = "#memecoin";
    if (hashtags === t.hashtagsOptions[2]) hashtagsText = "#memecoin #crypto #x #airdrop #degen";
    if (hashtags === t.hashtagsOptions[3]) {
      hashtagsText = customHashtags
        .split(",")
        .map((h) => (h.trim().startsWith("#") ? h.trim() : "#" + h.trim()))
        .join(" ");
    }
    // Build prompt payload
    let payload: Record<string, unknown> = {
      language,
      type,
      tone,
      length,
      hashtags: hashtagsText,
      desc,
    };
    if (type === t.typeOptions[0]) {
      payload = {
        ...payload,
        ticker,
        ca,
        whybuy,
        memeGoal: memeGoal === t.custom ? customMemeGoal : memeGoal,
      };
    } else {
      payload = {
        ...payload,
        normalGoal: normalGoal === t.custom ? customNormalGoal : normalGoal,
      };
    }
    try {
      const res = await fetch("/api/genereer/memecoin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      setGenerated(data.post || "No tweet generated.");
    } catch {
      setGenerated("Technical error.");
    }
    setLoading(false);
  }

  // Copy handler
  function copyText() {
    if (!generated) return;
    navigator.clipboard.writeText(generated);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-black via-zinc-900 to-indigo-950 py-8 px-2">
      <div className="w-full max-w-2xl rounded-3xl shadow-2xl bg-gradient-to-br from-zinc-900 to-black border border-indigo-700 p-4 md:p-10 relative">
        {/* Language selector */}
        <div className="flex justify-end mb-6">
          <select
            className="bg-zinc-800 text-white rounded-md px-4 py-2 border border-indigo-600 focus:ring-2 focus:ring-indigo-500"
            value={language}
            onChange={e => setLanguage(e.target.value as LanguageKey)}
          >
            {Object.entries(translations).map(([k, v]) =>
              <option key={k} value={k}>{v.name}</option>
            )}
          </select>
        </div>
        {/* Hero */}
        <h1 className="text-3xl md:text-4xl font-black text-indigo-300 mb-1 tracking-tight text-center drop-shadow-[0_2px_10px_rgba(99,102,241,0.7)]">
          {t.heroTitle}
        </h1>
        <p className="text-zinc-400 text-center mb-7">{t.heroSubtitle}</p>
        {/* Form */}
        <form
          className="grid grid-cols-1 gap-6"
          onSubmit={generateTweet}
        >
          {/* Kies type */}
          <div>
            <label className="block text-indigo-200 font-semibold mb-2">{t.typeLabel}</label>
            <div className="flex gap-3">
              {t.typeOptions.map((opt: string) => (
                <button
                  type="button"
                  key={opt}
                  className={`flex-1 px-4 py-2 rounded-full font-bold border
                  ${type === opt ? "bg-indigo-700 text-white border-indigo-400 shadow-md" : "bg-zinc-800 text-indigo-200 border-zinc-700"}
                  transition-colors`}
                  onClick={() => setType(opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Meme coin fields */}
          {type === t.typeOptions[0] && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Coin Ticker */}
              <div>
                <label className="text-indigo-200 font-semibold mb-1 block">{t.ticker}</label>
                <input
                  className="w-full bg-zinc-800 rounded-md border border-indigo-600 p-3 text-indigo-100 placeholder-zinc-500 focus:ring-2 focus:ring-indigo-400"
                  placeholder="$TOKEN"
                  value={ticker}
                  onChange={e => setTicker(e.target.value)}
                  required
                />
              </div>
              {/* Contract Address */}
              <div>
                <label className="text-indigo-200 font-semibold mb-1 block">{t.ca}</label>
                <input
                  className="w-full bg-zinc-800 rounded-md border border-indigo-600 p-3 text-indigo-100 placeholder-zinc-500 focus:ring-2 focus:ring-indigo-400"
                  placeholder="0x000..."
                  value={ca}
                  onChange={e => setCa(e.target.value)}
                  required
                />
              </div>
              {/* Why buy */}
              <div className="md:col-span-2">
                <label className="text-indigo-200 font-semibold mb-1 block">{t.whybuy}</label>
                <textarea
                  className="w-full bg-zinc-800 rounded-md border border-indigo-600 p-3 text-indigo-100 placeholder-zinc-500 focus:ring-2 focus:ring-indigo-400"
                  placeholder="No taxes, LP locked, 100x potential, trending, strong community, etc."
                  rows={2}
                  value={whybuy}
                  onChange={e => setWhybuy(e.target.value)}
                  required
                />
              </div>
              {/* Main goal, tone, length */}
              <div>
                <label className="text-indigo-200 font-semibold mb-1 block">{t.memeGoal}</label>
                <select
                  className="w-full bg-zinc-800 rounded-md border border-indigo-600 px-4 py-2 text-indigo-100 focus:ring-2 focus:ring-indigo-400"
                  value={memeGoal}
                  onChange={e => setMemeGoal(e.target.value)}
                >
                  {t.memeGoalOptions.map((opt: string) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
                {memeGoal === t.custom && (
                  <input
                    type="text"
                    className="mt-2 w-full bg-zinc-800 rounded-md border border-indigo-600 px-4 py-2 text-indigo-100 placeholder-zinc-500 focus:ring-2 focus:ring-indigo-400"
                    placeholder={t.memeGoal}
                    value={customMemeGoal}
                    onChange={e => setCustomMemeGoal(e.target.value)}
                  />
                )}
              </div>
              <div>
                <label className="text-indigo-200 font-semibold mb-1 block">{t.tone}</label>
                <select
                  className="w-full bg-zinc-800 rounded-md border border-indigo-600 px-4 py-2 text-indigo-100 focus:ring-2 focus:ring-indigo-400"
                  value={tone}
                  onChange={e => setTone(e.target.value)}
                >
                  {t.toneOptions.map((opt: string) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-indigo-200 font-semibold mb-1 block">{t.length}</label>
                <select
                  className="w-full bg-zinc-800 rounded-md border border-indigo-600 px-4 py-2 text-indigo-100 focus:ring-2 focus:ring-indigo-400"
                  value={length}
                  onChange={e => setLength(e.target.value)}
                >
                  {t.lengthOptions.map((opt: string) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
              {/* Hashtags + description */}
              <div>
                <label className="text-indigo-200 font-semibold mb-1 block">{t.hashtags}</label>
                <select
                  className="w-full bg-zinc-800 rounded-md border border-indigo-600 px-4 py-2 text-indigo-100 focus:ring-2 focus:ring-indigo-400"
                  value={hashtags}
                  onChange={e => setHashtags(e.target.value)}
                >
                  {t.hashtagsOptions.map((opt: string) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
                {hashtags === t.hashtagsOptions[3] && (
                  <input
                    className="mt-2 w-full bg-zinc-800 rounded-md border border-indigo-600 px-4 py-2 text-indigo-100 placeholder-zinc-500 focus:ring-2 focus:ring-indigo-400"
                    placeholder={t.customHashtags}
                    value={customHashtags}
                    onChange={e => setCustomHashtags(e.target.value)}
                  />
                )}
              </div>
              <div className="md:col-span-2">
                <label className="text-indigo-200 font-semibold mb-1 block">{t.description}</label>
                <textarea
                  className="w-full bg-zinc-800 rounded-md border border-indigo-600 p-3 text-indigo-100 placeholder-zinc-500 focus:ring-2 focus:ring-indigo-400"
                  placeholder={t.descriptionPlaceholder}
                  rows={3}
                  value={desc}
                  onChange={e => setDesc(e.target.value)}
                  required
                />
              </div>
            </div>
          )}

          {/* Normal X post fields */}
          {type === t.typeOptions[1] && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-indigo-200 font-semibold mb-1 block">{t.normalGoal}</label>
                <select
                  className="w-full bg-zinc-800 rounded-md border border-indigo-600 px-4 py-2 text-indigo-100 focus:ring-2 focus:ring-indigo-400"
                  value={normalGoal}
                  onChange={e => setNormalGoal(e.target.value)}
                >
                  {t.normalGoalOptions.map((opt: string) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
                {normalGoal === t.custom && (
                  <input
                    type="text"
                    className="mt-2 w-full bg-zinc-800 rounded-md border border-indigo-600 px-4 py-2 text-indigo-100 placeholder-zinc-500 focus:ring-2 focus:ring-indigo-400"
                    placeholder={t.normalGoal}
                    value={customNormalGoal}
                    onChange={e => setCustomNormalGoal(e.target.value)}
                  />
                )}
              </div>
              <div>
                <label className="text-indigo-200 font-semibold mb-1 block">{t.tone}</label>
                <select
                  className="w-full bg-zinc-800 rounded-md border border-indigo-600 px-4 py-2 text-indigo-100 focus:ring-2 focus:ring-indigo-400"
                  value={tone}
                  onChange={e => setTone(e.target.value)}
                >
                  {t.toneOptions.map((opt: string) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-indigo-200 font-semibold mb-1 block">{t.length}</label>
                <select
                  className="w-full bg-zinc-800 rounded-md border border-indigo-600 px-4 py-2 text-indigo-100 focus:ring-2 focus:ring-indigo-400"
                  value={length}
                  onChange={e => setLength(e.target.value)}
                >
                  {t.lengthOptions.map((opt: string) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-indigo-200 font-semibold mb-1 block">{t.hashtags}</label>
                <select
                  className="w-full bg-zinc-800 rounded-md border border-indigo-600 px-4 py-2 text-indigo-100 focus:ring-2 focus:ring-indigo-400"
                  value={hashtags}
                  onChange={e => setHashtags(e.target.value)}
                >
                  {t.hashtagsOptions.map((opt: string) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
                {hashtags === t.hashtagsOptions[3] && (
                  <input
                    className="mt-2 w-full bg-zinc-800 rounded-md border border-indigo-600 px-4 py-2 text-indigo-100 placeholder-zinc-500 focus:ring-2 focus:ring-indigo-400"
                    placeholder={t.customHashtags}
                    value={customHashtags}
                    onChange={e => setCustomHashtags(e.target.value)}
                  />
                )}
              </div>
              <div className="md:col-span-2">
                <label className="text-indigo-200 font-semibold mb-1 block">{t.postContent}</label>
                <textarea
                  className="w-full bg-zinc-800 rounded-md border border-indigo-600 p-3 text-indigo-100 placeholder-zinc-500 focus:ring-2 focus:ring-indigo-400"
                  placeholder={t.postContentPlaceholder}
                  rows={3}
                  value={desc}
                  onChange={e => setDesc(e.target.value)}
                  required
                />
              </div>
            </div>
          )}

          {/* Submit button */}
          <button
            type="submit"
            className={`mt-4 w-full py-3 rounded-xl text-xl font-bold shadow-xl transition-all
            ${loading
                ? "bg-indigo-800 text-indigo-300 cursor-wait"
                : "bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-indigo-700 text-white hover:scale-[1.03]"
              }`}
            disabled={loading}
          >
            {loading ? t.loading : t.generate}
          </button>
        </form>
        {/* Result */}
        {generated && (
          <div className="mt-10 p-6 bg-zinc-950 rounded-2xl border border-indigo-700 shadow-xl">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-bold text-indigo-300">{t.generate}</h2>
              <button
                onClick={copyText}
                className={`px-4 py-2 rounded-lg font-semibold text-indigo-50 bg-indigo-700 hover:bg-indigo-800 transition-all ${copied && "ring-2 ring-indigo-400"}`}>
                {copied ? t.copySuccess : t.copy}
              </button>
            </div>
            <pre className="whitespace-pre-wrap text-indigo-100 text-base">{generated}</pre>
          </div>
        )}
      </div>
    </main>
  );
}
