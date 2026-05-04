import { useQuery } from '@tanstack/react-query';
import operators from '@/data/operators';

export function useOperators() {
  return useQuery({
    queryKey: ['operators'],
    staleTime: Infinity,
    queryFn: () => operators,
  });
}
