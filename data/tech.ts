import type { LucideIcon } from "lucide-react";
import { Cable, KeyRound, SquareCode, Webhook } from "lucide-react";
import {
  siCloudinary,
  siCss,
  siElectron,
  siExpress,
  siFirebase,
  siGit,
  siGithub,
  siHtml5,
  siJavascript,
  siJsonwebtokens,
  siMongodb,
  siMysql,
  siNextdotjs,
  siNodedotjs,
  siPhp,
  siPostman,
  siReact,
  siRedux,
  siTailwindcss,
  siTypescript,
  siVite,
} from "simple-icons";

type SimpleIcon = { path: string; hex: string; title: string };

export type TechDefinition =
  | { label: string; kind: "brand"; icon: SimpleIcon; color?: string }
  | { label: string; kind: "lucide"; icon: LucideIcon; color: string };

/** Single registry of every technology shown on the site. Keys are referenced from the other data files. */
export const tech = {
  react: { label: "React", kind: "brand", icon: siReact },
  nextjs: { label: "Next.js", kind: "brand", icon: siNextdotjs },
  typescript: { label: "TypeScript", kind: "brand", icon: siTypescript },
  javascript: { label: "JavaScript", kind: "brand", icon: siJavascript },
  redux: { label: "Redux", kind: "brand", icon: siRedux },
  tailwind: { label: "Tailwind CSS", kind: "brand", icon: siTailwindcss },
  html: { label: "HTML5", kind: "brand", icon: siHtml5 },
  css: { label: "CSS3", kind: "brand", icon: siCss },
  nodejs: { label: "Node.js", kind: "brand", icon: siNodedotjs },
  express: { label: "Express.js", kind: "brand", icon: siExpress },
  php: { label: "PHP", kind: "brand", icon: siPhp, color: "#8892BF" },
  restapi: { label: "REST APIs", kind: "lucide", icon: Webhook, color: "#9B8CFF" },
  auth: { label: "JWT Auth", kind: "brand", icon: siJsonwebtokens, color: "#F472B6" },
  integration: { label: "API Integration", kind: "lucide", icon: Cable, color: "#4F8CFF" },
  mysql: { label: "MySQL", kind: "brand", icon: siMysql, color: "#5B9BD5" },
  mongodb: { label: "MongoDB", kind: "brand", icon: siMongodb },
  firebase: { label: "Firebase", kind: "brand", icon: siFirebase },
  cloudinary: { label: "Cloudinary", kind: "brand", icon: siCloudinary, color: "#5B8DEF" },
  reactnative: { label: "React Native", kind: "brand", icon: siReact },
  electron: { label: "Electron", kind: "brand", icon: siElectron, color: "#9FEAF9" },
  git: { label: "Git", kind: "brand", icon: siGit },
  github: { label: "GitHub", kind: "brand", icon: siGithub },
  postman: { label: "Postman", kind: "brand", icon: siPostman },
  vite: { label: "Vite", kind: "brand", icon: siVite },
  vscode: { label: "VS Code", kind: "lucide", icon: SquareCode, color: "#3B9BF5" },
  security: { label: "Auth & Security", kind: "lucide", icon: KeyRound, color: "#F472B6" },
} satisfies Record<string, TechDefinition>;

export type TechKey = keyof typeof tech;
