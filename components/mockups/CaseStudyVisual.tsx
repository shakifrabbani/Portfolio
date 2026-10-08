import { CheckCircle2, CloudOff, Receipt } from "lucide-react";
import { ProjectPreview } from "./ProjectPreview";
import type { Project } from "@/data/projects";
import { profile } from "@/data/profile";

/** POS window with a floating receipt and an offline notice: the online/offline story at a glance. Decorative. */
export function CaseStudyVisual({ project }: { project: Project }) {
  return (
    <div className="relative px-2 pb-10 pt-6 sm:px-6" aria-hidden="true">
      <div className="absolute inset-[10%] rounded-full bg-[radial-gradient(closest-side,rgb(108_99_255/0.35),transparent)] blur-2xl" />

      <div className="relative overflow-hidden rounded-2xl border border-line-strong shadow-[0_40px_90px_-40px_rgb(0_0_0/1),0_0_0_1px_rgb(255_255_255/0.03)]">
        <ProjectPreview variant="pos" accent={project.accent} idPrefix="case-study" />
      </div>

      <div className="animate-float-slow absolute -left-1 top-1 sm:left-0">
        <div className="flex items-center gap-2 rounded-xl border border-amber-400/30 bg-ink/90 px-3 py-2 text-[11px] font-medium text-amber-200 shadow-[0_18px_40px_-18px_rgb(0_0_0/0.9)]">
          <CloudOff className="size-3.5" /> Offline mode · billing continues
        </div>
      </div>

      <div className="animate-float absolute -bottom-1 right-0 w-[38%] min-w-[150px] max-w-[210px] [animation-delay:-2s] sm:right-2">
        <div className="rounded-2xl border border-line-strong bg-surface/95 p-3.5 shadow-[0_30px_60px_-28px_rgb(0_0_0/1)]">
          <div className="flex items-center justify-between text-[11px] font-semibold text-fg">
            <span className="inline-flex items-center gap-1.5">
              <Receipt className="size-3.5 text-accent-ink" /> Receipt
            </span>
            <span className="font-mono text-fg-3">#2187</span>
          </div>
          <div className="mt-3 space-y-1.5">
            {[72, 58, 64].map((w, i) => (
              <div key={i} className="flex items-center justify-between gap-3">
                <span className="h-1.5 rounded bg-white/15" style={{ width: `${w}%` }} />
                <span className="h-1.5 w-6 rounded bg-white/10" />
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-dashed border-line-strong pt-2.5 text-[11px]">
            <span className="text-fg-3">Total</span>
            <span className="font-semibold text-fg">Rs 3,340</span>
          </div>
          <div className="mt-2.5 flex items-center gap-1.5 rounded-lg bg-success/10 px-2 py-1.5 text-[10.5px] font-medium text-success">
            <CheckCircle2 className="size-3.5" /> Synced when back online
          </div>
        </div>
      </div>

      <p className="absolute bottom-0 left-3 font-mono text-[10px] leading-tight text-fg-3 sm:left-6">
        {profile.displayName}
        <br />
        {profile.role}
      </p>
    </div>
  );
}
