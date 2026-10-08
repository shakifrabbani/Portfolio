import { Maximize2 } from "lucide-react";
import Image from "next/image";
import type { Project } from "@/data/projects";
import { withBasePath } from "@/lib/utils";

type Poster = NonNullable<Project["poster"]>;

/**
 * Portrait design poster shown whole, never cropped, on a stage lit by a blurred copy of itself.
 * Its width is capped so the full poster fits within one screen height; selecting it opens the original.
 */
export function ProjectPoster({ poster }: { poster: Poster }) {
  const src = withBasePath(poster.src);
  const ratio = poster.width / poster.height;

  return (
    <figure>
      <div className="relative isolate overflow-hidden rounded-[22px] border border-line-strong bg-ink-2 shadow-[0_50px_120px_-50px_rgb(108_99_255/0.45)]">
        <Image src={src} alt="" fill sizes="100vw" className="-z-10 scale-125 object-cover opacity-40 blur-3xl" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgb(7_9_13/0.75))]" />

        <div className="px-4 py-6 sm:px-10 sm:py-12">
          <a
            href={src}
            target="_blank"
            rel="noopener"
            aria-label="Open the full-size project poster in a new tab"
            className="group relative mx-auto block overflow-hidden rounded-xl border border-white/10 shadow-[0_40px_90px_-30px_rgb(0_0_0/0.95)] transition-[transform,box-shadow] duration-700 ease-[var(--ease-premium)] hover:-translate-y-1 hover:shadow-[0_50px_100px_-30px_rgb(0_0_0/1),0_0_60px_-20px_rgb(245_158_11/0.35)]"
            style={{ maxWidth: `min(100%, 640px, calc((100svh - 200px) * ${ratio}))` }}
          >
            <Image
              src={src}
              alt={poster.alt}
              width={poster.width}
              height={poster.height}
              loading="eager"
              sizes="(min-width: 768px) 640px, 100vw"
              className="h-auto w-full"
            />
            <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-ink/75 px-3 py-1.5 text-xs font-medium text-fg opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
              <Maximize2 className="size-3.5" aria-hidden="true" /> Full size
            </span>
          </a>
        </div>
      </div>
      <figcaption className="mt-3 text-center text-xs text-fg-3">Project poster. Select it to open the full-size image.</figcaption>
    </figure>
  );
}
