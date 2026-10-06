"use client";

import { useEffect } from "react";

/**
 * One delegated pointer listener for the whole page instead of a handler per card.
 * Writes --mx/--my (spotlight position) and --px/--py (normalised parallax offset) on the hovered card.
 */
export function PointerEffects() {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let frame = 0;
    let last: PointerEvent | null = null;

    const update = () => {
      frame = 0;
      if (!last) return;
      const target = last.target instanceof Element ? last.target.closest<HTMLElement>(".spotlight") : null;
      if (!target) return;
      const rect = target.getBoundingClientRect();
      const x = last.clientX - rect.left;
      const y = last.clientY - rect.top;
      target.style.setProperty("--mx", `${x}px`);
      target.style.setProperty("--my", `${y}px`);
      target.style.setProperty("--px", (x / rect.width - 0.5).toFixed(3));
      target.style.setProperty("--py", (y / rect.height - 0.5).toFixed(3));
    };

    const onMove = (e: PointerEvent) => {
      last = e;
      if (!frame) frame = requestAnimationFrame(update);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
