import { Download } from "lucide-react";
import { HeroVisual } from "@/components/hero/HeroVisual";
import { GitHubIcon } from "@/components/ui/BrandIcons";
import { Button, ButtonArrow } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { heroStats, profile } from "@/data/profile";
import { delay, withBasePath } from "@/lib/utils";

const particles = [
  { left: "6%", top: "22%", size: 3, d: "0s" },
  { left: "14%", top: "70%", size: 2, d: "-3s" },
  { left: "28%", top: "12%", size: 2, d: "-6s" },
  { left: "41%", top: "82%", size: 3, d: "-2s" },
  { left: "52%", top: "18%", size: 2, d: "-8s" },
  { left: "63%", top: "64%", size: 2, d: "-5s" },
  { left: "74%", top: "9%", size: 3, d: "-1s" },
  { left: "86%", top: "52%", size: 2, d: "-7s" },
  { left: "93%", top: "26%", size: 2, d: "-4s" },
  { left: "35%", top: "48%", size: 2, d: "-9s" },
];

export function Hero() {
  return (
    <section id="home" aria-labelledby="hero-title" className="relative overflow-hidden pb-6 pt-28 sm:pt-32 lg:pt-36">
      {/* Hero-only atmosphere: soft glow and a few slow particles (fewer on small screens). */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute right-[-10%] top-[-20%] h-[640px] w-[640px] rounded-full bg-[radial-gradient(closest-side,rgb(108_99_255/0.18),transparent)]" />
        {particles.map((p, i) => (
          <span
            key={i}
            className={`animate-drift absolute rounded-full bg-accent-soft/50 ${i > 5 ? "hidden md:block" : ""}`}
            style={{ left: p.left, top: p.top, width: p.size, height: p.size, animationDelay: p.d }}
          />
        ))}
      </div>

      <div className="container-site relative grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:gap-6">
        <div>
          <p style={delay(0)} className="intro inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-fg-2">
            <span className="relative grid size-2 place-items-center">
              <span className="animate-ping-soft absolute inset-0 rounded-full bg-success" />
              <span className="relative size-2 rounded-full bg-success" />
            </span>
            {profile.availability.badge}
          </p>

          <h1
            id="hero-title"
            className="mt-6 font-display text-[2.6rem] font-extrabold leading-[1.04] tracking-[-0.035em] text-fg sm:text-6xl lg:text-[4rem] xl:text-[4.35rem]"
          >
            <span className="block overflow-hidden pb-[0.06em]">
              <span style={delay(80)} className="intro-line">
                Hi, I&apos;m
              </span>
            </span>{" "}
            <span className="block overflow-hidden pb-[0.06em]">
              <span style={delay(170)} className="intro-line text-gradient">
                {profile.displayName}.
              </span>
            </span>{" "}
            <span className="block overflow-hidden pb-[0.06em]">
              <span style={delay(260)} className="intro-line">
                I build scalable
              </span>
            </span>{" "}
            <span className="block overflow-hidden pb-[0.1em]">
              <span style={delay(350)} className="intro-line">
                digital products.
              </span>
            </span>
          </h1>

          <p style={delay(480)} className="intro mt-6 max-w-xl text-base leading-relaxed text-fg-2 sm:text-[17px]">
            Software Engineer &amp; Full-Stack Developer building modern web applications, business systems and mobile experiences with
            React, Next.js, Node.js, PHP and React Native.
          </p>

          <div style={delay(600)} className="intro mt-8 flex flex-wrap gap-3">
            <Button href="#projects" size="lg">
              View My Work <ButtonArrow />
            </Button>
            <Button href={withBasePath(profile.resumePath)} variant="secondary" size="lg" download>
              <Download className="size-4" aria-hidden="true" /> Download Resume
            </Button>
            <Button href={profile.socials.github} variant="secondary" size="lg" external>
              <GitHubIcon className="size-4" /> GitHub
            </Button>
          </div>

          <ul style={delay(720)} className="intro mt-10 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4 sm:gap-x-4" aria-label="Highlights">
            {heroStats.map((stat) => (
              <li key={stat.label} className="flex items-start gap-3">
                <span className="mt-0.5 text-accent-ink">
                  <Icon name={stat.icon} className="size-5" />
                </span>
                <span>
                  <span className="block text-[15px] font-semibold leading-tight text-fg">{stat.value}</span>
                  <span className="mt-0.5 block text-xs text-fg-3">{stat.label}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <HeroVisual />
      </div>
    </section>
  );
}
