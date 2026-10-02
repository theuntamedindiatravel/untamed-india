// Content for the homepage sections (components/home/*). Photos are Unsplash (free licence) unless local.

export type HomeDestination = { id: string; name: string; line: string; image: string; alt: string; href: string };
export type HomeInterest = { id: string; label: string; title: string; body: string; image: string; alt: string; href: string };

const unsplash = (id: string, w = 1600) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const HERO = {
  script: 'Journeys with purpose',
  subtitle: 'Not just a journey through India, a quiet, meaningful contribution to the places, people, and landscapes you touch.',
  image: unsplash('1715193678341-31634700f56b', 2400),
  alt: 'Priests raising flaming lamps at the Ganga aarti in Varanasi',
};

export const HOME_STORY = {
  title: 'Our Story',
  body:
    'We design journeys with taste, calm and precision, while respecting the people, culture and landscapes that make each region extraordinary. ' +
    'Our passion is meaningful luxury: stays and experiences that feel effortless, and memories that feel personal. ' +
    'Every traveller leaves an impact. Our job is to make it a positive one.',
  href: '/about',
  image: unsplash('1675079839131-8040dbc50625'),
  alt: 'Carved sandstone balconies of Mehrangarh Fort, Jodhpur',
};

export const HOME_DESTINATIONS: HomeDestination[] = [
  { id: 'rajasthan', name: 'Rajasthan', line: 'Forts, palaces and the colours of the desert.', image: unsplash('1567771971104-545efaf89ddb'), alt: 'Mehrangarh Fort above the blue city of Jodhpur', href: '/destinations/heritage' },
  { id: 'kerala', name: 'Kerala', line: 'Backwaters, spice hills and a slower tide.', image: unsplash('1654530050931-3b02b28570c1'), alt: 'A houseboat moored on the Kerala backwaters', href: '/destinations/coastal' },
  { id: 'ladakh', name: 'Ladakh', line: 'Monasteries and high passes above the clouds.', image: unsplash('1760835251791-1fda687de791'), alt: 'Thiksey Monastery in Ladakh', href: '/destinations/himalayan' },
  { id: 'varanasi', name: 'Varanasi', line: 'Dawn boats on the Ganga, past centuries-old ghats.', image: unsplash('1706186839147-0d708602587b'), alt: 'Boats on the Ganga before the ghats of Varanasi', href: '/destinations/spiritual' },
  { id: 'central-india', name: 'Central India', line: 'Tiger country: Kanha, Bandhavgarh and Pench.', image: unsplash('1589657429197-ecba47e3acd8'), alt: 'A tiger walking down a forest track', href: '/destinations/wildlife' },
  { id: 'hampi', name: 'Hampi', line: 'Boulder hills and the ruins of an empire.', image: unsplash('1561981969-65ee8dfc7351'), alt: 'The Tungabhadra river winding through the boulder hills of Hampi', href: '/destinations/cultural' },
];

export const HOME_INTERESTS: HomeInterest[] = [
  { id: 'culture', label: 'Culture & Heritage', title: 'Palaces, crafts and living traditions.', body: "Walk Jaipur's bazaars with a textile historian, dine in a family haveli and watch generations-old crafts still made by hand.", image: unsplash('1706961121783-4ae6c933983a'), alt: 'The pink sandstone windows of the Hawa Mahal, Jaipur', href: '/destinations/cultural' },
  { id: 'wildlife', label: 'Wildlife', title: 'Tigers at dawn, rhinos in the tall grass.', body: "India holds most of the world's wild tigers and the last Asiatic lions. Our naturalists know how to wait, quietly, for the moment.", image: unsplash('1496841733162-a88a250a275c'), alt: 'A leopard in golden evening light', href: '/destinations/wildlife' },
  { id: 'mountains', label: 'Mountains', title: 'Thin air, prayer flags and silence.', body: 'Cross high passes in Ladakh, wake to Kanchenjunga in Sikkim or walk the oak forests of Kumaon.', image: unsplash('1652514284048-a297d43ab05d'), alt: 'Key Monastery above the Spiti river at sunset', href: '/destinations/himalayan' },
  { id: 'adventure', label: 'Adventure', title: 'White water, high roads and nights under the stars.', body: 'Raft the Ganga below Rishikesh, drive the high road into Spiti and dive the reefs of the Andamans.', image: unsplash('1718431108073-7f61fb5dfefb'), alt: 'Rafting on the Ganga at Rishikesh', href: '/tours?mood=Adventure' },
  { id: 'coast', label: 'Coast & Backwaters', title: 'Slow water, spice air and long lunches.', body: "Drift Kerala's backwaters on a private houseboat, wander French Pondicherry and end the day above the Arabian Sea.", image: unsplash('1506461883276-594a12b11cf3'), alt: 'A boatman poling a canoe past a houseboat in Kerala', href: '/destinations/coastal' },
  { id: 'spirit', label: 'Spirit & Wellness', title: 'Dawn on the Ganga, and time to be still.', body: 'Watch the aarti in Varanasi, share langar at the Golden Temple and rest at retreats built for real restoration.', image: unsplash('1623059508779-2542c6e83753'), alt: 'The Golden Temple at night, Amritsar', href: '/destinations/spiritual' },
  { id: 'hotels', label: 'Luxury Hotels', title: 'Palaces and retreats we know personally.', body: 'Stays chosen for their character, their service and the places they open up.', image: '/hotels/rambagh-1.jpg', alt: 'Rambagh Palace, Jaipur', href: '/luxury-hotels' },
  { id: 'women', label: "Women's Journeys", title: 'Travel India, led by women.', body: 'Small-group journeys hosted by women, designed for comfort, connection and safety.', image: '/womens-journeys/group-safari.png', alt: 'Women travellers on a safari jeep', href: '/womens-journeys' },
];

// "How Impact Credits work" panel; wording from the site's original Our Story section.
export const IMPACT_CREDITS = {
  title: 'How Impact Credits work',
  points: [
    { title: '5% returned to you', body: 'When your journey finishes, you receive Impact Credits equal to 5% of your total tour package.' },
    { title: 'Use them, or gift them forward', body: "Use your credits as a discount on a future journey, or choose to sponsor a girl child's education with the same value." },
    { title: 'Travel with a trace of good', body: 'The aim is simple: support communities, encourage responsible tourism, and keep the regions we love thriving for the next traveller and for the people who call these places home.' },
  ],
};

export const HOME_IMPACT = {
  title: 'Travel that gives back',
  body: "When your journey ends, 5% of its value returns to you as Impact Credits. Use them on a future trip, or gift them to fund a girl child's education.",
  href: '/about',
  image: unsplash('1491497895121-1334fc14d8c9', 2400),
  alt: 'Misty tea gardens on the hills of Munnar, Kerala',
};
