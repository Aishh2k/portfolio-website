-- Create flowers table
CREATE TABLE IF NOT EXISTS public_flowers (
    id BIGSERIAL PRIMARY KEY,
    filename TEXT NOT NULL,
    image_url TEXT NOT NULL,
    confidence REAL DEFAULT 1.0,
    ip_address TEXT,
    manual_moderation BOOLEAN DEFAULT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public_flowers ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to read flowers
CREATE POLICY "Allow public read access" ON public_flowers
    FOR SELECT USING (true);

-- Create policy to allow anyone to insert flowers
CREATE POLICY "Allow public insert access" ON public_flowers
    FOR INSERT WITH CHECK (true);

-- Create index on created_at for faster queries
CREATE INDEX IF NOT EXISTS idx_flowers_created_at ON public_flowers(created_at DESC);

-- Create index on ip_address for rate limiting
CREATE INDEX IF NOT EXISTS idx_flowers_ip ON public_flowers(ip_address);

-- Create storage bucket for flower images
INSERT INTO storage.buckets (id, name, public)
VALUES ('flowers', 'flowers', true)
ON CONFLICT (id) DO NOTHING;

-- Create policy to allow anyone to upload to flowers bucket
CREATE POLICY "Allow public uploads" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'flowers');

-- Create policy to allow anyone to read from flowers bucket
CREATE POLICY "Allow public reads" ON storage.objects
    FOR SELECT USING (bucket_id = 'flowers');
