import { ArrowRight } from "lucide-react";
import { Icon } from "@/components/ui/Icon";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { overview } from "@/data/content";

/** Four-card recruiter summary: role, specialisation, focus and availability at a glance. */
export function QuickOverview() {
  return (
    <section aria-label="Profile overview" className="relative pt-12 sm:pt-16">
      <Stagger className="container-site grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {overview.map((item) => (
          <StaggerItem key={item.title} className="h-full">
            <a href={item.href} className="card spotlight lift group flex h-full items-center gap-4 p-5">
              <span className="icon-tile size-12">
                <Icon name={item.icon} className="size-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[15px] font-semibold text-fg">{item.title}</span>
                <span className="mt-1 block text-[13px] leading-snug text-fg-2">{item.text}</span>
              </span>
              <ArrowRight
                className="size-4 shrink-0 text-fg-3 transition-[transform,color] duration-300 group-hover:translate-x-1 group-hover:text-fg"
                aria-hidden="true"
              />
            </a>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
