'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import HeroSection from '@/components/Hero';
import ThreePanelHero from '@/components/ThreePanelHero';
import ThreePhotoStrip from '@/components/ThreePhotoStrip';
import EditorialSection from '@/components/EditorialSection';
import OurStorySection from '@/components/OurStorySection';
import MembershipSection from '@/components/MembershipSection';
import CTABanner from '@/components/CTABanner';
import RegisterInterestModal from '@/components/RegisterInterestModal';
import PhotoStoryModal from '@/components/PhotoStoryModal';
import { getHomePhotoStory } from '@/lib/homePhotoStories';

export default function HomeLanding() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const shouldOpen = useMemo(() => searchParams.get('register') === '1', [searchParams]);
  const [open, setOpen] = useState(false);
  const [photoStoryId, setPhotoStoryId] = useState<string | null>(null);
  const photoStory = photoStoryId ? getHomePhotoStory(photoStoryId) ?? null : null;

  const openPhotoStory = useCallback((id: string) => {
    setPhotoStoryId(id);
  }, []);

  const closePhotoStory = useCallback(() => {
    setPhotoStoryId(null);
  }, []);

  useEffect(() => {
    if (shouldOpen) setOpen(true);
  }, [shouldOpen]);

  return (
    <>
      <HeroSection />

      <ThreePanelHero onOpenStory={openPhotoStory} />

      <div id="discover" />
      <EditorialSection
        eyebrow="in the tall grass"
        title="Where the wild still feels timeless."
        body="In India’s great grasslands, the one-horned rhino moves with quiet authority — a living reminder that true luxury is space, silence, and protection."
        imageSrc="https://images.unsplash.com/photo-1706187586614-31f2a58624bb?auto=format&fit=crop&w=1800&q=85"
        imageAlt="One-horned rhinoceros in tall grass"
        imageKicker="GRASSLANDS"
        imageTitle="One-Horned Rhino"
        ctaLabel="discover"
        ctaHref="/destinations/heritage"
        storyId="editorial-rhino"
        onOpenStory={openPhotoStory}
      />

      <ThreePhotoStrip onOpenStory={openPhotoStory} />

      <EditorialSection
        eyebrow="exclusive familiarity"
        title="Personal, effortless, precise."
        body="From the first welcome to the last farewell, every detail is curated around you — expert access, unhurried pacing, and the luxury of space."
        imageSrc="https://images.unsplash.com/photo-1760835251791-1fda687de791?auto=format&fit=crop&w=1800&q=85"
        imageAlt="Thiksey Monastery, Ladakh"
        ctaLabel="discover"
        ctaHref="/tours"
        reverse
        storyId="editorial-ladakh"
        onOpenStory={openPhotoStory}
      />

      <OurStorySection />

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

      <PhotoStoryModal open={!!photoStory} story={photoStory} onClose={closePhotoStory} />
    </>
  );
}

