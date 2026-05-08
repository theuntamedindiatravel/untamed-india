/** Optional full-screen hero video: place `hero.mp4` (and optionally `hero.webm`) in `public/womens-journeys/`. */
export const WOMENS_JOURNEYS_HERO_VIDEO = {
  mp4: '/womens-journeys/hero.mp4',
  webm: '/womens-journeys/hero.webm',
} as const;

/** Cinematic fallback montage when no video file is present (crossfade slideshow). */
export const WOMENS_JOURNEYS_HERO_FALLBACK = [
  {
    src: '/womens-journeys/group-safari.png',
    alt: 'Women travellers on a private safari in India’s wild landscapes',
  },
  {
    src: '/womens-journeys/rooftop-evening.png',
    alt: 'Evening with friends on a lit rooftop',
  },
  {
    src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=2400&q=88',
    alt: 'Confident traveller portrait',
  },
  {
    src: 'https://images.unsplash.com/photo-1563720223185-11003d51cae0?auto=format&fit=crop&w=2400&q=88',
    alt: 'Luxury vehicle arrival',
  },
  {
    src: 'https://images.unsplash.com/photo-1477587457328-30537e6cd050?auto=format&fit=crop&w=2400&q=88',
    alt: 'Jaipur palace architecture',
  },
  {
    src: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=2400&q=88',
    alt: 'Historic streets of Old Delhi',
  },
  {
    src: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=2400&q=88',
    alt: 'Iconic monument at sunrise',
  },
  {
    src: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?auto=format&fit=crop&w=2400&q=88',
    alt: 'Handwoven textiles and craftsmanship',
  },
  {
    src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2400&q=88',
    alt: 'Evening dining overlooking the city',
  },
] as const;

export const WOMENS_JOURNEYS_EDITORIAL_IMAGE = {
  src: '/womens-journeys/group-safari.png',
  alt: 'Women travellers on a private open-top journey through India’s dramatic terrain',
};

export type WomensJourneysUniqueCard = {
  title: string;
  body: string;
};

export const WOMENS_JOURNEYS_UNIQUE: WomensJourneysUniqueCard[] = [
  {
    title: '100% Women-Led Experience',
    body: 'Female tour leaders, coordinators, chauffeurs, rickshaw pilots, hosts, artisans, and wellness experts — orchestrated as one seamless circle of care.',
  },
  {
    title: 'Luxury with Complete Peace of Mind',
    body: 'Private transfers, considered pacing, and discreet support — so you can explore boldly while feeling utterly held.',
  },
  {
    title: 'Authentic Female Perspectives',
    body: 'Stories, rituals, and neighbourhoods revealed through women who live them — intimate, respectful, and deeply connected.',
  },
  {
    title: 'Supporting Women in Indian Tourism',
    body: 'Every journey expands skilled employment and leadership for women across transport, hospitality, craft, and guiding.',
  },
];

export type SignatureExperience = {
  title: string;
};

export const WOMENS_JOURNEYS_SIGNATURE: SignatureExperience[] = [
  { title: 'Female-led Old Delhi heritage walk' },
  { title: 'Women-driven chauffeured transfers' },
  { title: 'Female rickshaw exploration' },
  { title: 'Artisan workshops with local women' },
  { title: 'Private rooftop dinners' },
  { title: 'Wellness and yoga experiences' },
  { title: 'Palace cultural evenings' },
  { title: 'Boutique luxury shopping with female stylists' },
];

export type WomenLeader = {
  id: string;
  name: string;
  specialization: string;
  description: string;
  portrait: string;
};

export const WOMENS_JOURNEYS_LEADERS: WomenLeader[] = [
  {
    id: 'ashu',
    name: 'Ashu',
    specialization: 'Women’s Travel Specialist & Adventure Expert',
    description:
      'Passionate, confident, and deeply experienced, Ashu creates immersive women-only journeys blending cultural depth, adventure, comfort, and empowerment.',
    portrait: '/guides/ashu.png',
  },
];

export const WOMENS_JOURNEYS_STATS = [
  { label: 'Women Guides Supported', value: 48, suffix: '+' },
  { label: 'Female-Owned Experiences', value: 120, suffix: '+' },
  { label: 'Communities Impacted', value: 35, suffix: '+' },
] as const;

export const WOMENS_JOURNEYS_EMPOWER =
  'Every Women’s Journey directly supports female employment, leadership, and entrepreneurship across India’s tourism ecosystem.';

export const WOMENS_JOURNEYS_FINAL_BG = '/womens-journeys/rooftop-evening.png';
