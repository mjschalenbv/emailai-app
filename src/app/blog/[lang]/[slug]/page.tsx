import { notFound } from "next/navigation";
import { Metadata } from "next";

const POST = {
  slug: "top-10-free-ai-tools",
  title: {
    en: "Top 10 Free AI Tools – June 2025",
    nl: "Top 10 gratis AI-tools – juni 2025",
    fr: "Top 10 des outils IA gratuits – juin 2025",
    es: "Top 10 de herramientas de IA gratis – junio 2025",
    de: "Top 10 kostenlose KI-Tools – Juni 2025",
    uk: "Топ-10 безкоштовних AI-інструментів – червень 2025",
  },
  body: {
    en: (
      <>
        <p>
          AI isn’t just for techies anymore. Today, anyone can use powerful, free AI tools to save time, be more creative, or boost productivity. Here’s a list of ten genuinely useful (and free!) AI tools you can start using right away:
        </p>
        <ol className="list-decimal pl-5 mt-4 space-y-2">
          <li>
            <b>ChatGPT Free:</b> Conversational AI for writing, brainstorming, coding, and learning.{" "}
            <a href="https://chat.openai.com" target="_blank" rel="noopener" className="text-indigo-600 underline">chat.openai.com</a>
          </li>
          <li>
            <b>Google Gemini:</b> Google’s own free AI chat assistant, good for summaries, search, and productivity.{" "}
            <a href="https://gemini.google.com" target="_blank" rel="noopener" className="text-indigo-600 underline">gemini.google.com</a>
          </li>
          <li>
            <b>Claude (by Anthropic):</b> A friendly chatbot that can handle documents and longer conversations.{" "}
            <a href="https://claude.ai" target="_blank" rel="noopener" className="text-indigo-600 underline">claude.ai</a>
          </li>
          <li>
            <b>Perplexity AI:</b> Ask questions and get answers with sources. Great for research and fast reading.{" "}
            <a href="https://perplexity.ai" target="_blank" rel="noopener" className="text-indigo-600 underline">perplexity.ai</a>
          </li>
          <li>
            <b>Canva Magic Studio:</b> Create designs with AI, generate images and text. Free tier is very generous.{" "}
            <a href="https://www.canva.com/magic/" target="_blank" rel="noopener" className="text-indigo-600 underline">canva.com/magic</a>
          </li>
          <li>
            <b>Leonardo.AI:</b> Generate free AI images in many styles. Free to use, with daily credits.{" "}
            <a href="https://leonardo.ai" target="_blank" rel="noopener" className="text-indigo-600 underline">leonardo.ai</a>
          </li>
          <li>
            <b>EmailAI:</b> Write emails, replies, newsletters and social posts automatically, in any language. 100% free, no login.{" "}
            <a href="https://www.emailai.ai" target="_blank" rel="noopener" className="text-indigo-600 underline">emailai.ai</a>
          </li>
          <li>
            <b>Krea AI:</b> Free AI image generator, easy to use, no account required.{" "}
            <a href="https://krea.ai" target="_blank" rel="noopener" className="text-indigo-600 underline">krea.ai</a>
          </li>
          <li>
            <b>Mistral Next:</b> Open-source conversational AI, very fast, with no sign-up.{" "}
            <a href="https://chat.mistral.ai" target="_blank" rel="noopener" className="text-indigo-600 underline">chat.mistral.ai</a>
          </li>
          <li>
            <b>Photopea:</b> Free online Photoshop alternative, now with AI features!{" "}
            <a href="https://www.photopea.com" target="_blank" rel="noopener" className="text-indigo-600 underline">photopea.com</a>
          </li>
        </ol>
        <p className="mt-6">
          Most of these tools have extra features if you register, but you can try them out for free without needing to pay. Have a favorite tool I missed? Let me know!
        </p>
      </>
    ),
    nl: (
      <>
        <p>
          AI is niet langer alleen voor techneuten. Tegenwoordig kan iedereen krachtige, gratis AI-tools gebruiken om tijd te besparen, creatiever te zijn of productiever te werken. Hier vind je tien écht handige (en gratis!) AI-tools die je vandaag nog kunt proberen:
        </p>
        <ol className="list-decimal pl-5 mt-4 space-y-2">
          <li>
            <b>ChatGPT Free:</b> Chatbot voor schrijven, brainstormen, coderen en leren.{" "}
            <a href="https://chat.openai.com" target="_blank" rel="noopener" className="text-indigo-600 underline">chat.openai.com</a>
          </li>
          <li>
            <b>Google Gemini:</b> Google’s eigen gratis AI-chat, handig voor samenvattingen, zoeken en productiviteit.{" "}
            <a href="https://gemini.google.com" target="_blank" rel="noopener" className="text-indigo-600 underline">gemini.google.com</a>
          </li>
          <li>
            <b>Claude (van Anthropic):</b> Vriendelijke chatbot die ook documenten aankan en langere gesprekken voert.{" "}
            <a href="https://claude.ai" target="_blank" rel="noopener" className="text-indigo-600 underline">claude.ai</a>
          </li>
          <li>
            <b>Perplexity AI:</b> Stel vragen en krijg antwoorden mét bronnen. Top voor research en snelle info.{" "}
            <a href="https://perplexity.ai" target="_blank" rel="noopener" className="text-indigo-600 underline">perplexity.ai</a>
          </li>
          <li>
            <b>Canva Magic Studio:</b> Maak designs met AI, genereer afbeeldingen en tekst. Het gratis niveau is ruim.{" "}
            <a href="https://www.canva.com/magic/" target="_blank" rel="noopener" className="text-indigo-600 underline">canva.com/magic</a>
          </li>
          <li>
            <b>Leonardo.AI:</b> Gratis AI-afbeeldingen genereren in vele stijlen. Gratis te gebruiken met dagelijkse credits.{" "}
            <a href="https://leonardo.ai" target="_blank" rel="noopener" className="text-indigo-600 underline">leonardo.ai</a>
          </li>
          <li>
            <b>EmailAI:</b> Schrijf e-mails, antwoorden, nieuwsbrieven en social posts automatisch, in elke taal. 100% gratis, geen account nodig.{" "}
            <a href="https://www.emailai.ai" target="_blank" rel="noopener" className="text-indigo-600 underline">emailai.ai</a>
          </li>
          <li>
            <b>Krea AI:</b> Gratis AI-afbeelding generator, makkelijk in gebruik, geen account nodig.{" "}
            <a href="https://krea.ai" target="_blank" rel="noopener" className="text-indigo-600 underline">krea.ai</a>
          </li>
          <li>
            <b>Mistral Next:</b> Open-source chat-AI, razendsnel, geen registratie.{" "}
            <a href="https://chat.mistral.ai" target="_blank" rel="noopener" className="text-indigo-600 underline">chat.mistral.ai</a>
          </li>
          <li>
            <b>Photopea:</b> Gratis online Photoshop-alternatief, nu ook met AI-functies!{" "}
            <a href="https://www.photopea.com" target="_blank" rel="noopener" className="text-indigo-600 underline">photopea.com</a>
          </li>
        </ol>
        <p className="mt-6">
          Bij de meeste tools kun je meer functies krijgen als je een account aanmaakt, maar proberen kan bijna altijd gratis. Mis je jouw favoriet? Laat het gerust weten!
        </p>
      </>
    ),
    fr: (
      <>
        <p>
          L’IA n’est plus réservée aux experts ! Aujourd’hui, tout le monde peut utiliser de puissants outils IA gratuits pour gagner du temps, booster la créativité ou améliorer la productivité. Voici dix outils IA vraiment utiles (et gratuits !) à découvrir dès maintenant :
        </p>
        <ol className="list-decimal pl-5 mt-4 space-y-2">
          <li>
            <b>ChatGPT Free :</b> Chatbot pour écrire, réfléchir, coder et apprendre.{" "}
            <a href="https://chat.openai.com" target="_blank" rel="noopener" className="text-indigo-600 underline">chat.openai.com</a>
          </li>
          <li>
            <b>Google Gemini :</b> L’IA gratuite de Google pour résumer, rechercher, être plus productif.{" "}
            <a href="https://gemini.google.com" target="_blank" rel="noopener" className="text-indigo-600 underline">gemini.google.com</a>
          </li>
          <li>
            <b>Claude (Anthropic) :</b> Un chatbot sympathique qui gère aussi les documents et les longues conversations.{" "}
            <a href="https://claude.ai" target="_blank" rel="noopener" className="text-indigo-600 underline">claude.ai</a>
          </li>
          <li>
            <b>Perplexity AI :</b> Posez vos questions, recevez des réponses avec sources. Idéal pour la veille ou la recherche.{" "}
            <a href="https://perplexity.ai" target="_blank" rel="noopener" className="text-indigo-600 underline">perplexity.ai</a>
          </li>
          <li>
            <b>Canva Magic Studio :</b> Créez des designs, images et textes avec l’IA. L’offre gratuite est très complète.{" "}
            <a href="https://www.canva.com/magic/" target="_blank" rel="noopener" className="text-indigo-600 underline">canva.com/magic</a>
          </li>
          <li>
            <b>Leonardo.AI :</b> Générez des images IA gratuites, plusieurs styles, crédits offerts chaque jour.{" "}
            <a href="https://leonardo.ai" target="_blank" rel="noopener" className="text-indigo-600 underline">leonardo.ai</a>
          </li>
          <li>
            <b>EmailAI :</b> Écrivez des emails, réponses, newsletters et posts sociaux en un clic, dans n’importe quelle langue. 100% gratuit, sans inscription.{" "}
            <a href="https://www.emailai.ai" target="_blank" rel="noopener" className="text-indigo-600 underline">emailai.ai</a>
          </li>
          <li>
            <b>Krea AI :</b> Générateur d’images IA gratuit, simple et sans compte.{" "}
            <a href="https://krea.ai" target="_blank" rel="noopener" className="text-indigo-600 underline">krea.ai</a>
          </li>
          <li>
            <b>Mistral Next :</b> IA conversationnelle open-source, très rapide, sans inscription.{" "}
            <a href="https://chat.mistral.ai" target="_blank" rel="noopener" className="text-indigo-600 underline">chat.mistral.ai</a>
          </li>
          <li>
            <b>Photopea :</b> Photoshop gratuit en ligne, maintenant avec IA !{" "}
            <a href="https://www.photopea.com" target="_blank" rel="noopener" className="text-indigo-600 underline">photopea.com</a>
          </li>
        </ol>
        <p className="mt-6">
          La plupart de ces outils proposent plus de fonctions si vous créez un compte, mais l’essai est vraiment gratuit. Un outil préféré à recommander ? Écrivez-nous !
        </p>
      </>
    ),
    es: (
      <>
        <p>
          La IA ya no es solo para expertos. Hoy cualquiera puede aprovechar herramientas de IA gratis para ahorrar tiempo, crear más o ser más productivo. Aquí tienes 10 herramientas útiles (¡y gratis!) que puedes probar ya mismo:
        </p>
        <ol className="list-decimal pl-5 mt-4 space-y-2">
          <li>
            <b>ChatGPT Free:</b> Chat conversacional para escribir, programar y aprender.{" "}
            <a href="https://chat.openai.com" target="_blank" rel="noopener" className="text-indigo-600 underline">chat.openai.com</a>
          </li>
          <li>
            <b>Google Gemini:</b> El asistente IA de Google, bueno para resúmenes, búsquedas y productividad.{" "}
            <a href="https://gemini.google.com" target="_blank" rel="noopener" className="text-indigo-600 underline">gemini.google.com</a>
          </li>
          <li>
            <b>Claude (Anthropic):</b> Un chatbot amigable, ideal para documentos y largas conversaciones.{" "}
            <a href="https://claude.ai" target="_blank" rel="noopener" className="text-indigo-600 underline">claude.ai</a>
          </li>
          <li>
            <b>Perplexity AI:</b> Haz preguntas y obtén respuestas con fuentes. Perfecto para investigar.{" "}
            <a href="https://perplexity.ai" target="_blank" rel="noopener" className="text-indigo-600 underline">perplexity.ai</a>
          </li>
          <li>
            <b>Canva Magic Studio:</b> Diseña con IA, genera imágenes y textos. El nivel gratuito es muy generoso.{" "}
            <a href="https://www.canva.com/magic/" target="_blank" rel="noopener" className="text-indigo-600 underline">canva.com/magic</a>
          </li>
          <li>
            <b>Leonardo.AI:</b> Genera imágenes IA gratis en varios estilos, créditos diarios.{" "}
            <a href="https://leonardo.ai" target="_blank" rel="noopener" className="text-indigo-600 underline">leonardo.ai</a>
          </li>
          <li>
            <b>EmailAI:</b> Escribe emails, respuestas, newsletters y posts automáticamente en cualquier idioma. Gratis y sin cuenta.{" "}
            <a href="https://www.emailai.ai" target="_blank" rel="noopener" className="text-indigo-600 underline">emailai.ai</a>
          </li>
          <li>
            <b>Krea AI:</b> Generador de imágenes IA gratis, fácil, sin registro.{" "}
            <a href="https://krea.ai" target="_blank" rel="noopener" className="text-indigo-600 underline">krea.ai</a>
          </li>
          <li>
            <b>Mistral Next:</b> Chat IA open source, rapidísimo y sin registro.{" "}
            <a href="https://chat.mistral.ai" target="_blank" rel="noopener" className="text-indigo-600 underline">chat.mistral.ai</a>
          </li>
          <li>
            <b>Photopea:</b> Alternativa gratis a Photoshop online, ¡ahora con IA!{" "}
            <a href="https://www.photopea.com" target="_blank" rel="noopener" className="text-indigo-600 underline">photopea.com</a>
          </li>
        </ol>
        <p className="mt-6">
          Si creas cuenta, puedes desbloquear extras, pero la mayoría se pueden probar gratis. ¿Tienes una favorita? ¡Dínoslo!
        </p>
      </>
    ),
    de: (
      <>
        <p>
          KI ist nicht mehr nur etwas für Technikfans! Heute kann jeder kostenlose, leistungsstarke KI-Tools nutzen, um Zeit zu sparen, kreativer zu werden oder die Produktivität zu steigern. Hier sind zehn wirklich nützliche (und kostenlose!) KI-Tools, die du sofort ausprobieren kannst:
        </p>
        <ol className="list-decimal pl-5 mt-4 space-y-2">
          <li>
            <b>ChatGPT Free:</b> Chatbot zum Schreiben, Brainstormen, Programmieren und Lernen.{" "}
            <a href="https://chat.openai.com" target="_blank" rel="noopener" className="text-indigo-600 underline">chat.openai.com</a>
          </li>
          <li>
            <b>Google Gemini:</b> Googles eigener KI-Chat, praktisch für Zusammenfassungen, Recherche und Produktivität.{" "}
            <a href="https://gemini.google.com" target="_blank" rel="noopener" className="text-indigo-600 underline">gemini.google.com</a>
          </li>
          <li>
            <b>Claude (Anthropic):</b> Sympathischer Chatbot, bewältigt auch Dokumente und längere Gespräche.{" "}
            <a href="https://claude.ai" target="_blank" rel="noopener" className="text-indigo-600 underline">claude.ai</a>
          </li>
          <li>
            <b>Perplexity AI:</b> Stelle Fragen und bekomme Antworten mit Quellen. Super für Recherche.{" "}
            <a href="https://perplexity.ai" target="_blank" rel="noopener" className="text-indigo-600 underline">perplexity.ai</a>
          </li>
          <li>
            <b>Canva Magic Studio:</b> Mit KI Designs, Bilder und Texte erstellen. Großzügiges Free-Tier.{" "}
            <a href="https://www.canva.com/magic/" target="_blank" rel="noopener" className="text-indigo-600 underline">canva.com/magic</a>
          </li>
          <li>
            <b>Leonardo.AI:</b> Erstelle gratis KI-Bilder in vielen Stilen, mit täglichen Credits.{" "}
            <a href="https://leonardo.ai" target="_blank" rel="noopener" className="text-indigo-600 underline">leonardo.ai</a>
          </li>
          <li>
            <b>EmailAI:</b> Schreibe E-Mails, Antworten, Newsletter und Social Posts automatisch in jeder Sprache. 100% gratis, kein Login.{" "}
            <a href="https://www.emailai.ai" target="_blank" rel="noopener" className="text-indigo-600 underline">emailai.ai</a>
          </li>
          <li>
            <b>Krea AI:</b> Kostenloser KI-Bildgenerator, einfach nutzbar, kein Account nötig.{" "}
            <a href="https://krea.ai" target="_blank" rel="noopener" className="text-indigo-600 underline">krea.ai</a>
          </li>
          <li>
            <b>Mistral Next:</b> Open-Source Chat-KI, blitzschnell, ohne Registrierung.{" "}
            <a href="https://chat.mistral.ai" target="_blank" rel="noopener" className="text-indigo-600 underline">chat.mistral.ai</a>
          </li>
          <li>
            <b>Photopea:</b> Kostenloses Online-Photoshop-Tool, jetzt mit KI-Funktionen!{" "}
            <a href="https://www.photopea.com" target="_blank" rel="noopener" className="text-indigo-600 underline">photopea.com</a>
          </li>
        </ol>
        <p className="mt-6">
          Für viele Tools gibt es mit Anmeldung mehr Funktionen, aber testen kannst du fast alles gratis. Deine Lieblings-KI fehlt? Schreib uns!
        </p>
      </>
    ),
    uk: (
      <>
        <p>
          Штучний інтелект більше не тільки для айтішників! Зараз будь-хто може використовувати потужні безкоштовні AI-інструменти, щоб заощадити час, стати креативнішим або підвищити продуктивність. Ось десять справді корисних (і безкоштовних!) AI-інструментів, які варто спробувати прямо зараз:
        </p>
        <ol className="list-decimal pl-5 mt-4 space-y-2">
          <li>
            <b>ChatGPT Free:</b> Чат-бот для написання, ідей, кодування й навчання.{" "}
            <a href="https://chat.openai.com" target="_blank" rel="noopener" className="text-indigo-600 underline">chat.openai.com</a>
          </li>
          <li>
            <b>Google Gemini:</b> Безкоштовний асистент AI від Google — для підсумків, пошуку та роботи.{" "}
            <a href="https://gemini.google.com" target="_blank" rel="noopener" className="text-indigo-600 underline">gemini.google.com</a>
          </li>
          <li>
            <b>Claude (Anthropic):</b> Дружній чат-бот, працює з документами та довгими діалогами.{" "}
            <a href="https://claude.ai" target="_blank" rel="noopener" className="text-indigo-600 underline">claude.ai</a>
          </li>
          <li>
            <b>Perplexity AI:</b> Ставте питання й отримуйте відповіді з джерелами. Ідеально для досліджень.{" "}
            <a href="https://perplexity.ai" target="_blank" rel="noopener" className="text-indigo-600 underline">perplexity.ai</a>
          </li>
          <li>
            <b>Canva Magic Studio:</b> Створюйте дизайни, зображення й текст за допомогою AI. Щедрий безкоштовний тариф.{" "}
            <a href="https://www.canva.com/magic/" target="_blank" rel="noopener" className="text-indigo-600 underline">canva.com/magic</a>
          </li>
          <li>
            <b>Leonardo.AI:</b> Генеруйте безкоштовні AI-зображення в різних стилях (щоденні кредити).{" "}
            <a href="https://leonardo.ai" target="_blank" rel="noopener" className="text-indigo-600 underline">leonardo.ai</a>
          </li>
          <li>
            <b>EmailAI:</b> Пишіть листи, відповіді, розсилки та соцпости автоматично будь-якою мовою. 100% безкоштовно, не потрібна реєстрація.{" "}
            <a href="https://www.emailai.ai" target="_blank" rel="noopener" className="text-indigo-600 underline">emailai.ai</a>
          </li>
          <li>
            <b>Krea AI:</b> Безкоштовний AI-генератор зображень, просто та без акаунта.{" "}
            <a href="https://krea.ai" target="_blank" rel="noopener" className="text-indigo-600 underline">krea.ai</a>
          </li>
          <li>
            <b>Mistral Next:</b> Open-source AI-чат, дуже швидкий, без реєстрації.{" "}
            <a href="https://chat.mistral.ai" target="_blank" rel="noopener" className="text-indigo-600 underline">chat.mistral.ai</a>
          </li>
          <li>
            <b>Photopea:</b> Безкоштовний онлайн-аналог Photoshop, тепер із AI-функціями!{" "}
            <a href="https://www.photopea.com" target="_blank" rel="noopener" className="text-indigo-600 underline">photopea.com</a>
          </li>
        </ol>
        <p className="mt-6">
          У більшості інструментів є додаткові функції після реєстрації, але спробувати можна безкоштовно. Є улюблений інструмент, якого не вистачає? Напишіть нам!
        </p>
      </>
    ),
  },
};

const LANGUAGES = ["en", "nl", "fr", "es", "de", "uk"];

export async function generateStaticParams() {
  return LANGUAGES.map((lang) => ({
    lang,
    slug: POST.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string; slug: string };
}): Promise<Metadata> {
  const { lang } = params;
  return {
    title: POST.title[lang as keyof typeof POST.title] || POST.title.en,
    description: "Top 10 gratis AI-tools voor juni 2025",
  };
}

export default async function Page({
  params,
}: {
  params: { lang: string; slug: string };
}) {
  const { lang, slug } = params;

  if (slug !== POST.slug || !LANGUAGES.includes(lang)) {
    notFound();
  }

  return (
    <main className="min-h-[60vh] flex flex-col items-center justify-center py-10 px-2">
      <article className="w-full max-w-2xl bg-white/90 rounded-2xl shadow-xl p-8 border border-white/40">
        <h1 className="text-3xl font-bold text-[#292968] mb-6">
          {POST.title[lang as keyof typeof POST.title]}
        </h1>
        <div className="prose prose-indigo max-w-none text-[#2a2954]">
          {POST.body[lang as keyof typeof POST.body]}
        </div>
      </article>
    </main>
  );
}