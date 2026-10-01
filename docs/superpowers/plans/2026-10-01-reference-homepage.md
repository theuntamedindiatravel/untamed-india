# Reference-style Homepage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the homepage, navbar, footer and phone navigation in the structure and style of distinctdestinations.in, with Untamed India's own content.

**Architecture:** One client component per homepage section under `components/home/`, each with a CSS module; shared data in `lib/home.ts`; GSAP (ScrollTrigger, SplitText, Draggable) for motion, wrapped in a `useGsap` hook that reverts on unmount and no-ops under reduced motion. Global tokens in `app/globals.css` are re-pointed so inner pages follow.

**Tech Stack:** Next.js 16.2 (App Router, Turbopack), React 19, CSS Modules, next/font, GSAP 3.15, lucide-react (existing), Playwright (cached, run from scratchpad) for verification.

**Spec:** `docs/superpowers/specs/2026-10-01-reference-homepage-design.md`

## Global Constraints

- Never `git commit` or `git push` (owner commits). Every "Commit" step in this plan is replaced by "leave changes in the working tree".
- Read the relevant guide in `node_modules/next/dist/docs/` before using a Next.js API (AGENTS.md).
- No visible em-dash (`—`) or en-dash (`–`) in any new site text (Taste Skill §9.G).
- One label per action: enquiry = "Plan your journey" everywhere on the homepage.
- Orange text uses `#B4561A`; `#E07A2A` only for decoration and large type.
- No `window.addEventListener('scroll')`; use ScrollTrigger or IntersectionObserver.
- Every animation no-ops under `prefers-reduced-motion: reduce`.
- Only new dependency: `gsap@^3.15.0`.
- Images: `images.unsplash.com` URLs viewed by eye before use; no photo repeated on the homepage.
- Testimonials: verbatim text, excerpted to about 3 lines with "…"; never reworded.

## Review Focus

1. Phone bar covering content: the last footer line and the chat panel must stay reachable at 390px. Test in Task 9 (scroll to bottom, assert footer bottom link is above the bar).
2. Carousel at the ends and on fast repeated clicks: wraps around, never shows a blank slot. Test in Task 5 (click "next" 8 times quickly, assert one active card with an image).
3. Reduced-motion visitors: content fully visible with no hidden-by-animation elements. Test in Task 11 (Playwright `reducedMotion: 'reduce'`, assert every section heading has opacity 1).
4. Videos failing to load or autoplay blocked: poster still shows, page stays usable. Test in Task 7 (block `*.mp4`, assert poster image visible and no console errors).
5. Touch devices with no hover: "What calls you?" must be fully usable by tap. Test in Task 6 (mobile context with `hasTouch`, tap second item, assert card title changes).

---

### Task 1: Foundation (GSAP, tokens, fonts, hook)

**Files:**
- Modify: `package.json` (via npm), `app/layout.tsx`, `app/globals.css`
- Create: `lib/useGsap.ts`, `components/home/Jaali.module.css`

**Interfaces:**
- Produces: `useGsap(scope: RefObject<HTMLElement | null>, setup: (gsap, ScrollTrigger) => void, deps?: unknown[])`; CSS vars `--black #0F0F0F`, `--cream #F7F1E8`, `--saffron #E07A2A`, `--saffron-ink #B4561A`, `--ink #1C1814`, `--ink-muted #5A5048`; font vars `--font-playfair`, `--font-allison`, `--font-inter`; global classes `.section-title` (centred Playfair + 48×2px saffron underline) and `.jaali` (pattern background).

