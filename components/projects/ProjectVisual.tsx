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
 * Real screenshot when `screenshot` is set in data/projects.ts, else the whole poster (never cropped),
 * otherwise the coded interface preview.
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
    const { width, height, alt } = project.poster;
    const src = withBasePath(project.poster.src);
    return (
      <div className="relative isolate aspect-[16/10] w-full overflow-hidden bg-ink-2">
        {/* The portrait poster sits whole in the landscape frame, on a blurred copy of itself. */}
        <Image src={src} alt="" fill sizes={sizes} className="-z-10 scale-125 object-cover opacity-45 blur-2xl" />
        <div className="absolute inset-0 flex items-center justify-center py-[5%]">
          <div
            className="preview-canvas relative h-full overflow-hidden rounded-md border border-white/10 shadow-[0_20px_45px_-15px_rgb(0_0_0/0.9)]"
            style={{ aspectRatio: `${width} / ${height}` }}
          >
            <Image src={src} alt={alt} fill preload={priority} sizes={sizes} className="object-cover" />
          </div>
        </div>
      </div>
    );
  }

  return <ProjectPreview variant={project.preview} accent={project.accent} idPrefix={idPrefix} />;
}
