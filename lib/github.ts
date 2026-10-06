import { profile } from "@/data/profile";

export type GitHubRepo = {
  name: string;
  displayName: string;
  description: string;
  url: string;
  language: string | null;
  languageColor: string;
  stars: number;
  stack: string[];
};

export type LanguageShare = { name: string; percent: number; color: string };

export type GitHubSnapshot = {
  username: string;
  profileUrl: string;
  publicRepos: number;
  repos: GitHubRepo[];
  languages: LanguageShare[];
  source: "live" | "snapshot";
};

const LANGUAGE_COLORS: Record<string, string> = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  HTML: "#e34c26",
  CSS: "#563d7c",
  PHP: "#4f5d95",
};

/** Repos to highlight, in order, with copy written for recruiters. Live data supplies stars and language. */
const HIGHLIGHTS: Record<string, { displayName: string; description: string; stack: string[] }> = {
  "Smart-Job-Portal-Application": {
    displayName: "smart-job-portal",
    description: "MERN job portal with applicant tracking and JWT auth.",
    stack: ["React", "Node.js", "MongoDB"],
  },
  "PopChat-application": {
    displayName: "popchat",
    description: "Chat app with sign-up, login and profile pages.",
    stack: ["React", "Tailwind"],
  },
  "Estate---Website": {
    displayName: "estate-website",
    description: "Real estate website built with React.",
    stack: ["React", "JavaScript"],
  },
};

/** Snapshot of public GitHub data taken on 5 October 2026, used if the API is unreachable at build time. */
const SNAPSHOT: GitHubSnapshot = {
  username: profile.socials.githubUser,
  profileUrl: profile.socials.github,
  publicRepos: 6,
  repos: [
    { name: "Smart-Job-Portal-Application", language: "JavaScript", stars: 0 },
    { name: "PopChat-application", language: "JavaScript", stars: 1 },
    { name: "Estate---Website", language: "JavaScript", stars: 1 },
  ].map((r) => ({
    ...r,
    ...HIGHLIGHTS[r.name],
    url: `${profile.socials.github}/${r.name}`,
    languageColor: LANGUAGE_COLORS[r.language] ?? "#9b8cff",
  })),
  languages: [
    { name: "JavaScript", percent: 91.7, color: LANGUAGE_COLORS.JavaScript },
    { name: "HTML", percent: 4.5, color: LANGUAGE_COLORS.HTML },
    { name: "CSS", percent: 3.8, color: LANGUAGE_COLORS.CSS },
  ],
  source: "snapshot",
};

type ApiRepo = {
  name: string;
  fork: boolean;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  languages_url: string;
};

async function getJson<T>(url: string): Promise<T> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "shakif-rabbani-portfolio",
  };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  const res = await fetch(url, { headers, signal: AbortSignal.timeout(8000), cache: "force-cache" });
  if (!res.ok) throw new Error(`GitHub ${res.status} for ${url}`);
  return (await res.json()) as T;
}

/** Fetched once at build time (static export). Falls back to the snapshot so builds never fail on network issues. */
export async function getGitHubSnapshot(): Promise<GitHubSnapshot> {
  const user = profile.socials.githubUser;
  try {
    const [account, repos] = await Promise.all([
      getJson<{ public_repos: number }>(`https://api.github.com/users/${user}`),
      getJson<ApiRepo[]>(`https://api.github.com/users/${user}/repos?per_page=100&sort=pushed`),
    ]);
    const own = repos.filter((r) => !r.fork);

    const byteTotals = new Map<string, number>();
    const perRepo = await Promise.all(own.map((r) => getJson<Record<string, number>>(r.languages_url).catch(() => ({}))));
    for (const langs of perRepo) {
      for (const [lang, bytes] of Object.entries(langs)) byteTotals.set(lang, (byteTotals.get(lang) ?? 0) + bytes);
    }
    const totalBytes = [...byteTotals.values()].reduce((a, b) => a + b, 0);
    const languages = [...byteTotals.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, bytes]) => ({
        name,
        percent: totalBytes ? Math.round((bytes / totalBytes) * 1000) / 10 : 0,
        color: LANGUAGE_COLORS[name] ?? "#9b8cff",
      }));

    const highlighted = Object.keys(HIGHLIGHTS)
      .map((name) => own.find((r) => r.name === name))
      .filter((r): r is ApiRepo => Boolean(r))
      .map((r) => ({
        name: r.name,
        ...HIGHLIGHTS[r.name],
        url: r.html_url,
        language: r.language,
        languageColor: LANGUAGE_COLORS[r.language ?? ""] ?? "#9b8cff",
        stars: r.stargazers_count,
      }));

    if (!highlighted.length || !languages.length) return SNAPSHOT;
    return {
      username: user,
      profileUrl: profile.socials.github,
      publicRepos: account.public_repos,
      repos: highlighted,
      languages,
      source: "live",
    };
  } catch (error) {
    console.warn("[github] Using snapshot data:", error instanceof Error ? error.message : error);
    return SNAPSHOT;
  }
}
