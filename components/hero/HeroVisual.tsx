"use client";

import { m, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { CodeXml } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, type ReactNode } from "react";
import portrait from "@/assets/images/portrait.webp";
import { TechIcon } from "@/components/ui/TechIcon";
import { cn, delay } from "@/lib/utils";

function useDepth(x: MotionValue<number>, y: MotionValue<number>, depth: number) {
  return { x: useTransform(x, (v) => v * depth), y: useTransform(y, (v) => v * depth) };
}

/** Portrait composition with mouse parallax (four depth layers) and a gentle scroll parallax. */
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
    <div ref={ref} className="relative mx-auto aspect-square w-full max-w-[520px] lg:max-w-[560px]">
      <m.div style={{ y: drift }} className="absolute inset-0">
        {/* Back layer: glow, orbit rings and a masked grid */}
        <m.div style={back} className="absolute inset-0" aria-hidden="true">
          <div className="intro-fade absolute inset-0">
          <div className="absolute left-1/2 top-[46%] size-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(108_99_255/0.5),rgb(79_140_255/0.16)_45%,transparent_70%)] blur-2xl" />
          <div className="absolute left-1/2 top-[46%] size-[66%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.07]" />
          <div className="animate-spin-slow absolute left-1/2 top-[46%] size-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/[0.06]" />
          <div className="bg-grid absolute inset-[6%] rounded-full opacity-80 [mask-image:radial-gradient(circle,#000_25%,transparent_68%)]" />
          </div>
        </m.div>

        {/* Portrait */}
        <m.div style={person} className="absolute inset-x-[9%] bottom-0 top-[3%]">
          <div style={delay(150)} className="intro-fade h-full w-full">
            <Image
              src={portrait}
              alt="Portrait of M. Shakif Rabbani"
              priority
              sizes="(min-width: 1024px) 470px, 80vw"
              className="portrait-fade h-full w-full object-contain object-bottom drop-shadow-[0_0_44px_rgb(108_99_255/0.35)]"
            />
          </div>
        </m.div>

        {/* Floating technology tiles */}
        <m.div style={tiles} className="pointer-events-none absolute inset-0" aria-hidden="true">
          <FloatTile className="left-[7%] top-[13%]" d={500} float="animate-float">
            <TechIcon name="react" className="size-7" />
          </FloatTile>
          <FloatTile className="left-[0%] top-[37%] hidden sm:grid" d={650} float="animate-float-slow">
            <TechIcon name="javascript" className="size-6" />
          </FloatTile>
          <FloatTile className="left-[9%] top-[60%]" d={800} float="animate-float">
            <TechIcon name="typescript" className="size-6" />
          </FloatTile>
          <FloatTile className="right-[45%] top-[1%] hidden sm:grid" d={700} float="animate-float-slow">
            <TechIcon name="nodejs" className="size-7" />
          </FloatTile>
          <FloatTile className="right-[5%] top-[38%]" d={900} float="animate-float">
            <CodeXml className="size-6 text-accent-ink" strokeWidth={2} />
          </FloatTile>
        </m.div>

        {/* Widgets */}
        <m.div style={cards} className="pointer-events-none absolute inset-0">
          <BuildingWidget />
          <CodeCard />
        </m.div>
      </m.div>
    </div>
  );
}

function FloatTile({ children, className, d, float }: { children: ReactNode; className?: string; d: number; float: string }) {
  return (
    <div style={delay(d)} className={cn("intro-fade absolute grid", className)}>
      <div
        className={cn(
          "grid size-12 place-items-center rounded-2xl border border-white/10 bg-surface/70 shadow-[0_18px_40px_-18px_rgb(0_0_0/0.9),inset_0_1px_0_rgb(255_255_255/0.08)] backdrop-blur-md sm:size-14",
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
    <div style={delay(1000)} className="intro absolute right-[-3%] top-[1%] hidden w-[42%] min-w-[168px] max-w-[200px] sm:block" aria-hidden="true">
      <div className="rounded-2xl border border-white/10 bg-surface/75 p-3.5 shadow-[0_24px_50px_-24px_rgb(0_0_0/0.95)] backdrop-blur-md">
        <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-fg-3">Building</p>
        <p className="mt-0.5 text-[13px] font-semibold text-fg">Modern Solutions</p>
        <ul className="mt-3 space-y-2">
          {solutions.map((item, i) => (
            <li key={item.label} className="flex items-center gap-2 text-[11.5px] text-fg-2">
              <span className="relative grid size-2 place-items-center">
                <span className={cn("absolute inset-0 rounded-full animate-ping-soft", item.tone)} style={{ animationDelay: `${i * 450}ms` }} />
                <span className={cn("relative size-2 rounded-full", item.tone)} />
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
    <div style={delay(1150)} className="intro absolute bottom-[-2%] right-[-2%] w-[62%] max-w-[300px] sm:bottom-[9%] sm:right-[-4%] sm:w-[58%] sm:min-w-[220px]" aria-hidden="true">
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0b0f17]/90 shadow-[0_30px_60px_-28px_rgb(0_0_0/1)] backdrop-blur-md">
        <div className="flex items-center gap-1.5 border-b border-white/[0.06] px-3.5 py-2.5">
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-2 font-mono text-[10px] text-fg-3">developer.ts</span>
        </div>
        <pre className="px-3 py-2.5 font-mono text-[8.5px] leading-[1.7] sm:px-4 sm:py-3.5 sm:text-[11.5px] sm:leading-[1.75]">
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
