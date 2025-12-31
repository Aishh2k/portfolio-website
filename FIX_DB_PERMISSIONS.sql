-- 1. Create table public_flowers if it doesn't exist
CREATE TABLE IF NOT EXISTS public_flowers (
    id BIGSERIAL PRIMARY KEY,
    filename TEXT NOT NULL,
    image_url TEXT NOT NULL,
    confidence REAL DEFAULT 1.0,
    ip_address TEXT,
    manual_moderation BOOLEAN DEFAULT NULL,
    creator_name TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public_flowers ENABLE ROW LEVEL SECURITY;

-- 3. Create Policy: Allow Public Read (SELECT)
-- This allows everyone to see the flowers
DROP POLICY IF EXISTS "Allow public read access" ON public_flowers;
CREATE POLICY "Allow public read access" ON public_flowers
    FOR SELECT
    TO public
    USING (true);

-- 4. Create Policy: Allow Public Write (INSERT)
-- This allows everyone to add a flower
DROP POLICY IF EXISTS "Allow public insert access" ON public_flowers;
CREATE POLICY "Allow public insert access" ON public_flowers
    FOR INSERT
    TO public
    WITH CHECK (true);

-- 5. Grant permissions to anonymous users
GRANT SELECT, INSERT ON public_flowers TO anon;
GRANT USAGE, SELECT ON SEQUENCE public_flowers_id_seq TO anon;

-- 6. Storage Setup (Bucket: 'flowers')
INSERT INTO storage.buckets (id, name, public)
VALUES ('flowers', 'flowers', true)
ON CONFLICT (id) DO NOTHING;

-- 7. Storage Policies
DROP POLICY IF EXISTS "Allow public uploads" ON storage.objects;
CREATE POLICY "Allow public uploads" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'flowers');

DROP POLICY IF EXISTS "Allow public reads" ON storage.objects;
CREATE POLICY "Allow public reads" ON storage.objects
    FOR SELECT USING (bucket_id = 'flowers');
