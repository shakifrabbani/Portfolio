"use client";

import { AnimatePresence, m } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, type AnchorHTMLAttributes } from "react";
import { Logo } from "./Logo";
import { Button, ButtonArrow } from "@/components/ui/Button";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/BrandIcons";
import { navigation } from "@/data/content";
import { profile } from "@/data/profile";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn, EASE, withBasePath } from "@/lib/utils";

const sectionIds = navigation.map((item) => item.id);

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/" || pathname === "";
  const active = useActiveSection(sectionIds, isHome);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const hrefFor = (id: string) => (isHome ? `#${id}` : `/#${id}`);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4">
      <nav
        aria-label="Primary"
        className={cn(
          "mx-auto flex h-14 max-w-[1240px] items-center justify-between rounded-2xl border px-2.5 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500 ease-[var(--ease-premium)] sm:px-3",
          scrolled || open
            ? "border-line-strong bg-ink/75 shadow-[0_20px_50px_-30px_rgb(0_0_0/0.9)] backdrop-blur-xl"
            : "border-line bg-white/[0.015] backdrop-blur-[2px]",
        )}
      >
        <Logo variant="wordmark" onNavigate={close} />

        <ul className="relative hidden items-center gap-0.5 md:flex">
          {navigation.map((item) => {
            const isActive = isHome && active === item.id;
            return (
              <li key={item.id}>
                <NavLink
                  href={hrefFor(item.id)}
                  isHome={isHome}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "group/link relative block rounded-lg px-3.5 py-2 text-[13px] font-medium transition-colors duration-300",
                    isActive ? "text-fg" : "text-fg-2 hover:text-fg",
                  )}
                >
                  {isActive && (
                    <m.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-lg border border-line bg-white/[0.06]"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{item.label}</span>
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-3.5 bottom-1 h-px origin-left scale-x-0 bg-gradient-to-r from-accent to-accent-blue transition-transform duration-300 ease-[var(--ease-premium)] group-hover/link:scale-x-100"
                  />
                </NavLink>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <Button href={hrefFor("contact")} size="sm" className="max-[379px]:hidden">
            Let&apos;s Talk <ButtonArrow />
          </Button>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-10 place-items-center rounded-xl border border-line text-fg transition-colors hover:border-line-strong hover:bg-white/[0.04] md:hidden"
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-menu"
            key="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="mx-auto mt-2 max-w-[1240px] overflow-hidden rounded-2xl border border-line-strong bg-ink/95 p-3 shadow-[0_30px_80px_-30px_rgb(0_0_0/0.95)] backdrop-blur-xl md:hidden"
          >
            <m.ul
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } } }}
              className="grid"
            >
              {navigation.map((item) => (
                <m.li
                  key={item.id}
                  variants={{ hidden: { opacity: 0, x: -14 }, show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: EASE } } }}
                >
                  <NavLink
                    href={hrefFor(item.id)}
                    isHome={isHome}
                    onClick={close}
                    className={cn(
                      "flex items-center justify-between rounded-xl px-4 py-3.5 font-display text-lg font-semibold transition-colors hover:bg-white/[0.05]",
                      isHome && active === item.id ? "text-fg" : "text-fg-2",
                    )}
                  >
                    {item.label}
                    <ButtonArrowStatic />
                  </NavLink>
                </m.li>
              ))}
            </m.ul>
            <m.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4, ease: EASE }}
              className="mt-3 flex items-center gap-2 border-t border-line pt-3"
            >
              <a
                href={withBasePath(profile.resumePath)}
                download=""
                onClick={close}
                className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-[linear-gradient(135deg,#6c63ff,#4f8cff)] text-sm font-semibold text-white"
              >
                <Download className="size-4" aria-hidden="true" /> Download Resume
              </a>
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="grid size-12 place-items-center rounded-xl border border-line text-fg-2 hover:text-fg"
              >
                <GitHubIcon className="size-5" />
              </a>
              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="grid size-12 place-items-center rounded-xl border border-line text-fg-2 hover:text-fg"
              >
                <LinkedInIcon className="size-5" />
              </a>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function ButtonArrowStatic() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4 text-fg-3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

type NavLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; isHome: boolean };

/** Plain anchors for in-page hashes (native smooth scroll); next/link when jumping back to the home page. */
function NavLink({ href, isHome, children, ...rest }: NavLinkProps) {
  if (isHome) {
    return (
      <a href={href} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} {...rest}>
      {children}
    </Link>
  );
}
