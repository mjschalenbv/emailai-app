"use client";
import EmailForm from "./components/EmailForm";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-start bg-[#181929] relative overflow-x-hidden pb-14">
      {/* Floating neon background blobs */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute left-[-18vw] top-[8vh] w-[36vw] h-[36vw] rounded-full bg-indigo-800/40 blur-3xl opacity-70 animate-pulse-slow"></div>
        <div className="absolute right-[-15vw] bottom-[6vh] w-[32vw] h-[32vw] rounded-full bg-purple-900/40 blur-2xl opacity-60 animate-pulse-slower"></div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] h-[95vw] max-w-4xl bg-gradient-to-br from-indigo-900/20 via-purple-800/10 to-blue-800/10 blur-2xl rounded-full opacity-45"></div>
      </div>

      {/* Hero-section */}
<section className="relative z-10 w-full flex flex-col items-center pt-8 sm:pt-14">
        <h1 className="text-4xl sm:text-6xl font-extrabold bg-gradient-to-r from-indigo-300 via-purple-400 to-blue-300 bg-clip-text text-transparent drop-shadow-2xl mb-6 text-center leading-tight animate-fade-in">
          Write emails <span className="text-purple-300">in seconds</span> <br className="hidden sm:block"/>
          with <span className="font-black text-indigo-200">EmailAI</span>
        </h1>
        <p className="max-w-2xl text-center text-slate-200 font-mono mb-10 text-lg sm:text-2xl animate-fade-in [animation-delay:0.2s]">
          Generate flawless emails, replies & newsletters with AI.<br />
          Impress, save time, communicate smarter – all in one click.
        </p>
        {/* Dit is nu de SOCIAL POST CTA! */}
        <a
          href="/social-post"
          className="inline-block px-10 py-4 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-blue-400 hover:from-indigo-600 hover:to-purple-700 shadow-2xl text-white text-lg sm:text-xl font-bold tracking-wide transition-all duration-200 scale-100 hover:scale-105 active:scale-95 animate-fade-in [animation-delay:0.4s]"
          aria-label="Generate Social Post"
        >
          🚀 Generate Social Post
        </a>
      </section>

      {/* Main glass-card met email form */}
      <section id="emailform" className="z-10 w-full flex flex-col items-center px-2 sm:px-4 mt-14">
        <div
          className="
            w-full max-w-2xl md:max-w-3xl xl:max-w-4xl
            bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-3xl
            p-4 sm:p-8
            animate-fade-in
          "
          style={{
            boxShadow: "0 8px 64px 0 rgba(70,50,200,0.18)",
          }}
        >
          {/* Zet je EmailForm of tab-component hier */}
          <EmailForm />
        </div>
      </section>
    </main>
  );
}
