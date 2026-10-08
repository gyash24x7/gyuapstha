# yashgupta.me — v1

The first version of Yash Gupta's personal site, kept on the `v1` branch and served at
[v1.yashgupta.me](https://v1.yashgupta.me). The current site lives on `master` at [yashgupta.me](https://yashgupta.me).

v1 was originally built with Gatsby 4, React and styled-components. It has since been rebuilt as a static
[Astro](https://astro.build) site with the same look, content and behaviour: the same layout, fonts, colours, light and
dark themes, typing animation, toolbox fade-in, project cards and experience tabs.

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
├── assets/       Logos, project images, icons and the site screenshot, unchanged from the Gatsby site
├── components/   One component per part of the page: TopNav, SideNavs, Intro, Toolbox, Projects, Experience, GetInTouch
├── data/         Content: site.ts (generated from the old gatsby-config.js) and the toolbox list
├── layouts/      Head tags, fonts and theme
├── pages/        The page, plus the generated web app manifest, favicon and icons
└── styles/       Global styles: the original reset, theme colours, typography and buttons
```

## What changed from the Gatsby build

Nothing visible. Under the hood:

- Plain HTML and CSS with a few small scripts (theme toggle, typed.js, toolbox fade-in, experience tabs) instead of React.
- Grayscale logos use a CSS filter rather than build-time grayscale copies.
- The theme is applied before the first paint, so dark-mode visitors no longer see a flash of the light theme.
- The extra footer rows on small screens use a media query rather than measuring the window in JavaScript.
- No offline service worker and no build-time gzip/brotli step (Cloudflare compresses responses).
- Small accessibility fixes: the theme toggle and experience tabs work from the keyboard, and links are no longer
  wrapped around buttons.

## Deployment

Deployed to Cloudflare Workers as static assets (`wrangler.jsonc`), like the current site. In the Cloudflare dashboard,
connect the repository's `v1` branch with the build command `bun run build`, the deploy command `npx wrangler deploy`,
and the build variable `BUN_VERSION=1.4.0`, then add `v1.yashgupta.me` as a custom domain. From your machine:
`bunx wrangler login` once, then `bun run deploy`.

## License

0BSD, see [LICENSE](LICENSE).
