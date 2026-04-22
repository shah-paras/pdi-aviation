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
import FeatureGate from '@/components/auth/FeatureGate';
import { motion } from 'framer-motion';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import {
  createCircleGeoJSON,
  createOutsideOverlayGeoJSON,
  nmToKm,
  calculateZoomForRadius,
  interpolateGreatCircle,
  calculateBearing,
  findRangeBoundaryIndex,
} from '@/lib/utils/mapUtils';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useAircraftModels } from '@/hooks/useAircraftModels';

// Top-down jet silhouette SVG with glow halo (points north/up by default)
const RING_COLORS = ['#EF4444', '#F87171'];

const JET_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
  <defs>
    <filter id="jet-glow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feFlood flood-color="#38bdf8" flood-opacity="0.6" result="color"/>
      <feComposite in="color" in2="blur" operator="in" result="glow"/>
      <feMerge>
        <feMergeNode in="glow"/>
        <feMergeNode in="glow"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  <g filter="url(#jet-glow)">
    <path d="M24 4 L21 17 L10 25 L10 28 L21 24 L21 38 L17 41 L17 44 L24 42.5 L31 44 L31 41 L27 38 L27 24 L38 28 L38 25 L27 17 Z"
          fill="#38bdf8" stroke="#0ea5e9" stroke-width="0.8"/>
  </g>
