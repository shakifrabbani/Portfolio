"use client";

import variants from "./image-variants.json";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const table: Record<string, number[]> = variants;

/**
 * next/image loader for the static export. Picks the smallest pre-built copy of an image
 * (see scripts/image-variants.mjs) that still covers the width the browser asked for.
 * Images without copies get the original file; the query string keeps each srcset entry distinct
 * and is ignored by static hosts.
 */
export default function imageLoader({ src, width }: { src: string; width: number; quality?: number }) {
  const file = basePath && src.startsWith(basePath) ? src.slice(basePath.length) : src;
  const fit = table[file]?.find((w) => w >= width);
  if (fit) return `${basePath}${file.replace(/\.webp$/, `-w${fit}.webp`)}`;
  return `${src}?w=${width}`;
}
