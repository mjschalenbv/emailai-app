"use client";

import React, { useState } from "react";

// Types voor TypeScript
type NummerType = "bestelnummer" | "factuurnummer" | "klantnummer" | "";

type EmailFormData = {
  emailTekst: string;
  taal: string;
  naamAfzender: string;
  naamOntvanger: string;
  benadering: string;
  nummer: string;
  nummerType: NummerType;
  context: string;
  antwoordWens: string;
};

const nummerTypes: { value: NummerType; label: string }[] = [
  { value: "bestelnummer", label: "Bestelnummer" },
  { value: "factuurnummer", label: "Factuurnummer" },
  { value: "klantnummer", label: "Klantnummer" },
];

export default function EmailForm() {
  const [tab, setTab] = useState<"nieuw" | "antwoord">("nieuw");
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
    } catch (error) {
      alert("Er ging iets mis met AI.");
    }
  };

// Form velden per tab
const renderFields = () => {
  if (tab === "nieuw") {
    // Nieuwe e-mail
    return (
      <>
        {/* Taal & Benadering naast elkaar */}
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

        {/* Naam ontvanger & Naam afzender naast elkaar */}
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

        {/* Nummer */}
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
        {/* Context */}
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
  } else {
    // Antwoord genereren
    return (
      <>
        {/* Plak hier e-mail */}
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
        {/* Taal & Benadering naast elkaar */}
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
        {/* Naam ontvanger & Naam afzender naast elkaar */}
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
        {/* Nummer */}
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
        {/* Antwoordwens */}
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
              : "bg-green-600 hover:bg-green-700"
          } text-white font-semibold px-8 py-3 rounded-xl text-lg transition`}
        >
          {tab === "nieuw" ? "Genereer e-mail" : "Genereer antwoord"}
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
