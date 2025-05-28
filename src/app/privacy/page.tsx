import { Mail, Facebook, Instagram, Twitter } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-12">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-2xl">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-8 text-center text-gray-900">Privacy Policy</h1>

        <p className="mb-8 text-gray-700 text-base md:text-lg text-center">
          At <span className="font-bold">EmailAI.nl</span>, your privacy is our top priority.
          We are committed to keeping your personal data safe and collecting as little information as possible.
        </p>

        <Section>
          <SectionTitle>How does EmailAI work?</SectionTitle>
          <p className="text-gray-700 mb-0">
            EmailAI helps you generate emails and newsletters using AI (powered by the ChatGPT API from OpenAI).
            The text you provide to generate an email or reply is sent directly and securely to the OpenAI API.
            <span className="font-semibold text-gray-900"> EmailAI does not store, log, or analyze the content of your emails or prompts.</span>
          </p>
        </Section>

        <Section>
          <SectionTitle>What data do we collect?</SectionTitle>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>
              <span className="font-semibold text-gray-900">EmailAI does not collect or store any personal data</span> through the Chrome extension or website forms (unless you actively send us a message).
            </li>
            <li>
              We use <span className="font-semibold text-gray-900">anonymous visitor analytics</span> (Vercel Analytics) to understand how many people use our site and which pages are popular. These analytics are anonymous and cannot be traced back to individual users.
            </li>
          </ul>
        </Section>

        <Section>
          <SectionTitle>How do we use this data?</SectionTitle>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>
              We only use anonymous analytics to improve our website and extension.
            </li>
            <li>
              <span className="font-semibold text-gray-900">We never sell, share, or use personal data for marketing purposes.</span>
            </li>
          </ul>
        </Section>

        <Section>
          <SectionTitle>Third-party Services</SectionTitle>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>
              <span className="font-semibold text-gray-900">AI Generation:</span> All content you generate with EmailAI is processed in real time by OpenAI’s ChatGPT API. For more information about how OpenAI handles your data, please see their{' '}
              <a
                href="https://openai.com/policies/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline font-medium"
              >
                privacy policy
              </a>.
            </li>
            <li>
              <span className="font-semibold text-gray-900">Analytics:</span> We use Vercel Analytics for basic, anonymous website statistics. See{' '}
              <a
                href="https://vercel.com/legal/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline font-medium"
              >
                Vercel’s privacy policy
              </a>{' '}
              for details.
            </li>
          </ul>
        </Section>

        <Section>
          <SectionTitle>Your Rights</SectionTitle>
          <p className="text-gray-700">
            If you have questions or would like to request deletion of data you have shared with us (for example, by contacting us via email), please reach out at{' '}
            <a href="mailto:info@emailai.nl" className="text-blue-600 hover:underline font-medium">
              info@emailai.nl
            </a>
            .
          </p>
        </Section>

        <Section>
          <SectionTitle>Contact</SectionTitle>
          <p className="text-gray-700 mb-2">
            For any privacy-related questions, please contact us at{' '}
            <a
              href="mailto:info@emailai.nl"
              className="text-blue-600 hover:underline inline-flex items-center font-medium"
            >
              <Mail className="w-4 h-4 mr-1 inline" aria-label="Mail" /> info@emailai.nl
            </a>{' '}
            or via our{' '}
            <a href="/contact" className="text-blue-600 hover:underline font-medium">
              contact page
            </a>
            .
          </p>
        </Section>

        {/* Socials */}
        <div className="flex items-center gap-6 mt-8 mb-2 justify-center">
          <a
            href="https://instagram.com/emailai_NL"
            className="text-gray-400 hover:text-pink-500 transition"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <Instagram className="w-7 h-7" />
          </a>
          <a
            href="https://www.facebook.com/emailai.nl/"
            className="text-gray-400 hover:text-blue-700 transition"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <Facebook className="w-7 h-7" />
          </a>
          <a
            href="https://x.com/EmailAI_NL"
            className="text-gray-400 hover:text-black transition"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X (Twitter)"
          >
            <Twitter className="w-7 h-7" />
          </a>
        </div>

        {/* Policy statement */}
        <p className="mt-7 italic text-gray-600 text-sm text-center">
          We never know who you are — we only see anonymous, general statistics.<br />
          <span className="not-italic">EmailAI will always put your privacy first.</span>
        </p>
        <p className="mt-3 text-gray-400 text-xs text-center">
          This policy may be updated in the future.<br />
          Last updated: <span className="tabular-nums">May 28, 2025</span>
        </p>
      </div>
    </div>
  );
}

// Section with consistent spacing
function Section({ children }: { children: React.ReactNode }) {
  return (
    <section className="mb-8 last:mb-4">{children}</section>
  );
}

// Section title with style
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-lg font-semibold text-gray-900 mb-2 mt-0 tracking-wide">
      {children}
    </h2>
  );
}
