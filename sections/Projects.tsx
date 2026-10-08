import { ProjectCard } from "@/components/projects/ProjectCard";
import { Button, ButtonArrow } from "@/components/ui/Button";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { featuredProjects } from "@/data/projects";

export function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="relative py-20 sm:py-24">
      <div className="container-site">
        <SectionHeader
          id="projects-title"
          label="Featured projects"
          title="Selected Work"
          action={
            <Button href="/projects/" variant="secondary" size="sm">
              View All Projects <ButtonArrow />
            </Button>
          }
        />
        <Stagger className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.09}>
          {featuredProjects.map((project) => (
            <StaggerItem key={project.slug} className="h-full">
              <ProjectCard project={project} />
            </StaggerItem>
          ))}
        </Stagger>
        {featuredProjects.some((p) => !p.screenshot && !p.poster) && (
          <p className="mt-6 text-center text-xs text-fg-3">Some previews are illustrative interface mockups.</p>
        )}
      </div>
    </section>
  );
}
