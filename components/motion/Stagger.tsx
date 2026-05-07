'use client';

import { type PropsWithChildren } from 'react';
import { motion } from 'framer-motion';

export default function Stagger({
  children,
  stagger = 0.12,
  delayChildren = 0,
}: PropsWithChildren<{ stagger?: number; delayChildren?: number }>) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.22 }}
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

