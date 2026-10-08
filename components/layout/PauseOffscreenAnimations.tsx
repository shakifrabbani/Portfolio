"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Marks page sections that are scrolled out of view with `data-offscreen`, which pauses their looping CSS
 * animations (see globals.css), so the browser only animates what can be seen. Re-runs on client navigation.
 */
export function PauseOffscreenAnimations() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const sections = document.querySelectorAll<HTMLElement>("main section, footer");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) entry.target.toggleAttribute("data-offscreen", !entry.isIntersecting);
      },
      // Start animating a little before a section scrolls in.
      { rootMargin: "200px 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => {
      observer.disconnect();
      sections.forEach((section) => section.removeAttribute("data-offscreen"));
    };
  }, [pathname]);

  return null;
}
