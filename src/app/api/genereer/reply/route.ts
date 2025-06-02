import { NextResponse } from "next/server";
import OpenAI from "openai";
import type { ChatCompletionMessageParam } from "openai/resources";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const languageInstructions: Record<string, string> = {
  Nederlands: "Schrijf alles in het Nederlands.",
  Engels: "Write everything in English.",
  Duits: "Schreibe alles auf Deutsch.",
  Frans: "Écris tout en français.",
  Spaans: "Escribe todo en español.",
  Oekraïens: "Напиши все українською.",
};

export async function POST(req: Request) {
  const data = await req.json();

  // Verplicht: taal, geplakte email (emailTekst) en antwoordwens (antwoordWens)
  if (!data.taal) return NextResponse.json({ error: "Taal ontbreekt" }, { status: 400 });
  if (!data.emailTekst) return NextResponse.json({ error: "Plak eerst de e-mail waarop je wilt antwoorden.", veld: "emailTekst" }, { status: 400 });
  if (!data.antwoordWens) return NextResponse.json({ error: "Vul in wat je wilt antwoorden op deze e-mail.", veld: "antwoordWens" }, { status: 400 });

  const {
    taal,
    naamAfzender,
    naamOntvanger,
    nummer,
    nummerType,
    antwoordLengte,   // "kort", "gemiddeld", "uitgebreid"
    benadering,        // "Zakelijk", "Vriendelijk", etc.
    emailTekst,        // Geplakte e-mail waarop geantwoord wordt
    antwoordWens       // Wat de gebruiker wil antwoorden
  } = data;

  const nummerContext =
    nummer && nummerType
      ? `Nummer informatie: ${nummerType === "anders" ? nummer : nummerType + ": " + nummer}.`
      : "";

  const taalPrompt = languageInstructions[taal] || languageInstructions["Nederlands"];

  const systemPrompt = `
${taalPrompt}
Je bent een professionele AI e-mailassistent gespecialiseerd in het genereren van perfecte, zakelijke, en contextueel relevante antwoorden op bestaande e-mails. Neem zorgvuldig alle hieronder genoemde instructies en details mee in je gegenereerde antwoord.

Inputanalyse (verplicht):
Analyseer grondig de geplakte e-mail waarop geantwoord moet worden. Gebruik deze e-mail als context om een logisch en passend antwoord te formuleren.

Afzender en ontvanger:
- Neem altijd duidelijk waarneembare afzender- en ontvanger-informatie uit de geplakte e-mail over.
- Als er handmatig een naam voor ontvanger en/of afzender is ingevuld, gebruik dan deze gegevens expliciet en negeer eventuele andere namen uit de originele e-mail.

${nummerContext ? nummerContext : ""}

Lengte van het antwoord: ${antwoordLengte || "gemiddeld"}
- Houd je strikt aan de gekozen lengte:
  - Kort (1-2 zinnen): zeer kort en bondig antwoord.
  - Gemiddeld (2-4 zinnen): helder en krachtig antwoord.
  - Uitgebreid: gedetailleerd en volledig antwoord.

Benadering/Tone-of-voice: ${benadering || "Zakelijk"}
- Pas de stijl exact aan op basis van de geselecteerde toon:
  - Zakelijk: professioneel en beleefd.
  - Vriendelijk: persoonlijk en sympathiek.
  - Informeel: casual en toegankelijk.
  - Streng: direct, duidelijk en assertief.

Inhoud van antwoord (verplicht):
- Baseer je antwoord expliciet en nauwkeurig op wat de gebruiker beschrijft bij: "Wat wil je antwoorden op deze email?".
- Zonder deze informatie mag geen antwoord gegenereerd worden.

Taal en kwaliteitseisen:
- Genereer altijd in een van de volgende talen, afhankelijk van wat geselecteerd is: Nederlands, Engels, Duits, Frans, Spaans of Oekraïens.
- Zorg voor foutloze grammatica, spelling en interpunctie in het antwoord.

Onderwerp genereren:
- Creëer altijd een kort, krachtig en relevant onderwerp passend bij de inhoud van het gegenereerde antwoord.

**Geplakte e-mail waarop geantwoord moet worden:**
"""
${emailTekst}
"""

**Antwoordwens van gebruiker (instructie):**
"""
${antwoordWens}
"""

Outputformaat (strikt vereist, geen andere tekst of uitleg geven):
{
  "onderwerp": "[Kort en relevant onderwerp]",
  "email": "[Tekst van het perfect gegenereerde antwoord]"
}
`.trim();

  const messages: ChatCompletionMessageParam[] = [
    { role: "system", content: systemPrompt }
  ];

const completion = await openai.chat.completions.create({
  model: "gpt-4o",
  messages,
  temperature: 0.27,
});

  const antwoord = completion.choices[0]?.message?.content?.trim();

  if (!antwoord) {
    return NextResponse.json({ error: "Geen antwoord van OpenAI" }, { status: 400 });
  }

  try {
    const firstCurly = antwoord.indexOf("{");
    const lastCurly = antwoord.lastIndexOf("}");
    if (firstCurly === -1 || lastCurly === -1) throw new Error("Geen JSON gevonden");
    const cleanAntwoord = antwoord.slice(firstCurly, lastCurly + 1);

    const aiJson = JSON.parse(cleanAntwoord);
    return NextResponse.json({
      onderwerp: aiJson.onderwerp || "",
      email: aiJson.email || "",
    });
  } catch {
    return NextResponse.json({
      error: "AI gaf geen geldige JSON (genereer antwoord)",
      debug_antwoord: antwoord,
    }, { status: 400 });
  }
}
