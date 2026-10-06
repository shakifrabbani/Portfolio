import { Button, ButtonArrow } from "@/components/ui/Button";
import { CountUp } from "@/components/ui/CountUp";
import { Icon } from "@/components/ui/Icon";
import { JourneyChart } from "@/components/ui/JourneyChart";
import { MaskReveal } from "@/components/ui/MaskReveal";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { principles } from "@/data/content";
import { profile } from "@/data/profile";

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative py-20 sm:py-24">
      <div className="container-site grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)_minmax(0,0.95fr)] lg:items-center lg:gap-8">
        <div>
          <Reveal>
            <p className="section-label">About me</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 id="about-title" className="section-title mt-3">
              More Than
              <br />
              Just Code
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-5 text-[15px] leading-relaxed text-fg-2">
              I&apos;m a Software Engineer focused on turning ideas and business requirements into reliable digital products. I work across
              frontend and backend, building responsive interfaces, REST APIs and database-driven business systems.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <Button href={profile.socials.linkedin} variant="secondary" size="sm" external className="mt-7">
              Learn More About Me <ButtonArrow />
            </Button>
          </Reveal>
        </div>

        <Stagger className="grid gap-8 sm:grid-cols-3 sm:gap-0" stagger={0.12}>
          {principles.map((item, i) => (
            <StaggerItem key={item.title} className="sm:border-l sm:border-line sm:px-6">
              <Icon name={item.icon} className="size-5 text-accent-ink" />
              <p className="mt-4 font-display text-2xl font-bold tracking-tight">
                <MaskReveal delay={0.15 + i * 0.12} className="text-gradient">{`0${i + 1}`}</MaskReveal>
              </p>
              <h3 className="mt-3 text-[15px] font-semibold text-fg">{item.title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-fg-2">{item.text}</p>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.2}>
          <div className="card spotlight relative overflow-hidden p-6">
            <div aria-hidden="true" className="absolute -right-16 -top-16 size-48 rounded-full bg-[radial-gradient(closest-side,rgb(108_99_255/0.28),transparent)]" />
            <p className="relative text-[15px] font-semibold text-fg">My Journey</p>
            <p className="relative mt-2 max-w-[15rem] text-[13px] leading-relaxed text-fg-2">
              From a BS in Software Engineering to shipping client products at {profile.company}.
            </p>
            <div className="relative mt-4 h-24">
              <JourneyChart />
            </div>
            <p className="relative mt-3 font-display text-5xl font-extrabold tracking-tight text-fg">
              <CountUp value={5} />
            </p>
            <p className="relative mt-1 text-[13px] text-fg-2">Client products shipped in six months</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
