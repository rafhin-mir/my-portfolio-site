# Rafhin Visuals — Portfolio Site

Official portfolio website for **Rafhin Visuals**, a premium video and photo production studio based in Canada. The site showcases the studio's work across automotive, music, commercial, and documentary genres — built with a dark, cinematic aesthetic and refined motion design.

Live at: [rafhinvisuals.com](https://rafhinvisuals.com)

---

## Pages

### Home (`/`)
Full-viewport hero with a 3D rotating card carousel featuring 10 real video assets. Cards are rendered in grayscale and switch to full colour on hover (desktop only — permanently grayscale on mobile). The carousel enters with a GSAP tilt animation that settles into a continuous CSS float. Below the fold: mission statement (Azeret Mono), featured creation cards (large featured card + 2-col supporting grid), brand partner grid, expertise list with descriptions, and a full-bleed CTA.

### Automotive (`/automotive.html`)
Dedicated automotive filmmaking page. Features:
- **Hero** — fullscreen autoplay video background with entrance animation and stripe reveal
- **Capabilities** — 3-column animated filmstrip (vertical/horizontal/square frames, seamless infinite scroll; middle column offset by `animation-delay: -22s` to push the loop seam later) alongside service lists
- **Video section** — 3-column vertical card grid + horizontal card stack
- **Photography** — 3-column masonry gallery
- **CTA** — full-bleed background image with contact prompt

### Work (`/work.html`)
Filterable project grid — currently hidden from the nav while in development. Categories: All, Real Estate, Weddings, Events, Café. Cards use dark gradient backgrounds, category pills, optional play indicator for video items, and featured items that span 2 columns (aspect ratio 16/7). Filter switching animates newly visible items via GSAP stagger.

### Services (`/services.html`)
Full-page services overview in three sections:
- **Header** — centered IvyPresto italic + Archivo bold lockup ("built to Perform")
- **Services grid** — 6 cards (3-col → 2-col → 1-col responsive) each with number, SVG icon, name, description, and tag pills. Hover reveals a crimson top accent line and tints the icon. Website Design card is differentiated with a crimson name.
- **How I Work** — sticky heading left / accordion right; 5 numbered accordion items each opening to a paragraph + bullet list with crimson `—` prefix
- **CTA** — real background image (automotive/footer.jpg), italic + bold heading, crimson pill button (`#660033`)

### About (`/about.html`)
Single-page biography. Two-column intro (photo left / copy right), location section with ScrollTrigger entrance, and a full-bleed CTA.

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
| Hosting | GitHub Pages (dev) → Vercel (production) |

**Brand accent:** `#660033` fill / `#cc2255` text  
**Brand stripe:** gold gradient `#b8960c → #d4af6a → #f0e8d0`

---

## Project Structure

```
src/
├── _data/
│   ├── site.json           # Name, tagline, logo, favicon, URL, OG image, Twitter handle
│   ├── nav.json            # Navigation links and active keys
│   ├── contact.json        # Email, phone, Instagram
│   └── social.json         # Social media links
│
├── _includes/
│   ├── layouts/
│   │   └── base.njk        # HTML shell — loads styles, fonts, GSAP, SEO meta, JSON-LD
│   └── components/
│       ├── nav.njk         # Fixed nav with hamburger
│       ├── nav-overlay.njk # Full-screen mobile nav overlay
│       ├── footer.njk      # Footer with logo, socials, nav links
│       └── loader.njk      # Page entrance loader (900ms fade)
│
├── assets/
│   ├── images/
│   │   ├── about/          # About page photo
│   │   ├── automotive/     # Automotive page images (footer.jpg, etc.)
│   │   └── home/           # Home page images (key-expertise.jpg, footer_back.jpg)
│   ├── video/
│   │   ├── 3D/             # Home carousel videos (1.mp4 – 10.mp4)
│   │   └── Automotive/     # Automotive hero video
│   ├── logos/              # Studio logo files
│   └── icons/              # Favicon (rv-black.jpg) and app icons
│
├── scripts/
│   ├── core/
│   │   ├── loader.js       # Fades out loader overlay after 900ms
│   │   └── nav.js          # Hamburger toggle, overlay open/close
│   └── pages/
│       ├── home.js         # Hero tilt entrance, carousel hover (b&w ↔ colour), scroll reveals
│       ├── automotive.js   # Hero video play, entrance + stripe reveal, scroll reveals
│       ├── about-gsap.js   # About page entrance + location/CTA scroll reveals
│       ├── work-filter.js  # Client-side grid filtering with GSAP stagger on switch
│       ├── work-gsap.js    # Work page entrance + scroll reveals
│       ├── accordion.js    # Services accordion expand/collapse with height animation
│       ├── services-gsap.js # Services header entrance + grid/accordion scroll reveals
│       └── contact-gsap.js # Contact page entrance animation
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
    │   ├── loader.css
    │   └── layout.css      # Shared section and divider utilities
    └── pages/
        ├── home.css        # Hero, carousel, creations, brands, expertise, CTA
        ├── automotive.css  # Hero video, filmstrip, cards, masonry, CTA
        ├── about.css       # Intro grid, location, CTA
        ├── work.css        # Header, filter tabs, card grid, featured spans
        ├── services.css    # Header, services grid, accordion, CTA
        └── contact.css     # Contact cards
```

---

## Key Implementation Notes

### 3D Carousel (Home)
- CSS `perspective` + `rotateY` per card with `translateZ(radius)` — 10 cards evenly distributed
- Card sizing uses `clamp()` custom properties (`--c-w`, `--c-h`, `--c-r`) responsive across all screens
- Grayscale ↔ colour hover: JS `getBoundingClientRect()` detects the front-facing card — CSS `pointer-events` is unreliable in 3D space
- Entrance: GSAP tilt animation hands off to CSS `animation` via `clearProps: 'transform'` + `animationPlayState: running`
- Mobile: hover colour switching disabled; carousel stays permanently grayscale

### Automotive Filmstrip
- 3 columns, each with 2 identical sets of 6 frames for a seamless `translateY(-50%)` loop
- Columns scroll at different speeds (30s / 36s / 40s) and alternate directions for depth
- Middle column uses `animation-delay: -22s` to start mid-cycle, pushing the visible loop seam ~43s after page load
- `will-change: transform` on each column for GPU-accelerated animation

### Page Entrance Animations
- All pages follow the same pattern: section fade at `delay: 0.85`, text sequence at `delay: 1.0–1.1` — synced to the 900ms loader fade
- Stripe reveals use `scaleX: 0 → 1` with `transformOrigin: 'left center'` (hero) or `'center center'` (automotive)
- ScrollTrigger used for below-fold reveals on all pages

### SEO
- Full Open Graph + Twitter Card meta tags in `base.njk`
- JSON-LD `ProfessionalService` schema
- `sitemap.njk` → `/sitemap.xml` (Work page excluded while hidden)
- `robots.njk` → `/robots.txt` pointing to sitemap

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

Connected to GitHub. Every push to `main` is auto-deployed. Video streaming headers (`Accept-Ranges: bytes`) are configured in `vercel.json` for range request support.

---

## Contact

- **Email:** rafhin.visual@gmail.com
- **Instagram:** [@_rafhin](https://www.instagram.com/_rafhin/)
