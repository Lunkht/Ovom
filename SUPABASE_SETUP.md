# 🚀 Configuration Supabase - Guide Rapide

## ✅ Vos clés Supabase sont déjà configurées !

> **Note :** Ce projet a été migré vers **Firebase**. Les fichiers et guides Supabase sont conservés pour historique et migration éventuelle, mais le code actif utilise maintenant Firebase (voir `js/firebase-config.js`).

## 📋 Étape 1 : Créer les tables (2 minutes)
2. Sélectionnez votre projet **Ovom**
3. Dans le menu de gauche, cliquez sur **SQL Editor**
4. Cliquez sur **"New query"**
5. Copiez tout le contenu du fichier **`supabase-schema.sql`**
6. Collez-le dans l'éditeur SQL
7. Cliquez sur **"Run"** (ou appuyez sur Ctrl+Enter)

✅ Les tables `users` et `contacts` sont maintenant créées !

## 🔐 Étape 2 : Configurer l'authentification (1 minute)

1. Dans le menu de gauche, cliquez sur **Authentication**
2. Cliquez sur **Providers**
3. Vérifiez que **Email** est activé (il devrait l'être par défaut)
4. Si ce n'est pas le cas, activez-le

✅ L'authentification par email est prête !

## 🧪 Étape 3 : Tester (2 minutes)

1. Lancez un serveur local :
   ```bash
   python -m http.server 8000
   ```

2. Ouvrez `http://localhost:8000`

3. Testez l'inscription :
   - Allez sur `signup.html`
   - Remplissez le formulaire :
     - Prénom: Test
     - Nom: Utilisateur
     - Email: test@example.com
     - Téléphone: +221 77 123 45 67
     - Adresse: Dakar, Sénégal
     - Mot de passe: test123456
   - Cliquez sur "Créer mon compte"
   - Vous devriez être redirigé vers le dashboard

4. Vérifiez dans Supabase :
   - **Authentication** → **Users** → Vous devriez voir votre utilisateur
   - **Table Editor** → **users** → Vous devriez voir vos données

5. Testez la connexion :
   - Déconnectez-vous
   - Allez sur `login.html`
   - Connectez-vous avec test@example.com / test123456
   - Vous devriez être redirigé vers le dashboard

6. Testez le formulaire de contact :
   - Allez sur `contact.html`
   - Remplissez et envoyez un message
   - Vérifiez dans **Table Editor** → **contacts**

## 📊 Structure des tables

### Table `users`
```sql
- id (UUID) - Référence à auth.users
- name (TEXT) - Nom complet
- email (TEXT) - Email
- phone (TEXT) - Téléphone
- address (TEXT) - Adresse
- created_at (TIMESTAMP) - Date de création
```

### Table `contacts`
```sql
- id (UUID) - ID unique
- name (TEXT) - Nom
- email (TEXT) - Email
- message (TEXT) - Message
- created_at (TIMESTAMP) - Date de création
```

## 🔒 Sécurité (Row Level Security)

Les politiques de sécurité sont déjà configurées :

- ✅ **Users** : Chaque utilisateur peut lire/modifier uniquement ses propres données
- ✅ **Contacts** : Tout le monde peut créer, seuls les utilisateurs authentifiés peuvent lire

## ❓ Problèmes Courants

### "Failed to fetch" ou erreur CORS
→ Utilisez un serveur local (python -m http.server 8000)

### "relation 'users' does not exist"
→ Vous n'avez pas exécuté le script SQL (Étape 1)

### "Invalid login credentials"
→ Vérifiez l'email et le mot de passe

### "User already registered"
→ Cet email est déjà utilisé, essayez avec un autre

## 🎯 Fonctionnalités disponibles

- ✅ Inscription avec tous les champs (Prénom, Nom, Email, Téléphone, Adresse)
- ✅ Validation des mots de passe
- ✅ Connexion
- ✅ Déconnexion
- ✅ Dashboard utilisateur
- ✅ Formulaire de contact
- ✅ Protection des routes
- ✅ Navigation dynamique

## 📧 Confirmation d'email (Optionnel)

Par défaut, Supabase envoie un email de confirmation. Pour le désactiver en développement :

1. Allez dans **Authentication** → **Settings**
2. Désactivez **"Enable email confirmations"**

## 🚀 Prêt à utiliser !

Une fois les tables créées (Étape 1), tout fonctionne immédiatement ! 

Supabase est beaucoup plus simple que Firebase :
- ✅ Pas besoin de règles complexes
- ✅ Interface SQL intuitive
- ✅ Dashboard clair et simple
- ✅ Configuration en 5 minutes

---

**Bon développement avec Supabase ! 🎉**
