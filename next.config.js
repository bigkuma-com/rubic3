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
    ],
  },
};

module.exports = nextConfig;
