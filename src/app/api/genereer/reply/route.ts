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

  const {
    taal, naamAfzender, naamOntvanger, benadering, nummer, nummerType,
    antwoordLengte, antwoordWens, emailTekst
  } = data;

  const nummerContext =
    nummer && nummerType ? `Het ${nummerType} is: ${nummer}.` : "";

  const taalPrompt = languageInstructions[taal] || languageInstructions["Nederlands"];

  const systemPrompt = `
${taalPrompt}
Je bent een professionele e-mailschrijver. Schrijf een zakelijk, kort en duidelijk antwoord op de onderstaande e-mail.

Ontvangen e-mail:
"""
${emailTekst || "GEEN E-MAIL GEPLAKT"}
"""

${antwoordWens ? `De gebruiker wil specifiek antwoorden: "${antwoordWens}"` : ""}

${antwoordLengte ? `- De gewenste lengte van het antwoord is: "${antwoordLengte}".` : ""}

- De naam van de ontvanger is: "${naamOntvanger || "[NIET INGEVULD]"}"
- De naam van de afzender is: "${naamAfzender || "[NIET INGEVULD]"}"
- Taal: ${taal}
- Benadering: ${benadering}
${nummerContext ? "- Nummer info: " + nummerContext : ""}

**REGELS VOOR ONDERTEKENING EN AANHEF:**
- Gebruik bij de aanhef de NAAM VAN DE ONTVANGER als deze is ingevuld (dus alleen bij de aanhef, NIET onderaan!).
- Bij de afsluiting mag ALLEEN de NAAM VAN DE AFZENDER staan. Dus onder de mail staat nooit de naam van de ontvanger!
- Kun je geen naam van de ontvanger vinden? Gebruik dan een nette algemene aanhef zoals "Geachte heer/mevrouw" of "Geachte [bedrijfsnaam]".
- Bij bedrijven mag je "Geachte [bedrijfsnaam]" gebruiken als dat gepaster is.

**OVERIG:**
- Houd het antwoord zakelijk en concreet (${antwoordLengte ? antwoordLengte : "4-7 zinnen"}).
- Vermijd beleefdheidsfrasen ("ik hoop dat...", etc).
- Herhaal niets uit de oorspronkelijke e-mail.
- Antwoord alleen inhoudelijk en menselijk, zonder omwegen.
- Geen overbodige vragen terug.
- Is er geen echte actie nodig? Geef een korte, nette bevestiging.
- Geen uitleg, geen uitroeptekens tenzij functioneel.
  - De **afzender van het antwoord** is de originele ontvanger van de geplakte e-mail.
  - De **ontvanger van het antwoord** is de originele afzender van de geplakte e-mail.
  - Gebruik altijd deze namen correct in de aanhef en ondertekening.
  - De naam van de ontvanger mag NIET onder de e-mail staan.
Antwoord ALLEEN als geldig JSON, bijvoorbeeld:
{
  "onderwerp": "Kort en duidelijk",
  "email": "..."
}
Dus: GEEN uitleg of tekst buiten het JSON blok!
`.trim();

  const messages: ChatCompletionMessageParam[] = [
    { role: "system", content: systemPrompt }
  ];
  if (emailTekst) {
    messages.push({ role: "user", content: emailTekst });
  }

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
