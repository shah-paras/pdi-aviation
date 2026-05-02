import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import operators from '@/data/operators';

export function useOperators() {
  return useQuery({
    queryKey: ['operators'],
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('operators')
          .select('id, name, city, state, aop_no, valid_upto, total_aircraft, aircraft_fleet(registration, type, model, model_id, seating_capacity)')
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
