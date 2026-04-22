-- PDI Aviation — data tables for aircraft models, operators, fleet, and airports.

-- Aircraft models catalog (66 rows from aircraftModels.js)
create table if not exists public.aircraft_models (
  id text primary key,
  manufacturer text not null,
  model text not null,
  category text not null,
  type text not null default 'FW',
  max_pax integer,
  max_range_nm integer,
  cruise_speed_ktas integer,
  cabin_height_ft numeric(4,1),
  cabin_width_ft numeric(4,1),
  cabin_length_ft numeric(4,1),
  engines text,
  new_price_usd bigint,
  preowned_price_low_usd bigint,
  preowned_price_high_usd bigint,
  production_status text default 'in_production',
  notes text,
  thumbnail_url text,
  created_at timestamptz not null default now()
);

-- NSOP operators (137 rows from operators.js)
create table if not exists public.operators (
  id serial primary key,
  name text not null,
  city text not null,
  state text not null,
  aop_no text,
  valid_upto date,
  total_aircraft integer default 0,
  created_at timestamptz not null default now()
);

-- Individual aircraft in each operator's fleet
create table if not exists public.aircraft_fleet (
  id serial primary key,
  operator_id integer not null references public.operators(id) on delete cascade,
  registration text not null,
  model text not null,
  model_id text references public.aircraft_models(id),
  type text not null default 'FW',
  seating_capacity text,
  created_at timestamptz not null default now()
);

create index if not exists aircraft_fleet_operator_id_idx on public.aircraft_fleet (operator_id);
create index if not exists aircraft_fleet_model_id_idx on public.aircraft_fleet (model_id);

-- Airports (world airports with IATA codes)
create table if not exists public.airports (
  code text primary key,
  name text not null,
  city text not null,
  country text not null,
  lat numeric(9,6) not null,
  lng numeric(9,6) not null,
  created_at timestamptz not null default now()
);
