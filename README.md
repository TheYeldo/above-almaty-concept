# Above Almaty — independent hotel concept

A cinematic, scroll-driven portfolio concept inspired by The Ritz-Carlton, Almaty. This is not an official Ritz-Carlton or Marriott website and does not submit real reservations.

## Run locally

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

Production checks:

```bash
pnpm lint
pnpm build
pnpm start
```

## Architecture

- `src/app` — App Router entry, metadata, icon, sitemap and robots.
- `src/components/three` — procedural Esentai Tower, mountain environment, camera rig and floor indicator.
- `src/components/sections` — the scroll journey, Sky Lobby, Rooms, Almaty, Dining, Wellness, Club and booking finale.
- `src/components/layout` — preloader, header, language menu, smooth scrolling, cursor and footer.
- `src/components/ui` — magnetic buttons and GSAP reveal primitives.
- `src/data` — bilingual copy and editable room inventory.
- `src/hooks` — reduced-motion and WebGL capability detection.
- `public/images` — lightweight local concept compositions; see `ASSETS.md`.

## Motion and performance

GSAP ScrollTrigger drives tower construction, ascent, horizontal room movement and environmental transitions. React Three Fiber renders a procedural tower made from reusable primitives. DPR is capped, adaptive DPR is enabled, particles are reduced on low-motion paths, WebGL has a CSS fallback, and below-fold feature sections are split into separate client chunks.

`prefers-reduced-motion` disables Lenis, shortens the 3D journey, presents the tower assembled, removes camera flights and turns the rooms section into a horizontal, touch-scrollable gallery.
