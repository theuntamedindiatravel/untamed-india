export type PhotoStory = {
  id: string;
  title: string;
  subtitle?: string;
  statusLabel: string;
  paragraphs: string[];
  whyItMatters: string;
};

export const HOME_PHOTO_STORIES: Record<string, PhotoStory> = {
  'panel-camel': {
    id: 'panel-camel',
    title: 'The camel at the edge of the desert',
    subtitle: 'Camelus dromedarius — Rajasthan’s ship of the desert',
    statusLabel: 'Domesticated heritage · wild relatives critically endangered',
    paragraphs: [
      'For centuries, camels have carried trade, water, and hope across Rajasthan’s dunes. Today their numbers have fallen sharply as mechanisation replaces caravans — yet they remain a living symbol of Thar culture and arid-land knowledge.',
      'The wild ancestor, the wild Bactrian camel, survives in tiny fragments of Central Asia and is among the rarest large mammals on Earth. Protecting desert habitat and honouring pastoral traditions keeps both cultural memory and biodiversity from vanishing.',
    ],
    whyItMatters:
      'When travellers choose slow, low-impact journeys that support local herders and conservation, they help keep desert landscapes — and the species that define them — from being forgotten.',
  },
  'panel-udaipur': {
    id: 'panel-udaipur',
    title: 'Where lakes meet the Aravallis',
    subtitle: 'Freshwater strongholds for birds and people',
    statusLabel: 'Wetland ecosystems · high regional endemism',
    paragraphs: [
      'Udaipur’s lakes are not only mirrors for palaces — they are arteries for migratory birds, fish, and countless small creatures that stitch the food web together. Seasonal water levels shape an ever-changing stage of life along the shore.',
      'Many wetland-dependent species are now uncommon as pollution, siltation, and water demand rise. Protecting clean inflow into lakes is one of the quietest — and most powerful — conservation acts a region can take.',
    ],
    whyItMatters:
      'Luxury here is inseparable from healthy water: when lakes thrive, communities thrive, and the birds and fish that depend on them have room to return.',
  },
  'panel-elephant': {
    id: 'panel-elephant',
    title: 'Asian elephant',
    subtitle: 'Elephas maximus — India’s gentle landscape architects',
    statusLabel: 'IUCN Red List: Endangered',
    paragraphs: [
      'Across forest corridors, elephants shape entire ecosystems — opening glades, dispersing seeds, and creating water holes other animals rely on. They are “umbrella species”: protecting their range protects hundreds of other life forms.',
      'Habitat fragmentation, conflict with farms, and linear infrastructure have squeezed populations into smaller islands. India holds the largest wild numbers left on Earth — making every corridor and every protected patch globally significant.',
    ],
    whyItMatters:
      'Choosing travel that respects buffer zones, supports anti-poaching efforts, and funds community coexistence turns a safari into a vote for one of the planet’s rarest megafauna legacies.',
  },
  'editorial-rhino': {
    id: 'editorial-rhino',
    title: 'Greater one-horned rhinoceros',
    subtitle: 'Rhinoceros unicornis — grassland royalty',
    statusLabel: 'IUCN Red List: Vulnerable · population rebounding with protection',
    paragraphs: [
      'Once reduced to a few hundred animals, the Indian rhino is a rare conservation success — but only where armed protection, habitat, and community buy-in hold the line against poaching and encroachment.',
      'Rhinos maintain open grasslands by grazing and wallowing; those grasslands shelter deer, birds, and predators in turn. Lose the rhino, and the entire choreography of the floodplain changes.',
    ],
    whyItMatters:
      'Visiting well-managed parks and ethical partners puts revenue into protection — turning awe at a prehistoric silhouette into real funding for rangers and habitat.',
  },
  'editorial-ladakh': {
    id: 'editorial-ladakh',
    title: 'Snow leopard — ghost of the cold desert',
    subtitle: 'Panthera uncia — flagship of high Asia',
    statusLabel: 'IUCN Red List: Vulnerable · fewer than 8,000 mature individuals globally',
    paragraphs: [
      'Monasteries crown ridges where snow leopards drift unseen across scree and snow. In Ladakh, faith and field science increasingly work together — compensating herders, training spotters, and keeping tourism from trampling fragile denning grounds.',
      'Snow leopards regulate mountain herbivores; their presence signals an intact alpine food web. Climate change and infrastructure are squeezing these narrow elevational bands faster than many species can adapt.',
    ],
    whyItMatters:
      'Slow, small-group travel with local guides spreads income without crowding cats out — helping people see value in a predator that is far rarer than any monument.',
  },
  'strip-taj': {
    id: 'strip-taj',
    title: 'Sarus crane — tallest flying bird on the floodplain',
    subtitle: 'Antigone antigone — icon of Uttar Pradesh’s wetlands',
    statusLabel: 'IUCN Red List: Vulnerable',
    paragraphs: [
      'The Taj draws the eye upward — but the Yamuna floodplain still holds pairs of sarus cranes, dancing in rain, binding lifelong bonds on agricultural margins. They need shallow wetlands and safe nesting fields, both under pressure from growth.',
      'Where cranes persist, water is clean enough for people too. They are sentinels of the same living landscape that Mughal gardens were designed to frame.',
    ],
    whyItMatters:
      'Honouring heritage and habitat together means trips that give back to water conservation — so the next generation still sees red heads above the mist.',
  },
  'strip-cheetah': {
    id: 'strip-cheetah',
    title: 'Cheetah — speed, silence, and a second chance',
    subtitle: 'Acinonyx jubatus — reintroduction to Indian grasslands',
    statusLabel: 'IUCN Red List: Vulnerable globally · extinct in India until reintroduction',
    paragraphs: [
      'India’s cheetahs vanished in the twentieth century; today a carefully monitored reintroduction aims to restore not just a cat but an entire grassland imagination — prey, fire regimes, and open savannahs.',
      'Cheetahs are among the most fragile big cats: they need vast, open terrain and low conflict with livestock. Their return is as much about restoring habitat as releasing animals.',
    ],
    whyItMatters:
      'Supporting responsible visitation and science-led programmes helps prove that grasslands deserve the same reverence as forests — and that speed can return only where space is protected.',
  },
  'strip-snow': {
    id: 'strip-snow',
    title: 'Snow leopard — rarity in every frame',
    subtitle: 'Panthera uncia — fewer spots, smaller range',
    statusLabel: 'IUCN Red List: Vulnerable',
    paragraphs: [
      'Every confirmed snow leopard sighting is a statistical event. Solitary, crepuscular, and perfectly camouflaged, they persist only where prey remains abundant and valleys stay quiet.',
      'Retaliatory killing after livestock loss once drove declines; insurance schemes, predator-proof corrals, and homestay economies are rewriting that story in pockets of the Himalayas.',
    ],
    whyItMatters:
      'When clients choose operators who pay fair wages and cap numbers, they protect the very silence that lets a snow leopard cross a ridge without vanishing forever.',
  },
};

export function getHomePhotoStory(id: string): PhotoStory | undefined {
  return HOME_PHOTO_STORIES[id];
}
