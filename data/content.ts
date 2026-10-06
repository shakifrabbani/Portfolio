import type { TechKey } from "./tech";

export const navigation = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
] as const;

export type SectionId = (typeof navigation)[number]["id"];

/** Recruiter quick overview, directly under the hero. */
export const overview = [
  {
    icon: "briefcase",
    title: "Software Engineer",
    text: "Turning ideas into real-world applications at Robonex.",
    href: "#experience",
  },
  {
    icon: "code",
    title: "Full-Stack Development",
    text: "Interfaces, back ends, databases and integrations.",
    href: "#skills",
  },
  {
    icon: "layers",
    title: "Web, Mobile & Business",
    text: "From booking websites to POS and restaurant systems.",
    href: "#projects",
  },
  {
    icon: "zap",
    title: "Open to Opportunities",
    text: "Available for full-time, remote and freelance roles.",
    href: "#contact",
  },
] as const;

export const principles = [
  {
    icon: "users",
    title: "Build for users.",
    text: "I create interfaces that are intuitive, accessible and enjoyable to use.",
  },
  {
    icon: "network",
    title: "Engineer for scale.",
    text: "I design systems that stay maintainable as products and teams grow.",
  },
  {
    icon: "search",
    title: "Keep it maintainable.",
    text: "I write clean, structured code that is easy to read, test and extend.",
  },
] as const;

export type SkillGroup = {
  title: string;
  items: TechKey[];
  span?: "wide" | "narrow";
};

export const skillGroups: SkillGroup[] = [
  { title: "Frontend Engineering", items: ["react", "nextjs", "typescript", "javascript", "redux", "tailwind", "html", "css"], span: "wide" },
  { title: "Backend Engineering", items: ["nodejs", "express", "php", "restapi", "auth", "integration"], span: "wide" },
  { title: "Data & Cloud", items: ["mysql", "mongodb", "firebase", "cloudinary"] },
  { title: "Mobile & Desktop", items: ["reactnative", "electron"], span: "narrow" },
  { title: "Tools & Workflow", items: ["git", "github", "postman", "vite", "vscode"], span: "wide" },
];

export type TimelineEntry = {
  kind: "work" | "education";
  role: string;
  org: string;
  period: string;
  location?: string;
  summary: string;
  highlights: string[];
  stack?: TechKey[];
  current?: boolean;
  score?: { value: string; label: string };
};

export const timeline: TimelineEntry[] = [
  {
    kind: "work",
    role: "Software Engineer",
    org: "Robonex",
    period: "04/2026 – Present",
    location: "DHA Rahbar, Lahore · On-site",
    summary:
      "Building full-stack web, mobile and desktop products for real clients, from the interface to the database, both independently and as part of a team.",
    highlights: [
      "Delivered five client products across web, mobile and desktop in six months.",
      "Built features end to end with React and React Native interfaces and Node.js, Express.js and PHP back ends.",
      "Worked across MySQL, MongoDB and Firebase data layers.",
      "Developed desktop POS apps that run online and offline for retail and restaurant clients.",
      "Designed REST APIs connecting websites, admin panels, mobile and desktop apps to a shared back end.",
      "Managed code with Git and GitHub and tested APIs with Postman.",
    ],
    stack: ["react", "reactnative", "nodejs", "express", "php", "mysql", "mongodb", "firebase"],
    current: true,
  },
  {
    kind: "education",
    role: "BS Software Engineering",
    org: "The Islamia University of Bahawalpur",
    period: "2022 – 2026",
    summary: "Four-year undergraduate degree in software engineering.",
    highlights: ["Intermediate (Pre-Medical) before university: 1030 / 1100 marks (93.6%)."],
    score: { value: "3.54", label: "CGPA" },
  },
];

export const processSteps = [
  { icon: "search", title: "Understand", text: "User needs, business goals and technical constraints." },
  { icon: "map", title: "Plan", text: "Architecture, database structure and interface flows." },
  { icon: "pen", title: "Design", text: "Intuitive, responsive interfaces and reusable components." },
  { icon: "code", title: "Develop", text: "Frontend, back end, APIs and integrations." },
  { icon: "test", title: "Test", text: "Functionality, responsiveness, performance and edge cases." },
  { icon: "rocket", title: "Launch", text: "Deploy, monitor and keep improving the product." },
] as const;

export const strengths = [
  { icon: "layers", title: "Full-Stack Development", text: "Frontend, back end and database built as one integrated system." },
  { icon: "network", title: "Scalable Architecture", text: "Structures that stay maintainable as the product grows." },
  { icon: "store", title: "Business Software", text: "POS, booking and restaurant management systems for real clients." },
  { icon: "monitor", title: "Responsive UI", text: "Interfaces that work on desktop, tablet and mobile." },
  { icon: "plug", title: "API Integration", text: "REST APIs, authentication and third-party services." },
  { icon: "lightbulb", title: "Product Thinking", text: "Solving the business problem, not just shipping screens." },
] as const;
