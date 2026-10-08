import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { Footer } from "@/components/layout/Footer";
import { MotionProvider } from "@/components/layout/MotionProvider";
import { Navbar } from "@/components/layout/Navbar";
import { PauseOffscreenAnimations } from "@/components/layout/PauseOffscreenAnimations";
import { PointerEffects } from "@/components/layout/PointerEffects";
import { RenderAllSections } from "@/components/layout/RenderAllSections";
import { SiteBackground } from "@/components/layout/SiteBackground";
import { profile } from "@/data/profile";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta", display: "swap", weight: ["600", "700", "800"] });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap", weight: ["400", "500"] });

const ogImage = `${profile.siteUrl}/og-card.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(`${profile.siteUrl}/`),
  title: { default: profile.seo.title, template: `%s | ${profile.name}` },
  description: profile.seo.description,
  keywords: [...profile.seo.keywords],
  authors: [{ name: profile.name, url: profile.siteUrl }],
  creator: profile.name,
  alternates: { canonical: `${profile.siteUrl}/` },
  openGraph: {
    type: "website",
    url: `${profile.siteUrl}/`,
    siteName: profile.name,
    title: profile.seo.title,
    description: profile.seo.description,
    locale: "en_US",
    images: [{ url: ogImage, width: 1200, height: 630, alt: `${profile.name}, ${profile.title}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: profile.seo.title,
    description: profile.seo.description,
    images: [ogImage],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#07090d",
  colorScheme: "dark",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.title,
  url: `${profile.siteUrl}/`,
  image: ogImage,
  email: `mailto:${profile.email}`,
  telephone: `+${profile.whatsapp.number}`,
  address: { "@type": "PostalAddress", addressLocality: "Lahore", addressCountry: "PK" },
  worksFor: { "@type": "Organization", name: profile.company },
  alumniOf: { "@type": "CollegeOrUniversity", name: "The Islamia University of Bahawalpur" },
  knowsAbout: ["React", "Next.js", "TypeScript", "Node.js", "Express.js", "PHP", "React Native", "MySQL", "MongoDB", "Firebase", "REST APIs"],
  sameAs: [profile.socials.github, profile.socials.linkedin],
};

const renderAllSectionsScript = `(function (root) {
  var all = function () { root.dataset.sections = "all"; };
  if (location.hash) return all();
  document.addEventListener("click", function (e) {
    if (e.target.closest && e.target.closest("a[href*='#']")) all();
  }, true);
})(document.documentElement);`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    // Browser extensions (ColorZilla, Grammarly, translators, dark-mode tools) add attributes to <html> and
    // <body> before React hydrates. suppressHydrationWarning ignores attribute mismatches on these two tags
    // only; everything inside them is still checked.
    <html lang="en" className={`${inter.variable} ${jakarta.variable} ${mono.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        {/* Runs before anything renders: opened with a #hash, or an anchor clicked before React loads, renders every
            section first so the browser scrolls to the real position (see RenderAllSections). */}
        <script dangerouslySetInnerHTML={{ __html: renderAllSectionsScript }} />
        <noscript>
          <style>{"[data-reveal]{opacity:1!important;transform:none!important}main>section{content-visibility:visible!important}"}</style>
        </noscript>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <MotionProvider>
          <SiteBackground />
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
          <FloatingActions />
          <CustomCursor />
          <PointerEffects />
          <PauseOffscreenAnimations />
          <RenderAllSections />
        </MotionProvider>
      </body>
    </html>
  );
}
