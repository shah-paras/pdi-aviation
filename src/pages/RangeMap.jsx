import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Map as MapIcon, Plane, MapPin, X,
  Target, Ruler, Info, Layers, Plus
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

/**
 * Remove all multi-route arc layers and sources from the map.
 * Safe to call even if layers/sources don't exist.
 */
function cleanupMultiLayers(map) {
  for (let i = 0; i < 6; i++) {
    ['multi-arc-glow-', 'multi-arc-line-'].forEach(prefix => {
      if (map.getLayer(prefix + i)) map.removeLayer(prefix + i);
    });
    if (map.getSource('multi-arc-src-' + i)) map.removeSource('multi-arc-src-' + i);
  }
}

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
  const [fuelCapacity, setFuelCapacity] = useState('');
  const [fuelBurnRate, setFuelBurnRate] = useState('');

  // Tab state
  const [activeMapTab, setActiveMapTab] = useState('single');
  const [styleVersion, setStyleVersion] = useState(0);

  // Multi-region state
  const [multiOrigin, setMultiOrigin] = useState(null);
  const [multiAircraftId, setMultiAircraftId] = useState('');
  const [multiWaypoints, setMultiWaypoints] = useState([null]);
  const [multiFuelCapacity, setMultiFuelCapacity] = useState('');
  const [multiBurnRate, setMultiBurnRate] = useState('');
  const [multiPlotted, setMultiPlotted] = useState(false);

  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const flightAnimRef = useRef({ jetMarker: null, radarMarker: null, popup: null, animId: null });
  const multiFlightAnimRef = useRef({ animId: null, jetMarker: null });
  const multiMarkersRef = useRef([]);

  const reducedMotion = useReducedMotion();

  // Filter to FW aircraft with range data for range visualization
  const aircraft = useMemo(() =>
    aircraftModels.filter(a =>
      a.type === 'FW' && a.max_range_nm && a.max_range_nm > 0
    ),
    [aircraftModels]
  );

  const selectedAircraft = aircraft.find(a => a.id === selectedAircraftId);
  const maxRange = selectedAircraft?.max_range_nm ?? 0;
  const effectiveRange = maxRange * (rangePercentage / 100);

  // Multi-region derived
  const multiAircraft = aircraft.find(a => a.id === multiAircraftId);

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

  // Multi-leg range statuses
  const multiLegStatuses = useMemo(() => {
    const stops = [multiOrigin, ...multiWaypoints].filter(Boolean);
    if (stops.length < 2 || !multiAircraft) return [];
    return stops.slice(1).map((stop, i) => {
      const prev = stops[i];
      const dist = calculateDistance(prev.lat, prev.lng, stop.lat, stop.lng);
      const range = multiAircraft.max_range_nm;
      const fuelRange = multiFuelCapacity && multiBurnRate
        ? Math.round((Number(multiFuelCapacity) / Number(multiBurnRate)) * (multiAircraft.cruise_speed_ktas || 450))
        : null;
      if (fuelRange && dist > fuelRange) return { status: 'fuel', dist };
      if (dist > range) return { status: 'outofrange', dist };
      if (dist > range * 0.85) return { status: 'marginal', dist };
      return { status: 'ok', dist };
    });
  }, [multiOrigin, multiWaypoints, multiAircraft, multiFuelCapacity, multiBurnRate]);

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
      setStyleVersion(v => v + 1);
    });

    return () => {
      map.remove();
    };
  }, []);

  // Update map style
  useEffect(() => {
    if (!mapRef.current) return;
    mapRef.current.setStyle(mapStyles[mapStyle]);
    mapRef.current.once('style.load', () => setStyleVersion(v => v + 1));
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

    // Remove flight path layers/sources (including trail)
    ['flight-path-glow', 'flight-path-line', 'flight-trail-line'].forEach(id => {
      if (map.getLayer(id)) map.removeLayer(id);
    });
    ['flight-path-src', 'flight-trail-src'].forEach(id => {
      if (map.getSource(id)) map.removeSource(id);
    });

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

    // Tab-aware origin/aircraft — circles render on BOTH tabs
    const isMulti = activeMapTab === 'multi';
    const circleOrigin = isMulti ? multiOrigin : origin;
    const circleAC = isMulti ? multiAircraft : selectedAircraft;
    const circleRange = isMulti
      ? (circleAC?.max_range_nm ?? 0)
      : effectiveRange;
    const circleShowRings = isMulti ? [!!circleAC, false] : showRings;

    if (!circleOrigin) return;

    // Single-route markers (origin + destination)
    if (!isMulti) {
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
    }

    // Range circles — drawn on both tabs from the active origin/aircraft
    if (circleAC) {
      const ringDefs = [
        { range: circleRange, active: circleShowRings[0] },
        { range: circleRange * 0.5, active: circleShowRings[1] },
      ];
      const outermostActiveIdx = circleShowRings[0] ? 0 : circleShowRings[1] ? 1 : -1;

      ringDefs.forEach((def, index) => {
        if (!def.active) return;

        const rangeKm = nmToKm(def.range);
        const circleGeoJSON = createCircleGeoJSON(circleOrigin.lng, circleOrigin.lat, rangeKm, 360);

        map.addSource(`circle-${index}`, {
          type: 'geojson',
          data: circleGeoJSON,
        });

        if (index === outermostActiveIdx) {
          const overlayGeoJSON = createOutsideOverlayGeoJSON(circleOrigin.lng, circleOrigin.lat, rangeKm, 360);
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
                'fill-opacity': 0.35,
              },
            });
          }
        }

        map.addLayer({
          id: `circle-glow-${index}`,
          type: 'line',
          source: `circle-${index}`,
          paint: {
            'line-color': '#EF4444',
            'line-width': 6,
            'line-opacity': 0.15,
            'line-blur': 8,
          },
        });

        map.addLayer({
          id: `circle-outline-${index}`,
          type: 'line',
          source: `circle-${index}`,
          paint: {
            'line-color': RING_COLORS[index] || '#EF4444',
            'line-width': index > 0 ? 1.5 : 2.5,
            'line-dasharray': index > 0 ? [2, 2] : [1, 0],
          },
        });
      });
    }

    // Flight path arc & animation — single route only
    if (!isMulti && destination) {
      const arcGeoJSON = interpolateGreatCircle(
        origin.lng, origin.lat,
        destination.lng, destination.lat,
        200
      );
      const arcCoords = arcGeoJSON.geometry.coordinates;

      if (arcCoords.length > 1) {
        const rangeKm = nmToKm(effectiveRange);
        const boundaryIdx = findRangeBoundaryIndex(arcCoords, origin.lng, origin.lat, rangeKm);
        const isInRange = boundaryIdx >= arcCoords.length - 1;

        const visibleCoords = isInRange ? arcCoords : arcCoords.slice(0, boundaryIdx + 1);
        const pathGeoJSON = {
          type: 'Feature',
          properties: {},
          geometry: { type: 'LineString', coordinates: visibleCoords },
        };

        map.addSource('flight-path-src', { type: 'geojson', data: pathGeoJSON });

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

        map.addSource('flight-trail-src', {
          type: 'geojson',
          data: { type: 'Feature', geometry: { type: 'LineString', coordinates: [] } }
        });
        map.addLayer({
          id: 'flight-trail-line',
          type: 'line',
          source: 'flight-trail-src',
          paint: { 'line-color': '#7dd3fc', 'line-width': 2.5, 'line-opacity': 0.6 },
        });

        if (!reducedMotion) {
          const endIdx = isInRange ? arcCoords.length - 1 : boundaryIdx;

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

          const lerpCoord = (coordA, coordB, frac) => [
            coordA[0] + (coordB[0] - coordA[0]) * frac,
            coordA[1] + (coordB[1] - coordA[1]) * frac,
          ];

          const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;

            if (phase === 'flying') {
              const elapsed = timestamp - startTime;
              const tLinear = Math.min(elapsed / FLIGHT_DURATION_MS, 1);
              const t = tLinear < 0.5
                ? 4 * tLinear * tLinear * tLinear
                : 1 - Math.pow(-2 * tLinear + 2, 3) / 2;

              const exactIdx = t * endIdx;
              const floorIdx = Math.min(Math.floor(exactIdx), endIdx);
              const ceilIdx = Math.min(floorIdx + 1, endIdx);
              const frac = exactIdx - floorIdx;

              const currentPos = floorIdx === ceilIdx
                ? arcCoords[floorIdx]
                : lerpCoord(arcCoords[floorIdx], arcCoords[ceilIdx], frac);

              jetMarker.setLngLat(currentPos);

              map.getSource('flight-trail-src')?.setData({
                type: 'Feature',
                geometry: { type: 'LineString', coordinates: arcCoords.slice(0, floorIdx + 1) }
              });

              const lookAheadIdx = Math.min(ceilIdx + 1, arcCoords.length - 1);
              const bearing = calculateBearing(
                currentPos[0], currentPos[1],
                arcCoords[lookAheadIdx][0], arcCoords[lookAheadIdx][1]
              );
              jetInner.style.transform = `rotate(${bearing}deg)`;

              if (tLinear >= 1) {
                if (isInRange) {
                  startTime = timestamp;
                } else {
                  phase = 'holding';
                  holdStart = timestamp;
                  if (!radarShown) {
                    showRadarPulse(map, arcCoords[endIdx], fa, {
                      distance: distanceToDestination,
                      range: effectiveRange,
                    });
                    radarShown = true;
                  }
                }
              }
            } else if (phase === 'holding') {
              if (timestamp - holdStart >= HOLD_DURATION_MS) {
                phase = 'flying';
                startTime = timestamp;
                radarShown = false;
                if (fa.radarMarker) { fa.radarMarker.remove(); fa.radarMarker = null; }
                if (fa.popup) { fa.popup.remove(); fa.popup = null; }
              }
            }

            fa.animId = requestAnimationFrame(animate);
          };

          fa.animId = requestAnimationFrame(animate);
        } else {
          if (!isInRange) {
            const stopCoord = arcCoords[boundaryIdx] || arcCoords[arcCoords.length - 1];
            showStaticRadar(map, stopCoord, fa, {
              distance: distanceToDestination,
              range: effectiveRange,
            });
          }
        }
      }
    }

    // Fly to active origin with dynamic zoom based on range
    const zoomRange = circleAC ? circleRange : 2000;
    const dynamicZoom = calculateZoomForRadius(nmToKm(zoomRange), circleOrigin.lat);
    map.flyTo({
      center: [circleOrigin.lng, circleOrigin.lat],
      zoom: dynamicZoom,
      duration: 1000,
    });
  }, [origin, destination, showRings, effectiveRange, reducedMotion, selectedAircraftId, mapStyle, styleVersion, activeMapTab, multiOrigin, multiAircraftId]);

  // Multi-region route plotting
  const plotMultiRoute = useCallback(() => {
    const map = mapRef.current;
    if (!map || !multiOrigin || !multiAircraft) return;
    const filledWaypoints = multiWaypoints.filter(Boolean);
    if (filledWaypoints.length === 0) return;

    // Cancel existing animation
    const mfa = multiFlightAnimRef.current;
    if (mfa.animId) { cancelAnimationFrame(mfa.animId); mfa.animId = null; }
    if (mfa.jetMarker) { mfa.jetMarker.remove(); mfa.jetMarker = null; }

    cleanupMultiLayers(map);
    multiMarkersRef.current.forEach(m => m.remove());
    multiMarkersRef.current = [];

    const allStops = [multiOrigin, ...filledWaypoints];

    // PDI pin at origin
    const originEl = document.createElement('div');
    originEl.innerHTML = `<div class="w-10 h-10 rounded-full border-2 border-white shadow-lg overflow-hidden"><img src="/pdi-logo.png" alt="PDI" class="w-full h-full object-cover" /></div>`;
    const multiOriginMarker = new mapboxgl.Marker({ element: originEl }).setLngLat([multiOrigin.lng, multiOrigin.lat]).addTo(map);
    multiMarkersRef.current.push(multiOriginMarker);

    // Destination pins + arcs
    const allArcCoords = [];
    allStops.slice(1).forEach((stop, i) => {
      const prev = allStops[i];
      const legStatus = multiLegStatuses[i]?.status || 'ok';
      const lineColor = (legStatus === 'outofrange' || legStatus === 'fuel') ? '#f87171' : '#38bdf8';

      const destEl = document.createElement('div');
      destEl.innerHTML = `<svg width="22" height="32" viewBox="0 0 28 40"><path d="M14 0 C6.3 0 0 6.3 0 14 C0 24.5 14 40 14 40 S28 24.5 28 14 C28 6.3 21.7 0 14 0Z" fill="${lineColor}" stroke="rgba(0,0,0,0.3)" stroke-width="1"/><circle cx="14" cy="14" r="6" fill="white"/></svg>`;
      const destMarker = new mapboxgl.Marker({ element: destEl, anchor: 'bottom' }).setLngLat([stop.lng, stop.lat]).addTo(map);
      multiMarkersRef.current.push(destMarker);

      const arcGeoJSON = interpolateGreatCircle(prev.lng, prev.lat, stop.lng, stop.lat, 200);
      const arcCoords = arcGeoJSON.geometry.coordinates;
      allArcCoords.push(arcCoords);

      map.addSource('multi-arc-src-' + i, { type: 'geojson', data: arcGeoJSON });
      map.addLayer({ id: 'multi-arc-glow-' + i, type: 'line', source: 'multi-arc-src-' + i,
        paint: { 'line-color': lineColor, 'line-width': 6, 'line-opacity': 0.2, 'line-blur': 4 } });
      map.addLayer({ id: 'multi-arc-line-' + i, type: 'line', source: 'multi-arc-src-' + i,
        paint: { 'line-color': lineColor, 'line-width': 1.8, 'line-opacity': 0.8, 'line-dasharray': [4, 3] } });

      if (legStatus === 'outofrange' || legStatus === 'fuel') {
        const legDist = multiLegStatuses[i]?.dist;
        const legRange = multiAircraft.max_range_nm;
        const rangeKm = nmToKm(legRange);
        const boundaryIdx = findRangeBoundaryIndex(arcCoords, prev.lng, prev.lat, rangeKm);
        const boundaryCoord = arcCoords[Math.min(boundaryIdx, arcCoords.length - 1)];
        const label = legStatus === 'fuel'
          ? `Leg ${i + 1}: fuel stop required`
          : `Leg ${i + 1}: out of range`;
        const popup = new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: false,
          className: 'out-of-range-popup',
          anchor: 'bottom',
          offset: [0, -10],
        })
          .setLngLat(boundaryCoord)
          .setHTML(buildPopupHTML({ distance: legDist, range: legRange, label }))
          .addTo(map);
        const dotEl = document.createElement('div');
        dotEl.style.cssText = 'width:10px;height:10px;background:#ef4444;border-radius:50%;box-shadow:0 0 8px #ef4444;';
        const dotMarker = new mapboxgl.Marker({ element: dotEl, anchor: 'center' })
          .setLngLat(boundaryCoord)
          .addTo(map);
        multiMarkersRef.current.push(dotMarker);
        multiMarkersRef.current.push({ remove: () => popup.remove() });
      }
    });

    // Fit map to all stops
    if (allStops.length > 1) {
      const lngs = allStops.map(s => s.lng);
      const lats = allStops.map(s => s.lat);
      map.fitBounds([[Math.min(...lngs), Math.min(...lats)], [Math.max(...lngs), Math.max(...lats)]], { padding: 80, duration: 1000 });
    }

    setMultiPlotted(true);

    if (reducedMotion || allArcCoords.length === 0) return;

    // Create jet marker
    const jetContainer = document.createElement('div');
    jetContainer.style.cssText = 'width:48px;height:48px;';
    const jetInner = document.createElement('div');
    jetInner.innerHTML = JET_SVG;
    jetInner.style.cssText = 'width:48px;height:48px;will-change:transform;';
    jetContainer.appendChild(jetInner);
    const jetMarker = new mapboxgl.Marker({ element: jetContainer, anchor: 'center' })
      .setLngLat(allArcCoords[0][0])
      .addTo(map);
    mfa.jetMarker = jetMarker;

    const FLIGHT_DURATION_MS = 8000;
    const HOLD_MS = 1000;
    let legIdx = 0;
    let startTime = null;
    let holding = false;
    let holdStart = null;

    const lerpCoord = (a, b, f) => [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f];

    const animateMulti = (timestamp) => {
      const arcCoords = allArcCoords[legIdx];
      const endIdx = arcCoords.length - 1;

      if (!startTime) startTime = timestamp;

      if (holding) {
        if (timestamp - holdStart >= HOLD_MS) {
          holding = false;
          legIdx = (legIdx + 1) % allArcCoords.length;
          startTime = timestamp;
        }
      } else {
        const tLinear = Math.min((timestamp - startTime) / FLIGHT_DURATION_MS, 1);
        const t = tLinear < 0.5
          ? 4 * tLinear * tLinear * tLinear
          : 1 - Math.pow(-2 * tLinear + 2, 3) / 2;

        const exactIdx = t * endIdx;
        const floorIdx = Math.min(Math.floor(exactIdx), endIdx);
        const ceilIdx = Math.min(floorIdx + 1, endIdx);
        const frac = exactIdx - floorIdx;
        const currentPos = floorIdx === ceilIdx ? arcCoords[floorIdx] : lerpCoord(arcCoords[floorIdx], arcCoords[ceilIdx], frac);

        jetMarker.setLngLat(currentPos);
        const lookAheadIdx = Math.min(ceilIdx + 1, endIdx);
        const bearing = calculateBearing(currentPos[0], currentPos[1], arcCoords[lookAheadIdx][0], arcCoords[lookAheadIdx][1]);
        jetInner.style.transform = `rotate(${bearing}deg)`;

        if (tLinear >= 1) {
          holding = true;
          holdStart = timestamp;
        }
      }

      mfa.animId = requestAnimationFrame(animateMulti);
    };

    mfa.animId = requestAnimationFrame(animateMulti);
  }, [multiOrigin, multiAircraft, multiWaypoints, multiLegStatuses, reducedMotion]);

  // Cleanup multi-region animation when switching away from multi tab
  useEffect(() => {
    if (activeMapTab !== 'multi') {
      const mfa = multiFlightAnimRef.current;
      if (mfa.animId) { cancelAnimationFrame(mfa.animId); mfa.animId = null; }
      if (mfa.jetMarker) { mfa.jetMarker.remove(); mfa.jetMarker = null; }
      if (mapRef.current) cleanupMultiLayers(mapRef.current);
      multiMarkersRef.current.forEach(m => m.remove());
      multiMarkersRef.current = [];
      setMultiPlotted(false);
    }
  }, [activeMapTab]);

  return (
    <div className="h-[calc(100vh-3.5rem)] lg:h-[calc(100vh-4rem)] bg-slate-950 flex flex-col lg:flex-row overflow-hidden">
      {/* Left Control Panel */}
      <div className="lg:w-96 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-r border-slate-800 flex-shrink-0 overflow-y-auto max-h-[40vh] lg:max-h-full">
        <Tabs value={activeMapTab} onValueChange={setActiveMapTab} className="flex flex-col h-full">
          {/* Header + Tab switcher */}
          <div className="p-4 border-b border-slate-800">
            <div className="flex items-center gap-2.5 mb-3">
              <MapIcon className="w-4 h-4 text-sky-400" />
              <h1 className="text-lg font-semibold text-white">Range Map</h1>
            </div>
            <TabsList className="w-full bg-slate-800/80 border border-slate-700">
              <TabsTrigger value="single" className="flex-1 text-xs data-[state=active]:bg-slate-700 data-[state=active]:text-white text-slate-400">
                Single Route
              </TabsTrigger>
              <TabsTrigger value="multi" className="flex-1 text-xs data-[state=active]:bg-slate-700 data-[state=active]:text-white text-slate-400">
                Multi-Region
              </TabsTrigger>
            </TabsList>
          </div>

          {/* ── Single Route Tab ── */}
          <TabsContent value="single" className="flex-1 overflow-y-auto m-0">
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

              {/* Fuel Check */}
              {selectedAircraft && (
                <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/50">
                  <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-3 flex items-center gap-2">
                    <span>⛽</span> Fuel Check <span className="text-slate-600 font-normal normal-case">(optional)</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                      <label className="text-slate-500 text-xs mb-1 block">Capacity (gal)</label>
                      <input
                        type="number"
                        min="0"
                        step="10"
                        placeholder="e.g. 1054"
                        value={fuelCapacity}
                        onChange={e => setFuelCapacity(e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-sky-500"
                      />
                    </div>
                    <div>
                      <label className="text-slate-500 text-xs mb-1 block">Burn Rate (gal/hr)</label>
                      <input
                        type="number"
                        min="0"
                        step="5"
                        placeholder="e.g. 248"
                        value={fuelBurnRate}
                        onChange={e => setFuelBurnRate(e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-sky-500"
                      />
                    </div>
                  </div>
                  {fuelCapacity && fuelBurnRate && (() => {
                    const maxFuelRangeNm = Math.round(
                      (Number(fuelCapacity) / Number(fuelBurnRate)) * (selectedAircraft.cruise_speed_ktas || 450)
                    );
                    if (!destination || distanceToDestination === null) {
                      return (
                        <div className="text-xs text-slate-500">
                          Max on-tank range: <span className="text-slate-300">{maxFuelRangeNm.toLocaleString()} nm</span>
                        </div>
                      );
                    }
                    const viable = distanceToDestination <= maxFuelRangeNm;
                    const marginal = !viable && distanceToDestination <= maxFuelRangeNm * 1.15;
                    return (
                      <div className={`text-xs flex items-center gap-2 ${viable ? 'text-emerald-400' : marginal ? 'text-amber-400' : 'text-red-400'}`}>
                        <span>{viable ? '✓' : marginal ? '⚠' : '✗'}</span>
                        <span>
                          {viable
                            ? `Single-tank viable — fuel range ${maxFuelRangeNm.toLocaleString()} nm`
                            : `Fuel stop required — max ${maxFuelRangeNm.toLocaleString()} nm`}
                        </span>
                      </div>
                    );
                  })()}
                </div>
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
          </TabsContent>

          {/* ── Multi-Region Tab ── */}
          <TabsContent value="multi" className="flex-1 overflow-y-auto m-0">
            <FeatureGate requiredTier="insider" feature="Multi-city range planning" mode="blur">
              <div className="p-6 space-y-5">

                {/* Origin */}
                <div>
                  <Label className="text-slate-300 text-sm font-medium mb-2 block flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-sky-400" /> Origin Airport
                  </Label>
                  <AirportSearchSelect value={multiOrigin} onValueChange={setMultiOrigin} placeholder="Search origin airport..." />
                </div>

                {/* Aircraft */}
                <div>
                  <Label className="text-slate-300 text-sm font-medium mb-2 block flex items-center gap-2">
                    <Plane className="w-4 h-4 text-sky-400" /> Aircraft Model
                  </Label>
                  <AircraftSearchSelect aircraft={aircraft} value={multiAircraftId} onValueChange={setMultiAircraftId} />
                </div>

                {/* Waypoints */}
                <div>
                  <Label className="text-slate-300 text-sm font-medium mb-2 block">Stops (up to 5)</Label>
                  <div className="space-y-2">
                    {multiWaypoints.map((wp, idx) => {
                      const legStatus = multiLegStatuses[idx];
                      return (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="flex-1">
                            <AirportSearchSelect
                              value={wp}
                              onValueChange={val => {
                                const next = [...multiWaypoints];
                                next[idx] = val;
                                setMultiWaypoints(next);
                              }}
                              placeholder={`Stop ${idx + 1}...`}
                              excludeCode={multiOrigin?.code}
                            />
                          </div>
                          {legStatus && (
                            <span className={`text-xs font-medium shrink-0 ${
                              legStatus.status === 'ok' ? 'text-emerald-400' :
                              legStatus.status === 'marginal' ? 'text-amber-400' : 'text-red-400'
                            }`}>
                              {legStatus.status === 'ok' ? '✓' : legStatus.status === 'marginal' ? '⚠' : legStatus.status === 'fuel' ? '⛽' : '✗'}
                              {' '}{Math.round(legStatus.dist)} nm
                            </span>
                          )}
                          {multiWaypoints.length > 1 && (
                            <button
                              onClick={() => setMultiWaypoints(multiWaypoints.filter((_, i) => i !== idx))}
                              className="w-8 h-8 flex items-center justify-center rounded-md bg-slate-800 border border-slate-700 text-slate-500 hover:text-white hover:bg-slate-700 transition-colors shrink-0"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  {multiWaypoints.length < 5 && (
                    <button
                      onClick={() => setMultiWaypoints([...multiWaypoints, null])}
                      className="mt-2 flex items-center gap-1.5 text-sky-400 hover:text-sky-300 text-xs font-medium transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Stop
                    </button>
                  )}
                </div>

                {/* Fuel Check for Multi */}
                <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/50">
                  <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-3">⛽ Fuel Check (optional)</div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-slate-500 text-xs mb-1 block">Capacity (gal)</label>
                      <input type="number" min="0" step="10" placeholder="e.g. 1054" value={multiFuelCapacity} onChange={e => setMultiFuelCapacity(e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-sky-500" />
                    </div>
                    <div>
                      <label className="text-slate-500 text-xs mb-1 block">Burn Rate (gal/hr)</label>
                      <input type="number" min="0" step="5" placeholder="e.g. 248" value={multiBurnRate} onChange={e => setMultiBurnRate(e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-sky-500" />
                    </div>
                  </div>
                </div>

                {/* Plot Route button */}
                <button
                  onClick={plotMultiRoute}
                  disabled={!multiOrigin || !multiAircraft || multiWaypoints.filter(Boolean).length === 0}
                  className="w-full py-3 rounded-xl bg-sky-500 hover:bg-sky-600 disabled:bg-slate-700 disabled:text-slate-500 text-white font-semibold text-sm transition-colors"
                >
                  Plot Route
                </button>

                {/* Legend */}
                {multiPlotted && (
                  <div className="text-xs text-slate-500 space-y-1">
                    <div className="flex items-center gap-2"><span className="text-emerald-400">✓</span> Reachable leg</div>
                    <div className="flex items-center gap-2"><span className="text-amber-400">⚠</span> Marginal (within 15% of limit)</div>
                    <div className="flex items-center gap-2"><span className="text-red-400">✗</span> Out of range</div>
                    <div className="flex items-center gap-2"><span className="text-red-400">⛽</span> Fuel stop required</div>
                  </div>
                )}

              </div>
            </FeatureGate>
          </TabsContent>
        </Tabs>
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
        {(() => {
          const isMulti = activeMapTab === 'multi';
          const legendAC = isMulti ? multiAircraft : selectedAircraft;
          const legendRange = isMulti ? (legendAC?.max_range_nm ?? 0) : effectiveRange;
          const legendShowRings = isMulti ? [!!legendAC && !!multiOrigin, false] : showRings;
          return (
            <div className="absolute bottom-6 right-6 bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-xl p-4 shadow-lg z-[1000]">
              <div className="text-sm font-medium text-white mb-2">Range Legend</div>
              <div className="space-y-1.5">
                {legendShowRings[0] && (
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-4 h-0.5 bg-red-500" />
                    <span className="text-slate-300">100% ({legendRange.toLocaleString()} nm)</span>
                  </div>
                )}
                {legendShowRings[1] && (
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-4 h-0.5 border-t-2 border-dashed border-red-500" />
                    <span className="text-slate-300">50% ({Math.round(legendRange * 0.5).toLocaleString()} nm)</span>
                  </div>
                )}
                {!isMulti && destination && (
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-4 h-0.5 border-t-2 border-dashed border-sky-400" />
                    <span className="text-slate-300">Flight Path</span>
                  </div>
                )}
                {isMulti && multiPlotted && (
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-4 h-0.5 border-t-2 border-dashed border-sky-400" />
                    <span className="text-slate-300">Route Legs</span>
                  </div>
                )}
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
}

function buildPopupHTML({ distance, range, label }) {
  const shortfall = distance && range ? Math.round(distance - range) : null;
  return `
    <div style="
      background:rgba(15,23,42,0.95);
      backdrop-filter:blur(12px);
      border:1px solid rgba(239,68,68,0.4);
      border-radius:10px;
      padding:10px 16px;
      color:#fca5a5;
      font-size:12px;
      white-space:nowrap;
      box-shadow:0 4px 24px rgba(239,68,68,0.25),0 0 0 1px rgba(239,68,68,0.1);
    ">
      <div style="font-weight:700;font-size:13px;margin-bottom:${shortfall ? '6px' : '0'};">
        &#9888; ${label || 'Cannot reach destination'}
      </div>
      ${shortfall ? `
        <div style="display:flex;gap:12px;color:#94a3b8;font-size:11px;">
          <span>Distance <b style="color:#f87171;">${Math.round(distance).toLocaleString()} nm</b></span>
          <span>Range <b style="color:#4ade80;">${Math.round(range).toLocaleString()} nm</b></span>
        </div>
        <div style="color:#fbbf24;font-size:11px;margin-top:4px;">
          ${shortfall.toLocaleString()} nm beyond range
        </div>
      ` : ''}
    </div>
  `;
}

function showRadarPulse(map, coord, fa, info = {}) {
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

  fa.popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false,
    className: 'out-of-range-popup',
    anchor: 'bottom',
    offset: [0, -50],
  })
    .setLngLat(coord)
    .setHTML(buildPopupHTML(info))
    .addTo(map);
}

function showStaticRadar(map, coord, fa, info = {}) {
  const dotEl = document.createElement('div');
  dotEl.style.cssText = 'width:12px;height:12px;background:#ef4444;border-radius:50%;box-shadow:0 0 8px #ef4444;';
  fa.radarMarker = new mapboxgl.Marker({ element: dotEl, anchor: 'center' })
    .setLngLat(coord)
    .addTo(map);

  fa.popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false,
    className: 'out-of-range-popup',
    anchor: 'bottom',
    offset: [0, -15],
  })
    .setLngLat(coord)
    .setHTML(buildPopupHTML(info))
    .addTo(map);
}
