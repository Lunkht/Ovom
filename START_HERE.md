# 🎯 COMMENCEZ ICI - Ovom

## 👋 Bienvenue !

Vous avez maintenant un projet web complet connecté à Firebase. Voici comment démarrer en 3 étapes simples.

---

## 🚀 Étape 1: Récupérer vos clés Firebase (2 minutes)

### Allez sur Firebase Console
1. Ouvrez [console.firebase.google.com](https://console.firebase.google.com)
2. Sélectionnez le projet **"Ovom"**
3. Cliquez sur l'icône ⚙️ en haut à gauche
4. Cliquez sur **"Paramètres du projet"**
5. Faites défiler jusqu'à **"Vos applications"**
6. Vous verrez quelque chose comme ça:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyAbc123...",           // ← COPIEZ CETTE VALEUR
  authDomain: "ovom-94e6b.firebaseapp.com",
  projectId: "ovom-94e6b",
  storageBucket: "ovom-94e6b.firebasestorage.app",
  messagingSenderId: "184161567322",
  appId: "1:184161567322:web:abc123..." // ← COPIEZ CETTE VALEUR
};
```

7. **Copiez** les valeurs de `apiKey` et `appId`

---

## ✏️ Étape 2: Mettre à jour votre code (1 minute)

### Ouvrez le fichier de configuration
1. Dans votre éditeur de code, ouvrez: **`js/firebase-config.js`**
2. Trouvez ces deux lignes:
   ```javascript
   apiKey: "VOTRE_API_KEY",
   appId: "VOTRE_APP_ID"
   ```
3. **Remplacez** `VOTRE_API_KEY` par votre vraie clé
4. **Remplacez** `VOTRE_APP_ID` par votre vrai ID
5. **Sauvegardez** le fichier

### Exemple:
```javascript
// AVANT
apiKey: "VOTRE_API_KEY",
appId: "VOTRE_APP_ID"

// APRÈS
apiKey: "AIzaSyAbc123def456ghi789jkl012mno345pqr",
appId: "1:184161567322:web:abc123def456ghi789"
```

---

## 🎮 Étape 3: Lancer l'application (1 minute)

### Ouvrez un terminal dans ce dossier

**Sur Windows:**
- Clic droit dans le dossier → "Ouvrir dans le terminal"

**Sur Mac:**
- Clic droit dans le dossier → "Nouveau terminal dans le dossier"

### Lancez un serveur local

Copiez-collez UNE de ces commandes:

```bash
# Si vous avez Python (recommandé)
python -m http.server 8000

# Si vous avez Node.js
npx http-server

# Si vous avez PHP
php -S localhost:8000
```

### Ouvrez votre navigateur
Allez sur: **http://localhost:8000**

---

## ✅ C'est tout !

Votre application est maintenant en ligne localement !

---

## 🧪 Testez votre application

### 1. Créez un compte
- Allez sur **signup.html**
- Créez un compte avec votre email
- Vous serez redirigé vers le dashboard

### 2. Testez le formulaire de contact
- Allez sur **contact.html**
- Envoyez un message
- Vérifiez dans Firebase Console que le message est enregistré

### 3. Testez la connexion
- Déconnectez-vous
- Reconnectez-vous via **login.html**

---

## 📚 Documentation Disponible

Selon votre besoin, consultez:

| Fichier | Quand l'utiliser |
|---------|------------------|
| **QUICK_START.md** | Guide rapide en 5 minutes |
| **CHECKLIST.md** | Liste de vérification complète |
| **FIREBASE_SETUP.md** | Guide détaillé de configuration Firebase |
| **README.md** | Documentation générale du projet |
| **EXAMPLES.md** | Pour ajouter de nouvelles fonctionnalités |
| **DEMO_DATA.md** | Données de test et scénarios |
| **PROJECT_SUMMARY.md** | Vue d'ensemble du projet |

---

## ❓ Problèmes Courants

### "Erreur: invalid-api-key"
→ Vous n'avez pas mis à jour `js/firebase-config.js` avec vos vraies clés

### "Erreur CORS" ou "Cross-origin"
→ Vous devez utiliser un serveur local (voir Étape 3)

### Page blanche
→ Appuyez sur F12 pour ouvrir la console et voir l'erreur

### "Authentication not enabled"
→ Allez dans Firebase Console → Authentication → Activez "Email/Password"

---

## 🎯 Prochaines Étapes

Une fois que tout fonctionne:

1. **Activez les services Firebase** (voir FIREBASE_SETUP.md)
   - Authentication
   - Firestore Database
   - Règles de sécurité

2. **Personnalisez votre application**
   - Changez les couleurs dans `css/style.css`
   - Modifiez les textes dans les fichiers HTML
   - Ajoutez votre logo

3. **Ajoutez des fonctionnalités** (voir EXAMPLES.md)
   - Système de rendez-vous
   - Géolocalisation
   - Chat en temps réel
   - Notifications

---

## 🆘 Besoin d'Aide ?

1. **Consultez la documentation** dans les fichiers .md
2. **Vérifiez la console du navigateur** (F12)
3. **Testez avec** `test-firebase.html`
4. **Contactez**: contact@ovom.com

---

## 🎉 Félicitations !

Vous avez maintenant une application web moderne connectée à Firebase !

**Bon développement ! 🚀**

---

### 📌 Rappel Important

**N'oubliez pas d'activer dans Firebase Console:**
- ✅ Authentication (Email/Password)
- ✅ Firestore Database
- ✅ Règles de sécurité

Voir **FIREBASE_SETUP.md** pour les instructions détaillées.
