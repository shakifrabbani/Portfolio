"use client";

import { AnimatePresence, m } from "framer-motion";
import { ArrowUp, FileDown } from "lucide-react";
import { useEffect, useState } from "react";
import { profile } from "@/data/profile";
import { EASE, withBasePath } from "@/lib/utils";

/** Desktop-only resume shortcut and back-to-top button, shown once the hero is out of view. */
export function FloatingActions() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.85);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <>
          <m.a
            key="resume"
            href={withBasePath(profile.resumePath)}
            download=""
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="group fixed bottom-6 left-6 z-40 hidden items-center gap-2 rounded-xl border border-line-strong bg-ink/80 px-4 py-2.5 text-[13px] font-semibold text-fg shadow-[0_18px_40px_-20px_rgb(0_0_0/0.9)] backdrop-blur-xl transition-colors hover:border-accent-soft/60 lg:inline-flex"
          >
            <FileDown className="size-4 text-accent-ink transition-transform duration-300 group-hover:-translate-y-0.5" aria-hidden="true" />
            Download Resume
          </m.a>
          <m.a
            key="top"
            href="#home"
            aria-label="Back to top"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="group fixed bottom-6 right-6 z-40 hidden size-11 place-items-center rounded-xl border border-line-strong bg-ink/80 text-fg shadow-[0_18px_40px_-20px_rgb(0_0_0/0.9)] backdrop-blur-xl transition-colors hover:border-accent-soft/60 lg:grid"
          >
            <ArrowUp className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5" aria-hidden="true" />
          </m.a>
        </>
      )}
    </AnimatePresence>
  );
}
