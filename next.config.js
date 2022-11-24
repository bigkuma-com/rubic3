/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["pocketbase.bigkuma.com"],
  },
};

module.exports = nextConfig;
