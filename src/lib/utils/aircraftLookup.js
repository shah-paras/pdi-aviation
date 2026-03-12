/**
 * Aircraft model lookup utility.
 * Matches NSOP fleet aircraft to aircraftModels for pricing data.
 * Pre-computed at module load for zero per-render cost.
 */

import aircraftModels from '@/data/aircraftModels';

// Build lookup maps
const byId = new Map();
const byNameNormalized = new Map();

for (const model of aircraftModels) {
  byId.set(model.id, model);

  // Normalize model name for fuzzy matching
  const normalized = model.model.toLowerCase().replace(/[^a-z0-9]/g, '');
  byNameNormalized.set(normalized, model);

  // Also index by manufacturer + model shorthand
  const shortName = `${model.manufacturer} ${model.model}`.toLowerCase().replace(/[^a-z0-9]/g, '');
  if (!byNameNormalized.has(shortName)) {
    byNameNormalized.set(shortName, model);
  }
}

/**
 * Try to find an aircraft model match.
 * Attempts exact ID match first, then normalized name fuzzy match.
 */
export function lookupAircraftModel(modelId, modelName) {
  if (modelId && byId.has(modelId)) {
    return byId.get(modelId);
  }

  if (modelName) {
    const normalized = modelName.toLowerCase().replace(/[^a-z0-9]/g, '');

    // Exact normalized match
    if (byNameNormalized.has(normalized)) {
      return byNameNormalized.get(normalized);
    }

    // Partial match — check if any known model name is contained in the query or vice versa
    for (const [key, model] of byNameNormalized) {
      if (key.includes(normalized) || normalized.includes(key)) {
        return model;
      }
    }
  }

  return null;
}

/**
 * Get estimated USD value for an aircraft.
 * Returns new_price_usd if available, otherwise midpoint of preowned range, or null.
 */
export function getEstimatedValue(modelId, modelName) {
  const model = lookupAircraftModel(modelId, modelName);
  if (!model) return null;

  if (model.new_price_usd) return model.new_price_usd;

  if (model.preowned_price_low_usd && model.preowned_price_high_usd) {
    return Math.round((model.preowned_price_low_usd + model.preowned_price_high_usd) / 2);
  }

  return model.preowned_price_low_usd || model.preowned_price_high_usd || null;
}
