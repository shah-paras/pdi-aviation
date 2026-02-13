import { useEffect, useRef } from 'react';
import { useInView, useMotionValue, useTransform, animate, motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export default function AnimatedCounter({ value, prefix = '', suffix = '', className = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const reduced = useReducedMotion();
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (v) => Math.round(v));

  useEffect(() => {
    if (!isInView || reduced) return;
    const controls = animate(motionValue, value, {
      duration: 2,
      ease: 'easeOut',
    });
    return () => controls.stop();
  }, [isInView, value, reduced, motionValue]);

  if (reduced) {
    return <span className={className}>{prefix}{value}{suffix}</span>;
  }

  return (
    <span ref={ref} className={className}>
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}
