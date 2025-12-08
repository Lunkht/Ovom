import { supabase } from './supabase-config.js';

async function fetchEstablishments({ q = '', type = '' } = {}) {
  let query = supabase.from('establishments').select('*').order('created_at', { ascending: false });
  if (type) query = query.eq('type', type);
  if (q) {
    // simple ilike filter on name and city
    query = query.or(`name.ilike.%${q}%,city.ilike.%${q}%`);
  }
  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

function renderResults(list) {
  const container = document.getElementById('estResults');
  if (!container) return;
  container.innerHTML = '';
  if (!list.length) {
    container.innerHTML = '<p>Aucun établissement trouvé.</p>';
    return;
  }
  list.forEach(e => {
    const el = document.createElement('div');
    el.className = 'service-card';
    el.innerHTML = `
      <div class="service-icon"><img src="${e.image_url || 'https://img.icons8.com/office/80/000000/medical-heart.png'}" alt=""></div>
      <h3>${escapeHtml(e.name)} <small style="font-weight:400;color:#666">(${escapeHtml(e.type)})</small></h3>
      <p style="color:#444">${escapeHtml(e.address || '')} ${e.city ? ' - ' + escapeHtml(e.city) : ''}</p>
      <p style="color:#666;margin-top:8px">${escapeHtml(e.phone || '')} ${e.email ? ' • ' + escapeHtml(e.email) : ''}</p>
    `;
    container.appendChild(el);
  });
}

function escapeHtml(s) { return (s || '').toString().replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"})[c]); }

document.addEventListener('DOMContentLoaded', async () => {
  const search = document.getElementById('estSearch');
  const filter = document.getElementById('estFilter');
  const refresh = document.getElementById('estRefresh');

  async function load() {
    try {
      const q = search?.value.trim() || '';
      const t = filter?.value || '';
      const data = await fetchEstablishments({ q, type: t });
      renderResults(data);
    } catch (err) {
      console.error(err);
      const container = document.getElementById('estResults');
      if (container) container.innerHTML = '<p>Erreur de chargement.</p>';
    }
  }

  if (search) search.addEventListener('input', () => load());
  if (filter) filter.addEventListener('change', () => load());
  if (refresh) refresh.addEventListener('click', () => load());

  // initial load
  load();
});
