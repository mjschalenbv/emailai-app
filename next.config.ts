/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
  },
  async redirects() {
    return [
      // NL
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
      // FR
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
      // ES
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
      // Alleen www.emailai.ai → emailai.ai (en niet andersom!)
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.emailai.ai" }],
        destination: "https://emailai.ai/:path*",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
