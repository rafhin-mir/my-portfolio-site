# Rafhin Visuals — Portfolio Site

Official portfolio website for **Rafhin Visuals**, a premium video and photo production studio based in Canada. The site showcases the studio's work across automotive, music, commercial, and documentary genres — built with a dark, cinematic aesthetic and refined motion design.

Live at: [www.rafhin.com](https://www.rafhin.com)

---

## Pages

### Home (`/`)
Full-viewport hero with a 3D rotating card carousel featuring 10 real video assets, all playing simultaneously. Cards are rendered in grayscale and switch to full colour on hover (desktop only — permanently grayscale on mobile). The carousel enters with a GSAP tilt animation that settles into a continuous CSS float, with an `IntersectionObserver` pausing/resuming playback as the hero scrolls in and out of view.

**Section order (top → bottom):**
1. **Hero** — 3D carousel (10 videos) + "DEFINED BY DETAIL" (`<h1>`) lockup
2. **Mission** — centered Azeret Mono paragraph + "Learn More →" ghost button
3. **Clients / Featured By** — static logo grid of brand partners (Mercedes-Benz, McLaren, Honda, RWB, Pfaff, ECC, MOVMAX, PartsEngine, Importfest, BMW, Formula Drift, Gridlife, PRI, S-Team Overland, TX2K26, and more); 2-column on mobile. All logos `loading="lazy"`.
4. **Featured Work / Showcase** — horizontal flex accordion, 5 real client films (Shayne's GTR, Jaiden's NSX, NSX Feature, Alan's E30, Matt's E55 AMG). Each panel plays a compressed local preview clip and links out to its own `/work/<slug>/` detail page. Inactive panels collapse to ~90px; active panel expands via `flex: 1 1 auto`.
5. **Client Work / Brands** — 9:16 vertical video accordion, 6 client films (Morning Meets, Aston Martin, ECC Tuned, MOVMAX, Garrett Turbos, PFAFF Reserve), each linking to its own detail page. Desktop: active panel locks to a 9:16 ratio; mobile switches to a transform-driven infinite horizontal scroll gallery (auto-drifts via `requestAnimationFrame`, pauses on touch).
6. **About the Studio** — split grid (photo left / copy right); photo is grayscale → full colour on hover.
7. **Creations** — hidden (`display:none`), preserved for future activation
8. **Key Expertise** — numbered grid
9. **CTA** — full-bleed footer image, "COLLABORATE" heading, crimson pill button

All showcase videos are local, pre-compressed hover-preview clips (not live Vimeo embeds) — this eliminates iframe-load flash and keeps hover response instant. Each card's poster `<img>` crossfades over the video on hover-out so it always returns to its true thumbnail rather than freezing on an arbitrary video frame.

### Automotive (`/automotive/`)
Dedicated automotive filmmaking page. Features:
- **Hero** — fullscreen autoplay video background, entrance animation, stripe reveal, "precision in motion" `<h1>`
- **Capabilities** — 3-column animated filmstrip (vertical/horizontal/square frames, seamless infinite scroll) alongside service lists
- **Bring a Trailer Listings** — dedicated section (styled after the homepage "About the Studio" split layout) promoting BaT listing photography/video packages, linking out to a live BaT listing
- **Video Work** — 3-column vertical card grid + 3-card horizontal stack, all real client films with hover-to-play local preview clips, linking to `/work/<slug>/`
- **Photography** — 3-column masonry gallery with descriptive, per-photo alt text
- **CTA** — full-bleed background image with contact prompt

### Work (`/work/<slug>/`) — video detail pages
One shared Nunjucks template (`video-detail.njk`) drives a unique page per film via Eleventy pagination over `src/_data/clientVideos.json`. Each entry (slug, title, category, Vimeo ID, aspect ratio, poster, description, duration, upload date) produces its own page at `/work/<slug>/` with:
- Embedded Vimeo player sized to the film's real aspect ratio
- Title, category, and description pulled straight from the data file
- `VideoObject` + `BreadcrumbList` JSON-LD structured data
- A "More Work" grid that client-side shuffles a random subset of the other films on every load
- Per-video Open Graph/Twitter image and `og:video` tags (falls back correctly whether the poster is a local asset or an absolute Vimeo CDN URL)

Adding a new film is a two-step process: append an entry to `clientVideos.json`, then link to `/work/<slug>/` from wherever it should appear (home showcase, automotive grid, etc.) — no template duplication required.

### Work (`/work/`) — portfolio index
Filterable project grid. **Currently placeholder content** (gradient cards, generic titles) — not yet wired to the real `clientVideos.json` films. Categories: All, Real Estate, Weddings, Events, Café. Filter switching animates newly visible items via GSAP stagger.

### Services (`/services/`)
Full-page services overview in three sections:
- **Header** — centered IvyPresto italic + Archivo bold `<h1>` lockup ("built to Perform")
- **Services grid** — 6 cards (Film & Video, Photography & Composites, Short Form & UGC, Monthly Retainer, Content Strategy, Website Design & Build), each with number, SVG icon, name, description, and tag pills
- **How I Work** — sticky heading left / accordion right
- **CTA** — real background image, crimson pill button

Includes `Service` + `OfferCatalog` JSON-LD listing all six offerings.

### About (`/about/`)
Single-page biography. Two-column intro (photo left / copy right) with a `Person` JSON-LD schema for E-E-A-T, location section with ScrollTrigger entrance, and a full-bleed CTA.

### Contact (`/contact/`)
Minimal contact page with cards linking to email, Instagram, and phone. A companion vCard-style page lives at `/contactcard/` (`noindex`) for sharing a scannable digital business card.

### 404 (`/404.html`)
Custom not-found page matching the site's dark theme — "Page Not Found" heading, short explanation, and buttons back to Home and to Work. Served with `noindex, follow` via a per-page `robotsMeta` override in the base layout.

---

## Stack

| Layer | Technology |
|---|---|
| Static site generator | [Eleventy (11ty) v3](https://www.11ty.dev/) with Nunjucks templating |
| Styling | Vanilla CSS — design tokens, component styles, per-page stylesheets |
| Animations | [GSAP 3.12.5](https://greensock.com/gsap/) + ScrollTrigger |
| Fonts | Archivo (sans), IvyPresto Display (serif/italic), Azeret Mono (mono) via Google Fonts |
| Hosting | GitHub → Vercel (production) |

**Brand accent:** `#660033` fill / `#cc2255` text
**Brand stripe:** gold gradient `#b8960c → #d4af6a → #f0e8d0`

---

## Project Structure

```
src/
├── _data/
│   ├── site.json           # Name, tagline, logo, favicon, URL, OG image, Twitter handle, NAP
│   ├── nav.json             # Navigation links and active keys
│   ├── contact.json         # Email, phone, Instagram
│   ├── social.json          # Social media links
│   └── clientVideos.json    # One entry per film: slug, title, category, vimeoId, aspectRatio,
│                             #   poster, description, durationSeconds, uploadDate — drives every
│                             #   /work/<slug>/ page plus the homepage/automotive video cards
│
├── _includes/
│   ├── layouts/
│   │   └── base.njk         # HTML shell — styles, fonts, GSAP, SEO meta, JSON-LD, OG/Twitter tags
│   └── components/
│       ├── nav.njk          # Fixed nav with hamburger
│       ├── nav-overlay.njk  # Full-screen mobile nav overlay
│       ├── footer.njk       # Footer with logo, socials, nav links
│       └── loader.njk       # Page entrance loader
│
├── assets/
│   ├── images/               # Per-page image assets, video posters, photography galleries
│   ├── video/                # Hero carousel, showcase/client-work preview clips, filmstrip clips
│   ├── logos/                # Studio logo files
│   └── icons/                 # Favicon assets
│
├── scripts/
│   ├── core/
│   │   ├── loader.js         # Fades out + removes the loader overlay after entrance
│   │   └── nav.js            # Hamburger toggle, overlay open/close
│   └── pages/
│       ├── home.js            # Hero carousel, showcase accordions, infinite client scroll
│       ├── automotive.js      # Hero video, filmstrip (clone/captureStream loop), video card hover-play, scroll reveals
│       ├── video-detail.js    # "More Work" shuffle, entrance animations
│       ├── about-gsap.js, work-filter.js, work-gsap.js,
│       │ accordion.js, services-gsap.js, contact-gsap.js
│
├── video-detail.njk          # Shared template, paginated over clientVideos → /work/<slug>/
├── work.njk, automotive.njk, services.njk, about.njk, contact.njk, index.njk
├── 404.njk                    # Custom not-found page (permalink: /404.html)
├── contactcard.njk            # Standalone noindex digital business card
├── robots.njk                 # → /robots.txt
├── sitemap.njk                # → /sitemap.xml (dynamic, see SEO below)
│
└── styles/
    ├── base/                  # tokens.css, reset.css, typography.css
    ├── components/            # nav, footer, buttons, loader, layout
    └── pages/                 # One stylesheet per page (home.css, automotive.css, video-detail.css, ...)

eleventy.config.mjs            # Passthrough copies + two custom filters:
                                #   otherVideos  — filters clientVideos to "everything but the current slug"
                                #   absoluteUrl  — resolves a possibly-relative asset path against site.url,
                                #                  leaving already-absolute URLs (e.g. Vimeo CDN) untouched
```

---

## Key Implementation Notes

### 3D Carousel (Home)
- CSS `perspective` + `rotateY` per card with `translateZ(radius)` — 10 cards evenly distributed, all playing simultaneously
- Card sizing uses `clamp()` custom properties (`--c-w`, `--c-h`, `--c-r`) responsive across all screens
- Grayscale ↔ colour hover: JS `getBoundingClientRect()` detects the front-facing card — CSS `pointer-events` is unreliable in 3D space
- Entrance: GSAP tilt animation hands off to CSS `animation` via `clearProps: 'transform'` + `animationPlayState: running`
- `IntersectionObserver` pauses/resumes all 10 videos when the hero scrolls off/on screen
- Mobile: hover colour switching disabled; carousel stays permanently grayscale

### Showcase Rails (Home)
- **Desktop flex accordion:** inactive panels collapse to a fixed basis; active panel uses `flex: 1 1 auto`. Transition on `flex-basis`/`flex-grow` with a spring-style `cubic-bezier`.
- **9:16 client rail:** active panel locks to an exact 9:16 ratio; inactive panels fill remaining width.
- **Video loading:** all rail videos start `preload="none"`; an `IntersectionObserver` at `rootMargin: '300px'` upgrades and plays the active video once the rail nears the viewport.
- Every panel is a real `<a class="showcase-link" href="/work/<slug>/">` — `pointer-events` must stay `auto` on it (a leftover `pointer-events: none` from an earlier decorative-text version previously blocked clicks).

### Video Detail Pages (`/work/<slug>/`)
- Eleventy pagination (`size: 1`, `alias: video`) over `clientVideos.json` generates one page per film from a single template.
- `otherVideos` filter (in `eleventy.config.mjs`) hands the template every other film; `video-detail.js` then randomly shuffles and trims to 4 for the "More Work" grid client-side, so the picks differ on every load.
- `eleventyComputed` derives `title`, `description`, `ogImage`, `ogImageAlt`, and `ogVideoUrl` per page from the current `video` object.
- Adding a `startAt` field to a video entry is wired up (via the Vimeo Player SDK, since the `#t=` URL fragment isn't honored by bare player embeds) but currently unused by any entry.

### Automotive Filmstrip
- 3 columns, each duplicated (original + clone) for a seamless `translateY(-50%)` loop.
- Clone videos are filled via `captureStream()` (Chrome/Firefox) rather than re-requesting the same `src`, avoiding double-decoding; Safari falls back to sharing the cached `src`.
- Because clones use `srcObject` instead of `src`, every visibility-based play/pause check in `automotive.js` must test `!v.src && !v.srcObject` — checking `src` alone silently skips every clone.
- Columns scroll at different speeds and alternate directions for depth; `will-change: transform` on each column for GPU acceleration.

### Automotive Video Cards
- Each card is a real `<a>` linking to its `/work/<slug>/` page, with a `<video class="auto-card-bg">` background that hover-plays via `pointerenter`/`pointerleave` (not CSS `:hover`, since it needs to lazily upgrade `preload` and call `.play()`).
- A separate `<img class="auto-card-poster">` sits above the video and crossfades out only while the `is-playing` class is active, so hovering off always restores the true thumbnail rather than whatever frame the video paused on.
- No colour-tint overlay is applied to the video/poster — an earlier `mix-blend-mode: screen` accent layer (left over from a placeholder-gradient version of these cards) was removed since it doesn't belong over real footage.

### Page Entrance Animations
- All pages follow the same pattern: section fade at `delay: 0.85`, text sequence at `delay: 1.0–1.1`, synced to the loader fade.
- Below-fold reveals use `ScrollTrigger` with `once: true` + independent `gsap.fromTo()` tweens per element (not a single shared stagger tween, and not `gsap.from()`'s implicit "to" sampling) — both alternatives were found to leave every element but the first permanently stuck invisible in this codebase.

### SEO
- **Meta & social:** Full title/description, Open Graph, and Twitter Card tags in `base.njk`, with `og:image`/`twitter:image` resolved via the `absoluteUrl` filter so both local posters and absolute Vimeo CDN thumbnails render correctly. Per-page `robotsMeta` override supported (used by `404.njk`).
- **Structured data:** `ProfessionalService` + `WebSite` JSON-LD sitewide; `VideoObject` + `BreadcrumbList` on every `/work/<slug>/` page; `Service`/`OfferCatalog` on Services; `Person` on About; `BreadcrumbList` on Automotive and Work.
- **Sitemap:** `sitemap.njk` → `/sitemap.xml` is generated dynamically from `clientVideos.json` plus the static top-level pages — every film page is included automatically, with no manual upkeep. It also emits Google's video-sitemap extension (`video:thumbnail_loc`, `video:player_loc`, `video:duration`, `video:publication_date`, etc.) for each film, a dedicated signal for Google Video Search.
- **robots.txt:** `robots.njk` → `/robots.txt`, allows everything, points to the sitemap.
- **Headings:** every page has exactly one real `<h1>` (several hero titles were previously styled `<p>`/`<span>` elements with no semantic heading at all).
- **Alt text:** descriptive, specific alt text on all photography — no generic "automotive photography" placeholders.
- **404 handling:** a real `/404.html` page exists (there wasn't one previously), served `noindex, follow`.

### No Preview Gate
The site previously redirected any visitor without a saved `localStorage` flag to a `/wip` "coming soon" page (with search-engine bots whitelisted so the real pages could still be crawled and indexed pre-launch). That gate, the `/wip` page, and its script have been removed now that the site is live — every visitor lands directly on the real pages.

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

Eleventy builds to `_site/`, watches for changes, and serves at `http://localhost:3001` (or the next free port).

---

## Deployment

Connected to GitHub. Every push to `main` is auto-deployed via Vercel. Video streaming headers (`Accept-Ranges: bytes`) are configured in `vercel.json` for range request support.

---

## Contact

- **Email:** rafhin.visual@gmail.com
- **Instagram:** [@_rafhin](https://www.instagram.com/_rafhin/)
