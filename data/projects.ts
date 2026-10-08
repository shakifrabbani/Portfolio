import type { TechKey } from "./tech";

export type Platform = "web" | "desktop" | "mobile";
export type PreviewVariant = "restaurant" | "pos" | "salon" | "inspection" | "services" | "jobs";
export type SurfaceKind = Platform | "store" | "service";

export interface Project {
  slug: string;
  title: string;
  category: string;
  year: string;
  context: string;
  role: string;
  summary: string;
  overview: string;
  problem: string;
  solution: string;
  features: string[];
  responsibilities: string[];
  outcome?: string;
  platforms: Platform[];
  /** Apps or deployments shown in the architecture map. */
  surfaces: { label: string; kind: SurfaceKind }[];
  /** Label for the shared layer underneath the surfaces. */
  backend: string;
  stack: TechKey[];
  links: { live?: string; github?: string };
  preview: PreviewVariant;
  accent: [string, string];
  /** Optional real screenshot under /public (e.g. "/projects/retail-pos.webp"). Replaces the coded preview everywhere. */
  screenshot?: string;
  /**
   * Optional design poster under /public. Fills its frame on project cards and the case study, which take
   * the poster's own aspect ratio, so nothing is cropped. A landscape image around 16:9 suits the card grid.
   */
  poster?: {
    src: string;
    width: number;
    height: number;
    alt: string;
    /**
     * Buttons drawn on the poster that become real links on the case study: "live" opens links.live and
     * "details" jumps to the write-up. `area` is [left, top, width, height] in % of the poster.
     */
    actions?: { label: string; target: "live" | "details"; area: [number, number, number, number] }[];
  };
}

/**
 * Content is limited to what the CV or the public repository states.
 * Add screenshots, metrics and extra detail here as you collect them.
 */
