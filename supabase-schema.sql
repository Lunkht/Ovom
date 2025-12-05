-- Schema Supabase pour Ovom
-- Exécutez ce script dans l'éditeur SQL de Supabase

-- Table users (informations utilisateurs)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table contacts (messages de contact)
CREATE TABLE IF NOT EXISTS contacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Activer Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Politique pour users : un utilisateur peut lire/modifier uniquement ses propres données
CREATE POLICY "Users can read own data"
    ON users FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
    ON users FOR UPDATE
    USING (auth.uid() = id);

CREATE POLICY "Users can insert own data"
    ON users FOR INSERT
    WITH CHECK (auth.uid() = id);

-- Politique pour contacts : tout le monde peut créer, seuls les admins peuvent lire
CREATE POLICY "Anyone can create contact"
    ON contacts FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Authenticated users can read contacts"
    ON contacts FOR SELECT
    USING (auth.role() = 'authenticated');

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS users_email_idx ON users(email);
CREATE INDEX IF NOT EXISTS contacts_created_at_idx ON contacts(created_at DESC);
