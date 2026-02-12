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

  for (let i = 0; i <= points; i++) {
    const angle = (i / points) * 2 * Math.PI;
    const latOffset =
      (radiusKm / earthRadius) * (180 / Math.PI) * Math.cos(angle);
    const lngOffset =
      ((radiusKm / earthRadius) * (180 / Math.PI) * Math.sin(angle)) /
      Math.cos((centerLat * Math.PI) / 180);

    coords.push([centerLng + lngOffset, centerLat + latOffset]);
  }

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
  return Math.max(3, Math.min(15, zoom));
};

/**
 * Convert nautical miles to kilometers
 */
export const nmToKm = (nm) => nm * 1.852;

/**
 * Convert kilometers to nautical miles
 */
export const kmToNm = (km) => km / 1.852;
