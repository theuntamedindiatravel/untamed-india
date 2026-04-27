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
      'A camel fair is not just colour and music — it’s a living marketplace of skill: breeding knowledge, veterinary lore, saddle-making, and routes memorised by stars. When those traditions fade, an entire desert intelligence fades with them.',
      'The wild ancestor, the wild Bactrian camel, survives in tiny fragments of Central Asia and is among the rarest large mammals on Earth. Protecting desert habitat and honouring pastoral traditions keeps both cultural memory and biodiversity from vanishing.',
    ],
    whyItMatters:
      'When travellers choose slow, low-impact journeys that support local herders and conservation, they help keep desert landscapes — and the species and skills that define them — from being forgotten.',
  },
  'panel-udaipur': {
    id: 'panel-udaipur',
    title: 'Where lakes meet the Aravallis',
    subtitle: 'Freshwater strongholds for birds and people',
    statusLabel: 'Wetland ecosystems · high regional endemism',
    paragraphs: [
      'Udaipur’s lakes are not only mirrors for palaces — they are arteries for migratory birds, fish, and countless small creatures that stitch the food web together. Seasonal water levels shape an ever-changing stage of life along the shore.',
      'At dawn, you can feel the lake wake up: oars lifting without splash, temple bells travelling across water, and birds stitching the edges with sound. This is heritage too — a daily ritual of coexistence.',
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
      'To watch an elephant family move is to watch a map come alive: matriarchs remembering old water, calves learning the rhythm of shade and distance, and entire forests responding in their wake.',
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
      'A rhino is not just a symbol — it’s a gardener. By grazing and wallowing, it keeps grasslands open; those grasslands shelter deer, birds, and predators in turn. Lose the rhino, and the entire choreography of the floodplain changes.',
      'In parks like Kaziranga, the best sightings are often the quietest: a prehistoric silhouette in mist, an exhale in the reeds, a reminder that protection can bring a species back from the brink.',
    ],
    whyItMatters:
      'Visiting well-managed parks and ethical partners puts revenue into protection — turning awe at a prehistoric silhouette into real funding for rangers and habitat.',
  },
  'editorial-ladakh': {
    id: 'editorial-ladakh',
    title: 'A monastery above the valley',
    subtitle: 'Ladakh — where the Himalayas hold silence and prayer',
    statusLabel: 'Living heritage · high-altitude fragility',
    paragraphs: [
      'In Ladakh, monasteries rise like lanterns on the ridgelines — not as monuments, but as working homes for learning, music, art, and daily devotion. Prayer flags fray into the wind; butter lamps glow; chants move through rooms darkened by centuries of smoke and winter.',
      'Outside the walls, life is calibrated to altitude: barley fields drink glacial melt, apricot orchards cling to the warmest slopes, and villages measure time by sun and shadow. It’s a landscape that feels immense — yet it can be undone quickly by careless footfall and unmanaged growth.',
      'The most beautiful visits are the respectful ones: arriving quietly, listening more than photographing, and choosing hosts who keep the valley’s pace intact — slow, dignified, and deeply local.',
    ],
    whyItMatters:
      'Slow, small-group travel with local guides supports monasteries, homestays, and artisans — keeping a fragile high-altitude culture resilient without turning sacred places into crowded backdrops.',
  },
  'strip-taj': {
    id: 'strip-taj',
    title: 'The Taj Mahal — love set in marble',
    subtitle: 'Agra — a masterpiece of symmetry, craft, and devotion',
    statusLabel: 'World heritage · craftsmanship that still breathes',
    paragraphs: [
      'The Taj Mahal was built as a promise — an emperor’s devotion turned into geometry, gardens, and light. From a distance it feels weightless, but step closer and you see the human hand everywhere: inlaid flowers in semi-precious stone, calligraphy that grows with perspective, and marble that shifts from pearl to rose as the day moves on.',
      'Its story is not only romance, but labour and mastery. Thousands of artisans shaped stone, water channels, domes, and arches with an attention so exact it still feels modern. The Taj endures because it was designed for time — for seasons, shadows, and the slow unfolding of awe.',
      'To experience it well is to arrive early, stay quiet, and let the details speak: the coolness underfoot, the mirrored reflection, and the way a single building can hold an entire empire’s imagination.',
    ],
    whyItMatters:
      'Honouring heritage means supporting preservation — choosing guides and partners who respect the site, reducing strain on the city, and helping keep this craft tradition alive beyond a single photograph.',
  },
  'strip-cheetah': {
    id: 'strip-cheetah',
    title: 'Cheetah — speed, silence, and a second chance',
    subtitle: 'Acinonyx jubatus — reintroduction to Indian grasslands',
    statusLabel: 'IUCN Red List: Vulnerable globally · extinct in India until reintroduction',
    paragraphs: [
      'India’s cheetahs vanished in the twentieth century; today a carefully monitored reintroduction aims to restore not just a cat but an entire grassland imagination — prey, fire regimes, and open savannahs.',
      'Cheetahs are among the most fragile big cats: they need vast, open terrain, strong prey bases, and low conflict with livestock. Their return is as much about restoring habitat as releasing animals.',
      'If the experiment succeeds, it will be one of the rare moments in modern conservation where a lost predator returns — and with it, a renewed reason to value grasslands as ecosystems, not empty space.',
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
      'The best snow leopard tourism doesn’t chase — it waits. It invests in local spotters and patient observation, so the mountains remain calm enough for a ghost to cross a ridge without vanishing from the region entirely.',
    ],
    whyItMatters:
      'When clients choose operators who pay fair wages and cap numbers, they protect the very silence that lets a snow leopard cross a ridge without vanishing forever.',
  },
};

export function getHomePhotoStory(id: string): PhotoStory | undefined {
  return HOME_PHOTO_STORIES[id];
}
