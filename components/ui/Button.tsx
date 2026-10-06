import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "group/btn relative inline-flex items-center justify-center gap-2 overflow-hidden font-semibold whitespace-nowrap transition-[transform,box-shadow,background-color,border-color,color] duration-300 ease-[var(--ease-premium)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-soft focus-visible:ring-offset-2 focus-visible:ring-offset-ink";

const variants: Record<Variant, string> = {
  primary:
    "bg-[linear-gradient(135deg,#6c63ff_0%,#4f8cff_100%)] text-white shadow-[0_10px_30px_-10px_rgb(108_99_255/0.75),inset_0_1px_0_rgb(255_255_255/0.18)] hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-12px_rgb(108_99_255/0.9),inset_0_1px_0_rgb(255_255_255/0.22)]",
  secondary:
    "border border-line-strong bg-white/[0.02] text-fg hover:-translate-y-0.5 hover:border-accent-soft/50 hover:bg-white/[0.05]",
  ghost: "text-fg-2 hover:text-fg",
};

const sizes: Record<Size, string> = {
  sm: "h-9 rounded-[10px] px-4 text-[13px]",
  md: "h-11 rounded-[11px] px-5 text-sm",
  lg: "h-12 rounded-xl px-6 text-[15px]",
};

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  external?: boolean;
  download?: boolean;
  ariaLabel?: string;
};

/** Link styled as a button. Internal routes use next/link; hashes, mail, files and external URLs use <a>. */
export function Button({ href, children, variant = "primary", size = "md", className, external, download, ariaLabel }: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);
  const sheen =
    variant === "primary" ? (
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(110deg,transparent_30%,rgb(255_255_255/0.28)_50%,transparent_70%)] transition-transform duration-700 ease-[var(--ease-premium)] group-hover/btn:translate-x-full"
      />
    ) : null;

  const isRoute = href.startsWith("/") && !download && !external && !/\.[a-z0-9]+$/i.test(href.split("#")[0]);
  if (isRoute) {
    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        {sheen}
        {children}
      </Link>
    );
  }
  return (
    <a
      href={href}
      className={classes}
      aria-label={ariaLabel}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...(download ? { download: "" } : {})}
    >
      {sheen}
      {children}
    </a>
  );
}

/** Arrow that nudges forward when its parent button is hovered. */
export function ButtonArrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={cn(
        "relative size-4 transition-transform duration-300 ease-[var(--ease-premium)]",
        diagonal ? "group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" : "group-hover/btn:translate-x-1",
      )}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {diagonal ? <path d="M7 17 17 7M8 7h9v9" /> : <path d="M5 12h14M13 6l6 6-6 6" />}
    </svg>
  );
}
