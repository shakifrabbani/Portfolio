import { ArrowUp, Mail } from "lucide-react";
import { Logo } from "./Logo";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/BrandIcons";
import { profile } from "@/data/profile";

export function Footer() {
  const year = new Date().getFullYear();
  const socials = [
    { label: "LinkedIn", href: profile.socials.linkedin, icon: <LinkedInIcon className="size-4" /> },
    { label: "GitHub", href: profile.socials.github, icon: <GitHubIcon className="size-4" /> },
    { label: "Email", href: `mailto:${profile.email}`, icon: <Mail className="size-4" aria-hidden="true" /> },
  ];

  return (
    <footer className="relative mt-8 border-t border-line">
      <div aria-hidden="true" className="absolute inset-x-0 -top-px mx-auto h-px max-w-3xl bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
      <div className="container-site grid grid-cols-1 gap-8 py-10 md:grid-cols-3 md:items-center">
        <div className="flex items-center gap-3">
          <Logo />
          <div className="leading-tight">
            <p className="text-sm font-semibold text-fg">{profile.name}</p>
            <p className="text-xs text-fg-3">{profile.title}</p>
          </div>
        </div>
        <p className="text-sm text-fg-3 md:text-center">Built with Next.js &amp; Framer Motion</p>
        <div className="flex items-center gap-2 md:justify-end">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              aria-label={s.label}
              {...(s.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="grid size-10 place-items-center rounded-xl border border-line text-fg-2 transition-[transform,color,border-color] duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:text-fg"
            >
              {s.icon}
            </a>
          ))}
        </div>
      </div>
      <div className="container-site flex flex-col items-center justify-between gap-3 border-t border-line py-6 text-xs text-fg-3 sm:flex-row">
        <p>
          © {year} {profile.name}. All rights reserved.
        </p>
        <a href="#top" className="group inline-flex items-center gap-1.5 rounded-lg px-2 py-1 transition-colors hover:text-fg">
          Back to top <ArrowUp className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}
