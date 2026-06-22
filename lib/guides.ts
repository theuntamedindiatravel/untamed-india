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
    id: 'shyam',
    name: 'Shyam',
    languages: ['English', 'Hindi'],
    region: 'North India',
    descriptor: 'Cycling & adventure',
    experienceYears: 10,
    bio: `Shyam is the perfect companion for travelers seeking a more active, immersive, and authentic side of India. A specialist in cycling and adventure tourism, he goes far beyond traditional guiding—offering experiences that bring you closer to the rhythm of local life.

With years of hands-on experience in leading cycle tours through bustling cities, quiet countryside, and hidden village trails, Shyam has an exceptional understanding of India’s landscapes and its people. His routes are carefully designed to balance exploration, safety, and genuine discovery, allowing travelers to experience places that are often missed by conventional tours.

What sets Shyam apart is his deep connection with local communities. Whether it’s sharing a meal in a village home, interacting with artisans, or exploring lesser-known neighborhoods, he ensures that every experience feels personal and meaningful. His passion for cultural exchange transforms simple moments into lasting memories.

Energetic, approachable, and highly attentive.`,
    // Place Shyam's portrait at:
    //   public/guides/shyam.png
    // or replace this with a public URL.
    photo: '/guides/shyam.png',
  },
  {
    id: 'shivam',
    name: 'Shivam',
    languages: ['English', 'Hindi', 'French (developing)'],
    region: 'Golden Triangle · Delhi · Jaipur · Agra',
    descriptor: 'Golden Triangle specialist',
    experienceYears: 6,
    bio: `Shivam is a passionate English-speaking tour guide currently advancing his French language skills to offer an even more personalized experience to international travellers.

Specializing in India’s iconic Golden Triangle circuit — Delhi, Jaipur, and Agra — he brings deep knowledge of the region’s history, architecture, culture, and local traditions. His tours are designed to go beyond sightseeing, offering guests authentic insights and engaging stories that bring each destination to life.

With a strong focus on professionalism, hospitality, and creating meaningful travel experiences, Shivam ensures that every journey is smooth, informative, and memorable.

Whether exploring the historic streets of Delhi, the royal heritage of Jaipur, or the timeless beauty of Agra, Shivam is dedicated to helping travellers discover the true essence of India.`,
    photo: '/guides/shivam.png',
  },
  {
    id: 'raj',
    name: 'Raj',
    languages: ['English', 'Hindi'],
    region: 'Ladakh · Himalayas',
    descriptor: 'Trekking & wilderness',
    experienceYears: 10,
    bio: `Raj is a seasoned trekker and wilderness expert, built for those who seek the raw, untamed beauty of India’s most remote landscapes. With extensive experience in high-altitude trekking and jungle exploration, he is the ideal companion for expeditions into regions like Ladakh, where nature is both breathtaking and unforgiving.

Having spent years navigating mountain trails and rugged terrains, Raj combines deep technical knowledge with an instinctive understanding of the outdoors. From altitude awareness to route planning and safety management, every journey with him is handled with precision and care, allowing travelers to explore confidently even in the most challenging environments.

What truly defines Raj is his connection with nature. He doesn’t just lead treks—he interprets the landscape. Whether it’s reading weather patterns in the mountains, identifying wildlife traces in the जंगल, or sharing survival insights, he transforms each expedition into a learning experience.

Calm, resilient, and highly dependable`,
    // Place Raj's portrait at:
    //   public/guides/raj.png
    // or replace this with a public URL.
    photo: '/guides/raj.png',
  },
  {
    id: 'ashu',
    name: 'Ashu',
    languages: ['English', 'Hindi'],
    region: 'Pan-India · Women-only journeys',
    descriptor: 'Women’s travel & adventure',
    experienceYears: 10,
    bio: `Passionate, confident, and deeply experienced, Ashu is our dedicated specialist for women-only journeys across India. With a strong understanding of what female travelers seek — safety, comfort, authentic cultural immersion, and meaningful experiences — she curates and leads tours designed to inspire confidence and create unforgettable memories.

An avid adventure seeker herself, Ashu brings energy, enthusiasm, and a fearless spirit to every journey, whether it’s exploring hidden mountain trails, discovering vibrant local cultures, or creating unique offbeat experiences. Her warm personality, local expertise, and attention to detail ensure that every traveler feels supported, empowered, and completely at ease throughout the trip.

For women looking to explore India with freedom, excitement, and complete peace of mind, Ashu is the perfect companion on the road.`,
    photo: '/guides/ashu.png',
  },
  {
    id: 'shivraj-singh',
    name: 'Shivraj Singh',
    languages: ['English', 'Hindi'],
    region: 'Rajasthan · Jaisalmer',
    descriptor: 'Heritage specialist & storyteller',
    experienceYears: 10,
    bio: `Born and raised amidst the golden sand dunes of Jaisalmer, Shivraj brings the timeless spirit of the Thar Desert to every journey he leads. With a deep passion for India’s rich cultural legacy, he specializes in heritage tours, offering travelers an authentic and immersive understanding of Rajasthan’s magnificent forts, palaces, ancient traditions, and vibrant local communities.

Known for his engaging storytelling and warm hospitality, Shivraj goes beyond dates and monuments to reveal the fascinating stories, legends, and living traditions that shape India’s heritage. Whether guiding guests through the majestic citadels of Rajasthan, hidden desert villages, or UNESCO-listed treasures, he ensures that every experience is insightful, memorable, and deeply connected to local culture.

For travelers seeking a genuine cultural encounter and a deeper appreciation of India’s historical wonders, Shivraj is the perfect companion on the journey.`,
    photo: '/guides/shivraj.png',
  },
];

