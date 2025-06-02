/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
  },
  async redirects() {
    return [
      // Alle niet-hoofddomeinen redirecten naar https://emailai.ai

      // NL
      {
        source: "/:path*",
        has: [{ type: "host", value: "^(www\\.)?emailai\\.nl$" }],
        destination: "https://emailai.ai/:path*",
        permanent: true,
      },
      // FR
      {
        source: "/:path*",
        has: [{ type: "host", value: "^(www\\.)?emailai\\.fr$" }],
        destination: "https://emailai.ai/:path*",
        permanent: true,
      },
      // ES
      {
        source: "/:path*",
        has: [{ type: "host", value: "^(www\\.)?emailai\\.es$" }],
        destination: "https://emailai.ai/:path*",
        permanent: true,
      },
      // (GEEN redirect van www.emailai.ai naar emailai.ai – dat doet Vercel al!)

      // Optioneel: Redirect http://emailai.ai naar https://emailai.ai, maar Vercel forceert standaard al HTTPS
    ];
  },
};

module.exports = nextConfig;
