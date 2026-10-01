# Reference-style homepage (round 1)

Date: 2026-10-01 · Status: draft for review · Supersedes `2026-10-01-interest-showcase-design.md`

## Goal

Rebuild the homepage, navbar, footer and phone navigation to match the structure, layout, interactions and visual style of https://www.distinctdestinations.in/, using only Untamed India's own name, logo, wording, photos, videos and testimonials. Inner pages are round 2; until then they inherit the new colours and fonts through the existing CSS variable names.

Not copied: their logo, wordmark, tagline, any text, photos, videos, mandala artwork, testimonials, affiliation logos.

## Homepage, top to bottom

| # | Section | Content |
|---|---|---|
| 1 | **Hero** — full-screen photo (`min-height: 100dvh`), script line, serif subtitle (no "Scroll down" cue — Taste Skill bans it) | Ganga aarti photo (`photo-1715193678341-31634700f56b`); script: "Journeys with purpose"; subtitle: current hero text |
| 2 | **Our Story** — centred serif heading, orange underline, paragraph, READ MORE → `/about`, over a faded warm photo | Current Our Story subtitle + "Passion, not packages" paragraph; Mehrangarh photo faded ~85% into cream |
| 3 | **Our Destinations** — carousel: one large centred card, neighbours peeking left/right, arrows, swipe, keyboard | Rajasthan → `/destinations/heritage`, Kerala → `/destinations/coastal`, Ladakh → `/destinations/himalayan`, Varanasi → `/destinations/spiritual`, Central India → `/destinations/wildlife`, Hampi → `/destinations/cultural`; photos already verified this session |
| 4 | **What calls you?** — big serif list left; hover (desktop) / tap (phone) swaps the photo card right: title, two lines, VIEW ALL | Culture & Heritage, Wildlife, Mountains, Adventure, Coast & Backwaters, Spirit & Wellness (mood + intro from the superseded spec), Luxury Hotels → `/luxury-hotels`, Women's Journeys → `/womens-journeys`; interests link to their destination page or `/tours?mood=…` |
| 5 | **Video gallery** — black, script title, subtitle, one main video + 4 thumbnails, "Read the story" | Five Ways clips re-cut wide (16:9) from the same Pexels sources into `public/videos/five-ways-wide`; main plays muted, looped, only when on screen; thumbnail click swaps main; "Read the story" opens existing `feel-*` story pop-up |
| 6 | **Making a difference** — full-width photo, overlay heading + text + link | Impact Credits copy (5% back as credit, or gifted to fund a girl child's education); landscape photo unless client supplies real programme photos |
| 7 | **What our guests say** — centred heading, quote carousel, faint jaali pattern background | The 5 existing testimonials (confirmed real), shown as ~3-line excerpts with "…" where cut; nothing reworded |
| 8 | Footer | See below |

Removed from the homepage: Five Ways (as a section), three-panel, both editorial blocks, photo strip, Private Travel Club, CTA banner, interests grid. Component files are deleted only if nothing else imports them.

## Visual system

- Colours: black `#0F0F0F`, cream `#F7F1E8`, white, saffron `#E07A2A` (decorative), deep orange `#B4561A` (small text), ink `#1C1814`, muted `#5A5048`. Existing variable names (`--paper`, `--indigo`, `--madder`, `--gold`…) are re-pointed so inner pages follow.
- Fonts (next/font): Playfair Display headings, Allison script accents (hero line, video title only), Inter body.
- Section headings: centred serif + 48×2px orange underline.
- Light sections: faint original jaali lattice SVG pattern (~6% opacity).
- Photos: no rounded corners beyond 2px; no drop shadows.

## Motion (GSAP)

Every animation has a stated purpose (Taste Skill §5); all collapse to static under reduced motion.

- Hero: script line draws in, subtitle fades up (SplitText) — first impression.
- Section headings: words rise in as each section enters (ScrollTrigger, once).
- Our Destinations: cards glide between positions; drag/swipe with momentum.
- What calls you?: photo cross-fades and scales slightly on change.
- Making a difference: slow parallax on the photo (scrub).
- Navbar transparent → black and back-to-top visibility: ScrollTrigger / IntersectionObserver. No `window` scroll listeners anywhere (replaces the current ones in Navbar and ChatAssistant).

## Quality rules applied from Taste Skill

Saved at `.claude/skills/design-taste-frontend/` (MIT). The client reference wins on look (centred hero, alternating black and cream sections, serif headings, cream palette — justified as a heritage brand). Taste Skill wins on quality:
- No em-dashes or en-dashes in any new visible text.
- One label per action across the page ("Plan your journey" for enquiry, everywhere).
- WCAG AA contrast on every button, form field and orange text (orange text uses `#B4561A`).
- No scroll cue; no eyebrow labels; middle dots rationed.
- Hero LCP image preloaded; no layout shift from fonts or images.
- Lucide icons kept (already a dependency) with one stroke width.

## Shared parts

- **Navbar**: TUI mark + "The Untamed India" (two lines) left; Destinations · Journeys · menu button right. Transparent over the hero, black after scrolling past it; always black on inner pages. Menu opens a full-screen black overlay with all links.
- **Phone bar (≤ 768px)**: fixed bottom, black, three equal buttons — Journeys (`/tours`), Chat (opens existing chat panel), Contact (`/contact`). The floating chat button is hidden on phones; desktop unchanged. Page bottom padding prevents the bar covering the footer.
- **Back to top**: round orange-outline arrow, bottom-right (above the phone bar), appears after one screen of scroll.
- **Footer**: black; logo; Quick Links; Destinations; newsletter (existing form); phone, email, city. No social icons.

## Code

- New: `components/home/{Hero,OurStory,DestinationsCarousel,WhatCallsYou,VideoGallery,MakingDifference,GuestStories}.tsx` (+ `.module.css` each); `components/MobileBar.tsx`, `components/BackToTop.tsx`; `lib/home.ts` (destinations + interests data).
- Rebuilt: `Navbar`, `Footer`; `HomeLanding` composes the new sections; `ChatAssistant` exposes open/close through a small shared store so the phone bar can open it.
- `app/tours/page.tsx`: initial mood from `?mood=` (Suspense-safe).
- One new package: `gsap` (free licence, incl. ScrollTrigger and SplitText). Unchanged: forms, chat logic, story pop-up, register pop-up, inner-page markup.

## Verification

1. Data check: every link target, image URL and video file exists (no 404s).
2. Playwright at 1440 and 390: carousel arrows/swipe/keys; list hover and tap swap; video thumbnail swap and story pop-up; phone bar Chat opens the panel; back-to-top appears and works; navbar transparent → black; `/tours?mood=Adventure` pre-filtered; no console errors.
3. Screenshots side by side with the reference, reviewed by eye.
4. `npx tsc --noEmit` and `npm run build` pass.

## Out of scope

Inner pages (round 2); cookie-consent banner (recommended separately — it should actually block Microsoft Clarity until accepted); affiliations; social links.
