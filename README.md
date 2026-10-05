# M. Shakif Rabbani · Portfolio

Personal portfolio of **M. Shakif Rabbani**, a full-stack software engineer in Lahore, Pakistan.

Live site: https://shakifrabbani.github.io/Portfolio/ (once GitHub Pages is enabled, see below)

## Highlights

- **Animated hero:** a live point-of-sale demo rings up an order, loses the connection, takes payment offline, prints a kitchen ticket and syncs. It mirrors the online and offline POS systems in the projects.
- **Motion with purpose:** word rotator, tech marquee, scroll reveals, count-up stats, animated system diagrams, a scroll-drawn timeline, a cursor spotlight on cards, magnetic buttons and a circular theme switch.
- **Light and dark themes:** follows the visitor's OS setting, with a toggle that remembers the choice.
- **Recruiter-ready metadata:** Open Graph card, schema.org `Person` data, favicon and touch icon.

## Engineering notes

- **No build step, no dependencies.** Plain HTML, CSS and JavaScript, so GitHub Pages serves it as is.
- **Progressive enhancement.** Nothing starts hidden in the HTML or CSS. Without JavaScript the page is complete and readable.
- **Reduced motion respected.** With `prefers-reduced-motion`, every animation and the POS loop are switched off.
- **Performance.** Animations use `transform` and `opacity` only. Looping animations pause when off-screen or when the tab is hidden. Scroll work is batched with `requestAnimationFrame`.
- **Accessibility.** Semantic landmarks, skip link, visible focus, labelled controls, an accessible mobile menu with Escape support, and text alternatives for decorative demos.
- **Fault isolation.** Each feature in `js/main.js` initialises inside its own `try/catch`, so one failure never breaks the rest.

## Project structure

| Path | Purpose |
| --- | --- |
| `index.html` | Page content and structure. |
| `css/style.css` | Design tokens, themes, layout, components and animations. |
| `js/main.js` | Interactions and animation logic. |
| `assets/` | Profile photo, favicon, touch icon and social preview card. |
| `Shakif Rabbani Resume.pdf` | The CV behind the "Download CV" buttons. |
| `.nojekyll` | Tells GitHub Pages to serve files as is. |

## Run it locally

Open `index.html` in a browser. Nothing to install.

## Publish with GitHub Pages

1. Push this repo to GitHub.
2. On GitHub, open **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to *Deploy from a branch*, pick `main` and `/ (root)`, then save.
4. After a minute the site is live at `https://shakifrabbani.github.io/Portfolio/`.

## Updating content

- **New project:** copy an `<article class="card project">` block in the `#work` section. Use `project--xl` or `project--lg` for a wider card.
- **New CV:** replace the PDF and keep the same file name, or update the `href` on both "Download CV" buttons.
- **Availability:** "Open to new roles" appears in the hero badge and the contact section.
- **Colours and fonts:** edit the tokens at the top of `css/style.css`.
