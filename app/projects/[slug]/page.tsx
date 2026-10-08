import { ArrowLeft, ArrowUpRight, CheckCircle2, CircleAlert, Lightbulb, Trophy } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectPoster } from "@/components/projects/ProjectPoster";
import { ProjectVisual } from "@/components/projects/ProjectVisual";
import { SystemMap } from "@/components/projects/SystemMap";
import { GitHubIcon } from "@/components/ui/BrandIcons";
import { Button, ButtonArrow } from "@/components/ui/Button";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { TechIcon, techLabel } from "@/components/ui/TechIcon";
import { profile } from "@/data/profile";
import { getProject, projects } from "@/data/projects";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const url = `${profile.siteUrl}/projects/${project.slug}/`;
  // openGraph and twitter replace the layout's objects wholesale, so the share image is set again here.
  const image = `${profile.siteUrl}/og-card.jpg`;
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: url },
    openGraph: { url, title: `${project.title} | ${profile.name}`, description: project.summary, images: [image] },
    twitter: { card: "summary_large_image", title: `${project.title} | ${profile.name}`, description: project.summary, images: [image] },
  };
}

const platformLabel = { web: "Web", desktop: "Desktop", mobile: "Mobile" } as const;

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length];

  const meta = [
    { label: "Year", value: project.year },
    { label: "Role", value: project.role },
    { label: "Platforms", value: project.platforms.map((p) => platformLabel[p]).join(" · ") },
    { label: "Type", value: project.context },
  ];

  return (
    <article className="pb-10 pt-28 sm:pt-32">
      <div className="container-site">
        <Reveal>
          <Link href="/projects/" className="group inline-flex items-center gap-2 rounded-lg py-1 text-sm text-fg-2 transition-colors hover:text-fg">
            <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" aria-hidden="true" /> All projects
          </Link>
        </Reveal>

        <header className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:items-end">
          <div>
            <Reveal>
              <span className="inline-flex rounded-md border border-accent/25 bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent-ink">{project.category}</span>
            </Reveal>
            <Reveal delay={0.06}>
              <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.04] tracking-[-0.035em] text-fg sm:text-5xl lg:text-6xl">{project.title}</h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-fg-2 sm:text-lg">{project.overview}</p>
            </Reveal>
          </div>
          <Reveal delay={0.18}>
            <dl className="card grid grid-cols-2 gap-x-6 gap-y-5 p-6">
              {meta.map((item) => (
                <div key={item.label}>
                  <dt className="text-[11px] font-medium uppercase tracking-[0.14em] text-fg-3">{item.label}</dt>
                  <dd className="mt-1 text-sm font-medium text-fg">{item.value}</dd>
                </div>
              ))}
            </dl>
            {(project.links.live || project.links.github) && (
              <div className="mt-4 flex flex-wrap gap-3">
                {project.links.live && (
                  <Button href={project.links.live} size="sm" external>
                    Visit Live Site <ButtonArrow diagonal />
                  </Button>
                )}
                {project.links.github && (
                  <Button href={project.links.github} variant="secondary" size="sm" external>
                    <GitHubIcon className="size-4" /> View on GitHub
                  </Button>
                )}
              </div>
            )}
          </Reveal>
        </header>

        <Reveal delay={0.1} y={50} className="mt-12">
          {project.poster ? (
            <ProjectPoster poster={project.poster} liveUrl={project.links.live} />
          ) : (
            <>
              <div className="overflow-hidden rounded-[22px] border border-line-strong shadow-[0_50px_120px_-50px_rgb(108_99_255/0.45)]">
                <ProjectVisual project={project} idPrefix={`detail-${project.slug}`} priority sizes="(min-width: 1280px) 1180px, 100vw" />
              </div>
              {!project.screenshot && <p className="mt-3 text-center text-xs text-fg-3">Illustrative interface preview.</p>}
            </>
          )}
        </Reveal>

        <div id="details" className="mt-20 grid grid-cols-1 gap-5 md:grid-cols-2">
          <Reveal>
            <div className="card spotlight h-full p-7">
              <span className="icon-tile size-10">
                <CircleAlert className="size-[18px]" aria-hidden="true" />
              </span>
              <h2 className="mt-5 text-lg font-semibold text-fg">The problem</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-fg-2">{project.problem}</p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="card spotlight h-full p-7">
              <span className="icon-tile size-10">
                <Lightbulb className="size-[18px]" aria-hidden="true" />
              </span>
              <h2 className="mt-5 text-lg font-semibold text-fg">The solution</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-fg-2">{project.solution}</p>
            </div>
          </Reveal>
        </div>

        <section aria-labelledby="features-title" className="mt-20">
          <Reveal>
            <p className="section-label">Key features</p>
            <h2 id="features-title" className="section-title mt-3 text-[clamp(1.7rem,3vw,2.3rem)]">
              What it does
            </h2>
          </Reveal>
          <Stagger className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
            {project.features.map((feature) => (
              <StaggerItem key={feature} className="h-full">
                <div className="card flex h-full items-start gap-3 p-5">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-accent-ink" aria-hidden="true" />
                  <p className="text-[14px] leading-relaxed text-fg">{feature}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </section>

        <section aria-labelledby="architecture-title" className="mt-20">
          <Reveal>
            <p className="section-label">Architecture</p>
            <h2 id="architecture-title" className="section-title mt-3 text-[clamp(1.7rem,3vw,2.3rem)]">
              How the pieces connect
            </h2>
          </Reveal>
          <Reveal delay={0.08} className="mt-8">
            <SystemMap project={project} />
          </Reveal>
        </section>

        <section aria-labelledby="role-title" className="mt-20 grid grid-cols-1 gap-5 lg:grid-cols-2">
          <Reveal>
            <div className="card h-full p-7">
              <h2 id="role-title" className="text-lg font-semibold text-fg">
                My responsibilities
              </h2>
              <ul className="mt-4 space-y-3">
                {project.responsibilities.map((item) => (
                  <li key={item} className="flex gap-3 text-[14px] leading-relaxed text-fg-2">
                    <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-gradient-to-br from-accent-soft to-accent-blue" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="card h-full p-7">
              <h2 className="text-lg font-semibold text-fg">Technology stack</h2>
              {project.stack.length ? (
                <ul className="mt-4 flex flex-wrap gap-2">
                  {project.stack.map((key) => (
                    <li key={key} className="inline-flex items-center gap-2 rounded-xl border border-line bg-white/[0.03] px-3 py-2 text-sm text-fg">
                      <TechIcon name={key} className="size-4" />
                      {techLabel(key)}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 text-[14px] leading-relaxed text-fg-2">
                  {project.platforms.map((p) => platformLabel[p]).join(", ")} apps sharing one back end through REST APIs.
                </p>
              )}
              {project.outcome && (
                <div className="mt-6 flex items-start gap-3 rounded-xl border border-success/25 bg-success/[0.07] p-4">
                  <Trophy className="mt-0.5 size-4 shrink-0 text-success" aria-hidden="true" />
                  <p className="text-[14px] leading-relaxed text-fg">{project.outcome}</p>
                </div>
              )}
            </div>
          </Reveal>
        </section>

        <Reveal className="mt-20">
          <Link
            href={`/projects/${next.slug}/`}
            data-cursor="project"
            className="card spotlight lift group flex flex-col gap-6 overflow-hidden p-6 sm:flex-row sm:items-center sm:p-8"
          >
            <div className="flex-1">
              <p className="section-label">Next project</p>
              <p className="mt-3 font-display text-2xl font-bold tracking-tight text-fg sm:text-3xl">{next.title}</p>
              <p className="mt-2 line-clamp-2 max-w-xl text-[14px] text-fg-2">{next.summary}</p>
            </div>
            <span className="grid size-12 shrink-0 place-items-center rounded-full border border-line-strong text-fg transition-colors duration-300 group-hover:border-accent group-hover:bg-accent">
              <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </span>
          </Link>
        </Reveal>
      </div>
    </article>
  );
}
