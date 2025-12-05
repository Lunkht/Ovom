# 🏥 Ovom - Application de Santé

## 🎯 Qu'est-ce que c'est ?

Ovom est une application web qui permet aux patients de se connecter avec des professionnels de santé en Afrique. L'application est connectée à Firebase pour gérer les utilisateurs et les données.

## 📦 Ce que vous avez

### Pages Web (8 pages)
1. **index.html** - Page d'accueil
2. **about.html** - À propos de nous
3. **services.html** - Nos services
4. **contact.html** - Formulaire de contact
5. **login.html** - Se connecter
6. **signup.html** - Créer un compte
7. **dashboard.html** - Mon espace personnel
8. **test-firebase.html** - Tester Firebase

### Fonctionnalités
- ✅ Créer un compte
- ✅ Se connecter / Se déconnecter
- ✅ Envoyer un message de contact
- ✅ Voir son tableau de bord personnel
- ✅ Design adapté aux téléphones et ordinateurs

## 🚀 Comment démarrer ?

### Étape 1: Obtenir vos clés Firebase (2 minutes)

1. Allez sur [console.firebase.google.com](https://console.firebase.google.com)
2. Sélectionnez le projet "Ovom"
3. Cliquez sur ⚙️ → Paramètres du projet
4. Copiez `apiKey` et `appId`

### Étape 2: Mettre à jour le code (1 minute)

1. Ouvrez le fichier `js/firebase-config.js`
2. Remplacez `VOTRE_API_KEY` par votre clé
3. Remplacez `VOTRE_APP_ID` par votre ID
4. Sauvegardez

### Étape 3: Lancer l'application (1 minute)

Ouvrez un terminal et tapez:

```bash
python -m http.server 8000
```

Puis ouvrez votre navigateur à: **http://localhost:8000**

## 📖 Documentation

### Pour démarrer rapidement
- **START_HERE.md** - Guide en 3 étapes simples
- **QUICK_START.md** - Configuration en 5 minutes

### Pour configurer Firebase
- **FIREBASE_SETUP.md** - Guide détaillé avec captures d'écran
- **CHECKLIST.md** - Liste de vérification point par point

### Pour développer
- **EXAMPLES.md** - Exemples de code pour ajouter des fonctionnalités
- **CONTRIBUTING.md** - Comment contribuer au projet

### Pour comprendre le projet
- **README.md** - Documentation technique complète
- **PROJECT_SUMMARY.md** - Résumé du projet
- **DEMO_DATA.md** - Données de test

## 🔥 Informations Firebase

Votre projet Firebase:
- **Nom**: Ovom
- **ID**: ovom-94e6b
- **Numéro**: 184161567322

## ✅ Ce qui fonctionne déjà

- ✅ Inscription d'utilisateurs
- ✅ Connexion / Déconnexion
- ✅ Formulaire de contact
- ✅ Tableau de bord personnel
- ✅ Protection des pages privées
- ✅ Design responsive (mobile + desktop)

## 🎯 Ce que vous pouvez ajouter

- Système de rendez-vous
- Recherche de pharmacies
- Géolocalisation
- Téléconsultation vidéo
- Dossier médical
- Notifications

Voir **EXAMPLES.md** pour des exemples de code.

## 🆘 Problèmes courants

### "Erreur: invalid-api-key"
→ Vous n'avez pas mis à jour `js/firebase-config.js`

### "Erreur CORS"
→ Utilisez un serveur local (voir Étape 3)

### Page blanche
→ Appuyez sur F12 et regardez les erreurs dans la console

### "Authentication not enabled"
→ Activez l'authentification dans Firebase Console

## 📞 Besoin d'aide ?

1. Lisez **START_HERE.md** (le plus simple)
2. Consultez **FIREBASE_SETUP.md** (plus détaillé)
3. Testez avec **test-firebase.html**
4. Contactez: contact@ovom.com

## 🎨 Personnaliser l'application

### Changer les couleurs
Ouvrez `css/style.css` et modifiez:
```css
:root {
    --primary-color: #2a9d8f;    /* Couleur principale */
    --secondary-color: #264653;  /* Couleur secondaire */
}
```

### Changer les textes
Ouvrez les fichiers HTML et modifiez le contenu.

### Ajouter votre logo
Remplacez les images dans le dossier `images/`.

## 📁 Structure des fichiers

```
ovom/
├── index.html          # Page d'accueil
├── login.html          # Connexion
├── signup.html         # Inscription
├── dashboard.html      # Tableau de bord
├── contact.html        # Contact
├── about.html          # À propos
├── services.html       # Services
│
├── css/
│   └── style.css      # Tous les styles
│
├── js/
│   ├── firebase-config.js  # Configuration Firebase ⚠️
│   ├── auth.js            # Authentification
│   ├── auth-guard.js      # Protection
│   └── main.js            # JavaScript principal
│
└── images/            # Vos images
```

## 🔒 Sécurité

- ✅ Les mots de passe sont cryptés par Firebase
- ✅ Les données sont protégées par des règles de sécurité
- ✅ Chaque utilisateur voit uniquement ses données
- ✅ Les pages privées sont protégées

## 💰 Coûts

Firebase est **gratuit** pour commencer:
- 10 000 utilisateurs gratuits
- 50 000 lectures/jour gratuites
- 20 000 écritures/jour gratuites

Largement suffisant pour démarrer !

## 🌍 Langues

L'application est en français, mais vous pouvez facilement la traduire en modifiant les textes dans les fichiers HTML.

## 📱 Compatible avec

- ✅ Chrome
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Téléphones mobiles
- ✅ Tablettes

## 🎉 Prêt à commencer ?

1. Ouvrez **START_HERE.md**
2. Suivez les 3 étapes
3. Testez votre application
4. Personnalisez-la !

**Bon développement ! 🚀**

---

© 2025 Ovom - Tous droits réservés