export const projects: Project[] = [
  {
    slug: "hot-spicy-restaurant-system",
    title: "Hot & Spicy Restaurant System",
    category: "Restaurant Platform",
    year: "2026",
    context: "Client project · Robonex",
    role: "Software Engineer",
    summary: "Online ordering website, admin panel, desktop POS, kitchen management and a mobile app in one restaurant system.",
    overview:
      "A restaurant system made of five connected parts: a website with menus and online ordering, an admin panel, a desktop POS for the counter, kitchen management and a mobile app.",
    problem: "Orders arrive from the website, the counter and a mobile app, and the kitchen has to see every one of them.",
    solution: "Five connected apps on one shared back end, so menus, orders and kitchen status stay in sync across web, desktop and mobile.",
    features: ["Website with menus and online ordering", "Admin panel", "Desktop POS for the counter", "Kitchen management", "Mobile app"],
    responsibilities: [
      "Feature development across the website, admin panel, desktop POS and mobile app.",
      "REST API integration between each app and the shared back end.",
    ],
    platforms: ["web", "desktop", "mobile"],
    surfaces: [
      { label: "Ordering website", kind: "web" },
      { label: "Admin panel", kind: "web" },
      { label: "Desktop POS", kind: "desktop" },
      { label: "Kitchen management", kind: "service" },
      { label: "Mobile app", kind: "mobile" },
    ],
    backend: "One back end for every app",
    stack: [],
    links: {},
    preview: "restaurant",
    accent: ["#f97316", "#ef4444"],
  },
  {
    slug: "retail-pos-system",
    title: "Retail POS System",
    category: "Retail Technology",
    year: "2026",
    context: "Client project · Robonex",
    role: "Software Engineer",
    summary: "Point of sale that keeps billing online and offline, built for Apex Mart, Dada Fabrics, Gems Traders and other retail clients.",
    overview:
      "A desktop point of sale for retail counters. It runs online and offline, so stores keep billing customers when the connection drops.",
    problem: "Retail counters cannot stop billing customers when the internet goes down.",
    solution: "A desktop POS that runs online and offline, built with a React interface, a PHP back end and a MySQL database.",
    features: ["Sales processing at the counter", "Works online and offline", "Desktop app for retail stores", "Running at several retail clients"],
    responsibilities: [
      "Developed the desktop POS that runs online and offline.",
      "Worked across the React interface, PHP back end and MySQL database.",
    ],
    outcome: "In use at retail clients including Apex Mart, Dada Fabrics and Gems Traders.",
    platforms: ["desktop"],
    surfaces: [
      { label: "Apex Mart", kind: "store" },
      { label: "Dada Fabrics", kind: "store" },
      { label: "Gems Traders", kind: "store" },
    ],
    backend: "PHP + MySQL · online and offline",
    stack: ["react", "php", "mysql"],
    links: {},
    preview: "pos",
    accent: ["#10b981", "#22d3ee"],
  },
  {
    slug: "humas-signature-salon",
    title: "Huma's Signature Salon",
    category: "Booking Platform",
    year: "2026",
    context: "Client project · Robonex",
    role: "Software Engineer",
    summary: "Salon website with online appointment booking, an admin panel and a desktop POS app for the counter.",
    overview:
      "A salon's digital front desk: clients book appointments on the website, the team manages them in an admin panel and the counter bills through a desktop POS app.",
    problem: "Clients want to book online, and the salon needs bookings and billing in one place.",
    solution: "A booking website, an admin panel and a desktop POS built on one React, PHP and MySQL stack.",
    features: ["Online appointment booking", "Admin panel", "Desktop POS for the counter", "Live at humassignaturesalon.com"],
    responsibilities: ["Development across the booking website, admin panel and desktop POS."],
    outcome: "Live at humassignaturesalon.com.",
    platforms: ["web", "desktop"],
    surfaces: [
      { label: "Booking website", kind: "web" },
      { label: "Admin panel", kind: "web" },
      { label: "Desktop POS", kind: "desktop" },
    ],
    backend: "PHP + MySQL",
    stack: ["react", "php", "mysql"],
    links: { live: "https://humassignaturesalon.com" },
    preview: "salon",
    accent: ["#f472b6", "#f59e0b"],
    poster: {
      src: "/projects/humas-signature-salon-showcase.webp",
      width: 1672,
      height: 941,
      alt: "Huma's Signature Salon management system: the admin dashboard on a laptop and the booking site on a phone, covering appointments and booking, staff, services and packages, payments and POS, customers, and reports.",
      actions: [
        { label: "View the live site at humassignaturesalon.com", target: "live", area: [3.47, 87.14, 16.69, 5.1] },
        { label: "Jump to the case study details", target: "details", area: [20.87, 87.04, 13.52, 5.42] },
      ],
    },
  },
  {
    slug: "property-inspection-app",
    title: "Property Inspection App",
    category: "Mobile Platform",
    year: "2026",
    context: "Client project · Robonex",
    role: "Software Engineer",
    summary: "Four-role platform: web panels for admins and managers, mobile apps for property inspectors and clients.",
    overview:
      "One platform, four roles. Admins and managers work in web panels, while inspectors and clients use mobile apps on the same Firebase data.",
    problem: "Admins, managers, inspectors and clients each need their own view of the same inspections.",
    solution: "Role-based web panels and React Native apps on a shared Firebase back end.",
    features: ["Four user roles", "Web panels for admins and managers", "Mobile app for inspectors", "Mobile app for clients"],
    responsibilities: ["Development across the React Native apps and the Firebase data layer."],
    platforms: ["web", "mobile"],
    surfaces: [
      { label: "Admin panel", kind: "web" },
      { label: "Manager panel", kind: "web" },
      { label: "Inspector app", kind: "mobile" },
      { label: "Client app", kind: "mobile" },
    ],
    backend: "Firebase",
    stack: ["reactnative", "firebase"],
    links: {},
    preview: "inspection",
    accent: ["#22d3ee", "#6366f1"],
  },
  {
    slug: "home-service-platform",
    title: "Home Service Platform",
    category: "Web Platform",
    year: "2026",
    context: "Client project · Robonex",
    role: "Software Engineer",
    summary: "Website for a platform where customers book home services, built with TypeScript, React and Node.js.",
    overview: "A customer-facing website for booking home services, with a typed React front end and a Node.js back end.",
    problem: "Customers need a simple way to book home services online.",
    solution: "A booking website with a TypeScript and React front end on a Node.js back end.",
    features: ["Online booking for home services", "TypeScript React front end", "Node.js back end"],
    responsibilities: ["Development of the TypeScript and React booking website and its Node.js back end."],
    platforms: ["web"],
    surfaces: [{ label: "Customer booking website", kind: "web" }],
    backend: "Node.js back end",
    stack: ["typescript", "react", "nodejs"],
    links: {},
    preview: "services",
    accent: ["#f59e0b", "#14b8a6"],
  },
  {
    slug: "smart-job-portal",
    title: "Smart Job Portal",
    category: "Open Source · MERN",
    year: "2026",
    context: "Personal project · Open source",
    role: "Full-Stack Developer",
    summary: "MERN job portal with applicant tracking, job search filters and JWT authentication for seekers and recruiters.",
    overview:
      "A full-stack job portal that connects job seekers with employers. Seekers search jobs and track applications, while recruiters post jobs and review applicants.",
    problem: "Job seekers need to track every application, and recruiters need one place to review applicants.",
    solution: "A MERN stack platform with role-based dashboards, an applicant tracking flow and JWT authentication.",
    features: [
      "Application dashboard with Pending, Interview, Rejected and Selected statuses",
      "Job search by title, location, industry and job type",
      "Profile builder with resume uploads",
      "Job management console for recruiters",
      "Applicant tracking with one-click status changes",
      "Company profiles",
    ],
    responsibilities: [
      "Built the full stack: React front end, Express REST API and MongoDB models.",
      "JWT authentication with HTTP-only cookies and bcrypt password hashing.",
      "Resume and profile image uploads through Cloudinary.",
    ],
    outcome: "Open source on GitHub.",
    platforms: ["web"],
    surfaces: [
      { label: "Job seeker dashboard", kind: "web" },
      { label: "Recruiter console", kind: "web" },
      { label: "Express REST API", kind: "service" },
    ],
    backend: "Node.js + Express · MongoDB",
    stack: ["react", "redux", "tailwind", "nodejs", "express", "mongodb"],
    links: { github: "https://github.com/shakifrabbani/Smart-Job-Portal-Application" },
    preview: "jobs",
    accent: ["#6c63ff", "#4f8cff"],
  },
];

export const caseStudySlug = "retail-pos-system";

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
