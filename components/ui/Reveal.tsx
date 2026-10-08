"use client";

import { m } from "framer-motion";
import type { ReactNode } from "react";
import { EASE } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  amount?: number;
};

/** Fades and lifts content into view once. Framer's MotionConfig turns the motion off for reduced-motion users. */
export function Reveal({ children, className, delay = 0, y = 18, amount = 0.2 }: RevealProps) {
  return (
    <m.div
      data-reveal=""
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.5, delay, ease: EASE }}
    >
      {children}
    </m.div>
  );
}

/** Container that staggers its <StaggerItem> children as it enters the viewport. */
export function Stagger({
  children,
  className,
  delay = 0,
  stagger = 0.06,
  amount = 0.15,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
  amount?: number;
}) {
  return (
    <m.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {children}
    </m.div>
  );
}

export function StaggerItem({ children, className, y = 14 }: { children: ReactNode; className?: string; y?: number }) {
  return (
    <m.div
      data-reveal=""
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
      }}
    >
      {children}
    </m.div>
  );
}
