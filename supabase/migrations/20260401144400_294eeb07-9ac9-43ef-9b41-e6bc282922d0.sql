
CREATE TABLE public.products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  brand TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('seeds', 'crop-protection', 'nutrition', 'equipment')),
  base_price NUMERIC NOT NULL,
  original_price NUMERIC NOT NULL DEFAULT 0,
  image_url TEXT NOT NULL DEFAULT '',
  images TEXT[] NOT NULL DEFAULT '{}',
  tag TEXT,
  rating NUMERIC NOT NULL DEFAULT 0,
  review_count INTEGER NOT NULL DEFAULT 0,
  units JSONB NOT NULL DEFAULT '[]',
  sku TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  specs JSONB NOT NULL DEFAULT '[]',
  crops TEXT[] NOT NULL DEFAULT '{}',
  pests TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Everyone can read products (public store)
CREATE POLICY "Anyone can view products"
  ON public.products
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Only authenticated users can manage products (admin will be enforced in UI)
CREATE POLICY "Authenticated users can insert products"
  ON public.products
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update products"
  ON public.products
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete products"
  ON public.products
  FOR DELETE
  TO authenticated
  USING (true);
