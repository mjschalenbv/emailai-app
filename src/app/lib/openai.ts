// src/app/lib/openai.ts
import OpenAI from "openai";

// ✅ Check of API key is ingevuld
const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  throw new Error("❌ OPENAI_API_KEY ontbreekt in .env.local");
}

// ✅ Maak één OpenAI client aan
const openai = new OpenAI({ apiKey });

/**
 * Analyseert een klant-e-mail en haalt gestructureerde info eruit.
 */
export async function analyseerEmail(emailTekst: string) {
  const completion = await openai.chat.completions.create({
    model: "gpt-4", // Je kunt hier ook "gpt-3.5-turbo" testen
    messages: [
      {
        role: "system",
        content: `
Je bent een slimme e-mailanalist. Analyseer de volgende e-mail en geef terug:

- taal (Nederlands, Engels, Duits of Frans)
- onderwerp (kort, max 5 woorden)
- naam klant (indien bekend)
- benadering (Zakelijk, Vriendelijk, Informeel of Streng)
- bestelnummer of klantnummer
- bijzonderheden (spoed, frustraties, deadlines, enz.)

Geef antwoord in dit JSON-formaat:

{
  "taal": "...",
  "onderwerp": "...",
  "naamKlant": "...",
  "benadering": "...",
  "bestelnummer": "...",
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
    throw new Error("❌ Geen antwoord van OpenAI.");
  }

  // Dit is de ESLint/TypeScript veilige versie:
  try {
    return JSON.parse(antwoord);
  } catch {
    console.error("❌ JSON-parsing mislukt:", antwoord);
    throw new Error("❌ Antwoord van OpenAI is geen geldig JSON.");
  }
}
