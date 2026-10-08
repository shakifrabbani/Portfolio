import type { NextConfig } from "next";

/**
 * Static export so the site can be hosted on GitHub Pages (or any static host).
 * NEXT_PUBLIC_BASE_PATH is "/Portfolio" in the GitHub Pages workflow and empty locally.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  reactStrictMode: true,
  images: { unoptimized: true },
  // Hide the "N" dev-tools button `next dev` draws in the corner. Compile and runtime errors still show.
  devIndicators: false,
};

export default nextConfig;
