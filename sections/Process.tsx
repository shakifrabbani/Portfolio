import { DrawLine } from "@/components/ui/DrawLine";
import { Icon } from "@/components/ui/Icon";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { processSteps } from "@/data/content";

export function Process() {
  return (
    <section aria-labelledby="process-title" className="relative py-10 sm:py-12">
      <div className="container-site">
        <Reveal>
          <div className="card overflow-hidden p-6 sm:p-8">
            <div aria-hidden="true" className="absolute -left-24 top-1/2 size-72 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(108_99_255/0.16),transparent)]" />
            <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-[190px_1fr] lg:items-center">
              <div>
                <p className="section-label">Development process</p>
                <h2 id="process-title" className="mt-2 font-display text-2xl font-bold tracking-tight text-fg">
                  How I Build Products
                </h2>
              </div>

              <div className="relative">
                <DrawLine className="left-[22px] right-[22px] top-[22px] hidden lg:block" />
                <Stagger className="relative grid grid-cols-1 gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 lg:gap-4" stagger={0.1}>
                  {processSteps.map((step, i) => (
                    <StaggerItem key={step.title} className="flex gap-4 lg:block">
                      <span className="relative grid size-11 shrink-0 place-items-center rounded-full border border-accent/40 bg-surface text-accent-ink shadow-[0_0_0_6px_var(--color-ink),0_10px_30px_-10px_rgb(108_99_255/0.8)]">
                        <Icon name={step.icon} className="size-[18px]" />
                      </span>
                      <div className="lg:mt-4">
                        <p className="font-mono text-[11px] text-accent-ink">{String(i + 1).padStart(2, "0")}</p>
                        <h3 className="mt-1 text-sm font-semibold text-fg">{step.title}</h3>
                        <p className="mt-1.5 text-[12.5px] leading-relaxed text-fg-2">{step.text}</p>
                      </div>
                    </StaggerItem>
                  ))}
                </Stagger>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
