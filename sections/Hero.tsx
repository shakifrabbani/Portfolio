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

/**
 * Full-screen hero. Type, spacing and the portrait scale with the viewport *height* as well as its width
 * (clamp + min(vw, vh)), so everything down to the call-to-action fits on the first screen,
 * from a 1280×600 laptop browser to a 1920×1080 monitor.
 */
export function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative flex flex-col justify-center overflow-hidden pb-8 pt-24 sm:pt-28 lg:min-h-[100svh] lg:pb-10 lg:pt-[88px]"
    >
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

      <div className="container-site relative grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-8">
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
            className="mt-[clamp(0.9rem,2.4vh,1.4rem)] font-display text-[length:clamp(2.6rem,min(5vw,8vh),4.4rem)] font-extrabold leading-[1.04] tracking-[-0.035em] text-fg"
          >
            <span className="block overflow-hidden pb-[0.06em]">
              <span style={delay(80)} className="intro-line">
                Hi, I&apos;m
              </span>
            </span>{" "}
            <span className="block overflow-hidden pb-[0.08em]">
              <span style={delay(170)} className="intro-line text-gradient">
                {profile.displayName}.
              </span>
            </span>
          </h1>

          <p
            style={delay(270)}
            className="intro mt-[clamp(0.4rem,1.4vh,0.8rem)] font-display text-[length:clamp(1.1rem,min(1.85vw,3vh),1.5rem)] font-semibold leading-snug tracking-[-0.02em] text-fg"
          >
            I build scalable digital products.
          </p>

          <p
            style={delay(380)}
            className="intro mt-[clamp(0.7rem,1.9vh,1.15rem)] max-w-[34rem] text-[length:clamp(0.9rem,min(1.15vw,1.9vh),1.0625rem)] leading-relaxed text-fg-2"
          >
            Software Engineer &amp; Full-Stack Developer building modern web applications, business systems and mobile experiences with
            React, Next.js, Node.js, PHP and React Native.
          </p>

          <div style={delay(490)} className="intro mt-[clamp(1.1rem,3vh,1.9rem)] flex flex-wrap gap-3">
            <Button href="#projects">
              View My Work <ButtonArrow />
            </Button>
            <Button href={withBasePath(profile.resumePath)} variant="secondary" download>
              <Download className="size-4" aria-hidden="true" /> Download Resume
            </Button>
            <Button href={profile.socials.github} variant="secondary" external>
              <GitHubIcon className="size-4" /> GitHub
            </Button>
          </div>

          <ul
            style={delay(600)}
            className="intro mt-[clamp(1.1rem,3.4vh,2.1rem)] grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4 sm:gap-x-4"
            aria-label="Highlights"
          >
            {heroStats.map((stat) => (
              <li key={stat.label} className="flex items-start gap-2.5">
                <span className="mt-0.5 text-accent-ink">
                  <Icon name={stat.icon} className="size-[18px]" />
                </span>
                <span>
                  <span className="block text-sm font-semibold leading-tight text-fg">{stat.value}</span>
                  <span className="mt-0.5 block text-[11.5px] leading-snug text-fg-3">{stat.label}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <HeroVisual />
      </div>

      {/* Scroll hint, only where there is room below the content. */}
      <a
        href="#about"
        aria-label="Scroll to the about section"
        style={delay(900)}
        className="intro absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] font-medium uppercase tracking-[0.22em] text-fg-3 transition-colors hover:text-fg lg:flex [@media(max-height:820px)]:hidden"
      >
        <span className="relative h-8 w-5 rounded-full border-2 border-white/20">
          <span className="animate-scroll-dot absolute left-1/2 top-1.5 h-1.5 w-1 -translate-x-1/2 rounded-full bg-accent-soft" />
        </span>
        Scroll
      </a>
    </section>
  );
}
