-- PDI Aviation — RLS policies for data tables.
-- aircraft_models & airports: public read (all tiers).
-- operators & aircraft_fleet: tier-gated read.

-- Helper: resolve the current user's subscription tier.
create or replace function public.get_user_tier()
returns text
language plpgsql
security definer
stable
set search_path = public
as $$
declare
  user_tier text;
begin
  if auth.uid() is null then return 'curious'; end if;

  select tier into user_tier
  from public.subscriptions
  where user_id = auth.uid()
    and status in ('active', 'trialing');

  return coalesce(user_tier, 'curious');
end;
$$;

-- ── aircraft_models: public read ────────────────────────────────────
alter table public.aircraft_models enable row level security;

drop policy if exists "aircraft_models_public_read" on public.aircraft_models;
create policy "aircraft_models_public_read"
  on public.aircraft_models for select
  using (true);

-- ── airports: public read ───────────────────────────────────────────
alter table public.airports enable row level security;

drop policy if exists "airports_public_read" on public.airports;
create policy "airports_public_read"
  on public.airports for select
  using (true);

-- ── operators: tier-gated read ──────────────────────────────────────
-- curious / unauthenticated users see only first 10 operators (id <= 10).
-- enthusiast+ see all operators.
alter table public.operators enable row level security;

drop policy if exists "operators_tiered_read" on public.operators;
create policy "operators_tiered_read"
  on public.operators for select
  using (
    case get_user_tier()
      when 'curious' then id <= 10
      else true
    end
  );

-- ── aircraft_fleet: follows operator visibility ─────────────────────
alter table public.aircraft_fleet enable row level security;

drop policy if exists "aircraft_fleet_tiered_read" on public.aircraft_fleet;
create policy "aircraft_fleet_tiered_read"
  on public.aircraft_fleet for select
  using (
    case get_user_tier()
      when 'curious' then operator_id <= 10
      else true
    end
  );
