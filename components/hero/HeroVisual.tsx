"use client";

import { m, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { CodeXml } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, type ReactNode } from "react";
import portrait from "@/assets/images/portrait.webp";
import { FigmaLogo } from "@/components/ui/BrandIcons";
import { TechIcon } from "@/components/ui/TechIcon";
import { cn, delay } from "@/lib/utils";

function useDepth(x: MotionValue<number>, y: MotionValue<number>, depth: number) {
  return { x: useTransform(x, (v) => v * depth), y: useTransform(y, (v) => v * depth) };
}

/**
 * Hero composition from the design: cut-out portrait whose head rises above a glowing neon ring,
 * with floating technology tiles around it.
 *
 * Every element stays inside the box, and on desktop the box sits flush with the right edge of the
 * content area, so the hero keeps equal left and right margins. The box is a CSS size container:
 * tiles are sized in cqw and scale with it, and the box is capped by the viewport height so the
 * hero always fits one screen. Mouse parallax runs on three depth layers; the group drifts on scroll.
 */
export function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 45, damping: 16, mass: 0.7 });
  const sy = useSpring(my, { stiffness: 45, damping: 16, mass: 0.7 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const drift = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 80]);

  const back = useDepth(sx, sy, -12);
  const person = useDepth(sx, sy, 8);
  const tiles = useDepth(sx, sy, 20);

  useEffect(() => {
    if (reduce || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, mx, my]);

  return (
    <div ref={ref} className="@container relative mx-auto aspect-square w-full max-w-[520px] lg:mr-0 lg:max-w-[min(640px,calc(100svh_-_104px))]">
      <m.div style={{ y: drift }} className="absolute inset-0">
        {/* Back layer: deep glow, faint grid and the neon ring */}
        <m.div style={back} className="absolute inset-0" aria-hidden="true">
          <div className="intro-fade absolute inset-0">
            <div className="absolute left-1/2 top-[56%] aspect-square h-[96%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(76_70_229/0.42),rgb(59_130_246/0.14)_42%,transparent_68%)]" />
            <div className="bg-grid absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_at_center,#000_22%,transparent_68%)]" />
            <NeonRing />
          </div>
        </m.div>

        {/* Portrait: fills most of the box height; the head rises above the top of the ring. */}
        <m.div style={person} className="absolute inset-y-0 left-[6%] right-[6%]">
          <div style={delay(150)} className="intro-fade h-full w-full">
            <Image
              src={portrait}
              alt="Portrait of M. Shakif Rabbani"
              priority
              sizes="(min-width: 1024px) 560px, 88vw"
              className="portrait-fade h-full w-full object-contain object-bottom drop-shadow-[0_0_38px_rgb(124_58_237/0.4)]"
            />
          </div>
        </m.div>

        {/* Floating technology tiles, kept clear of the face and shoulders */}
        <m.div style={tiles} className="pointer-events-none absolute inset-0" aria-hidden="true">
          <FloatTile className="left-[3%] top-[7%]" d={500} float="animate-float">
            <TechIcon name="react" className="size-[6cqw]" />
          </FloatTile>
          <FloatTile className="left-[-1%] top-[36%]" d={650} float="animate-float-slow">
            <TechIcon name="nodejs" className="size-[6cqw]" />
          </FloatTile>
          <FloatTile className="left-0 top-[64%]" d={800} float="animate-float">
            <TechIcon name="typescript" className="size-[5.2cqw]" />
          </FloatTile>
          <FloatTile className="right-[10%] top-[3%]" d={700} float="animate-float-slow">
            <FigmaLogo className="h-[6cqw] w-auto" />
          </FloatTile>
          <FloatTile className="right-0 top-[33%]" d={900} float="animate-float">
            <CodeXml className="size-[5.6cqw] text-accent-ink" strokeWidth={2} />
          </FloatTile>
        </m.div>
      </m.div>
    </div>
  );
}

/** Gradient neon ring. The halo pulses on its own compositor layer, and the ring slowly rotates its light. */
function NeonRing() {
  return (
    <div className="absolute left-1/2 top-[56%] aspect-square h-[75%] -translate-x-1/2 -translate-y-1/2">
      <div className="animate-spin-slow absolute inset-0">
        <svg viewBox="0 0 200 200" className="animate-ring-glow absolute inset-0 h-full w-full overflow-visible">
          <defs>
            <linearGradient id="hero-ring-halo" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#a78bfa" />
              <stop offset="0.5" stopColor="#6d28d9" />
              <stop offset="1" stopColor="#2563eb" />
            </linearGradient>
            <filter id="hero-ring-blur" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="6" />
            </filter>
          </defs>
          <circle cx="100" cy="100" r="88" fill="none" stroke="url(#hero-ring-halo)" strokeWidth="14" filter="url(#hero-ring-blur)" />
        </svg>
        <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full overflow-visible">
          <defs>
            <linearGradient id="hero-ring-core" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#c4b5fd" />
              <stop offset="0.35" stopColor="#7c3aed" />
              <stop offset="0.7" stopColor="#4f46e5" />
              <stop offset="1" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
          <circle cx="100" cy="100" r="88" fill="none" stroke="url(#hero-ring-core)" strokeWidth="6" />
          <circle cx="100" cy="100" r="88" fill="none" stroke="#ede9fe" strokeOpacity="0.55" strokeWidth="1.2" />
        </svg>
      </div>
    </div>
  );
}

function FloatTile({ children, className, d, float }: { children: ReactNode; className?: string; d: number; float: string }) {
  return (
    <div style={delay(d)} className={cn("intro-fade absolute grid", className)}>
      <div
        className={cn(
          "grid size-[12.5cqw] place-items-center rounded-[3.2cqw] border border-violet-400/30 bg-[#0b1024]/80 shadow-[0_0_30px_-6px_rgb(124_58_237/0.7),inset_0_1px_0_rgb(255_255_255/0.08)] backdrop-blur-md",
          float,
        )}
        style={{ animationDelay: `${-d * 3}ms` }}
      >
        {children}
      </div>
    </div>
  );
}
