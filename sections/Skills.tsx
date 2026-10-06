import type { CSSProperties } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { TechIcon, techColor, techLabel } from "@/components/ui/TechIcon";
import { skillGroups } from "@/data/content";
import { cn } from "@/lib/utils";

/** Grouped by discipline, never as percentage bars. Spans keep rows full at every breakpoint. */
const spans = ["lg:col-span-3", "lg:col-span-3", "lg:col-span-2", "lg:col-span-2", "lg:col-span-2"];

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="relative py-20 sm:py-24">
      <div className="container-site">
        <SectionHeader
          id="skills-title"
          label="Technical skills"
          title="Technologies I Work With"
          description="A modern stack for building complete digital products, from interface to database."
        />
        <Stagger className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6 xl:grid-cols-[1.35fr_1.15fr_1fr_0.8fr_1.15fr]" stagger={0.07}>
          {skillGroups.map((group, i) => (
            <StaggerItem key={group.title} className={cn("h-full xl:col-span-1", spans[i], i === skillGroups.length - 1 && "sm:col-span-2 lg:col-span-2")}>
              <div className="card spotlight lift h-full p-5">
                <h3 className="text-sm font-semibold text-fg">{group.title}</h3>
                <ul className="mt-5 grid grid-cols-[repeat(auto-fill,minmax(68px,1fr))] gap-x-1 gap-y-4">
                  {group.items.map((key) => (
                    <li key={key} className="group/chip flex flex-col items-center gap-2 text-center">
                      <span
                        style={{ "--glow": `${techColor(key)}55` } as CSSProperties}
                        className="grid size-11 place-items-center rounded-xl border border-transparent transition-[transform,background-color,border-color,box-shadow] duration-300 ease-[var(--ease-premium)] group-hover/chip:-translate-y-1 group-hover/chip:border-line group-hover/chip:bg-white/[0.05] group-hover/chip:shadow-[0_8px_26px_-6px_var(--glow)]"
                      >
                        <TechIcon name={key} className="size-6" />
                      </span>
                      <span className="text-[11.5px] leading-tight text-fg-2 transition-colors group-hover/chip:text-fg">{techLabel(key)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
