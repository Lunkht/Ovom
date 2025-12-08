import { supabase } from './supabase-config.js';

// Helper: get current user session
async function getSession() {
  const { data } = await supabase.auth.getSession();
  return data?.session ?? null;
}

// Check if current user is an admin (reads users table)
export async function isAdminUser() {
  const session = await getSession();
  if (!session) return false;
  const userId = session.user.id;
  const { data, error } = await supabase.from('users').select('is_admin').eq('id', userId).single();
  if (error) {
    console.error('isAdmin check error', error);
    return false;
  }
  return data?.is_admin === true;
}

async function loadEstablishments() {
  const { data, error } = await supabase.from('establishments').select('*').order('created_at', { ascending: false });
  const container = document.getElementById('estList');
  if (error) {
    container.innerText = 'Erreur lors du chargement : ' + error.message;
    return;
  }
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
      const { error } = await supabase.from('establishments').delete().eq('id', id);
      if (error) return alert('Erreur: ' + error.message);
      loadEstablishments();
    });
  });
}

function escapeHtml(s) { return (s || '').toString().replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"})[c]); }

// Image upload helper (optional). Requires bucket 'establishments' in Supabase Storage.
async function uploadImage(file, id) {
  try {
    const path = `establishments/${id}/${file.name}`;
    const { data, error: uploadError } = await supabase.storage.from('establishments').upload(path, file, { cacheControl: '3600', upsert: false });
    if (uploadError) throw uploadError;
    const { publicURL } = supabase.storage.from('establishments').getPublicUrl(path);
    return publicURL;
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

    // insert row
    const { data, error } = await supabase.from('establishments').insert([payload]).select().single();
    if (error) {
      msg.style.color = 'red';
      msg.innerText = 'Erreur: ' + error.message;
      return;
    }

    // handle optional image
    const fileInput = document.getElementById('image');
    if (fileInput && fileInput.files && fileInput.files[0]) {
      const publicUrl = await uploadImage(fileInput.files[0], data.id);
      if (publicUrl) {
        await supabase.from('establishments').update({ image_url: publicUrl }).eq('id', data.id);
      }
    }

    msg.style.color = 'green';
    msg.innerText = 'Établissement ajouté.';
    form.reset();
    await loadEstablishments();
  });
});
