import './globals.css';
import type { Metadata } from 'next';
import Script from 'next/script';
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