</svg>`;


export default function RangeMap() {
  const { data: aircraftModels = [] } = useAircraftModels();

  const [origin, setOrigin] = useState({ code: 'DEL', name: 'Indira Gandhi International Airport', lat: 28.5665, lng: 77.1031 });
  const [selectedAircraftId, setSelectedAircraftId] = useState('');
  const [rangePercentage, setRangePercentage] = useState(100);
  const [showRings, setShowRings] = useState([true, false]);
  const [mapStyle, setMapStyle] = useState('standard');
  const [destination, setDestination] = useState(null);
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const flightAnimRef = useRef({ jetMarker: null, radarMarker: null, popup: null, animId: null });

  const reducedMotion = useReducedMotion();

  // Filter to FW aircraft with range data for range visualization
  const aircraft = useMemo(() =>
    aircraftModels.filter(a =>
      a.type === 'FW' && a.max_range_nm && a.max_range_nm > 0
    ),
    [aircraftModels]
  );

  const selectedAircraft = aircraft.find(a => a.id === selectedAircraftId);
  const maxRange = selectedAircraft?.max_range_nm || 2000;
  const effectiveRange = maxRange * (rangePercentage / 100);

  // Calculate ring distances (100%, 50% of range)
  const rings = [
    showRings[0] ? effectiveRange : null,
    showRings[1] ? effectiveRange * 0.5 : null
  ].filter(Boolean);

  // ringColors is stable — defined outside component to avoid new array reference each render
  const ringColors = RING_COLORS;

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

  // Update origin, circles, and flight path
  useEffect(() => {
    if (!mapRef.current || !mapRef.current.isStyleLoaded()) return;

    const map = mapRef.current;

    // --- Cleanup flight animation ---
    const fa = flightAnimRef.current;
    if (fa.animId) { cancelAnimationFrame(fa.animId); fa.animId = null; }
    if (fa.jetMarker) { fa.jetMarker.remove(); fa.jetMarker = null; }
    if (fa.radarMarker) { fa.radarMarker.remove(); fa.radarMarker = null; }
    if (fa.popup) { fa.popup.remove(); fa.popup = null; }

    // Remove flight path layers/sources
    ['flight-path-glow', 'flight-path-line'].forEach(id => {
      if (map.getLayer(id)) map.removeLayer(id);
    });
    if (map.getSource('flight-path-src')) map.removeSource('flight-path-src');

    // Remove existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Remove existing circle layers
    for (let i = 0; i < 2; i++) {
      if (map.getLayer(`circle-overlay-${i}`)) map.removeLayer(`circle-overlay-${i}`);
      if (map.getLayer(`circle-glow-${i}`)) map.removeLayer(`circle-glow-${i}`);
      if (map.getLayer(`circle-outline-${i}`)) map.removeLayer(`circle-outline-${i}`);
      if (map.getSource(`circle-${i}`)) map.removeSource(`circle-${i}`);
      if (map.getSource(`circle-overlay-src-${i}`)) map.removeSource(`circle-overlay-src-${i}`);
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

    // Add destination marker (red pin)
    if (destination) {
      const destEl = document.createElement('div');
      destEl.innerHTML = `
        <svg width="28" height="40" viewBox="0 0 28 40">
          <path d="M14 0 C6.3 0 0 6.3 0 14 C0 24.5 14 40 14 40 S28 24.5 28 14 C28 6.3 21.7 0 14 0Z"
                fill="#ef4444" stroke="#7f1d1d" stroke-width="1"/>
          <circle cx="14" cy="14" r="6" fill="white"/>
        </svg>
      `;
      const destMarker = new mapboxgl.Marker({ element: destEl, anchor: 'bottom' })
        .setLngLat([destination.lng, destination.lat])
        .addTo(map);
      markersRef.current.push(destMarker);
    }

    // Add range circles
    rings.forEach((range, index) => {
      const rangeKm = nmToKm(range);
      const circleGeoJSON = createCircleGeoJSON(origin.lng, origin.lat, rangeKm, 360);

      map.addSource(`circle-${index}`, {
        type: 'geojson',
        data: circleGeoJSON,
      });

      // Dark overlay outside the range circle (dims unreachable areas)
      const overlayGeoJSON = createOutsideOverlayGeoJSON(origin.lng, origin.lat, rangeKm, 360);
      if (overlayGeoJSON) {
        map.addSource(`circle-overlay-src-${index}`, {
          type: 'geojson',
          data: overlayGeoJSON,
        });
        map.addLayer({
          id: `circle-overlay-${index}`,
          type: 'fill',
          source: `circle-overlay-src-${index}`,
          paint: {
            'fill-color': '#0f172a',
            'fill-opacity': index === 0 ? 0.35 : 0.2,
          },
        });
      }

      // Glow layer — soft wide blur behind the crisp outline
      map.addLayer({
        id: `circle-glow-${index}`,
        type: 'line',
        source: `circle-${index}`,
        paint: {
          'line-color': '#EF4444',
          'line-width': 10,
          'line-opacity': 0.18,
          'line-blur': 6,
        },
      });

      // Crisp outline on top
      map.addLayer({
        id: `circle-outline-${index}`,
        type: 'line',
        source: `circle-${index}`,
        paint: {
          'line-color': ringColors[index] || '#EF4444',
          'line-width': index > 0 ? 1.5 : 2.5,
          'line-dasharray': index > 0 ? [2, 2] : [1, 0],
        },
      });
    });

    // --- Flight path arc & animation ---
    if (destination) {
      const arcGeoJSON = interpolateGreatCircle(
        origin.lng, origin.lat,
        destination.lng, destination.lat,
        200
      );
      const arcCoords = arcGeoJSON.geometry.coordinates;

      // Skip if origin === destination
      if (arcCoords.length > 1) {
        const rangeKm = nmToKm(effectiveRange);
        const boundaryIdx = findRangeBoundaryIndex(arcCoords, origin.lng, origin.lat, rangeKm);
        const isInRange = boundaryIdx >= arcCoords.length - 1;

        // For the visible path line: full arc if in range, truncated if out of range
        const visibleCoords = isInRange ? arcCoords : arcCoords.slice(0, boundaryIdx + 1);
        const pathGeoJSON = {
          type: 'Feature',
          properties: {},
          geometry: { type: 'LineString', coordinates: visibleCoords },
        };

        map.addSource('flight-path-src', { type: 'geojson', data: pathGeoJSON });

        // Flight path glow
        map.addLayer({
          id: 'flight-path-glow',
          type: 'line',
          source: 'flight-path-src',
          paint: {
            'line-color': '#38bdf8',
            'line-width': 6,
            'line-opacity': 0.25,
            'line-blur': 4,
          },
        });

        // Flight path crisp dashed line
        map.addLayer({
          id: 'flight-path-line',
          type: 'line',
          source: 'flight-path-src',
          paint: {
            'line-color': '#38bdf8',
            'line-width': 2,
            'line-opacity': 0.8,
            'line-dasharray': [4, 3],
          },
        });

        // --- Animation ---
        if (!reducedMotion) {
          const endIdx = isInRange ? arcCoords.length - 1 : boundaryIdx;

          // Create jet marker with glow
          // Use a container → inner element structure so Mapbox can manage
          // the container's transform for positioning while we control
          // the inner element's transform for rotation.
          const jetContainer = document.createElement('div');
          jetContainer.style.cssText = 'width:48px;height:48px;';
          const jetInner = document.createElement('div');
          jetInner.innerHTML = JET_SVG;
          jetInner.style.cssText = 'width:48px;height:48px;will-change:transform;';
          jetContainer.appendChild(jetInner);
          const jetMarker = new mapboxgl.Marker({ element: jetContainer, anchor: 'center' })
            .setLngLat(arcCoords[0])
            .addTo(map);
          fa.jetMarker = jetMarker;

          const FLIGHT_DURATION_MS = 10000;
          const HOLD_DURATION_MS = 2500;
          let startTime = null;
          let phase = 'flying';
          let holdStart = null;
          let radarShown = false;

          // Lerp helper for sub-index smooth interpolation
          const lerpCoord = (coordA, coordB, frac) => [
            coordA[0] + (coordB[0] - coordA[0]) * frac,
            coordA[1] + (coordB[1] - coordA[1]) * frac,
          ];

          const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;

            if (phase === 'flying') {
              const elapsed = timestamp - startTime;
              // Ease-in-out for natural acceleration/deceleration
              const tLinear = Math.min(elapsed / FLIGHT_DURATION_MS, 1);
              const t = tLinear < 0.5
                ? 2 * tLinear * tLinear
                : 1 - Math.pow(-2 * tLinear + 2, 2) / 2;

              const exactIdx = t * endIdx;
              const floorIdx = Math.min(Math.floor(exactIdx), endIdx);
              const ceilIdx = Math.min(floorIdx + 1, endIdx);
              const frac = exactIdx - floorIdx;

              // Smooth sub-index interpolation
              const currentPos = floorIdx === ceilIdx
                ? arcCoords[floorIdx]
                : lerpCoord(arcCoords[floorIdx], arcCoords[ceilIdx], frac);

              jetMarker.setLngLat(currentPos);

              // Rotate jet to face travel direction using lookahead
              const lookAheadIdx = Math.min(ceilIdx + 1, arcCoords.length - 1);
              const bearing = calculateBearing(
                currentPos[0], currentPos[1],
                arcCoords[lookAheadIdx][0], arcCoords[lookAheadIdx][1]
              );
              jetInner.style.transform = `rotate(${bearing}deg)`;

              if (tLinear >= 1) {
                if (isInRange) {
                  // Loop continuously
                  startTime = timestamp;
                } else {
                  // Switch to hold phase at boundary
                  phase = 'holding';
                  holdStart = timestamp;
                  if (!radarShown) {
                    showRadarPulse(map, arcCoords[endIdx], fa);
                    radarShown = true;
                  }
                }
              }
            } else if (phase === 'holding') {
              if (timestamp - holdStart >= HOLD_DURATION_MS) {
                // Reset for next loop
                phase = 'flying';
                startTime = timestamp;
                radarShown = false;
                // Remove radar + popup for fresh loop
                if (fa.radarMarker) { fa.radarMarker.remove(); fa.radarMarker = null; }
                if (fa.popup) { fa.popup.remove(); fa.popup = null; }
              }
            }

            fa.animId = requestAnimationFrame(animate);
          };

          fa.animId = requestAnimationFrame(animate);
        } else {
          // Reduced motion: static indicators for out-of-range
          if (!isInRange) {
            const stopCoord = arcCoords[boundaryIdx] || arcCoords[arcCoords.length - 1];
            showStaticRadar(map, stopCoord, fa);
          }
        }
      }
    }

    // Fly to origin with dynamic zoom based on range
    const dynamicZoom = calculateZoomForRadius(nmToKm(effectiveRange), origin.lat);
    map.flyTo({
      center: [origin.lng, origin.lat],
      zoom: dynamicZoom,
      duration: 1000,
    });
  }, [origin, destination, rings, ringColors, effectiveRange, reducedMotion]);

  return (
    <div className="h-[calc(100vh-3.5rem)] lg:h-[calc(100vh-4rem)] bg-slate-950 flex flex-col lg:flex-row overflow-hidden">
      {/* Left Control Panel */}
      <div className="lg:w-96 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-r border-slate-800 flex-shrink-0 overflow-y-auto max-h-[40vh] lg:max-h-full">
        <div className="p-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <MapIcon className="w-4 h-4 text-sky-400" />
            <h1 className="text-lg font-semibold text-white">Range Map</h1>
          </div>
          <p className="text-slate-500 text-xs mt-1 pl-[26px]">
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
            <FeatureGate requiredTier="enthusiast" feature="Origin selection" mode="lock">
              <AirportSearchSelect
                value={origin}
                onValueChange={setOrigin}
                placeholder="Search origin airport..."
              />
            </FeatureGate>
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

          {/* Aircraft Selector */}
          <div>
            <Label className="text-slate-300 text-sm font-medium mb-2 block flex items-center gap-2">
              <Plane className="w-4 h-4 text-sky-400" />
              Aircraft Model
            </Label>
            <FeatureGate requiredTier="enthusiast" feature="Aircraft model selection" mode="lock">
              <AircraftSearchSelect
                aircraft={aircraft}
                value={selectedAircraftId}
                onValueChange={setSelectedAircraftId}
              />
            </FeatureGate>
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
              {/* 100% Range — always available */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <span className="text-slate-300 text-sm">100% Range</span>
                </div>
                <Switch
                  checked={showRings[0]}
                  onCheckedChange={(checked) => {
                    const newRings = [...showRings];
                    newRings[0] = checked;
                    setShowRings(newRings);
                  }}
                  aria-label="Toggle 100% Range"
                />
              </div>
              {/* 50% Range — enthusiast+ */}
              <FeatureGate requiredTier="enthusiast" feature="50% range ring" mode="lock">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <span className="text-slate-300 text-sm">50% Range</span>
                  </div>
                  <Switch
                    checked={showRings[1]}
                    onCheckedChange={(checked) => {
                      const newRings = [...showRings];
                      newRings[1] = checked;
                      setShowRings(newRings);
                    }}
                    aria-label="Toggle 50% Range"
                  />
                </div>
              </FeatureGate>
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
      <div className="flex-1 relative overflow-hidden min-h-0">
        <div
          ref={mapContainerRef}
          className="w-full h-full"
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
        <div className="absolute bottom-6 right-6 bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-xl p-4 shadow-lg z-[1000]">
          <div className="text-sm font-medium text-white mb-2">Range Legend</div>
          <div className="space-y-1.5">
            {showRings[0] && (
              <div className="flex items-center gap-2 text-xs">
                <div className="w-4 h-0.5 bg-red-500" />
                <span className="text-slate-300">100% ({effectiveRange.toLocaleString()} nm)</span>
              </div>
            )}
            {showRings[1] && (
              <div className="flex items-center gap-2 text-xs">
                <div className="w-4 h-0.5 border-t-2 border-dashed border-red-500" />
                <span className="text-slate-300">50% ({Math.round(effectiveRange * 0.5).toLocaleString()} nm)</span>
              </div>
            )}
            {destination && (
              <div className="flex items-center gap-2 text-xs">
                <div className="w-4 h-0.5 border-t-2 border-dashed border-sky-400" />
                <span className="text-slate-300">Flight Path</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Show pulsing radar rings + "Cannot reach destination" popup at the given coordinate.
 */
function showRadarPulse(map, coord, fa) {
  // Radar DOM marker with expanding rings
  const radarEl = document.createElement('div');
  radarEl.style.cssText = 'position:relative;width:80px;height:80px;pointer-events:none;';
  radarEl.innerHTML = `
    <div style="position:absolute;inset:0;border:2px solid #ef4444;border-radius:50%;animation:radar-expand 1.5s ease-out infinite;opacity:0;"></div>
    <div style="position:absolute;inset:0;border:2px solid #ef4444;border-radius:50%;animation:radar-expand 1.5s ease-out 0.5s infinite;opacity:0;"></div>
    <div style="position:absolute;inset:0;border:2px solid #ef4444;border-radius:50%;animation:radar-expand 1.5s ease-out 1s infinite;opacity:0;"></div>
    <div style="position:absolute;top:50%;left:50%;width:10px;height:10px;background:#ef4444;border-radius:50%;transform:translate(-50%,-50%);box-shadow:0 0 12px #ef4444,0 0 24px rgba(239,68,68,0.4);"></div>
  `;
  fa.radarMarker = new mapboxgl.Marker({ element: radarEl, anchor: 'center' })
    .setLngLat(coord)
    .addTo(map);

  // Popup
  fa.popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false,
    className: 'out-of-range-popup',
    anchor: 'bottom',
    offset: [0, -50],
  })
    .setLngLat(coord)
    .setHTML(`
      <div style="
        background:rgba(15,23,42,0.95);
        backdrop-filter:blur(8px);
        border:1px solid rgba(239,68,68,0.5);
        border-radius:8px;
        padding:8px 14px;
        color:#fca5a5;
        font-size:13px;
        font-weight:600;
        white-space:nowrap;
        box-shadow:0 4px 24px rgba(239,68,68,0.2);
      ">
        &#9888; Cannot reach destination
      </div>
    `)
    .addTo(map);
}

/**
 * Show a static red dot + popup for reduced motion mode.
 */
function showStaticRadar(map, coord, fa) {
  const dotEl = document.createElement('div');
  dotEl.style.cssText = 'width:12px;height:12px;background:#ef4444;border-radius:50%;box-shadow:0 0 8px #ef4444;';
  fa.radarMarker = new mapboxgl.Marker({ element: dotEl, anchor: 'center' })
    .setLngLat(coord)
    .addTo(map);

  fa.popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false,
    anchor: 'bottom',
    offset: [0, -15],
  })
    .setLngLat(coord)
    .setHTML(`
      <div style="
        background:rgba(15,23,42,0.95);
        border:1px solid rgba(239,68,68,0.5);
        border-radius:8px;
        padding:8px 14px;
        color:#fca5a5;
        font-size:13px;
        font-weight:600;
        white-space:nowrap;
      ">
        &#9888; Cannot reach destination
      </div>
    `)
    .addTo(map);
}
