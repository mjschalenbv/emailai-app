import { NextResponse } from "next/server";
import OpenAI from "openai";

// -- Type voor het verwachte antwoord --
type AnalyseAntwoord = {
  taal: string;
  onderwerp: string;
  naamAfzender: string;
  naamOntvanger: string;
  benadering: string;
  nummer: string;
  nummerType: "factuurnummer" | "bestelnummer" | "klantnummer" | "";
  bijzonderheden: string;
};

// OpenAI setup
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Regex fallback functie
function extractNummerEnType(emailTekst: string): { nummer: string; nummerType: AnalyseAntwoord["nummerType"] } {
  const factuurRegex = /factu(?:ur|urnummer)[^\dA-Z]?([A-Z0-9\-]{6,})/i;
  const bestelRegex = /bestel(?:ling|nummer)?[^\dA-Z]?([A-Z0-9\-]{6,})/i;
  const klantRegex = /klant(?:nummer)?[^\dA-Z]?([A-Z0-9\-]{6,})/i;

  if (factuurRegex.test(emailTekst)) {
    return { nummer: factuurRegex.exec(emailTekst)?.[1] || "", nummerType: "factuurnummer" };
  }
  if (bestelRegex.test(emailTekst)) {
    return { nummer: bestelRegex.exec(emailTekst)?.[1] || "", nummerType: "bestelnummer" };
  }
  if (klantRegex.test(emailTekst)) {
    return { nummer: klantRegex.exec(emailTekst)?.[1] || "", nummerType: "klantnummer" };
  }
  return { nummer: "", nummerType: "" };
}

// -- POST handler --
export async function POST(req: Request) {
  try {
    const { emailTekst } = await req.json();

    if (typeof emailTekst !== "string" || !emailTekst.trim()) {
      return NextResponse.json({ error: "Geen geldige e-mailtekst ontvangen" }, { status: 400 });
    }

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
  "nummer": "...",
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

    // AI output verwerken
    let aiJson: Partial<AnalyseAntwoord>;
    try {
      aiJson = JSON.parse(antwoord);
    } catch {
      console.error("JSON-parsing mislukt:", antwoord);
      return NextResponse.json({ error: "AI gaf geen geldige JSON" }, { status: 400 });
    }

    // Fallback met regex voor nummer/type als AI ze niet goed herkent
    let nummer = aiJson.nummer || "";
    let nummerType = aiJson.nummerType || "";

    if (!nummer || !nummerType) {
      const fallback = extractNummerEnType(emailTekst);
      if (fallback.nummer && fallback.nummerType) {
        nummer = fallback.nummer;
        nummerType = fallback.nummerType;
      }
    }

    const response: AnalyseAntwoord = {
      taal: aiJson.taal || "",
      onderwerp: aiJson.onderwerp || "",
      naamAfzender: aiJson.naamAfzender || "",
      naamOntvanger: aiJson.naamOntvanger || "",
      benadering: aiJson.benadering || "",
      nummer,
      nummerType: (nummerType as AnalyseAntwoord["nummerType"]) || "",
      bijzonderheden: aiJson.bijzonderheden || "",
    };

    return NextResponse.json(response);
  } catch (err) {
    console.error("Analyse endpoint error:", err);
    return NextResponse.json({ error: "Interne fout in analyse" }, { status: 500 });
  }
}
