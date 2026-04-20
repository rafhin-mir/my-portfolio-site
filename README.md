# Rafhin Visuals — Portfolio Site

Official portfolio website for **Rafhin Visuals**, a premium video and photo production studio based in Canada. The site showcases the studio's work across automotive, music, commercial, and documentary genres — built with a dark, cinematic aesthetic and refined motion design.

Live at: [rafhinvisuals.com](https://rafhinvisuals.com)

---

## Pages

### Home (`/`)
Full-viewport hero with a 3D rotating card carousel featuring 10 real video assets. Cards are rendered in grayscale and switch to full colour on hover (desktop only — permanently grayscale on mobile). The carousel enters with a dramatic GSAP tilt animation that settles into a continuous CSS float. Below the fold: mission statement, featured creation cards, brand partner grid (Ferrari, Nike, Apple, Hulu, and more), expertise list, and a full-bleed parallax CTA.

### Automotive (`/automotive.html`)
Dedicated automotive filmmaking page. Features:
- **Hero** — fullscreen autoplay video background with dark overlay and entrance animation
- **Capabilities** — 3-column animated filmstrip (vertical/horizontal/square frames, seamless infinite scroll) alongside capabilities copy and service lists
- **Video section** — 3-column vertical card grid + horizontal card stack for film projects
- **Photography** — 3-column masonry gallery
- **CTA** — full-bleed background image with contact prompt

### Work (`/work.html`)
Filterable project grid. Filter categories: Featured, Commercial, Music Video, Film, Photography. Client-side filtering with no page reload.

### Services (`/services.html`)
Service offerings across two sections — creative approach overview and deliverable breakdown (Short Form, UGC, Long Form/YouTube, Creative Campaigns, Monthly Content). Accordion component for compact presentation.

### Contact (`/contact.html`)
Minimal contact page with cards linking to email, Instagram, and phone.

---

## Stack

| Layer | Technology |
|---|---|
| Static site generator | [Eleventy (11ty) v3](https://www.11ty.dev/) with Nunjucks templating |
| Styling | Vanilla CSS — design tokens, component styles, per-page stylesheets |
| Animations | [GSAP 3.12.5](https://greensock.com/gsap/) + ScrollTrigger |
| Fonts | Archivo (sans), IvyPresto Display (serif/italic), Azeret Mono (mono) via Google Fonts |
| Hosting | [Vercel](https://vercel.com/) — auto-deploys on every push to `main` |

**Brand color:** `#660033` (deep burgundy)

---

## Project Structure

```
src/
├── _data/                  # Global JSON data files
│   ├── site.json           # Name, tagline, logo path, favicon, URL
│   ├── nav.json            # Navigation links and keys
│   ├── social.json         # Social media links and icons
│   └── contact.json        # Email, phone, Instagram
│
├── _includes/
│   ├── layouts/
│   │   └── base.njk        # Base HTML shell — loads styles, fonts, GSAP, scripts
│   ├── components/
│   │   ├── nav.njk         # Site navigation with hamburger menu
│   │   ├── nav-overlay.njk # Full-screen mobile nav overlay
│   │   ├── footer.njk      # Footer with logo, socials, nav links
│   │   └── loader.njk      # Page entrance loader animation
│   └── icons/              # Inline SVG icons (Instagram, TikTok, YouTube)
│
├── assets/
│   ├── images/
│   │   └── automotive/     # Automotive page images (footer.jpg, etc.)
│   ├── video/
│   │   ├── 3D/             # Home carousel videos (1.mp4 – 10.mp4)
│   │   └── Automotive/     # Automotive page videos (automotive-hero-video.mp4)
│   ├── logos/              # Studio logo files
│   └── icons/              # Favicon and app icons
│
├── scripts/
│   ├── core/
│   │   ├── loader.js       # Fades out loader overlay after 900ms
│   │   └── nav.js          # Hamburger toggle, overlay open/close
│   └── pages/
│       ├── home.js         # Hero tilt entrance, carousel hover (b&w↔colour), ScrollTrigger reveals
│       ├── automotive.js   # Hero video play, entrance timeline, ScrollTrigger reveals
│       ├── work-filter.js  # Client-side project grid filtering
│       ├── work-gsap.js    # ScrollTrigger reveals for work page
│       ├── accordion.js    # Services accordion expand/collapse
│       ├── services-gsap.js
│       └── contact-gsap.js
│
└── styles/
    ├── base/
    │   ├── tokens.css      # CSS custom properties (colors, radius)
    │   ├── reset.css       # Box-sizing reset and base defaults
    │   └── typography.css  # Font face declarations and base type rules
    ├── components/
    │   ├── nav.css
    │   ├── footer.css
    │   ├── buttons.css     # .btn-primary and .btn-ghost variants
    │   ├── loader.css      # Loader + #pageContent transition
    │   └── layout.css      # Shared section and divider utilities
    └── pages/
        ├── home.css        # Hero, 3D carousel, creations, brands, expertise, CTA
        ├── automotive.css  # Full automotive page — hero video, filmstrip, cards, masonry, CTA
        ├── work.css
        ├── services.css
        └── contact.css
```

---

## Key Implementation Notes

### 3D Carousel (Home)
- CSS `perspective` + `rotateY` per card with `translateZ(radius)` — 10 cards evenly distributed
- Card sizing uses `clamp()` vars (`--c-w`, `--c-h`, `--c-r`) for consistent sizing across all screens
- Grayscale↔colour hover: JS `getBoundingClientRect()` detects the largest (front-facing) card — CSS `pointer-events` is unreliable in 3D space
- Entrance: GSAP `fromTo` tilt animation hands off to CSS `animation` via `clearProps: 'transform'` + `animationPlayState: running`
- Mobile: hover colour switching disabled; carousel stays permanently grayscale

### Automotive Filmstrip
- 3 columns, each with 2 identical sets of 6 frames for a seamless `translateY(-50%)` loop
- Columns scroll at different speeds (30s / 36s / 40s) and alternate directions for depth
- `will-change: transform` on each column for GPU-accelerated animation
- Responsive: 2-col on tablet, full-height on mobile, scales taller on large monitors

### Hero Video (Automotive)
- `autoplay muted loop playsinline webkit-playsinline preload="auto"`
- JS forces `.play()` on load for iOS/Android compatibility
- `vercel.json` sets `Accept-Ranges: bytes` so Vercel's CDN supports video range requests

---

## Local Development

**Install dependencies:**
```bash
npm install
```

**Start the dev server:**
```bash
node serve.mjs
```

Eleventy builds to `_site/`, watches for changes, serves at `http://localhost:3000`.

---

## Deployment

Connected to Vercel via GitHub. Every push to `main` triggers an automatic production deployment. Output directory is `_site/`. Video streaming headers are configured in `vercel.json`.

---

## Contact

- **Email:** rafhin.visual@gmail.com
- **Instagram:** [@_rafhin](https://www.instagram.com/_rafhin/)
