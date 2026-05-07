export type LuxuryHotelFilter =
  | 'all'
  | 'royal-palaces'
  | 'wellness-retreats'
  | 'wildlife-lodges'
  | 'beach-escapes'
  | 'urban-luxury';

export type LuxuryHotel = {
  id: string;
  name: string;
  destination: string;
  regionLabel: string;
  description: string;
  roomCategories: string[];
  signatureExperience: string;
  image: string;
  filters: Exclude<LuxuryHotelFilter, 'all'>[];
};

export const LUXURY_HOTEL_FILTERS: { id: LuxuryHotelFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'royal-palaces', label: 'Royal Palaces' },
  { id: 'wellness-retreats', label: 'Wellness Retreats' },
  { id: 'wildlife-lodges', label: 'Wildlife Lodges' },
  { id: 'beach-escapes', label: 'Beach Escapes' },
  { id: 'urban-luxury', label: 'Urban Luxury' },
];

export const LUXURY_HOTELS: LuxuryHotel[] = [
  {
    id: 'oberoi-udaivilas',
    name: 'The Oberoi Udaivilas',
    destination: 'Udaipur, Rajasthan',
    regionLabel: 'Rajasthan',
    description:
      'A lakeside palace of courtyards, reflecting pools, and Mughal-inspired gardens — where arrival by boat sets the tone for unhurried Rajasthani grandeur.',
    roomCategories: ['Premier Room', 'Luxury Suite', 'Royal Suite', 'Kohinoor Suite'],
    signatureExperience: 'Private sunset on Lake Pichola with dedicated butler service.',
    image: 'https://images.unsplash.com/photo-1695956353120-54ce5e91632b?auto=format&fit=crop&w=2000&q=88',
    filters: ['royal-palaces'],
  },
  {
    id: 'rambagh-palace',
    name: 'Rambagh Palace',
    destination: 'Jaipur, Rajasthan',
    regionLabel: 'Rajasthan',
    description:
      'Once the residence of a maharaja, today a Taj masterpiece of marble corridors, peacocks on the lawn, and ballroom evenings under chandeliers.',
    roomCategories: ['Palace Room', 'Historical Suite', 'Royal Suite', 'Grand Royal Suite'],
    signatureExperience: 'Heritage high tea in the palace gardens with curated Jaipur storytelling.',
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=2000&q=88',
    filters: ['royal-palaces'],
  },
  {
    id: 'raas-devigarh',
    name: 'RAAS Devigarh',
    destination: 'Near Udaipur, Rajasthan',
    regionLabel: 'Rajasthan',
    description:
      'An eighteenth-century hill fortress reimagined as a minimalist sanctuary — dramatic architecture, village walks, and silence above the Aravallis.',
    roomCategories: ['Garden Suite', 'Palace Suite', 'Royal Suite', 'Devigarh Suite'],
    signatureExperience: 'Sunrise yoga on the ramparts followed by a farm-to-table breakfast.',
    image: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?auto=format&fit=crop&w=2000&q=88',
    filters: ['royal-palaces'],
  },
  {
    id: 'suryagarh',
    name: 'Suryagarh',
    destination: 'Jaisalmer, Rajasthan',
    regionLabel: 'Rajasthan',
    description:
      'A desert fort-hotel of sandstone and starlight — caravanserai dinners, Thar silence, and hospitality rooted in Marwar tradition.',
    roomCategories: ['Fort Room', 'Heritage Suite', 'Luxury Suite', 'Signature Suite'],
    signatureExperience: 'Private dunes supper with folk musicians and astronomer-led stargazing.',
    image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=2000&q=88',
    filters: ['royal-palaces'],
  },
  {
    id: 'leela-palace-delhi',
    name: 'The Leela Palace New Delhi',
    destination: 'New Delhi',
    regionLabel: 'Delhi',
    description:
      'A contemporary palace in the capital — rooftop infinity pool, art-filled corridors, and service calibrated for diplomats and discerning travellers.',
    roomCategories: ['Deluxe Room', 'Royal Club Room', 'Luxury Suite', 'Presidential Suite'],
    signatureExperience: 'Insider Old Delhi breakfast expedition with private guide and vehicle.',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2000&q=88',
    filters: ['urban-luxury'],
  },
  {
    id: 'oberoi-amarvilas',
    name: 'The Oberoi Amarvilas',
    destination: 'Agra, Uttar Pradesh',
    regionLabel: 'Agra',
    description:
      'Uninterrupted views of the Taj Mahal from terraced gardens and suites — the definitive address for sunrise symmetry and moonlit marble.',
    roomCategories: ['Premier Room', 'Luxury Suite', 'Kohinoor Suite', 'Presidential Suite'],
    signatureExperience: 'Private Taj Mahal visit timed for first light and quiet courtyard moments.',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=2000&q=88',
    filters: ['royal-palaces'],
  },
  {
    id: 'taj-mahal-palace-delhi',
    name: 'Taj Mahal Palace New Delhi',
    destination: 'New Delhi',
    regionLabel: 'Delhi',
    description:
      'Landmark hospitality at the heart of Lutyens’ Delhi — polished brass, silk carpets, and a legacy of hosting heads of state.',
    roomCategories: ['Luxury Room', 'Executive Suite', 'Grand Luxury Suite', 'Presidential Suite'],
    signatureExperience: 'Curated gallery walk and diplomatic-quarter architecture drive.',
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=2000&q=88',
    filters: ['urban-luxury'],
  },
  {
    id: 'oberoi-vanyavilas',
    name: 'The Oberoi Vanyavilas',
    destination: 'Ranthambhore, Rajasthan',
    regionLabel: 'Wildlife',
    description:
      'Tented suites around lotus pools at the edge of tiger country — safari mornings and candlelit evenings without compromising comfort.',
    roomCategories: ['Luxury Tent', 'Premier Tent', 'Royal Tent', 'Private Villa'],
    signatureExperience: 'Private jeep safari with senior naturalist and bush breakfast.',
    image: 'https://images.unsplash.com/photo-1581012771300-224937651c42?auto=format&fit=crop&w=2000&q=88',
    filters: ['wildlife-lodges'],
  },
  {
    id: 'sujan-jawai',
    name: 'SUJÁN Jawai',
    destination: 'Jawai, Rajasthan',
    regionLabel: 'Wildlife',
    description:
      'Luxury camps among granite hills — leopard tracking by day, firelit cocktails by night, and only a handful of suites for total privacy.',
    roomCategories: ['Luxury Tent', 'Royal Tent Suite', 'Family Suite', 'Private Leopard Camp'],
    signatureExperience: 'Guided leopard safari with conservation-led storytelling.',
    image: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=2000&q=88',
    filters: ['wildlife-lodges'],
  },
  {
    id: 'aman-i-khas',
    name: 'Aman-i-Khas',
    destination: 'Ranthambhore, Rajasthan',
    regionLabel: 'Wildlife',
    description:
      'Mughal-inspired tents and Aman quiet beside the national park — sparse luxury, personalised expeditions, and evenings under canvas.',
    roomCategories: ['Luxury Tent', 'Suite Tent', 'Private Villa'],
    signatureExperience: 'Twilight champagne at the fort ruins after an exclusive safari.',
    image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=2000&q=88',
    filters: ['wildlife-lodges'],
  },
  {
    id: 'ananda-himalayas',
    name: 'Ananda in the Himalayas',
    destination: 'Rishikesh Hills, Uttarakhand',
    regionLabel: 'Himalayas',
    description:
      'A wellness sanctuary above the Ganges — Ayurveda, Vedanta, and spa rituals framed by sal forest and distant peaks.',
    roomCategories: ['Premier Room', 'Valley View Suite', 'Ananda Suite', 'Private Villa'],
    signatureExperience: 'Personalised Ayurvedic programme with physician consultation.',
    image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=2000&q=88',
    filters: ['wellness-retreats'],
  },
  {
    id: 'six-senses-barwara',
    name: 'Six Senses Fort Barwara',
    destination: 'Barwara, Rajasthan',
    regionLabel: 'Himalayas / Wellness',
    description:
      'A restored fourteenth-century fort reborn as a Six Senses retreat — spa rituals, slow food, and Suites within ramparts.',
    roomCategories: ['Fort Suite', 'Heritage Suite', 'Royal Suite', 'Presidential Suite'],
    signatureExperience: 'Integrated wellness journey with spa, sleep, and mindfulness programming.',
    image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?auto=format&fit=crop&w=2000&q=88',
    filters: ['wellness-retreats', 'royal-palaces'],
  },
  {
    id: 'kumarakom-lake-resort',
    name: 'Kumarakom Lake Resort',
    destination: 'Kumarakom, Kerala',
    regionLabel: 'South India',
    description:
      'Heritage villas on Vembanad Lake — snake boat silhouettes, Ayurvedic evenings, and the rhythm of backwater life.',
    roomCategories: ['Heritage Room', 'Lake Front Villa', 'Presidential Suite', 'Private Pool Villa'],
    signatureExperience: 'Private houseboat breakfast drift through the lagoon.',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=2000&q=88',
    filters: ['beach-escapes'],
  },
  {
    id: 'evolve-back-coorg',
    name: 'Evolve Back Coorg',
    destination: 'Coorg, Karnataka',
    regionLabel: 'South India',
    description:
      'Plantation villas among coffee and mist — infinity pools, Kodava cuisine, and the cool air of the Western Ghats.',
    roomCategories: ['Pool Villa', 'Luxury Villa', 'Presidential Villa', 'Heritage Pool Bungalow'],
    signatureExperience: 'Plantation walk with estate naturalist and tasting lunch.',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=2000&q=88',
    filters: ['wellness-retreats'],
  },
  {
    id: 'taj-bekal',
    name: 'Taj Bekal Resort & Spa',
    destination: 'Bekal, Kerala',
    regionLabel: 'South India',
    description:
      'Laterite walls and lagoon-facing villas on the Malabar Coast — Kettuvallam-inspired architecture and Arabian Sea breezes.',
    roomCategories: ['Superior Room', 'Luxury Villa', 'Presidential Villa', 'Private Pool Villa'],
    signatureExperience: 'Sunset on the beach with curated coastal spice tasting.',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=2000&q=88',
    filters: ['beach-escapes'],
  },
];

export const HERO_SLIDESHOW_IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1695956353120-54ce5e91632b?auto=format&fit=crop&w=2400&q=88',
    alt: 'Palace hotel overlooking water at dusk',
  },
  {
    src: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=2400&q=88',
    alt: 'Iconic marble monument at sunrise',
  },
  {
    src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2400&q=88',
    alt: 'Himalayan peaks above clouds',
  },
  {
    src: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=2400&q=88',
    alt: 'Kerala backwaters and palm trees',
  },
] as const;
