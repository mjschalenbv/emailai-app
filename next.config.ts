/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
  },
  async redirects() {
    return [
      // Redirect www.emailai.ai → emailai.ai (nooit andersom!)
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.emailai.ai" }],
        destination: "https://emailai.ai/:path*",
        permanent: true,
      },
      // Redirect .nl → .ai
      {
        source: "/:path*",
        has: [{ type: "host", value: "emailai.nl" }],
        destination: "https://emailai.ai/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.emailai.nl" }],
        destination: "https://emailai.ai/:path*",
        permanent: true,
      },
      // Redirect .fr → .ai
      {
        source: "/:path*",
        has: [{ type: "host", value: "emailai.fr" }],
        destination: "https://emailai.ai/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.emailai.fr" }],
        destination: "https://emailai.ai/:path*",
        permanent: true,
      },
      // Redirect .be → .ai
      {
        source: "/:path*",
        has: [{ type: "host", value: "emailai.be" }],
        destination: "https://emailai.ai/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.emailai.be" }],
        destination: "https://emailai.ai/:path*",
        permanent: true,
      },
      // Redirect .es → .ai
      {
        source: "/:path*",
        has: [{ type: "host", value: "emailai.es" }],
        destination: "https://emailai.ai/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.emailai.es" }],
        destination: "https://emailai.ai/:path*",
        permanent: true,
      },
      // (NOOIT emailai.ai naar zichzelf laten redirecten)
    ];
  },
};

module.exports = nextConfig;
