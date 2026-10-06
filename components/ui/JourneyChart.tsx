"use client";

import { m } from "framer-motion";
import { EASE } from "@/lib/utils";

const LINE = "M6 92 C 40 88, 60 70, 92 72 S 140 50, 170 46 S 220 20, 254 12";

/** Growth line that draws itself on scroll, ending in a glowing point. Decorative. */
export function JourneyChart() {
  return (
    <svg viewBox="0 0 260 100" className="h-full w-full overflow-visible" aria-hidden="true">
      <defs>
        <linearGradient id="journey-stroke" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#6c63ff" stopOpacity="0.2" />
          <stop offset="0.6" stopColor="#6c63ff" />
          <stop offset="1" stopColor="#4f8cff" />
        </linearGradient>
        <linearGradient id="journey-fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#6c63ff" stopOpacity="0.25" />
          <stop offset="1" stopColor="#6c63ff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <m.path
        d={`${LINE} L254 100 L6 100 Z`}
        fill="url(#journey-fill)"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 1.2, delay: 0.6, ease: EASE }}
      />
      <m.path
        d={LINE}
        fill="none"
        stroke="url(#journey-stroke)"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 1.8, ease: EASE }}
      />
      <m.g
        initial={{ opacity: 0, scale: 0.4 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6, delay: 1.5, ease: EASE }}
        style={{ transformOrigin: "254px 12px" }}
      >
        <circle cx="254" cy="12" r="10" fill="#4f8cff" opacity="0.25" />
        <circle cx="254" cy="12" r="4.5" fill="#cfd5ff" />
      </m.g>
    </svg>
  );
}
