"use client";
import EmailForm from "./components/EmailForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <button 
        className="mb-8 px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-lg shadow-lg transition"
        onClick={() => window.location.href = '/contact'}
      >
        Contact
      </button>
      <EmailForm />
    </main>
  );
}
