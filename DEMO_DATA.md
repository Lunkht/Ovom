# 📊 Données de Démonstration - Ovom

## Comptes de Test

Pour tester l'application, vous pouvez créer ces comptes:

### Utilisateur Patient
- **Nom**: Amadou Diallo
- **Email**: amadou.diallo@example.com
- **Mot de passe**: test123456

### Utilisateur Médecin
- **Nom**: Dr. Fatou Sow
- **Email**: fatou.sow@example.com
- **Mot de passe**: test123456

### Utilisateur Sage-femme
- **Nom**: Aïcha N'diaye
- **Email**: aicha.ndiaye@example.com
- **Mot de passe**: test123456

## Structure des Données Firestore

### Collection: users

```json
{
  "userId1": {
    "name": "Amadou Diallo",
    "email": "amadou.diallo@example.com",
    "createdAt": "2025-12-04T10:00:00Z",
    "role": "patient",
    "phone": "+221 77 123 45 67",
    "location": "Dakar, Sénégal"
  }
}
```

### Collection: contacts

```json
{
  "contactId1": {
    "name": "Marie Dupont",
    "email": "marie.dupont@example.com",
    "message": "Je souhaite avoir plus d'informations sur vos services de téléconsultation.",
    "createdAt": "2025-12-04T11:30:00Z",
    "status": "new"
  }
}
```

### Collection: appointments (à implémenter)

```json
{
  "appointmentId1": {
    "patientId": "userId1",
    "doctorId": "userId2",
    "date": "2025-12-10T14:00:00Z",
    "type": "teleconsultation",
    "status": "scheduled",
    "reason": "Consultation générale",
    "createdAt": "2025-12-04T12:00:00Z"
  }
}
```

### Collection: medical_records (à implémenter)

```json
{
  "recordId1": {
    "patientId": "userId1",
    "type": "consultation",
    "date": "2025-12-01T10:00:00Z",
    "doctorId": "userId2",
    "diagnosis": "Grippe saisonnière",
    "prescription": "Paracétamol 500mg, 3x par jour",
    "notes": "Repos recommandé pendant 3 jours",
    "createdAt": "2025-12-01T10:30:00Z"
  }
}
```

### Collection: pharmacies (à implémenter)

```json
{
  "pharmacyId1": {
    "name": "Pharmacie du Plateau",
    "address": "Avenue Léopold Sédar Senghor, Dakar",
    "phone": "+221 33 821 12 34",
    "isOnDuty": true,
    "location": {
      "latitude": 14.6937,
      "longitude": -17.4441
    },
    "hours": {
      "monday": "08:00-20:00",
      "tuesday": "08:00-20:00",
      "wednesday": "08:00-20:00",
      "thursday": "08:00-20:00",
      "friday": "08:00-20:00",
      "saturday": "09:00-18:00",
      "sunday": "Fermé"
    }
  }
}
```

### Collection: hospitals (à implémenter)

```json
{
  "hospitalId1": {
    "name": "Hôpital Principal de Dakar",
    "type": "public",
    "address": "Avenue Nelson Mandela, Dakar",
    "phone": "+221 33 839 50 50",
    "services": ["urgences", "maternité", "chirurgie", "pédiatrie"],
    "location": {
      "latitude": 14.6928,
      "longitude": -17.4467
    },
    "hasEmergency": true
  }
}
```

## Scénarios de Test

### 1. Inscription et Connexion
1. Allez sur `signup.html`
2. Créez un compte avec un email valide
3. Vérifiez que vous êtes redirigé vers `dashboard.html`
4. Déconnectez-vous
5. Reconnectez-vous via `login.html`

### 2. Formulaire de Contact
1. Allez sur `contact.html`
2. Remplissez le formulaire
3. Vérifiez dans Firebase Console → Firestore → Collection `contacts`

### 3. Navigation Dynamique
1. Visitez `index.html` sans être connecté
2. Notez les boutons "Connexion" et "Inscription"
3. Connectez-vous
4. Revenez sur `index.html`
5. Notez que les boutons ont changé en "Mon compte" et "Déconnexion"

### 4. Protection des Routes
1. Essayez d'accéder à `dashboard.html` sans être connecté
2. Vous devriez être redirigé vers `login.html`
3. Connectez-vous
4. Vous devriez pouvoir accéder au dashboard

## Données de Test pour Firebase Console

Si vous voulez ajouter manuellement des données de test dans Firestore:

1. Allez dans Firebase Console → Firestore Database
2. Cliquez sur "Ajouter une collection"
3. Utilisez les structures JSON ci-dessus

## Commandes Utiles

### Réinitialiser les données de test

Pour supprimer toutes les données de test:
1. Firebase Console → Firestore Database
2. Sélectionnez une collection
3. Cliquez sur les trois points → Supprimer la collection

### Exporter les données

```bash
# Installer Firebase CLI
npm install -g firebase-tools

# Exporter Firestore
firebase firestore:export export-folder
```

### Importer les données

```bash
firebase firestore:import export-folder
```

## Notes de Sécurité

⚠️ **Important**: Ces données sont pour la démonstration uniquement.

- N'utilisez jamais de vraies données médicales en test
- Utilisez des emails de test (exemple: test@example.com)
- Ne partagez jamais vos clés API Firebase publiquement
- Activez toujours les règles de sécurité Firestore en production

## Prochaines Fonctionnalités à Implémenter

- [ ] Gestion des rendez-vous
- [ ] Dossier médical personnel
- [ ] Recherche de pharmacies de garde
- [ ] Géolocalisation des hôpitaux
- [ ] Système de téléconsultation vidéo
- [ ] Notifications push
- [ ] Chat en temps réel avec les médecins
- [ ] Rappels de médicaments
- [ ] Suivi de grossesse
- [ ] Historique des consultations
