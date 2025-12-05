# 🔄 Flux de l'Application Ovom

Ce document explique comment les différentes pages et fonctionnalités de l'application sont connectées.

## 📊 Diagramme de Navigation

```
                    ┌─────────────────┐
                    │   index.html    │
                    │  (Page Accueil) │
                    └────────┬────────┘
                             │
            ┌────────────────┼────────────────┐
            │                │                │
            ▼                ▼                ▼
    ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
    │  about.html  │  │services.html │  │ contact.html │
    │  (À propos)  │  │  (Services)  │  │  (Contact)   │
    └──────────────┘  └──────────────┘  └──────┬───────┘
                                                │
                                                ▼
                                        [Firebase Firestore]
                                        Sauvegarde message
                                        
    
    ┌─────────────────────────────────────────────────────┐
    │              AUTHENTIFICATION                        │
    └─────────────────────────────────────────────────────┘
    
            ┌──────────────┐              ┌──────────────┐
            │ signup.html  │              │  login.html  │
            │ (Inscription)│              │ (Connexion)  │
            └──────┬───────┘              └──────┬───────┘
                   │                             │
                   │    [Firebase Auth]          │
                   │    Créer compte             │
                   │                             │
                   └──────────┬──────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │ dashboard.html   │
                    │  (Tableau bord)  │
                    │   [Protégé 🔒]   │
                    └──────────────────┘
```

## 🔐 Flux d'Authentification

### 1. Inscription (signup.html)

```
Utilisateur remplit formulaire
         │
         ▼
Validation des données
         │
         ▼
Firebase Authentication
  createUserWithEmailAndPassword()
         │
         ├─── ✅ Succès
         │         │
         │         ▼
         │    Créer document dans Firestore
         │    Collection: users/{userId}
         │         │
         │         ▼
         │    Redirection → dashboard.html
         │
         └─── ❌ Erreur
                   │
                   ▼
              Afficher message d'erreur
```

### 2. Connexion (login.html)

```
Utilisateur entre email/password
         │
         ▼
Firebase Authentication
  signInWithEmailAndPassword()
         │
         ├─── ✅ Succès
         │         │
         │         ▼
         │    Récupérer données utilisateur
         │    depuis Firestore
         │         │
         │         ▼
         │    Redirection → dashboard.html
         │
         └─── ❌ Erreur
                   │
                   ▼
              Afficher message d'erreur
```

### 3. Protection des Routes (auth-guard.js)

```
Utilisateur accède à dashboard.html
         │
         ▼
Vérifier état authentification
  onAuthStateChanged()
         │
         ├─── ✅ Connecté
         │         │
         │         ▼
         │    Afficher dashboard
         │    Charger données utilisateur
         │
         └─── ❌ Non connecté
                   │
                   ▼
              Redirection → login.html
```

## 📝 Flux du Formulaire de Contact

```
Utilisateur remplit formulaire (contact.html)
         │
         ▼
Validation des champs
         │
         ▼
Firebase Firestore
  addDoc(collection(db, "contacts"))
         │
         ├─── ✅ Succès
         │         │
         │         ▼
         │    Afficher message de succès
         │    Réinitialiser formulaire
         │
         └─── ❌ Erreur
                   │
                   ▼
              Afficher message d'erreur
```

## 🔄 Flux de Navigation Dynamique

```
Page chargée
     │
     ▼
Vérifier état authentification
  checkAuthState()
     │
     ├─── ✅ Connecté
     │         │
     │         ▼
     │    Navigation affiche:
     │    - Services
     │    - À propos
     │    - Contact
     │    - Mon compte
     │    - Déconnexion
     │
     └─── ❌ Non connecté
               │
               ▼
          Navigation affiche:
          - Services
          - À propos
          - Contact
          - Connexion
          - Inscription
```

## 💾 Structure des Données Firestore

### Collection: users

```
users/
  {userId}/
    ├─ name: "Jean Dupont"
    ├─ email: "jean@example.com"
    └─ createdAt: "2025-12-04T10:00:00Z"
```

**Créé lors de**: Inscription (signup.html)
**Utilisé dans**: Dashboard (dashboard.html)

### Collection: contacts

```
contacts/
  {contactId}/
    ├─ name: "Marie Martin"
    ├─ email: "marie@example.com"
    ├─ message: "Bonjour, j'ai une question..."
    └─ createdAt: "2025-12-04T11:00:00Z"
```

**Créé lors de**: Soumission formulaire (contact.html)
**Accessible par**: Administrateurs (à implémenter)

## 🎯 Scénarios d'Utilisation

### Scénario 1: Nouvel Utilisateur

