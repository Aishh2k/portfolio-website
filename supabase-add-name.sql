-- Add creator_name column to public_flowers table
ALTER TABLE public_flowers ADD COLUMN IF NOT EXISTS creator_name TEXT;
