import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "daccwssnzrlpqbmsixmr.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
    unoptimized: true
  },
  experimental: {}
};

export default nextConfig;

