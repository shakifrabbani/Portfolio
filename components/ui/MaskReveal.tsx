"use client";

import { m } from "framer-motion";
import type { ReactNode } from "react";
import { cn, EASE } from "@/lib/utils";

/** Slides text up from behind a mask when it enters the viewport. */
export function MaskReveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <span className={cn("inline-block overflow-hidden align-bottom", className)}>
      <m.span
        data-reveal=""
        className="inline-block"
        initial={{ y: "110%" }}
        whileInView={{ y: "0%" }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.9, delay, ease: EASE }}
      >
        {children}
      </m.span>
    </span>
  );
}
