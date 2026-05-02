/**
 * Create a circle GeoJSON polygon for map visualization
 * Uses geodetic calculations accounting for Earth's curvature
 */
export const createCircleGeoJSON = (
  centerLng,
  centerLat,
  radiusKm,
  points = 64
) => {
  const coords = [];
  const earthRadius = 6371; // Earth's radius in km
  const centerLatRad = (centerLat * Math.PI) / 180;
  const centerLngRad = (centerLng * Math.PI) / 180;
  const angularDist = radiusKm / earthRadius; // angular distance in radians

  let prevLng = null;
  for (let i = 0; i < points; i++) {
    const bearing = (i / points) * 2 * Math.PI;

    // Spherical law of cosines — accurate for any range up to half the globe
    const lat = Math.asin(
      Math.sin(centerLatRad) * Math.cos(angularDist) +
      Math.cos(centerLatRad) * Math.sin(angularDist) * Math.cos(bearing)
    );
    const lng = centerLngRad + Math.atan2(
      Math.sin(bearing) * Math.sin(angularDist) * Math.cos(centerLatRad),
      Math.cos(angularDist) - Math.sin(centerLatRad) * Math.sin(lat)
    );

    let lngDeg = (lng * 180) / Math.PI;
    const latDeg = (lat * 180) / Math.PI;

    // Keep polygon vertices continuous (prevent antimeridian jumps)
    const refLng = prevLng !== null ? prevLng : centerLng;
    while (lngDeg - refLng > 180) lngDeg -= 360;
    while (lngDeg - refLng < -180) lngDeg += 360;
    prevLng = lngDeg;

    coords.push([lngDeg, latDeg]);
  }

  // Close the ring exactly to prevent seam artifacts
  coords.push([coords[0][0], coords[0][1]]);

  return {
    type: "Feature",
    properties: {},
    geometry: {
      type: "Polygon",
      coordinates: [coords],
    },
  };
};

/**
 * Create a dark overlay GeoJSON covering the area OUTSIDE the range circle.
 * - Small/mid range (angularDist < 2.0): polygon-with-hole (world exterior, circle hole)
 * - Ultra-long range (angularDist >= 2.0): complement circle at antipodal point
 */
export const createOutsideOverlayGeoJSON = (centerLng, centerLat, radiusKm, points = 360) => {
  const earthRadius = 6371;
  const angularDist = radiusKm / earthRadius;

  // Ultra-long range: the reachable area covers most of the globe.
  // Render the small unreachable complement circle at the antipodal point.
  if (angularDist >= 2.0) {
    const complementDist = Math.PI - angularDist;
    if (complementDist <= 0) return null; // covers entire globe
    const antiLat = -centerLat;
    const antiLng = centerLng > 0 ? centerLng - 180 : centerLng + 180;
    const complementKm = complementDist * earthRadius;
    return createCircleGeoJSON(antiLng, antiLat, complementKm, points);
  }

  // Small/mid range: polygon-with-hole dims everything outside the circle
  const circle = createCircleGeoJSON(centerLng, centerLat, radiusKm, points);
  const circleCoords = circle.geometry.coordinates[0];

  // Dynamic outer ring that encompasses circle coords (which may exceed ±180)
  const lngs = circleCoords.map(c => c[0]);
  const minLng = Math.min(-180, Math.min(...lngs) - 10);
  const maxLng = Math.max(180, Math.max(...lngs) + 10);
  // Outer ring: counter-clockwise (GeoJSON exterior winding)
  const outerRing = [
    [minLng, -89.9], [maxLng, -89.9],
    [maxLng, 89.9], [minLng, 89.9],
    [minLng, -89.9],
  ];

  // Hole ring: must be opposite winding to outer ring.
  // createCircleGeoJSON generates clockwise coords — reverse for the hole.
  const holeCoords = [...circleCoords].reverse();

  return {
    type: "Feature",
    properties: {},
    geometry: {
      type: "Polygon",
      coordinates: [outerRing, holeCoords],
    },
  };
};

/**
 * Calculate distance between two points in km using Haversine formula
 */
