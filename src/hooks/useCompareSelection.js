import { useState, useMemo, useCallback } from 'react';

export function useCompareSelection(max = 3) {
  const [selected, setSelected] = useState([]);

  const isSelected = useCallback((id) => selected.includes(id), [selected]);

  const toggle = useCallback((id) => {
    setSelected(prev => {
      if (prev.includes(id)) return prev.filter(s => s !== id);
      if (prev.length >= max) return prev; // Already full
      return [...prev, id];
    });
  }, [max]);

  const remove = useCallback((id) => {
    setSelected(prev => prev.filter(s => s !== id));
  }, []);

  const clearAll = useCallback(() => setSelected([]), []);

  const isFull = selected.length >= max;

  const compareUrl = useMemo(
    () => selected.length >= 2 ? `/comparison?ids=${selected.join(',')}` : null,
    [selected]
  );

  return { selected, isSelected, toggle, remove, clearAll, isFull, compareUrl };
}
