/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
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
