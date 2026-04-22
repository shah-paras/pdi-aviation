import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import operators from '@/data/operators';

export function useOperators() {
  return useQuery({
    queryKey: ['operators'],
    staleTime: 10 * 60 * 1000,
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('operators')
          .select('*, aircraft_fleet(*)')
          .order('name');
        if (error) throw error;
        if (data?.length > 0) return data;
      } catch {
        /* fallback to hardcoded data */
      }
      return operators;
    },
  });
}
