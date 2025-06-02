/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
  },
  async redirects() {
    return [
      // .nl naar .ai
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
      // .fr naar .ai
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
      // .be naar .ai
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
      // .es naar .ai
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
      // ENKEL www.emailai.ai → emailai.ai (let op, niet andersom)
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
