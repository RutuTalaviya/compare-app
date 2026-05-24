import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "admin.compareuniverse.com",
      },
      {
        protocol: "https",
        hostname: "www.apple.com",
      },
    ],
  },
};

export default nextConfig;