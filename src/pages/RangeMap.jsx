import { useState, useRef, useEffect, useMemo } from 'react';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Map as MapIcon, Plane, MapPin, X,
  Target, Ruler, Info, Layers
} from 'lucide-react';
import AircraftSearchSelect from '@/components/range-map/AircraftSearchSelect';
import AirportSearchSelect from '@/components/range-map/AirportSearchSelect';
import { motion } from 'framer-motion';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { createCircleGeoJSON, nmToKm, calculateZoomForRadius } from '@/lib/utils/mapUtils';
import aircraftModels from '@/data/aircraftModels';


export default function RangeMap() {
  const [origin, setOrigin] = useState({ code: 'DEL', name: 'Indira Gandhi International Airport', lat: 28.5665, lng: 77.1031 });
  const [selectedAircraftId, setSelectedAircraftId] = useState('');
  const [rangePercentage, setRangePercentage] = useState(100);
  const [showRings, setShowRings] = useState([true, true, false]);
  const [mapStyle, setMapStyle] = useState('standard');
  const [destination, setDestination] = useState(null);
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);

  // Filter to FW aircraft with range data for range visualization
  const aircraft = useMemo(() =>
    aircraftModels.filter(a =>
      a.type === 'FW' && a.max_range_nm && a.max_range_nm > 0
    ),
    []
  );

  const selectedAircraft = aircraft.find(a => a.id === selectedAircraftId);
  const maxRange = selectedAircraft?.max_range_nm || 2000;
  const effectiveRange = maxRange * (rangePercentage / 100);

  // Calculate ring distances (100%, 75%, 50% of range)
  const rings = [
    showRings[0] ? effectiveRange : null,
    showRings[1] ? effectiveRange * 0.75 : null,
    showRings[2] ? effectiveRange * 0.5 : null
  ].filter(Boolean);

  const ringColors = ['#3B82F6', '#0EA5E9', '#06B6D4'];

  const mapStyles = {
    standard: 'mapbox://styles/mapbox/streets-v12',
    dark: 'mapbox://styles/mapbox/dark-v11',
    satellite: 'mapbox://styles/mapbox/satellite-streets-v12'
  };

  // Calculate distance to destination
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 3440.065; // Earth's radius in nautical miles
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const distanceToDestination = destination 
    ? calculateDistance(origin.lat, origin.lng, destination.lat, destination.lng)
    : null;

  const flightTime = distanceToDestination && selectedAircraft?.cruise_speed_ktas
    ? distanceToDestination / selectedAircraft.cruise_speed_ktas
    : null;

  // Initialize map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: mapStyles[mapStyle],
      center: [origin.lng, origin.lat],
      zoom: 4,
    });

    mapRef.current = map;

    map.on('load', () => {
      // Map is ready
    });

    return () => {
      map.remove();
    };
  }, []);

  // Update map style
  useEffect(() => {
    if (!mapRef.current) return;
    mapRef.current.setStyle(mapStyles[mapStyle]);
  }, [mapStyle]);

  // Update origin and circles
  useEffect(() => {
    if (!mapRef.current || !mapRef.current.isStyleLoaded()) return;

    const map = mapRef.current;

    // Remove existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Remove existing circle layers
    for (let i = 0; i < 3; i++) {
      if (map.getLayer(`circle-fill-${i}`)) map.removeLayer(`circle-fill-${i}`);
      if (map.getLayer(`circle-outline-${i}`)) map.removeLayer(`circle-outline-${i}`);
      if (map.getSource(`circle-${i}`)) map.removeSource(`circle-${i}`);
    }

    // Add origin marker with PDI logo
    const originEl = document.createElement('div');
    originEl.innerHTML = `
      <div class="w-10 h-10 rounded-full border-2 border-white shadow-lg overflow-hidden">
        <img src="/pdi-logo.png" alt="PDI" class="w-full h-full object-cover" />
      </div>
    `;
    const originMarker = new mapboxgl.Marker({ element: originEl })
      .setLngLat([origin.lng, origin.lat])
      .addTo(map);
    markersRef.current.push(originMarker);

    // Add destination marker
    if (destination) {
      const destEl = document.createElement('div');
      destEl.innerHTML = `
        <div class="w-8 h-8 bg-green-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
          </svg>
        </div>
      `;
      const destMarker = new mapboxgl.Marker({ element: destEl })
        .setLngLat([destination.lng, destination.lat])
        .addTo(map);
      markersRef.current.push(destMarker);
    }

    // Add range circles
    rings.forEach((range, index) => {
      const circleGeoJSON = createCircleGeoJSON(origin.lng, origin.lat, nmToKm(range));

      map.addSource(`circle-${index}`, {
        type: 'geojson',
        data: circleGeoJSON,
      });

      map.addLayer({
        id: `circle-fill-${index}`,
        type: 'fill',
        source: `circle-${index}`,
        paint: {
          'fill-color': ringColors[index] || '#3B82F6',
          'fill-opacity': 0.1 - (index * 0.03),
        },
      });

      map.addLayer({
        id: `circle-outline-${index}`,
        type: 'line',
        source: `circle-${index}`,
        paint: {
          'line-color': ringColors[index] || '#3B82F6',
          'line-width': 2,
          'line-dasharray': index > 0 ? [2, 2] : [1, 0],
        },
      });
    });

    // Fly to origin
    map.flyTo({
      center: [origin.lng, origin.lat],
      zoom: 4,
      duration: 1000,
    });
  }, [origin, destination, rings, ringColors]);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col lg:flex-row">
      {/* Left Control Panel */}
      <div className="lg:w-96 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-r border-slate-800 flex-shrink-0 overflow-y-auto">
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-2 text-sky-400 text-sm mb-2">
            <MapIcon className="w-4 h-4" />
            <span>Range Visualization</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Range Map</h1>
          <p className="text-slate-400 text-sm mt-1">
            Visualize aircraft range from any origin
          </p>
        </div>

        <div className="p-6 space-y-6">
          {/* Origin Selector */}
          <div>
            <Label className="text-slate-300 text-sm font-medium mb-2 block flex items-center gap-2">
              <MapPin className="w-4 h-4 text-sky-400" />
              Origin Airport
            </Label>
            <AirportSearchSelect
              value={origin}
              onValueChange={setOrigin}
              placeholder="Search origin airport..."
            />
          </div>

          {/* Aircraft Selector */}
          <div>
            <Label className="text-slate-300 text-sm font-medium mb-2 block flex items-center gap-2">
              <Plane className="w-4 h-4 text-sky-400" />
              Aircraft Model
            </Label>
            <AircraftSearchSelect
              aircraft={aircraft}
              value={selectedAircraftId}
              onValueChange={setSelectedAircraftId}
            />
          </div>

          {/* Selected Aircraft Info */}
          {selectedAircraft && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-800/50 rounded-xl p-4 border border-slate-700"
            >
              <div className="flex items-center gap-3 mb-3">
                {selectedAircraft.thumbnail_url ? (
                  <img 
                    src={selectedAircraft.thumbnail_url}
                    alt={selectedAircraft.model}
                    className="w-16 h-10 object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-16 h-10 bg-slate-700 rounded-lg flex items-center justify-center">
                    <Plane className="w-6 h-6 text-sky-300" />
                  </div>
                )}
                <div>
                  <div className="text-white font-medium">{selectedAircraft.manufacturer}</div>
                  <div className="text-sky-400 font-bold">{selectedAircraft.model}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="bg-slate-900/50 rounded-lg p-2">
                  <div className="text-slate-400 text-xs">Max Range</div>
                  <div className="text-white font-medium">{selectedAircraft.max_range_nm?.toLocaleString()} nm</div>
                </div>
                <div className="bg-slate-900/50 rounded-lg p-2">
                  <div className="text-slate-400 text-xs">Cruise Speed</div>
                  <div className="text-white font-medium">{selectedAircraft.cruise_speed_ktas} ktas</div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Range Percentage */}
          <div>
            <Label className="text-slate-300 text-sm font-medium mb-2 block flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Ruler className="w-4 h-4 text-sky-400" />
                Range Factor
              </span>
              <span className="text-sky-400">{rangePercentage}%</span>
            </Label>
            <Slider
              value={[rangePercentage]}
              onValueChange={([value]) => setRangePercentage(value)}
              min={50}
              max={100}
              step={5}
              className="w-full"
            />
            <div className="text-xs text-slate-500 mt-1">
              Effective range: {effectiveRange.toLocaleString()} nm
            </div>
          </div>

          {/* Range Rings Toggle */}
          <div>
            <Label className="text-slate-300 text-sm font-medium mb-3 block flex items-center gap-2">
              <Target className="w-4 h-4 text-sky-400" />
              Range Rings
            </Label>
            <div className="space-y-3">
              {[
                { label: '100% Range', color: 'bg-sky-400', index: 0 },
                { label: '75% Range', color: 'bg-sky-400', index: 1 },
                { label: '50% Range', color: 'bg-cyan-400', index: 2 }
              ].map(ring => (
                <div key={ring.index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${ring.color}`} />
                    <span className="text-slate-300 text-sm">{ring.label}</span>
                  </div>
                  <Switch
                    checked={showRings[ring.index]}
                    onCheckedChange={(checked) => {
                      const newRings = [...showRings];
                      newRings[ring.index] = checked;
                      setShowRings(newRings);
                    }}
                    aria-label={`Toggle ${ring.label}`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Map Style */}
          <div>
            <Label className="text-slate-300 text-sm font-medium mb-2 block flex items-center gap-2">
              <Layers className="w-4 h-4 text-sky-400" />
              Map Style
            </Label>
            <Select value={mapStyle} onValueChange={setMapStyle}>
              <SelectTrigger className="w-full bg-slate-800/80 border-slate-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="dark">Dark Mode</SelectItem>
                <SelectItem value="satellite">Satellite</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Destination */}
          <div>
            <Label className="text-slate-300 text-sm font-medium mb-2 block">
              Destination (optional)
            </Label>
            <div className="flex gap-2">
              <div className="flex-1">
                <AirportSearchSelect
                  value={destination}
                  onValueChange={setDestination}
                  placeholder="Search destination..."
                  excludeCode={origin?.code}
                />
              </div>
              {destination && (
                <button
                  onClick={() => setDestination(null)}
                  className="flex items-center justify-center w-10 h-10 rounded-md bg-slate-800 border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                  aria-label="Clear destination"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Distance Info */}
          {distanceToDestination !== null && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-sky-500/20 to-sky-600/10 rounded-xl p-4 border border-sky-500/30"
              >
              <div className="flex items-center gap-2 text-sky-400 text-sm font-medium mb-2">
                <Info className="w-4 h-4" />
                Route Information
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Distance</span>
                  <span className="text-white font-medium">{Math.round(distanceToDestination).toLocaleString()} nm</span>
                </div>
                {flightTime && (
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Est. Flight Time</span>
                    <span className="text-white font-medium">
                      {Math.floor(flightTime)}h {Math.round((flightTime % 1) * 60)}m
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Within Range</span>
                  <span className={`font-medium ${distanceToDestination <= effectiveRange ? 'text-emerald-400' : 'text-red-400'}`}>
                    {distanceToDestination <= effectiveRange ? 'Yes ✓' : 'No ✗'}
                  </span>
                </div>
              </div>
            </motion.div>
          )}

        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1 relative">
        <div
          ref={mapContainerRef}
          className="w-full h-full"
          style={{ minHeight: '500px' }}
        />

        {/* PDIAVIATION Watermark */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-10"
          aria-hidden="true"
        >
          <span
            className="text-white/[0.07] font-bold whitespace-nowrap"
            style={{
              fontSize: 'clamp(4rem, 12vw, 10rem)',
              transform: 'rotate(-30deg)',
              letterSpacing: '0.15em',
            }}
          >
            PDIAVIATION
          </span>
        </div>

        {/* Map Legend */}
        <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg z-[1000]">
          <div className="text-sm font-medium text-slate-900 mb-2">Range Legend</div>
          <div className="space-y-1.5">
            {showRings[0] && (
              <div className="flex items-center gap-2 text-xs">
                <div className="w-4 h-0.5 bg-blue-500" />
                <span className="text-slate-600">100% ({effectiveRange.toLocaleString()} nm)</span>
              </div>
            )}
            {showRings[1] && (
              <div className="flex items-center gap-2 text-xs">
                <div className="w-4 h-0.5 bg-sky-400" style={{ borderStyle: 'dashed' }} />
                <span className="text-slate-600">75% ({Math.round(effectiveRange * 0.75).toLocaleString()} nm)</span>
              </div>
            )}
            {showRings[2] && (
              <div className="flex items-center gap-2 text-xs">
                <div className="w-4 h-0.5 bg-cyan-400" style={{ borderStyle: 'dashed' }} />
                <span className="text-slate-600">50% ({Math.round(effectiveRange * 0.5).toLocaleString()} nm)</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}