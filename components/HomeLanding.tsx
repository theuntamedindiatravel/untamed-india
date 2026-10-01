'use client';

import { Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import Hero from '@/components/home/Hero';
import OurStory from '@/components/home/OurStory';
import DestinationsCarousel from '@/components/home/DestinationsCarousel';
import WhatCallsYou from '@/components/home/WhatCallsYou';
import VideoGallery from '@/components/home/VideoGallery';
import MakingDifference from '@/components/home/MakingDifference';
import GuestStories from '@/components/home/GuestStories';
import RegisterInterestModal from '@/components/RegisterInterestModal';
import PhotoStoryModal from '@/components/PhotoStoryModal';
import { getHomePhotoStory } from '@/lib/homePhotoStories';

// The sections never read the URL, so they prerender into the page's HTML.
// Only the pop-ups depend on ?story= / ?register=, and they sit in their own Suspense boundary.
export default function HomeLanding() {
  const pathname = usePathname();
  const router = useRouter();

  const openPhotoStory = useCallback(
    (id: string) => {
      const next = new URLSearchParams(window.location.search);
      next.set('story', id);
      router.push(`${pathname}?${next.toString()}`, { scroll: false });
    },
    [pathname, router],
  );

  return (
    <>
      <Hero />

      <OurStory />

      <DestinationsCarousel />

      <WhatCallsYou />

      <VideoGallery onOpenStory={openPhotoStory} />

      <MakingDifference />

      <GuestStories />

      <Suspense fallback={null}>
        <HomeOverlays />
      </Suspense>
    </>
  );
}

function HomeOverlays() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const shouldOpen = useMemo(() => searchParams.get('register') === '1', [searchParams]);
  const [open, setOpen] = useState(false);

  const storyParam = searchParams.get('story');
  const photoStory = useMemo(() => {
    if (!storyParam) return null;
    return getHomePhotoStory(storyParam) ?? null;
  }, [storyParam]);

  const closePhotoStory = useCallback(() => {
    const next = new URLSearchParams(searchParams.toString());
    next.delete('story');
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }, [pathname, router, searchParams]);

  useEffect(() => {
    setOpen(shouldOpen);
  }, [shouldOpen]);

  return (
    <>
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