```
1. Visite index.html
   └─> Découvre l'application
   
2. Clique sur "Inscription"
   └─> Redirigé vers signup.html
   
3. Remplit le formulaire
   └─> Compte créé dans Firebase Auth
   └─> Données sauvegardées dans Firestore
   
4. Automatiquement redirigé vers dashboard.html
   └─> Voit son tableau de bord personnel
   
5. Explore les services
   └─> Visite services.html
   
6. Envoie un message
   └─> Remplit contact.html
   └─> Message sauvegardé dans Firestore
```

### Scénario 2: Utilisateur Existant

```
1. Visite index.html
   └─> Clique sur "Connexion"
   
2. Redirigé vers login.html
   └─> Entre email/password
   
3. Authentification réussie
   └─> Redirigé vers dashboard.html
   
4. Utilise l'application
   └─> Accède aux différentes pages
   
5. Se déconnecte
   └─> Clique sur "Déconnexion"
   └─> Redirigé vers index.html
```

### Scénario 3: Visiteur Non Inscrit

```
1. Visite index.html
   └─> Découvre l'application
   
2. Explore les pages publiques
   ├─> about.html (À propos)
   ├─> services.html (Services)
   └─> contact.html (Contact)
   
3. Essaie d'accéder au dashboard
   └─> Automatiquement redirigé vers login.html
   
4. Décide de s'inscrire
   └─> Clique sur "Inscrivez-vous"
   └─> Redirigé vers signup.html
```

## 🔒 Règles de Sécurité

### Pages Publiques (Accessibles sans connexion)
- ✅ index.html
- ✅ about.html
- ✅ services.html
- ✅ contact.html
- ✅ login.html
- ✅ signup.html

### Pages Protégées (Nécessitent une connexion)
- 🔒 dashboard.html

### Données Firestore

```javascript
// Règle: users
// Un utilisateur peut lire/écrire uniquement ses propres données
match /users/{userId} {
  allow read, write: if request.auth.uid == userId;
}

// Règle: contacts
// Tout le monde peut créer, seuls les admins peuvent lire
match /contacts/{contactId} {
  allow create: if true;
  allow read: if request.auth != null;
}
```

## 🚀 Flux de Déploiement

```
Développement Local
     │
     ▼
Tests (test-firebase.html)
     │
     ├─── ✅ Tous les tests passent
     │         │
     │         ▼
     │    Configuration Firebase
     │    - Authentication activée
     │    - Firestore créé
     │    - Règles publiées
     │         │
     │         ▼
     │    Déploiement
     │    firebase deploy
     │         │
     │         ▼
     │    Application en ligne
     │    https://ovom-94e6b.web.app
     │
     └─── ❌ Tests échouent
               │
               ▼
          Corriger les erreurs
          Retour au développement
```

## 📱 Flux Responsive

```
Utilisateur visite le site
     │
     ▼
Détection de l'appareil
     │
     ├─── 📱 Mobile (< 768px)
     │         │
     │         ▼
     │    Menu hamburger
     │    Layout vertical
     │    Images adaptées
     │
     ├─── 📱 Tablette (768px - 1024px)
     │         │
     │         ▼
     │    Layout adaptatif
     │    Grid 2 colonnes
     │
     └─── 💻 Desktop (> 1024px)
               │
               ▼
          Menu horizontal
          Layout complet
          Grid 3 colonnes
```

## 🔄 Cycle de Vie d'une Session

```
1. Utilisateur se connecte
   └─> Token d'authentification créé
   └─> Stocké dans le navigateur
   
2. Navigation dans l'application
   └─> Token vérifié à chaque page
   └─> Données chargées depuis Firestore
   
3. Inactivité prolongée
   └─> Token expire automatiquement
   └─> Utilisateur déconnecté
   
4. Déconnexion manuelle
   └─> Token supprimé
   └─> Redirection vers index.html
```

## 🎨 Flux d'Interaction Utilisateur

```
Chargement de la page
     │
     ▼
Animations CSS
  - Fade in
  - Slide in
     │
     ▼
Interactions
  - Hover sur cards
  - Clic sur boutons
  - Scroll animations
     │
     ▼
Feedback visuel
  - Messages de succès (vert)
  - Messages d'erreur (rouge)
  - Loading states
```

## 📊 Flux de Données

```
Frontend (HTML/CSS/JS)
         │
         ▼
Firebase SDK
         │
         ├─── Authentication
         │         │
         │         ▼
         │    Gestion utilisateurs
         │
         └─── Firestore
                   │
                   ▼
              Base de données
              - users
              - contacts
              - (futures collections)
```

---

Ce workflow vous aide à comprendre comment toutes les parties de l'application fonctionnent ensemble. Pour plus de détails techniques, consultez les fichiers de code source.
