import './globals.css';
import type { Metadata } from 'next';
import { Allison, Inter, Playfair_Display } from 'next/font/google';
import Script from 'next/script';
import AppShell from '@/components/AppShell';

// Self-hosted at build time; exposed as CSS variables that globals.css builds the font stacks from.
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const playfair = Playfair_Display({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
});
// Script accent: hero line and the video gallery title only.
const allison = Allison({ subsets: ['latin'], weight: '400', variable: '--font-allison', display: 'swap' });

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
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${allison.variable}`}>
      <body>
        <AppShell>{children}</AppShell>
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "xcf0xzshse");`}
        </Script>
      </body>
    </html>
  );
}
