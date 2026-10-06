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
 * floating technology tiles, and (on wide screens) a status widget and code card placed beside the photo,
 * never over it.
 *
 * The box is a CSS size container: tiles and cards are sized in cqw, so the whole composition scales as one
 * unit with the box. The box itself is capped by the viewport height so the hero always fits one screen.
 * Mouse parallax runs on four depth layers; the group drifts gently on scroll.
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
  const cards = useDepth(sx, sy, 30);

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
    <div ref={ref} className="@container relative mx-auto aspect-square w-full max-w-[520px] lg:max-w-[min(600px,calc(100svh_-_150px))]">
      <m.div style={{ y: drift }} className="absolute inset-0">
        {/* Back layer: deep glow, faint grid and the neon ring. Centred; shifts left on wide screens to make room for the cards. */}
        <m.div style={back} className="absolute inset-0" aria-hidden="true">
          <div className="intro-fade absolute inset-0">
            <div className="absolute left-1/2 top-[57%] aspect-square h-[88%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(76_70_229/0.42),rgb(59_130_246/0.14)_42%,transparent_68%)] min-[1440px]:left-[42%]" />
            <div className="bg-grid absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_at_center,#000_22%,transparent_68%)]" />
            <NeonRing />
          </div>
        </m.div>

        {/* Portrait: the head rises above the top of the ring, as in the design. */}
        <m.div style={person} className="absolute inset-y-0 left-[11%] right-[11%] min-[1440px]:left-[3%] min-[1440px]:right-[19%]">
          <div style={delay(150)} className="intro-fade h-full w-full">
            <Image
              src={portrait}
              alt="Portrait of M. Shakif Rabbani"
              priority
              sizes="(min-width: 1024px) 470px, 80vw"
              className="portrait-fade h-full w-full object-contain object-bottom drop-shadow-[0_0_38px_rgb(124_58_237/0.4)]"
            />
          </div>
        </m.div>

        {/* Floating technology tiles, kept clear of the face and shoulders */}
        <m.div style={tiles} className="pointer-events-none absolute inset-0" aria-hidden="true">
          <FloatTile className="left-[4%] top-[7%]" d={500} float="animate-float">
            <TechIcon name="react" className="size-[6cqw]" />
          </FloatTile>
          <FloatTile className="left-[-1%] top-[36%]" d={650} float="animate-float-slow">
            <TechIcon name="nodejs" className="size-[6cqw]" />
          </FloatTile>
          <FloatTile className="left-[1%] top-[63%]" d={800} float="animate-float">
            <TechIcon name="typescript" className="size-[5.2cqw]" />
          </FloatTile>
          <FloatTile className="right-[12%] top-[3%] min-[1440px]:right-[22%]" d={700} float="animate-float-slow">
            <FigmaLogo className="h-[6cqw] w-auto" />
          </FloatTile>
          <FloatTile className="right-0 top-[33%] min-[1440px]:right-[7%]" d={900} float="animate-float">
            <CodeXml className="size-[5.6cqw] text-accent-ink" strokeWidth={2} />
          </FloatTile>
        </m.div>

        {/* Status widget and code card: only on wide screens, in the free space right of the photo. */}
        <m.div style={cards} className="pointer-events-none absolute inset-0">
          <BuildingWidget />
          <CodeCard />
        </m.div>
      </m.div>
    </div>
  );
}

/** Gradient neon ring. The halo pulses on its own compositor layer, and the ring slowly rotates its light. */
function NeonRing() {
  return (
    <div className="absolute left-1/2 top-[57%] aspect-square h-[66%] -translate-x-1/2 -translate-y-1/2 min-[1440px]:left-[42%]">
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

const solutions = [
  { label: "Web Applications", tone: "bg-success" },
  { label: "Mobile Applications", tone: "bg-success" },
  { label: "Business Systems", tone: "bg-accent-soft" },
  { label: "API Development", tone: "bg-accent-blue" },
];

function BuildingWidget() {
  return (
    <div style={delay(1000)} className="intro absolute left-[82%] top-[1%] hidden w-[29cqw] min-[1440px]:block" aria-hidden="true">
      <div className="rounded-[2.6cqw] border border-white/10 bg-surface/75 p-[2.3cqw] shadow-[0_24px_50px_-24px_rgb(0_0_0/0.95)] backdrop-blur-md">
        <p className="text-[1.65cqw] font-medium uppercase tracking-[0.14em] text-fg-3">Building</p>
        <p className="mt-[0.3cqw] text-[2.1cqw] font-semibold text-fg">Modern Solutions</p>
        <ul className="mt-[1.8cqw] space-y-[1.1cqw]">
          {solutions.map((item, i) => (
            <li key={item.label} className="flex items-center gap-[1.4cqw] text-[1.9cqw] text-fg-2">
              <span className="relative grid size-[1.4cqw] place-items-center">
                <span className={cn("animate-ping-soft absolute inset-0 rounded-full", item.tone)} style={{ animationDelay: `${i * 450}ms` }} />
                <span className={cn("relative size-[1.4cqw] rounded-full", item.tone)} />
              </span>
              {item.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function CodeCard() {
  return (
    <div style={delay(1150)} className="intro absolute bottom-[4%] left-[82%] hidden w-[39cqw] min-[1440px]:block" aria-hidden="true">
      <div className="overflow-hidden rounded-[2.6cqw] border border-violet-400/25 bg-[#0b0f1d]/90 shadow-[0_30px_60px_-28px_rgb(0_0_0/1),0_0_32px_-12px_rgb(124_58_237/0.6)] backdrop-blur-md">
        <div className="flex items-center gap-[1cqw] border-b border-white/[0.06] px-[2.3cqw] py-[1.7cqw]">
          <span className="size-[1.7cqw] rounded-full bg-[#ff5f57]" />
          <span className="size-[1.7cqw] rounded-full bg-[#febc2e]" />
          <span className="size-[1.7cqw] rounded-full bg-[#28c840]" />
          <span className="ml-[1.4cqw] font-mono text-[1.7cqw] text-fg-3">developer.ts</span>
        </div>
        <pre className="px-[2.4cqw] py-[2.2cqw] font-mono text-[1.9cqw] leading-[1.75]">
          <code>
            <span className="text-[#c792ea]">const</span> <span className="text-[#82aaff]">developer</span> <span className="text-fg-3">=</span>{" "}
            <span className="text-fg-2">{"{"}</span>
            {"\n"}
            {"  "}
            <span className="text-[#89ddff]">role</span>
            <span className="text-fg-3">:</span> <span className="text-[#f78c6c]">&quot;Software Engineer&quot;</span>
            <span className="text-fg-3">,</span>
            {"\n"}
            {"  "}
            <span className="text-[#89ddff]">focus</span>
            <span className="text-fg-3">:</span> <span className="text-[#f78c6c]">&quot;Full Stack&quot;</span>
            <span className="text-fg-3">,</span>
            {"\n"}
            {"  "}
            <span className="text-[#89ddff]">passion</span>
            <span className="text-fg-3">:</span> <span className="text-[#f78c6c]">&quot;Building Products&quot;</span>
            <span className="text-fg-3">,</span>
            {"\n"}
            {"  "}
            <span className="text-[#89ddff]">status</span>
            <span className="text-fg-3">:</span> <span className="text-[#c3e88d]">&quot;Available&quot;</span>
            {"\n"}
            <span className="text-fg-2">{"}"}</span>
            <span className="animate-blink ml-0.5 inline-block h-[1.05em] w-[0.5em] translate-y-[0.18em] bg-accent-soft" />
          </code>
        </pre>
      </div>
    </div>
  );
}
