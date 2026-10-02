// Wildlife Photography Journeys, shown at the bottom of /destinations/photography.
// Copy is the client's programme document. Photos are Unsplash (free licence) or existing site images.

import type { Exposure, FocusPoint } from '@/components/Viewfinder';

export type FocusGroup = { place?: string; species: string[] };

export type PhotoJourney = {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  route: string;
  image: string;
  alt: string;
  intro: string[];
  encounters?: { place: string; species: string }[];
  focus: FocusGroup[];
  highlights: string[];
  stay?: string;
  season: string;
  idealFor?: string;
  note?: string;
  /** Viewfinder overlay: where the subject sits in the frame, and the exposure shown in the readout. */
  focusPoint?: FocusPoint;
  exposure: Exposure;
};

export type ShortExperience = { id: string; title: string; duration: string; route: string; intro?: string; focus: string[] };

const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1200&q=80`;

export const PHOTO_INTRO = {
  title: 'Wildlife Photography Journeys',
  subtitle: 'Photograph India’s Wild Heart',
  paragraphs: [
    "India is one of the world's most extraordinary wildlife destinations — from Bengal tigers moving through ancient forests to Asiatic lions roaming the dry landscapes of Gujarat, snow leopards in the high Himalayas and one-horned rhinoceros in the grasslands of Assam.",
    'Our Wildlife Photography Journeys are designed around one simple idea: give photographers the time, space and local knowledge to create exceptional images while experiencing India in depth.',
    "Our journeys combine carefully selected wildlife destinations, experienced naturalists and trackers, private or small-group safari arrangements, comfortable transfers and some of India's finest wilderness lodges.",
    'They are suitable for both experienced wildlife photographers and passionate travellers who simply want to learn.',
  ],
};

export const PHOTO_JOURNEYS: PhotoJourney[] = [
  {
    id: 'tigers-of-ranthambore',
    focusPoint: { x: 35, y: 32 },
    exposure: { aperture: 'f/5.6', shutter: '1/1000s', iso: 640, lens: '400mm' },
    title: 'Tigers of Ranthambore',
    subtitle: 'A 6-Day Tiger Photography Safari',
    duration: '6 Days / 5 Nights',
    route: 'Jaipur → Ranthambore → Jaipur',
    image: unsplash('1615824996195-f780bba7cfab'),
    alt: 'A Bengal tiger standing on a fallen log',
    intro: [
      "Ranthambore is one of India's most iconic tiger destinations, where Bengal tigers move through a dramatic landscape of dry forests, lakes, rocky hills and historic ruins.",
      'This journey is designed around time in the field rather than rushing between destinations.',
    ],
    focus: [{ species: ['Bengal Tiger', 'Sloth Bear', 'Leopard', 'Sambar Deer', 'Chital', 'Nilgai', 'Marsh Crocodile', 'Indian birds and raptors'] }],
    highlights: [
      '10 private 4×4 safari drives',
      'Small-group photography experience',
      'Experienced naturalists and safari drivers',
      'Carefully selected safari zones',
      'Dedicated time for tiger tracking',
      'Luxury wilderness accommodation',
      'Photography-friendly vehicle arrangements',
      'Sunrise and golden-hour photography opportunities',
    ],
    stay: 'The Oberoi Vanyavilas / Aman-i-Khas / Sujan Sher Bagh',
    season: 'October – June',
    idealFor: 'Wildlife photographers, first-time safari photographers, couples and private groups.',
  },
  {
    id: 'tigers-of-bandhavgarh',
    focusPoint: { x: 70, y: 70 },
    exposure: { aperture: 'f/4', shutter: '1/800s', iso: 1250, lens: '500mm' },
    title: 'Tigers of Bandhavgarh',
    subtitle: 'Into the Land of the Bengal Tiger',
    duration: '6 Days / 5 Nights',
    route: 'Jabalpur → Bandhavgarh → Jabalpur',
    image: unsplash('1680130071424-a70a4b7133fb'),
    alt: 'A Bengal tiger walking through dappled forest light',
    intro: [
      "Bandhavgarh is one of India's classic tiger landscapes and a destination where the focus can be placed almost entirely on the Bengal tiger.",
      'The journey allows photographers to spend several consecutive days in the forest, learning individual tiger territories, behaviour and movement patterns.',
    ],
    focus: [{ species: ['Bengal Tiger', 'Leopard', 'Sloth Bear', 'Gaur', 'Chital', 'Sambar', 'Dhole (Indian Wild Dog)', 'Birds of Central India'] }],
    highlights: [
      '10 safari drives',
      'Dedicated tiger photography',
      'Experienced local naturalists',
      'Private/small-group arrangements',
      'Photography-friendly safari vehicles',
      'Luxury jungle lodge',
      'Time for behavioural photography',
    ],
    stay: 'Singinawa Jungle Lodge / Bandhavgarh Jungle Lodge or selected luxury lodge',
    season: 'October – June',
  },
  {
    id: 'tigers-and-barasingha-of-kanha',
    focusPoint: { x: 57, y: 63 },
    exposure: { aperture: 'f/4', shutter: '1/500s', iso: 1600, lens: '600mm' },
    title: 'Tigers & Barasingha of Kanha',
    subtitle: 'The Forest of Kipling',
    duration: '6 Days / 5 Nights',
    route: 'Jabalpur → Kanha → Jabalpur',
    image: unsplash('1698382439843-ca033a6079c0'),
    alt: 'A tiger in morning mist in a sal forest',
    intro: [
      'Kanha combines beautiful sal forests, open meadows and extraordinary wildlife diversity.',
      "Alongside the Bengal tiger, the park is particularly interesting for photographers interested in the hard-ground barasingha, one of Central India's great conservation stories.",
    ],
    focus: [{ species: ['Bengal Tiger', 'Barasingha', 'Dhole', 'Leopard', 'Gaur', 'Sambar', 'Chital', 'Sloth Bear', 'Raptors and forest birds'] }],
    highlights: [
      '10 safari drives',
      'Tiger and barasingha photography',
      'Diverse Central Indian wildlife',
      'Expert naturalists',
      'Luxury wilderness accommodation',
      'Opportunities for landscape and environmental wildlife photography',
    ],
    stay: 'Singinawa Jungle Lodge',
    season: 'October – June',
  },
  {
    id: 'pench-into-the-jungle-book',
    focusPoint: { x: 55, y: 37 },
    exposure: { aperture: 'f/5.6', shutter: '1/1250s', iso: 800, lens: '400mm' },
    title: 'Pench — Into the Jungle Book',
    subtitle: 'Tigers, Wild Dogs & the Forest of Mowgli',
    duration: '6 Days / 5 Nights',
    route: 'Nagpur → Pench → Nagpur',
    image: unsplash('1730014392621-10de7b9bc20f'),
    alt: 'A tiger emerging from tall green grass',
    intro: [
      "Pench is one of India's most atmospheric wildlife destinations and the landscape that inspired Rudyard Kipling's The Jungle Book.",
      'This journey is particularly suited to photographers who want more than tiger portraits — with opportunities for wildlife behaviour, landscapes and a broad range of Central Indian species.',
    ],
    focus: [{ species: ['Bengal Tiger', 'Dhole / Indian Wild Dog', 'Leopard', 'Sloth Bear', 'Gaur', 'Sambar', 'Chital', 'Wild Boar', 'Jungle birds'] }],
    highlights: ['10 safari drives', 'Tiger tracking', 'Dhole photography opportunities', 'Wildlife behaviour', 'Forest landscapes', 'Expert naturalists', 'Luxury jungle lodge'],
    stay: 'Baghvan Wildlife Lodge',
    season: 'October – June',
  },
  {
    id: 'tadoba-land-of-the-tiger',
    focusPoint: { x: 33, y: 42 },
    exposure: { aperture: 'f/6.3', shutter: '1/1600s', iso: 500, lens: '500mm' },
    title: 'Tadoba — Land of the Tiger',
    subtitle: 'Tigers, Leopards & Sloth Bears',
    duration: '6 Days / 5 Nights',
    route: 'Nagpur → Tadoba → Nagpur',
    image: unsplash('1665129967399-f28a228d064e'),
    alt: 'A tiger crossing a forest track ahead of safari vehicles',
    intro: [
      "Tadoba has become one of India's most exciting destinations for serious tiger photographers.",
      'The dry forest and open landscapes can create excellent conditions for observing wildlife and photographing animal behaviour.',
    ],
    focus: [{ species: ['Bengal Tiger', 'Leopard', 'Sloth Bear', 'Dhole', 'Gaur', 'Sambar', 'Chital', 'Marsh Crocodile', 'Birds'] }],
    highlights: [
      '10 safari drives',
      'Dedicated tiger photography',
      'Experienced trackers and guides',
      'Small-group/private arrangements',
      'Photography-focused safari planning',
      'Luxury accommodation',
    ],
    season: 'October – June',
  },
  {
    id: 'leopards-of-jawai',
    focusPoint: { x: 41, y: 28 },
    exposure: { aperture: 'f/5.6', shutter: '1/2000s', iso: 400, lens: '600mm' },
    title: 'Leopards of Jawai',
    subtitle: 'The Secret Leopard Country of Rajasthan',
    duration: '5 Days / 4 Nights',
    route: 'Udaipur → Jawai → Udaipur',
    image: unsplash('1534759846116-5799c33ce22a'),
    alt: 'A leopard watching from the top of a granite rock',
    intro: [
      "Jawai is completely different from India's tiger forests.",
      'Here, leopards inhabit a spectacular landscape of granite hills, caves, dry grasslands and pastoral villages.',
      'The result is a unique photography experience where wildlife and traditional rural life exist side by side.',
    ],
    focus: [{ species: ['Indian Leopard', 'Mugger Crocodile', 'Flamingos and waterbirds', 'Nilgai', 'Chinkara', 'Hyena', 'Jackal', 'Rural landscapes'] }],
    highlights: [
      '6–8 leopard drives',
      'Rocky landscape photography',
      'Leopard behaviour',
      'Dawn and sunset photography',
      'Village and pastoral landscapes',
      'Private/local safari vehicles',
      'Luxury wilderness accommodation',
    ],
    stay: 'Sujan Jawai',
    season: 'October – April',
  },
  {
    id: 'asiatic-lions-of-gir',
    focusPoint: { x: 50, y: 38 },
    exposure: { aperture: 'f/4', shutter: '1/1000s', iso: 800, lens: '400mm' },
    title: 'Asiatic Lions of Gir',
    subtitle: "Photograph India's Last Wild Lions",
    duration: '6 Days / 5 Nights',
    route: 'Ahmedabad → Gir → Ahmedabad',
    image: unsplash('1624951714070-74a95c1f6959'),
    alt: 'A close portrait of a lion',
    intro: [
      'Gir is unlike any other wildlife destination in India.',
      "It is the last natural stronghold of the Asiatic lion, making a photography journey here an opportunity to document one of the world's most distinctive big-cat populations.",
    ],
    focus: [{ species: ['Asiatic Lion', 'Indian Leopard', 'Chital', 'Sambar', 'Nilgai', 'Chinkara', 'Golden Jackal', 'Crocodiles', 'Raptors'] }],
    highlights: [
      'Multiple jeep safaris',
      'Dedicated lion photography',
      'Expert naturalists',
      'Wildlife and landscape photography',
      'Luxury jungle accommodation',
      'Opportunity to photograph Asiatic lion behaviour',
    ],
    season: 'October – June',
  },
  {
    id: 'rhinos-of-kaziranga',
    focusPoint: { x: 22, y: 40 },
    exposure: { aperture: 'f/8', shutter: '1/800s', iso: 400, lens: '200mm' },
    title: 'Rhinos of Kaziranga',
    subtitle: 'One-Horned Rhinos & the Wild Grasslands of Assam',
    duration: '6 Days / 5 Nights',
    route: 'Guwahati → Kaziranga → Guwahati',
    image: unsplash('1706187586614-31f2a58624bb'),
    alt: 'A one-horned rhinoceros in tall grass',
    intro: [
      "Kaziranga offers one of India's most spectacular wildlife photography experiences.",
      'The vast floodplain grasslands are home to the iconic one-horned rhinoceros alongside wild elephants, swamp deer, buffalo and an extraordinary diversity of birds.',
    ],
    focus: [{ species: ['Greater One-Horned Rhinoceros', 'Asian Elephant', 'Wild Water Buffalo', 'Swamp Deer', 'Hog Deer', 'Leopard', 'Sloth Bear', 'Tigers', 'Wetland and grassland birds'] }],
    highlights: [
      'Multiple jeep safaris',
      'Grassland wildlife photography',
      'Rhino portraits and behaviour',
      'Bird photography',
      'River and wetland landscapes',
      'Luxury wilderness accommodation',
    ],
    stay: 'Luxury lodge selected according to safari zone',
    season: 'November – April',
  },
  {
    id: 'snow-leopards-of-ladakh',
    focusPoint: { x: 52, y: 57 },
    exposure: { aperture: 'f/6.3', shutter: '1/2000s', iso: 320, lens: '800mm' },
    title: 'Snow Leopards of Ladakh',
    subtitle: 'Chasing the Ghost of the Mountains',
    duration: '11 Days / 10 Nights',
    route: 'Delhi → Leh → Hemis Region → Leh → Delhi',
    image: unsplash('1751267681489-4a2e271813e7'),
    alt: 'A snow leopard crossing snowy rock',
    intro: [
      "Far above the forests of India, in the stark mountains of Ladakh, lives one of the world's most elusive cats.",
      'The snow leopard journey is an expedition rather than a conventional safari.',
      'We work with experienced local trackers who understand the winter movements of wildlife and spend extended periods in the field searching the mountain slopes.',
    ],
    focus: [{ species: ['Snow Leopard', 'Himalayan Wolf', 'Red Fox', 'Tibetan Fox', "Pallas's Cat", 'Blue Sheep / Bharal', 'Himalayan birds'] }],
    highlights: [
      'Experienced local trackers',
      'Extended wildlife observation',
      'Winter Himalayan landscapes',
      'Snow leopard photography',
      "Pallas's cat opportunities",
      'High-altitude wildlife',
      'Local cultural experiences',
    ],
    season: 'January – March',
    note: 'This is a physically demanding high-altitude expedition and requires appropriate preparation.',
  },
  {
    id: 'snow-leopards-of-spiti',
    focusPoint: { x: 49, y: 70 },
    exposure: { aperture: 'f/11', shutter: '1/500s', iso: 100, lens: '24mm' },
    title: 'Snow Leopards of Spiti',
    subtitle: 'Into the High Himalayas',
    duration: '12 Days / 11 Nights',
    route: 'Chandigarh → Spiti Valley → Kibber → Chandigarh',
    image: unsplash('1746093846930-ab89242b9fb9'),
    alt: 'Key Monastery below snow-covered peaks in Spiti',
    intro: [
      'For photographers looking for a more expeditionary Himalayan experience, Spiti offers dramatic snow-covered landscapes and opportunities to search for the elusive snow leopard.',
      'The journey combines wildlife tracking with the extraordinary landscapes and villages of the Trans-Himalaya.',
    ],
    focus: [{ species: ['Snow Leopard', 'Himalayan Ibex', 'Blue Sheep', 'Red Fox', 'Himalayan Wolf', 'Golden Eagle', 'Lammergeier'] }],
    highlights: [
      'Experienced local trackers',
      'Extended time around Kibber',
      'Winter wildlife photography',
      'Mountain landscapes',
      'Local village experiences',
      'Small-group expedition',
    ],
    season: 'December – March',
  },
  {
    id: 'tigers-and-leopards-of-rajasthan',
    focusPoint: { x: 42, y: 40 },
    exposure: { aperture: 'f/5.6', shutter: '1/1600s', iso: 500, lens: '600mm' },
    title: 'Tigers & Leopards of Rajasthan',
    subtitle: 'From Ranthambore to Jawai',
    duration: '10 Days / 9 Nights',
    route: 'Jaipur → Ranthambore → Jawai → Udaipur',
    image: unsplash('1606795615071-f46ab60797da'),
    alt: 'A leopard resting on a rock among dry grass',
    intro: [
      "Two of India's most charismatic big cats. Two completely different landscapes.",
      "Begin among the ancient ruins and dry forests of Ranthambore in search of Bengal tigers before travelling west to the granite hills of Jawai to photograph India's elusive leopard.",
    ],
    focus: [
      { place: 'Ranthambore', species: ['Bengal Tiger', 'Leopard', 'Sloth Bear', 'Sambar'] },
      { place: 'Jawai', species: ['Indian Leopard', 'Hyena', 'Crocodile', 'Chinkara', 'Rural wildlife'] },
    ],
    highlights: [
      '10+ wildlife drives',
      'Tiger photography',
      'Leopard photography',
      'Two dramatically different habitats',
      'Luxury wildlife lodges',
      'Udaipur finale',
      'Private transfers',
    ],
    stay: 'Sujan Sher Bagh + Sujan Jawai',
    season: 'October – April',
  },
  {
    id: 'tiger-and-asiatic-lion-expedition',
    focusPoint: { x: 61, y: 46 },
    exposure: { aperture: 'f/4.5', shutter: '1/1000s', iso: 1000, lens: '500mm' },
    title: 'Tiger & Asiatic Lion Expedition',
    subtitle: "India's Two Great Cats",
    duration: '12 Days / 11 Nights',
    route: 'Jabalpur → Bandhavgarh → Gir → Ahmedabad',
    image: unsplash('1690792422227-95d9afa03027'),
    alt: 'A Bengal tiger walking towards the camera',
    intro: [
      'One journey. Two extraordinary big cats.',
      'Begin in Central India searching for the Bengal tiger before travelling west to Gujarat for the Asiatic lion.',
    ],
    focus: [{ species: ['Bengal Tiger', 'Asiatic Lion', 'Leopard', 'Sloth Bear', 'Gaur', 'Sambar', 'Chital', 'Nilgai', 'Indian birds'] }],
    highlights: [
      '18–20 wildlife drives',
      'Two iconic big-cat species',
      'Central Indian forest + Gujarat dry forest',
      'Expert naturalists',
      'Luxury wildlife lodges',
      'Photography-focused safari planning',
    ],
    season: 'November – April',
  },
  {
    id: 'great-indian-wildlife-photography-expedition',
    focusPoint: { x: 54, y: 48 },
    exposure: { aperture: 'f/5.6', shutter: '1/1250s', iso: 640, lens: '600mm' },
    title: 'The Great Indian Wildlife Photography Expedition',
    subtitle: 'Tigers, Leopards, Lions & Rhinos',
    duration: '18 Days / 17 Nights',
    route: 'Ranthambore → Jawai → Gir → Kaziranga',
    image: unsplash('1591824438708-ce405f36ba3d'),
    alt: 'A Bengal tiger walking across open ground',
    intro: [
      'Our flagship wildlife photography journey.',
      "This expedition brings together four dramatically different Indian ecosystems and some of the country's most iconic mammals.",
    ],
    encounters: [
      { place: 'Ranthambore', species: 'Bengal Tiger' },
      { place: 'Jawai', species: 'Indian Leopard' },
      { place: 'Gir', species: 'Asiatic Lion' },
      { place: 'Kaziranga', species: 'One-Horned Rhinoceros' },
    ],
    focus: [
      {
        species: [
          'Bengal Tiger',
          'Indian Leopard',
          'Asiatic Lion',
          'Greater One-Horned Rhinoceros',
          'Asian Elephant',
          'Wild Water Buffalo',
          'Sloth Bear',
          'Sambar',
          'Chital',
          'Nilgai',
          'Crocodiles',
          'Hundreds of bird species',
        ],
      },
    ],
    highlights: [
      'Multiple safari drives at every destination',
      'Four completely different wildlife habitats',
      'Luxury wilderness lodges',
      'Expert naturalists and local trackers',
      'Photography-focused vehicle arrangements',
      'Private road transfers',
      'Selected internal flights',
      'Wildlife behaviour and landscape photography',
      'Optional cultural experiences',
    ],
    season: 'November – April',
  },
];

export const SHORT_EXPERIENCES: ShortExperience[] = [
  {
    id: 'jhalana-leopard',
    title: 'Jhalana Leopard Photography',
    duration: '3 Days / 2 Nights',
    route: 'Jaipur → Jhalana → Jaipur',
    intro: 'A short wildlife photography experience that can be added before or after a Rajasthan journey. Jhalana is particularly useful as an add-on because of its proximity to Jaipur.',
    focus: ['Indian Leopard', 'Hyena', 'Jackal', 'Nilgai', 'Birds'],
  },
  {
    id: 'velavadar-blackbuck',
    title: 'Velavadar Blackbuck Photography',
    duration: '4 Days / 3 Nights',
    route: 'Ahmedabad → Velavadar → Ahmedabad',
    intro: 'Designed around open-landscape photography, action shots and wildlife behaviour.',
    focus: ['Blackbuck', 'Indian Wolf', 'Striped Hyena', 'Nilgai', 'Raptors', 'Grassland birds'],
  },
  {
    id: 'little-rann-of-kutch',
    title: 'Little Rann of Kutch Wildlife Photography',
    duration: '4 Days / 3 Nights',
    route: 'Ahmedabad → Little Rann of Kutch → Ahmedabad',
    intro: "A specialist add-on for photographers interested in India's desert and salt-flat ecosystems.",
    focus: ['Indian Wild Ass', 'Flamingos', 'Desert Fox', 'Golden Jackal', 'Nilgai', 'Raptors', 'Migratory birds'],
  },
];

export const CUSTOM_EXPEDITIONS = {
  title: 'Private Custom Wildlife Photography Expeditions',
  tagline: 'Your India. Your Species. Your Journey.',
  intro: 'For photographers with a specific target species, we can create completely private wildlife photography expeditions.',
  combinations: [
    'Tiger + Snow Leopard',
    'Tiger + Asiatic Lion',
    'Tiger + Rhino',
    'Tiger + Leopard',
    'Leopard + Asiatic Lion',
    'Snow Leopard + Himalayan Wildlife',
    'Central India Tiger Circuit',
    'Rajasthan Big Cats',
    'Complete India Big Cats Expedition',
  ],
  adjustable: [
    'Target species',
    'Number of safari drives',
    'Preferred parks',
    'Photography experience',
    'Accommodation level',
    'Private vehicle requirements',
    'Travel dates',
    'Fitness level',
    'Cultural interests',
    'Number of participants',
  ],
};

export const PHOTO_DIFFERENCE = {
  title: 'The Untamed Photography Difference',
  points: [
    { title: 'More Time in the Wild', body: 'Our journeys are designed around sufficient time in the field rather than simply ticking destinations off a list.' },
    { title: 'Small Groups', body: 'Photography is fundamentally different from conventional sightseeing. We therefore favour private or very small groups wherever possible.' },
    { title: 'Photography-Friendly Safaris', body: 'Vehicle configuration, seating, camera space and safari timing are considered when designing the journey.' },
    { title: 'Local Knowledge', body: 'Our local teams understand the destinations, wildlife and safari systems of the regions in which they operate.' },
    { title: 'Luxury in the Wild', body: 'Where appropriate, we pair wildlife experiences with exceptional wilderness lodges such as Sujan Sher Bagh, Sujan Jawai, Oberoi Vanyavilas, Aman-i-Khas, Singinawa and Baghvan.' },
    { title: 'For Photographers & Non-Photographers', body: "You do not need to be a professional photographer. Our journeys are equally suitable for serious amateurs, wildlife enthusiasts, couples and families who simply want to experience India's wildlife." },
    { title: 'Responsible Wildlife Tourism', body: "Our aim is not simply to photograph animals. It is to understand the landscapes, communities and conservation stories that make India's wildlife worth protecting." },
  ],
};
