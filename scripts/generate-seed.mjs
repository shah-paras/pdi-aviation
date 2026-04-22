#!/usr/bin/env node

/**
 * Seed SQL generator for PDI Aviation data tables.
 *
 * Reads the JS data files (aircraftModels, operators, airports) and emits
 * INSERT statements to stdout.
 *
 * Usage:
 *   node scripts/generate-seed.mjs > supabase/seed.sql
 */

import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Dynamic-import the data modules (they use `export default`)
const aircraftModelsMod = await import(resolve(__dirname, '../src/data/aircraftModels.js'));
const operatorsMod = await import(resolve(__dirname, '../src/data/operators.js'));
const airportsMod = await import(resolve(__dirname, '../src/data/airports.js'));

const aircraftModels = aircraftModelsMod.default;
const operators = operatorsMod.default;
const airports = airportsMod.default;

// ── Helpers ──────────────────────────────────────────────────────────

/** Escape single quotes for SQL string literals. */
function esc(str) {
  if (str == null) return 'NULL';
  return `'${String(str).replace(/'/g, "''")}'`;
}

/** Format a JS value as an SQL literal. */
function sqlVal(v) {
  if (v === null || v === undefined) return 'NULL';
  if (typeof v === 'number') return String(v);
  if (typeof v === 'boolean') return v ? 'TRUE' : 'FALSE';
  return esc(v);
}

/** Format a date string (YYYY-MM-DD) as an SQL date literal. */
function sqlDate(v) {
  if (!v) return 'NULL';
  // Already in YYYY-MM-DD format from the JS data
  return esc(v);
}

// ── Build model ID lookup for FK validation ─────────────────────────

const validModelIds = new Set(aircraftModels.map((m) => m.id));

// ── Generate SQL ─────────────────────────────────────────────────────

const lines = [];

lines.push('-- Auto-generated seed data for PDI Aviation.');
lines.push('-- Generated: ' + new Date().toISOString());
lines.push('');
lines.push('BEGIN;');
lines.push('');

// ── aircraft_models ──────────────────────────────────────────────────

lines.push('-- aircraft_models (' + aircraftModels.length + ' rows)');
for (const m of aircraftModels) {
  lines.push(
    `INSERT INTO public.aircraft_models (id, manufacturer, model, category, type, max_pax, max_range_nm, cruise_speed_ktas, cabin_height_ft, cabin_width_ft, cabin_length_ft, engines, new_price_usd, preowned_price_low_usd, preowned_price_high_usd, production_status, notes, thumbnail_url) VALUES (${esc(m.id)}, ${esc(m.manufacturer)}, ${esc(m.model)}, ${esc(m.category)}, ${esc(m.type)}, ${sqlVal(m.max_pax)}, ${sqlVal(m.max_range_nm)}, ${sqlVal(m.cruise_speed_ktas)}, ${sqlVal(m.cabin_height_ft)}, ${sqlVal(m.cabin_width_ft)}, ${sqlVal(m.cabin_length_ft)}, ${esc(m.engines)}, ${sqlVal(m.new_price_usd)}, ${sqlVal(m.preowned_price_low_usd)}, ${sqlVal(m.preowned_price_high_usd)}, ${esc(m.production_status)}, ${sqlVal(m.notes)}, ${sqlVal(m.thumbnail_url)}) ON CONFLICT (id) DO NOTHING;`
  );
}
lines.push('');

// ── airports ─────────────────────────────────────────────────────────

lines.push('-- airports (' + airports.length + ' rows)');
for (const a of airports) {
  lines.push(
    `INSERT INTO public.airports (code, name, city, country, lat, lng) VALUES (${esc(a.code)}, ${esc(a.name)}, ${esc(a.city)}, ${esc(a.country)}, ${sqlVal(a.lat)}, ${sqlVal(a.lng)}) ON CONFLICT (code) DO NOTHING;`
  );
}
lines.push('');

// ── operators + aircraft_fleet ───────────────────────────────────────

lines.push('-- operators (' + operators.length + ' rows)');
for (const op of operators) {
  lines.push(
    `INSERT INTO public.operators (id, name, city, state, aop_no, valid_upto, total_aircraft) VALUES (${sqlVal(op.id)}, ${esc(op.name)}, ${esc(op.city)}, ${esc(op.state)}, ${sqlVal(op.aopNo)}, ${sqlDate(op.validUpto)}, ${sqlVal(op.totalAircraft)}) ON CONFLICT (id) DO NOTHING;`
  );
}
lines.push('');

// Reset the operators serial sequence
lines.push(`SELECT setval('operators_id_seq', (SELECT COALESCE(MAX(id), 0) FROM public.operators));`);
lines.push('');

lines.push('-- aircraft_fleet');
for (const op of operators) {
  const fleet = op.fleet || [];
  for (const ac of fleet) {
    lines.push(
      `INSERT INTO public.aircraft_fleet (operator_id, registration, model, model_id, type, seating_capacity) VALUES (${sqlVal(op.id)}, ${esc(ac.registration)}, ${esc(ac.model)}, ${ac.modelId && validModelIds.has(ac.modelId) ? esc(ac.modelId) : 'NULL'}, ${esc(ac.type)}, ${sqlVal(typeof ac.seatingCapacity === 'number' ? String(ac.seatingCapacity) : ac.seatingCapacity)});`
    );
  }
}
lines.push('');

lines.push('COMMIT;');
lines.push('');

// Output to stdout
process.stdout.write(lines.join('\n'));
