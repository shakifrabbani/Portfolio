"use client";

import { m } from "framer-motion";
import { cn, EASE } from "@/lib/utils";

/** Gradient connector that draws across when scrolled into view, with a light pulse travelling along it. */
export function DrawLine({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute h-px bg-line", className)}>
      <m.div
        className="absolute inset-0 origin-left bg-gradient-to-r from-accent via-accent-blue to-accent-soft"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 1.6, ease: EASE }}
      />
      <span className="animate-flow absolute inset-0">
        <span className="absolute left-0 top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_12px_3px_rgb(155_140_255/0.9)]" />
      </span>
    </div>
  );
}
