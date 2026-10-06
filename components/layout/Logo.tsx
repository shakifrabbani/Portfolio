import Link from "next/link";
import { profile } from "@/data/profile";

type LogoProps = {
  onNavigate?: () => void;
  /** "wordmark" shows the job title (navbar); "monogram" shows the initials (footer, next to the full name). */
  variant?: "wordmark" | "monogram";
};

export function Logo({ onNavigate, variant = "monogram" }: LogoProps) {
  return (
    <Link
      href="/"
      onClick={onNavigate}
      aria-label={`${profile.displayName}, ${profile.role}, home`}
      className="group/logo inline-flex items-center gap-1 rounded-lg px-2 py-1 font-display font-extrabold tracking-tight text-fg"
    >
      {variant === "wordmark" ? (
        <span className="whitespace-nowrap text-[15px] sm:text-[17px]">
          <span className="inline-block transition-transform duration-500 ease-[var(--ease-premium)] group-hover/logo:-translate-x-0.5">
            Software
          </span>{" "}
          <span className="text-gradient inline-block transition-transform duration-500 ease-[var(--ease-premium)] group-hover/logo:translate-x-0.5">
            Engineer
          </span>
        </span>
      ) : (
        <span className="text-xl">
          <span className="inline-block transition-transform duration-500 ease-[var(--ease-premium)] group-hover/logo:-rotate-6">
            {profile.initials}
          </span>
          <span className="text-gradient">.</span>
        </span>
      )}
    </Link>
  );
}
