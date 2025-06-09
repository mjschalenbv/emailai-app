"use client";
import React from "react";
import Link from "next/link";
import SocialPostForm from "../components/SocialPostForm";

export default function SocialPostPage() {
  return (
    <main className="min-h-screen flex flex-col items-center bg-[#181929] py-10 relative">
      {/* Background effect */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute left-[-18vw] top-[8vh] w-[36vw] h-[36vw] rounded-full bg-fuchsia-800/30 blur-3xl opacity-40 animate-pulse-slow"></div>
        <div className="absolute right-[-12vw] bottom-[8vh] w-[32vw] h-[32vw] rounded-full bg-indigo-700/30 blur-2xl opacity-45 animate-pulse-slower"></div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] max-w-5xl bg-gradient-to-br from-indigo-800/10 via-purple-700/10 to-blue-900/10 blur-2xl rounded-full opacity-35"></div>
      </div>

      <section className="relative z-10 w-full flex flex-col items-center">
        <div className="w-full flex flex-col items-center max-w-2xl mx-auto px-2 sm:px-0">
          <Link
            href="/"
            className="text-indigo-300 hover:text-fuchsia-400 text-sm font-semibold mb-2 mt-2 hover:underline transition"
          >
            ← Back to Home
          </Link>
          <h1 className="text-3xl sm:text-5xl font-extrabold bg-gradient-to-r from-indigo-200 via-purple-300 to-fuchsia-400 bg-clip-text text-transparent drop-shadow-2xl text-center leading-tight">
            Viral X Post Generator
          </h1>
          <p className="text-base sm:text-lg text-indigo-100 mt-3 text-center max-w-xl">
            Instantly generate viral meme coin tweets and X posts.<br />
            <span className="font-bold text-white">100% free. No account needed.</span>
          </p>
        </div>

        {/* Hier komt je grote formulier! */}
        <div
          className="
            w-full
            max-w-full
            sm:max-w-2xl
            md:max-w-3xl
            bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-3xl
            p-4 sm:p-8 mt-8
            animate-fade-in
          "
        >
          <SocialPostForm />
        </div>
      </section>
    </main>
  );
}
