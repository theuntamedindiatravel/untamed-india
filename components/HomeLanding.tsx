'use client';

import { useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import HeroSection from '@/components/Hero';
import EditorialSection from '@/components/EditorialSection';
import MembershipSection from '@/components/MembershipSection';
import CTABanner from '@/components/CTABanner';
import RegisterInterestModal from '@/components/RegisterInterestModal';

export default function HomeLanding() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const shouldOpen = useMemo(() => searchParams.get('register') === '1', [searchParams]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (shouldOpen) setOpen(true);
  }, [shouldOpen]);

  return (
    <>
      <HeroSection />

      <div id="discover" />
      <EditorialSection
        eyebrow="true beauty"
        title="A country that never repeats itself."
        body="India appears unchanged through centuries, yet always different — a timeless corner of the world where true beauty can be found, in silence, color, and ritual."
        imageSrc="https://images.unsplash.com/photo-1548013146-72479768bada?w=1800&q=85"
        imageAlt="Hazy palace silhouette at sunrise"
        ctaLabel="discover"
        ctaHref="/destinations/heritage"
      />

      <EditorialSection
        eyebrow="exclusive familiarity"
        title="Personal, effortless, precise."
        body="From the first welcome to the last farewell, every detail is curated around you — expert access, unhurried pacing, and the luxury of space."
        imageSrc="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1800&q=85"
        imageAlt="Elegant interior with warm light"
        ctaLabel="discover"
        ctaHref="/tours"
        reverse
      />

      <MembershipSection />

      <CTABanner />

      <RegisterInterestModal
        open={open}
        onClose={() => {
          setOpen(false);
          const next = new URLSearchParams(searchParams.toString());
          next.delete('register');
          const qs = next.toString();
          router.replace(qs ? `${pathname}?${qs}` : pathname);
        }}
      />
    </>
  );
}

