# ✅ Checklist de Configuration - Ovom

Suivez cette checklist étape par étape pour configurer votre application Ovom avec Firebase.

## 📋 Phase 1: Préparation (5 min)

- [ ] J'ai un compte Google
- [ ] J'ai accès à [console.firebase.google.com](https://console.firebase.google.com)
- [ ] J'ai vérifié que le projet "Ovom" (ovom-94e6b) existe
- [ ] J'ai un éditeur de code installé (VS Code, Sublime, etc.)
- [ ] J'ai Python, Node.js ou PHP pour lancer un serveur local

## 🔥 Phase 2: Configuration Firebase (10 min)

### Authentication
- [ ] Aller dans Firebase Console → Authentication
- [ ] Cliquer sur "Commencer"
- [ ] Activer "E-mail/Mot de passe"
- [ ] Cliquer sur "Enregistrer"

### Firestore Database
- [ ] Aller dans Firebase Console → Firestore Database
- [ ] Cliquer sur "Créer une base de données"
- [ ] Choisir le mode "Production"
- [ ] Sélectionner la région "europe-west"
- [ ] Cliquer sur "Activer"

### Règles de Sécurité
- [ ] Dans Firestore, aller sur l'onglet "Règles"
- [ ] Ouvrir le fichier `firestore.rules` du projet
- [ ] Copier tout le contenu
- [ ] Coller dans l'éditeur de règles Firebase
- [ ] Cliquer sur "Publier"

### Clés API
- [ ] Cliquer sur ⚙️ (Paramètres) → "Paramètres du projet"
- [ ] Faire défiler jusqu'à "Vos applications"
- [ ] Si aucune app web: Cliquer sur l'icône </> (Web)
- [ ] Nommer l'app "Ovom Web"
- [ ] Cliquer sur "Enregistrer l'application"
- [ ] Copier la valeur de `apiKey`
- [ ] Copier la valeur de `appId`

## 💻 Phase 3: Configuration du Code (5 min)

### Fichier firebase-config.js
- [ ] Ouvrir `js/firebase-config.js` dans l'éditeur
- [ ] Trouver la ligne avec `apiKey: "VOTRE_API_KEY"`
- [ ] Remplacer `VOTRE_API_KEY` par votre vraie clé API
- [ ] Trouver la ligne avec `appId: "VOTRE_APP_ID"`
- [ ] Remplacer `VOTRE_APP_ID` par votre vrai App ID
- [ ] Sauvegarder le fichier

### Fichier test-firebase.html (optionnel)
- [ ] Ouvrir `test-firebase.html` dans l'éditeur
- [ ] Faire les mêmes remplacements pour apiKey et appId
- [ ] Sauvegarder le fichier

## 🧪 Phase 4: Tests (10 min)

### Lancer le serveur local
- [ ] Ouvrir un terminal dans le dossier du projet
- [ ] Lancer une de ces commandes:
  ```bash
  # Python
  python -m http.server 8000
  
  # Node.js
  npx http-server
  
  # PHP
  php -S localhost:8000
  ```
- [ ] Le serveur démarre sans erreur

### Test de connexion Firebase
- [ ] Ouvrir le navigateur à `http://localhost:8000/test-firebase.html`
- [ ] Cliquer sur "Tester la Connexion Firebase"
- [ ] Voir un message ✅ vert "Firebase initialisé avec succès"
- [ ] Cliquer sur "Tester l'Authentification"
- [ ] Voir un message ✅ vert "Module Authentication chargé"
- [ ] Cliquer sur "Tester Firestore"
- [ ] Voir un message ✅ vert "Document de test créé"

### Test d'inscription
- [ ] Aller sur `http://localhost:8000/signup.html`
- [ ] Remplir le formulaire avec:
  - Nom: Test Utilisateur
  - Email: test@example.com
  - Mot de passe: test123456
