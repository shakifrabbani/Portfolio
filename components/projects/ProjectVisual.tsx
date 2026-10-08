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
 * Real screenshot when `screenshot` is set in data/projects.ts, else the poster filling a frame of its own
 * shape, otherwise the coded interface preview.
 */
export function ProjectVisual({ project, idPrefix, priority = false, sizes = "(min-width: 1024px) 640px, 100vw" }: ProjectVisualProps) {
  if (project.screenshot) {
    return (
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={withBasePath(project.screenshot)}
          alt={`${project.title} interface`}
          fill
          preload={priority}
          sizes={sizes}
          className="preview-canvas object-cover object-top"
        />
      </div>
    );
  }

  if (project.poster) {
    const { src, width, height, alt } = project.poster;
    // The frame takes the poster's own shape, so the image fills it edge to edge without cropping.
    return (
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: `${width} / ${height}` }}>
        <Image src={withBasePath(src)} alt={alt} fill preload={priority} sizes={sizes} className="preview-canvas object-cover" />
      </div>
    );
  }

  // The Project type guarantees a preview when there is no screenshot or poster.
  return project.preview ? <ProjectPreview variant={project.preview} accent={project.accent} idPrefix={idPrefix} /> : null;
}