- [ ] Step 1: `npm install gsap@^3.15.0`; confirm `package.json` lists it.
- [ ] Step 2: In `app/layout.tsx` replace `Cormorant_Garamond` with `Playfair_Display` (`variable: '--font-playfair'`, styles normal+italic) and add `Allison` (`weight: '400'`, `variable: '--font-allison'`); className `${inter.variable} ${playfair.variable} ${allison.variable}`.
- [ ] Step 3: In `globals.css` set the colour vars above; re-point legacy aliases: `--paper`/`--cream`→`--cream`, `--paper-light`→`#FFFFFF`, `--indigo`/`--indigo-deep`/`--midnight`→`--black`, `--madder`→`--saffron-ink`, `--madder-deep`→`#93460F`, `--gold`→`--saffron`, `--gold-light`→`#F2C9A0`, `--gold-ink`→`--saffron-ink`; `--font-serif`/`--font-display` → `var(--font-playfair), Georgia, serif`; add `--font-script: var(--font-allison), cursive`. Remove the paper-grain `body::before`.
- [ ] Step 4: Add `.section-title` (font Playfair 400, `clamp(2.2rem,4vw,3.2rem)`, centred, `::after` 48×2px `var(--saffron)` centred, margin 18px auto 0) and `.jaali` (background-image: inline SVG of a 40px lattice — two diagonal lines + a 6px circle at each crossing, stroke `#B4561A` at 0.07 opacity).
- [ ] Step 5: Create `lib/useGsap.ts`:

```ts
'use client';
import { useLayoutEffect, type RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useGsap(
  scope: RefObject<HTMLElement | null>,
  setup: (g: typeof gsap, st: typeof ScrollTrigger) => void,
  deps: unknown[] = [],
) {
  useLayoutEffect(() => {
    if (!scope.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => setup(gsap, ScrollTrigger), scope);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
```

- [ ] Step 6: `npx tsc --noEmit` → no errors; `npm run build` → succeeds.

### Task 2: Content data (`lib/home.ts`)

**Files:** Create `lib/home.ts`; scratch check script `scratchpad/check-data.mjs` (outside repo).

**Interfaces:**
- Produces:
```ts
export type HomeDestination = { id: string; name: string; line: string; image: string; alt: string; href: string };
export type HomeInterest = { id: string; label: string; title: string; body: string; image: string; alt: string; href: string };
export const HOME_DESTINATIONS: HomeDestination[]; // 6, order: rajasthan, kerala, ladakh, varanasi, central-india, hampi
export const HOME_INTERESTS: HomeInterest[];       // 8, order as spec §4
export const HOME_STORY: { title: string; body: string; href: string; image: string };
export const HOME_IMPACT: { title: string; body: string; href: string; image: string; alt: string };
export const HERO: { script: string; subtitle: string; image: string; alt: string };
```

- [ ] Step 1: Write `check-data.mjs`: imports nothing from the app; fetches every `image` URL found in `lib/home.ts` by regex and asserts HTTP 200; asserts 6 destinations and 8 interests by counting `id:` within each array; asserts no `—`/`–` characters in the file. Run it → FAILS (file missing).
- [ ] Step 2: Create `lib/home.ts`. Destination hrefs: rajasthan→`/destinations/heritage`, kerala→`/destinations/coastal`, ladakh→`/destinations/himalayan`, varanasi→`/destinations/spiritual`, central-india→`/destinations/wildlife`, hampi→`/destinations/cultural`. Interest hrefs: culture→`/destinations/cultural`, wildlife→`/destinations/wildlife`, mountains→`/destinations/himalayan`, adventure→`/tours?mood=Adventure`, coast→`/destinations/coastal`, spirit→`/destinations/spiritual`, hotels→`/luxury-hotels`, women→`/womens-journeys`. Interest titles/bodies: the moods and intros from `docs/superpowers/specs/2026-10-01-interest-showcase-design.md` with dashes rewritten as commas/periods; Luxury Hotels: "Palaces and retreats we know personally." / "Stays chosen for their character, their service and the places they open up."; Women's Journeys: "Travel India, led by women." / "Small-group journeys hosted by women, designed for comfort, connection and safety." Story/impact/hero text from current `OurStorySection.tsx` and `Hero.tsx`, dashes removed. Photos: reuse the IDs verified this session (hero `1715193678341-31634700f56b`; Rajasthan `1675079839131-8040dbc50625`; Kerala `1654530050931-3b02b28570c1`; Varanasi `1706186839147-0d708602587b`; Hampi `1561981969-65ee8dfc7351`; Central India `1589657429197-ecba47e3acd8`; Ladakh existing `1760835251791-1fda687de791`; interests: search Unsplash via WebFetch, download thumbnails, view a contact sheet, pick, as done for the categories). Impact: a landscape (no children) unless the owner supplies programme photos.
- [ ] Step 3: Run `node check-data.mjs` → PASS.

