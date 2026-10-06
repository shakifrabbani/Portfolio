# M. Shakif Rabbani · Portfolio

Personal portfolio of **M. Shakif Rabbani**, Software Engineer and Full-Stack Developer in Lahore, Pakistan.

Live site: https://shakifrabbani.github.io/Portfolio/ (after GitHub Pages is set up, see [Deployment](#deployment))

## Stack

Next.js 16 (App Router, static export) · React 19 · TypeScript · Tailwind CSS 4 · Framer Motion · Lucide · Simple Icons

## What's inside

- **Home page sections:** hero, recruiter overview, about, skills, experience timeline, selected work, case study, development process, engineering strengths, GitHub activity and contact.
- **Project pages:** `/projects/` lists every project and each one gets a statically generated case-study page at `/projects/<slug>/`.
- **Motion:** CSS hero intro that paints before hydration, scroll reveals, count-up numbers, mouse and scroll parallax, a scroll-linked timeline, animated architecture maps, cursor spotlight on cards, a desktop custom cursor, a sliding nav indicator and an animated mobile menu.
- **Live GitHub data:** repository count, highlighted repos and language breakdown are fetched at build time, with a snapshot fallback so builds never fail offline.
- **SEO:** page metadata, Open Graph card, JSON-LD `Person` data and a sitemap.
- **Accessibility:** semantic landmarks, skip link, visible focus, labelled controls, keyboard-friendly menu and full `prefers-reduced-motion` support.

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # static site in out/
npm run preview      # serve out/ locally
npm run lint && npm run typecheck
```

## Editing content

All copy lives in typed data files, so content changes never touch components.

| File | Controls |
| --- | --- |
| `data/profile.ts` | Name, title, email, social links, resume path, hero stats and SEO text |
| `data/content.ts` | Navigation, overview cards, principles, skills, experience and education, process steps, strengths |
| `data/projects.ts` | Project cards and case-study pages |
| `data/tech.ts` | Technology names and logos |
| `lib/github.ts` | Which public repositories are highlighted |
| `public/Shakif-Rabbani-Resume.pdf` | The resume behind every "Download Resume" button |
| `assets/images/portrait.webp` | Hero portrait with a transparent background |

Keep every number verifiable. Recruiters check.

**Adding real screenshots:** put an image in `public/projects/` and set `screenshot: "/projects/your-image.webp"` on the project in `data/projects.ts`. A 16:10 image works best. It replaces the coded preview on the card, the projects list and the case-study page.

## Deployment

The included workflow (`.github/workflows/deploy.yml`) lints, type-checks, builds and deploys to GitHub Pages on every push to `main`.

1. Make the repository public. GitHub Pages on a free account only works with public repositories (GitHub Pro lifts this).
2. On GitHub, open **Settings → Pages** and set **Source** to **GitHub Actions**.
3. Push to `main`. The first run takes about two minutes.
4. The site goes live at `https://shakifrabbani.github.io/Portfolio/`.

Using a custom domain or a repository named `shakifrabbani.github.io`? Set `NEXT_PUBLIC_BASE_PATH` to an empty string in the workflow and update `NEXT_PUBLIC_SITE_URL`.

## Notes

- `scripts/fix-export-segments.mjs` works around a Next.js 16 static-export bug on Windows, where prefetch files land in nested folders. It is a no-op on Linux and macOS, including the deploy workflow.
- Animations respect `prefers-reduced-motion`, and the custom cursor only runs on mouse and trackpad devices.
