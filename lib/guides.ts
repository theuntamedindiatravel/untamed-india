export type Guide = {
  id: string;
  name: string;
  languages: string[];
  region: string;
  descriptor: string;
  experienceYears: number;
  bio: string;
  photo: string;
};

export const GUIDES: Guide[] = [
  {
    id: 'karan',
    name: 'Karan',
    languages: ['English', 'Hindi'],
    region: 'Delhi · North India',
    descriptor: 'Culture & storytelling',
    experienceYears: 5,
    bio: 'Young, dynamic, and deeply passionate about sharing India with the world, Karan brings fresh energy paired with a strong foundation in history and culture. He’s known for connecting naturally with travellers — creating meaningful moments beyond the obvious, with a pace that adapts to you. Fluent, attentive to detail, and constantly learning, he represents the next generation of Indian travel.',
    // To use the real portrait you shared, place it at:
    //   public/guides/karan.png
    // or replace this with a public URL.
    photo: '/guides/karan.png',
  },
  {
    id: 'aanya-mehra',
    name: 'Aanya Mehra',
    languages: ['English', 'French'],
    region: 'Rajasthan · North India',
    descriptor: 'Heritage & culture specialist',
    experienceYears: 11,
    bio: 'Known for calm precision and warm storytelling, Aanya designs days that feel effortless — private access, thoughtful pacing, and deeply local encounters. She’s happiest in old cities at first light and desert landscapes at dusk.',
    photo:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'kabir-singh',
    name: 'Kabir Singh',
    languages: ['English', 'Hindi'],
    region: 'Central India',
    descriptor: 'Wildlife specialist',
    experienceYears: 14,
    bio: 'A field naturalist at heart, Kabir brings quiet confidence to the forest. He reads tracks, light, and behaviour with ease — and keeps every drive respectful, unhurried, and focused on true wilderness moments.',
    photo:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'tsering-dolma',
    name: 'Tsering Dolma',
    languages: ['English', 'Hindi', 'Ladakhi'],
    region: 'Ladakh · Himalayas',
    descriptor: 'High-altitude journeys',
    experienceYears: 9,
    bio: 'Raised in the mountains, Tsering leads with gentle clarity — balancing comfort, culture, and altitude-aware logistics. Expect quiet monasteries, warm family kitchens, and a pace that honours the Himalayas.',
    photo:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'ishaan-roy',
    name: 'Ishaan Roy',
    languages: ['English', 'Spanish'],
    region: 'South India · Coast',
    descriptor: 'Slow luxury & wellbeing',
    experienceYears: 12,
    bio: 'Ishaan specialises in journeys that restore: coastal routes, gentle rhythms, and refined stays. He’s attentive without hovering — ensuring every detail lands softly, from transfers to table reservations.',
    photo:
      'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=900&q=85',
  },
];

