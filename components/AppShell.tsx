'use client';

import { Suspense } from 'react';
import { MotionConfig } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';
import ScrollRestoration from '@/components/ScrollRestoration';
import ChatAssistant from '@/components/ChatAssistant';
import MobileBar from '@/components/MobileBar';
import BackToTop from '@/components/BackToTop';

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    // reducedMotion="user": framer-motion skips transform/scroll animations when the OS asks for less motion.
    <MotionConfig reducedMotion="user">
      <ScrollRestoration />
      <Suspense fallback={null}>
        <Navbar />
      </Suspense>
      <main>
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
      <ChatAssistant />
      <BackToTop />
      <MobileBar />
      {/* One screen down: BackToTop appears once this has scrolled out of view */}
      <div id="top-sentinel" aria-hidden="true" style={{ position: 'absolute', top: '100vh', left: 0, width: 1, height: 1 }} />
    </MotionConfig>
  );
}

