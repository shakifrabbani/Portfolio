"use client";

import { useEffect } from "react";

/**
 * Home sections below the first screen start with `content-visibility: auto` (globals.css), so the first screen
 * renders sooner. Until rendered, those sections only have estimated heights, which would send anchor jumps to
 * the wrong place. So every section is rendered for real (`data-sections="all"` on <html>) shortly after load,
 * while the visitor reads the hero, or straight away on back/forward navigation. Links opened with a #hash and
 * anchor clicks are covered from first paint by the inline script in app/layout.tsx.
 */
export function RenderAllSections() {
  useEffect(() => {
    const root = document.documentElement;
    if (root.dataset.sections === "all") return;

    let timer = 0;
    let idle = 0;
    const cleanup = () => {
      window.clearTimeout(timer);
      if (idle) window.cancelIdleCallback(idle);
      window.removeEventListener("hashchange", renderAll);
      window.removeEventListener("popstate", renderAll);
    };
    function renderAll() {
      root.dataset.sections = "all";
      cleanup();
    }

    timer = window.setTimeout(() => {
      if ("requestIdleCallback" in window) idle = window.requestIdleCallback(renderAll, { timeout: 1500 });
      else renderAll();
    }, 1500);
    window.addEventListener("hashchange", renderAll);
    window.addEventListener("popstate", renderAll);
    return cleanup;
  }, []);

  return null;
}
