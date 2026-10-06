import Link from "next/link";
import { profile } from "@/data/profile";

export function Logo({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onNavigate}
      aria-label={`${profile.displayName}, home`}
      className="group/logo inline-flex items-center gap-1 rounded-lg px-2 py-1 font-display text-xl font-extrabold tracking-tight text-fg"
    >
      <span className="inline-block transition-transform duration-500 ease-[var(--ease-premium)] group-hover/logo:-rotate-6">
        {profile.initials}
      </span>
      <span className="text-gradient transition-transform duration-500 ease-[var(--ease-premium)] group-hover/logo:translate-x-0.5">.</span>
    </Link>
  );
}
