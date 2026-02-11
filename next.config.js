/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  images: {
    domains: [
      "pocketbase.bigkuma.com",
      "rubic3.pocketbase.bigkuma.com",
      "picsum.photos",
      "images.unsplash.com",
      "103.109.0.214",
      "rubic3-pb.siy.app",
    ],
  },
  async redirects() {
    return [
      {
        source: "/about-us",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/company",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/career",
        destination: "/about?selected=careers",
        permanent: true,
      },
      {
        source: "/careers",
        destination: "/about?selected=careers",
        permanent: true,
      },
      {
        source: "/project",
        destination: "/works",
        permanent: true,
      },
      {
        source: "/projects",
        destination: "/works",
        permanent: true,
      },
      {
        source: "/work",
        destination: "/works",
        permanent: true,
      },
      {
        source: "/contact-us",
        destination: "/contact",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
