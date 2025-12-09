// Supabase wrapper removed - project migrated to Firebase.
// Keep a small shim to avoid runtime errors in places not yet migrated.
export async function testConnection() {
  return { ok: false, error: 'Supabase removed; use Firebase. See js/firebase-config.js' };
}

export const supabase = null;
