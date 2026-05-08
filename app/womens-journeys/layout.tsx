import type { Metadata } from 'next';

import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: "Women's Journeys | Untamed India",
  description:
    'A women-only luxury Golden Triangle journey through India — fully female-led, with comfort, cultural depth, and empowerment at every step.',
  openGraph: {
    title: "Women's Journeys | Untamed India",
    description:
      'Travel India, led by women. Delhi, Agra, and Jaipur with an entirely women-led team — designed for trust, safety, and quiet luxury.',
    type: 'website',
  },
};

export default function WomensJourneysLayout({ children }: { children: ReactNode }) {
  return children;
}
