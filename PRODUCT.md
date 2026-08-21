# PRODUCT.md — CIA ALFA 552

**What it is:** Marketing landing page for CIA ALFA 552, a Venezuelan aeronautical instruction center (INAC · CIAC 552, founded 2011, ~1,240 graduates, Caracas).

**Register:** brand (design IS the product). Single long-scroll landing page.

**Audience:** prospective Venezuelan aviation students (17-18+) and credibility-checkers (parents, employers). Spanish-language.

**Programs:** TMA-552 (mantenimiento aeronáutico), TMD-552 (aviónica), TCP-552 (tripulante de cabina), DV-552 (despacho de vuelo), PPA-552 (pilotos, en certificación 2027).

**Aesthetic lane:** "cinematic aviation prestige" — dark, single-chroma. One full-colour aspirational hero; all other photography monochrome; aviation gold (`#e8b647`) is the only accent. Sharp architectural edges, hairline grid, technical mono details (tail numbers, program codes, checklist) that carry real information, not decoration.

**Type:** Archivo (display/body) + IBM Plex Mono (technical labels/data). Both are pre-committed brand identity (IBM Plex Mono is authentic aviation-document texture here, not a reflex pick).

**Tokens/theme:** `app/alfa.css` (CSS custom properties, dark default + light mode via `data-theme`, manual toggle). Tailwind v4 utilities for layout.

**Motion:** MOTION_INTENSITY ~6. IntersectionObserver reveals + count-up, native CSS scroll-driven hero/section parallax. Reduced-motion honored throughout. No scroll-event listeners.

**Stack:** Next.js 16 (app router, RSC), React 19, Tailwind v4, shadcn/ui primitives. Images: verified Unsplash aviation photography (see `components/alfa/images.ts`).

**Non-negotiables:** zero em-dashes; WCAG AA contrast in both themes; one theme per page (no section inversion); one accent; sharp radius everywhere.
