# "What calls you?" — interest showcase

Date: 2026-10-01 · Status: draft for review

## Goal

Let a visitor say what kind of India they want — culture, wildlife, mountains, adventure, coast, or spirit — and immediately see that India: places, matching journeys, a hotel, and a way to start planning. Clean, calm, in the site's new paper / indigo / madder style.

Done when: the showcase replaces the "Journey By Experience" grid on the homepage; all six interests show real content; a link like `/?interest=adventure` opens on that interest; "See all … journeys" lands on a pre-filtered Journeys page; "Plan a … journey" opens the register form pre-filled; type-check and `npm run build` pass.

## Decisions

| Question | Decision |
|---|---|
| How much changes | One showcase section; the rest of the homepage is unchanged |
| Where | Replaces "Journey By Experience" (the 8-card grid), same position: after Five Ways |
| Interests | Culture & Heritage · Wildlife · Mountains · Adventure · Coast & Backwaters · Spirit & Wellness |
| Interaction | Tabs that swap content in place |
| Place content | Claude drafts; owner reviews before launch (see "Draft copy") |

## What the visitor sees

**Desktop**

1. Section label "Explore India" (rules both sides) and title "What calls you?".
2. Six interest tabs in one centred row, Cormorant serif. Active: ink with a 1px madder underline. Inactive: muted ink.
3. Feature row: wide photo on the left; on the right the interest name, its one-line mood, a two-sentence intro, and an "Explore [destination] →" link (omitted when the interest has no destination page).
4. Places: 4 portrait cards (same treatment as today's category cards — 3:4, 2px radius, gold mount on hover), each with photo, place name, region and one-line caption. Places are not links in this version.
5. Footer row: up to 3 matching journeys as compact text links (title · region · duration → `/tours/[slug]`); one hotel (name, destination, link to `/luxury-hotels`); a madder "Plan a [interest] journey" button; and "See all [interest] journeys →" to `/tours?mood=…`.

**Behaviour**

- Culture & Heritage is selected when no interest is given, so the section is never empty.
- Switching cross-fades the content (~0.5s); the section keeps a stable height so the page doesn't jump.
- The choice is written to the URL as `?interest=<id>` with `router.replace` (no new history entry): links share the exact view, and the back button leaves the page normally. *(Corrects the earlier "back steps through interests" — that would trap people who click through several tabs.)*
- An unknown `?interest=` value falls back to Culture & Heritage.
- Honours reduce-motion (no fade).

**Phones (≤ 600px)**

- Tabs become a horizontally swipeable row; the active tab is scrolled into view.
- Feature photo stacks above its text.
- Places become a 2-column grid (each interest has 4 places, so it's always 2 × 2).
- Footer row stacks: journeys, hotel, then the two actions.

**Accessibility**

- WAI-ARIA tabs pattern: `role="tablist"`, `role="tab"` with `aria-selected` / `aria-controls`, one `role="tabpanel"`.
- Left/Right arrow keys move between tabs (wrapping), Home/End jump to first/last; selection follows focus.
- Photos have meaningful `alt` text.

## Content and data

### `lib/interests.ts`

```ts
export type InterestId = 'culture' | 'wildlife' | 'mountains' | 'adventure' | 'coast' | 'spirit';

export type InterestPlace = {
  name: string;
  region: string;
  caption: string;
  image: string; // images.unsplash.com URL, checked by eye
  alt: string;
};

export type Interest = {
  id: InterestId;
  label: string;          // tab text
  mood: string;           // one line under the name
  intro: string;          // two sentences
  image: string;          // feature photo
  imageAlt: string;
  places: InterestPlace[];       // exactly 4
  journeyMoods: string[];        // matched against tour.moods
  primaryCategory: string;       // tours with this category rank first
  hotelId?: string;              // id in LUXURY_HOTELS
  explore?: { label: string; href: string }; // destination page, when one exists
  toursMood: string;             // value used in /tours?mood=
};

export const INTERESTS: Interest[];
export const DEFAULT_INTEREST: InterestId; // 'culture'
export function getInterest(id: string | null): Interest;            // falls back to default
export function getInterestJourneys(interest: Interest): Tour[];     // ranked, max 3
export function getInterestHotel(interest: Interest): LuxuryHotel | undefined;
```

Journeys and hotels are read from the existing `tours` (`lib/data.ts`) and `LUXURY_HOTELS` (`lib/luxuryHotels.ts`); nothing is copied.

### Mapping

| Interest | `journeyMoods` | `primaryCategory` | Hotel | Explore link | `toursMood` |
|---|---|---|---|---|---|
| Culture & Heritage | Cultural, Heritage | cultural | `rambagh-palace` | /destinations/cultural | Cultural |
| Wildlife | Wildlife, Birding, Photography | wildlife | `oberoi-vanyavilas` | /destinations/wildlife | Wildlife |
| Mountains | Himalayan | himalayan | `ananda-himalayas` | /destinations/himalayan | Himalayan |
| Adventure | Adventure | himalayan | `evolve-back-coorg` | — | Adventure |
| Coast & Backwaters | Coastal | coastal | `kumarakom-lake-resort` | /destinations/coastal | Coastal |
| Spirit & Wellness | Spiritual | spiritual | `six-senses-barwara` | /destinations/spiritual | Spiritual |

### Journey ranking

Tours whose `moods` include any of the interest's `journeyMoods`; those whose `category` equals `primaryCategory` first, then the rest; data order within each group; at most 3. With today's data this gives:

| Interest | Journeys shown |
|---|---|
| Culture & Heritage | Heart of Central India · Souls of the North: Luxury Spiritual Circuit · Coastal Escapes of South India |
| Wildlife | The Grand Tiger Expedition · The Lion of Sasan: Gir Safari · Himalayan Avian Masterclass |
| Mountains | Himalayan Adventure: Ladakh Expedition · Himalayan Avian Masterclass · Souls of the North: Luxury Spiritual Circuit |
| Adventure | Himalayan Adventure: Ladakh Expedition · The Grand Tiger Expedition · The Lion of Sasan: Gir Safari |
| Coast & Backwaters | Coastal Escapes of South India |
| Spirit & Wellness | Souls of the North: Luxury Spiritual Circuit |

If an interest matches no journeys, the journeys block is hidden. If `hotelId` is missing or unknown, the hotel block is hidden. The data check (Verification) fails on either, so neither ships silently.

## Draft copy — for owner review

Every line below is a draft. Correct anything you don't offer or would phrase differently.

**Culture & Heritage** — *Palaces, crafts and living traditions.*
India's culture isn't behind glass. Walk Jaipur's bazaars with a textile historian, dine in a family haveli, and watch crafts handed down for generations still being made by hand.
- Jaipur, Rajasthan — Pink-walled bazaars, block printers and the Amber Fort at first light.
- Udaipur, Rajasthan — Lake palaces, miniature painters and evenings on Lake Pichola.
- Hampi, Karnataka — The boulder-strewn ruins of the Vijayanagara capital.
- Kutch, Gujarat — Embroiderers, potters and Ajrakh printers beside the white Rann.

**Wildlife** — *Tigers at dawn, rhinos in the tall grass.*
India holds most of the world's wild tigers and the last Asiatic lions. Our naturalists know these forests intimately — and know how to wait, quietly, for the moment.
- Ranthambore, Rajasthan — Tigers among the ramparts of an ancient fort.
- Kaziranga, Assam — One-horned rhinos, wild elephants and swamp deer in the tall grass.
- Gir, Gujarat — The only wild home of the Asiatic lion.
- Jawai, Rajasthan — Leopards on granite hills, living alongside Rabari herders.

**Mountains** — *Thin air, prayer flags and silence.*
Above the tree line, India slows to the pace of its monasteries. Cross high passes in Ladakh, wake to Kanchenjunga in Sikkim, or walk the oak forests of Kumaon.
- Ladakh — Monasteries on ridgelines, high passes and turquoise lakes.
- Spiti Valley, Himachal Pradesh — A cold desert of cliff-top monasteries and fossil-strewn villages.
- Sikkim — Kanchenjunga at sunrise and monasteries in the clouds.
- Kumaon, Uttarakhand — Oak and rhododendron forests facing the Himalayan peaks.

**Adventure** — *White water, high roads and nights under the stars.*
For travellers who like their luxury earned. Raft the Ganga below Rishikesh, drive the high road into Spiti, dive the reefs of the Andamans — and return each night to a beautiful bed.
- Rishikesh, Uttarakhand — White-water rafting on the Ganga, then the evening aarti on the ghats.
- Spiti high road, Himachal Pradesh — One of the world's great mountain drives, through Kinnaur into Spiti.
- Andaman Islands — Coral reefs, clear water and some of India's best diving.
- Meghalaya — Treks to living root bridges grown by Khasi villagers.

**Coast & Backwaters** — *Slow water, spice air and long lunches.*
The south moves at the pace of the tide. Drift Kerala's backwaters on a private houseboat, wander French Pondicherry, and end the day on a cliff above the Arabian Sea.
- Kerala backwaters — A private kettuvallam through palm-lined canals and villages.
- Pondicherry — French-quarter streets, bougainvillea and Tamil temples.
- Goa — Portuguese churches, spice farms and quiet southern beaches.
- Varkala, Kerala — Red laterite cliffs above the Arabian Sea.

**Spirit & Wellness** — *Dawn on the Ganga, and time to be still.*
Some journeys are inward. Watch the aarti in Varanasi, share langar at the Golden Temple, sit beneath the Bodhi tree — and rest at retreats built for real restoration.
- Varanasi, Uttar Pradesh — Dawn boats past the ghats of one of the world's oldest living cities.
- Amritsar, Punjab — The Golden Temple, whose community kitchen feeds tens of thousands every day.
- Bodh Gaya, Bihar — Where the Buddha attained enlightenment beneath the Bodhi tree.
- Rishikesh, Uttarakhand — Yoga ashrams on the Ganga in the Himalayan foothills.

**Photos:** ~30 (6 feature + 24 places) from Unsplash (free licence, commercial use, no credit required), each viewed before use; no photo repeats another on the homepage.

## Code changes

| File | Change |
|---|---|
| `lib/interests.ts` | New — data and helpers above |
| `components/InterestShowcase.tsx` + `.module.css` | New — the section; receives the active interest id and an `onSelect(id)` callback |
| `components/HomeLanding.tsx` | Replace `<CategoriesSection />` with `<InterestShowcase />`; read `?interest=` and update it with `router.replace(…, { scroll: false })`, same pattern as `?story=` / `?register=`; pass the active interest's label to the register modal |
| `components/RegisterInterestModal.tsx` | New optional prop: pre-fills the "What are you interested in?" field when it is empty |
| `app/tours/page.tsx` | Initial mood filter read from `?mood=` (case-insensitive match against `moods`; unknown value → no filter); page must still prerender (Suspense boundary around the search-params read) |
| `components/Categories.tsx` + `.module.css` | Deleted — only the homepage used them; `/destinations/[id]` uses the `categories` data, not this component |

The new section keeps `id="destinations"` so any existing `#destinations` link still lands on it.

## Verification

No test runner exists in the repo; checks run as scripts outside it (not committed):

1. **Data check** — every `hotelId` exists in `LUXURY_HOTELS`; every interest has ≥ 1 journey and exactly 4 places; every image URL returns 200.
2. **Browser check (Playwright, desktop 1440 and phone 390)** — each tab shows its own heading and places and sets `?interest=`; arrow keys move between tabs; `/?interest=wildlife` opens on Wildlife; `/?interest=nonsense` shows Culture & Heritage; "See all Adventure journeys" lands on `/tours?mood=Adventure` with the Adventure chip active and only Adventure journeys listed; "Plan a … journey" opens the form with the interest pre-filled; no console errors or 404s.
3. **Screenshots** of all six interests at both widths, reviewed by eye.
4. `npx tsc --noEmit` and `npm run build` pass.

## Out of scope

Personalising other sections (hero, editorial, testimonials); remembering the choice across visits; place detail pages; new journeys for thinly covered interests (Coast and Spirit have one journey each today); inner-page restyle.
