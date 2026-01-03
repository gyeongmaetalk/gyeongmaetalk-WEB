import type { NextConfig } from "next";

const s3BaseUrl = "https://auctiontalk-s3.s3.ap-northeast-2.amazonaws.com";

const nextConfig: NextConfig = {
  devIndicators: false,
  async rewrites() {
    return [
      {
        source: "/api/s3/:path*",
        destination: `${s3BaseUrl}/:path*`,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "auctiontalk-s3.s3.ap-northeast-2.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
