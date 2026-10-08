import { FolderGit2, Lock, Star } from "lucide-react";
import { GitHubIcon } from "@/components/ui/BrandIcons";
import { Button, ButtonArrow } from "@/components/ui/Button";
import { CountUp } from "@/components/ui/CountUp";
import { LanguageBars } from "@/components/ui/LanguageBars";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { skillGroups } from "@/data/content";
import { clientProjectsDelivered } from "@/data/profile";
import { getGitHubSnapshot } from "@/lib/github";

/** Real numbers only: public repo count and languages come from the GitHub API at build time. */
export async function GitHubActivity() {
  const github = await getGitHubSnapshot();
  const technologies = new Set(skillGroups.flatMap((g) => g.items)).size;

  const stats = [
    { value: github.publicRepos, label: "Public repositories", icon: <FolderGit2 className="size-4" /> },
    { value: clientProjectsDelivered, suffix: "+", label: "Client projects in private repos", icon: <Lock className="size-4" /> },
    { value: technologies, label: "Tools and technologies", icon: <GitHubIcon className="size-4" /> },
  ];

  return (
    <section aria-labelledby="github-title" className="relative py-20 sm:py-24">
      <div className="container-site grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.7fr)_minmax(0,1fr)] lg:gap-6">
        <div>
          <Reveal>
            <p className="section-label">GitHub activity</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 id="github-title" className="section-title mt-3 text-[clamp(1.9rem,3.2vw,2.5rem)]">
              Engineering Beyond the Interface
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-4 text-[14px] leading-relaxed text-fg-2">
              Open source projects, personal builds and continuous learning. Client work lives in private repositories.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <Button href={github.profileUrl} variant="secondary" size="sm" external className="mt-6">
              <GitHubIcon className="size-4" /> View GitHub Profile <ButtonArrow />
            </Button>
          </Reveal>
        </div>

        <div className="grid content-start gap-4">
          <Stagger className="grid grid-cols-1 gap-4 sm:grid-cols-3" stagger={0.08}>
            {stats.map((stat) => (
              <StaggerItem key={stat.label} className="h-full">
                <div className="card spotlight h-full p-5">
                  <span className="text-accent-ink">{stat.icon}</span>
                  <p className="mt-3 font-display text-3xl font-extrabold tracking-tight text-fg">
                    <CountUp value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="mt-1 text-[12.5px] text-fg-2">{stat.label}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
          <Stagger className="grid grid-cols-1 gap-4 sm:grid-cols-3" stagger={0.08} delay={0.1}>
            {github.repos.map((repo) => (
              <StaggerItem key={repo.name} className="h-full">
                <a
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card spotlight lift group flex h-full flex-col p-5"
                  aria-label={`${repo.displayName} repository on GitHub`}
                >
                  <span className="flex items-start gap-2 break-all font-mono text-[12.5px] font-semibold leading-snug text-fg">
                    <GitHubIcon className="mt-0.5 size-3.5 shrink-0 text-fg-3 transition-colors group-hover:text-fg" />
                    {repo.displayName}
                  </span>
                  <span className="mt-2 text-[12.5px] leading-relaxed text-fg-2">{repo.description}</span>
                  <span className="mt-auto flex items-center justify-between gap-2 pt-4 text-[11.5px] text-fg-3">
                    <span className="inline-flex items-center gap-1.5">
                      <span className="size-2 rounded-full" style={{ backgroundColor: repo.languageColor }} aria-hidden="true" />
                      {repo.language ?? "Code"}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Star className="size-3.5" aria-hidden="true" />
                      <span className="sr-only">Stars:</span> {repo.stars}
                    </span>
                  </span>
                </a>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <Reveal delay={0.15}>
          <div className="card spotlight h-full p-6">
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="text-[15px] font-semibold text-fg">Languages</h3>
              <span className="text-[11px] text-fg-3">Public repositories</span>
            </div>
            <div className="mt-6">
              <LanguageBars languages={github.languages} />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
