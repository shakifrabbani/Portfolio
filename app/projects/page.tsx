import type { Metadata } from "next";
import Link from "next/link";
import { ProjectVisual } from "@/components/projects/ProjectVisual";
import { GitHubIcon } from "@/components/ui/BrandIcons";
import { Button, ButtonArrow } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TechIcon, techLabel } from "@/components/ui/TechIcon";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Projects",
  description: "Restaurant, retail POS, booking, property inspection and job portal systems built by M. Shakif Rabbani.",
  alternates: { canonical: `${profile.siteUrl}/projects/` },
};

export default function ProjectsPage() {
  return (
    <section aria-labelledby="all-projects-title" className="pb-16 pt-32 sm:pt-36">
      <div className="container-site">
        <SectionHeader
          id="all-projects-title"
          as="h1"
          label="Projects"
          title="Products and systems I've built"
          description="Client work for restaurants, retail stores, salons and service businesses, plus open source projects. Some previews are illustrative interface mockups."
        />
        <div className="space-y-6">
          {projects.map((project, i) => (
            <Reveal key={project.slug}>
              <article className="card spotlight grid grid-cols-1 gap-6 overflow-hidden p-4 sm:p-5 lg:grid-cols-2 lg:items-center lg:gap-10">
                <Link
                  href={`/projects/${project.slug}/`}
                  data-cursor="project"
                  aria-label={`${project.title}: view case study`}
                  className={cn("group block overflow-hidden rounded-2xl border border-line", i % 2 === 1 && "lg:order-2")}
                >
                  <ProjectVisual project={project} idPrefix={`list-${project.slug}`} />
                </Link>
                <div className="px-1 pb-2 lg:px-4">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="rounded-md border border-accent/25 bg-accent/10 px-2 py-0.5 font-medium text-accent-ink">{project.category}</span>
                    <span className="text-fg-3">{project.context}</span>
                  </div>
                  <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-fg sm:text-3xl">{project.title}</h2>
                  <p className="mt-3 text-[15px] leading-relaxed text-fg-2">{project.overview}</p>
                  {project.stack.length > 0 && (
                    <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies">
                      {project.stack.map((key) => (
                        <li key={key} className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-white/[0.03] px-2.5 py-1 text-xs text-fg-2">
                          <TechIcon name={key} className="size-3.5" />
                          {techLabel(key)}
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Button href={`/projects/${project.slug}/`} size="sm">
                      Case Study <ButtonArrow />
                    </Button>
                    {project.links.live && (
                      <Button href={project.links.live} variant="secondary" size="sm" external>
                        Live Site <ButtonArrow diagonal />
                      </Button>
                    )}
                    {project.links.github && (
                      <Button href={project.links.github} variant="secondary" size="sm" external>
                        <GitHubIcon className="size-4" /> GitHub
                      </Button>
                    )}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
