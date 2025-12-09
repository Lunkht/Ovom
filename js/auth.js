// Gestion de l'authentification avec Firebase
import { auth, db } from './firebase-config.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js';
import { doc, setDoc, getDoc } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js';

// Fonction d'inscription
export async function signup(name, email, password, phone = '', address = '') {
    try {
        // Créer l'utilisateur avec Firebase Auth
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        const user = cred.user;

        // Enregistrer les informations supplémentaires dans Firestore (collection 'users')
        await setDoc(doc(db, 'users', user.uid), {
            id: user.uid,
            name: name,
            email: email,
            phone: phone,
            address: address,
            is_admin: false,
            created_at: new Date().toISOString()
        });

        return { success: true, user };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// Fonction de connexion
export async function login(email, password) {
    try {
        const cred = await signInWithEmailAndPassword(auth, email, password);
        return { success: true, user: cred.user };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// Fonction de déconnexion
export async function logout() {
    try {
        await signOut(auth);
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// Vérifier l'état de connexion
export function checkAuthState(callback) {
    // Écouter les changements d'état via Firebase
    onAuthStateChanged(auth, (user) => {
        callback(user ?? null);
    });
}

// Obtenir les données utilisateur
export async function getUserData(userId) {
    try {
        const snap = await getDoc(doc(db, 'users', userId));
        if (!snap.exists()) return { success: false, error: 'Utilisateur introuvable' };
        return { success: true, data: snap.data() };
    } catch (error) {
        return { success: false, error: error.message };
    }
}
