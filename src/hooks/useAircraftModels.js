import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import aircraftModels from '@/data/aircraftModels';

export function useAircraftModels() {
  return useQuery({
    queryKey: ['aircraft-models'],
    staleTime: 30 * 60 * 1000,
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('aircraft_models')
          .select('*')
          .order('category');
        if (error) throw error;
        if (data?.length > 0) return data;
      } catch {
        /* fallback to hardcoded data */
      }
      return aircraftModels;
    },
  });
}
