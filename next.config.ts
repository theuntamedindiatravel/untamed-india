import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['leisa-marshlike-unphonnetically.ngrok-free.dev'],
  images: {
    // Homepage photography (lib/home.ts) is served from Unsplash's CDN.
    remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' }],
  },
};

export default nextConfig;
