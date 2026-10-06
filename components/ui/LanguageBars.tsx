"use client";

import { m } from "framer-motion";
import type { LanguageShare } from "@/lib/github";
import { EASE } from "@/lib/utils";

/** Stacked bar plus one row per language; widths grow from zero when scrolled into view. */
export function LanguageBars({ languages }: { languages: LanguageShare[] }) {
  return (
    <div>
      <div className="flex h-2.5 overflow-hidden rounded-full bg-white/[0.06]">
        {languages.map((lang, i) => (
          <m.span
            key={lang.name}
            className="h-full first:rounded-l-full last:rounded-r-full"
            style={{ backgroundColor: lang.color }}
            initial={{ width: 0 }}
            whileInView={{ width: `${lang.percent}%` }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1.2, delay: 0.15 * i, ease: EASE }}
          />
        ))}
      </div>
      <ul className="mt-6 space-y-4">
        {languages.map((lang, i) => (
          <li key={lang.name}>
            <div className="flex items-center justify-between text-[13px]">
              <span className="inline-flex items-center gap-2 text-fg">
                <span className="size-2.5 rounded-full" style={{ backgroundColor: lang.color }} aria-hidden="true" />
                {lang.name}
              </span>
              <span className="font-mono text-xs tabular-nums text-fg-2">{lang.percent.toFixed(1)}%</span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.05]">
              <m.div
                className="h-full rounded-full"
                style={{ backgroundColor: lang.color }}
                initial={{ width: 0 }}
                whileInView={{ width: `${Math.max(lang.percent, 2)}%` }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 1.2, delay: 0.2 + 0.12 * i, ease: EASE }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
