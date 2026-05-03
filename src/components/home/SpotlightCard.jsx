import { useRef, useCallback } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export default function SpotlightCard({ children, className = '' }) {
  const ref = useRef(null);
  const glowRef = useRef(null);
  const reduced = useReducedMotion();

  const handleMouseMove = useCallback((e) => {
    if (!glowRef.current || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    glowRef.current.style.background =
      `radial-gradient(400px circle at ${x}px ${y}px, rgba(56, 189, 248, 0.15), transparent 40%)`;
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (glowRef.current) glowRef.current.style.opacity = '1';
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (glowRef.current) glowRef.current.style.opacity = '0';
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={reduced ? undefined : handleMouseMove}
      onMouseEnter={reduced ? undefined : handleMouseEnter}
      onMouseLeave={reduced ? undefined : handleMouseLeave}
      className={`relative overflow-hidden ${className}`}
    >
      {!reduced && (
        <div
          ref={glowRef}
          className="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-300"
          style={{ opacity: 0 }}
        />
      )}
      {children}
    </div>
  );
}
