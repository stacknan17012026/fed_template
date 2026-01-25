import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  pageExtensions: ["tsx", "ts", "jsx", "js"],
  poweredByHeader: false,
  compress: true,
  // Enable experimental features for caching
  experimental: {
    cacheComponents: false, // Set to true when ready for Cache Components in Next.js 16+
  },
};

export default nextConfig;
