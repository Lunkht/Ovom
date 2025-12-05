# 🚀 Démarrage Rapide - Ovom

## Configuration en 5 minutes

### 1️⃣ Récupérer vos clés Firebase (2 min)

1. Allez sur [console.firebase.google.com](https://console.firebase.google.com)
2. Sélectionnez le projet **"Ovom"** (ovom-94e6b)
3. Cliquez sur ⚙️ → **Paramètres du projet**
4. Faites défiler jusqu'à **"Vos applications"**
5. Cliquez sur l'application web ou créez-en une
6. Copiez `apiKey` et `appId`

### 2️⃣ Mettre à jour la configuration (1 min)

Ouvrez **`js/firebase-config.js`** et remplacez:

```javascript
apiKey: "VOTRE_API_KEY",        // ← Collez votre apiKey ici
appId: "VOTRE_APP_ID"           // ← Collez votre appId ici
```

### 3️⃣ Activer les services Firebase (2 min)

Dans la console Firebase:

**Authentication:**
- Menu → Authentication → Commencer
- Activez "E-mail/Mot de passe"

**Firestore:**
- Menu → Firestore Database → Créer une base de données
- Mode: Production
- Région: europe-west

**Règles de sécurité:**
- Copiez le contenu de `firestore.rules`
- Collez dans l'onglet "Règles" de Firestore
- Publiez

### 4️⃣ Lancer l'application (30 sec)

```bash
# Avec Python
python -m http.server 8000

# Avec Node.js
npx http-server

# Avec PHP
php -S localhost:8000
```

Ouvrez: `http://localhost:8000`

### 5️⃣ Tester (30 sec)

1. Ouvrez `test-firebase.html`
2. Cliquez sur les 3 boutons de test
3. Tout doit être ✅ vert

## 🎉 C'est prêt !

Vous pouvez maintenant:
- Créer un compte sur `signup.html`
- Se connecter sur `login.html`
- Accéder au dashboard sur `dashboard.html`
- Envoyer un message sur `contact.html`

## 📚 Documentation complète

Pour plus de détails, consultez:
- **FIREBASE_SETUP.md** - Guide détaillé de configuration
- **README.md** - Documentation générale du projet

## ❓ Problèmes ?

**Erreur "invalid-api-key"**
→ Vérifiez que vous avez bien copié l'apiKey complète

**Erreur "permission-denied"**
→ Vérifiez que les règles Firestore sont publiées

**Erreur CORS**
→ Utilisez un serveur local, ne pas ouvrir le fichier directement

## 📞 Support

contact@ovom.com
