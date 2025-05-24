"use client";

import React, { useState } from "react";

// Types voor TypeScript
type NummerType = "bestelnummer" | "factuurnummer" | "klantnummer" | "";
type BedrijfType =
  | ""
  | "Detailhandel"
  | "Bouw"
  | "Zorg"
  | "Financieel"
  | "ICT"
  | "Horeca"
  | "Zakelijke dienstverlening"
  | "Onderwijs"
  | "Anders";

type EmailFormData = {
  // Voor e-mail/antwoord
  emailTekst: string;
  taal: string;
  naamAfzender: string;
  naamOntvanger: string;
  benadering: string;
  nummer: string;
  nummerType: NummerType;
  context: string;
  antwoordWens: string;
  // Voor nieuwsbrief
  bedrijfsnaamNieuwsbrief: string;
  bedrijfTypeNieuwsbrief: BedrijfType;
  websiteNieuwsbrief: string;
  onderwerpNieuwsbrief: string;
  doelgroepNieuwsbrief: string;
  stijlNieuwsbrief: string;
  puntenNieuwsbrief: string;
  lengteNieuwsbrief: string;
  ctaNieuwsbrief: string;
};

const nummerTypes: { value: NummerType; label: string }[] = [
  { value: "bestelnummer", label: "Bestelnummer" },
  { value: "factuurnummer", label: "Factuurnummer" },
  { value: "klantnummer", label: "Klantnummer" },
];

const bedrijfTypes: { value: BedrijfType; label: string }[] = [
  { value: "", label: "Kies soort bedrijf..." },
  { value: "Detailhandel", label: "Detailhandel / winkel" },
  { value: "Bouw", label: "Bouw / techniek" },
  { value: "Zorg", label: "Zorg / welzijn" },
  { value: "Financieel", label: "Financieel / administratie" },
  { value: "ICT", label: "ICT / software" },
  { value: "Horeca", label: "Horeca" },
  { value: "Zakelijke dienstverlening", label: "Zakelijke dienstverlening" },
  { value: "Onderwijs", label: "Onderwijs" },
  { value: "Anders", label: "Anders..." },
];

