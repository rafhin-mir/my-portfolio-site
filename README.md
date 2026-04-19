# Rafhin Visuals — Portfolio Site

Personal portfolio website for **Rafhin Visuals**, a video and photo production studio based in Canada.

## Pages

- **Home** (`/`) — Hero with 3D rotating carousel, mission statement, featured creations, brand partners, expertise, and CTA
- **Work** (`/work.html`) — Filterable project grid (Featured, Commercial, Music Video, Film, Photography)
- **Services** (`/services.html`) — Service offerings with accordion and collaboration CTA
- **Contact** (`/contact.html`) — Contact info and booking
- **Automotive** (`/automotive.html`) — Dedicated automotive filmmaking page with filmstrip, video grid, and photo masonry

## Stack

- [Eleventy (11ty)](https://www.11ty.dev/) — Static site generator with Nunjucks templating
- CSS custom properties, split into base tokens, components, and page-level stylesheets
- [GSAP 3.12.5](https://greensock.com/gsap/) + ScrollTrigger — site-wide scroll reveal and entrance animations
- Google Fonts: Archivo, IvyPresto Display, Azeret Mono
- Deployed on [Vercel](https://vercel.com/) with automatic GitHub integration

## Project Structure

```
src/
├── _data/          # Site-wide JSON data (nav, social, contact, site config)
├── _includes/      # Layouts and component partials (nav, footer, loader)
├── assets/         # Static assets (images, logos, icons)
├── scripts/
│   ├── core/       # nav.js, loader.js (every page)
│   └── pages/      # Per-page scripts (GSAP animations, filters, accordion)
└── styles/
    ├── base/       # tokens.css, reset.css, typography.css
    ├── components/ # nav, footer, buttons, loader, layout
    └── pages/      # Per-page stylesheets
```

## Local Development

```bash
node serve.mjs
```

Opens at `http://localhost:3001`. Eleventy watches for changes and rebuilds automatically.

## Contact

- Email: media@rafhin.com
- Instagram: [@_rafhin](https://www.instagram.com/_rafhin/)
