# 🤝 Guide de Contribution - Ovom

Merci de votre intérêt pour contribuer à Ovom ! Ce guide vous aidera à démarrer.

## 📋 Table des Matières

- [Code de Conduite](#code-de-conduite)
- [Comment Contribuer](#comment-contribuer)
- [Structure du Projet](#structure-du-projet)
- [Standards de Code](#standards-de-code)
- [Processus de Pull Request](#processus-de-pull-request)
- [Signaler des Bugs](#signaler-des-bugs)
- [Proposer des Fonctionnalités](#proposer-des-fonctionnalités)

## 📜 Code de Conduite

En participant à ce projet, vous acceptez de maintenir un environnement respectueux et inclusif pour tous.

### Nos Engagements

- Utiliser un langage accueillant et inclusif
- Respecter les points de vue et expériences différents
- Accepter les critiques constructives avec grâce
- Se concentrer sur ce qui est meilleur pour la communauté

## 🚀 Comment Contribuer

### 1. Fork le Projet

```bash
# Clonez votre fork
git clone https://github.com/votre-username/ovom.git
cd ovom
```

### 2. Créez une Branche

```bash
# Créez une branche pour votre fonctionnalité
git checkout -b feature/ma-nouvelle-fonctionnalite

# Ou pour un bug fix
git checkout -b fix/correction-bug
```

### 3. Faites vos Modifications

- Écrivez du code propre et commenté
- Suivez les standards de code (voir ci-dessous)
- Testez vos modifications localement

### 4. Committez vos Changements

```bash
git add .
git commit -m "feat: ajout de la fonctionnalité X"
```

#### Convention de Commit

Utilisez des messages de commit clairs:

- `feat:` Nouvelle fonctionnalité
- `fix:` Correction de bug
- `docs:` Documentation uniquement
- `style:` Formatage, point-virgules manquants, etc.
- `refactor:` Refactoring du code
- `test:` Ajout de tests
- `chore:` Maintenance

### 5. Poussez vers GitHub

```bash
git push origin feature/ma-nouvelle-fonctionnalite
```

### 6. Ouvrez une Pull Request

- Allez sur GitHub
- Cliquez sur "New Pull Request"
- Décrivez vos changements en détail
- Attendez la revue de code

## 📁 Structure du Projet

```
ovom/
├── index.html              # Page d'accueil
├── about.html              # À propos
├── services.html           # Services
├── contact.html            # Contact
├── login.html              # Connexion
├── signup.html             # Inscription
├── dashboard.html          # Dashboard
│
├── css/
│   └── style.css          # Styles principaux
│
├── js/
│   ├── main.js            # JavaScript principal
│   ├── firebase-config.js # Configuration Firebase
│   ├── auth.js            # Authentification
│   └── auth-guard.js      # Protection des routes
│
├── images/                # Images et assets
│
└── docs/                  # Documentation
```

## 💻 Standards de Code

### HTML

```html
<!-- Utilisez l'indentation de 4 espaces -->
<section class="container">
    <h1>Titre</h1>
    <p>Paragraphe</p>
</section>

<!-- Utilisez des attributs sémantiques -->
<button type="submit" aria-label="Envoyer le formulaire">
    Envoyer
</button>
```

### CSS

```css
/* Utilisez des noms de classes descriptifs */
.feature-card {
    padding: 2rem;
    border-radius: 10px;
}

/* Groupez les propriétés logiquement */
.btn {
    /* Positionnement */
    display: inline-block;
    
    /* Box model */
    padding: 0.8rem 1.5rem;
    margin: 0;
    
    /* Typographie */
    font-weight: 600;
    
    /* Visuel */
    background-color: var(--primary-color);
    border-radius: 5px;
    
    /* Divers */
    transition: opacity 0.3s ease;
}
```

### JavaScript

```javascript
// Utilisez ES6+ modules
import { auth, db } from './firebase-config.js';

// Utilisez des noms de variables descriptifs
const userEmail = document.getElementById('email').value;

// Utilisez async/await pour les promesses
async function getUserData(userId) {
    try {
        const docRef = doc(db, "users", userId);
        const docSnap = await getDoc(docRef);
        return docSnap.data();
    } catch (error) {
        console.error('Erreur:', error);
        return null;
    }
}

// Commentez le code complexe
// Calcule la distance entre deux points géographiques
// en utilisant la formule de Haversine
function calculateDistance(lat1, lon1, lat2, lon2) {
    // ... code
}
```

### Firebase

```javascript
// Utilisez des noms de collections au pluriel
collection(db, "users")
collection(db, "appointments")

// Validez les données avant l'envoi
const userData = {
    name: name.trim(),
    email: email.toLowerCase(),
    createdAt: new Date().toISOString()
};

// Gérez toujours les erreurs
try {
    await setDoc(doc(db, "users", userId), userData);
} catch (error) {
    console.error('Erreur Firestore:', error);
    // Informez l'utilisateur
}
```

## 🔍 Processus de Pull Request

### Avant de Soumettre

- [ ] Mon code suit les standards du projet
- [ ] J'ai commenté mon code, particulièrement les parties complexes
- [ ] J'ai mis à jour la documentation si nécessaire
- [ ] Mes changements ne génèrent pas de nouveaux warnings
- [ ] J'ai testé mes modifications localement
- [ ] J'ai vérifié que Firebase fonctionne correctement

### Template de Pull Request

```markdown
## Description
Décrivez vos changements en détail

## Type de Changement
- [ ] Bug fix
- [ ] Nouvelle fonctionnalité
- [ ] Breaking change
- [ ] Documentation

## Comment Tester
1. Allez sur la page X
2. Cliquez sur Y
3. Vérifiez que Z se produit

## Captures d'Écran
Si applicable, ajoutez des captures d'écran

## Checklist
- [ ] Mon code suit les standards
- [ ] J'ai testé mes modifications
- [ ] J'ai mis à jour la documentation
```

## 🐛 Signaler des Bugs

### Avant de Signaler

1. Vérifiez que le bug n'a pas déjà été signalé
2. Vérifiez que vous utilisez la dernière version
3. Collectez des informations sur le bug

### Template de Bug Report

```markdown
## Description du Bug
Description claire et concise du bug

## Étapes pour Reproduire
1. Allez sur '...'
2. Cliquez sur '...'
3. Faites défiler jusqu'à '...'
4. Voyez l'erreur

## Comportement Attendu
Ce qui devrait se passer

## Comportement Actuel
Ce qui se passe réellement

## Captures d'Écran
Si applicable

## Environnement
- OS: [ex: Windows 10]
- Navigateur: [ex: Chrome 120]
- Version: [ex: 1.0.0]

## Console Logs
Copiez les erreurs de la console (F12)
```

## 💡 Proposer des Fonctionnalités

### Template de Feature Request

```markdown
## Problème à Résoudre
Décrivez le problème que cette fonctionnalité résoudrait

## Solution Proposée
Décrivez comment vous imaginez la solution

## Alternatives Considérées
Autres solutions que vous avez envisagées

## Contexte Additionnel
Toute autre information pertinente
```

## 🎯 Domaines de Contribution

### Fonctionnalités Prioritaires

1. **Système de Rendez-vous**
   - Calendrier interactif
   - Notifications de rappel
   - Gestion des disponibilités

2. **Géolocalisation**
   - Carte interactive
   - Recherche de pharmacies
   - Calcul d'itinéraires

3. **Téléconsultation**
   - Intégration vidéo
   - Chat en temps réel
   - Partage de documents

4. **Dossier Médical**
   - Upload de documents
   - Historique des consultations
   - Partage sécurisé

### Améliorations Techniques

- Tests automatisés
- Optimisation des performances
- Accessibilité (WCAG 2.1)
- Internationalisation (i18n)
- Progressive Web App (PWA)
- Mode hors ligne

### Documentation

- Tutoriels vidéo
- Guides d'utilisation
- Traductions
- Exemples de code

## 🧪 Tests

### Tests Manuels

1. Testez sur différents navigateurs:
   - Chrome
   - Firefox
   - Safari
   - Edge

2. Testez sur différents appareils:
   - Desktop
   - Tablette
   - Mobile

3. Testez les fonctionnalités Firebase:
   - Inscription
   - Connexion
   - Déconnexion
   - Formulaire de contact

### Tests Automatisés (à venir)

```bash
# Lancer les tests
npm test

# Lancer les tests avec couverture
npm run test:coverage
```

## 📝 Documentation

### Mettre à Jour la Documentation

Si vous ajoutez une fonctionnalité:

1. Mettez à jour `README.md`
2. Ajoutez des exemples dans `EXAMPLES.md`
3. Mettez à jour `PROJECT_SUMMARY.md`
4. Ajoutez des commentaires dans le code

### Style de Documentation

- Utilisez des titres clairs
- Incluez des exemples de code
- Ajoutez des captures d'écran si pertinent
- Utilisez des emojis pour la lisibilité 😊

## 🏆 Reconnaissance

Les contributeurs seront ajoutés à la section "Contributeurs" du README.

## 📞 Questions ?

- Ouvrez une issue sur GitHub
- Contactez: contact@ovom.com
- Consultez la documentation existante

## 📜 Licence

En contribuant, vous acceptez que vos contributions soient sous la même licence MIT que le projet.

---

**Merci de contribuer à Ovom ! 🎉**

Ensemble, nous rendons la santé plus accessible en Afrique ! 🌍
