"use client";
import EmailForm from "./components/EmailForm";
import Link from "next/link";

export default function Page() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-start bg-[#181929] relative overflow-x-hidden pb-14">
      {/* Background blobs for extra SaaS effect */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute left-[-18vw] top-[8vh] w-[36vw] h-[36vw] rounded-full bg-indigo-700/40 blur-3xl opacity-60 animate-pulse-slow"></div>
        <div className="absolute right-[-14vw] bottom-[6vh] w-[32vw] h-[32vw] rounded-full bg-purple-900/40 blur-2xl opacity-60 animate-pulse-slower"></div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] h-[95vw] max-w-5xl bg-gradient-to-br from-indigo-900/25 via-purple-700/10 to-blue-900/10 blur-2xl rounded-full opacity-45"></div>
      </div>

      {/* HERO */}
      <section className="relative z-10 w-full flex flex-col items-center pt-10 sm:pt-14 md:pt-20 px-2 sm:px-0">
        <h1 className="max-w-3xl mx-auto text-center font-extrabold text-3xl sm:text-5xl md:text-6xl leading-tight md:leading-snug tracking-tight animate-fade-in">
          All-in-one AI for
          <span
            className="
              block 
              w-full 
              mt-2 mx-auto
              text-[clamp(2rem,4vw,3.6rem)]
              font-extrabold
              rounded-2xl
              bg-gradient-to-r from-fuchsia-600 via-indigo-600 to-purple-500
              px-3 sm:px-5 py-2
              text-white
              shadow-lg
              whitespace-pre-line
              leading-tight
              "
          >
            Emails, Newsletters & Viral X Posts
          </span>
        </h1>
        <p className="max-w-xl mx-auto mt-6 text-center text-base sm:text-lg md:text-xl text-slate-200 font-sans animate-fade-in [animation-delay:0.15s]">
          Instantly create flawless emails, replies, newsletters & viral tweets.<br />
          <span className="font-bold text-white mt-2 block">
            Free & instant – no account needed.
          </span>
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8 animate-fade-in [animation-delay:0.3s]">
          <Link
            href="/social-post"
            className="
              inline-block px-8 py-4 rounded-2xl
              bg-gradient-to-tr from-indigo-500 via-fuchsia-500 to-purple-500
              shadow-2xl text-white text-lg sm:text-xl font-bold tracking-wide
              transition-all duration-200 scale-100 hover:scale-105 active:scale-95
              animate-pulse
              sm:animate-pulse
              [@media(max-width:639px)]:animate-none
            "
            aria-label="Viral X Post Generator"
          >
            🚀 Viral X Post Generator
          </Link>
          <span className="text-indigo-200/70 font-semibold">or</span>
          <Link
            href="#emailform"
            className="
              inline-block px-7 py-3 rounded-2xl bg-white/80 text-indigo-900 font-semibold
              border border-indigo-100/30 shadow hover:bg-indigo-50 hover:text-purple-700
              transition-all text-lg tracking-tight
            "
          >
            Email & Newsletter Tools
          </Link>
        </div>
      </section>

      {/* MAIN EMAIL FORM */}
      <section id="emailform" className="z-10 w-full flex flex-col items-center px-2 sm:px-4 mt-10">
        <div
          className="
            w-full max-w-full md:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl
            bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-3xl
            p-4 sm:p-8 animate-fade-in
          "
          style={{
            boxShadow: "0 8px 64px 0 rgba(70,50,200,0.18)",
          }}
        >
          <EmailForm />
        </div>
      </section>
    </main>
  );
}
