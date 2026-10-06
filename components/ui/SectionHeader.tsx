import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  label: string;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  id?: string;
  className?: string;
};

/** Label + heading on the left, supporting copy or an action on the right, as in the design. */
export function SectionHeader({ label, title, description, action, id, className }: SectionHeaderProps) {
  return (
    <div className={cn("mb-10 flex flex-col gap-5 md:mb-12 md:flex-row md:items-end md:justify-between", className)}>
      <div className="max-w-2xl">
        <Reveal>
          <p className="section-label">{label}</p>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 id={id} className="section-title mt-3">
            {title}
          </h2>
        </Reveal>
      </div>
      {(description || action) && (
        <Reveal delay={0.12} className="flex flex-col gap-4 md:items-end md:text-right">
          {description && <p className="max-w-md text-sm leading-relaxed text-fg-2">{description}</p>}
          {action}
        </Reveal>
      )}
    </div>
  );
}
