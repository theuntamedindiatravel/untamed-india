import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Luxury Hotels | Untamed India',
  description:
    'The finest stays across the Indian Subcontinent — curated palaces, retreats, wildlife lodges, and urban residences where hospitality becomes an art form.',
};

export default function LuxuryHotelsLayout({ children }: { children: ReactNode }) {
  return children;
}
