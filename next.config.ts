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
  // The export cannot resize images on request, so a custom loader serves pre-built smaller copies of the
  // posters (scripts/image-variants.mjs). deviceSizes match those copies, so each srcset entry maps to a real file.
  images: {
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
    deviceSizes: [640, 960, 1280, 1920],
    imageSizes: [384],
  },
  // Hide the "N" dev-tools button `next dev` draws in the corner. Compile and runtime errors still show.
  devIndicators: false,
};

export default nextConfig;
