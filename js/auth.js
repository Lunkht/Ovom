// Gestion de l'authentification avec Supabase
import { supabase } from './supabase-config.js';

// Fonction d'inscription
export async function signup(name, email, password, phone = '', address = '') {
    try {
        // Créer l'utilisateur avec Supabase Auth
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email: email,
            password: password,
        });

        if (authError) throw authError;

        // Enregistrer les informations supplémentaires dans la table users
        const { error: dbError } = await supabase
            .from('users')
            .insert([
                {
                    id: authData.user.id,
                    name: name,
                    email: email,
                    phone: phone,
                    address: address,
                    created_at: new Date().toISOString()
                }
            ]);

        if (dbError) throw dbError;

        return { success: true, user: authData.user };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// Fonction de connexion
export async function login(email, password) {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) throw error;

        return { success: true, user: data.user };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// Fonction de déconnexion
export async function logout() {
    try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// Vérifier l'état de connexion
export function checkAuthState(callback) {
    // Vérifier l'utilisateur actuel
    supabase.auth.getSession().then(({ data: { session } }) => {
        callback(session?.user ?? null);
    });

    // Écouter les changements d'état
    supabase.auth.onAuthStateChange((event, session) => {
        callback(session?.user ?? null);
    });
}

// Obtenir les données utilisateur
export async function getUserData(userId) {
    try {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', userId)
            .single();

        if (error) throw error;

        return { success: true, data: data };
    } catch (error) {
        return { success: false, error: error.message };
    }
}
