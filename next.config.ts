import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.momentbook.app",
      },
      {
        protocol: "https",
        hostname: "yourthink.s3.ap-northeast-2.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
