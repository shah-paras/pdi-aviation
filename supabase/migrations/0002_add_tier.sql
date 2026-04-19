ALTER TABLE public.subscriptions
  ADD COLUMN IF NOT EXISTS tier text
    NOT NULL DEFAULT 'curious'
    CHECK (tier IN ('curious', 'enthusiast', 'insider', 'superfan'));

UPDATE public.subscriptions
  SET tier = 'enthusiast'
  WHERE status IN ('active', 'trialing');
