import { clsx, type ClassValue } from "clsx";
import type { CSSProperties } from "react";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Prefix a root-relative asset path with the deploy base path (GitHub Pages serves the site under /Portfolio). */
export function withBasePath(path: string) {
  if (/^(https?:|mailto:|tel:|#)/.test(path)) return path;
  return `${BASE_PATH}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Shared easing curve: smooth, slow-out, no bounce. */
export const EASE = [0.22, 1, 0.36, 1] as const;

/** Inline animation delay for CSS intro classes, e.g. style={delay(120)}. */
export function delay(ms: number): CSSProperties {
  return { "--d": `${ms}ms` } as CSSProperties;
}
