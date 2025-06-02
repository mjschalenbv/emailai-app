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

  // Verplicht: taal & context/inhoud
  if (!data.taal) return NextResponse.json({ error: "Taal ontbreekt" }, { status: 400 });
  if (!data.context) return NextResponse.json({ error: "Waar gaat de e-mail over ontbreekt" }, { status: 400 });

  const {
    taal,
    naamAfzender,
    naamOntvanger,
    nummer,
    nummerType,
    context,           // Waar gaat de e-mail over
    doelEmail,         // Doel van de e-mail (afspraak, klacht, etc)
    benadering,        // Tone-of-voice
    emailLengte        // Lengte van de e-mail
  } = data;

  // Nummer-context netjes verwerken
  const nummerContext =
    nummer && nummerType
      ? `Nummer informatie: ${nummerType === "anders" ? nummer : nummerType + ": " + nummer}.`
      : "";

  // Taalprompt instellen
  const taalPrompt = languageInstructions[taal] || languageInstructions["Nederlands"];

  // Krachtige, volledige systemprompt
  const systemPrompt = `
${taalPrompt}

Je bent een professionele AI-e-mailschrijver, gespecialiseerd in het genereren van foutloze, zakelijke en heldere e-mails. Neem alle onderstaande gegevens mee en genereer altijd een passende e-mail op basis van deze instructies:

Doel van de e-mail: ${doelEmail || "Niet gespecificeerd"}
Benadering / Tone-of-voice: ${benadering || "Zakelijk"}
${nummerContext ? nummerContext : ""}
Lengte van de e-mail: ${emailLengte || "Normaal"}

Beschrijving van het onderwerp / inhoud:
"""
${context}
"""

Afzender: ${naamAfzender || "[Niet ingevuld]"}
Ontvanger: ${naamOntvanger || "[Niet ingevuld]"}

Instructies:
- Houd je exact aan de opgegeven lengte (Kort: 1-2 zinnen, Normaal: 3-5 zinnen, Lang: 5-7 zinnen, Uitgebreid: 8+ zinnen).
- Pas de toon exact aan op basis van het gekozen doel en benadering.
- Vermeld nummerinformatie expliciet als deze is ingevuld.
- Gebruik perfecte grammatica, spelling en interpunctie.
- Maak het onderwerp van de mail kort, krachtig en altijd relevant (max 6 woorden).
- Geef ALLEEN geldig JSON terug zonder enige verdere uitleg of tekst.

Voorbeeld:
{
  "onderwerp": "Onderwerp van de email",
  "email": "Tekst van de email"
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
      error: "AI gaf geen geldige JSON (genereer email)",
      debug_antwoord: antwoord,
    }, { status: 400 });
  }
}
