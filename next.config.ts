import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    reactCompiler: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

if (process.env.NODE_ENV === "development") {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { setupDevPlatform } = require("@cloudflare/next-on-pages/next-dev");
  setupDevPlatform();
}

export default nextConfig;
