"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/** Copies text to the clipboard, falling back to selecting it when the Clipboard API is blocked. */
export function CopyButton({ value, label, className }: { value: string; label: string; className?: string }) {
  const [state, setState] = useState<"idle" | "copied" | "selected">("idle");
  const timer = useRef<number | undefined>(undefined);
  const target = useRef<HTMLSpanElement>(null);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const reset = () => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setState("idle"), 2000);
  };

  const onClick = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setState("copied");
    } catch {
      const range = document.createRange();
      if (target.current) range.selectNodeContents(target.current);
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);
      setState("selected");
    }
    reset();
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex h-8 items-center gap-1.5 rounded-lg border border-line-strong px-2.5 text-xs font-medium text-fg-2 transition-colors hover:border-accent-soft/60 hover:text-fg",
        state === "copied" && "border-success/50 text-success hover:text-success",
        className,
      )}
      aria-label={label}
    >
      <span ref={target} className="sr-only">
        {value}
      </span>
      {state === "copied" ? <Check className="size-3.5" aria-hidden="true" /> : <Copy className="size-3.5" aria-hidden="true" />}
      <span aria-live="polite">{state === "copied" ? "Copied" : state === "selected" ? "Press Ctrl+C" : "Copy"}</span>
    </button>
  );
}
