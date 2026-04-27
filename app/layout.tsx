import './globals.css';
import type { Metadata } from 'next';
import AppShell from '@/components/AppShell';

export const metadata: Metadata = {
  title: 'Untamed India | Luxury Journeys With Purpose',
  description: 'Luxury journeys across India, shaped by a 30-year legacy of travel design — reimagined with a conscious, modern vision.',
  keywords: 'India travel, wildlife safari, cultural tours, Rajasthan, Ladakh, Kerala, tiger safari, Himalayan trek, heritage tours',
  openGraph: {
    title: 'Untamed India | Luxury Journeys With Purpose',
    description: 'Luxury journeys across India — where every trip contributes to something meaningful.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
