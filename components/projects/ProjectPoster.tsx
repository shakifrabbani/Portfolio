import { Maximize2 } from "lucide-react";
import Image from "next/image";
import type { Poster } from "@/data/projects";
import { withBasePath } from "@/lib/utils";

/**
 * Design poster filling its rounded frame edge to edge, never cropped: the frame takes the poster's shape,
 * and its width is capped so the whole poster fits within one screen height. Selecting it opens the original.
 * Buttons drawn on the poster (`actions`) are overlaid with real links in the same place.
 */
export function ProjectPoster({ poster, liveUrl }: { poster: Poster; liveUrl?: string }) {
  const src = withBasePath(poster.src);
  const ratio = poster.width / poster.height;
  const actions = (poster.actions ?? []).filter((action) => action.target !== "live" || liveUrl);

  return (
    <figure>
      <div
        className="group relative mx-auto overflow-hidden rounded-[22px] border border-line-strong bg-ink-2 shadow-[0_50px_120px_-50px_rgb(108_99_255/0.45)]"
        style={{ maxWidth: `min(100%, calc((100svh - 140px) * ${ratio}))` }}
      >
        <a href={src} target="_blank" rel="noopener" aria-label="Open the full-size project poster in a new tab" className="block focus-visible:outline-offset-[-3px]">
          <Image
            src={src}
            alt={poster.alt}
            width={poster.width}
            height={poster.height}
            loading="eager"
            sizes="(min-width: 1280px) 1180px, 100vw"
            className="h-auto w-full"
          />
          <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-ink/75 px-3 py-1.5 text-xs font-medium text-fg opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100 group-has-[a:focus-visible]:opacity-100">
            <Maximize2 className="size-3.5" aria-hidden="true" /> Full size
          </span>
        </a>

        {actions.map(({ label, target, area: [left, top, width, height] }) => (
          <a
            key={label}
            href={target === "live" ? liveUrl : "#details"}
            aria-label={label}
            title={label}
            {...(target === "live" ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="absolute rounded-full transition-[background-color,box-shadow] duration-300 hover:bg-white/10 hover:shadow-[0_0_0_2px_rgb(245_215_170/0.7),0_0_30px_rgb(245_158_11/0.45)] focus-visible:outline-offset-2"
            style={{ left: `${left}%`, top: `${top}%`, width: `${width}%`, height: `${height}%` }}
          />
        ))}
      </div>
      <figcaption className="mt-3 text-center text-xs text-fg-3">Project poster. Select it to open the full-size image.</figcaption>
    </figure>
  );
}
