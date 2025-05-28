import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";

export default function ContactForm() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4 py-10">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md md:max-w-lg flex flex-col gap-5">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">
          Contact EmailAI Support
        </h2>
        <p className="text-center text-gray-600 mb-4">
          Questions or feedback? Fill out the form or email us directly.
        </p>
        <form className="flex flex-col gap-4">
          <input
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400 text-gray-800"
            type="text"
            placeholder="Your name"
            required
          />
          <input
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400 text-gray-800"
            type="email"
            placeholder="Your email"
            required
          />
          <textarea
            className="border rounded-lg px-4 py-2 h-28 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400 text-gray-800 resize-none"
            placeholder="Your message"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
          >
            Send message
          </button>
        </form>
        <div className="text-center mt-2">
          <span className="text-gray-500 text-sm">
            Or email us directly at{" "}
            <a
              href="mailto:info@emailai.nl"
              className="text-blue-600 hover:underline font-medium"
            >
              info@emailai.nl
            </a>
          </span>
        </div>
        <div className="flex gap-8 justify-center mt-4">
          <a
            href="https://www.facebook.com/emailai.nl/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 text-2xl"
            aria-label="Facebook"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://www.instagram.com/emailai_NL/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-500 hover:text-pink-700 text-2xl"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
          <a
            href="https://x.com/EmailAI_NL"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-gray-600 text-2xl"
            aria-label="X (Twitter)"
          >
            <FaXTwitter />
          </a>
        </div>
      </div>
    </div>
  );
}
