// Configuration Supabase pour Ovom
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

// Configuration de votre projet Supabase
const supabaseUrl = 'https://htzwapislazbjngzoffh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh0endhcGlzbGF6YmpuZ3pvZmZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ4ODE4ODMsImV4cCI6MjA4MDQ1Nzg4M30.c2vEkqkDmfSaCvJIyyNnxE-LQlSEmFsB5MJjUiu6G-s';

// Initialisation Supabase
const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase };
