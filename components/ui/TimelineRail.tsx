"use client";

import { m, useScroll, useSpring } from "framer-motion";
import { useRef, type ReactNode } from "react";

/** Vertical timeline whose line fills as the visitor scrolls through it. */
export function TimelineRail({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <div ref={ref} className="relative">
      <div aria-hidden="true" className="absolute bottom-6 left-[7.5px] top-3 w-px bg-line md:left-[152px]">
        <m.div style={{ scaleY }} className="h-full w-full origin-top bg-gradient-to-b from-accent via-accent-blue to-accent-soft" />
      </div>
      {children}
    </div>
  );
}
