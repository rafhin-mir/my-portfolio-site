# Rafhin Visuals — Portfolio Site

Official portfolio website for **Rafhin Visuals**, a premium video and photo production studio based in Canada. The site showcases the studio's work across automotive, music, commercial, and documentary genres — built with a dark, cinematic aesthetic and refined motion design.

Live at: [rafhin-mir.github.io/my-portfolio-site](https://rafhin-mir.github.io/my-portfolio-site)

---

## Pages

### Home (`/`)
The main landing experience. Features a full-viewport hero section with a 3D rotating card carousel, animated with CSS `perspective` and GSAP. Below the fold: a mission statement, a stack of featured creation cards, a brand partner grid (Ferrari, Nike, Apple, Hulu, and more), a key expertise list, and a full-bleed CTA section backed by an R34 Nissan GT-R photograph.

### Work (`/work.html`)
A filterable project grid displaying the studio's portfolio. Users can filter by category: Featured, Commercial, Music Video, Film, and Photography. Filter switching is handled client-side with no page reload.

### Services (`/services.html`)
Details the studio's service offerings across two sections — a creative approach overview and a breakdown of deliverable types (Short Form, UGC, Long Form/YouTube, Creative Campaigns, Monthly Content). Uses an accordion component for compact presentation.

### Contact (`/contact.html`)
Minimal contact page with cards linking directly to email, Instagram, and phone.

### Automotive (`/automotive.html`)
A dedicated page for the studio's automotive filmmaking work. Includes a cinematic hero, a two-column capabilities section with an animated vertical filmstrip of frames, a video project grid, a photo masonry gallery, and a full-bleed CTA.

---

## Stack

| Layer | Technology |
|---|---|
| Static site generator | [Eleventy (11ty) v3](https://www.11ty.dev/) with Nunjucks templating |
| Styling | Vanilla CSS — design tokens, component styles, per-page stylesheets |
| Animations | [GSAP 3.12.5](https://greensock.com/gsap/) + ScrollTrigger — entrance timelines and scroll-driven reveals site-wide |
| Fonts | Archivo (sans), IvyPresto Display (serif/italic), Azeret Mono (mono) via Google Fonts |
| Hosting | [Vercel](https://vercel.com/) — auto-deploys on every push to `main` |

**Brand color:** `#cc2255` (burgundy)

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
│   │   └── base.njk        # Base HTML shell — loads all styles, fonts, GSAP, and scripts
│   ├── components/
│   │   ├── nav.njk         # Site navigation with hamburger menu
│   │   ├── nav-overlay.njk # Full-screen mobile nav overlay
│   │   ├── footer.njk      # Footer with logo, socials, nav links
│   │   └── loader.njk      # Page entrance loader animation
│   └── icons/              # Inline SVG icons (Instagram, TikTok, YouTube)
│
├── assets/
│   ├── images/             # Photography assets (e.g. footer_back.jpg — R34 GT-R)
│   ├── logos/              # Studio logo files
│   └── icons/              # Favicon and app icons
│
├── scripts/
│   ├── core/
│   │   ├── loader.js       # Fades in #pageContent after loader animation (~900ms)
│   │   └── nav.js          # Hamburger toggle, overlay open/close
│   └── pages/
│       ├── home.js         # Hero entrance timeline + ScrollTrigger reveals for all home sections
│       ├── work-filter.js  # Client-side project grid filtering
│       ├── work-gsap.js    # ScrollTrigger reveals for work page
│       ├── accordion.js    # Services accordion expand/collapse
│       ├── services-gsap.js# ScrollTrigger reveals for services page
│       ├── contact-gsap.js # ScrollTrigger reveals for contact page
│       └── automotive.js   # Hero entrance + ScrollTrigger reveals for automotive page
│
└── styles/
    ├── base/
    │   ├── tokens.css      # CSS custom properties (colors, radius)
    │   ├── reset.css       # Box-sizing reset and base defaults
    │   └── typography.css  # Font face declarations and base type rules
    ├── components/
    │   ├── nav.css         # Navigation and overlay styles
    │   ├── footer.css      # Footer layout and styles
    │   ├── buttons.css     # .btn-primary and .btn-ghost variants
    │   ├── loader.css      # Loader animation styles
    │   └── layout.css      # Shared section and divider utilities
    └── pages/
        ├── home.css        # Hero, carousel, creations, brands, expertise, CTA
        ├── work.css        # Work grid and filter UI
        ├── services.css    # Services layout and accordion
        ├── contact.css     # Contact page layout and cards
        └── automotive.css  # Full automotive page — hero, filmstrip, video grid, masonry
```

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

Eleventy builds the site to `_site/`, watches for file changes, and serves at `http://localhost:3001`.

---

## Deployment

The site is connected to Vercel via GitHub integration. Every push to `main` triggers an automatic production deployment — no manual steps required.

---

## Contact

- **Email:** media@rafhin.com
- **Instagram:** [@_rafhin](https://www.instagram.com/_rafhin/)
- **Phone:** +1 639 560-0919
