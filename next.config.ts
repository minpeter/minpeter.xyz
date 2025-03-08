import { createMDX } from "fumadocs-mdx/next";

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const withMDX = createMDX();

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    mdxRs: true,
    // Trade off FCP, LCP and TTFB
    inlineCss: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "user-images.githubusercontent.com",
        port: "",
        pathname: "/**/*",
      },
    ],
  },
};

export default withBundleAnalyzer(withMDX(nextConfig));
