import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import airports from '@/data/airports';

export function useAirports() {
  return useQuery({
    queryKey: ['airports'],
    staleTime: 30 * 60 * 1000,
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('airports')
          .select('*');
        if (error) throw error;
        if (data?.length > 0) return data;
      } catch {
        /* fallback to hardcoded data */
      }
      return airports;
    },
  });
}
