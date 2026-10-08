"use client";

import { m, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState, useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

type Variant = "default" | "link" | "project";

const FINE_POINTER = "(hover: hover) and (pointer: fine)";
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const queries = [window.matchMedia(FINE_POINTER), window.matchMedia(REDUCED_MOTION)];
  queries.forEach((q) => q.addEventListener("change", onChange));
  return () => queries.forEach((q) => q.removeEventListener("change", onChange));
}
const canUseCursor = () => window.matchMedia(FINE_POINTER).matches && !window.matchMedia(REDUCED_MOTION).matches;
const serverSnapshot = () => false;

/**
 * Two-layer cursor (dot + trailing ring), desktop only.
 * Never mounts on touch devices or for reduced-motion users, and only hides the native cursor once it is running.
 */
export function CustomCursor() {
  const enabled = useSyncExternalStore(subscribe, canUseCursor, serverSnapshot);
  const [variant, setVariant] = useState<Variant>("default");
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  // Critically damped and light: the ring settles in about 75 ms, so it keeps up with the pointer with only a hint of trail.
  const ringX = useSpring(x, { stiffness: 700, damping: 27, mass: 0.25 });
  const ringY = useSpring(y, { stiffness: 700, damping: 27, mass: 0.25 });

  useEffect(() => {
    if (!enabled) return;

    const root = document.documentElement;
    root.classList.add("has-cursor");

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const target = e.target instanceof Element ? e.target : null;
      if (target?.closest('[data-cursor="project"]')) setVariant("project");
      else if (target?.closest('a, button, [role="button"], summary, label')) setVariant("link");
      else setVariant("default");
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      root.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const ringSize = variant === "project" ? 104 : variant === "link" ? 46 : 34;

  return (
    <div aria-hidden="true" className={cn("pointer-events-none fixed inset-0 z-[100] transition-opacity duration-300", visible ? "opacity-100" : "opacity-0")}>
      <m.div className="absolute left-0 top-0 will-change-transform" style={{ x: ringX, y: ringY }}>
        <m.div
          className={cn(
            "-translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full border",
            variant === "project"
              ? "border-accent-soft/50 bg-accent/85 shadow-[0_10px_40px_-8px_rgb(108_99_255/0.8)]"
              : variant === "link"
                ? "border-accent-soft/60 bg-accent/10"
                : "border-white/25 bg-transparent",
          )}
          animate={{ width: ringSize, height: ringSize }}
          transition={{ type: "spring", stiffness: 600, damping: 40, mass: 0.5 }}
        >
          {variant === "project" && <span className="text-[11px] font-semibold tracking-wide text-white">View Project</span>}
        </m.div>
      </m.div>
      <m.div className="absolute left-0 top-0 will-change-transform" style={{ x, y }}>
        <div className={cn("size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white transition-opacity duration-200", variant === "project" && "opacity-0")} />
      </m.div>
    </div>
  );
}
