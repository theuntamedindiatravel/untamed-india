'use client';

import { useRef } from 'react';
import { type PropsWithChildren } from 'react';
import { motion, useInView } from 'framer-motion';

export default function Stagger({
  children,
  stagger = 0.12,
  delayChildren = 0,
}: PropsWithChildren<{ stagger?: number; delayChildren?: number }>) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'show' : 'hidden'}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: stagger, delayChildren },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
