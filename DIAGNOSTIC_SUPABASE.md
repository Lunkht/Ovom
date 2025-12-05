# 🔍 Diagnostic Supabase - Connexion/Inscription

## ❌ Problème : L'inscription et la connexion ne marchent pas

## 🧪 Étape 1 : Diagnostic (2 minutes)

1. **Lancez un serveur local** :
   ```bash
   python -m http.server 8000
   ```

2. **Ouvrez le test** :
   - Allez sur `http://localhost:8000/test-supabase.html`
   - Cliquez sur **"Tester la Base de Données"**

3. **Résultats possibles** :

### ✅ Si vous voyez "Table users existe !" 
→ Les tables sont créées, le problème est ailleurs (voir Étape 3)

### ❌ Si vous voyez "Table users n'existe pas"
→ **C'est le problème !** Les tables ne sont pas créées (voir Étape 2)

## 🛠️ Étape 2 : Créer les tables (2 minutes)

**C'est probablement votre problème !**

1. **Allez sur [supabase.com/dashboard](https://supabase.com/dashboard)**
2. **Connectez-vous** avec votre compte
3. **Sélectionnez votre projet** (celui avec l'URL htzwapislazbjngzoffh.supabase.co)
4. **Cliquez sur "SQL Editor"** dans le menu de gauche
5. **Cliquez sur "New query"**
6. **Copiez TOUT le contenu** du fichier `supabase-schema.sql` :

```sql
-- Schema Supabase pour Ovom
-- Exécutez ce script dans l'éditeur SQL de Supabase

-- Table users (informations utilisateurs)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table contacts (messages de contact)
CREATE TABLE IF NOT EXISTS contacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Activer Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Politique pour users : un utilisateur peut lire/modifier uniquement ses propres données
CREATE POLICY "Users can read own data"
    ON users FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
    ON users FOR UPDATE
    USING (auth.uid() = id);

CREATE POLICY "Users can insert own data"
    ON users FOR INSERT
    WITH CHECK (auth.uid() = id);

-- Politique pour contacts : tout le monde peut créer, seuls les admins peuvent lire
CREATE POLICY "Anyone can create contact"
    ON contacts FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Authenticated users can read contacts"
    ON contacts FOR SELECT
    USING (auth.role() = 'authenticated');

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS users_email_idx ON users(email);
CREATE INDEX IF NOT EXISTS contacts_created_at_idx ON contacts(created_at DESC);
```

7. **Collez-le dans l'éditeur SQL**
8. **Cliquez sur "Run"** (ou appuyez sur Ctrl+Enter)
9. **Vous devriez voir "Success. No rows returned"**

## ✅ Étape 3 : Tester à nouveau (1 minute)

1. **Retournez sur** `test-supabase.html`
2. **Cliquez sur "Tester la Base de Données"**
3. **Vous devriez maintenant voir** :
   - ✅ Table "users" existe !
   - ✅ Table "contacts" existe !
   - ✅ Base de données configurée correctement !

## 🧪 Étape 4 : Tester l'inscription (1 minute)

1. **Allez sur** `signup.html`
2. **Remplissez le formulaire** :
   - Prénom: Test
   - Nom: Utilisateur  
   - Email: test@example.com
   - Téléphone: +221 77 123 45 67
   - Adresse: Dakar, Sénégal
   - Mot de passe: test123456
   - Confirmer: test123456
3. **Cliquez sur "Créer mon compte"**
4. **Vous devriez** :
   - Voir "Compte créé avec succès !"
   - Être redirigé vers `dashboard.html`
   - Voir votre nom dans le dashboard

## 🔍 Étape 5 : Vérifier dans Supabase (1 minute)

1. **Dans Supabase Dashboard**, cliquez sur **"Authentication"**
2. **Vous devriez voir votre utilisateur** test@example.com
3. **Cliquez sur "Table Editor"**
4. **Sélectionnez la table "users"**
5. **Vous devriez voir vos données** (nom, email, téléphone, adresse)

## ❓ Problèmes courants

### "Failed to fetch" ou erreur CORS
→ **Utilisez un serveur local** : `python -m http.server 8000`

### "relation 'users' does not exist"
→ **Vous n'avez pas exécuté le script SQL** (Étape 2)

### "Invalid login credentials"
→ **Email/mot de passe incorrect** lors de la connexion

### "User already registered"
→ **Cet email existe déjà**, utilisez un autre email

### "Password should be at least 6 characters"
→ **Mot de passe trop court**, utilisez au moins 6 caractères

## 🎯 Checklist de diagnostic

- [ ] Serveur local lancé (`python -m http.server 8000`)
- [ ] Test Supabase réussi (`test-supabase.html`)
- [ ] Tables créées (script SQL exécuté)
- [ ] Inscription testée avec un nouvel email
- [ ] Utilisateur visible dans Supabase Authentication
- [ ] Données visibles dans Supabase Table Editor

## 📞 Si ça ne marche toujours pas

1. **Ouvrez la console du navigateur** (F12)
2. **Regardez les erreurs** dans l'onglet Console
3. **Copiez l'erreur exacte** et contactez le support

---

**Dans 99% des cas, le problème est que les tables ne sont pas créées (Étape 2) ! 🎯**