# 💡 Exemples de Code - Ovom

Ce fichier contient des exemples de code pour étendre les fonctionnalités de l'application.

## 📝 Ajouter un Profil Utilisateur Complet

### Créer un formulaire de profil (profile.html)

```html
<form id="profileForm">
    <input type="text" id="name" placeholder="Nom complet" required>
    <input type="tel" id="phone" placeholder="Téléphone">
    <input type="date" id="birthdate" placeholder="Date de naissance">
    <select id="gender">
        <option value="">Sexe</option>
        <option value="male">Homme</option>
        <option value="female">Femme</option>
        <option value="other">Autre</option>
    </select>
    <input type="text" id="location" placeholder="Ville">
    <button type="submit" class="btn btn-primary">Mettre à jour</button>
</form>
```

### JavaScript pour sauvegarder le profil

```javascript
import { auth, db } from './js/firebase-config.js';
import { doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

document.getElementById('profileForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const user = auth.currentUser;
    if (!user) return;
    
    const profileData = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        birthdate: document.getElementById('birthdate').value,
        gender: document.getElementById('gender').value,
        location: document.getElementById('location').value,
        updatedAt: new Date().toISOString()
    };
    
    try {
        await updateDoc(doc(db, "users", user.uid), profileData);
        alert('Profil mis à jour avec succès !');
    } catch (error) {
        alert('Erreur: ' + error.message);
    }
});
```

## 📅 Système de Rendez-vous

### Créer un rendez-vous

```javascript
import { db } from './js/firebase-config.js';
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

async function createAppointment(patientId, doctorId, date, reason) {
    try {
        const docRef = await addDoc(collection(db, "appointments"), {
            patientId: patientId,
            doctorId: doctorId,
            date: date,
            reason: reason,
            status: "scheduled",
            createdAt: new Date().toISOString()
        });
        
        return { success: true, id: docRef.id };
    } catch (error) {
        return { success: false, error: error.message };
    }
}
```

### Récupérer les rendez-vous d'un utilisateur

```javascript
import { db } from './js/firebase-config.js';
import { collection, query, where, getDocs, orderBy } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

async function getUserAppointments(userId) {
    try {
        const q = query(
            collection(db, "appointments"),
            where("patientId", "==", userId),
            orderBy("date", "desc")
        );
        
        const querySnapshot = await getDocs(q);
        const appointments = [];
        
        querySnapshot.forEach((doc) => {
            appointments.push({
                id: doc.id,
                ...doc.data()
            });
        });
        
        return { success: true, appointments };
    } catch (error) {
        return { success: false, error: error.message };
    }
}
```

## 🏥 Recherche de Pharmacies

### Ajouter une pharmacie

```javascript
import { db } from './js/firebase-config.js';
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

async function addPharmacy(pharmacyData) {
    try {
        const docRef = await addDoc(collection(db, "pharmacies"), {
            name: pharmacyData.name,
            address: pharmacyData.address,
            phone: pharmacyData.phone,
            isOnDuty: pharmacyData.isOnDuty || false,
            location: {
                latitude: pharmacyData.latitude,
                longitude: pharmacyData.longitude
            },
            createdAt: new Date().toISOString()
        });
        
        return { success: true, id: docRef.id };
    } catch (error) {
        return { success: false, error: error.message };
    }
}
```

### Rechercher les pharmacies de garde

```javascript
import { db } from './js/firebase-config.js';
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

async function getOnDutyPharmacies() {
    try {
        const q = query(
            collection(db, "pharmacies"),
            where("isOnDuty", "==", true)
        );
        
        const querySnapshot = await getDocs(q);
        const pharmacies = [];
        
        querySnapshot.forEach((doc) => {
            pharmacies.push({
                id: doc.id,
                ...doc.data()
            });
        });
        
        return { success: true, pharmacies };
    } catch (error) {
        return { success: false, error: error.message };
    }
}
```

## 📍 Géolocalisation

### Obtenir la position de l'utilisateur

```javascript
function getUserLocation() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('Géolocalisation non supportée'));
            return;
        }
        
        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
            },
            (error) => {
                reject(error);
            }
        );
    });
}
```

### Calculer la distance entre deux points

```javascript
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Rayon de la Terre en km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    
    return distance; // Distance en km
}
```

### Trouver les pharmacies les plus proches

```javascript
async function findNearestPharmacies(userLat, userLon, limit = 5) {
    try {
        const result = await getOnDutyPharmacies();
        if (!result.success) return result;
        
        // Calculer la distance pour chaque pharmacie
        const pharmaciesWithDistance = result.pharmacies.map(pharmacy => ({
            ...pharmacy,
            distance: calculateDistance(
                userLat,
                userLon,
                pharmacy.location.latitude,
                pharmacy.location.longitude
            )
        }));
        
        // Trier par distance
        pharmaciesWithDistance.sort((a, b) => a.distance - b.distance);
        
        // Retourner les N plus proches
        return {
            success: true,
            pharmacies: pharmaciesWithDistance.slice(0, limit)
        };
    } catch (error) {
        return { success: false, error: error.message };
    }
}
```

## 🔔 Notifications

