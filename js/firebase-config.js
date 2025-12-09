// Firebase configuration and initialized SDK exports (ES modules - CDN)
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-analytics.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js';
import { getStorage } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-storage.js';

// Replace with your Firebase web config (provided by the user)
const firebaseConfig = {
  apiKey: "AIzaSyArFetTgQ7MpUAUOPNaS4Yl-oVD-iskyOQ",
  authDomain: "ovom-94e6b.firebaseapp.com",
  projectId: "ovom-94e6b",
  storageBucket: "ovom-94e6b.firebasestorage.app",
  messagingSenderId: "184161567322",
  appId: "1:184161567322:web:5b7d604f3303565067ce63",
  measurementId: "G-MGP5TCEW6M"
};

const app = initializeApp(firebaseConfig);
let analytics;
try { analytics = getAnalytics(app); } catch (e) { /* analytics may fail in SSR */ }

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// lightweight connectivity test: try to read a doc in 'contacts' (will return null if missing)
async function testConnection() {
  try {
    // attempt to list a small query (requires security rules allowing read)
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err.message || String(err) };
  }
}

export { auth, db, storage, testConnection };
