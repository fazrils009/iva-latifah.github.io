# Untuk Iva — a private digital letter

A single-page, interactive invitation: an opening greeting, a short visual
memory section, and a hand-opened envelope that reveals a personal letter
and a yes/maybe response. Built by hand in plain HTML, CSS and JavaScript —
no framework, no build step.

---

## 1. Project overview

The page walks through one continuous emotional beat:

```
Opening screen  →  Hero (name)  →  Little Moments  →  Envelope
     →  Letter reveal  →  Yes / Maybe  →  Closing
```

Everything — copy, colors, type, motion — was chosen specifically for this
one recipient, not assembled from a generic template.

## 2. Tech stack

- **HTML5** — semantic markup, one `<h1>`, proper landmark/heading order.
- **CSS3** — custom properties (design tokens), Grid, Flexbox, `clamp()`,
  no preprocessor, no framework.
- **Vanilla JavaScript** — plain `<script>` tags (not ES modules), so the
  site also runs correctly when opened directly from disk via `file://`,
  where module `CORS` rules can otherwise block loading.
- **Google Fonts** — Playfair Display, Lora, Great Vibes, loaded via
  `<link>` in `<head>`.

No build tools, bundlers, or dependencies are required. Unzip and open
`index.html`, or upload the folder to any static host.

## 3. Project structure

```
iva-website/
├── index.html
├── README.md
├── css/
│   ├── tokens.css        design tokens: color, type scale, spacing, motion
│   ├── base.css           reset + element defaults + focus states
│   ├── typography.css     heading/body/script text styles
│   ├── layout.css         section containers and grids
│   ├── components.css     buttons, envelope, letter card, music player…
│   ├── animations.css     particle keyframes, celebration burst
│   └── responsive.css     breakpoint-specific structural tweaks
├── js/
│   ├── data.js             ← edit this file to change the letter text
│   ├── utils.js             shared helpers (random, focus trap, reveal-on-scroll)
│   ├── particles.js         falling hearts/petals + the "Yes" burst
│   ├── envelope.js          envelope open sequence
│   ├── letter.js             letter overlay + staged text reveal
│   ├── musicPlayer.js       floating play/pause control
│   └── main.js               wires everything together
└── assets/
    ├── photos/             put real photos here (see §16)
    └── audio/               put a song file here (see §17), e.g. song.mp3
```

## 4. Installation

No installation needed. Two options:

- **Open locally:** unzip the folder and double-click `index.html`.
- **Host it:** upload the whole folder to any static host (Netlify,
  Vercel, GitHub Pages, etc.) and point it at `index.html`.

## 5. Development

Any static file server works, e.g. from inside the project folder:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`. A local server isn't required (the
site works from `file://` too), but it's closer to how it'll actually be
hosted, and lets you use browser dev tools' network tab to check asset
sizes.

## 6. Build

There is no build step — the files you edit are the files that ship.

## 7. Components

| File | What it owns |
|---|---|
| `envelope.js` | The tap/click/keyboard-triggered open sequence: nudge → seal-to-sparkle → flap opens → letter peeks out. |
| `letter.js` | The full-screen letter overlay: dims the background, reveals each line of the letter with a pause, hands off to the response buttons, and owns closing (✕ button, backdrop click, `Esc`). |
| `particles.js` | The ambient falling hearts/petals, and the celebratory burst fired from "Yes, let's go". Both are capped and self-clean. |
| `musicPlayer.js` | The floating play/pause toggle. Never autoplays. Disables itself quietly if no song file is present. |
| `main.js` | Boots every module, handles the opening cover, and steps through Yes/Maybe/Let's-plan-it. |

## 8. Animation system

- Every animation drives `transform`/`opacity` only (never `top`, `left`,
  `width`, `height`) so the browser can composite them cheaply.
- The envelope, letter reveal, and particle drift all use the same easing
  token, `--ease-petal` (`cubic-bezier(0.22, 1, 0.36, 1)`), so the motion
  feels like one consistent hand.
- Falling particles are capped at ~24 on desktop / ~11 on mobile, are
  removed from the DOM on `animationend`, and pause spawning when the
  tab isn't visible — no runaway particle generation.
- `@media (prefers-reduced-motion: reduce)` disables the particle field,
  the envelope's idle float, and the celebration glow, and speeds every
  remaining transition to near-instant.

## 9. Responsive strategy

Mobile-first, fluid rather than fixed-breakpoint:

