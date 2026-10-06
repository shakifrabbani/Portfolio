import { Icon } from "@/components/ui/Icon";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { strengths } from "@/data/content";

export function Strengths() {
  return (
    <section aria-labelledby="strengths-title" className="relative py-20 sm:py-24">
      <div className="container-site">
        <SectionHeader
          id="strengths-title"
          label="Engineering strengths"
          title="What I Bring to the Table"
          description="A combination of technical skills, product thinking and real-world experience."
        />
        <Stagger className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6" stagger={0.07}>
          {strengths.map((item) => (
            <StaggerItem key={item.title} className="h-full">
              <div className="card spotlight lift group h-full p-5">
                <span className="icon-tile size-10 transition-transform duration-500 ease-[var(--ease-premium)] group-hover:-translate-y-0.5 group-hover:scale-105">
                  <Icon name={item.icon} className="size-[18px]" />
                </span>
                <h3 className="mt-4 text-sm font-semibold text-fg">{item.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-fg-2">{item.text}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
