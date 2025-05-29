import { NextResponse } from "next/server";
import OpenAI from "openai";
import type { ChatCompletionMessageParam } from "openai/resources";

// -------- TAALINSTRUCTIES --------
const languageInstructions: Record<string, string> = {
  nl: "Schrijf alles in het Nederlands.",
  en: "Write everything in English.",
  de: "Schreibe alles auf Deutsch.",
  fr: "Écris tout en français.",
  es: "Escribe todo en español.",
  uk: "Напиши все українською.",
};

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // --------- VALIDATIE ---------
    if (!data.language) return NextResponse.json({ error: "Language ontbreekt" }, { status: 400 });
    if (!data.platform) return NextResponse.json({ error: "Platform ontbreekt" }, { status: 400 });

    // --------- VARIABELEN ---------
    const {
      language, // "en", "nl", etc
      platform,
      hashtagOption,
      customHashtags,
      goal,
      customGoal,
      tone,
      emotion,
      length,
      callToAction,
      customCTA,
      postContent,
    } = data;

    // --------- LOGICA VOOR CUSTOMS ---------
    const goalText =
      ["Custom", "Zelf invullen", "Eigene Eingabe", "Personalizar", "Власний варіант", "Personnaliser"].includes(goal)
        ? customGoal
        : goal;

    const ctaText =
      ["Custom", "Zelf invullen", "Eigene Aktion", "Personalizar", "Власний варіант", "Personnaliser"].includes(callToAction)
        ? customCTA
        : callToAction;

    // --------- HASHTAGS LOGICA ---------
    let hashtags = "";
    let hashtagsInstruction = "";
    if (hashtagOption === "custom") {
      hashtags = customHashtags || "";
      hashtagsInstruction = `Gebruik deze hashtags onderaan de post: ${hashtags}`;
    } else if (hashtagOption === "viral") {
      hashtagsInstruction = "Bedenk en voeg de 4-7 meest virale relevante hashtags toe in de gekozen taal onderaan de post. Gebruik altijd alleen hashtags die populair zijn voor dit onderwerp, platform en taal.";
    } else if (hashtagOption === "few") {
      hashtagsInstruction = "Voeg 3-5 relevante, duidelijke hashtags toe onderaan de post in de gekozen taal.";
    } else if (hashtagOption === "many") {
      hashtagsInstruction = "Voeg 8-12 relevante hashtags toe onderaan de post, goed verspreid voor bereik, in de gekozen taal.";
    } else {
      hashtagsInstruction = "Gebruik geen hashtags.";
    }

    // Kies altijd de goede taalstring voor OpenAI prompt (default NL bij fout)
    const taalPrompt =
      languageInstructions[language] ||
      languageInstructions["nl"];

    // --------- PROMPT ---------
    const systemPrompt = `
${taalPrompt}
Je bent een social media-expert en copywriter. Jouw taak: een virale, professionele social media post schrijven, perfect afgestemd op de gekozen taal, doelgroep en platform.

Platform: ${platform}
Doel van de post: "${goalText}"
Toon: "${tone}"
Emotie: "${emotion}"
Lengte: "${length}"
${ctaText ? `Call to action: "${ctaText}"` : ""}
Kernboodschap/context:
"""
${postContent || "[geen extra uitleg ingevuld]"}
"""

${hashtagsInstruction}

**REGELS:**
- Schrijf ALLES in de gekozen taal (${language}).
- Begin met een sterke hook, daarna de boodschap.
- Voeg relevante emoji’s toe waar passend (niet overdreven!).
- Plaats hashtags exact onderaan de post (géén extra uitleg).
- Sluit af met een duidelijke call-to-action als opgegeven.
- GEEN uitleg, disclaimers of technische tekst, alleen de post zelf.
- Gebruik geen markering, geen aanhalingstekens of JSON-code in de post zelf.

**OUTPUT:**
Geef ALLEEN geldig JSON terug:
{
  "post": "De perfecte social post in de gekozen taal, inclusief hashtags onderaan."
}
**NOOIT tekst buiten het JSON-blok!**
`.trim();

    // --------- BUILD CHAT HISTORY ---------
    const messages: ChatCompletionMessageParam[] = [
      { role: "system", content: systemPrompt }
    ];

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

    // --------- JSON CLEANUP ---------
    const firstCurly = antwoord.indexOf("{");
    const lastCurly = antwoord.lastIndexOf("}");
    if (firstCurly === -1 || lastCurly === -1) {
      throw new Error("Geen JSON gevonden");
    }
    const cleanAntwoord = antwoord.slice(firstCurly, lastCurly + 1);

    let aiJson;
    try {
      aiJson = JSON.parse(cleanAntwoord);
    } catch (e: unknown) {
      return NextResponse.json({
        error: "AI gaf geen geldige JSON (genereer social post)",
        debug_antwoord: antwoord,
        message: e instanceof Error ? e.message : String(e),
      }, { status: 400 });
    }


    if (!aiJson.post) {
      return NextResponse.json({
        error: "AI antwoord bevat geen veld 'post'",
        debug_antwoord: antwoord,
      }, { status: 400 });
    }

    return NextResponse.json({ post: aiJson.post });
  } catch (e: unknown) {
    return NextResponse.json({
      error: "Server error in social post route.",
      details: e instanceof Error ? e.message : String(e),
    }, { status: 500 });
  }
}
