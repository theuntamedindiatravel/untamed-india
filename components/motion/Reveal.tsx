'use client';

import { type PropsWithChildren } from 'react';
import { motion, type MotionProps } from 'framer-motion';

type RevealProps = PropsWithChildren<
  {
    /**
     * Delay (seconds). Keep small; prefer using stagger on parents.
     */
    delay?: number;
    /**
     * Amount of vertical travel in px.
     */
    y?: number;
  } & Omit<MotionProps, 'initial' | 'whileInView' | 'viewport' | 'transition'>
>;

export default function Reveal({ children, delay = 0, y = 22, ...rest }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.05, ease: [0.2, 0, 0, 1], delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

