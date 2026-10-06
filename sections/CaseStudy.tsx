import { CircleAlert, Layers, Lightbulb, Trophy, UserRound } from "lucide-react";
import type { ReactNode } from "react";
import { CaseStudyVisual } from "@/components/mockups/CaseStudyVisual";
import { Button, ButtonArrow } from "@/components/ui/Button";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { techLabel } from "@/components/ui/TechIcon";
import { caseStudySlug, getProject } from "@/data/projects";

export function CaseStudy() {
  const project = getProject(caseStudySlug);
  if (!project) return null;

  const points: { icon: ReactNode; title: string; text: string }[] = [
    { icon: <CircleAlert className="size-4" />, title: "Challenge", text: project.problem },
    { icon: <Lightbulb className="size-4" />, title: "Solution", text: project.solution },
    { icon: <UserRound className="size-4" />, title: "My Role", text: "Developed the POS across the React interface, PHP back end and MySQL database." },
    { icon: <Layers className="size-4" />, title: "Technologies", text: project.stack.map(techLabel).join(", ") },
    { icon: <Trophy className="size-4" />, title: "Outcome", text: project.outcome ?? "" },
  ];

  return (
    <section aria-labelledby="case-study-title" className="relative py-20 sm:py-24">
      <div className="container-site grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.35fr)_minmax(0,0.95fr)] lg:gap-8">
        <div>
          <Reveal>
            <p className="section-label">Case study</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 id="case-study-title" className="section-title mt-3 text-[clamp(1.9rem,3.4vw,2.6rem)]">
              From Business Problem to Production System
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-5 text-[15px] leading-relaxed text-fg-2">
              How I built a point of sale that keeps retail counters billing customers, even when the internet drops.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <Button href={`/projects/${project.slug}/`} className="mt-7">
              View Full Case Study <ButtonArrow />
            </Button>
          </Reveal>
        </div>

        <Reveal delay={0.1} y={40}>
          <CaseStudyVisual project={project} />
        </Reveal>

        <Stagger className="space-y-5" stagger={0.1}>
          {points.map((point) => (
            <StaggerItem key={point.title} className="flex gap-4">
              <span className="icon-tile size-9 rounded-[10px]">{point.icon}</span>
              <div>
                <h3 className="text-sm font-semibold text-fg">{point.title}</h3>
                <p className="mt-1 text-[13px] leading-relaxed text-fg-2">{point.text}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
