import { Database } from "lucide-react";
import { Icon, type IconName } from "@/components/ui/Icon";
import type { Project, SurfaceKind } from "@/data/projects";

const surfaceIcon: Record<SurfaceKind, IconName> = {
  web: "web",
  desktop: "desktop",
  mobile: "mobile",
  store: "store",
  service: "service",
};

/** Architecture sketch: every app or deployment feeding one shared layer, with data pulses along the bus. */
export function SystemMap({ project }: { project: Project }) {
  return (
    <div className="card relative overflow-hidden p-6 sm:p-8">
      <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_75%)]" />
      <ul className="relative flex flex-wrap justify-center gap-3" aria-label="Apps and deployments">
        {project.surfaces.map((surface, i) => (
          <li
            key={surface.label}
            className="flex items-center gap-2 rounded-xl border border-line-strong bg-surface/90 px-3.5 py-2.5 text-sm font-medium text-fg shadow-[0_12px_30px_-18px_rgb(0_0_0/0.9)]"
            style={{ animation: `float 7s ease-in-out ${-i * 1.1}s infinite` }}
          >
            <span className="text-accent-ink">
              <Icon name={surfaceIcon[surface.kind]} className="size-4" />
            </span>
            {surface.label}
          </li>
        ))}
      </ul>

      <div aria-hidden="true" className="relative mx-auto mt-6 h-10 w-px bg-gradient-to-b from-line-strong to-accent/60" />
      <div aria-hidden="true" className="relative mx-auto h-px max-w-xl bg-gradient-to-r from-transparent via-accent/70 to-transparent">
        <span className="animate-flow absolute top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_12px_3px_rgb(155_140_255/0.9)]" />
      </div>
      <div aria-hidden="true" className="relative mx-auto h-6 w-px bg-accent/60" />

      <div className="relative mx-auto flex w-fit items-center gap-3 rounded-2xl border border-accent/40 bg-accent/10 px-5 py-3.5 shadow-[0_0_40px_-12px_rgb(108_99_255/0.8)]">
        <span className="icon-tile size-9 rounded-[10px]">
          <Database className="size-4" aria-hidden="true" />
        </span>
        <span>
          <span className="block text-[11px] font-medium uppercase tracking-[0.14em] text-accent-ink">Shared layer</span>
          <span className="block text-sm font-semibold text-fg">{project.backend}</span>
        </span>
      </div>
    </div>
  );
}
