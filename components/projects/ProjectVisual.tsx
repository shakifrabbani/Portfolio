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

/** Real screenshot when `screenshot` is set in data/projects.ts, otherwise the coded interface preview. */
export function ProjectVisual({ project, idPrefix, priority = false, sizes = "(min-width: 1024px) 640px, 100vw" }: ProjectVisualProps) {
  if (project.screenshot) {
    return (
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={withBasePath(project.screenshot)}
          alt={`${project.title} interface`}
          fill
          priority={priority}
          sizes={sizes}
          className="preview-canvas object-cover object-top"
        />
      </div>
    );
  }
  return <ProjectPreview variant={project.preview} accent={project.accent} idPrefix={idPrefix} />;
}
