import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Hulpfunctie voor regex fallback
function extractNummerEnType(emailTekst: string) {
  // Regex patronen voor NL factuur/bestel/klantnummers (pas gerust aan!)
  const factuurRegex = /factu(?:ur|urnummer)[^\dA-Z]?([A-Z0-9\-]{6,})/i;
  const bestelRegex = /bestel(?:ling|nummer)?[^\dA-Z]?([A-Z0-9\-]{6,})/i;
  const klantRegex = /klant(?:nummer)?[^\dA-Z]?([A-Z0-9\-]{6,})/i;

  let nummer = "";
  let nummerType: "factuurnummer" | "bestelnummer" | "klantnummer" | "" = "";

  if (factuurRegex.test(emailTekst)) {
    nummer = factuurRegex.exec(emailTekst)?.[1] || "";
    nummerType = "factuurnummer";
  } else if (bestelRegex.test(emailTekst)) {
    nummer = bestelRegex.exec(emailTekst)?.[1] || "";
    nummerType = "bestelnummer";
  } else if (klantRegex.test(emailTekst)) {
    nummer = klantRegex.exec(emailTekst)?.[1] || "";
    nummerType = "klantnummer";
  }

  return { nummer, nummerType };
}

export async function POST(req: Request) {
  const { emailTekst } = await req.json();

  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: `
Je bent een slimme e-mailanalist. Analyseer de onderstaande e-mail en geef de volgende gegevens terug:

- taal (Nederlands, Engels, Duits of Frans)
- onderwerp (kort, max 5 woorden)
- naam van de afzender (de persoon of het team dat de mail ondertekent, meestal onderaan de e-mail)
- naam van de ontvanger (de naam in de aanhef, bijvoorbeeld 'Beste Michael' → Michael)
- benadering (Zakelijk, Vriendelijk, Informeel of Streng)
- bestelnummer, factuurnummer of klantnummer (indien genoemd, geef het type apart aan)
- bijzonderheden (spoed, frustratie, deadlines, enz.)

Geef het terug in het volgende JSON-formaat:
{
  "taal": "...",
  "onderwerp": "...",
  "naamAfzender": "...",
  "naamOntvanger": "...",
  "benadering": "...",
  "nummer": "...",          // het gevonden nummer (of leeg)
  "nummerType": "...",      // "factuurnummer", "bestelnummer", "klantnummer" of "" (leeg)
  "bijzonderheden": "..."
}
        `.trim(),
      },
      {
        role: "user",
        content: emailTekst,
      },
    ],
    temperature: 0.4,
  });

  const antwoord = completion.choices[0]?.message?.content?.trim();

  if (!antwoord) {
    return NextResponse.json({ error: "Geen antwoord van OpenAI" }, { status: 400 });
  }

  try {
    // AI output verwerken
    const aiJson = JSON.parse(antwoord);

    // Fallback met regex voor nummer/type als AI ze niet goed herkent
    let nummer = aiJson.nummer || "";
    let nummerType = aiJson.nummerType || "";

    // Als de AI niets vond, proberen we het zelf met regex:
    if (!nummer || !nummerType) {
      const fallback = extractNummerEnType(emailTekst);
      if (fallback.nummer && fallback.nummerType) {
        nummer = fallback.nummer;
        nummerType = fallback.nummerType;
      }
    }

    return NextResponse.json({
      taal: aiJson.taal || "",
      onderwerp: aiJson.onderwerp || "",
      naamAfzender: aiJson.naamAfzender || "",
      naamOntvanger: aiJson.naamOntvanger || "",
      benadering: aiJson.benadering || "",
      nummer,
      nummerType,
      bijzonderheden: aiJson.bijzonderheden || "",
    });
  } catch (e) {
    console.error("JSON-parsing mislukt:", antwoord);
    return NextResponse.json({ error: "AI gaf geen geldige JSON" }, { status: 400 });
  }
}
