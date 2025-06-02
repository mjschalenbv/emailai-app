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

  if (!data.taal) return NextResponse.json({ error: "Taal ontbreekt" }, { status: 400 });

  if (!data.bedrijfsnaamNieuwsbrief) return NextResponse.json({ error: "Bedrijfsnaam ontbreekt" }, { status: 400 });
  if (!data.bedrijfTypeNieuwsbrief) return NextResponse.json({ error: "Bedrijfstype ontbreekt" }, { status: 400 });
  if (!data.onderwerpNieuwsbrief) return NextResponse.json({ error: "Onderwerp nieuwsbrief ontbreekt" }, { status: 400 });
  if (!data.doelgroepNieuwsbrief) return NextResponse.json({ error: "Doelgroep nieuwsbrief ontbreekt" }, { status: 400 });
  if (!data.stijlNieuwsbrief) return NextResponse.json({ error: "Stijl nieuwsbrief ontbreekt" }, { status: 400 });
  if (!data.puntenNieuwsbrief) return NextResponse.json({ error: "Punten nieuwsbrief ontbreekt" }, { status: 400 });
  if (!data.lengteNieuwsbrief) return NextResponse.json({ error: "Lengte nieuwsbrief ontbreekt" }, { status: 400 });

  const {
    taal,
    bedrijfsnaamNieuwsbrief,
    bedrijfTypeNieuwsbrief,
    onderwerpNieuwsbrief,
    doelgroepNieuwsbrief,
    stijlNieuwsbrief,
    puntenNieuwsbrief,
    lengteNieuwsbrief,
    ctaNieuwsbrief
  } = data;

  const taalPrompt = languageInstructions[taal] || languageInstructions["Nederlands"];

  const systemPrompt = `
${taalPrompt}
Je bent een professionele copywriter en expert in het schrijven van krachtige, effectieve en conversiegerichte nieuwsbrieven.

Maak een perfecte zakelijke nieuwsbrief, afgestemd op onderstaande gegevens van het bedrijf en doelgroep. Houd rekening met toon, doelgroep, lengte, en gebruik altijd pakkende zinnen, een heldere structuur, en indien mogelijk een aantrekkelijke call-to-action.

**Bedrijfsgegevens:**
- Bedrijfsnaam/afzender: "${bedrijfsnaamNieuwsbrief || "[NIET INGEVULD]"}"
- Type bedrijf: "${bedrijfTypeNieuwsbrief || "[NIET INGEVULD]"}"
${ctaNieuwsbrief ? `- Website/call-to-action: "${ctaNieuwsbrief}"` : ""}

**Nieuwsbrief details:**
- Onderwerp: "${onderwerpNieuwsbrief || "[NIET INGEVULD]"}"
- Doelgroep: "${doelgroepNieuwsbrief || "[NIET INGEVULD]"}"
- Stijl/tone-of-voice: "${stijlNieuwsbrief || "[NIET INGEVULD]"}"
- Belangrijkste punten (content): "${puntenNieuwsbrief || "[NIET INGEVULD]"}"
- Lengte: "${lengteNieuwsbrief || "[NIET INGEVULD]"}"

**AANWIJZINGEN:**
- De nieuwsbrief moet relevant en waardevol zijn voor de doelgroep.
- Maak het intro pakkend (geen open deuren), daarna vlot naar de hoofdpunten.
- Sluit af met een relevante, aansprekende call-to-action die past bij de doelgroep en het bedrijf (indien opgegeven).
- Houd de schrijfstijl altijd zakelijk, inspirerend en uitnodigend, zonder clichés.
- Gebruik eventueel subtiele marketing, geen harde verkooppraat.
- Voorkom herhaling.
- Schrijf zo natuurlijk mogelijk, zoals de beste copywriters dat doen.
- Geef als output ALLEEN geldig JSON terug:

Voorbeeld:
{
  "onderwerp": "Juni nieuwsbrief – Zomeractie!",
  "email": "..."
}
**GEEN uitleg of tekst buiten het JSON blok!**
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
      error: "AI gaf geen geldige JSON (genereer nieuwsbrief)",
      debug_antwoord: antwoord,
    }, { status: 400 });
  }
}
