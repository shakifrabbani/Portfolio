import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { ProjectVisual } from "@/components/projects/ProjectVisual";
import { Button, ButtonArrow } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { TechIcon, techLabel } from "@/components/ui/TechIcon";
import type { Project } from "@/data/projects";

/**
 * The whole card opens the case study through a stretched title link, so a project with a live site can
 * also offer its own "Visit Site" link above it without nesting anchors.
 * Hover: preview parallax + scale, spotlight glow, arrow lifts diagonally.
 */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="card spotlight lift group relative flex h-full flex-col overflow-hidden p-3 has-[h3_a:focus-visible]:outline-2 has-[h3_a:focus-visible]:outline-offset-3 has-[h3_a:focus-visible]:outline-accent-soft">
      {/* A 16:10 slot keeps titles level across a grid row when a poster's picture has a different shape. */}
      <div className="sm:aspect-[16/10]">
        <div className="relative overflow-hidden rounded-[14px] border border-line">
          <ProjectVisual project={project} idPrefix={`card-${project.slug}`} sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw" />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col px-2 pb-1.5 pt-4">
        <h3 className="text-[15px] font-semibold text-fg">
          <Link
            href={`/projects/${project.slug}/`}
            data-cursor="project"
            aria-label={`${project.title}: view case study`}
            className="after:absolute after:inset-0 after:z-[1] after:content-[''] focus-visible:outline-none"
          >
            {project.title}
          </Link>
        </h3>
        <span className="mt-2 inline-flex w-fit rounded-md border border-accent/25 bg-accent/10 px-2 py-0.5 text-[11px] font-medium text-accent-ink">
          {project.category}
        </span>
        <p className="mt-3 line-clamp-3 text-[13px] leading-relaxed text-fg-2">{project.summary}</p>

        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
          <ul className="flex items-center gap-1.5 opacity-75 transition-opacity duration-300 group-hover:opacity-100" aria-label="Built with">
            {project.stack.length
              ? project.stack.slice(0, 5).map((key) => (
                  <li key={key} className="grid size-7 place-items-center rounded-md border border-line bg-white/[0.03]" title={techLabel(key)}>
                    <TechIcon name={key} className="size-3.5" />
                    <span className="sr-only">{techLabel(key)}</span>
                  </li>
                ))
              : project.platforms.map((platform) => (
                  <li key={platform} className="grid size-7 place-items-center rounded-md border border-line bg-white/[0.03] text-accent-ink" title={platform}>
                    <Icon name={platform === "web" ? "web" : platform} className="size-3.5" />
                    <span className="sr-only">{platform}</span>
                  </li>
                ))}
          </ul>
          <div className="flex items-center gap-2">
            {project.links.live && (
              <Button
                href={project.links.live}
                variant="secondary"
                size="sm"
                external
                ariaLabel={`Visit the ${project.title} live site`}
                className="z-[2] h-9 px-3"
              >
                Visit Site <ButtonArrow diagonal />
              </Button>
            )}
            <span className="grid size-9 shrink-0 place-items-center rounded-full border border-line-strong text-fg-2 transition-[background-color,border-color,color] duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
              <ArrowUpRight
                className="size-4 transition-transform duration-300 ease-[var(--ease-premium)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
