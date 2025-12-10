// Protection des pages nécessitant une authentification avec Supabase
import { checkAuthState } from './auth.js';

// Vérifier si l'utilisateur est connecté
export function requireAuth(redirectTo = 'login.html') {
    return new Promise((resolve, reject) => {
        checkAuthState((user) => {
            if (user) {
                resolve(user);
            } else {
                window.location.href = redirectTo;
                reject(new Error('Non authentifié'));
            }
        });
    });
}

// Rediriger vers le dashboard si déjà connecté
export function redirectIfAuthenticated(redirectTo = 'dashboard.html') {
    return new Promise((resolve) => {
        checkAuthState((user) => {
            if (user) {
                window.location.href = redirectTo;
            } else {
                resolve();
            }
        });
    });
}

// Mettre à jour l'interface utilisateur selon l'état de connexion
export function updateNavForAuth() {
    checkAuthState((user) => {
        const navLinks = document.querySelector('.nav-links');
        if (!navLinks) return;

        if (user) {
            // Utilisateur connecté - Afficher Dashboard (icône) et Déconnexion
            navLinks.innerHTML = `
                <li><a href="index.html">Accueil</a></li>
                <li><a href="services.html">Services</a></li>
                <li><a href="about.html">À propos</a></li>
                <li><a href="contact.html">Contact</a></li>
                <li>
                    <a href="dashboard.html" title="Mon Compte" class="user-icon-link">
                        <img src="https://img.icons8.com/ios-glyphs/30/ffffff/user--v1.png" alt="Mon Compte" style="vertical-align: middle;">
                    </a>
                </li>
                <li><a href="#" id="logoutBtn" class="btn btn-secondary">Déconnexion</a></li>
            `;

            // Ajouter l'événement de déconnexion
            const logoutBtn = document.getElementById('logoutBtn');
            if (logoutBtn) {
                logoutBtn.addEventListener('click', async (e) => {
                    e.preventDefault();
                    const { logout } = await import('./auth.js');
                    const result = await logout();
                    if (result.success) {
                        window.location.href = 'index.html';
                    }
                });
            }
        } else {
            // Utilisateur non connecté - Afficher Connexion et Inscription
            navLinks.innerHTML = `
                <li><a href="index.html">Accueil</a></li>
                <li><a href="services.html">Services</a></li>
                <li><a href="about.html">À propos</a></li>
                <li><a href="contact.html">Contact</a></li>
                <li><a href="login.html" class="btn btn-secondary">Connexion</a></li>
                <li><a href="signup.html" class="btn btn-primary">Inscription</a></li>
            `;
        }
    });
}
