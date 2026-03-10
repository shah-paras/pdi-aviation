import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export default function MovingBorder({ children, className = '', borderRadius = '0.75rem' }) {
  const reduced = useReducedMotion();

  return (
    <div className={`relative inline-flex ${className}`} style={{ borderRadius }}>
      {!reduced && (
        <motion.div
          className="absolute -inset-[2px] rounded-[inherit] overflow-hidden"
          style={{ borderRadius }}
        >
          <motion.div
            className="absolute inset-0 w-full h-full"
            style={{
              background: 'conic-gradient(from 0deg, #3b82f6, #60a5fa, #93c5fd, #3b82f6)',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>
      )}
      <div className="relative z-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-[inherit] w-full">
        {children}
      </div>
    </div>
  );
}
