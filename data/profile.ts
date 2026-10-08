import { clientProjectCount } from "./projects";

/**
 * Personal details used across the site.
 * Every number here is backed by the CV or by public GitHub data. Edit freely, but keep claims verifiable:
 * recruiters do check.
 */
export const profile = {
  name: "M. Shakif Rabbani",
  displayName: "Shakif Rabbani",
  initials: "SR",
  role: "Software Engineer",
  title: "Software Engineer & Full-Stack Developer",
  tagline: "Building scalable web, mobile and business applications.",
  location: "Lahore, Pakistan",
  email: "shakifrabbani@gmail.com",
  resumePath: "/Shakif-Rabbani-Resume.pdf",
  company: "Robonex",
  availability: {
    badge: "Available for opportunities",
    detail: "Open to full-time, remote and freelance roles.",
  },
  socials: {
    github: "https://github.com/shakifrabbani",
    githubUser: "shakifrabbani",
    linkedin: "https://www.linkedin.com/in/shakif-rabbani-902899264",
  },
  siteUrl: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://shakifrabbani.github.io/Portfolio").replace(/\/$/, ""),
  seo: {
    title: "M. Shakif Rabbani | Software Engineer & Full-Stack Developer",
    description:
      "Software Engineer and Full-Stack Developer in Lahore building web applications, business systems, POS software and mobile apps with React, Next.js, Node.js, PHP and React Native.",
    keywords: [
      "Shakif Rabbani",
      "Software Engineer",
      "Full-Stack Developer",
      "React Developer",
      "Next.js",
      "Node.js",
      "PHP",
      "React Native",
      "POS System",
      "Lahore",
      "Pakistan",
    ],
  },
} as const;

/** Hero stat row. The client product count comes from data/projects.ts; 10+ adds the six public GitHub repositories. */
export const heroStats = [
  { value: `${clientProjectCount}+`, label: "Client products", icon: "package" },
  { value: "10+", label: "Projects built", icon: "folder" },
  { value: "Full-Stack", label: "Web, Mobile & Backend", icon: "layers" },
  { value: "Available", label: "For opportunities", icon: "heart" },
] as const;
