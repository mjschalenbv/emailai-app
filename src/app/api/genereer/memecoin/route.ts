import { NextResponse } from "next/server";
import OpenAI from "openai";
import type { ChatCompletionMessageParam } from "openai/resources";

// --- Supported Languages ---
const languageInstructions: Record<string, string> = {
  en: "Write everything in English.",
  fr: "Écris tout en français.",
};

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // --- VALIDATION (kill early if missing) ---
    if (!data.language) return NextResponse.json({ error: "Language missing" }, { status: 400 });
    if (!data.type) return NextResponse.json({ error: "Type missing" }, { status: 400 });

    // --- UNPACK DATA ---
    const {
      language,      // "en" or "fr"
      type,          // "Meme coin tweet" or "Normal X post"
      ticker,        // $TICKER, required for meme coin
      ca,            // Contract Address, optional
      whybuy,        // Why should people buy, required for meme coin
      memeGoal,      // Main goal (or custom)
      customMemeGoal,
      tone,          // Tone of voice
      length,        // "Short (150-190 characters)", etc
      hashtags,      // "None", "Few (1-2)", "Many (3-5)", "Custom"
      customHashtags,
      desc,          // Extra message/context
      normalGoal,    // For normal X post
      customNormalGoal,
    } = data;

    // --- SELECT GOAL TEXT ---
    const memeGoalText =
      memeGoal === "Custom" || memeGoal === "Personnalisé"
        ? customMemeGoal
        : memeGoal;

    const normalGoalText =
      normalGoal === "Custom" || normalGoal === "Personnalisé"
        ? customNormalGoal
        : normalGoal;

    // --- LENGTH HANDLING ---
    let lengthInstruction = "";
    if (length?.toLowerCase().includes("short")) lengthInstruction = "Write exactly one tweet of 150 to 190 characters (may deviate up to 10% for fluency). Never create a thread.";
    else if (length?.toLowerCase().includes("medium") || length?.toLowerCase().includes("moyen")) lengthInstruction = "Write exactly one tweet of 240 to 275 characters (may deviate up to 10% for fluency). Never create a thread.";
    else if (length?.toLowerCase().includes("long")) lengthInstruction = "Write exactly one tweet of 300 to 350 characters (may deviate up to 10% for fluency). Never create a thread.";

    // --- HASHTAG HANDLING ---
    let hashtagsInstruction = "";
    if (hashtags === "None" || hashtags === "Aucun") {
      hashtagsInstruction = "Do not add any hashtags.";
    } else if (hashtags === "Custom" || hashtags === "Personnalisé") {
      hashtagsInstruction = `Only add these hashtags (no others) at the very bottom: ${customHashtags || ""}. Do not repeat them in the main text.`;
    } else if (hashtags === "Few (1-2)" || hashtags === "Peu (1-2)") {
      hashtagsInstruction = "At the very bottom, add 1 or 2 of the most relevant and viral crypto/memecoin hashtags (e.g. #bitcoin #solana #pumpfun #dogecoin #memecoin #crypto). Never put hashtags inside the main tweet text.";
    } else if (hashtags === "Many (3-5)" || hashtags === "Beaucoup (3-5)") {
      hashtagsInstruction = "At the very bottom, add 3 to 5 of the most relevant and viral crypto/memecoin hashtags (e.g. #bitcoin #solana #pumpfun #dogecoin #memecoin #crypto). Never put hashtags inside the main tweet text.";
    } else {
      hashtagsInstruction = "Do not add any hashtags.";
    }

    // --- LANGUAGE ---
    const taalPrompt = languageInstructions[language] || languageInstructions["en"];

    // --- SYSTEM PROMPT BUILDING ---
    let systemPrompt = "";

    if (type === "Meme coin tweet" || type === "Tweet meme coin") {
      // --- MEME COIN PROMPT ---
      systemPrompt = `
${taalPrompt}
You are a meme coin Twitter expert and X copywriter. Write a VIRAL, high-converting meme coin tweet for $${ticker}${ca ? ` (CA: ${ca})` : ""}.
Main goal: "${memeGoalText}"
Reason to buy: "${whybuy}"
Tone of voice: "${tone}"
${lengthInstruction}
Use all context below. Use all details smartly to convince traders:
"""
${desc || "[no extra context given]"}
"""
Guidelines:
- Start with a strong hook, use $${ticker} early or in the hook.
- Use emojis where it fits (but don't overdo it).
- NEVER make more than one tweet (no thread!), keep inside length range.
- Use all 'why buy' points for hype/conviction, especially as a closing or CTA.
- If CA is provided, put "CA: [address]" on a new line at the very bottom, after hashtags (not in the main text).
- ${hashtagsInstruction}
- Hashtags always go on a new line at the very bottom (never in main text).
- No explanations, disclaimers, code, markdown, or meta-text. Only the tweet itself.
- Output ONLY valid JSON:
{
  "post": "THE PERFECT VIRAL MEME COIN TWEET for $${ticker}, in the selected language and style, ready to post, with hashtags and (if provided) contract address at the very bottom."
}
No text outside the JSON block!
`.trim();
    } else {
      // --- NORMAL X POST PROMPT ---
      systemPrompt = `
${taalPrompt}
You are an X (Twitter) social media expert. Write a viral, professional X post in the selected language.
Main goal: "${normalGoalText}"
Tone of voice: "${tone}"
${lengthInstruction}
Context:
"""
${desc || "[no extra context given]"}
"""
Guidelines:
- Start with a strong hook.
- Use emojis where appropriate, but don't overdo.
- ${hashtagsInstruction}
- Hashtags always go on a new line at the very bottom (never in main text).
- Do NOT create a thread, only ONE post of the requested length.
- No explanations, disclaimers, code, markdown, or meta-text. Only the post itself.
- Output ONLY valid JSON:
{
  "post": "THE PERFECT X POST in the selected language and style, ready to post, with hashtags at the very bottom."
}
No text outside the JSON block!
`.trim();
    }

    // --- BUILD CHAT HISTORY ---
    const messages: ChatCompletionMessageParam[] = [
      { role: "system", content: systemPrompt }
    ];

    // --- CALL OPENAI ---
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages,
      temperature: 0.27,
    });

    const antwoord = completion.choices[0]?.message?.content?.trim();

    if (!antwoord) {
      return NextResponse.json({ error: "No answer from OpenAI" }, { status: 400 });
    }

    // --- JSON CLEANUP ---
    const firstCurly = antwoord.indexOf("{");
    const lastCurly = antwoord.lastIndexOf("}");
    if (firstCurly === -1 || lastCurly === -1) {
      throw new Error("No JSON found");
    }
    const cleanAntwoord = antwoord.slice(firstCurly, lastCurly + 1);

    let aiJson;
    try {
      aiJson = JSON.parse(cleanAntwoord);
    } catch (e: unknown) {
      return NextResponse.json({
        error: "AI did not return valid JSON (generate meme coin tweet)",
        debug_antwoord: antwoord,
        message: e instanceof Error ? e.message : String(e),
      }, { status: 400 });
    }

    if (!aiJson.post) {
      return NextResponse.json({
        error: "AI answer missing 'post' field",
        debug_antwoord: antwoord,
      }, { status: 400 });
    }

    return NextResponse.json({ post: aiJson.post });
  } catch (e: unknown) {
    return NextResponse.json({
      error: "Server error in meme coin tweet route.",
      details: e instanceof Error ? e.message : String(e),
    }, { status: 500 });
  }
}
