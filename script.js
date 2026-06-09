async function loadSiteData() {
  const response = await fetch('/content/site.json?cache=' + Date.now());
  if (!response.ok) throw new Error('site.json okunamadı');
  return response.json();
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (el && value !== undefined && value !== null) el.textContent = value;
}

function setHTMLFromText(id, value) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = value || '';
}

function applyTheme(theme = {}) {
  const root = document.documentElement;
  if (theme.bg1) root.style.setProperty('--bg1', theme.bg1);
  if (theme.bg2) root.style.setProperty('--bg2', theme.bg2);
  if (theme.accent) root.style.setProperty('--accent', theme.accent);
  if (theme.accent2) root.style.setProperty('--accent2', theme.accent2);
  if (theme.text) root.style.setProperty('--text', theme.text);
  if (theme.muted) root.style.setProperty('--muted', theme.muted);
}

function renderGallery(items = []) {
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = '';

  items.forEach((item, index) => {
    const fig = document.createElement('figure');
    fig.className = 'photo-card';
    fig.style.setProperty('--r', `${[-2, 1.2, -0.8, 1.6, -1.4, 0.8][index % 6]}deg`);

    const img = document.createElement('img');
    img.src = item.image || '/uploads/placeholder.svg';
    img.alt = item.caption || 'Anı fotoğrafı';
    fig.appendChild(img);

    if (item.caption) {
      const caption = document.createElement('figcaption');
      caption.textContent = item.caption;
      fig.appendChild(caption);
    }

    gallery.appendChild(fig);
  });
}

function renderTimeline(items = []) {
  const section = document.getElementById('timelineSection');
  const timeline = document.getElementById('timeline');
  timeline.innerHTML = '';

  if (!items.length) {
    section.style.display = 'none';
    return;
  }

  section.style.display = 'block';

  items.forEach(item => {
    const div = document.createElement('div');
    div.className = 'timeline-item';

    const date = document.createElement('div');
    date.className = 'timeline-date';
    date.textContent = item.date || '';

    const text = document.createElement('p');
    text.className = 'timeline-text';
    text.textContent = item.text || '';

    div.appendChild(date);
    div.appendChild(text);
    timeline.appendChild(div);
  });
}

loadSiteData()
  .then(data => {
    document.title = data.title || 'Bizim Hikayemiz';
    setText('eyebrow', data.eyebrow);
    setText('title', data.title);
    setText('subtitle', data.subtitle);
    setText('galleryTitle', data.galleryTitle);
    setText('letterTitle', data.letterTitle);
    setText('timelineTitle', data.timelineTitle);
    setText('footerText', data.footerText);

    const mainImage = document.getElementById('mainImage');
    if (data.mainImage) mainImage.src = data.mainImage;

    setHTMLFromText('letter', data.letter);
    renderGallery(data.gallery || []);
    renderTimeline(data.timeline || []);
    applyTheme(data.theme || {});
  })
  .catch(error => {
    console.error(error);
    document.body.insertAdjacentHTML(
      'beforeend',
      '<div style="position:fixed;left:12px;right:12px;bottom:12px;background:#111;color:#fff;padding:12px;border-radius:12px;z-index:99">İçerik yüklenemedi. content/site.json dosyasını kontrol et.</div>'
    );
  });
