import { getWhatsAppLink } from '@/lib/whatsapp';

export type PhotoStory = {
  id: string;
  /** Small label above the title; the modal falls back to "Why this moment matters". */
  kicker?: string;
  title: string;
  subtitle?: string;
  statusLabel: string;
  paragraphs: string[];
  whyItMatters: string;
  cta?: { label: string; href: string };
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
  'feel-witness': {
    id: 'feel-witness',
    kicker: 'Five ways to feel India',
    title: 'Witness',
    subtitle: 'A tiger on the forest road, and the silence around it',
    statusLabel: 'Ranthambore · Bandhavgarh · Kanha · Gir',
    paragraphs: [
      'Some moments cannot be arranged, only waited for. A tiger stepping onto a forest track at first light. The alarm call of a chital before anything appears. The long hush after it has gone.',
      'We travel with senior naturalists who read the forest rather than chase it — private vehicles, unhurried drives, and time to stay with a sighting until it ends on its own terms.',
      'Beyond the tiger: Asiatic lions in the dry forests of Gir, barasingha in Kanha’s meadows, and Himalayan birdlife at dawn in Pangot and Sattal.',
    ],
    whyItMatters:
      'Patient, low-impact safaris put money into protection and local livelihoods — and keep the forest calm enough for the next sighting, yours or someone else’s.',
    cta: {
      label: 'Plan this journey',
      href: getWhatsAppLink('Hi! I’d love to plan a wildlife journey — I want to witness India’s wild side.'),
    },
  },
  'feel-create': {
    id: 'feel-create',
    kicker: 'Five ways to feel India',
    title: 'Create',
    subtitle: 'Carved wood, pressed cloth, and a pattern repeated until it becomes a garden',
    statusLabel: 'Jaipur · Varanasi · Chettinad · Western Ghats',
    paragraphs: [
      'At a block-printing table, a carved wooden block is dipped, placed and pressed with the heel of the hand — again and again, until a length of plain cotton is covered in flowers.',
      'Our journeys make room for you to make something yourself: an afternoon at the printing table, a visit to Varanasi’s silk weavers, a Chettinad craft workshop, or a camera and a mentor in the Western Ghats.',
      'You leave with something made by your own hands — and a far deeper respect for the skill in everything you didn’t make.',
    ],
    whyItMatters:
      'Paying artisans for their time and teaching keeps living crafts viable for the next generation — far more than a souvenir ever could.',
    cta: {
      label: 'Plan this journey',
      href: getWhatsAppLink('Hi! I’d love to plan a journey with time to create — craft workshops, cooking or photography.'),
    },
  },
  'feel-listen': {
    id: 'feel-listen',
    kicker: 'Five ways to feel India',
    title: 'Listen',
    subtitle: 'Temple bells, river prayers, and the stories your guide grew up with',
    statusLabel: 'Rishikesh · Varanasi · Amritsar · Ladakh',
    paragraphs: [
      'India is loud, and then suddenly it isn’t. A row of temple bells set swinging above the river. Evening aarti on the ghats — conch, chant and a thousand small flames. Kirtan drifting across the water at the Golden Temple in the early morning.',
      'In Ladakh it is the other way round: prayer flags in the wind, monks chanting in the half-dark of a gompa, and a silence so complete you can hear your own breath.',
      'Our guides are storytellers first. Ask them what the bells are for.',
    ],
    whyItMatters:
      'Listening is the most respectful way to travel. Arriving quietly, following local custom and choosing local guides keeps sacred places sacred — not backdrops.',
    cta: {
      label: 'Plan this journey',
      href: getWhatsAppLink('Hi! I’d love to plan a journey to listen — India’s sacred sounds, rituals and stories.'),
    },
  },
  'feel-savour': {
    id: 'feel-savour',
    kicker: 'Five ways to feel India',
    title: 'Savour',
    subtitle: 'Cardamom, pepper, slow-cooked spice and a long table',
    statusLabel: 'Chettinad · Kerala · Amritsar · Rajasthan',
    paragraphs: [
      'Pepper from India’s southwest coast was once called black gold, and spice still sets the rhythm of an Indian day: chai at dawn, a thali at noon, something slow-cooked as the light goes.',
      'We plan the meals as carefully as the stays — a Chettinad feast in a heritage mansion, lunch in a family kitchen, langar at the Golden Temple, and tea and spice gardens in the hills around Munnar.',
      'Every dish tells you where you are. You only have to slow down enough to taste it.',
    ],
    whyItMatters:
      'Eating local — family kitchens, heritage recipes and seasonal produce — keeps money in the community and food traditions alive.',
    cta: {
      label: 'Plan this journey',
      href: getWhatsAppLink('Hi! I’d love to plan a journey built around food — I want to savour India.'),
    },
  },
  'feel-breathe': {
    id: 'feel-breathe',
    kicker: 'Five ways to feel India',
    title: 'Breathe',
    subtitle: 'Thin air, wide skies, and nowhere you need to be',
    statusLabel: 'Ladakh · Munnar · Kerala backwaters · Rishikesh',
    paragraphs: [
      'Above 3,500 metres, even your thoughts slow down. In Ladakh, cloud shadows cross whole mountainsides, and Pangong Lake shifts from blue to green in a single afternoon.',
      'Further south, the pace is set by water: mist lifting off Munnar’s tea gardens, a houseboat drifting through the Alleppey backwaters, morning yoga beside the Ganga in Rishikesh.',
      'We build in unscheduled time on purpose — acclimatisation days, empty afternoons, early nights. Here, luxury is space.',
    ],
    whyItMatters:
      'Slow itineraries mean fewer transfers, a lighter footprint, and more of your spend staying with the homestays, guides and villages along the way.',
    cta: {
      label: 'Plan this journey',
      href: getWhatsAppLink('Hi! I’d love to plan a slow journey — mountains, backwaters and space to breathe.'),
    },
  },
};

export function getHomePhotoStory(id: string): PhotoStory | undefined {
  return HOME_PHOTO_STORIES[id];
}
