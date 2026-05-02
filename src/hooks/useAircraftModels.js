import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import aircraftModels from '@/data/aircraftModels';

export function useAircraftModels() {
  return useQuery({
    queryKey: ['aircraft-models'],
    staleTime: 60 * 60 * 1000,
    gcTime: 2 * 60 * 60 * 1000,
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('aircraft_models')
          .select('id, type, category, manufacturer, model, max_range_nm, cruise_speed_ktas, max_pax, engines, cabin_height_ft, cabin_width_ft, cabin_length_ft, new_price_usd, preowned_price_low_usd, preowned_price_high_usd, production_status, thumbnail_url, notes')
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
