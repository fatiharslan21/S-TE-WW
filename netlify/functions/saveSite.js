const { getStore } = require('@netlify/blobs');

const MAX_BODY_SIZE = 4.5 * 1024 * 1024;

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const expectedPassword = process.env.ADMIN_PASSWORD || 'emre';
  const incomingPassword = event.headers['x-admin-password'] || event.headers['X-Admin-Password'];

  if (incomingPassword !== expectedPassword) {
    return {
      statusCode: 401,
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ ok: false, message: 'Şifre yanlış.' })
    };
  }

  if (!event.body || Buffer.byteLength(event.body, 'utf8') > MAX_BODY_SIZE) {
    return {
      statusCode: 413,
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ ok: false, message: 'Dosya çok büyük. Netlify Blobs tek kayıt limiti nedeniyle fotoğrafları küçültüp tekrar dene.' })
    };
  }

  try {
    const data = JSON.parse(event.body);

    const clean = {
      title: String(data.title || '').slice(0, 80),
      subtitle: String(data.subtitle || '').slice(0, 160),
      mainImage: String(data.mainImage || ''),
      gallery: Array.isArray(data.gallery) ? data.gallery.slice(0, 4).map(x => String(x || '')) : ['', '', '', ''],
      letter: String(data.letter || '').slice(0, 8000),
      theme: ['green', 'pink', 'night', 'cream'].includes(data.theme) ? data.theme : 'green',
      musicEnabled: Boolean(data.musicEnabled)
    };

    const store = getStore('sevgili-site');
    await store.setJSON('site-data', clean);

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
      body: JSON.stringify({ ok: true, message: 'Kaydedildi.' })
    };
  } catch (error) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ ok: false, message: 'Kaydedilemedi.', detail: String(error && error.message ? error.message : error) })
    };
  }
};