- [ ] Cliquer sur "Créer mon compte"
- [ ] Voir le message "Compte créé avec succès !"
- [ ] Être redirigé vers `dashboard.html`
- [ ] Voir mon nom affiché: "Bienvenue, Test Utilisateur !"

### Vérification dans Firebase Console
- [ ] Retourner dans Firebase Console
- [ ] Aller dans Authentication
- [ ] Voir l'utilisateur test@example.com dans la liste
- [ ] Aller dans Firestore Database
- [ ] Voir la collection "users"
- [ ] Voir le document avec les données de l'utilisateur

### Test de connexion
- [ ] Cliquer sur "Déconnexion" dans le dashboard
- [ ] Être redirigé vers `index.html`
- [ ] Aller sur `login.html`
- [ ] Se connecter avec test@example.com / test123456
- [ ] Être redirigé vers `dashboard.html`

### Test du formulaire de contact
- [ ] Aller sur `contact.html`
- [ ] Remplir le formulaire:
  - Nom: Marie Dupont
  - Email: marie@example.com
  - Message: Test de contact
- [ ] Cliquer sur "Envoyer"
- [ ] Voir le message "Message envoyé avec succès !"
- [ ] Vérifier dans Firestore → Collection "contacts"
- [ ] Voir le nouveau message

### Test de navigation dynamique
- [ ] Aller sur `index.html` (connecté)
- [ ] Vérifier que le menu affiche "Mon compte" et "Déconnexion"
- [ ] Se déconnecter
- [ ] Vérifier que le menu affiche "Connexion" et "Inscription"

### Test de protection des routes
- [ ] Se déconnecter
- [ ] Essayer d'accéder à `dashboard.html` directement
- [ ] Être redirigé automatiquement vers `login.html`

## 🎨 Phase 5: Personnalisation (Optionnel)

- [ ] Remplacer les images placeholder par vos vraies images
- [ ] Modifier les couleurs dans `css/style.css`
- [ ] Personnaliser les textes dans les pages HTML
- [ ] Ajouter votre logo
- [ ] Modifier les informations de contact

## 🚀 Phase 6: Déploiement (Optionnel)

### Firebase Hosting
- [ ] Installer Firebase CLI: `npm install -g firebase-tools`
- [ ] Se connecter: `firebase login`
- [ ] Initialiser: `firebase init`
- [ ] Sélectionner "Hosting"
- [ ] Choisir le projet "ovom-94e6b"
- [ ] Public directory: `.` (point)
- [ ] Single-page app: No
- [ ] Déployer: `firebase deploy`
- [ ] Visiter l'URL fournie

## 📊 Phase 7: Monitoring

- [ ] Activer Google Analytics dans Firebase Console
- [ ] Configurer les alertes de quota
- [ ] Surveiller l'utilisation dans Firebase Console
- [ ] Vérifier les logs d'erreurs

## 🎉 Félicitations !

Si toutes les cases sont cochées, votre application Ovom est opérationnelle !

## 📝 Notes

**Date de configuration**: _______________

**Problèmes rencontrés**:
- 
- 
- 

**Solutions appliquées**:
- 
- 
- 

## 🆘 En cas de problème

### Erreur "invalid-api-key"
→ Vérifiez que vous avez copié la clé API complète sans espaces

### Erreur "permission-denied"
→ Vérifiez que les règles Firestore sont publiées

### Erreur CORS
→ Utilisez un serveur local, n'ouvrez pas le fichier HTML directement

### Page blanche
→ Ouvrez la console du navigateur (F12) pour voir les erreurs

### Redirection infinie
→ Vérifiez que Firebase est bien initialisé dans firebase-config.js

## 📞 Support

Si vous êtes bloqué:
1. Consultez `FIREBASE_SETUP.md` pour plus de détails
2. Vérifiez la console du navigateur (F12)
3. Consultez la documentation Firebase
4. Contactez: contact@ovom.com

---

**Temps total estimé**: 30-40 minutes
**Niveau de difficulté**: Débutant à Intermédiaire
