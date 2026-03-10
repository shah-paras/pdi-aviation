import { useState, useEffect, useCallback, useRef } from 'react';

export function useMousePosition(ref) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const rafId = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (rafId.current) cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      setPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    });
  }, [ref]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.addEventListener('mousemove', handleMouseMove);
    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [ref, handleMouseMove]);

  return position;
}
