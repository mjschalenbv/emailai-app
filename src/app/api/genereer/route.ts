import { NextResponse } from "next/server";
import OpenAI from "openai";
import type { ChatCompletionMessageParam } from "openai/resources";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
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
    // Nieuwsbrief extra fields
    bedrijfsnaamNieuwsbrief,
    bedrijfTypeNieuwsbrief,
    onderwerpNieuwsbrief,
    doelgroepNieuwsbrief,
    stijlNieuwsbrief,
    puntenNieuwsbrief,
    lengteNieuwsbrief,
    ctaNieuwsbrief,
  } = await req.json();

  // Nummer-context samenstellen (voor zakelijke e-mail)
  const nummerContext =
    nummer && nummerType
      ? `Het ${nummerType} is: ${nummer}.`
      : "";

  let systemPrompt = "";

  // ---- ANTWOORD OP E-MAIL ----
  if (isAntwoord) {
    systemPrompt = `
Je bent een professionele e-mailschrijver. Schrijf een zakelijk, kort en duidelijk antwoord op de onderstaande e-mail.

Ontvangen e-mail:
"""
${emailTekst || "GEEN E-MAIL GEPLAKT"}
"""

${antwoordWens ? `De gebruiker wil specifiek antwoorden: "${antwoordWens}"` : ""}

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
- Houd het antwoord zakelijk en concreet (4-7 zinnen).
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
  }

  // ---- GENEREREN VAN EEN ZAKELIJKE E-MAIL ----
  else if (!isNieuwsbrief) {
    systemPrompt = `
Je bent een professionele e-mailschrijver.

Schrijf een zakelijke, duidelijke e-mail (géén WhatsApp-stijl, niet te formeel of langdradig).

- Van: ${naamAfzender || "[NIET INGEVULD]"}
- Aan: ${naamOntvanger || "[NIET INGEVULD]"}
${nummerContext ? "- Nummer info: " + nummerContext : ""}

Onderwerp/instructie:
"""
${context || "Geen context opgegeven."}
"""

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
  }

  // ---- GENEREREN VAN EEN NIEUWSBRIEF ----
  else if (isNieuwsbrief) {
    // Hier alles verwerken wat de nieuwsbrief AI perfect maakt!
    systemPrompt = `
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
- Taal: ${taal}
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

  // --- AI AANROEP ---
  const messages: ChatCompletionMessageParam[] = [
    { role: "system", content: systemPrompt }
  ];

  // Alleen bij antwoorden mag je ook de originele e-mail toevoegen als 'user' message
  if (isAntwoord && emailTekst) {
    messages.push({ role: "user", content: emailTekst });
  }

  const completion = await openai.chat.completions.create({
    model: "gpt-4o", // TOPMODEL!
    messages,
    temperature: 0.27, // Licht creatief, altijd professioneel
  });

  const antwoord = completion.choices[0]?.message?.content?.trim();

  if (!antwoord) {
    return NextResponse.json({ error: "Geen antwoord van OpenAI" }, { status: 400 });
  }

  try {
    const aiJson = JSON.parse(antwoord);
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
