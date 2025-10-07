/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your other Next.js configuration settings go here
  // e.g., reactStrictMode: true, compiler: { ... }, images: { ... }

  // ⭐️ CRITICAL SETTING for Docker Standalone Mode ⭐️
  output: 'standalone',
};

module.exports = nextConfig;