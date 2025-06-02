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

  const { taal, naamAfzender, naamOntvanger, benadering, nummer, nummerType, context, doelEmail } = data;

  const nummerContext =
    nummer && nummerType ? `Het ${nummerType} is: ${nummer}.` : "";

  const taalPrompt = languageInstructions[taal] || languageInstructions["Nederlands"];

  const systemPrompt = `
${taalPrompt}
Je bent een professionele e-mailschrijver.

Schrijf een zakelijke, duidelijke e-mail (géén WhatsApp-stijl, niet te formeel of langdradig).

- Van: ${naamAfzender || "[NIET INGEVULD]"}
- Aan: ${naamOntvanger || "[NIET INGEVULD]"}
${nummerContext ? "- Nummer info: " + nummerContext : ""}

Onderwerp/instructie:
"""
${context || "Geen context opgegeven."}
"""

${doelEmail ? `Het doel van de e-mail is: "${doelEmail}".` : ""}

**REGELS VOOR ONDERTEKENING EN AANHEF:**
- Gebruik bij de aanhef de NAAM VAN DE ONTVANGER als deze is ingevuld (dus alleen bij de aanhef, NIET onderaan!).
- Bij de afsluiting mag ALLEEN de NAAM VAN DE AFZENDER staan. Dus onder de mail staat nooit de naam van de ontvanger!
- Kun je geen naam van de ontvanger vinden? Gebruik dan een nette algemene aanhef zoals "Geachte heer/mevrouw" of "Geachte [bedrijfsnaam]".
- Bij bedrijven mag je "Geachte [bedrijfsnaam]" gebruiken als dat gepaster is.

- Maak het onderwerp kort, duidelijk en relevant (maximaal 6 woorden).
- Schrijf zakelijk, vriendelijk en zonder poespas.
- Geef ALLEEN geldig JSON terug, zonder enige extra uitleg of tekst.

Voorbeeld:
{
  "onderwerp": "Kort en duidelijk",
  "email": "..."
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
  } catch (e) {
    return NextResponse.json({
      error: "AI gaf geen geldige JSON (genereer email)",
      debug_antwoord: antwoord,
    }, { status: 400 });
  }
}
