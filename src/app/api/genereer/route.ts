import { NextResponse } from "next/server";
import OpenAI from "openai";
import type { ChatCompletionMessageParam } from "openai/resources";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Extra: mapping voor taalprompt aan het begin van elke opdracht
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

  // --------- VALIDATIE VOOR ALLE VELDEN ---------
  if (!data.taal) return NextResponse.json({ error: "Taal ontbreekt" }, { status: 400 });

  // Extra validatie per type mail
  if (data.isNieuwsbrief) {
    if (!data.bedrijfsnaamNieuwsbrief) return NextResponse.json({ error: "Bedrijfsnaam ontbreekt" }, { status: 400 });
    if (!data.bedrijfTypeNieuwsbrief) return NextResponse.json({ error: "Bedrijfstype ontbreekt" }, { status: 400 });
    if (!data.onderwerpNieuwsbrief) return NextResponse.json({ error: "Onderwerp nieuwsbrief ontbreekt" }, { status: 400 });
    if (!data.doelgroepNieuwsbrief) return NextResponse.json({ error: "Doelgroep nieuwsbrief ontbreekt" }, { status: 400 });
    if (!data.stijlNieuwsbrief) return NextResponse.json({ error: "Stijl nieuwsbrief ontbreekt" }, { status: 400 });
    if (!data.puntenNieuwsbrief) return NextResponse.json({ error: "Punten nieuwsbrief ontbreekt" }, { status: 400 });
    if (!data.lengteNieuwsbrief) return NextResponse.json({ error: "Lengte nieuwsbrief ontbreekt" }, { status: 400 });
  }

  // --------- VARIABELEN UIT DE REQUEST ---------
  const {
    taal,
    naamAfzender,
    naamOntvanger,
    benadering,
    nummer,
    nummerType,
    context,
    antwoordWens,
    emailTekst,
    isAntwoord,
    isNieuwsbrief,
    doelEmail,
    antwoordLengte,
    bedrijfsnaamNieuwsbrief,
    bedrijfTypeNieuwsbrief,
    onderwerpNieuwsbrief,
    doelgroepNieuwsbrief,
    stijlNieuwsbrief,
    puntenNieuwsbrief,
    lengteNieuwsbrief,
    ctaNieuwsbrief,
  } = data;

  const nummerContext =
    nummer && nummerType
      ? `Het ${nummerType} is: ${nummer}.`
      : "";

  // --------- BEGIN TAALINSTRUCTIE ---------
  // Default naar Nederlands als taal niet wordt herkend
  const taalPrompt = languageInstructions[taal] || languageInstructions["Nederlands"];

  let systemPrompt = "";

  // ------------ ANTWOORD GENEREREN (REPLY) ------------
  if (isAntwoord) {
    systemPrompt = `
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

  // ------------ NIEUWE MAIL GENEREREN ------------
  } else if (!isNieuwsbrief) {
    systemPrompt = `
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

  // ------------ NIEUWSBRIEF GENEREREN ------------
  } else if (isNieuwsbrief) {
    systemPrompt = `
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
  }

  // --------- BUILD CHAT HISTORY FOR OPENAI API ---------
  const messages: ChatCompletionMessageParam[] = [
    { role: "system", content: systemPrompt }
  ];
  if (isAntwoord && emailTekst) {
    messages.push({ role: "user", content: emailTekst });
  }

  // --------- CALL OPENAI ---------
  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages,
    temperature: 0.27,
  });

  const antwoord = completion.choices[0]?.message?.content?.trim();

  if (!antwoord) {
    return NextResponse.json({ error: "Geen antwoord van OpenAI" }, { status: 400 });
  }

  // --------- JSON CLEANUP (NO OUTSIDE TEXT!) ---------
  try {
    // Verwijder ALLES buiten het eerste JSON-blok (maakt niet uit wat de AI doet!)
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
    console.error("JSON-parsing mislukt in GENEREER:", antwoord, e);
    return NextResponse.json({
      error: "AI gaf geen geldige JSON (genereer)",
      debug_antwoord: antwoord,
    }, { status: 400 });
  }
}
