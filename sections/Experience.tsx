import { GraduationCap } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TechIcon, techLabel } from "@/components/ui/TechIcon";
import { TimelineRail } from "@/components/ui/TimelineRail";
import { timeline, type TimelineEntry } from "@/data/content";
import { cn } from "@/lib/utils";

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="relative py-20 sm:py-24">
      <div className="container-site">
        <SectionHeader
          id="experience-title"
          label="Professional experience"
          title="My Professional Journey"
          description="Building real-world products and gaining hands-on experience."
        />
        <TimelineRail>
          <ol className="space-y-8">
            {timeline.map((entry) => (
              <TimelineItem key={entry.role} entry={entry} />
            ))}
          </ol>
        </TimelineRail>
      </div>
    </section>
  );
}

function TimelineItem({ entry }: { entry: TimelineEntry }) {
  const [start, ...rest] = entry.period.split(" – ");
  const end = rest.join(" – ");

  return (
    <li className="relative grid grid-cols-1 gap-4 pl-9 md:grid-cols-[124px_1fr] md:gap-14 md:pl-0">
      <Reveal className="md:pt-7 md:text-right">
        <p className="font-display text-xl font-bold tracking-tight text-fg">{start}</p>
        {end && <p className="mt-0.5 text-xs text-fg-3">– {end}</p>}
      </Reveal>

      <span aria-hidden="true" className="absolute left-0 top-1 grid size-4 place-items-center md:left-[144px] md:top-8">
        {entry.current && <span className="animate-ping-soft absolute inset-0 rounded-full bg-accent/60" />}
        <span className={cn("relative size-4 rounded-full border-2 bg-ink", entry.current ? "border-accent-soft shadow-[0_0_18px_rgb(108_99_255/0.8)]" : "border-line-strong")} />
      </span>

      <Reveal delay={0.08}>
        <article className="card spotlight grid grid-cols-1 gap-7 p-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1.3fr)_auto] lg:p-7">
          <div>
            <div className="flex items-center gap-2">
              {entry.kind === "education" && <GraduationCap className="size-4 text-accent-ink" aria-hidden="true" />}
              <h3 className="text-lg font-semibold text-fg">{entry.role}</h3>
            </div>
            <p className="mt-1 text-sm font-medium text-accent-ink">{entry.org}</p>
            {entry.location && <p className="mt-1 text-xs text-fg-3">{entry.location}</p>}
            <p className="mt-4 text-[13.5px] leading-relaxed text-fg-2">{entry.summary}</p>
          </div>

          <ul className="space-y-2.5">
            {entry.highlights.map((point) => (
              <li key={point} className="flex gap-3 text-[13px] leading-relaxed text-fg-2">
                <span aria-hidden="true" className="mt-[7px] size-1.5 shrink-0 rounded-full bg-gradient-to-br from-accent-soft to-accent-blue" />
                {point}
              </li>
            ))}
          </ul>

          {entry.stack && (
            <div className="rounded-2xl border border-line bg-white/[0.02] p-4 lg:w-[176px] lg:self-start">
              <p className="text-xs font-semibold text-fg">Technologies</p>
              <ul className="mt-3 grid grid-cols-4 gap-2.5">
                {entry.stack.map((key) => (
                  <li key={key} title={techLabel(key)} className="grid size-8 place-items-center rounded-lg border border-line bg-white/[0.03]">
                    <TechIcon name={key} className="size-4" />
                    <span className="sr-only">{techLabel(key)}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {entry.score && (
            <div className="flex flex-col items-start justify-center rounded-2xl border border-line bg-white/[0.02] px-6 py-4 lg:w-[176px] lg:items-center lg:self-start">
              <p className="text-gradient font-display text-4xl font-extrabold tracking-tight">{entry.score.value}</p>
              <p className="mt-1 text-xs font-medium uppercase tracking-[0.14em] text-fg-3">{entry.score.label}</p>
            </div>
          )}
        </article>
      </Reveal>
    </li>
  );
}
