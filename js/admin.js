import { auth, db, storage } from './firebase-config.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js';
import { doc, getDoc, getDocs, collection, query, orderBy, where, addDoc, deleteDoc, updateDoc } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-storage.js';

// Check if current user is an admin (reads users collection)
export async function isAdminUser() {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) return resolve(false);
      try {
        const snap = await getDoc(doc(db, 'users', user.uid));
        if (!snap.exists()) return resolve(false);
        const data = snap.data();
        resolve(data?.is_admin === true);
      } catch (err) {
        console.error('isAdmin check error', err);
        resolve(false);
      }
    });
  });
}

async function loadEstablishments() {
  try {
    const q = query(collection(db, 'establishments'), orderBy('created_at', 'desc'));
    const snap = await getDocs(q);
    const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    const container = document.getElementById('estList');
    if (!data || data.length === 0) {
      container.innerText = 'Aucun établissement.';
      return;
    }
    container.innerHTML = '';
    data.forEach(e => {
      const el = document.createElement('div');
      el.className = 'feature-card';
      el.style.marginBottom = '12px';
      el.innerHTML = `
        <h4 style="margin:0 0 6px 0">${escapeHtml(e.name)} <small style="color:#666;font-weight:400">(${escapeHtml(e.type)})</small></h4>
        <div style="font-size:0.95rem;color:#444">${escapeHtml(e.address || '')} ${e.city ? ' - ' + escapeHtml(e.city) : ''}</div>
        <div style="margin-top:6px"><button data-id="${e.id}" class="btn btn-secondary edit-btn">Éditer</button> <button data-id="${e.id}" class="btn delete-btn">Supprimer</button></div>
      `;
      container.appendChild(el);
    });

    // attach delete handlers
    container.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = btn.getAttribute('data-id');
        if (!confirm('Supprimer cet établissement ?')) return;
        try {
          await deleteDoc(doc(db, 'establishments', id));
          loadEstablishments();
        } catch (err) {
          alert('Erreur: ' + (err.message || err));
        }
      });
    });
  } catch (err) {
    const container = document.getElementById('estList');
    if (container) container.innerText = 'Erreur lors du chargement : ' + (err.message || err);
  }
}

function escapeHtml(s) { return (s || '').toString().replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"})[c]); }

// Image upload helper (optional). Requires bucket 'establishments' in Supabase Storage.
async function uploadImage(file, id) {
  try {
    const r = storageRef(storage, `establishments/${id}/${file.name}`);
    await uploadBytes(r, file);
    const url = await getDownloadURL(r);
    return url;
  } catch (err) {
    console.warn('Upload image failed', err);
    return null;
  }
}

// Initialize admin page
document.addEventListener('DOMContentLoaded', async () => {
  const allowed = await isAdminUser();
  if (!allowed) {
    document.body.innerHTML = '<main class="container" style="padding-top:96px;"><h2>Accès refusé</h2><p>Vous devez être administrateur pour accéder à cette page.</p></main>';
    return;
  }

  // load existing establishments
  await loadEstablishments();

  const form = document.getElementById('estForm');
  const msg = document.getElementById('adminMessage');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const payload = {
      name: document.getElementById('name').value,
      type: document.getElementById('type').value,
      address: document.getElementById('address').value,
      city: document.getElementById('city').value,
      phone: document.getElementById('phone').value,
      email: document.getElementById('email').value,
      website: document.getElementById('website').value,
    };

    // Géolocalisation automatique via Nominatim
    let lat = null, lng = null;
    if (payload.address || payload.city) {
      try {
        const q = encodeURIComponent(`${payload.address || ''} ${payload.city || ''}`.trim());
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${q}`;
        const resp = await fetch(url, { headers: { 'Accept-Language': 'fr' } });
        const results = await resp.json();
        if (results && results.length > 0) {
          lat = parseFloat(results[0].lat);
          lng = parseFloat(results[0].lon);
        }
      } catch (err) {
        console.warn('Géolocalisation échouée', err);
      }
    }
    if (lat && lng) {
      payload.latitude = lat;
      payload.longitude = lng;
    }

    // insert row in Firestore
    try {
      const docRef = await addDoc(collection(db, 'establishments'), {
        ...payload,
        created_at: new Date().toISOString()
      });

      // handle optional image
      const fileInput = document.getElementById('image');
      if (fileInput && fileInput.files && fileInput.files[0]) {
        const publicUrl = await uploadImage(fileInput.files[0], docRef.id);
        if (publicUrl) {
          await updateDoc(doc(db, 'establishments', docRef.id), { image_url: publicUrl });
        }
      }

      msg.style.color = 'green';
      msg.innerText = 'Établissement ajouté.';
      form.reset();
      await loadEstablishments();
    } catch (err) {
      msg.style.color = 'red';
      msg.innerText = 'Erreur: ' + (err.message || err);
    }
  });
});
