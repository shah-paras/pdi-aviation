import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const blobs = [
  { color: 'bg-blue-500/20', size: 'w-96 h-96', x: '10%', y: '20%', delay: 0 },
  { color: 'bg-sky-400/15', size: 'w-80 h-80', x: '60%', y: '10%', delay: 2 },
  { color: 'bg-indigo-500/15', size: 'w-72 h-72', x: '30%', y: '60%', delay: 4 },
  { color: 'bg-purple-500/10', size: 'w-64 h-64', x: '70%', y: '50%', delay: 1 },
];

export default function GradientBackground() {
  const reduced = useReducedMotion();

  if (reduced) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-3xl ${blob.color} ${blob.size}`}
          style={{ left: blob.x, top: blob.y }}
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -20, 30, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            delay: blob.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