export const calculateDistanceKm = (lat1, lng1, lat2, lng2) => {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

/**
 * Calculate zoom level to fit a radius circle in view
 */
export const calculateZoomForRadius = (radiusKm, latitude) => {
  const earthCircumference = 40075; // km
  const metersPerPixelAtZoom0 = (earthCircumference * 1000) / 256;
  const latRad = (latitude * Math.PI) / 180;
  const metersPerPixelAtLat = metersPerPixelAtZoom0 * Math.cos(latRad);
  const targetPixels = 300;
  const diameterMeters = radiusKm * 2 * 1000;
  const metersPerPixel = diameterMeters / targetPixels;
  const zoom = Math.log2(metersPerPixelAtLat / metersPerPixel);
  return Math.max(1, Math.min(15, zoom));
};

/**
 * Convert nautical miles to kilometers
 */
export const nmToKm = (nm) => nm * 1.852;

/**
 * Convert kilometers to nautical miles
 */
export const kmToNm = (km) => km / 1.852;

/**
 * Interpolate points along a great-circle arc between two coordinates.
 * Returns a GeoJSON Feature<LineString>.
 */
export const interpolateGreatCircle = (lng1, lat1, lng2, lat2, numPoints = 100) => {
  const toRad = (d) => (d * Math.PI) / 180;
  const toDeg = (r) => (r * 180) / Math.PI;

  const lat1R = toRad(lat1);
  const lng1R = toRad(lng1);
  let lat2R = toRad(lat2);
  let lng2R = toRad(lng2);

  // Angular distance (haversine)
  const dLat = lat2R - lat1R;
  const dLng = lng2R - lng1R;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1R) * Math.cos(lat2R) * Math.sin(dLng / 2) ** 2;
  const d = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // Near-zero distance: return single point
  if (d < 1e-10) {
    return {
      type: 'Feature',
      properties: {},
      geometry: { type: 'LineString', coordinates: [[lng1, lat1]] },
    };
  }

  // Near-antipodal: nudge to avoid Slerp singularity
  if (d > Math.PI - 1e-3) {
    lng2R += toRad(0.01);
  }

  const coords = [];
  let prevLng = null;
  const sinD = Math.sin(d);

  for (let i = 0; i <= numPoints; i++) {
    const f = i / numPoints;
    const A = Math.sin((1 - f) * d) / sinD;
    const B = Math.sin(f * d) / sinD;

    const x = A * Math.cos(lat1R) * Math.cos(lng1R) + B * Math.cos(lat2R) * Math.cos(lng2R);
    const y = A * Math.cos(lat1R) * Math.sin(lng1R) + B * Math.cos(lat2R) * Math.sin(lng2R);
    const z = A * Math.sin(lat1R) + B * Math.sin(lat2R);

    const latDeg = toDeg(Math.atan2(z, Math.sqrt(x * x + y * y)));
    let lngDeg = toDeg(Math.atan2(y, x));

    // Antimeridian continuity
    const ref = prevLng !== null ? prevLng : lng1;
    while (lngDeg - ref > 180) lngDeg -= 360;
    while (lngDeg - ref < -180) lngDeg += 360;
    prevLng = lngDeg;

    coords.push([lngDeg, latDeg]);
  }

  return {
    type: 'Feature',
    properties: {},
    geometry: { type: 'LineString', coordinates: coords },
  };
};

/**
 * Calculate initial bearing (forward azimuth) between two points.
 * Returns degrees 0-360, clockwise from north.
 */
export const calculateBearing = (lng1, lat1, lng2, lat2) => {
  const toRad = (d) => (d * Math.PI) / 180;
  const lat1R = toRad(lat1);
  const lat2R = toRad(lat2);
  const dLngR = toRad(lng2 - lng1);

  const y = Math.sin(dLngR) * Math.cos(lat2R);
  const x =
    Math.cos(lat1R) * Math.sin(lat2R) -
    Math.sin(lat1R) * Math.cos(lat2R) * Math.cos(dLngR);

  const bearing = (Math.atan2(y, x) * 180) / Math.PI;
  return (bearing + 360) % 360;
};

/**
 * Find the index in an arc coordinate array where distance from origin exceeds rangeKm.
 * Returns arcCoords.length - 1 if destination is within range.
 */
export const findRangeBoundaryIndex = (arcCoords, originLng, originLat, rangeKm) => {
  for (let i = 0; i < arcCoords.length; i++) {
    const dist = calculateDistanceKm(originLat, originLng, arcCoords[i][1], arcCoords[i][0]);
    if (dist > rangeKm) return i;
  }
  return arcCoords.length - 1;
};