### Demander la permission pour les notifications

```javascript
async function requestNotificationPermission() {
    if (!('Notification' in window)) {
        return { success: false, error: 'Notifications non supportées' };
    }
    
    const permission = await Notification.requestPermission();
    return { success: permission === 'granted', permission };
}
```

### Envoyer une notification locale

```javascript
function sendLocalNotification(title, body, icon = '/images/logo.png') {
    if (Notification.permission === 'granted') {
        new Notification(title, {
            body: body,
            icon: icon,
            badge: icon
        });
    }
}

// Exemple d'utilisation
sendLocalNotification(
    'Rappel de rendez-vous',
    'Vous avez un rendez-vous demain à 14h00'
);
```

## 💬 Chat en Temps Réel

### Envoyer un message

```javascript
import { db } from './js/firebase-config.js';
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

async function sendMessage(chatId, senderId, message) {
    try {
        await addDoc(collection(db, "chats", chatId, "messages"), {
            senderId: senderId,
            message: message,
            timestamp: serverTimestamp(),
            read: false
        });
        
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
}
```

### Écouter les nouveaux messages

```javascript
import { db } from './js/firebase-config.js';
import { collection, query, orderBy, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

function listenToMessages(chatId, callback) {
    const q = query(
        collection(db, "chats", chatId, "messages"),
        orderBy("timestamp", "asc")
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
        const messages = [];
        snapshot.forEach((doc) => {
            messages.push({
                id: doc.id,
                ...doc.data()
            });
        });
        callback(messages);
    });
    
    return unsubscribe; // Appeler cette fonction pour arrêter l'écoute
}

// Exemple d'utilisation
const unsubscribe = listenToMessages('chat123', (messages) => {
    console.log('Nouveaux messages:', messages);
    // Mettre à jour l'interface utilisateur
});

// Pour arrêter l'écoute
// unsubscribe();
```

## 🔐 Réinitialisation de Mot de Passe

```javascript
import { auth } from './js/firebase-config.js';
import { sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

async function resetPassword(email) {
    try {
        await sendPasswordResetEmail(auth, email);
        return { success: true, message: 'Email de réinitialisation envoyé' };
    } catch (error) {
        return { success: false, error: error.message };
    }
}
```

## 📸 Upload d'Images

### Upload d'une photo de profil

```javascript
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";
import { doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

async function uploadProfilePicture(userId, file) {
    try {
        const storage = getStorage();
        const storageRef = ref(storage, `profile-pictures/${userId}`);
        
        // Upload du fichier
        await uploadBytes(storageRef, file);
        
        // Obtenir l'URL de téléchargement
        const downloadURL = await getDownloadURL(storageRef);
        
        // Mettre à jour le profil utilisateur
        await updateDoc(doc(db, "users", userId), {
            photoURL: downloadURL
        });
        
        return { success: true, url: downloadURL };
    } catch (error) {
        return { success: false, error: error.message };
    }
}
```

## 🔍 Recherche Avancée

### Recherche de médecins par spécialité

```javascript
import { db } from './js/firebase-config.js';
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

async function searchDoctorsBySpecialty(specialty) {
    try {
        const q = query(
            collection(db, "doctors"),
            where("specialty", "==", specialty),
            where("available", "==", true)
        );
        
        const querySnapshot = await getDocs(q);
        const doctors = [];
        
        querySnapshot.forEach((doc) => {
            doctors.push({
                id: doc.id,
                ...doc.data()
            });
        });
        
        return { success: true, doctors };
    } catch (error) {
        return { success: false, error: error.message };
    }
}
```

## 📊 Statistiques Utilisateur

### Obtenir les statistiques d'un patient

```javascript
async function getPatientStats(userId) {
    try {
        // Nombre de rendez-vous
        const appointmentsQuery = query(
            collection(db, "appointments"),
            where("patientId", "==", userId)
        );
        const appointmentsSnapshot = await getDocs(appointmentsQuery);
        
        // Nombre de consultations
        const consultationsQuery = query(
            collection(db, "medical_records"),
            where("patientId", "==", userId),
            where("type", "==", "consultation")
        );
        const consultationsSnapshot = await getDocs(consultationsQuery);
        
        return {
            success: true,
            stats: {
                totalAppointments: appointmentsSnapshot.size,
                totalConsultations: consultationsSnapshot.size
            }
        };
    } catch (error) {
        return { success: false, error: error.message };
    }
}
```

## 🎨 Thème Sombre

### Toggle du thème

```javascript
function toggleTheme() {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// Charger le thème sauvegardé
function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);
}

// Appeler au chargement de la page
loadTheme();
```

### CSS pour le thème sombre

```css
[data-theme="dark"] {
    --primary-color: #3ab0a0;
    --secondary-color: #1a3a47;
    --light-bg: #1e1e1e;
    --dark-text: #e0e0e0;
    --white-text: #121212;
}

[data-theme="dark"] body {
    background-color: #121212;
    color: #e0e0e0;
}
```

---

Ces exemples vous donnent une base solide pour étendre les fonctionnalités d'Ovom. N'hésitez pas à les adapter selon vos besoins !
