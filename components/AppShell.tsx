'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';
import ScrollRestoration from '@/components/ScrollRestoration';
import ChatAssistant from '@/components/ChatAssistant';

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ScrollRestoration />
      <Navbar />
      <main>
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
      <ChatAssistant />
    </>
  );
}