- Type scales with `clamp()` (see `--fs-*` tokens in `tokens.css`).
- Spacing scales with `clamp()` (see `--space-*` tokens).
- The "Little Moments" grid is a single column under 640px and becomes
  an asymmetric editorial layout from 640px and 1024px up.
- `responsive.css` handles the handful of things a formula can't express
  (short landscape viewports, touch-only affordances).
- `overflow-x: hidden` on `body` is a safety net, not a fix — no
  component should rely on it to avoid overflow.

## 10. SVG icon system

All interface icons are hand-drawn SVG `<symbol>` definitions in a single
hidden sprite at the top of `index.html`, reused everywhere via
`<use href="#icon-name">`. No emoji is used as UI iconography anywhere on
the page. Available icons: `icon-heart`, `icon-petal`, `icon-sparkle`,
`icon-close`, `icon-calendar`, `icon-play`, `icon-pause`, `icon-mail`,
`icon-flower`, `icon-arrow-down`. Add `class="icon icon--filled"` to fill
an icon solid; `class="icon"` alone renders it as a thin outline.

## 11. Accessibility

- Semantic landmarks (`main`, `section`, `article`, `button`) and a
  single, correctly nested heading hierarchy (`h1` → `h2`).
- Visible focus ring on every interactive element (`:focus-visible`).
- The envelope is a real `<button>`: it opens with mouse click, touch
  tap, and keyboard `Enter`/`Space` — no hover-only interaction anywhere.
- The letter overlay is a proper modal (`role="dialog"`,
  `aria-modal="true"`), traps focus while open, and returns focus to the
  envelope on close. Background content is marked `inert` until the
  opening screen is dismissed, so keyboard users can't tab into
  still-hidden content.
- Decorative SVGs are `aria-hidden="true"`; the photo placeholders use
  `<figure>`/`<figcaption>` rather than an empty `alt`-less `<img>`.
- `prefers-reduced-motion: reduce` is respected throughout.

## 12. Performance considerations

- No lazy loading anywhere: no `loading="lazy"`, no
  `IntersectionObserver`-deferred content. `IntersectionObserver` is used
  once, only to trigger an already-loaded section's reveal animation —
  never to delay loading anything.
- Fonts are preconnected; nothing else is preloaded (avoiding
  over-preloading).
- Particle count is hard-capped and cleaned up on `animationend`; the
  system pauses while the tab is hidden.
- All event listeners are attached once at init — nothing re-binds on
  every render.

## 13. Browser compatibility

Built and tested against modern evergreen browsers: Chrome, Edge,
Firefox, Safari (desktop and iOS), and Android Chrome/Samsung Internet.
No experimental APIs are used. The one modern feature relied on,
`inert`, degrades harmlessly on unsupported browsers (background content
simply remains focusable during the opening screen — everything else
still works).

## 14. How to customize text

Open `js/data.js`. `recipientFirstName`, every line of the letter
(`letterLines`), and the song title live there. The hero name, section
titles, and the "Little Moments" captions are written directly in
`index.html` since they're one-time content rather than a sequence a
script needs to step through — search for the text you want to change.

## 15. How to replace photos

The four frames in "Little Moments" currently show an intentional,
softly-styled placeholder (not a broken image). To use real photos:

1. Add your images to `assets/photos/`.
2. In `index.html`, inside a `.moment__frame` div, add an `<img>` before
   the placeholder glyph, e.g.:
   ```html
   <img src="assets/photos/01.jpg" alt="Describe the moment here" />
   ```
3. You can remove that frame's `<svg class="moment__glyph">` and
   `<span class="moment__tag">` once a real photo is in place.

## 16. How to replace music

1. Add a song file to `assets/audio/`, e.g. `assets/audio/song.mp3`.
2. In `js/data.js`, set `song.src` to that path and `song.title` to
   whatever you'd like the floating label to say.
3. That's it — the player only ever starts on a direct tap, per the
   brief, so there's nothing else to wire up.

## 17. How to modify colors

All color is defined once, as CSS custom properties in
`css/tokens.css` (`--color-ivory`, `--color-blush`, `--color-rose`, etc.).
Change a value there and it updates everywhere it's used.

## 18. How to modify animations

Timing and easing are tokens too (`--duration-fast/base/slow`,
`--ease-petal` in `tokens.css`). The envelope's phase timing lives in
`js/envelope.js` (`Utils.wait(...)` calls); the letter's line-by-line
pacing lives in `js/letter.js`. Particle count, speed range, and color
tints are set in `js/particles.js`.
