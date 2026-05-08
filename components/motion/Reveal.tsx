'use client';

import { useRef } from 'react';
import { type PropsWithChildren } from 'react';
import { motion, useInView, type MotionProps } from 'framer-motion';

type RevealProps = PropsWithChildren<
  {
    delay?: number;
    y?: number;
  } & Omit<MotionProps, 'initial' | 'animate' | 'whileInView' | 'viewport' | 'transition'>
>;

export default function Reveal({ children, delay = 0, y = 22, ...rest }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y, filter: 'blur(8px)' }}
      animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.8, ease: [0.2, 0, 0, 1], delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
