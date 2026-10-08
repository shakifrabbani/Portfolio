import Image from "next/image";
import { ProjectPreview } from "@/components/mockups/ProjectPreview";
import type { Project } from "@/data/projects";
import { withBasePath } from "@/lib/utils";

type ProjectVisualProps = {
  project: Project;
  idPrefix: string;
  priority?: boolean;
  sizes?: string;
};

/**
 * Real image when data/projects.ts has one (a screenshot, else the poster's 16:10 cover crop),
 * otherwise the coded interface preview.
 */
export function ProjectVisual({ project, idPrefix, priority = false, sizes = "(min-width: 1024px) 640px, 100vw" }: ProjectVisualProps) {
  const image = project.screenshot ?? project.poster?.cover;
  if (image) {
    return (
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={withBasePath(image)}
          alt={project.screenshot ? `${project.title} interface` : `${project.title} project poster`}
          fill
          preload={priority}
          sizes={sizes}
          className="preview-canvas object-cover object-top"
        />
      </div>
    );
  }
  return <ProjectPreview variant={project.preview} accent={project.accent} idPrefix={idPrefix} />;
}