export default function EmailForm() {
  const [tab, setTab] = useState<"nieuw" | "antwoord" | "nieuwsbrief">("nieuw");

  const [formData, setFormData] = useState<EmailFormData>({
    emailTekst: "",
    taal: "Nederlands",
    naamAfzender: "",
    naamOntvanger: "",
    benadering: "Zakelijk",
    nummer: "",
    nummerType: "",
    context: "",
    antwoordWens: "",
    // nieuwsbrief
    bedrijfsnaamNieuwsbrief: "",
    bedrijfTypeNieuwsbrief: "",
    websiteNieuwsbrief: "",
    onderwerpNieuwsbrief: "",
    doelgroepNieuwsbrief: "",
    stijlNieuwsbrief: "",
    puntenNieuwsbrief: "",
    lengteNieuwsbrief: "",
    ctaNieuwsbrief: "",
  });

  const [gegenereerdeEmail, setGegenereerdeEmail] = useState<string>("");
  const [gegenereerdOnderwerp, setGegenereerdOnderwerp] = useState<string>("");
  const [copyFeedback, setCopyFeedback] = useState<{ type: "subject" | "body" | null }>({ type: null });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNummerTypeChange = (value: NummerType) => {
    setFormData((prev) => ({
      ...prev,
      nummerType: prev.nummerType === value ? "" : value,
    }));
  };

  const handleCopy = async (text: string, type: "subject" | "body") => {
    await navigator.clipboard.writeText(text);
    setCopyFeedback({ type });
    setTimeout(() => setCopyFeedback({ type: null }), 1200);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleGenereer = async () => {
    setGegenereerdeEmail("");
    setGegenereerdOnderwerp("");

    const isAntwoord = tab === "antwoord";
    const isNieuwsbrief = tab === "nieuwsbrief";
    const payload = isAntwoord
      ? {
          ...formData,
          isAntwoord: true,
          naamAfzender: formData.naamOntvanger,
          naamOntvanger: formData.naamAfzender,
        }
      : {
          ...formData,
          isAntwoord: false,
          isNieuwsbrief,
        };

    try {
      const response = await fetch("/api/genereer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Fout bij genereren van e-mail.");

      setGegenereerdeEmail(data.email || "");
      setGegenereerdOnderwerp(data.onderwerp || "");
    } catch {
      alert("Er ging iets mis met AI.");
    }
  };

  // Form velden per tab
  const renderFields = () => {
    if (tab === "nieuw") {
      // Nieuwe e-mail
      return (
        <>
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Taal</label>
              <select
                name="taal"
                value={formData.taal}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900"
              >
                <option>Nederlands</option>
                <option>Engels</option>
                <option>Duits</option>
                <option>Frans</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Benadering</label>
              <select
                name="benadering"
                value={formData.benadering}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900"
              >
                <option>Zakelijk</option>
                <option>Vriendelijk</option>
                <option>Informeel</option>
                <option>Streng</option>
              </select>
            </div>
          </section>
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Naam ontvanger</label>
              <input
                type="text"
                name="naamOntvanger"
                value={formData.naamOntvanger}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Naam afzender</label>
              <input
                type="text"
                name="naamAfzender"
                value={formData.naamAfzender}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900"
              />
            </div>
          </section>
          <section>
            <label className="block mb-2 text-sm font-medium text-gray-700">Nummer</label>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <input
                type="text"
                name="nummer"
                value={formData.nummer}
                onChange={handleChange}
                className="w-full sm:w-[200px] border border-gray-300 rounded-lg px-3 py-2 text-gray-900"
                placeholder="Optioneel"
              />
              <div className="flex gap-3">
                {nummerTypes.map((nt) => (
                  <div
                    key={nt.value}
                    className="flex items-center cursor-pointer select-none"
                    onClick={() => handleNummerTypeChange(nt.value)}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === " " || e.key === "Enter") handleNummerTypeChange(nt.value);
                    }}
                    role="checkbox"
                    aria-checked={formData.nummerType === nt.value}
                    aria-label={nt.label}
                  >
                    <span
                      className={`
                        w-6 h-6 mr-2 flex items-center justify-center border-2 rounded
                        ${formData.nummerType === nt.value ? "border-blue-600 bg-blue-600" : "border-gray-400 bg-white"}
                        transition-colors duration-200
                      `}
                    >
                      {formData.nummerType === nt.value && (
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="4" viewBox="0 0 24 24">
                          <polyline points="20 6 10 18 4 12" />
                        </svg>
                      )}
                    </span>
                    <span className="text-gray-900 text-sm font-medium">{nt.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <section>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Waar gaat de e-mail over?
            </label>
            <textarea
              name="context"
              value={formData.context}
              onChange={handleChange}
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900"
              placeholder="Beschrijf hier duidelijk het onderwerp of de inhoud van je e-mail."
            />
          </section>
        </>
      );
    }
    if (tab === "antwoord") {
      return (
        <>
          <section>
            <label className="block mb-2 text-base font-semibold text-gray-700">
              Plak hier de e-mail waarop je wilt antwoorden
            </label>
            <textarea
              name="emailTekst"
              value={formData.emailTekst}
              onChange={handleChange}
              rows={8}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 text-base focus:outline-none focus:ring-2 focus:ring-blue-200 shadow-sm"
              required
            />
          </section>
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Taal</label>
              <select
                name="taal"
                value={formData.taal}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900"
              >
                <option value="Nederlands">Nederlands</option>
                <option value="Engels">Engels</option>
                <option value="Duits">Duits</option>
                <option value="Frans">Frans</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Benadering</label>
              <select
                name="benadering"
                value={formData.benadering}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900"
              >
                <option>Zakelijk</option>
                <option>Vriendelijk</option>
                <option>Informeel</option>
                <option>Streng</option>
              </select>
            </div>
          </section>
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Naam ontvanger</label>
              <input
                type="text"
                name="naamOntvanger"
                value={formData.naamOntvanger}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Naam afzender</label>
              <input
                type="text"
                name="naamAfzender"
                value={formData.naamAfzender}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900"
              />
            </div>
          </section>
          <section>
            <label className="block mb-2 text-sm font-medium text-gray-700">Nummer</label>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <input
                type="text"
                name="nummer"
                value={formData.nummer}
                onChange={handleChange}
                className="w-full sm:w-[200px] border border-gray-300 rounded-lg px-3 py-2 text-gray-900"
                placeholder="Optioneel"
              />
              <div className="flex gap-3">
                {nummerTypes.map((nt) => (
                  <div
                    key={nt.value}
                    className="flex items-center cursor-pointer select-none"
                    onClick={() => handleNummerTypeChange(nt.value)}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === " " || e.key === "Enter") handleNummerTypeChange(nt.value);
                    }}
                    role="checkbox"
                    aria-checked={formData.nummerType === nt.value}
                    aria-label={nt.label}
                  >
                    <span
                      className={`
                        w-6 h-6 mr-2 flex items-center justify-center border-2 rounded
                        ${formData.nummerType === nt.value ? "border-blue-600 bg-blue-600" : "border-gray-400 bg-white"}
                        transition-colors duration-200
                      `}
                    >
                      {formData.nummerType === nt.value && (
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="4" viewBox="0 0 24 24">
                          <polyline points="20 6 10 18 4 12" />
                        </svg>
                      )}
                    </span>
                    <span className="text-gray-900 text-sm font-medium">{nt.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <section>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Wat wil je antwoorden op deze e-mail?
            </label>
            <textarea
              name="antwoordWens"
              value={formData.antwoordWens}
              onChange={handleChange}
              rows={4}
              placeholder="Bijvoorbeeld: Vraag om statusupdate, bedank, stel een nieuwe vraag, etc."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900"
            />
          </section>
        </>
      );
    }
    if (tab === "nieuwsbrief") {
      // Nieuwsbrief tab
      return (
        <>
          <section>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Bedrijfsnaam of naam afzender
            </label>
            <input
              type="text"
              name="bedrijfsnaamNieuwsbrief"
              value={formData.bedrijfsnaamNieuwsbrief}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900"
              placeholder="Bijv: Jan Janssen / TechBouw BV"
            />
          </section>
          <section>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Wat voor soort bedrijf heb je?
            </label>
            <select
              name="bedrijfTypeNieuwsbrief"
              value={formData.bedrijfTypeNieuwsbrief}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900"
            >
              {bedrijfTypes.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </section>
          <section>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Website van je bedrijf (optioneel)
            </label>
            <input
              type="text"
              name="websiteNieuwsbrief"
              value={formData.websiteNieuwsbrief}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900"
              placeholder="https://www.jouwbedrijf.nl"
            />
          </section>
          <section>
            <label className="block mb-2 text-sm font-medium text-gray-700">Onderwerp nieuwsbrief</label>
            <input
              type="text"
              name="onderwerpNieuwsbrief"
              value={formData.onderwerpNieuwsbrief || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900"
              placeholder="Bijvoorbeeld: Juni nieuwsbrief – Zomeractie!"
            />
          </section>
          {/* Doelgroep & Stijl naast elkaar */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Doelgroep</label>
              <select
                name="doelgroepNieuwsbrief"
                value={formData.doelgroepNieuwsbrief || ""}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900"
              >
                <option value="Klanten">Klanten</option>
                <option value="Leads">Leads</option>
                <option value="Collega's">Collega's</option>
                <option value="Partners">Partners</option>
                <option value="Anders">Anders...</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Stijl van de nieuwsbrief</label>
              <select
                name="stijlNieuwsbrief"
                value={formData.stijlNieuwsbrief || ""}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900"
              >
                <option value="Neutraal">Neutraal</option>
                <option value="Marketing">Marketing gericht (verkoop)</option>
                <option value="Informatief">Informatief</option>
              </select>
            </div>
          </section>
          <section>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Belangrijkste punten (waar gaat de nieuwsbrief over?)
            </label>
            <textarea
              name="puntenNieuwsbrief"
              value={formData.puntenNieuwsbrief || ""}
              onChange={handleChange}
              rows={4}
              placeholder="Beschrijf hier de onderwerpen of hoogtepunten die je wilt delen..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900"
            />
          </section>
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Lengte van de nieuwsbrief</label>
              <select
                name="lengteNieuwsbrief"
                value={formData.lengteNieuwsbrief || ""}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900"
              >
                <option value="Kort">Kort (1 alinea)</option>
                <option value="Gemiddeld">Gemiddeld (2-3 alinea’s)</option>
                <option value="Lang">Lang/Uitgebreid</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Call to action (optioneel)
              </label>
              <input
                type="text"
                name="ctaNieuwsbrief"
                value={formData.ctaNieuwsbrief || ""}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900"
                placeholder="Bijv: Bezoek onze website, Bestel nu"
              />
            </div>
          </section>
        </>
      );
    }
    return null;
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto my-12 bg-white rounded-2xl shadow-2xl px-8 py-10 space-y-10"
      style={{ fontFamily: "Inter, Arial, sans-serif" }}
    >
      {/* Tab Switch */}
      <div className="flex gap-4 mb-10 justify-center">
        <button
          type="button"
          onClick={() => setTab("nieuw")}
          className={`text-xl font-bold px-8 py-4 rounded-t-xl border-b-4 ${
            tab === "nieuw"
              ? "bg-blue-600 text-white border-blue-800 shadow-lg"
              : "bg-gray-100 text-gray-800 border-transparent hover:bg-blue-50"
          } transition-all duration-200`}
        >
          Genereer nieuwe e-mail
        </button>
        <button
          type="button"
          onClick={() => setTab("antwoord")}
          className={`text-xl font-bold px-8 py-4 rounded-t-xl border-b-4 ${
            tab === "antwoord"
              ? "bg-green-600 text-white border-green-800 shadow-lg"
              : "bg-gray-100 text-gray-800 border-transparent hover:bg-green-50"
          } transition-all duration-200`}
        >
          Genereer antwoord op e-mail
        </button>
        <button
          type="button"
          onClick={() => setTab("nieuwsbrief")}
          className={`text-xl font-bold px-8 py-4 rounded-t-xl border-b-4 ${
            tab === "nieuwsbrief"
              ? "bg-purple-600 text-white border-purple-800 shadow-lg"
              : "bg-gray-100 text-gray-800 border-transparent hover:bg-purple-50"
          } transition-all duration-200`}
        >
          Genereer nieuwsbrief
        </button>
      </div>

      {/* Form fields per tab */}
      {renderFields()}

      {/* Actieknop */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
        <button
          type="button"
          onClick={handleGenereer}
          className={`${
            tab === "nieuw"
              ? "bg-blue-600 hover:bg-blue-700"
              : tab === "antwoord"
              ? "bg-green-600 hover:bg-green-700"
              : "bg-purple-600 hover:bg-purple-700"
          } text-white font-semibold px-8 py-3 rounded-xl text-lg transition`}
        >
          {tab === "nieuw"
            ? "Genereer e-mail"
            : tab === "antwoord"
            ? "Genereer antwoord"
            : "Genereer nieuwsbrief"}
        </button>
      </div>

      {/* Output */}
      {gegenereerdeEmail && (
        <div className="mt-8 space-y-4">
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex items-center justify-between">
            <div>
              <label className="block mb-1 font-semibold text-gray-700">Onderwerp</label>
              <span className="block text-base text-gray-800 font-medium">{gegenereerdOnderwerp || "(geen onderwerp)"}</span>
            </div>
            <button
              type="button"
              onClick={() => handleCopy(gegenereerdOnderwerp, "subject")}
              className="ml-4 px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-xs font-semibold transition"
            >
              {copyFeedback.type === "subject" ? "Gekopieerd!" : "Kopieer"}
            </button>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <label className="font-semibold text-gray-700">E-mailtekst</label>
              <button
                type="button"
                onClick={() => handleCopy(gegenereerdeEmail, "body")}
                className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-xs font-semibold transition"
              >
                {copyFeedback.type === "body" ? "Gekopieerd!" : "Kopieer"}
              </button>
            </div>
            <textarea
              value={gegenereerdeEmail}
              readOnly
              rows={8}
              className="w-full border-none bg-gray-50 px-3 py-2 text-gray-800 resize-none"
            />
          </div>
        </div>
      )}
    </form>
  );
}
