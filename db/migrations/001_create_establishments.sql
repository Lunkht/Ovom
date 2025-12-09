-- Migration: create establishments table and is_admin flag for users
-- NOTE: This SQL was originally written for Supabase (Postgres). The project
-- has been migrated to Firebase (Firestore). This SQL file is kept for
-- historical/reference purposes only and is not required for the Firebase setup.
-- Run this SQL in your Supabase SQL editor if you still need a Postgres schema.

-- extension for uuid gen (may already exist)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create establishments table
CREATE TABLE IF NOT EXISTS establishments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL,
  description text,
  address text,
  city text,
  postal_code text,
  phone text,
  email text,
  website text,
  latitude double precision,
  longitude double precision,
  image_url text,
  created_by uuid REFERENCES users(id) ON DELETE SET NULL,
  is_verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Add is_admin flag to users table if not exists
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_admin boolean DEFAULT false;

-- Enable RLS and create policies
ALTER TABLE establishments ENABLE ROW LEVEL SECURITY;

-- Public can SELECT
CREATE POLICY IF NOT EXISTS "public_select" ON establishments
  FOR SELECT
  USING (true);

-- Only admins can INSERT/UPDATE/DELETE
CREATE POLICY IF NOT EXISTS "admins_crud" ON establishments
  FOR ALL
  USING (EXISTS (SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.is_admin = true))
  WITH CHECK (EXISTS (SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.is_admin = true));

-- You may want to create an index on type/city for faster search
CREATE INDEX IF NOT EXISTS idx_establishments_type ON establishments(type);
CREATE INDEX IF NOT EXISTS idx_establishments_city ON establishments(city);