### Task 3: Navbar, footer, back-to-top, phone bar

**Files:** Rewrite `components/Navbar.tsx` + `.module.css`, `components/Footer.tsx` + `.module.css`; create `components/MobileBar.tsx` + `.module.css`, `components/BackToTop.tsx` + `.module.css`, `lib/chatStore.ts`; modify `components/ChatAssistant.tsx`, `components/AppShell.tsx`.

**Interfaces:**
- Produces: `lib/chatStore.ts` → `openChat(): void`, `useChatOpen(): [boolean, (v: boolean) => void]` (tiny `useSyncExternalStore` store). Navbar adds `data-solid` when the element `#hero-sentinel` is out of view (IntersectionObserver); on non-home routes always solid.

- [ ] Step 1: Write Playwright check `scratchpad/check-shell.js` (1440 and 390): navbar transparent at top of `/`, solid after scrolling 1000px; on `/tours` solid at top; at 390 the bar shows 3 buttons, tapping Chat opens `[role=dialog][aria-label="Chat assistant"]`; floating `.fab` hidden at 390, visible at 1440; back-to-top hidden at top, visible after 1200px, click returns `scrollY` to 0; scroll to bottom at 390 and assert the footer's last link `getBoundingClientRect().bottom` < bar top. Run → FAILS.
- [ ] Step 2: `chatStore.ts`; ChatAssistant uses `useChatOpen()` instead of local `open` state and drops its window scroll listener and `tucked` logic; its `.wrap` gets `display: none` at ≤768px except when open.
- [ ] Step 3: Navbar: left logo (TUI circle mark + two-line "The Untamed / India", Playfair), right: links Destinations (`/#destinations`), Journeys (`/tours`), menu button opening a full-screen black overlay (all links incl. Luxury Hotels, Women's Journeys, About, Contact, "Plan your journey" → `/?register=1#register`), Escape closes, focus returns to button. Keep the existing back-button behaviour for inner pages and overlays. Height 72px. Remove its window scroll listener.
- [ ] Step 4: Footer: black, 4 columns (logo + tagline + contact; Quick Links; Destinations; newsletter form kept verbatim from current Footer), bottom row © + legal links. No social icons.
- [ ] Step 5: MobileBar (`≤768px`, fixed bottom, 56px, black, 3 equal buttons Journeys/Chat/Contact with lucide `Compass`, `MessageCircle`, `Phone` at strokeWidth 1.5); `body` gets `padding-bottom: 56px` at that width. BackToTop: 44px circle, 1px saffron border, IntersectionObserver on `#hero-sentinel`-like `#top-sentinel` placed at 100vh; bottom offset 72px on phones.
- [ ] Step 6: Mount MobileBar and BackToTop in AppShell. Run `check-shell.js` → PASS; `npx tsc --noEmit` → clean.

### Task 4: Hero and Our Story

**Files:** Create `components/home/Hero.tsx` + `.module.css`, `components/home/OurStory.tsx` + `.module.css`.

- [ ] Step 1: Add to `scratchpad/check-home.js`: hero height ≥ viewport height at 1440×900 and 390×844; `h1` text equals `HERO.script`; Our Story has `.section-title` "Our Story" and a link to `/about` labelled "Read more". Run → FAILS.
- [ ] Step 2: Hero: `next/image` fill + `priority` with `HERO.image`; overlay `linear-gradient(rgba(15,15,15,.25), rgba(15,15,15,.55))`; `h1` in `--font-script` `clamp(3.5rem,8vw,6.5rem)` white; subtitle Playfair `clamp(1.05rem,1.6vw,1.35rem)` max 46ch; `min-height: 100dvh`; `<div id="hero-sentinel">` at its bottom. Motion via `useGsap`: SplitText chars of h1 from `opacity:0, y:20, stagger:.03`, subtitle fades up `delay .6`.
- [ ] Step 3: Add `images.unsplash.com` to `next.config.ts` `images.remotePatterns` (read `node_modules/next/dist/docs/01-app/03-api-reference/02-components/image.md` first).
- [ ] Step 4: OurStory: cream section, background `HOME_STORY.image` at `opacity:.12` under a cream gradient, centred `.section-title`, body max 70ch, "Read more" link in `--saffron-ink` uppercase .78rem tracking .18em. Heading reveal via shared helper `revealTitle(scopeSelector)` in `lib/useGsap.ts`: ScrollTrigger `start:'top 80%'`, words `y:24 → 0, opacity 0→1, stagger .06`, once.
- [ ] Step 5: Run check → PASS.

### Task 5: Destinations carousel

**Files:** Create `components/home/DestinationsCarousel.tsx` + `.module.css`.

- [ ] Step 1: Extend `check-home.js`: section `#destinations` exists; one `[data-active]` card; clicking "Next destination" 8 times fast leaves exactly one active card whose `img` has `naturalWidth > 0`; ArrowRight while focused advances; at 390 a horizontal drag of -200px advances. Run → FAILS.
- [ ] Step 2: State `index` (0..5, wraps). Render all 6 cards absolutely positioned; each card's offset `d = shortest signed distance(i, index)` sets CSS vars `--d`; transform `translateX(calc(var(--d) * 62%)) scale(d==0 ? 1 : .82)`, `opacity d in [-1,0,1] ? 1 : 0`; transitions 0.7s `cubic-bezier(.16,1,.3,1)` (CSS, no GSAP needed). Active card 56vw × 62vh desktop, 82vw × 56vh phone; side cards dimmed with `filter: brightness(.6)`. Name in Playfair over the bottom; active card links to `href`.
- [ ] Step 3: Arrow buttons (`aria-label` "Previous destination" / "Next destination"), `role="region" aria-roledescription="carousel"`, keyboard on the region, pointer drag: `pointerdown/up` delta > 50px → step.
- [ ] Step 4: Run check → PASS.

### Task 6: What calls you?

**Files:** Create `components/home/WhatCallsYou.tsx` + `.module.css`.

- [ ] Step 1: Extend checks: 8 list buttons; at 1440 hovering item 3 sets the card title to `HOME_INTERESTS[2].title`; at 390 (`hasTouch`) tapping item 2 sets it to `HOME_INTERESTS[1].title`; "View all" href equals the active interest's href. Run → FAILS.
- [ ] Step 2: White section with `.jaali`. Grid `1fr 1.1fr` (stack under 900px). Left: `<ul>` of buttons, Playfair `clamp(1.6rem,2.6vw,2.4rem)`, inactive `--ink-muted` at 0.45 opacity, active `--ink`; `onMouseEnter`, `onFocus`, `onClick` set active. Right: card (aspect 4/5 desktop, 4/3 phone) with stacked images (all 8 rendered, only active opacity 1, CSS cross-fade .6s + scale 1.04→1), caption block bottom-left on gradient: title, body, "View all" link.
- [ ] Step 3: On phones the list becomes a horizontal scroll-snap row above the card.
- [ ] Step 4: Run check → PASS.

### Task 7: Video gallery

**Files:** Create `components/home/VideoGallery.tsx` + `.module.css`; add `public/videos/five-ways-wide/*`; script `scratchpad/cut-wide.sh`.

- [ ] Step 1: Download the five Pexels originals (IDs in `components/FiveWaysSection.tsx` comments) from `https://www.pexels.com/download/video/<id>/` with curl `-L`; if blocked, load the page via Playwright and take the `video source` URL. Cut 8s from the same timestamps as the tall clips to 1280×720 H.264 (`-crf 26 -an -movflags +faststart`), plus a `.webp` poster at 1280×720. If any original cannot be obtained, use the tall clip centred on a blurred copy of itself (`ffmpeg` `split,scale,boxblur,overlay`) and tell the owner.
- [ ] Step 2: Extend checks: main video has a poster; clicking thumbnail 3 changes main `src` to `listen`; "Read the story" opens the story pop-up for `feel-listen`; with `*.mp4` routed to abort, poster visible and no console errors. Run → FAILS.
- [ ] Step 3: Black section; script title "Little films" in `--font-script` white, subtitle "Five moments from the road."; layout grid `2fr 1fr`, main `<video muted loop playsInline preload="metadata" poster>` plays only while ≥40% visible (IntersectionObserver), thumbnails are buttons (poster + verb). "Read the story" calls `onOpenStory('feel-' + id)`.
- [ ] Step 4: Run check → PASS.

### Task 8: Making a difference and Guest stories

**Files:** Create `components/home/MakingDifference.tsx` + `.module.css`, `components/home/GuestStories.tsx` + `.module.css`.

- [ ] Step 1: Extend checks: impact section has heading and a link labelled "Plan your journey" is NOT here (single CTA intent) but "How Impact Credits work" → `/about`; guest stories shows 1 quote, next/prev change it, each visible quote ≤ 4 rendered lines at 1440 (height / line-height). Run → FAILS.
- [ ] Step 2: MakingDifference: full-bleed 80vh, `HOME_IMPACT.image` with `useGsap` parallax (`yPercent: -12`, scrub), dark overlay, centred heading + body + link.
- [ ] Step 3: GuestStories: cream + `.jaali`; `.section-title` "What our guests say"; reuse the stacked-grid fade approach from the current `components/Testimonials.tsx`; excerpt helper `excerpt(text, maxChars = 240)` cuts at the last sentence end ≤ maxChars, else last space, appending "…".
- [ ] Step 4: Run check → PASS.

### Task 9: Assemble the homepage

**Files:** Modify `components/HomeLanding.tsx`; delete components only the homepage used (verify each with `grep -rn` first): `Hero.tsx`, `FiveWaysSection.tsx`, `ThreePanelHero.tsx`, `ThreePhotoStrip.tsx`, `EditorialSection.tsx`, `OurStorySection.tsx`, `MembershipSection.tsx`, `CTABanner.tsx`, `Categories.tsx`, `Testimonials.tsx` (+ their `.module.css`).

- [ ] Step 1: HomeLanding renders: Hero, OurStory, DestinationsCarousel, WhatCallsYou, VideoGallery (with `openPhotoStory`), MakingDifference, GuestStories, RegisterInterestModal, PhotoStoryModal. Keep existing `?story=` / `?register=` handling.
- [ ] Step 2: Delete the unused files above after grep confirms no other importers.
- [ ] Step 3: Run all checks + `npx tsc --noEmit` → PASS.

### Task 10: Journeys page `?mood=`

**Files:** Modify `app/tours/page.tsx`.

- [ ] Step 1: Check: `/tours?mood=Adventure` shows the Adventure chip active and only tours whose `moods` include Adventure; `/tours?mood=nonsense` shows all tours. Run → FAILS.
- [ ] Step 2: Read `node_modules/next/dist/docs` on `useSearchParams`; move the page body into a client child wrapped in `<Suspense>`; initialise `activeMood` from `moods.find(m => m.toLowerCase() === param?.toLowerCase()) ?? null`.
- [ ] Step 3: Run check → PASS; `npm run build` → `/tours` still static.

### Task 11: Verification and review

- [ ] Step 1: Reduced-motion check (Playwright `reducedMotion: 'reduce'`): every `h1, h2` on `/` has computed opacity 1 after load.
- [ ] Step 2: Grep new files for `—` and `–` in JSX text → none; grep for `addEventListener('scroll'` → none.
- [ ] Step 3: Screenshots of `/` at 1440 and 390, montage beside the reference screenshots, review by eye; fix anything off.
- [ ] Step 4: Inner-page smoke screenshots (`/tours`, `/luxury-hotels`, `/womens-journeys`, `/about`, `/contact`, `/destinations/wildlife`, one tour) → nothing broken.
- [ ] Step 5: `npx tsc --noEmit` and `npm run build` → pass. Restart a production server + ngrok link for sharing.
