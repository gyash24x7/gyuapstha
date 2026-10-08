# yashgupta.me

The personal site of Yash Gupta, a full-stack developer from Kanpur, India. It's a single page built with
[Astro](https://astro.build): an interactive SVG portrait, work experience, projects, a 3D graph of the tools I use,
and a way to get in touch.

- **Live:** [yashgupta.me](https://yashgupta.me)
- **Previous version:** the Gatsby site lives on the [`v1`](https://github.com/gyash24x7/gyuapstha/tree/v1) branch,
  headed for v1.yashgupta.me

## What's in it

- **Interactive portrait.** A flat SVG drawing that follows the cursor, blinks, looks down as you scroll and reacts
  when clicked or tapped.
- **Page-by-page scrolling on desktop.** Each section is a full-screen page; one scroll, key press or nav dot fades
  and scales to the next. Long pages scroll inside first. Phones, touch-only devices and anyone with reduced motion
  turned on get normal scrolling.
- **Toolbox graph.** A three.js network of logo stickers linked by category and by how the tools are used together.
  Drag to spin, hover or tap to highlight. three.js loads only when you scroll near it.
- **Particle background.** One lightweight 2D canvas shared by every section.
- **Light and dark themes,** following the system setting with a toggle that remembers your choice.
- **Generated link previews.** The Open Graph image is rendered at build time from the live portrait, the site's
  fonts and its colour tokens.

Lighthouse scores 99–100 for performance and 100 for accessibility, best practices and SEO, on mobile and desktop.

## Stack

|                 |                                                                                                                                          |
|-----------------|------------------------------------------------------------------------------------------------------------------------------------------|
| Framework       | Astro 7, static output, TypeScript (strict)                                                                                              |
| Package manager | Bun 1.4                                                                                                                                  |
| 3D              | three.js (toolbox graph only)                                                                                                            |
| Fonts           | Bricolage Grotesque, Instrument Sans and JetBrains Mono, self-hosted through Astro's fonts API                                           |
| Icons           | [Simple Icons](https://simpleicons.org) for the toolbox logos, [Bootstrap Icons](https://icons.getbootstrap.com) for UI and social marks |
| Preview image   | satori and sharp, at build time                                                                                                          |
| Hosting         | Cloudflare Workers static assets                                                                                                         |

## Getting started

Requires Bun 1.4+ and Node 22.12+.

```sh
bun install
bun dev                      # dev server at http://localhost:4321
bun run check                # type-check (astro check)
bun run build                # type-check, then build to ./dist
bun preview                  # serve the production build
bun run preview:cloudflare   # build, then serve with Cloudflare's local runtime on :8787
```

## Project structure

```text
src/
├── components/   Sections (Experience, Projects, Toolbox, Contact), the portrait, header, nav and UI pieces
├── data/         Site content: experience, projects, toolbox and contact details
├── layouts/      The shared page shell: meta tags, fonts, theme and particle background
├── pages/        The landing page, 404, and generated og-image.png, robots.txt and sitemap.xml
├── scripts/      Client-side behaviour: page-by-page scrolling, particles, the toolbox graph
└── styles/       Design tokens (tokens.css) and global styles
public/           Static files: favicons, résumé, Cloudflare _headers
```

To update the content, edit the files in `src/data/`. Colours, spacing, type and shadows are CSS custom properties in
`src/styles/tokens.css`; components use only those tokens, so both themes keep working.

## Deployment

The site deploys to Cloudflare Workers as static assets, configured in `wrangler.jsonc`. There's no Worker code:
`dist/` is served as-is, unknown paths get the custom 404 page with a 404 status, and `public/_headers` adds security
headers and long-term caching for Astro's hashed files.

- **From the Cloudflare dashboard:** connect the repository with the build command `bun run build` and the deploy
  command `npx wrangler deploy`. Set the build variable `BUN_VERSION=1.4.0`, because `bun.lock` uses Bun 1.4's
  lockfile format, which Cloudflare's default Bun can't read.
- **From your machine:** run `bunx wrangler login` once, then `bun run deploy`.

## Credits

- Logo: the YG monogram carried over from v1
- Fonts: [Bricolage Grotesque](https://fonts.google.com/specimen/Bricolage+Grotesque),
  [Instrument Sans](https://fonts.google.com/specimen/Instrument+Sans) and
  [JetBrains Mono](https://www.jetbrains.com/lp/mono/), all under the SIL Open Font License
- Toolbox logos: [Simple Icons](https://simpleicons.org) (CC0). Brand names and logos belong to their owners
- UI and social icons: [Bootstrap Icons](https://icons.getbootstrap.com) (MIT)
