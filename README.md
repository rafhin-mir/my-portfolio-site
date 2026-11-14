# Rafhin Visuals — Portfolio Site

[![Live Site](https://img.shields.io/badge/live-rafhin.com-cc2255?style=flat-square)](https://www.rafhin.com)
[![Built with Eleventy](https://img.shields.io/badge/built%20with-Eleventy%20v3-333?style=flat-square)](https://www.11ty.dev/)
[![Hosted on Vercel](https://img.shields.io/badge/hosted%20on-Vercel-black?style=flat-square)](https://vercel.com)

Official portfolio website for **Rafhin Visuals**, a video and photo production studio based in Toronto, Ontario, serving the GTA and clients across Canada. Automotive films, brand campaigns, short-form content, and photography — presented with a dark, cinematic aesthetic and refined motion design.

**Live at: [www.rafhin.com](https://www.rafhin.com)**

---

## Contents

- [Pages](#pages)
- [Stack](#stack)
- [Project Structure](#project-structure)
- [Key Implementation Notes](#key-implementation-notes)
- [Local Development](#local-development)
- [Deployment](#deployment)
- [Known Gaps](#known-gaps)
- [Contact](#contact)

---

## Pages

### Home (`/`)
Full-viewport hero with a 3D rotating card carousel featuring real video assets, all playing simultaneously. Cards render in grayscale and switch to full colour on hover (desktop only — stays grayscale on mobile). The carousel enters with a GSAP tilt animation that settles into a continuous CSS float, with an `IntersectionObserver` pausing/resuming playback as the hero scrolls in and out of view.

**Section order (top → bottom):** Hero carousel → Mission statement → Client/brand logo grid → Featured Work showcase (horizontal accordion) → Client Work rail (9:16 vertical accordion) → About the Studio → Key Expertise grid → Collaborate CTA.

All showcase videos are local, pre-compressed hover-preview clips (not live Vimeo embeds) — this eliminates iframe-load flash and keeps hover response instant.

### Automotive (`/automotive/`)
Dedicated automotive filmmaking page: fullscreen autoplay hero video, a 3-column animated filmstrip (seamless infinite scroll), a Bring a Trailer listings section, a video work grid, a photography masonry gallery, and a closing CTA.

### Work (`/work/<slug>/`) — video detail pages
One shared Nunjucks template (`video-detail.njk`) drives a unique page per film via Eleventy pagination over `src/_data/clientVideos.json`. Each entry produces its own page with an embedded Vimeo player, `VideoObject` + `BreadcrumbList` structured data, and a "More Work" grid that shuffles a random subset of other films on every load.

Adding a new film is a two-step process: append an entry to `clientVideos.json`, then link to `/work/<slug>/` from wherever it should appear — no template duplication required.

### Work (`/work/`) — portfolio index
Filterable project grid (All, Real Estate, Weddings, Events, Café). The automotive-adjacent content is real; the Events/Weddings/Café tabs are still placeholder imagery pending real client photos — see [Known Gaps](#known-gaps).

### Services (`/services/`)
Four service cards (Film & Video, Photography & Composites, Short Form & UGC, Website Design & Build), each with an icon, description, a short "includes" list, and tag pills. On wide viewports (≥1440px) a sticky intro column sits beside the grid so it doesn't read as empty space on large monitors; below that it's a plain 2×2 grid. A "How We Work" process accordion and CTA follow. Includes `Service` + `OfferCatalog` JSON-LD.

### About (`/about/`)
Single-page biography: two-column intro (photo + copy), a `Person` JSON-LD schema, a location section, and a closing CTA.

### Contact (`/contact/`)
Contact form (name/email/message via Formspree) plus direct links to email, Instagram, and phone. Includes a short consent line linking to the Privacy Policy. A companion vCard-style page lives at `/contactcard/` (`noindex`) for sharing a scannable digital business card.

### FAQ (`/faq/`)
Ten Q&As with `FAQPage` JSON-LD, grounded only in facts stated elsewhere on the site. Deliberately **not** linked from navigation or the footer — it exists for search/AI-answer-engine discovery, not for a visitor who already knows the site.

### Privacy Policy (`/privacy/`) & Terms of Use (`/terms/`)
Plain-language pages covering what data the contact form and analytics actually collect, the third-party services involved (Google Analytics, Google Fonts, Formspree, Vimeo, Vercel), and basic content-ownership terms. Linked from the footer.

### 404 (`/404.html`)
Custom not-found page matching the site's dark theme, served `noindex, follow` via a per-page `robotsMeta` override.

### `/llms.txt`
A plain-markdown summary of the site aimed at AI crawlers/agents — an emerging, unofficial convention, cheap to publish and not relied on as a primary SEO channel.

---

## Stack

| Layer | Technology |
|---|---|
| Static site generator | [Eleventy (11ty) v3](https://www.11ty.dev/) with Nunjucks templating |
| Styling | Vanilla CSS — design tokens, component styles, one stylesheet per page |
| Animations | [GSAP 3](https://greensock.com/gsap/) + ScrollTrigger, plus the CSS View Transitions API for cross-page blur crossfades |
| Fonts | Archivo (sans), IvyPresto Display (serif/italic), Azeret Mono (mono) via Google Fonts |
| Hosting | GitHub → Vercel (production), auto-deployed on push to `main` |

**Brand accent:** `--primary: #cc2255` / `--primary-tint: #d44c75` (the tint is used wherever the accent sits on small/normal text, since the raw primary fails WCAG AA contrast on black — large bold headings can use the raw primary)

---

## Project Structure

```
src/
├── _data/
│   ├── site.json            # Name, tagline, logo, favicon, URL, OG image, GA id, NAP
│   ├── nav.json              # Navigation links and active keys
│   ├── contact.json          # Email, phone, Instagram
│   ├── social.json           # Social media links
│   └── clientVideos.json     # One entry per film: slug, title, category, vimeoId, aspectRatio,
│                              #   poster, description, durationSeconds, uploadDate — drives every
│                              #   /work/<slug>/ page plus the homepage/automotive video cards
│
├── _includes/
│   ├── layouts/
│   │   └── base.njk          # HTML shell — critical inline background, styles, fonts, GSAP,
│   │                          #   view-transition guard, SEO meta, JSON-LD, OG/Twitter tags
│   └── components/
│       ├── nav.njk, nav-overlay.njk   # Fixed nav + full-screen mobile overlay
│       ├── footer.njk                  # Logo, socials, nav links, legal links, copyright
│       └── loader.njk                  # Page entrance loader
│
├── assets/
│   ├── images/                # Per-page image assets, video posters, photography galleries
│   ├── video/                 # Hero carousel, showcase/client-work preview clips, filmstrip clips
│   ├── logos/                 # Studio logo files
│   └── icons/                 # Favicon assets
│
├── scripts/
│   ├── core/
│   │   ├── loader.js           # Fades out the loader, replays the intro once per session
│   │   └── nav.js               # Hamburger toggle, overlay open/close
│   └── pages/                   # One GSAP/behaviour script per page that needs one
│
├── video-detail.njk            # Shared template, paginated over clientVideos → /work/<slug>/
├── work.njk, automotive.njk, services.njk, about.njk, contact.njk, index.njk
├── faq.njk, privacy.njk, terms.njk, llms.njk
├── 404.njk                      # Custom not-found page (permalink: /404.html)
├── contactcard.njk              # Standalone noindex digital business card
├── robots.njk, sitemap.njk      # → /robots.txt, /sitemap.xml (sitemap built dynamically)
│
└── styles/
    ├── base/                    # tokens.css, reset.css, typography.css, view-transitions.css
    ├── components/               # nav, footer, buttons, loader, layout
    └── pages/                    # One stylesheet per page

eleventy.config.mjs              # Passthrough copies + two custom filters:
                                  #   otherVideos  — filters clientVideos to "everything but the current slug"
                                  #   absoluteUrl  — resolves a possibly-relative asset path against site.url,
                                  #                  leaving already-absolute URLs (e.g. Vimeo CDN) untouched

vercel.json                      # trailingSlash: true (matches every internal link), immutable
                                  #   caching for video, cache-with-revalidation for CSS/JS/images
```

---

## Key Implementation Notes

### Cross-page transitions & the white-flash fix
Navigation uses the CSS View Transitions API (`@view-transition { navigation: auto }`) for a blur crossfade between pages. Two non-obvious things make it reliable:
- `::view-transition-group(root)` has an explicit black `background-color`. Without it, the outgoing and incoming snapshots can both be briefly near-transparent at the same instant mid-crossfade, and the browser's default white canvas shows through for a frame.
- A critical inline `<style>` sets the `html` background before anything else in `<head>`, so first paint is never dependent on an external stylesheet's fetch timing — important specifically for navigations that skip the transition (see below).
- A `pagereveal`/`pageswap` guard skips the transition if a link is clicked again before the current page's own entrance transition has finished, since navigating away mid-flight can otherwise leave the browser compositing a half-finished snapshot into the next transition.

### Caching & routing
`vercel.json` sets `trailingSlash: true` to match how every internal link and Eleventy permalink is written (`/services/`, not `/services`) — a mismatch here previously forced every single navigation through a 308 redirect before the real page even started loading. CSS/JS/images get real `Cache-Control` headers (Vercel's unconfigured default is `max-age=0, must-revalidate`, which forces a revalidation round-trip for every render-blocking stylesheet on every page load).

### 3D Carousel (Home)
CSS `perspective` + `rotateY` per card with `translateZ(radius)`, evenly distributed and all playing simultaneously. Grayscale ↔ colour hover uses JS `getBoundingClientRect()` to detect the front-facing card, since CSS `pointer-events` is unreliable in 3D space. `IntersectionObserver` pauses/resumes video playback as the hero scrolls off/on screen.

### Video Detail Pages (`/work/<slug>/`)
Eleventy pagination (`size: 1`, `alias: video`) over `clientVideos.json` generates one page per film from a single template. `eleventyComputed` derives `title`/`description`/`ogImage`/`ogImageAlt` per page — these pass through Nunjucks twice (once for the computed value, once in the layout), so any value containing user-authored text needs `| safe` to avoid double-escaping HTML entities.

### Automotive Filmstrip
Three columns, each duplicated (original + clone) for a seamless loop. Clone videos are filled via `captureStream()` rather than re-requesting the same `src`, avoiding double-decoding; because clones use `srcObject` instead of `src`, visibility-based play/pause checks must test `!v.src && !v.srcObject` — checking `src` alone silently skips every clone.

### Page entrance animations
Primary hero text never starts at `opacity: 0` from JS alone — critical content stays visible by default and only gets a subtle transform-based entrance, so a stalled/slow script can never leave a visitor looking at a blank page. Below-fold reveals use `ScrollTrigger` with independent `gsap.fromTo()` tweens per element, not a single shared stagger tween.

### SEO
Full Open Graph/Twitter meta, `ProfessionalService` + `WebSite` JSON-LD sitewide, `VideoObject`/`BreadcrumbList`/`Service`/`Person`/`FAQPage` schema where relevant. `sitemap.njk` generates `/sitemap.xml` dynamically from `clientVideos.json` plus the static pages (including Google's video-sitemap extension), so adding a film never requires manual sitemap upkeep.

### Accessibility
Interactive/small text uses `--primary-tint` rather than the raw `--primary`, which fails WCAG AA contrast on black at normal text sizes (large bold headings can still use the raw accent, since the contrast threshold relaxes at that size/weight).

---

## Local Development

```bash
npm install
npm start          # serves at http://localhost:3000
```

or, to run on a specific port:

```bash
npx @11ty/eleventy --serve --port 3010
```

Eleventy builds to `_site/` and rebuilds on file changes.

**Production build:**
```bash
npm run build
```

---

## Deployment

Connected to GitHub. Every push to `main` auto-deploys to production via Vercel.

---

## Known Gaps

- **`/work/` placeholder imagery** — the Events, Weddings, and Café tabs on the work index still show generic placeholder images rather than real client photos.
- **`/web-design/`** — a fourth service page (website design & build) is built but not yet linked from navigation or shipped to production.

---

## Contact

- **Email:** rafhin.visual@gmail.com
- **Instagram:** [@_rafhin](https://www.instagram.com/_rafhin/)
