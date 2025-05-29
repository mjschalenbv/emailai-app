"use client";
import EmailForm from "./components/EmailForm";
import Link from "next/link"; // Gebruik Link voor betere UX

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-2xl flex flex-col items-center">
        <Link href="/contact">
          <button
            className="mb-8 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-lg font-semibold shadow-lg transition-all duration-200"
            type="button"
          >
            Contact & Support
          </button>
        </Link>

        <Link href="/social-post">
          <button
            className="mb-8 px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-lg font-semibold shadow-lg transition-all duration-200"
            type="button"
          >
            Generate Social Post
          </button>
        </Link>

        <EmailForm />
      </div>
    </main>
  );
}
